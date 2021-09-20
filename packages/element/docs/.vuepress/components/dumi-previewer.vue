<template>
  <client-only>
    <section class="dumi-previewer">
      <div class="dumi-previewer-demo">
        <template v-if="demoPath && demo">
          <component :is="demo" />
        </template>

        <template v-else>
          <slot name="demo"></slot>
        </template>
      </div>

      <div class="dumi-previewer-actions">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            class="dumi-previewer-actions__icon"
            viewBox="0 0 256 296"
            @click="openCodeSandBox"
          >
            <path
              d="M115.498 261.088v-106.61L23.814 101.73v60.773l41.996 24.347v45.7l49.688 28.54zm23.814.627l50.605-29.151V185.78l42.269-24.495v-60.011l-92.874 53.621v106.82zm80.66-180.887l-48.817-28.289l-42.863 24.872l-43.188-24.897l-49.252 28.667l91.914 52.882l92.206-53.235zM0 222.212V74.495L127.987 0L256 74.182v147.797l-128.016 73.744L0 222.212z"
              fill="#000"
            ></path>
          </svg>
        </div>

        <div>
          <svg
            v-if="copied"
            class="dumi-previewer-actions__icon"
            style="fill: green"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
            />
          </svg>

          <svg
            v-else
            class="dumi-previewer-actions__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            @click="handleCopy"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"
            />
          </svg>

          <svg
            class="dumi-previewer-actions__icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            @click="handleCollapse"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
            />
          </svg>
        </div>
      </div>

      <div v-show="!innerCollapsed" class="dumi-previewer-source">
        <div v-html="highlightCode" class="language-vue extra-class" />
      </div>
    </section>
  </client-only>
</template>

<script>
import copy from 'copy-to-clipboard'
import highlight from './highlight'
import { createCodeSandBox } from './createCodeSandBox'

export default {
  name: 'dumi-previewer',

  props: {
    code: {
      type: String,
      default: '',
    },

    demoPath: {
      type: String,
      default: '',
    },
    collapsed: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      innerCollapsed: this.collapsed,
      copied: false,
      timerId: null,
      demoStr: '',
      /**
       * take over VuePress render
       * 接管VuePress渲染
       */
      demo: null,
    }
  },

  computed: {
    decodedCode() {
      return decodeURIComponent(this.code || this.demoStr)
    },

    highlightCode() {
      return highlight(this.decodedCode, 'vue')
    },
  },

  created() {
    if (this.demoPath) {
      import(
        /* webpackPrefetch: true */ `../../demos/${this.demoPath}.vue`
      ).then((module) => {
        this.demo = module.default
      })
      import(
        /* webpackPrefetch: true */ `!raw-loader!../../demos/${this.demoPath}.vue`
      ).then((module) => {
        this.demoStr = module.default
      })
    }
  },

  beforeDestroy() {
    clearTimeout(this.timerId)
  },

  methods: {
    handleCollapse() {
      this.innerCollapsed = !this.innerCollapsed
    },

    handleCopy() {
      this.copied = true
      copy(this.decodedCode)

      clearTimeout(this.timer)
      this.timerId = setTimeout(() => {
        this.copied = false
      }, 2000)
    },

    openCodeSandBox() {
      createCodeSandBox(this.demoStr)
    },
  },
}
</script>

<style lang="stylus">
.dumi-previewer {
  background-color: #fff;
  border: 1px solid #ebedf1;
  border-radius: 1px;

  .dumi-previewer-demo {
    padding: 40px 24px;
  }

  .dumi-previewer-actions {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px dashed #ebedf1;
    height: 40px;
    padding: 0 1em;

    .dumi-previewer-actions__icon {
      width: 16px;
      height: 16px;
      padding: 8px 4px;
      opacity: 0.4;
      cursor: pointer;
      transition: opacity .3s;

      &:hover {
        opacity: 0.6;
      }
    }
  }

  .dumi-previewer-source {
    border-top: 1px dashed #ebedf1;

    div[class*="language-"] {
      background-color: #f9fafb;
      border-radius: 0;
    }

    pre[class*="language-"] {
      margin: 0 !important;
    }

    pre[class*="language-"] code {
      color: #000 !important;
    }

    .token.cdata,.token.comment,.token.doctype,.token.prolog {
      color: #708090
    }

    .token.punctuation {
      color: #999
    }

    .token.namespace {
      opacity: .7
    }

    .token.boolean,.token.constant,.token.deleted,.token.number,.token.property,.token.symbol,.token.tag {
      color: #905
    }

    .token.attr-name,.token.builtin,.token.char,.token.inserted,.token.selector,.token.string {
      color: #690
    }

    .language-css .token.string,.style .token.string,.token.entity,.token.operator,.token.url {
      color: #9a6e3a;
      background: hsla(0,0%,100%,.5)
    }

    .token.atrule,.token.attr-value,.token.keyword {
      color: #07a
    }

    .token.class-name,.token.function {
      color: #dd4a68
    }

    .token.important,.token.regex,.token.variable {
      color: #e90
    }
  }
}
</style>
