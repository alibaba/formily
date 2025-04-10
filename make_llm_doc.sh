#!/bin/bash
# .
# ├── CHANGELOG.md
# ├── LICENSE.md
# ├── README.md
# ├── README.zh-cn.md
# ├── commitlint.config.js
# ├── devtools
# │   └── chrome-extension
# ├── docs                 # 整体文档
# │   ├── functions
# │   ├── guide
# │   ├── index.md
# │   ├── index.zh-CN.md
# │   └── site
# ├── global.config.ts
# ├── jest.config.js
# ├── lerna.json
# ├── make_llm_doc.sh
# ├── package.json
# ├── packages
# │   ├── antd               # 组件库
# │   ├── benchmark          # 性能测试
# │   ├── core               # 核心库
# │   ├── element            # 组件库
# │   ├── grid               # 栅格系统
# │   ├── json-schema        # JSON Schema
# │   ├── next               # 下一代 React 框架
# │   ├── path               # 路径系统
# │   ├── react              # React 框架
# │   ├── reactive           # 响应式编程
# │   ├── reactive-react     # React 响应式编程
# │   ├── reactive-test-cases-for-react18 # React 18 测试用例
# │   ├── reactive-vue       # Vue 响应式编程
# │   ├── shared             # 共享库
# │   ├── validator          # 验证器
# │   └── vue                # Vue 框架
# ├── scripts
# │   ├── build-style
# │   └── rollup.base.js
# ├── tsconfig.build.json
# ├── tsconfig.jest.json
# ├── tsconfig.json
# └── yarn.lock
# 输出文件
OUTPUT_FILE="llm-custom.md"

# 清空或创建输出文件
echo "# Formily LLM 文档" > $OUTPUT_FILE

# 可选组件列表
declare -a COMPONENTS=(
  "vue"
  "react"
  "antd"
  "element"
  "next"
  "validator"  
)

# 调试模式开关
DEBUG=true

# 调试输出函数
debug() {
  if [ "$DEBUG" = true ]; then
    echo "[DEBUG] $1" >&2
  fi
}

# 用户选择的组件
declare -a SELECTED_COMPONENTS=()

# 函数：显示选择菜单
show_menu() {
  echo "请选择要包含的文档组件："
  for i in "${!COMPONENTS[@]}"; do
    echo "$((i+1)). ${COMPONENTS[$i]}"
  done
  echo "0. 完成选择并生成文档"
}

