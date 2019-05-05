(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{142:function(e,t){e.exports=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}},143:function(e,t,n){"use strict";n.r(t);var r=n(128),a=n.n(r),o=n(130),i=n.n(o),l=n(0),s=n.n(l),c=n(115),d=n(140),m=n.n(d),p=n(67),u=n(144),g={addItem:"添加",array_invalid_minItems:"条目数不允许小于%s条",array_invalid_maxItems:"条目数不允许大于%s条",operations:"操作"},x=n(1),h=n.n(x),f=n(116),b=n(171),y=n.n(b);const v=h()(e=>{let t;if(e.dataSource&&e.dataSource.length){t=e.dataSource.filter(({value:t})=>Array.isArray(e.value)?e.value.indexOf(t)>-1:e.value===t).map(e=>e.label).join(" , ")}else t=Array.isArray(e.value)?e.value.join(" ~ "):String(void 0===e.value||null===e.value?"":e.value);return s.a.createElement("div",{className:`${e.className} ${e.size||""} text-field`},t||"N/A",e.addonTextAfter?" "+e.addonTextAfter:"",e.addonAfter?" "+e.addonAfter:"")})`
  height: 28px;
  line-height: 28px;
  vertical-align: middle;
  font-size: 13px;
  color: #333;
  &.small {
    height: 20px;
    line-height: 20px;
  }
  &.large {
    height: 40px;
    line-height: 40px;
  }
`,F=e=>({dataSource:t,...n})=>t?s.a.createElement(p.Select,{dataSource:t,...n}):s.a.createElement(e,n),E=(e,{loading:t,size:n})=>{t&&(e.state=e.state||"loading"),n&&(e.size=n)},w=(e,t,{editable:n,name:r})=>{if(void 0!==n)if(Object(f.o)(n)){if(!n(r))return v}else if(!1===n)return v;return e};var C,N;const{Provider:j,Consumer:k}=s.a.createContext(),O=e=>"object"==typeof e?e:{span:e},B=(e,t)=>{if(e&&(!e||e.matches))return e.matches(t)?e:B(e.parentNode||e.parentElement,t)},T=h()((N=C=class extends s.a.Component{getItemLabel(){const{id:e,required:t,label:n,labelCol:r,wrapperCol:o,prefix:i,extra:l,labelAlign:c,labelTextAlign:d,autoAddColon:p,isTableColItem:g}=this.props;if(!n||g)return null;const x=s.a.createElement("label",{htmlFor:e,required:t,key:"label"},n," "===n?"":p?"：":""),h=m()({[`${i}form-item-label`]:!0,[`${i}left`]:"left"===d});return(o||r)&&"top"!==c?s.a.createElement(u.Col,a()({},O(r),{className:h}),x,(l&&l.length>20||s.a.isValidElement(l))&&this.renderHelper()):s.a.createElement("div",{className:h},x,(l&&l.length>20||s.a.isValidElement(l))&&this.renderHelper())}getItemWrapper(){const{labelCol:e,wrapperCol:t,children:n,extra:r,label:o,labelAlign:i,help:l,size:c,prefix:d,noMinHeight:m,isTableColItem:p}=this.props,g=s.a.createElement("div",{className:`${d}form-item-msg ${m?"":`${d}form-item-space`}`},l&&s.a.createElement("div",{className:`${d}form-item-help`},l),!l&&r&&r.length<=20&&s.a.createElement("div",{className:`${d}form-item-extra`},r));return(t||e)&&"top"!==i&&!p&&o?s.a.createElement(u.Col,a()({},O(t),{className:`${d}form-item-control`,key:"item"}),s.a.cloneElement(n,{size:c}),g):s.a.createElement("div",{className:`${d}form-item-control`},s.a.cloneElement(n,{size:c}),g)}renderHelper(){return s.a.createElement(p.Balloon,{closable:!1,align:"t",trigger:s.a.createElement(p.Icon,{type:"help",size:"small"})},this.props.extra)}render(){const{className:e,labelAlign:t,labelTextAlign:n,style:r,prefix:o,wrapperCol:i,labelCol:l,size:c,help:d,extra:p,noMinHeight:g,isTableColItem:x,validateState:h,autoAddColon:f,required:b,type:y,schema:v,...F}=this.props,E=m()({[`${o}form-item`]:!0,[`${o}${t}`]:t,[`has-${h}`]:!!h,[`${o}${c}`]:!!c,[`${e}`]:!!e,[`field-${y}`]:!!y}),w=(i||l)&&"top"!==t?u.Row:"div",C="inset"===t?null:this.getItemLabel();return s.a.createElement(w,a()({},F,{gutter:0,className:E,style:r}),C,this.getItemWrapper())}},i()(C,"defaultProps",{prefix:"next-"}),N))`
  margin-bottom: 4px !important;
  &.field-table {
    .next-form-item-control {
      overflow: auto;
    }
  }
  .next-form-item-msg {
    &.next-form-item-space {
      min-height: 20px;
      .next-form-item-help,
      .next-form-item-extra {
        margin-top: 0;
      }
    }
  }
  .next-form-item-extra {
    color: #888;
    font-size: 12px;
    line-height: 1.7;
  }
`,X=e=>Array.isArray(e)?e:e?[e]:[];Object(c.registerFormWrapper)(e=>{var t,n;return e=h()(e)`
    &.next-inline {
      display: flex;
      .rs-uform-content {
        margin-right: 15px;
      }
    }
    .next-radio-group,
    .next-checkbox-group {
      line-height: 28px;
      & > label {
        margin-right: 8px;
      }
    }
    .next-small {
      .next-radio-group,
      .next-checkbox-group {
        line-height: 20px;
      }
    }
    .next-small {
      .next-radio-group,
      .next-checkbox-group {
        line-height: 40px;
      }
    }
    .next-card-head {
      background: none;
    }
    .next-rating-medium {
      min-height: 28px;
      line-height: 28px;
    }
    .next-rating-small {
      min-height: 20px;
      line-height: 20px;
    }
    .next-rating-large {
      min-height: 40px;
      line-height: 40px;
    }
  `,p.ConfigProvider.config((n=t=class extends s.a.Component{constructor(...e){super(...e),i()(this,"FormRef",s.a.createRef())}validateFailedHandler(e){return(...t)=>{Object(f.o)(e)&&e(...t);const n=this.FormRef.current;if(n){const e=n.querySelectorAll(".next-form-item-help");if(e&&e.length){const t=B(e[0],".next-form-item");t&&(e=>{e&&(e.scrollIntoView?e.scrollIntoView({behavior:"smooth",inline:"start",block:"start"}):(new y.a).move(e.getBoundingClientRect().top))})(t)}}}}render(){const{className:t,inline:n,size:r,labelAlign:o,labelTextAlign:i,autoAddColon:l,children:c,component:d,labelCol:p,wrapperCol:u,getErrorScrollOffset:g,errorScrollToElement:x,style:h,prefix:f,...b}=this.props,y=m()({[`${f}form`]:!0,[`${f}inline`]:n,[`${f}${r}`]:r,[t]:!!t});return s.a.createElement(j,{value:{labelAlign:o,labelTextAlign:i,labelCol:p,wrapperCol:u,inline:n,size:r,autoAddColon:l,FormRef:this.FormRef}},s.a.createElement(e,a()({},b,{formRef:this.FormRef,onValidateFailed:this.validateFailedHandler(b.onValidateFailed),className:y,style:h}),c))}},i()(t,"defaultProps",{component:"form",prefix:"next-",size:"medium",labelAlign:"left",locale:g,autoAddColon:!0}),i()(t,"displayName","SchemaForm"),n))});const A=(e,t)=>{const n=t(e);return n&&"array"===n.type&&"table"===n["x-component"]};Object(c.registerFieldMiddleware)(e=>t=>{const{name:n,editable:r,errors:a,path:o,schema:i,getSchema:l,required:c}=t;return 0===o.length?s.a.createElement(e,t):s.a.createElement(k,{},({labelAlign:d,labelTextAlign:m,labelCol:p,wrapperCol:u,size:g,autoAddColon:x})=>s.a.createElement(T,{labelAlign:d,labelTextAlign:m,labelCol:p,wrapperCol:u,autoAddColon:x,size:g,...i["x-item-props"],label:i.title,noMinHeight:"object"===i.type&&!i["x-component"],isTableColItem:A(o.slice(0,o.length-2),l),type:i["x-component"]||i.type,id:n,validateState:X(a).length?"error":void 0,required:!1!==r&&c,extra:i.description,help:X(a).join(" , ")||i["x-item-props"]&&i["x-item-props"].help},s.a.createElement(e,t)))}),Object(c.registerFormField)("string",Object(c.connect)({getProps:E,getComponent:w})(F(p.Input))),Object(c.registerFormField)("number",Object(c.connect)({getProps:E,getComponent:w})(F(p.NumberPicker))),Object(c.registerFormField)("boolean",Object(c.connect)({valueName:"checked",getProps:E})(F(p.Switch)));const{RangePicker:S,MonthPicker:I,YearPicker:z}=p.DatePicker,R=(e,t="YYYY-MM-DD HH:mm:ss")=>e&&e.format?e.format(t):e;Object(c.registerFormField)("date",Object(c.connect)({getValueFromEvent(e){const t=this.props||{};return R(e,t.showTime?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD")},getProps:E,getComponent:w})(p.DatePicker)),Object(c.registerFormField)("daterange",Object(c.connect)({getValueFromEvent([e,t]){const n=(this.props||{}).showTime?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD";return[R(e,n),R(t,n)]},getProps:E,getComponent:w})(S)),Object(c.registerFormField)("month",Object(c.connect)({getValueFromEvent:e=>R(e),getProps:E,getComponent:w})(I)),Object(c.registerFormField)("year",Object(c.connect)({getValueFromEvent:e=>R(e),getProps:E,getComponent:w})(z));var P,V;Object(c.registerFormField)("time",Object(c.connect)({getProps:E,getValueFromEvent:e=>((e,t="YYYY-MM-DD HH:mm:ss")=>e&&e.format?e.format(t):e)(e,"HH:mm:ss"),getComponent:w})(p.TimePicker)),Object(c.registerFormField)("range",Object(c.connect)({defaultProps:{style:{width:320}},getProps:E})(p.Range));const{Card:M,Dragger:D}=p.Upload,H=[{ext:/\.docx?/i,icon:"//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png"},{ext:/\.pptx?/i,icon:"//img.alicdn.com/tfs/TB1ItgWr_tYBeNjy1XdXXXXyVXa-200-200.png"},{ext:/\.jpe?g/i,icon:"//img.alicdn.com/tfs/TB1wrT5r9BYBeNjy0FeXXbnmFXa-200-200.png"},{ext:/pdf/i,icon:"//img.alicdn.com/tfs/TB1GwD8r9BYBeNjy0FeXXbnmFXa-200-200.png"},{ext:/\.png/i,icon:"//img.alicdn.com/tfs/TB1BHT5r9BYBeNjy0FeXXbnmFXa-200-200.png"},{ext:/\.eps/i,icon:"//img.alicdn.com/tfs/TB1G_iGrVOWBuNjy0FiXXXFxVXa-200-200.png"},{ext:/\.ai/i,icon:"//img.alicdn.com/tfs/TB1B2cVr_tYBeNjy1XdXXXXyVXa-200-200.png"},{ext:/\.gif/i,icon:"//img.alicdn.com/tfs/TB1DTiGrVOWBuNjy0FiXXXFxVXa-200-200.png"},{ext:/\.svg/i,icon:"//img.alicdn.com/tfs/TB1uUm9rY9YBuNjy0FgXXcxcXXa-200-200.png"},{ext:/\.xlsx?/i,icon:"//img.alicdn.com/tfs/TB1any1r1OSBuNjy0FdXXbDnVXa-200-200.png"},{ext:/\.psd?/i,icon:"//img.alicdn.com/tfs/TB1_nu1r1OSBuNjy0FdXXbDnVXa-200-200.png"},{ext:/\.(wav|aif|aiff|au|mp1|mp2|mp3|ra|rm|ram|mid|rmi)/i,icon:"//img.alicdn.com/tfs/TB1jPvwr49YBuNjy0FfXXXIsVXa-200-200.png"},{ext:/\.(avi|wmv|mpg|mpeg|vob|dat|3gp|mp4|mkv|rm|rmvb|mov|flv)/i,icon:"//img.alicdn.com/tfs/TB1FrT5r9BYBeNjy0FeXXbnmFXa-200-200.png"},{ext:/\.(zip|rar|arj|z|gz|iso|jar|ace|tar|uue|dmg|pkg|lzh|cab)/i,icon:"//img.alicdn.com/tfs/TB10jmfr29TBuNjy0FcXXbeiFXa-200-200.png"},{ext:/\..+/i,icon:"//img.alicdn.com/tfs/TB10.R4r3mTBuNjy1XbXXaMrVXa-200-200.png"}],Y=(e,t)=>t&&Object(f.k)(t.include)?t.include.some(t=>e.test(t)):!t||!Object(f.k)(t.exclude)||!t.exclude.some(t=>e.test(t)),$=(e,t)=>{for(let n=0;n<H.length;n++)if(H[n].ext.test(e)&&Y(H[n].ext,t))return H[n].icon;return e},_=e=>Object(f.k)(e)?[...e]:"object"==typeof e?{...e}:e;Object(c.registerFormField)("upload",Object(c.connect)({getProps:E})((V=P=class extends s.a.Component{constructor(...e){super(...e),i()(this,"state",{value:Object(f.x)(this.props.value)}),i()(this,"onChangeHandler",e=>{const{onChange:t}=this.props;(e=Object(f.x)(e)).every(e=>"done"===e.state||e.imgURL||e.downloadURL)?(e=(e=>e&&e.length?e.map(e=>({name:e.name,downloadURL:e.downloadURL||e.imgURL,...e.response,imgURL:$(e.imgURL,{exclude:[".png",".jpg",".jpeg",".gif"]})})):[])(e),this.setState({value:e},()=>{t(e.length>0?e:void 0)})):this.setState({value:e})})}componentDidUpdate(e){this.props.value&&!Object(f.n)(this.props.value,e.value)&&this.setState({value:this.props.value})}render(){const{listType:e,locale:t,onChange:n,value:r,...o}=this.props;return e.indexOf("card")>-1?s.a.createElement(M,a()({},o,{value:_(this.state.value),onChange:this.onChangeHandler,listType:"card"})):e.indexOf("dragger")>-1?s.a.createElement(D,a()({},o,{value:_(this.state.value),onChange:this.onChangeHandler,listType:e.indexOf("image")>-1?"image":"text"})):s.a.createElement(p.Upload,a()({},o,{value:_(this.state.value),onChange:this.onChangeHandler,listType:e}),s.a.createElement(p.Button,{style:{margin:"0 0 10px"}},t&&t.uploadText||"上传文件"))}},i()(P,"defaultProps",{action:"https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload",listType:"text",multiple:!0}),V)));const{Group:L}=p.Checkbox;Object(c.registerFormField)("checkbox",Object(c.connect)({getProps:E,getComponent:w})(L));const{Group:U}=p.Radio;Object(c.registerFormField)("radio",Object(c.connect)({getProps:E,getComponent:w})(U)),Object(c.registerFormField)("rating",Object(c.connect)({getProps:E})(p.Rating)),Object(c.registerFormField)("transfer",Object(c.connect)({getProps:E})(p.Transfer));const q=h.a.div.attrs({className:"cricle-btn"})`
  ${e=>e.hasText?"":"width:30px;\n  height:30px;"}
  margin-right:10px;
  border-radius: ${e=>e.hasText?"none":"100px"};
  border: ${e=>e.hasText?"none":"1px solid #eee"};
  margin-bottom:20px;
  cursor:pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.3;
  ${e=>e.hasText?"":"&:hover{\n    background:#f7f4f4;\n  }"}
      .next-icon{
    display:flex;
    align-items:'center'
  }
  .op-name{
    margin-left:3px;
  }
}
`,G=Object(c.createArrayField)({CircleButton:q,TextButton:e=>s.a.createElement(p.Button,{text:!0,size:"large"},e.children),AddIcon:()=>s.a.createElement(p.Icon,{type:"add",className:"next-icon-first"}),RemoveIcon:()=>s.a.createElement(p.Icon,{size:"xs",type:"ashbin",className:"next-icon-first"}),MoveDownIcon:()=>s.a.createElement(p.Icon,{size:"xs",type:"arrow-down",className:"next-icon-first"}),MoveUpIcon:()=>s.a.createElement(p.Icon,{size:"xs",type:"arrow-up",className:"next-icon-first"})});Object(c.registerFormField)("array",h()(class extends G{render(){const{className:e,name:t,schema:n,value:r,renderField:a}=this.props,o=n["x-props"]&&n["x-props"].style||{};return s.a.createElement("div",{className:e,style:o,onClick:this.onClearErrorHandler()},r.map((e,n)=>s.a.createElement("div",{className:"array-item",key:`${t}.${n}`},s.a.createElement("div",{className:"array-index"},s.a.createElement("span",null,n+1)),s.a.createElement("div",{className:"array-item-wrapper"},a(n)),s.a.createElement("div",{className:"array-item-operator"},this.renderRemove(n,e),this.renderMoveDown(n,e),this.renderMoveUp(n,e)))),this.renderEmpty(),r.length>0&&this.renderAddition())}})`
    border: 1px solid #eee;
    min-width: 400px;
    .array-item {
      padding: 20px;
      padding-bottom: 0;
      padding-top: 30px;
      border-bottom: 1px solid #eee;
      position: relative;
      &:nth-child(even) {
        background: #fafafa;
      }
      .array-index {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        span {
          position: absolute;
          color: #fff;
          z-index: 1;
          font-size: 12px;
          top: 3px;
          left: 3px;
        }
        &::after {
          content: '';
          display: block;
          border-top: 20px solid transparent;
          border-left: 20px solid transparent;
          border-bottom: 20px solid transparent;
          border-right: 20px solid #888;
          transform: rotate(45deg);
          position: absolute;
          z-index: 0;
          top: -20px;
          left: -20px;
        }
      }
      .array-item-operator {
        display: flex;
        border-top: 1px solid #eee;
        padding-top: 20px;
      }
    }
    .array-empty-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &.disabled {
        cursor: default;
      }
      .array-empty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 20px;
        img {
          display: block;
          height: 80px;
        }
        .next-btn-text {
          color: #999;
          .next-icon:before {
            width: 16px !important;
            font-size: 16px !important;
            margin-right: 3px;
          }
        }
      }
    }
    .array-item-wrapper {
      margin: 0 -20px;
    }
    .array-item-addition {
      padding: 10px 20px;
      background: #fbfbfb;
      .next-btn-text {
        color: #888;
        .next-icon:before {
          width: 16px !important;
          font-size: 16px !important;
          margin-right: 3px;
        }
      }
    }
  `);var W=n(149),J=n.n(W);const K=h()(class extends G{renderOperations(e,t){return s.a.createElement(l.Fragment,null,this.renderRemove(t,e),this.renderMoveDown(t,e),this.renderMoveUp(t,e),this.renderExtraOperations(t))}renderEmpty(e){return s.a.createElement(J.a,{title:e,className:"card-list",contentHeight:"auto"},super.renderEmpty())}render(){const{value:e,className:t,schema:n,renderField:r}=this.props,{title:o,renderAddition:i,renderRemove:l,renderEmpty:c,renderMoveDown:d,renderMoveUp:m,renderOperations:p,...u}=this.getProps()||{};return s.a.createElement("div",{className:t,onClick:this.onClearErrorHandler()},Object(f.x)(e).map((e,t)=>s.a.createElement(J.a,a()({},u,{title:s.a.createElement("span",null,t+1,". ",o||n.title),className:"card-list",key:t,contentHeight:"auto",extra:this.renderOperations(e,t)}),r(t))),0===e.length&&this.renderEmpty(o),s.a.createElement("div",{className:"addition-wrapper"},e.length>0&&this.renderAddition()))}})`
  .next-card-body {
    padding-top: 30px;
    padding-bottom: 0 !important;
  }
  .next-card-head-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .next-card {
    display: block;
    margin-bottom: 0px;
    background: #fff;
    .array-empty-wrapper {
      display: flex;
      justify-content: center;
      cursor: pointer;
      margin-bottom: 0px;
      &.disabled {
        cursor: default;
      }
      .array-empty {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
        img {
          margin-bottom: 16px;
          height: 85px;
        }
        .next-btn-text {
          color: #888;
        }
        .next-icon:before {
          width: 16px !important;
          font-size: 16px !important;
          margin-right: 5px;
        }
      }
    }

    .next-card {
      box-shadow: none;
    }
    .card-list {
      box-shadow: none;
      border: 1px solid #eee;
    }

    .array-item-addition {
      box-shadow: none;
      border: 1px solid #eee;
      transition: all 0.35s ease-in-out;
      &:hover {
        border: 1px solid #ccc;
      }
    }
  }
  .next-card.card-list {
    margin-top: 20px;
  }

  .addition-wrapper .array-item-addition {
    margin-top: 20px;
    margin-bottom: 3px;
  }
  .cricle-btn {
    margin-bottom: 0;
  }
  .next-card-extra {
    display: flex;
  }
  .array-item-addition {
    background: #fff;
    display: flex;
    cursor: pointer;
    padding: 10px 0;
    justify-content: center;
    box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.1);
    .next-btn-text {
      color: #888;
    }
    .next-icon:before {
      width: 16px !important;
      font-size: 16px !important;
      margin-right: 5px;
    }
  }
  .card-list:first-child {
    margin-top: 0 !important;
  }
`;Object(c.registerFormField)("cards",K);const Z=h()(class extends l.Component{renderCell({record:e,col:t,rowIndex:n,colIndex:r}){return s.a.createElement("div",{className:"next-table-cell-wrapper"},Object(f.o)(t.cell)?t.cell(e?e[t.dataIndex]:void 0,n,e):e?e[t.dataIndex]:void 0)}renderTable(e,t){return s.a.createElement("div",{className:"next-table-body"},s.a.createElement("table",null,s.a.createElement("colgroup",null,e.map((e,t)=>s.a.createElement("col",{key:t,style:{width:e.width}}))),s.a.createElement("thead",null,s.a.createElement("tr",null,e.map((e,t)=>s.a.createElement("th",{key:t,className:"next-table-header-node"},s.a.createElement("div",{className:"next-table-cell-wrapper"},e.title))))),s.a.createElement("tbody",null,t.map((t,n)=>s.a.createElement("tr",{key:n,className:"next-table-row"},e.map((e,r)=>s.a.createElement("td",{key:r,className:"next-table-cell"},this.renderCell({record:t,col:e,rowIndex:n,colIndex:r}))))),this.renderPlacehodler(t,e))))}renderPlacehodler(e,t){if(0===e.length)return s.a.createElement("tr",{className:"next-table-row"},s.a.createElement("td",{className:"next-table-cell",colSpan:t.length},s.a.createElement("div",{className:"next-table-empty",style:{padding:10}},s.a.createElement("img",{src:"//img.alicdn.com/tfs/TB1cVncKAzoK1RjSZFlXXai4VXa-184-152.svg",style:{height:60}}))))}getColumns(e){const t=[];return s.a.Children.forEach(e,e=>{s.a.isValidElement(e)&&(e.type!==Q&&"@schema-table-column"!==e.type.displayName||t.push(e.props))}),t}render(){const e=this.getColumns(this.props.children),t=Object(f.x)(this.props.dataSource);return s.a.createElement("div",{className:this.props.className},s.a.createElement("div",{className:"next-table zebra"},s.a.createElement("div",{className:"next-table-inner"},this.renderTable(e,t))))}})`
  .next-table {
    position: relative;
  }

  .next-table,
  .next-table *,
  .next-table :after,
  .next-table :before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .next-table table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    background: #fff;
    display: table !important;
    margin: 0 !important;
  }

  .next-table table tr:first-child td {
    border-top-width: 0;
  }

  .next-table th {
    padding: 0;
    background: #ebecf0;
    color: #333;
    text-align: left;
    font-weight: 400;
    min-width: 200px;
    border: 1px solid #dcdee3;
  }

  .next-table th .next-table-cell-wrapper {
    padding: 12px 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  .next-table td {
    padding: 0;
    border: 1px solid #dcdee3;
  }

  .next-table td .next-table-cell-wrapper {
    padding: 12px 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: flex;
  }

  .next-table.zebra tr:nth-child(odd) td {
    background: #fff;
  }

  .next-table.zebra tr:nth-child(2n) td {
    background: #f7f8fa;
  }

  .next-table-empty {
    color: #a0a2ad;
    padding: 32px 0;
    text-align: center;
  }

  .next-table-row {
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    background: #fff;
    color: #333;
    border: none !important;
  }

  .next-table-row.hidden {
    display: none;
  }

  .next-table-row.hovered,
  .next-table-row.selected {
    background: #f2f3f7;
    color: #333;
  }

  .next-table-body,
  .next-table-header {
    overflow: auto;
    font-size: 12px;
  }

  .next-table-body {
    font-size: 12px;
  }
`;class Q extends l.Component{render(){return this.props.children}}var ee;i()(Q,"displayName","@schema-table-column"),Object(c.registerFormField)("table",h()(class extends G{createFilter(e,t){const{schema:n}=this.props,r=n["x-props"]&&n["x-props"].columnFilter;return(n,a)=>Object(f.o)(r)?r(e,t)?Object(f.o)(n)?n():n:Object(f.o)(a)?a():a:n()}render(){const{value:e,schema:t,locale:n,className:r,renderField:o}=this.props,i=t["x-props"]&&t["x-props"].style,l=this.createFilter("addition",t);return s.a.createElement("div",{className:r,style:i,onClick:this.onClearErrorHandler()},s.a.createElement("div",null,s.a.createElement(Z,{dataSource:e},Object.keys(t.items&&t.items.properties||{}).reduce((e,n)=>{const r=t.items.properties[n];return this.createFilter(n,r)(()=>e.concat(s.a.createElement(Q,a()({},r,{key:n,title:r.title,dataIndex:n,cell:(e,t)=>o([t,n])}))),()=>e)},[]),l(()=>s.a.createElement(Q,{key:"operations",title:n.operations,dataIndex:"operations",width:180,cell:(e,t)=>s.a.createElement("div",{className:"array-item-operator"},this.renderRemove(t,e),this.renderMoveDown(t,e),this.renderMoveUp(t,e))}))),this.renderAddition()))}})`
    display: inline-block;
    .array-item-addition {
      padding: 10px;
      background: #fbfbfb;
      border-left: 1px solid #dcdee3;
      border-right: 1px solid #dcdee3;
      border-bottom: 1px solid #dcdee3;
      .next-btn-text {
        color: #888;
      }
      .next-icon:before {
        width: 16px !important;
        font-size: 16px !important;
        margin-right: 5px;
      }
    }

    .next-table-cell-wrapper>.next-form-item{
      margin-bottom:0;
    }
    .array-item-operator {
      display: flex;
    }
  `);var te=function(e){return e>=48&&e<=57},ne=function(e){return e>=97&&e<=122},re=function(e){return e>=65&&e<=90},ae=function(e){return!(ne(e)||re(e)||te(e))},oe=function(e){return ne(e)||re(e)};const ie=e=>{if(!e)return 0;let t=0,n=0,r=0,a=0,o=0,i=0,l=0,s=0,c=0;const d=()=>t+n+r+a;for(var m=0;m<e.length;m++){var p=e.charCodeAt(m);te(p)?(t++,0!==m&&m!==e.length-1&&o++,m>0&&te(e.charCodeAt(m-1))&&s++):ne(p)?(n++,m>0&&ne(e.charCodeAt(m-1))&&s++):re(p)?(r++,m>0&&re(e.charCodeAt(m-1))&&s++):(a++,0!==m&&m!==e.length-1&&o++);for(var u=!1,g=0;g<e.length;g++)e[m]===e[g]&&m!==g&&(u=!0,l+=Math.abs(e.length/(g-m)));if(u){i++;var x=e.length-i;l=x?Math.ceil(l/x):Math.ceil(l)}if(m>1){var h=e.charCodeAt(m-1),f=e.charCodeAt(m-2);if(oe(p)){if(oe(h)&&oe(f)){var b=e.toLowerCase(),y=b.charCodeAt(m),v=b.charCodeAt(m-1);y-v==v-b.charCodeAt(m-2)&&1===Math.abs(y-v)&&c++}}else te(p)?te(h)&&te(f)&&p-h==h-f&&1===Math.abs(p-h)&&c++:ae(h)&&ae(f)&&p-h==h-f&&1===Math.abs(p-h)&&c++}}let F=0,E=d();return F+=4*E,n>0&&(F+=2*(E-n)),r>0&&(F+=2*(E-r)),t!==E&&(F+=4*t),F+=6*a,F+=2*o,F+=2*(()=>{var e=t>0?1:0;return e+=n>0?1:0,e+=r>0?1:0,(e+=a>0?1:0)>2&&d()>=8?e+1:0})(),E===n+r&&(F-=E),E===t&&(F-=t),F-=l,F-=2*s,(F=(F=(F-=3*c)<0?0:F)>100?100:F)>=80?100:F>=60?80:F>=40?60:F>=20?40:20},le=h()((ee=class extends s.a.Component{constructor(...e){super(...e),i()(this,"state",{value:this.props.value||this.props.defaultValue,strength:0,eye:!1}),i()(this,"onChangeHandler",e=>{this.setState({value:e,strength:ie(e)},()=>{this.props.onChange&&this.props.onChange(e)})})}componentDidUpdate(e,t){e.value!==this.props.value&&this.props.value!==this.state.value&&this.setState({value:this.props.value,strength:ie(this.props.value)})}renderStrength(){const{strength:e}=this.state;return s.a.createElement("div",{className:"password-strength-wrapper"},s.a.createElement("div",{className:"div-1 div"}),s.a.createElement("div",{className:"div-2 div"}),s.a.createElement("div",{className:"div-3 div"}),s.a.createElement("div",{className:"div-4 div"}),s.a.createElement("div",{className:"password-strength-bar",style:{clipPath:`polygon(0 0,${e}% 0,${e}% 100%,0 100%)`}}))}switchEye(){return()=>{this.setState({eye:!this.state.eye})}}renderEye(){return this.state.eye?s.a.createElement("img",{className:"eye",onClick:this.switchEye(),src:"//img.alicdn.com/tfs/TB1xiXlsVzqK1RjSZFvXXcB7VXa-200-200.svg"}):s.a.createElement("img",{className:"eye",onClick:this.switchEye(),src:"//img.alicdn.com/tfs/TB1wyXlsVzqK1RjSZFvXXcB7VXa-200-200.svg"})}render(){const{className:e,checkStrength:t,value:n,onChange:r,htmlType:o,innerAfter:i,...l}=this.props;return s.a.createElement("div",{className:e},s.a.createElement(p.Input,a()({htmlType:this.state.eye?"text":"password",className:`input-${this.state.eye?"text":"password"}`,value:this.state.value,onChange:this.onChangeHandler,innerAfter:this.renderEye()},l)),t&&this.renderStrength())}},ee))`
  .next-input {
    width: 100%;
    position: relative;
    &.input-password input {
      font-size: 16px;
      letter-spacing: 2px;
    }
    input {
      padding-right: 25px;
    }
    .eye {
      position: absolute;
      height: 20px;
      right: 5px;
      top: 50%;
      transform: translate(0, -50%);
      opacity: 0.3;
      cursor: pointer;
      transition: all 0.15s ease-in-out;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  .password-strength-wrapper {
    background: #e0e0e0;
    margin-bottom: 3px;
    position: relative;
    .div {
      position: absolute;
      z-index: 1;
      height: 8px;
      top: 0;
      background: #fff;
      width: 1px;
      transform: translate(-50%, 0);
    }
    .div-1 {
      left: 20%;
    }
    .div-2 {
      left: 40%;
    }
    .div-3 {
      left: 60%;
    }
    .div-4 {
      left: 80%;
    }
    .password-strength-bar {
      position: relative;
      background-image: -webkit-linear-gradient(left, #ff5500, #ff9300);
      transition: all 0.35s ease-in-out;
      height: 8px;
      width: 100%;
      margin-top: 5px;
    }
  }
`;Object(c.registerFormField)("password",Object(c.connect)()(le));var se,ce,de=n(2),me=n.n(de),pe=n(172),ue=n.n(pe);const ge=h()((ce=se=class extends l.Component{renderChildren(){const{children:e,itemStyle:t,offset:n,span:r}=this.props;return s.a.createElement("div",{className:"button-group"},s.a.createElement(u.Row,null,s.a.createElement(u.Col,{span:r},s.a.createElement(u.Col,{offset:n,className:"inline"},s.a.createElement("div",{className:"inline-view",style:t},e)))))}getStickyBoundaryHandler(e){return()=>(this.formNode=this.formNode||me.a.findDOMNode(e.current),!this.formNode||((e,{offset:t=0,threshold:n=0}={})=>{const{top:r,right:a,bottom:o,left:i,width:l,height:s}=e,c=o,d=window.innerWidth-i,m=window.innerHeight-r,p=a,u=n*l,g=n*s;return c>=(t.top||t+g)&&d>=(t.right||t+u)&&m>=(t.bottom||t+g)&&p>=(t.left||t+u)})(this.formNode.getBoundingClientRect()))}render(){const{sticky:e,style:t,className:n}=this.props,r=s.a.createElement(k,null,({inline:e}={})=>s.a.createElement("div",{className:m()(n,{"is-inline":!!e}),style:t},this.renderChildren()));return e?s.a.createElement("div",null,s.a.createElement(k,null,({inline:e,FormRef:a}={})=>{if(a)return s.a.createElement(ue.a,{edge:"bottom",triggerDistance:this.props.triggerDistance,offsetDistance:this.props.offsetDistance,zIndex:this.props.zIndex,getStickyBoundary:this.getStickyBoundaryHandler(a),style:{borderTop:"1px solid #eee",background:t&&t.background||"#fff",padding:t&&t.padding||"8px 0"}},s.a.createElement("div",{className:n,style:t},r))})):r}},i()(se,"defaultProps",{span:24,zIndex:100}),ce))`
  ${e=>e.align?`display:flex;justify-content: ${(e=>"start"===e||"end"===e?e:"left"===e||"top"===e?"flex-start":"right"===e||"bottom"===e?"flex-end":e)(e.align)}`:""}
  &.is-inline {
    display: inline-block;
    flex-grow: 3;
  }
  .button-group {
    .inline {
      display: inline-block;
      .inline-view {
        & > * {
          margin-right: 10px;
          margin-left: 0px;
          display: inline-block;
        }
        & > *:last-child {
          margin-right: 0 !important;
        }
      }
    }
  }
`,xe=({showLoading:e,...t})=>s.a.createElement(c.FormConsumer,null,({status:e,schema:n})=>s.a.createElement(p.Button,a()({type:"primary",htmlType:"submit"},t,{loading:t.showLoading?"submitting"===e:void 0}),t.children||"提交"));xe.defaultProps={showLoading:!0};const he=e=>s.a.createElement(c.FormConsumer,null,({status:t,reset:n})=>s.a.createElement(p.Button,a()({},e,{onClick:n}),e.children||"重置"));var fe,be,ye,ve;xe.__docgenInfo={description:"",methods:[],displayName:"Submit",props:{showLoading:{defaultValue:{value:"true",computed:!1},required:!1}}},he.__docgenInfo={description:"",methods:[],displayName:"Reset"};const Fe=Object(c.createVirtualBox)("layout",({children:e,...t})=>s.a.createElement(k,null,n=>{let r={...n,...t},a=r.inline||r.className||r.style?s.a.createElement("div",{className:m()(r.className,{"next-form next-inline":!!r.inline}),style:r.style},e):e;return s.a.createElement(j,{value:r},a)})),Ee=Object(c.createVirtualBox)("grid",class extends l.Component{renderFormItem(e){const{title:t,description:n,help:r,name:a,extra:o,...i}=this.props;return s.a.createElement(k,{},({labelAlign:o,labelTextAlign:l,labelCol:c,wrapperCol:d,size:m,autoAddColon:p})=>s.a.createElement(T,{labelAlign:o,labelTextAlign:l,labelCol:c,wrapperCol:d,autoAddColon:p,size:m,...i,label:t,noMinHeight:!0,id:a,extra:n,help:r},e))}renderGrid(){let{children:e,cols:t,title:n,description:r,help:o,extra:i,...l}=this.props;e=Object(f.x)(e),t=Object(f.x)(t).map(e=>((e,t=0)=>e?"object"==typeof e?e:{span:e}:t)(e));const c=e.length;if(t.length<c){let e=c-t.length,n=24-t.reduce((e,t)=>e+Number(t.span?t.span:0)+Number(t.offset?t.offset:0),0);for(let r=0;r<e;r++)t.push(parseInt(e/n))}return s.a.createElement(u.Row,l,e.reduce((e,n,r)=>n?e.concat(s.a.createElement(u.Col,a()({key:r},t[r]),n)):e,[]))}render(){const{title:e}=this.props;return e?this.renderFormItem(this.renderGrid()):this.renderGrid()}}),we=Object(c.createVirtualBox)("card",h()((be=fe=class extends l.Component{render(){const{children:e,className:t,...n}=this.props;return s.a.createElement(J.a,a()({className:t},n),e)}},i()(fe,"defaultProps",{contentHeight:"auto"}),be))`
    margin-bottom: 30px;
    .next-card-body {
      padding-top: 30px;
      padding-bottom: 0 !important;
    }
  `),Ce=Object(c.createVirtualBox)("block",h()((ve=ye=class extends l.Component{render(){const{children:e,className:t,...n}=this.props;return s.a.createElement(J.a,a()({className:t},n),e)}},i()(ye,"defaultProps",{contentHeight:"auto"}),ve))`
    margin-bottom: 0px;
    .next-card-body {
      padding-top: 20px;
      padding-bottom: 0 !important;
    }
    &.next-card {
      border: none;
      padding: 0 15px;
      padding-bottom: 15px;
    }
  `);Ee.__docgenInfo={description:"",methods:[{name:"renderFormItem",docblock:null,modifiers:[],params:[{name:"children",optional:!1,type:null}],returns:null},{name:"renderGrid",docblock:null,modifiers:[],params:[],returns:null}]},n.d(t,"SchemaForm",function(){return c.SchemaForm}),n.d(t,"Field",function(){return c.Field}),n.d(t,"setValidationLocale",function(){return c.setValidationLocale}),n.d(t,"setValidationLanguage",function(){return c.setValidationLanguage}),n.d(t,"createFormActions",function(){return c.createFormActions}),n.d(t,"createAsyncFormActions",function(){return c.createAsyncFormActions}),n.d(t,"registerFormField",function(){return c.registerFormField}),n.d(t,"registerFormFields",function(){return c.registerFormFields}),n.d(t,"registerFormWrapper",function(){return c.registerFormWrapper}),n.d(t,"registerFieldMiddleware",function(){return c.registerFieldMiddleware}),n.d(t,"registerFormFieldPropsTransformer",function(){return c.registerFormFieldPropsTransformer}),n.d(t,"caculateSchemaInitialValues",function(){return c.caculateSchemaInitialValues}),n.d(t,"FormPath",function(){return c.FormPath}),n.d(t,"createVirtualBox",function(){return c.createVirtualBox}),n.d(t,"FormSlot",function(){return c.FormSlot}),n.d(t,"connect",function(){return c.connect}),n.d(t,"FormBridge",function(){return c.FormBridge}),n.d(t,"FormProvider",function(){return c.FormProvider}),n.d(t,"useForm",function(){return c.useForm}),n.d(t,"FormConsumer",function(){return c.FormConsumer}),n.d(t,"createArrayField",function(){return c.createArrayField}),n.d(t,"FormButtonGroup",function(){return ge}),n.d(t,"Submit",function(){return xe}),n.d(t,"Reset",function(){return he}),n.d(t,"FormLayout",function(){return Fe}),n.d(t,"FormItemGrid",function(){return Ee}),n.d(t,"FormCard",function(){return we}),n.d(t,"FormBlock",function(){return Ce}),n.d(t,"mapStyledProps",function(){return E}),n.d(t,"mapTextComponent",function(){return w});t.default=c.SchemaForm},72:function(e,t,n){"use strict";var r=n(133),a=(n(134),n(135)),o=(n(136),function(e){var t={exports:{}};e(t,t.exports);var n=t.exports.__esModule&&t.exports.default||t.exports;return"function"==typeof n?n:function(){return r.createElement("div",{},"Code snippet should export a component!")}}),i=o(function(e,t){var r=n(10),a=n(142);t.__esModule=!0,t.default=function(){return o.default.createElement(i.default,{defaultValue:{aa:"123"},onSubmit:function(e){return alert(JSON.stringify(e))}},o.default.createElement(i.Field,{name:"aa",type:"custom_component"}),o.default.createElement("button",{htmltype:"submit"},"提交"))};var o=a(n(0)),i=(r(n(2)),a(n(115)));(0,i.registerFormField)("custom_component",(0,i.connect)()(function(e){return o.default.createElement("input",{value:e.value,onChange:function(t){return e.onChange(t.target.value)}})}))}),l=o(function(e,t){var r=n(142),a=n(10);t.__esModule=!0,t.default=function(){return o.default.createElement(i.default,{defaultValue:{aa:"123"},labelCol:4,wrapperCol:20,onSubmit:function(e){return console.log(e)}},o.default.createElement(i.Field,{type:"string",enum:["1","2","3","4"],required:!0,title:"Radio","x-component":"radio",name:"radio"}),o.default.createElement(i.Field,{type:"string",enum:["1","2","3","4"],required:!0,title:"Select",name:"select"}),o.default.createElement(i.Field,{type:"string",enum:["1","2","3","4"],required:!0,"x-component":"checkbox",title:"Checkbox",name:"checkbox"}),o.default.createElement(i.Field,{type:"number",title:"数字选择",name:"number"}),o.default.createElement(i.Field,{type:"boolean",title:"开关选择",name:"boolean"}),o.default.createElement(i.Field,{type:"date",title:"日期选择",name:"date"}),o.default.createElement(i.Field,{type:"daterange",title:"日期范围",name:"daterange"}),o.default.createElement(i.Field,{type:"year",title:"年份",name:"year"}),o.default.createElement(i.Field,{type:"time",title:"时间",name:"time"}),o.default.createElement(i.Field,{type:"array",title:"卡片上传文件",name:"upload","x-component":"upload","x-props":{listType:"card"}}),o.default.createElement(i.Field,{type:"array",title:"拖拽上传文件",name:"upload2","x-component":"upload","x-props":{listType:"dragger"}}),o.default.createElement(i.Field,{type:"array",title:"普通上传文件",name:"upload3","x-component":"upload","x-props":{listType:"text"}}),o.default.createElement(i.Field,{type:"number",title:"范围选择",name:"range","x-component":"range","x-props":{min:0,max:1024,marks:[0,1024]}}),o.default.createElement(i.Field,{type:"array","x-component":"transfer",title:"穿梭框",name:"transfer"}),o.default.createElement(i.Field,{type:"number","x-component":"rating",title:"等级",name:"rating"}),o.default.createElement(i.FormButtonGroup,{offset:7},o.default.createElement(i.Submit,null),o.default.createElement(i.Reset,null)))};var o=a(n(0)),i=(a(n(2)),r(n(143)));n(146)}),s=function(){return r.createElement(r.Fragment,{},r.createElement("h2",{id:"uformreact-用例",className:"react-demo-h2"},"@uform/react 用例"),r.createElement("p",{className:"react-demo-p"},"在 React 中，我们可以先使用 @uform/react 来快速开发一个简单表单，首先需要知道的是，\n每个表单数据结构都是一个对象结构，用 Field 组件来描述这个对象结构所有字段"),r.createElement("blockquote",{className:"react-demo-blockquote"},r.createElement("p",{className:"react-demo-p"},"需要注意的是，Field 组件它是一个描述型组件，所以您不能像一个正常的 UI 组件一样\n对其传 value/defaultValue/onChange 来处理状态的同步。")),r.createElement(a,{code:"import React, { Component } from 'react'\nimport ReactDOM from 'react-dom'\nimport SchemaForm, { registerFormField, Field, connect } from '@uform/react'\n\nregisterFormField('custom_component',connect()((props)=>{\n  return <input value={props.value} onChange={e=>props.onChange(e.target.value)}/>\n}))\n\nReactDOM.render(\n  <SchemaForm\n    defaultValue={{ aa: '123' }}\n    onSubmit={values => alert(JSON.stringify(values))}\n  >\n    <Field name=\"aa\" type=\"custom_component\" />\n    <button htmltype=\"submit\">提交</button>\n  </SchemaForm>,\n  document.getElementById('root')\n)\n",justCode:!1,lang:"jsx"},r.createElement(i,{})),r.createElement("p",{className:"react-demo-p"},"这是使用 @uform/react 做最原始的开发，您需要通过 registerFormField 来自己注册数据类\n型与其对应的 React 组件，通过 connect 包装器来包装你的 React 组件，这样你的\nReact 组件只需要符合 value/defaultValue/onChange 这样的属性规范就能快速接入表单\n，当然，您也可以不使用 connect，这样您能获得更加自由的定制能力，这个在后面的 API\n文档中会详细介绍。"),r.createElement("h2",{id:"uformnext-用例",className:"react-demo-h2"},"@uform/next 用例"),r.createElement(a,{code:'import React from \'react\'\nimport ReactDOM from \'react-dom\'\nimport SchemaForm, { Field, FormButtonGroup, Submit, Reset } from \'@uform/next\'\nimport \'@alifd/next/dist/next.css\'\nReactDOM.render(\n  <SchemaForm\n    defaultValue={{ aa: \'123\' }}\n    labelCol={4}\n    wrapperCol={20}\n    onSubmit={values => console.log(values)}\n  >\n    <Field\n      type="string"\n      enum={[\'1\', \'2\', \'3\', \'4\']}\n      required\n      title="Radio"\n      x-component="radio"\n      name="radio"\n    />\n    <Field\n      type="string"\n      enum={[\'1\', \'2\', \'3\', \'4\']}\n      required\n      title="Select"\n      name="select"\n    />\n    <Field\n      type="string"\n      enum={[\'1\', \'2\', \'3\', \'4\']}\n      required\n      x-component="checkbox"\n      title="Checkbox"\n      name="checkbox"\n    />\n    <Field type="number" title="数字选择" name="number" />\n    <Field type="boolean" title="开关选择" name="boolean" />\n    <Field type="date" title="日期选择" name="date" />\n    <Field type="daterange" title="日期范围" name="daterange" />\n    <Field type="year" title="年份" name="year" />\n    <Field type="time" title="时间" name="time" />\n    <Field\n      type="array"\n      title="卡片上传文件"\n      name="upload"\n      x-component="upload"\n      x-props={{ listType: \'card\' }}\n    />\n    <Field\n      type="array"\n      title="拖拽上传文件"\n      name="upload2"\n      x-component="upload"\n      x-props={{ listType: \'dragger\' }}\n    />\n    <Field\n      type="array"\n      title="普通上传文件"\n      name="upload3"\n      x-component="upload"\n      x-props={{ listType: \'text\' }}\n    />\n    <Field\n      type="number"\n      title="范围选择"\n      name="range"\n      x-component="range"\n      x-props={{ min: 0, max: 1024, marks: [0, 1024] }}\n    />\n    <Field type="array" x-component="transfer" title="穿梭框" name="transfer" />\n    <Field type="number" x-component="rating" title="等级" name="rating" />\n    <FormButtonGroup offset={7}>\n      <Submit />\n      <Reset />\n    </FormButtonGroup>\n  </SchemaForm>,\n  document.getElementById(\'root\')\n)\n',justCode:!1,lang:"jsx"},r.createElement(l,{})),r.createElement("p",{className:"react-demo-p"},"在 @uform/next 例子中，你可以看到，已经可以使用很多数据类型的组件了，同时 @uform/next 还扩展了 FormButtonGroup/Submit/Reset 这些组件，可以帮助您快速开发表\n单，当然它扩展的不止这些组件，还有很多布局相关的组件，这个可以在后面 API 文档中\n详细查看。"))};s.meta={username:"zhili.wzl",email:"wangzhili56@126.com"},e.exports=s}}]);