# 函数：处理选择
handle_selection() {
  read -p "请输入选项编号（多个选项用空格分隔）: " selections
  
  for selection in $selections; do
    if [[ $selection == "0" ]]; then
      return 1
    elif [[ $selection -ge 1 && $selection -le ${#COMPONENTS[@]} ]]; then
      SELECTED_COMPONENTS+=(${COMPONENTS[$((selection-1))]})
    else
      echo "无效选项: $selection"
    fi
  done
  
  echo "已选择: ${SELECTED_COMPONENTS[*]}"
  return 0
}

# 函数：处理单个markdown文件中的dumi-previewer标签
process_dumi_previewer() {
  local file="$1"
  local component_root="$2"
  debug "处理文件中的dumi-previewer: $file"
  
  # 添加文件开始分割线
  # echo -e "\n---------- $file start ------------\n" >> $OUTPUT_FILE
  
  # 检查是否包含dumi-previewer标签
  if grep -q "dumi-previewer" "$file"; then
    debug "文件包含dumi-previewer标签，开始处理"
    
    # 逐行读取文件并处理
    while IFS= read -r line; do
      if [[ "$line" =~ \<dumi-previewer\ demoPath=\"([^\"]+)\"\ \/\> ]]; then
        demo_path="${BASH_REMATCH[1]}"
        debug "匹配到demo路径: $demo_path"
        
        # 查找demo文件，优先查找组件根目录下的demos目录
        demo_file="${component_root}/demos/${demo_path}.vue"
        if [[ ! -f "$demo_file" ]]; then
          # 尝试其他可能的位置
          demo_file="${component_root}/${demo_path}.vue"
        fi
        
        if [[ -f "$demo_file" ]]; then
          debug "找到demo文件: $demo_file"
          echo -e "\n\`\`\`vue" >> $OUTPUT_FILE
          cat "$demo_file" >> $OUTPUT_FILE
          echo -e "\`\`\`\n" >> $OUTPUT_FILE
        else
          debug "未找到demo文件: $demo_file"
          echo "【未找到Demo: $demo_path】" >> $OUTPUT_FILE
        fi
      else
        # 输出普通行
        echo "$line" >> $OUTPUT_FILE
      fi
    done < "$file"
  else
    # 如果不包含dumi-previewer标签，直接复制文件内容
    debug "文件不包含dumi-previewer标签，直接复制内容"
    cat "$file" >> $OUTPUT_FILE
  fi
  
  # 添加文件结束分割线
  # echo -e "\n---------- $file end ------------\n" >> $OUTPUT_FILE
  debug "完成处理文件: $file"
}

# 处理指定组件的文档
process_component_docs() {
  local component="$1"
  local doc_pattern="$2"
  local exclude_pattern="$3"
  
  debug "处理组件 $component 的文档"
  progress_marker "开始处理组件 $component 的文档"
  
  # 确定组件文档根目录
  local component_root="./packages/${component}/docs"
  debug "组件文档根目录: $component_root"
  
  # 查找所有符合条件的markdown文件
  local files=$(find "$component_root" -name "$doc_pattern" -not -path "*/node_modules/*" -type f)
  if [[ -n "$exclude_pattern" ]]; then
    files=$(echo "$files" | grep -v "$exclude_pattern")
  fi
  
  debug "找到文件数量: $(echo "$files" | wc -l)"
  
  # 处理每个文件
  for file in $files; do
    process_dumi_previewer "$file" "$component_root"
  done
  
  progress_marker "完成处理组件 $component 的文档"
  debug "完成处理组件 $component 的文档"
}

# 函数：收集文档
collect_docs() {
  echo "正在收集文档..."
  
  # 必选目录的文档
  progress_marker "开始处理核心文档"
  debug "处理必选目录: ./docs/ 的文档"
  echo -e "\n## 核心文档\n" >> $OUTPUT_FILE
  find ./docs -name "*.zh-CN.md" -not -path "*/node_modules/*" -type f | while read file; do
    debug "发现文件: $file"
    # 处理文件中的dumi-previewer
    process_dumi_previewer "$file" "./docs"
  done
  debug "完成处理 ./docs/ 目录"
  progress_marker "完成处理核心文档"
  
  # packages/core/docs 目录
  progress_marker "开始处理Core文档"
  debug "处理 packages/core/docs 目录的文档"
  echo -e "\n## Core 文档\n" >> $OUTPUT_FILE
  find ./packages/core/docs -name "*.zh-CN.md" -not -path "*/node_modules/*" -type f | while read file; do
    debug "发现文件: $file"
    # 处理文件中的dumi-previewer
    process_dumi_previewer "$file" "./packages/core/docs"
  done
  debug "完成处理 packages/core/docs 目录"
  progress_marker "完成处理Core文档"
  
  # packages/reactive/docs 目录 (必选)
  progress_marker "开始处理Reactive文档"
  debug "处理 packages/reactive/docs 目录的文档"
  echo -e "\n## Reactive 文档\n" >> $OUTPUT_FILE
  find ./packages/reactive/docs -name "*.zh-CN.md" -not -path "*/node_modules/*" -type f | while read file; do
    debug "发现文件: $file"
    # 处理文件中的dumi-previewer
    process_dumi_previewer "$file" "./packages/reactive/docs"
  done
  debug "完成处理 packages/reactive/docs 目录"
  progress_marker "完成处理Reactive文档"
  
  # 收集选定组件的文档
  for component in "${SELECTED_COMPONENTS[@]}"; do
    progress_marker "开始处理组件 $component 的文档"
    debug "开始处理组件 $component 的文档"
    # 跳过必选的reactive（已经处理过）
    if [[ "$component" == "reactive" ]]; then
      debug "跳过已处理的 reactive 组件"
      continue
    fi
    
    echo -e "\n## 组件: $component 文档\n" >> $OUTPUT_FILE
    echo -e "\n-------------------- $component 文档开始 --------------------\n" >> $OUTPUT_FILE
    
    # 特殊处理vue和element文档
    if [[ "$component" == "vue" || "$component" == "element" ]]; then
      debug "特殊处理 $component 组件文档 (使用 *.md 格式)"
      # vue和element组件使用 *.md 且不是 *.en-US.md 的格式
      process_component_docs "$component" "*.md" "*.en-US.md"
    # 处理其他组件
    else
      # 其他组件使用 *.zh-CN.md 的格式
      process_component_docs "$component" "*.zh-CN.md" ""
    fi
    
    echo -e "\n-------------------- $component 文档结束 --------------------\n" >> $OUTPUT_FILE
  done
  
  debug "文档收集完成"
  progress_marker "文档收集全部完成"
}

# 主程序
echo "Formily LLM 文档生成工具"
echo "------------------------"

# 设置超时时间（秒）
TIMEOUT=600
SECONDS=0

# 函数：输出进度标记
progress_marker() {
  local name="$1"
  echo ">>>PROGRESS: $name $(date)" >&2
}

# 循环显示菜单直到用户选择完成
while true; do
  show_menu
  handle_selection
  if [[ $? -eq 1 ]]; then
    break
  fi
done

# 收集并生成文档
collect_docs &
COLLECT_PID=$!

# 监控进程并检查超时
while kill -0 $COLLECT_PID 2>/dev/null; do
  if [ $SECONDS -gt $TIMEOUT ]; then
    echo "警告: 文档收集超时，强制停止处理"
    kill -9 $COLLECT_PID 2>/dev/null
    break
  fi
  sleep 10
  echo "仍在收集文档... 已经过时间: ${SECONDS}秒"
done

# 等待收集完成
wait $COLLECT_PID 2>/dev/null
RESULT=$?

if [ $RESULT -eq 0 ]; then
  echo "文档生成成功完成！输出文件: $OUTPUT_FILE"
else
  echo "文档生成过程中出现问题，请检查日志"
fi

echo "总共选择了 ${#SELECTED_COMPONENTS[@]} 个组件: ${SELECTED_COMPONENTS[*]}"

# 统计文档大小
FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
echo "文档大小: $FILE_SIZE"

echo "============= 脚本执行完毕 ============="




