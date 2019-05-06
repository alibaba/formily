(window.webpackJsonp=window.webpackJsonp||[]).push([[11,5],{108:function(e,t,r){"use strict";var n=r(135),i=(r(136),r(137)),a=(r(138),function(e){var t={exports:{}};e(t,t.exports);var r=t.exports.__esModule&&t.exports.default||t.exports;return"function"==typeof r?r:function(){return n.createElement("div",{},"Code snippet should export a component!")}}(function(e,t){var n=r(9),i=r(146);t.__esModule=!0,t.default=function(){return a.default.createElement(d,null)};var a=i(r(0)),s=(n(r(2)),r(149)),o=r(68),l=n(r(132));r(152);var c=(0,s.createFormActions)(),d=function(){var e=(0,a.useState)({editable:!1}),t=e[0],r=e[1];return a.default.createElement(l.default,null,a.default.createElement(s.SchemaForm,{actions:c,initialValues:t.value,editable:t.editable,labelCol:7,wrapperCol:12},a.default.createElement(s.FormCard,{title:"aaa",name:"card1"},a.default.createElement(s.FormCard,{title:"aaa",name:"card"},a.default.createElement(s.Field,{type:"string",name:"string",required:!0,title:"字符串","x-props":{addonAfter:"%"}}),a.default.createElement(s.Field,{type:"radio",enum:[{label:"选项1",value:"1"},{label:"选项2",value:"2"},{label:"选项3",value:"3"},{label:"选项4",value:"4"}],required:!0,title:"Radio",name:"radio"}),a.default.createElement(s.Field,{type:"string",enum:[{label:"选项1",value:"1"},{label:"选项2",value:"2"},{label:"选项3",value:"3"},{label:"选项4",value:"4"}],required:!0,title:"Select单选",name:"select"}))),a.default.createElement(s.FormCard,{title:"bbbb"},a.default.createElement(s.Field,{type:"string",enum:[{label:"选项1",value:"1"},{label:"选项2",value:"2"},{label:"选项3",value:"3"},{label:"选项4",value:"4"}],required:!0,title:"Select多选","x-props":{multiple:!0},name:"multiselect"}),a.default.createElement(s.Field,{type:"checkbox",enum:[{label:"选项1",value:"1"},{label:"选项2",value:"2"},{label:"选项3",value:"3"},{label:"选项4",value:"4"}],required:!0,title:"Checkbox",name:"checkbox"})),a.default.createElement(s.Field,{type:"number",title:"数字选择",name:"number"}),a.default.createElement(s.Field,{type:"boolean",title:"开关选择",name:"boolean"}),a.default.createElement(s.Field,{type:"date",title:"日期选择",name:"date"}),a.default.createElement(s.Field,{type:"daterange",title:"日期范围",name:"daterange"}),a.default.createElement(s.Field,{type:"year",title:"年份",name:"year"}),a.default.createElement(s.Field,{type:"time",title:"时间",name:"time"}),a.default.createElement(s.Field,{type:"upload",title:"卡片上传文件",name:"upload","x-props":{listType:"card"}}),a.default.createElement(s.Field,{type:"upload",title:"拖拽上传文件",name:"upload2","x-props":{listType:"dragger"}}),a.default.createElement(s.Field,{type:"upload",title:"普通上传文件",name:"upload3","x-props":{listType:"text"}}),a.default.createElement(s.Field,{type:"range",title:"范围选择",name:"range","x-props":{min:0,max:1024,marks:[0,1024]}}),a.default.createElement(s.Field,{type:"transfer",title:"穿梭框",name:"transfer"}),a.default.createElement(s.Field,{type:"rating",title:"等级",name:"rating"}),a.default.createElement(s.FormButtonGroup,{offset:7,sticky:!0},a.default.createElement(s.Submit,null),a.default.createElement(o.Button,{type:"primary",onClick:function(){return r({editable:!t.editable})}},t.editable?"详情":"编辑"),a.default.createElement(o.Button,{onClick:function(){r({value:{string:200,radio:"1",select:"2",multiselect:["2","3"],checkbox:["1","2"],number:123333,boolean:!0,date:"2018-11-30",daterange:["2018-11-30","2019-01-02"],year:"2018",time:"22:00:00",upload:[{downloadURL:"//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png",imgURL:"//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png",name:"doc.svg"}],range:200,rating:3}})}},"加载详情数据"),a.default.createElement(o.Button,{onClick:function(){c.validate()}},"手动触发校验"),a.default.createElement(s.Reset,null))))}})),s=function(){return n.createElement(n.Fragment,{},n.createElement("h1",{id:"表单详情",className:"react-demo-h1"},"表单详情"),n.createElement("h4",{id:"demo-示例",className:"react-demo-h4"},"Demo 示例"),n.createElement(i,{code:"import React, { useState } from 'react'\nimport ReactDOM from 'react-dom'\nimport {\n  SchemaForm,\n  Field,\n  FormButtonGroup,\n  Submit,\n  Reset,\n  FormItemGrid,\n  FormCard,\n  FormPath,\n  FormBlock,\n  FormLayout,\n  createFormActions\n} from '@uform/antd'\nimport { Button } from 'antd'\nimport Printer from '@uform/printer'\nimport 'antd/dist/antd.css'\nconst actions = createFormActions()\n\nconst App = () => {\n  const [state, setState] = useState({ editable: false })\n  return (\n    <Printer>\n      <SchemaForm\n        actions={actions}\n        initialValues={state.value}\n        editable={state.editable}\n        labelCol={7}\n        wrapperCol={12}\n      >\n        <FormCard title=\"aaa\" name=\"card1\">\n          <FormCard title=\"aaa\" name=\"card\">\n            <Field\n              type=\"string\"\n              name=\"string\"\n              required\n              title=\"字符串\"\n              x-props={{\n                addonAfter: '%'\n              }}\n            />\n            <Field\n              type=\"radio\"\n              enum={[\n                { label: '选项1', value: '1' },\n                { label: '选项2', value: '2' },\n                { label: '选项3', value: '3' },\n                { label: '选项4', value: '4' }\n              ]}\n              required\n              title=\"Radio\"\n              name=\"radio\"\n            />\n            <Field\n              type=\"string\"\n              enum={[\n                { label: '选项1', value: '1' },\n                { label: '选项2', value: '2' },\n                { label: '选项3', value: '3' },\n                { label: '选项4', value: '4' }\n              ]}\n              required\n              title=\"Select单选\"\n              name=\"select\"\n            />\n          </FormCard>\n        </FormCard>\n        <FormCard title=\"bbbb\">\n          <Field\n            type=\"string\"\n            enum={[\n              { label: '选项1', value: '1' },\n              { label: '选项2', value: '2' },\n              { label: '选项3', value: '3' },\n              { label: '选项4', value: '4' }\n            ]}\n            required\n            title=\"Select多选\"\n            x-props={{ multiple: true }}\n            name=\"multiselect\"\n          />\n          <Field\n            type=\"checkbox\"\n            enum={[\n              { label: '选项1', value: '1' },\n              { label: '选项2', value: '2' },\n              { label: '选项3', value: '3' },\n              { label: '选项4', value: '4' }\n            ]}\n            required\n            title=\"Checkbox\"\n            name=\"checkbox\"\n          />\n        </FormCard>\n        <Field type=\"number\" title=\"数字选择\" name=\"number\" />\n        <Field type=\"boolean\" title=\"开关选择\" name=\"boolean\" />\n        <Field type=\"date\" title=\"日期选择\" name=\"date\" />\n        <Field type=\"daterange\" title=\"日期范围\" name=\"daterange\" />\n        <Field type=\"year\" title=\"年份\" name=\"year\" />\n        <Field type=\"time\" title=\"时间\" name=\"time\" />\n        <Field\n          type=\"upload\"\n          title=\"卡片上传文件\"\n          name=\"upload\"\n          x-props={{ listType: 'card' }}\n        />\n        <Field\n          type=\"upload\"\n          title=\"拖拽上传文件\"\n          name=\"upload2\"\n          x-props={{ listType: 'dragger' }}\n        />\n        <Field\n          type=\"upload\"\n          title=\"普通上传文件\"\n          name=\"upload3\"\n          x-props={{ listType: 'text' }}\n        />\n        <Field\n          type=\"range\"\n          title=\"范围选择\"\n          name=\"range\"\n          x-props={{ min: 0, max: 1024, marks: [0, 1024] }}\n        />\n        <Field type=\"transfer\" title=\"穿梭框\" name=\"transfer\" />\n        <Field type=\"rating\" title=\"等级\" name=\"rating\" />\n        <FormButtonGroup offset={7} sticky>\n          <Submit />\n          <Button\n            type=\"primary\"\n            onClick={() => setState({ editable: !state.editable })}\n          >\n            {!state.editable ? '编辑' : '详情'}\n          </Button>\n          <Button\n            onClick={() => {\n              setState({\n                value: {\n                  string: 200,\n                  radio: '1',\n                  select: '2',\n                  multiselect: ['2', '3'],\n                  checkbox: ['1', '2'],\n                  number: 123333,\n                  boolean: true,\n                  date: '2018-11-30',\n                  daterange: ['2018-11-30', '2019-01-02'],\n                  year: '2018',\n                  time: '22:00:00',\n                  upload: [\n                    {\n                      downloadURL:\n                        '//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png',\n                      imgURL:\n                        '//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png',\n                      name: 'doc.svg'\n                    }\n                  ],\n                  range: 200,\n                  rating: 3\n                }\n              })\n            }}\n          >\n            加载详情数据\n          </Button>\n          <Button\n            onClick={() => {\n              actions.validate()\n            }}\n          >\n            手动触发校验\n          </Button>\n          <Reset />\n        </FormButtonGroup>\n      </SchemaForm>\n    </Printer>\n  )\n}\n\nReactDOM.render(<App />, document.getElementById('root'))\n",justCode:!1,lang:"jsx"},n.createElement(a,{})))};s.meta={username:"zhili.wzl",email:"wangzhili56@126.com"},e.exports=s},115:function(e,t,r){"use strict";r.r(t);var n={};r.r(n),r.d(n,"url",function(){return H}),r.d(n,"email",function(){return U}),r.d(n,"ipv6",function(){return L}),r.d(n,"ipv4",function(){return W}),r.d(n,"number",function(){return K}),r.d(n,"integer",function(){return G}),r.d(n,"qq",function(){return Q}),r.d(n,"phone",function(){return J}),r.d(n,"idcard",function(){return Z}),r.d(n,"taodomain",function(){return ee}),r.d(n,"money",function(){return te}),r.d(n,"zh",function(){return re}),r.d(n,"date",function(){return ne}),r.d(n,"zip",function(){return ie});var i=r(129),a=r.n(i),s=r(0),o=r.n(s),l=r(117),c=r.n(l),d=r(140),u=r.n(d),h=r(116);const p=(e,t,r)=>Object(h.t)(t,(e,t)=>Object(h.o)(t)?t(e):e,e,r),m=e=>t=>r=>e({...t},r),f=(e,t)=>"properties"!==t&&"items"!==t,b=(e,t)=>"properties"!==t&&"items"!==t&&"children"!==t;let g,v,y,x,j;const O=()=>{var e,t;g=[],v={},y={},x=void 0,t=e=class extends o.a.Component{render(){const{formRef:e,component:t,...r}=this.props;return o.a.createElement(t,{...r,ref:e})}},c()(e,"defaultProps",{component:"form"}),(j=t).displayName="Form"},F=(e,t,r)=>{Object(h.r)(e)&&e&&(Object(h.o)(t)||"string"==typeof t.styledComponentId)&&(r?(v[Object(h.s)(e)]=t,v[Object(h.s)(e)].registerMiddlewares=[]):(v[Object(h.s)(e)]=p(t,g,!0),v[Object(h.s)(e)].registerMiddlewares=g),v[Object(h.s)(e)].displayName=u()(e))},E=e=>{Object(h.g)(e,(e,t)=>{F(t,e)})},w=(...e)=>{g=g.concat(e),Object(h.g)(v,(t,r)=>{t.registerMiddlewares.some(t=>e.indexOf(t)>-1)||(v[r]=p(v[r],e,!0),v[r].registerMiddlewares=g)})},S=(...e)=>{j=e.reduce((e,t,r)=>{let n=Object(h.o)(t)?t(e):e;return n.displayName=`FormWrapperLevel${r}`,n},j)},C=(e,t)=>{Object(h.o)(t)&&(y[e]=t)},k=e=>y[e],N=e=>v[e],V=o.a.forwardRef((e,t)=>o.a.createElement(j,{...e,ref:t})),A=e=>e.reduce((e,t)=>Object(h.k)(t)?e.concat(A(t)):e.concat(t),[]),P=e=>({change(t){e.form.setValue(e.name,t)},dispatch(t,r){e.form.triggerEffect(t,{name:e.name,path:e.path,payload:r})},errors(t,...r){e.form.setErrors(e.name,A(Object(h.x)(t)),...r)},push(t){const r=Object(h.x)(e.form.getValue(e.name));e.form.setValue(e.name,r.concat(t))},pop(){const t=[].concat(Object(h.x)(e.form.getValue(e.name)));t.pop(),e.form.setValue(e.name,t)},insert(t,r){const n=[].concat(Object(h.x)(e.form.getValue(e.name)));n.splice(t,0,r),e.form.setValue(e.name,n)},remove(t){let r=e.form.getValue(e.name);(e=>"number"==typeof e)(t)&&Object(h.k)(r)?((r=[].concat(r)).splice(t,1),e.form.setValue(e.name,r)):e.form.removeValue(e.name)},unshift(t){const r=[].concat(Object(h.x)(e.form.getValue(e.name)));r.unshift(t),e.form.setValue(e.name,r)},shift(){const t=[].concat(Object(h.x)(e.form.getValue(e.name)));t.shift(),e.form.setValue(e.name,t)},move(t,r){const n=[].concat(Object(h.x)(e.form.getValue(e.name))),i=n[t];n.splice(t,1),n.splice(r,0,i),e.form.setValue(e.name,n)}}),I=o.a.createContext(),T=o.a.createContext(),$=o.a.createContext(),q=m((e,t)=>{class r extends s.Component{constructor(e){super(e),c()(this,"renderField",(e,t)=>{const r=this.props.path.concat(e),n=this.props.schemaPath.concat(e),i=r.join(".");return o.a.createElement(q,{key:t?i:void 0,path:r,name:i,schemaPath:n})}),c()(this,"getOrderProperties",e=>{const{schema:t,path:r}=this.props;if(!t&&!e)return[];const n=[];return Object(h.g)((e||t||{}).properties,(e,t)=>{let i=e["x-index"],a=r.concat(t),s=a.join(".");"number"==typeof i?n[i]={schema:e,key:t,path:a,name:s}:n.push({schema:e,key:t,path:a,name:s})}),n}),this.initialized=!1,this.state={},this.field=e.form.registerField(e.name||e.schemaPath.join("."),{path:e.schemaPath,onChange:this.onChangeHandler(e),props:e.schema}),this.initialized=!0,this.mutators=P(e)}onChangeHandler(){return e=>{if(this.initialized){if(this.unmounted)return;this.setState(e)}else this.state=e}}componentWillUnmount(){this.unmounted=!0,this.field.remove()}componentDidMount(){this.unmounted=!1,this.field.restore()}componentDidUpdate(e){Object(h.n)(this.props.schema,e.schema,f)||this.field.changeProps(this.props.schema)}render(){const{name:e,path:r,schemaPath:n,locale:i,getSchema:a}=this.props,{value:s,visible:l,props:c,errors:d,loading:u,editable:p,required:m}=this.state,f=Object(h.v)(c,"object")?s||{}:Object(h.v)(c,"array")?s||[]:s;return!1===l?o.a.createElement(o.a.Fragment,null):o.a.createElement(t,{name:e,value:f,errors:d,required:m,path:r,editable:p,locale:i,loading:u,schemaPath:n,getSchema:a,renderField:this.renderField,getOrderProperties:this.getOrderProperties,mutators:this.mutators,schema:c})}}return c()(r,"displayName","StateField"),e=>{const{name:t,path:n,schemaPath:i}=e,{form:a,getSchema:l,locale:c}=Object(s.useContext)(T);return o.a.createElement(r,{name:t,path:n,form:a,schema:l(i||n),locale:c,getSchema:l,schemaPath:i})}})()(e=>{const t=e.schema,r=Object(h.s)(t["x-component"]||t.type),n=t["x-render"]?n=>o.a.createElement(N(r),{...e,...n,schema:t,path:e.path,name:e.name}):void 0,i=t["x-render"]?(()=>x)():N(r);return i?o.a.createElement(i,{...e,renderComponent:n}):(console&&console.error&&(r?console.error(`The schema field \`${r}\`'s component is not found.`):console.error("The schema field's component is not found, or field's schema is not defined.")),o.a.createElement(o.a.Fragment,null))});var B=r(2);let M=0;const z=(e,t)=>{const r=Object(s.useContext)(I);if(Object(h.v)(r,"object")){let t=e.name||(()=>`UFORM_NO_NAME_FIELD_$${M++}`)();return r.properties=r.properties||{},r.properties[t]=Object(h.d)(e,b),o.a.createElement(I.Provider,{value:r.properties[t]},e.children)}return Object(h.v)(r,"array")?(r.items=Object(h.d)(e,b),o.a.createElement(I.Provider,{value:r.items},e.children)):e.children||o.a.createElement(o.a.Fragment,null)},R=m((e,t)=>{var r,n;return n=r=class extends s.Component{constructor(...e){super(...e),c()(this,"portalRoot",document.createElement("div"))}render(){let{children:e,initialValues:r,defaultValue:n,value:i,schema:s,...l}=this.props,c=!1;return s?c=!0:s={type:"object"},M=0,o.a.createElement(o.a.Fragment,null,!c&&Object(B.createPortal)(o.a.createElement(I.Provider,{value:s},e),this.portalRoot),o.a.createElement(t,a()({},l,{defaultValue:i||n,value:i,initialValues:r,schema:s}),e))}},c()(r,"displayName","SchemaMarkupParser"),n});z.__docgenInfo={description:"",methods:[],displayName:"SchemaField"};var X=r(119),D=r(120);const Y=(e,t,r)=>{if(Object(X.f)(t))return"";return Object(X.j)(e)&&(e.lastIndex=0),(Object(X.h)(e)?e(t):Object(X.j)(e)?e.test(String(t)):new RegExp(String(e)).test(String(t)))?"":r};var _=(e,t,r,n)=>{if(t.pattern)return Y(t.pattern,e,Object(X.c)(t.message||Object(D.a)("pattern"),n,e,t.pattern))};const H=new RegExp("^(?:(?:(?:https?|ftp):)?//)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:22[0-3]|2[01]\\d|[1-9]\\d?|1\\d\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})){2}(?:\\.(?:25[0-4]|2[0-4]\\d|1\\d\\d|[1-9]\\d?))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$"),U=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,L=/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,W=/^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/,K=/^[+-]?\d+(\.\d+)?$/,G=/^[+-]?\d+$/,Q=/^(\+?[1-9]\d*|0)$/,J=/^\d{3}-\d{8}$|^\d{4}-\d{7}$|^\d{11}$/,Z=/^\d{15}$|^\d{18}$/,ee=/^(https?\:)?\/\/[a-zA-Z0-9\.\-]+\.(taobao|tmall|alitrip|yao\.95095)(\.daily)?\.(com|net|hk(\/hk)?)/,te=/^([\u0024\u00A2\u00A3\u00A4\u20AC\u00A5\u20B1\20B9\uFFE5]\s*)(\d+,?)+\.?\d*\s*$/,re=/^[\u4e00-\u9fa5]+$/,ne=/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-\/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-\/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/,ie=/^[0-9]{6}$/,ae=Object.keys(n);var se=(e,t,r,i)=>((e,t,r,i)=>{for(let r=0;r<ae.length;r++)if(ae[r]===t.format)return Y(n[ae[r]],e,Object(X.c)(t.message||Object(D.a)(t.format),i,e))})(e,t,0,i),oe=(e,t,r,n)=>{if(t.required)return Object(X.f)(e)?Object(X.c)(t.message||Object(D.a)("required"),n):""},le=(e,t,r,n)=>{if(Object(X.h)(t.validator))return t.validator(e,t,r,n)};const ce=(e,t,r,n)=>Promise.all(((...e)=>(...t)=>e.map(e=>Promise.resolve(e(...t))))(se,oe,_,le)(e,t,r,n)),de=e=>Object(X.l)(e,(e,t)=>Object(X.e)(t)?e.concat(de(t)):t?e.concat(t):e,[]),ue=(e,t,r,n)=>{const i=[];return Object(X.h)(r)&&(n=r,r=!1),Object(X.b)(t,(t,n)=>{const a=Object(X.d)(e,n);if(!1===t.visible||!1===t.editable)return;if(Object(X.g)(t.__lastValidateValue,a)&&!r)return;const s=t.props&&t.props.title;let o=setTimeout(()=>{t.loading=!0,t.dirty=!0,t.notify&&t.notify()},100);i.push(Promise.all(Object(X.m)(t.rules).map(t=>((e,t,r,n)=>{const i=Object(X.i)(t)?t:Object(X.k)(t)?{format:t}:Object(X.h)(t)?{validator:t}:{};return ce(e,i,r,n)})(a,t,e,s||n))).then(e=>{clearTimeout(o);let i=t.errors;const s=t.valid,l=t.loading;return t.loading=!1,r?(e&&(t.errors=de(Object(X.m)(e))),t.errors.length?(t.valid=!1,t.invalid=!0):(t.valid=!0,t.invalid=!1),t.errors&&t.errors.length&&(t.dirty=!0)):t.pristine||(e&&(t.errors=de(Object(X.m)(e))),t.errors.length?(t.valid=!1,t.invalid=!0):(t.valid=!0,t.invalid=!1),Object(X.g)(s,t.valid)&&Object(X.g)(i,t.errors)||(t.dirty=!0)),t.loading!==l&&(t.dirty=!0),t.dirty&&t.notify&&t.notify(),t.__lastValidateValue=Object(X.a)(a),{name:n,value:a,field:t,invalid:t.invalid,valid:t.valid,errors:t.errors}}))}),Promise.all(i).then(e=>(Object(X.h)(n)&&n(e),e))};var he=r(141),pe=r.n(he),me=r(121);const fe=(e,t)=>"properties"!==t&&"items"!==t;class be{constructor(e,t){this.fieldbrd=new me.a,this.context=e,this.dirty=!1,this.pristine=!0,this.valid=!0,this.removed=!1,this.invalid=!1,this.visible=!0,this.editable=!0,this.destructed=!1,this.loading=!1,this.errors=[],this.effectErrors=[],this.initialized=!1,this.initialize(t),this.initialized=!0}initialize(e){const t=this.getEditableFromProps(e.props),r=this.getRulesFromProps(e.props);this.value=Object(me.o)(e.value)?this.value:Object(me.e)(e.value),this.initialValue=Object(me.o)(e.initialValue)?Object(me.o)(this.initialValue)?this.getInitialValueFromProps(e.props):this.initialValue:e.initialValue,this.name=Object(me.o)(e.name)?this.name||"":e.name,this.namePath=Object(me.w)(this.name),this.editable=Object(me.o)(t)?this.editable:t,this.path=Object(me.w)(Object(me.o)(e.path)?this.path||[]:e.path),this.rules=Object(me.o)(r)?this.rules:r,this.required=Object(me.k)(this.rules),this.props=Object(me.o)(e.props)?this.props||{}:Object(me.o)(this.props)?Object(me.e)(e.props):{...this.props,...Object(me.e)(e.props)},this.removed&&(this.removed=!1,this.visible=!0),this.initialized||Object(me.o)(this.value)&&!Object(me.o)(this.initialValue)&&(this.value=Object(me.e)(this.initialValue),this.context.setIn(this.name,this.value),this.context.setInitialValueIn(this.name,this.initialValue)),Object(me.q)(e.onChange)&&this.onChange(e.onChange)}getInitialValueFromProps(e){if(e&&!Object(me.o)(e.default))return e.default}getEditableFromProps(e){if(e){if(!Object(me.o)(e.editable))return this.getEditable(e.editable);if(e["x-props"]&&!Object(me.o)(e["x-props"].editable))return this.getEditable(e["x-props"].editable)}return this.getEditable(this.context.editable)}getRulesFromProps(e){if(e){const t=Object(me.y)(e["x-rules"]);return e.required&&!t.some(e=>e.required)&&t.push({required:!0}),Object(me.e)(t)}return this.rules}getRequiredFromProps(e){if(!Object(me.o)(e.required))return e.required}getEditable(e){return Object(me.q)(e)?e(this.name):Object(me.m)(e)?e:this.editable}onChange(e){Object(me.q)(e)&&(this.unSubscribeOnChange&&this.unSubscribeOnChange(),e(this.publishState()),this.unSubscribeOnChange=this.subscribe(e))}pathEqual(e){if(Object(me.r)(e)&&e===this.name)return!0;if((e=Object(me.w)(e)).length===this.path.length){for(let t=0;t<e.length;t++)if(e[t]!==this.path[t])return!1;return!0}if(e.length===this.namePath.length){for(let t=0;t<e.length;t++)if(e[t]!==this.namePath[t])return!1;return!0}return!1}publishState(){return Object(me.s)(this)}subscribe(e){return this.fieldbrd.subscribe(e)}notify(e){(this.dirty||e)&&(this.fieldbrd.notify(this.publishState()),this.dirty=!1,this.dirtyType="")}unsubscribe(){this.fieldbrd.unsubscribe()}changeProps(e,t){let r=this.props;Object(me.o)(e)||!t&&Object(me.p)(r,e,fe)||(this.props=Object(me.e)(e,fe),this.editable=this.getEditableFromProps(this.props),this.rules=this.getRulesFromProps(this.props),this.dirty=!0,this.notify())}changeEditable(e){this.props&&Object(me.o)(this.props.editable)&&(this.props["x-props"]&&!Object(me.o)(this.props["x-props"].editable)||(this.editable=this.getEditable(e),this.dirty=!0,this.notify()))}restore(){this.removed&&(this.visible=!0,this.removed=!1)}remove(){this.value=void 0,this.initialValue=void 0,this.visible=!1,this.removed=!0,this.context&&(this.context.deleteIn(this.name),this.context.deleteInitialValues(this.name),"object"==typeof this.value&&this.context.updateChildrenVisible(this,!1))}checkState(e=this.publishState()){Object(me.p)(e.value,this.value)||(this.value=e.value,this.pristine=!1,this.context.setIn(this.name,this.value),this.context.updateChildrenValue(this),this.dirtyType="value",this.dirty=!0),Object(me.p)(e.initialValue,this.initialValue)||(this.initialValue=e.initialValue,this.context.setInitialValueIn(this.name,this.value),this.context.updateChildrenInitalValue(this),this.dirtyType="initialValue",this.dirty=!0);const t=this.getEditable(e.editable);if(Object(me.p)(t,this.editable)){const t=this.getEditableFromProps(e.props);Object(me.o)(t)||Object(me.p)(t,this.editable)||(this.editable=t,this.dirtyType="editable",this.dirty=!0)}else this.editable=t,this.dirtyType="editable",this.dirty=!0;if(e.errors=Object(me.y)(e.errors).filter(e=>!!e),Object(me.p)(e.errors,this.effectErrors)||(this.effectErrors=e.errors,this.valid=this.effectErrors.length>0&&this.errors.length>0,this.invalid=!this.valid,this.dirtyType="errors",this.dirty=!0),Object(me.p)(e.rules,this.rules)){const t=this.getRulesFromProps(this.props),r=this.getRulesFromProps(e.props);Object(me.o)(r)||Object(me.p)(t,r)||Object(me.p)(r,this.rules)||(this.rules=r,this.errors=[],Object(me.k)(this.rules)&&(this.required=!0,e.required=!0),this.valid=!0,this.invalid=!1,this.dirtyType="rules",this.dirty=!0)}else this.rules=e.rules,this.errors=[],this.valid=!0,Object(me.k)(this.rules)&&(this.required=!0,e.required=!0),this.invalid=!1,this.dirtyType="rules",this.dirty=!0;if(Object(me.p)(e.required,this.required)){const t=this.getRequiredFromProps(e.props);Object(me.o)(t)||Object(me.p)(t,this.required)||(this.required=t,this.errors=[],this.required?Object(me.k)(this.rules)||(this.rules=Object(me.y)(this.rules).concat({required:!0}),this.errors=[],this.valid=!0,this.invalid=!1):(this.rules=Object(me.y)(this.rules).filter(e=>!e||!e.required),this.errors=[],this.valid=!0,this.invalid=!1),this.dirty=!0)}else this.required=e.required,this.required?Object(me.k)(this.rules)||(this.rules=Object(me.y)(this.rules).concat({required:!0}),this.errors=[],this.valid=!0,this.invalid=!1):(this.rules=Object(me.y)(this.rules).filter(e=>!e||!e.required),this.errors=[],this.valid=!0,this.invalid=!1),this.dirty=!0;e.loading!==this.loading&&(this.loading=e.loading,this.dirtyType="loading",this.dirty=!0),Object(me.p)(e.visible,this.visible)||(this.visible=e.visible,this.visible?(this.value=void 0!==this.value?this.value:Object(me.e)(this.initialValue),void 0!==this.value&&this.context.setIn(this.name,this.value),this.context.updateChildrenVisible(this,!0)):(this.context.deleteIn(this.name),this.context.updateChildrenVisible(this,!1)),this.dirtyType="visible",this.dirty=!0),Object(me.p)(e.props,this.props,fe)||(this.props=Object(me.e)(e.props,fe),this.dirtyType="props",this.dirty=!0)}updateState(e){if(!Object(me.q)(e))return;const t={name:this.name,path:this.path,props:Object(me.e)(this.props,fe),value:Object(me.e)(this.value),initialValue:Object(me.e)(this.initialValue),valid:this.valid,loading:this.loading,editable:this.editable,invalid:this.invalid,pristine:this.pristine,rules:Object(me.e)(this.rules),errors:Object(me.e)(this.effectErrors),visible:this.visible,required:this.required};e(t),this.checkState(t)}destructor(){this.destructed||(this.destructed=!0,void 0!==this.value&&(this.value=void 0,this.context.deleteIn(this.name)),this.context.updateChildrenVisible(this,!1),delete this.context,this.unsubscribe(),delete this.fieldbrd)}}var ge=r(157),ve=r(158),ye=r(156),xe=r.n(ye);const je=(e,t,r)=>Object(me.q)(t)?e&&t(r):e,Oe=/\*/,Fe={match(e,t,r){e+="";const n=xe()(e);Object(me.q)(t)&&(r=t,t=!1);const i=e=>e&&e.fieldState?je(n(Object(me.w)(t?e.fieldState.path:e.fieldState.name)),r,e.fieldState):e&&e.name&&e.path?je(n(Object(me.w)(t?e.path:e.name)),r,e):Object(me.r)(e)?je(n(Object(me.w)(e)),r,{name:e}):!!Object(me.l)(e)&&je(n(e),r,{path:e});return i.hasWildcard=Oe.test(e),i.string=e,i},exclude:e=>t=>Object(me.q)(e)?!e(t):!!Object(me.r)(e)&&!Fe.match(e)(t),transform:(e,t,r)=>r(...Object(me.v)(Object(me.w)(e),(e,r)=>new RegExp(t).test(r)?e.concat(r):e,[]))},Ee=e=>({initialValues:{},onSubmit:e=>{},effects:e=>{},...e});class we{constructor(e){pe()(this,"triggerEffect",(e,...t)=>{this.subscribes[e]&&this.subscribes[e].next(...t)}),pe()(this,"setFieldState",(e,t,r)=>{if(!this.destructed)return Object(me.q)(t)&&(r=t,t=!1),(Object(me.r)(e)||Object(me.l)(e)||Object(me.q)(e))&&this.updateQueue.push({path:e,callback:r}),new Promise(e=>{this.syncUpdateMode&&(this.updateFieldStateFromQueue(t),e()),this.updateQueue.length>0&&(this.updateRafId&&Object(me.d)(this.updateRafId),this.updateRafId=Object(me.u)(()=>{this.destructed||(this.updateFieldStateFromQueue(t),e())}))})}),pe()(this,"getFieldState",(e,t)=>{let r;if(Object(me.h)(this.fields,t=>{if(t.pathEqual(e))return r=t,!1}),r)return Object(me.q)(t)?t(r.publishState()):r.publishState()}),pe()(this,"getFormState",e=>Object(me.q)(e)?e(this.publishState()):this.publishState()),pe()(this,"setFormState",e=>{if(!Object(me.q)(e))return;const t=this.publishState();return e(t,e),Promise.resolve(this.checkState(t))}),this.options=Ee(e),this.formbrd=new me.a,this.initialized=!1,this.state={},this.fields={},this.subscribes=e.subscribes||{},this.updateQueue=[],this.updateBuffer=new me.b,this.editable=e.editable,this.schema=e.schema||{},this.initialize(this.options.initialValues),this.initializeEffects(),this.initialized=!0,this.destructed=!1,this.fieldSize=0}initialize(e=this.state.initialValues){const t=this.state.values,r=this.state.dirty;this.state={valid:!0,invalid:!1,errors:[],pristine:!0,initialValues:Object(me.e)(e)||{},values:Object(me.e)(e)||{},dirty:r||!!this.initialized&&!Object(me.p)(e,t)},this.options.onFormChange&&!this.initialized&&(this.subscribe(this.options.onFormChange),this.options.onFormChange({formState:this.publishState()})),this.updateFieldsValue(!1)}changeValues(e){const t=this.state.values,r=this.state.dirty;this.state.values=e||{},this.state.dirty=r||!!this.initialized&&!Object(me.p)(e,t),this.updateFieldsValue()}changeEditable(e){this.editable=e,Object(me.h)(this.fields,(t,r)=>{t.changeEditable(e)})}initializeEffects(){const{effects:e}=this.options;Object(me.q)(e)&&e((e,t)=>(this.subscribes[e]||(this.subscribes[e]=new ge.Subject),Object(me.r)(t)||Object(me.q)(t)?this.subscribes[e].pipe(Object(ve.filter)(Object(me.r)(t)?Fe.match(t):t)):this.subscribes[e]),{setFieldState:this.setFieldState,getFieldState:this.getFieldState,getFormState:this.getFormState,setFormState:this.setFormState})}checkState(e){return Object(me.p)(this.state.values,e.values)?Object(me.p)(this.state.initialValues,e.initialValues)?void 0:(this.state.initialValues=e.initialValues,this.state.dirty=!0,this.updateFieldInitialValue()):(this.state.values=e.values,this.state.dirty=!0,this.updateFieldsValue())}syncUpdate(e){Object(me.q)(e)&&(this.syncUpdateMode=!0,e(),this.syncUpdateMode=!1)}asyncUpdate(e){Object(me.q)(e)&&(this.syncUpdateMode?(this.syncUpdateMode=!1,e(),this.syncUpdateMode=!0):e())}updateFieldStateFromQueue(e){const t={},r={};Object(me.h)(this.updateQueue,({path:n,callback:i},a)=>{Object(me.h)(this.fields,s=>{if(n&&(Object(me.q)(n)||Object(me.l)(n)||Object(me.r)(n)))if(Object(me.q)(n)?n(s):s.pathEqual(n)){if(s.updateState(i),this.syncUpdateMode&&(s.dirty=!1),n.hasWildcard&&this.updateBuffer.push(n.string,i,{path:n}),s.dirty){const e=s.dirtyType;s.notify(),r[s.name]&&Object(me.d)(r[s.name]),r[s.name]=Object(me.u)(()=>{"value"===e?this.internalValidate().then(()=>{this.formNotify(s.publishState())}):this.formNotify(s.publishState())})}}else t[a]=t[a]||0,t[a]++,this.fieldSize<=t[a]&&(e||n.hasWildcard)&&(Object(me.r)(n)?this.updateBuffer.push(n,i,{path:n}):Object(me.q)(n)&&n.hasWildcard&&this.updateBuffer.push(n.string,i,{path:n}))})}),this.updateQueue=[]}updateFieldStateFromBuffer(e){const t={};this.updateBuffer.forEach(({path:r,values:n,key:i})=>{if(Object(me.q)(r)?r(e):e.pathEqual(r)){if(n.forEach(t=>e.updateState(t)),this.syncUpdateMode&&(e.dirty=!1),e.dirty){const r=e.dirtyType;e.notify(),t[e.name]&&Object(me.d)(t[e.name]),t[e.name]=Object(me.u)(()=>{"value"===r?this.internalValidate().then(()=>{this.formNotify(e.publishState())}):this.formNotify(e.publishState())})}r.hasWildcard||this.updateBuffer.remove(i)}})}internalValidate(e=this.state.values,t){if(!this.destructed)return new Promise(r=>{this.rafValidateId&&Object(me.d)(this.rafValidateId),this.rafValidateId=Object(me.u)(()=>this.destructed?r():ue(e||this.state.values,this.fields,t).then(e=>{const t=this.state.valid;let r=Object(me.v)(e,(e,{valid:t,errors:r})=>e.concat(r),[]);this.state.valid=0===r.length,this.state.invalid=!this.state.valid,this.state.errors=r,this.state.valid!==t&&(this.state.dirty=!0);const n=this.state.pristine;return Object(me.p)(this.state.values,this.state.initialValues)?this.state.pristine=!0:this.state.pristine=!1,n!==this.state.pristine&&(this.state.dirty=!0),e}).then(r))})}registerField(e,t){const r=this.getValue(e),n=this.getInitialValue(e,t.path),i=this.fields[e];if(i)i.initialize({...t,value:Object(me.o)(r)?n:r,initialValue:n}),this.asyncUpdate(()=>{this.updateFieldStateFromBuffer(i)}),this.triggerEffect("onFieldChange",i.publishState());else{this.fields[e]=new be(this,{name:e,value:Object(me.o)(r)?n:r,path:t.path,initialValue:n,props:t.props});let i=this.fields[e];t.onChange&&(this.asyncUpdate(()=>{this.updateFieldStateFromBuffer(i),i.onChange(t.onChange)}),this.triggerEffect("onFieldChange",i.publishState())),this.fieldSize++}return this.fields[e]}setIn(e,t){Object(me.x)(this.state.values,e,t)}setInitialValueIn(e,t){Object(me.x)(this.state.initialValues,e,t)}setValue(e,t){const r=this.fields[e];r&&(r.updateState(e=>{e.value=t}),r.pristine=!1,r.dirty&&(r.notify(),this.internalValidate(this.state.values).then(()=>{this.formNotify(r.publishState())})))}setErrors(e,t,...r){t=Object(me.y)(t);const n=this.fields[e];if(n){const e=n.errors;Object(me.p)(e,t)||(n.errors=t.map(e=>Object(X.c)(e,...r)),t.length?(n.invalid=!0,n.valid=!1):(n.invalid=!1,n.valid=!0),n.dirty=!0,n.notify())}}updateChildrenValue(e){e.path&&!this.batchUpdateField&&Object(me.h)(this.fields,(t,r)=>{if(Object(me.n)(t,e)){let e=this.getValue(r);Object(me.p)(t.value,e)||(t.dirty=!0,t.value=e,t.notify(),this.triggerEffect("onFieldChange",t.publishState()))}})}updateChildrenInitalValue(e){e.path&&Object(me.h)(this.fields,(t,r)=>{if(Object(me.n)(t,e)){let e=this.getInitialValue(r);Object(me.p)(t.initialValue,e)||(t.dirty=!0,t.initialValue=e)}})}updateFieldInitialValue(){this.state.dirty&&this.initialized&&Object(me.h)(this.fields,(e,t)=>{let r=this.getInitialValue(t);e.initialValue=r})}updateFieldsValue(e=!0){const{promise:t,resolve:r}=Object(me.f)(),n=()=>{const e=[];this.batchUpdateField=!0,Object(me.h)(this.fields,(t,r)=>{let n=this.getValue(r);t.updateState(e=>{e.value=n}),t.dirty&&e.push(new Promise(e=>{Object(me.u)(()=>{this.destructed||(t.notify(),this.triggerEffect("onFieldChange",t.publishState()),e())})}))}),this.batchUpdateField=!1,r(Promise.all(e))};return this.state.dirty&&this.initialized&&(e?this.internalValidate(this.state.values,!0).then(()=>{this.formNotify(),n()}):n()),t}updateChildrenVisible(e,t){e.path&&Object(me.h)(this.fields,(r,n)=>{if(n!==e.name&&Object(me.n)(r,e)){if(t){let e=void 0!==r.value?r.value:Object(me.e)(r.initialValue);void 0!==r.value&&this.setIn(n,e)}else this.deleteIn(n);r.visible!==t&&(r.visible=t,r.dirty=!0)}})}getInitialValue(e,t){const r=Object(me.i)(this.state.initialValues,e);let n,i;return void 0===r&&void 0!==(i=(n=t?Object(me.j)(this.schema,t):void 0)&&n.default)&&this.setIn(e,i),void 0!==r?r:i}getValue(e,t){return t?Object(me.e)(Object(me.i)(this.state.values,e)):Object(me.i)(this.state.values,e)}deleteIn(e){Object(me.g)(this.state.values,e)}deleteInitialValues(e){Object(me.g)(this.state.initialValues,e)}reset(e){Object(me.h)(this.fields,(t,r)=>{const n=this.getValue(r),i=this.getInitialValue(r,t.path);Object(me.o)(n)&&Object(me.o)(i)||(t.updateState(t=>{t.value=e?void 0:i}),t.dirty&&Object(me.u)(()=>{this.destructed||t.notify()}))}),this.internalValidate(this.state.values,!0).then(()=>{this.formNotify(),Object(me.u)(()=>{const e=this.publishState();this.triggerEffect("onFormReset",e),Object(me.q)(this.options.onReset)&&this.options.onReset({formState:e})})})}publishState(){return Object(me.t)(this.state)}formNotify(e){const t=this.publishState();return Object(me.q)(this.options.onFieldChange)&&this.options.onFieldChange({formState:t,fieldState:e}),e&&this.triggerEffect("onFieldChange",e),this.state.dirty&&this.formbrd.notify({formState:t,fieldState:e}),this.state.dirty=!1,t}validate(){return this.internalValidate(this.state.values,!0).then(()=>new Promise((e,t)=>{this.formNotify(),Object(me.u)(()=>{this.state.valid?e(this.publishState()):(this.options.onValidateFailed&&this.options.onValidateFailed(this.state.errors),t(this.state.errors))})}))}submit(){return this.validate().then(e=>(this.triggerEffect("onFormSubmit",e),Object(me.q)(this.options.onSubmit)&&this.options.onSubmit({formState:e}),e))}subscribe(e){return this.formbrd.subscribe(e)}destructor(){this.destructed||(this.destructed=!0,this.formbrd.unsubscribe(),Object(me.h)(this.subscribes,e=>{e.unsubscribe()}),Object(me.h)(this.fields,(e,t)=>{e.destructor(),delete this.fields[t]}),this.fieldSize=0,delete this.fields,delete this.formbrd)}}const Se=({initialValues:e,onSubmit:t,onReset:r,schema:n,onFormChange:i,onFieldChange:a,onFormWillInit:s,subscribes:o,editable:l,effects:c,onValidateFailed:d})=>{let u=[];e=Object(me.c)(n,e,({name:e,path:t,schemaPath:r},n,i)=>{u.push({name:e,path:t,schemaPath:r,schema:n,value:i})});const h=new we({initialValues:e,onSubmit:t,onReset:r,subscribes:o,onFormChange:i,onFieldChange:a,editable:l,effects:c,onValidateFailed:d,schema:n});return Object(me.q)(s)&&s(h),u=u.map(({name:e,path:t,schemaPath:r,schema:n,value:i})=>h.registerField(e||r.join("."),{path:r,props:n})),h.syncUpdate(()=>{h.triggerEffect("onFormInit",h.publishState())}),h};var Ce=r(142);const ke=()=>e=>{const t=t=>{const r=Object(s.useContext)($);return r?o.a.createElement(e,a()({},t,{broadcast:r})):o.a.createElement(Ne,null,r=>o.a.createElement(e,a()({},t,{broadcast:r})))};return t.displayName="FormBroadcast",t};class Ne extends s.Component{constructor(...e){super(...e),c()(this,"broadcast",new h.a)}componentWillUnmount(){this.broadcast.unsubscribe()}render(){const{children:e}=this.props;return o.a.createElement($.Provider,{value:this.broadcast},Object(h.o)(e)?e(this.broadcast):e)}}c()(Ne,"displayName","FormProvider");const Ve=({testingAct:e}={})=>{let[t,r]=Object(s.useState)({}),n=Object(s.useContext)($),i=!1;Object(s.useMemo)(()=>{n&&(n.subscribe(({type:n,state:a,schema:s})=>{"submit"!==n&&"reset"!==n&&(i?e?e(()=>r({status:n,state:a,schema:s})):r({status:n,state:a,schema:s}):t={status:n,state:a,schema:s})}),i=!0)},[n]);const{status:a,state:o,schema:l}=t;return{status:a,state:o,schema:l,submit:()=>{n&&n.notify({type:"submit"})},reset:()=>{n&&n.notify({type:"reset"})},dispatch:(e,t)=>{n&&n.notify({type:"dispatch",name:e,payload:t})}}},Ae=({children:e,testingAct:t})=>{const r=Ve({testingAct:t});return r?Object(h.o)(e)?e(r):e||o.a.createElement(o.a.Fragment,null):o.a.createElement(o.a.Fragment,null)};Ne.__docgenInfo={description:"",methods:[],displayName:"FormProvider"},Ae.__docgenInfo={description:"",methods:[],displayName:"FormConsumer"};const Pe=m((e,t)=>{class r extends s.Component{constructor(e){super(e),c()(this,"getSchema",e=>{const{schema:t}=this.props,r=Object(h.j)(t,e),n=r&&k(r["x-component"]||r.type);return n?n(r):r}),c()(this,"onNativeSubmitHandler",e=>{e.preventDefault&&(e.stopPropagation(),e.preventDefault()),this.form.submit().catch(e=>{console&&console.error&&console.error(e)})}),c()(this,"getValues",()=>this.form.getValue()),c()(this,"submit",()=>this.form.submit()),c()(this,"reset",e=>{this.form.reset(e)}),c()(this,"validate",()=>this.form.validate()),c()(this,"dispatch",(e,t)=>{this.form.triggerEffect(e,t)}),this.initialized=!1,this.form=Se({initialValues:e.defaultValue||e.initialValues,effects:e.effects,subscribes:e.subscribes,schema:e.schema,editable:e.editable,onSubmit:this.onSubmitHandler(e),onFormChange:this.onFormChangeHandler(e),onFieldChange:this.onFieldChangeHandler(e),onValidateFailed:e.onValidateFailed,onReset:this.onResetHandler(e),onFormWillInit:t=>{e.implementActions({setFormState:t.setFormState,getFormState:t.getFormState,setFieldState:t.setFieldState,getFieldState:t.getFieldState,reset:this.reset,submit:this.submit,validate:this.validate,getSchema:this.getSchema,dispatch:this.dispatch})}}),this.state={},this.initialized=!0}notify(e){const{broadcast:t,schema:r}=this.props;t&&(e.schema=r,t.notify(e))}onFormChangeHandler(e){let t=this.state;return({formState:e})=>{this.unmounted||(t&&t.pristine!==e.pristine&&(t.pristine?this.notify({type:"changed",state:e}):this.notify({type:"reseted",state:e})),t=e,this.initialized?e.dirty&&(clearTimeout(this.timerId),this.timerId=setTimeout(()=>{clearTimeout(this.timerId),this.setState(e)},60)):(this.state=e,this.notify({type:"initialize",state:e})))}}onFieldChangeHandler(e){return({formState:t})=>{if(e.onChange){const r=t.values;Object(h.n)(this.lastFormValues,r)||(e.onChange(r),this.lastFormValues=Object(h.d)(r))}}}onSubmitHandler(e){return({formState:t})=>{if(e.onSubmit){const r=e.onSubmit(Object(h.d)(t.values));r&&r.then&&(this.notify({type:"submitting",state:this.state}),r.then(()=>{this.notify({type:"submitted",state:this.state})},e=>{throw this.notify({type:"submitted",state:this.state}),e}))}}}onResetHandler(e){return({formState:t})=>{e.onReset&&e.onReset(Object(h.d)(t.values))}}shouldComponentUpdate(e){return!Object(h.n)(e,this.props)}componentDidUpdate(e){const{value:t,editable:r,initialValues:n}=this.props;Object(h.m)(t)||Object(h.n)(t,e.value)||this.form.changeValues(t),Object(h.m)(n)||Object(h.n)(n,e.initialValues)||this.form.initialize(n),Object(h.m)(r)||Object(h.n)(r,e.editable)||this.form.changeEditable(r)}componentDidMount(){this.unmounted=!1,this.form.triggerEffect("onFormMount",this.form.publishState()),this.unsubscribe=this.props.broadcast.subscribe(({type:e,name:t,payload:r})=>{"submit"===e?this.submit():"reset"===e?this.reset():"dispatch"===e&&this.form.triggerEffect(t,r)})}componentWillUnmount(){this.unmounted=!0,this.form&&(this.form.destructor(),this.unsubscribe(),delete this.form)}render(){const{onSubmit:e,onChange:r,onReset:n,onValidateFailed:i,initialValues:s,defaultValue:l,actions:c,effects:d,implementActions:u,dispatch:h,editable:p,createEvents:m,subscribes:f,subscription:b,children:g,schema:v,broadcast:y,locale:x,value:j,...O}=this.props;return o.a.createElement(T.Provider,{value:{form:this.form,getSchema:this.getSchema,locale:x,broadcast:this.broadcast}},o.a.createElement(t,a()({},O,{onSubmit:this.onNativeSubmitHandler}),g))}}return c()(r,"displayName","StateForm"),c()(r,"defaultProps",{locale:{}}),Object(Ce.connect)({autoRun:!1})(ke()(r))});var Ie=()=>F("object",class extends o.a.Component{renderProperties(){const{renderField:e,getOrderProperties:t}=this.props,r=t(),n=[];return Object(h.g)(r,({key:t}={})=>{t&&n.push(e(t,!0))}),n}render(){return this.renderProperties()}}),Te=()=>{var e,t;return(e=>{x=e})((t=e=class extends o.a.Component{render(){return Object(h.o)(this.props.schema["x-render"])?this.props.schema["x-render"](this.props):o.a.createElement(o.a.Fragment,null)}},c()(e,"displayName","FieldXRenderer"),t))},$e=()=>{var e,t;Object(h.u)("slot"),F("slot",(t=e=class extends o.a.Component{render(){const{schema:e}=this.props;return o.a.createElement(o.a.Fragment,null,e.renderChildren)}},c()(e,"displayName","FormSlot"),t))};const qe=(e,t)=>{var r,n;Object(h.u)(e),F(e,(n=r=class extends o.a.PureComponent{render(){const{schema:e,schemaPath:r,path:n,getOrderProperties:i}=this.props,a=n.slice(0,n.length-1),s=i(e).map(({key:e})=>{const t=a.concat(e),n=t.join("."),i=r.concat(e);return o.a.createElement(q,{key:i,name:n,path:t,schemaPath:i})});return o.a.createElement(t,e["x-props"],s)}},c()(r,"displayName","VirtualBoxWrapper"),n),!0);const i=({children:t,name:r,render:n,...i})=>o.a.createElement(z,{type:"object",name:r,"x-component":e,"x-props":i,"x-render":n},t);return t.defaultProps&&(i.defaultProps=t.defaultProps),i.displayName=u()(e),i},Be=({name:e,children:t})=>o.a.createElement(z,{type:"object",name:e,"x-component":"slot",renderChildren:t});Be.__docgenInfo={description:"",methods:[],displayName:"FormSlot"};const Me="undefined"!=typeof window&&window.navigator&&window.navigator.product&&"ReactNative"===window.navigator.product,ze=e=>t=>(e={valueName:"value",eventName:"onChange",...e},class extends s.PureComponent{render(){const{value:r,name:n,mutators:i,schema:a,editable:s}=this.props;let l={...e.defaultProps,...a["x-props"],[e.valueName]:r,[e.eventName]:(t,...r)=>{i.change(e.getValueFromEvent?e.getValueFromEvent.call({props:a["x-props"]||{}},t,...r):((e,t)=>{if((e=>!!(e&&e.stopPropagation&&e.preventDefault))(e)){if(!t&&e.nativeEvent&&void 0!==e.nativeEvent.text)return e.nativeEvent.text;if(t&&void 0!==e.nativeEvent)return e.nativeEvent.text;const r=e,{target:{type:n,value:i,checked:a,files:s},dataTransfer:o}=r;return"checkbox"===n?!!a:"file"===n?s||o&&o.files:"select-multiple"===n?(e=>{const t=[];if(e)for(let r=0;r<e.length;r++){const n=e[r];n.selected&&t.push(n.value)}return t})(e.target.options):i}return e})(t,Me))}};if(void 0!==s&&(Object(h.o)(s)?s(n)||(l.disabled=!0,l.readOnly=!0):!1===s&&(l.disabled=!0,l.readOnly=!0)),Object(h.o)(a["x-effect"])&&(l=((e,t,r)=>(Object(h.g)(t(r,{...e}),(t,r)=>{const n="onChange"===r?e[r]:void 0;e[r]=((...e)=>{if(Object(h.o)(n)&&n(...e),Object(h.o)(t))return t(...e)})}),e))(l,a["x-effect"],i.dispatch)),Object(h.o)(e.getProps)){let t=e.getProps(l,this.props);void 0!==t&&(l=t)}return Object(h.k)(a.enum)&&!l.dataSource&&(l.dataSource=((e,t)=>Object(h.k)(e)?e.map((e,r)=>"object"==typeof e?{...e}:{...e,label:Object(h.k)(t)&&t[r]||e,value:e}):[])(a.enum,a.enumNames)),void 0!==l.editable&&delete l.editable,o.a.createElement(Object(h.o)(e.getComponent)?e.getComponent(t,l,this.props):t,l)}}),Re=e=>{const{TextButton:t,CircleButton:r,AddIcon:n,RemoveIcon:i,MoveDownIcon:a,MoveUpIcon:s}={TextButton:()=>o.a.createElement("div",null,"You Should Pass The TextButton."),CircleButton:()=>o.a.createElement("div",null,"You Should Pass The CircleButton."),AddIcon:()=>o.a.createElement("div",null,"You Should Pass The AddIcon."),RemoveIcon:()=>o.a.createElement("div",null,"You Should Pass The RemoveIcon."),MoveDownIcon:()=>o.a.createElement("div",null,"You Should Pass The MoveDownIcon."),MoveUpIcon:()=>o.a.createElement("div",null,"You Should Pass The MoveUpIcon."),...e};return class extends o.a.Component{constructor(...e){super(...e),c()(this,"isActive",(e,t)=>{const r=this.getProps("readOnly"),n=this.getDisabled();return Object(h.o)(n)?n(e,t):Object(h.o)(r)?r(e,t):!r&&!n})}getApi(e){const{value:t}=this.props;return{index:e,isActive:this.isActive,dataSource:t,record:t[e],add:this.onAddHandler(),remove:this.onRemoveHandler(e),moveDown:r=>this.onMoveHandler(e,e+1>t.length-1?0:e+1)(r),moveUp:r=>this.onMoveHandler(e,e-1<0?t.length-1:e-1)(r)}}getProps(e){return Object(h.h)(this.props.schema,`x-props${e?"."+e:""}`)}renderWith(e,t,r){const n=this.getProps(Object(h.c)(`render-${e}`));return Object(h.o)(t)&&(r=t,t=0),Object(h.o)(n)?n(this.getApi(t)):r?Object(h.o)(r)?r(this.getApi(t),n):r:void 0}renderAddition(){const{locale:e}=this.props,{value:r}=this.props;return this.isActive("addition",r)&&this.renderWith("addition",({add:r},i)=>o.a.createElement("div",{className:"array-item-addition",onClick:r},o.a.createElement(t,null,o.a.createElement(n,null),i||e.addItem||"添加")))}renderEmpty(e){const{locale:r,value:i}=this.props;return 0===i.length&&this.renderWith("empty",({add:e,isActive:a},s)=>{const l=a("empty",i);return o.a.createElement("div",{className:`array-empty-wrapper ${l?"":"disabled"}`,onClick:l?e:void 0},o.a.createElement("div",{className:"array-empty"},o.a.createElement("img",{style:{backgroundColor:"transparent"},src:"//img.alicdn.com/tfs/TB1cVncKAzoK1RjSZFlXXai4VXa-184-152.svg"}),l&&o.a.createElement(t,null,o.a.createElement(n,null),s||r.addItem||"添加")))})}renderRemove(e,t){return this.isActive(`${e}.remove`,t)&&this.renderWith("remove",e,({remove:e},t)=>o.a.createElement(r,{onClick:e,hasText:!!t},o.a.createElement(i,null),t&&o.a.createElement("span",{className:"op-name"},t)))}renderMoveDown(e,t){const{value:n}=this.props;return n.length>1&&this.isActive(`${e}.moveDown`,t)&&this.renderWith("moveDown",e,({moveDown:e},t)=>o.a.createElement(r,{onClick:e,hasText:!!t},o.a.createElement(a,null),o.a.createElement("span",{className:"op-name"},t)))}renderMoveUp(e,t){const{value:n}=this.props;return n.length>1&&this.isActive(`${e}.moveUp`,n)&&this.renderWith("moveUp",e,({moveUp:e},t)=>o.a.createElement(r,{onClick:e,hasText:!!t},o.a.createElement(s,null),o.a.createElement("span",{className:"op-name"},t)))}renderExtraOperations(e){return this.renderWith("extraOperations",e)}getDisabled(){const{editable:e,name:t}=this.props,r=this.getProps("disabled");if(void 0!==e)if(Object(h.o)(e)){if(!e(t))return!0}else if(!1===e)return!0;return r}onRemoveHandler(e){const{value:t,mutators:r,schema:n,locale:i}=this.props,{minItems:a}=n;return n=>{n.stopPropagation(),a>=0&&t.length-1<a?r.errors(i.array_invalid_minItems,a):r.remove(e)}}onMoveHandler(e,t){const{mutators:r}=this.props;return n=>{n.stopPropagation(),r.move(e,t)}}onAddHandler(){const{value:e,mutators:t,schema:r,locale:n}=this.props,{maxItems:i}=r;return r=>{r.stopPropagation(),i>=0&&e.length+1>i?t.errors(n.array_invalid_maxItems,i):t.push()}}onClearErrorHandler(){return()=>{const{value:e,mutators:t,schema:r}=this.props,{maxItems:n,minItems:i}=r;(n>=0&&e.length<=n||i>=0&&e.length>=i)&&t.errors()}}validate(){const{value:e,mutators:t,schema:r,locale:n}=this.props,{maxItems:i,minItems:a}=r;e.length>i?t.errors(n.array_invalid_maxItems,i):e.length<a?t.errors(n.array_invalid_minItems,a):t.errors()}componentDidUpdate(e){Object(h.n)(e.value,this.props.value)||this.validate()}componentDidMount(){this.validate()}}};r.d(t,"SchemaForm",function(){return Xe}),r.d(t,"Field",function(){return De}),r.d(t,"setValidationLocale",function(){return Ye}),r.d(t,"setValidationLanguage",function(){return _e}),r.d(t,"createFormActions",function(){return He}),r.d(t,"createAsyncFormActions",function(){return Ue}),r.d(t,"createVirtualBox",function(){return qe}),r.d(t,"FormSlot",function(){return Be}),r.d(t,"connect",function(){return ze}),r.d(t,"FormBridge",function(){return ke}),r.d(t,"FormProvider",function(){return Ne}),r.d(t,"useForm",function(){return Ve}),r.d(t,"FormConsumer",function(){return Ae}),r.d(t,"createArrayField",function(){return Re}),r.d(t,"registerFormField",function(){return F}),r.d(t,"registerFormFields",function(){return E}),r.d(t,"registerFormWrapper",function(){return S}),r.d(t,"registerFieldMiddleware",function(){return w}),r.d(t,"registerFormFieldPropsTransformer",function(){return C}),r.d(t,"caculateSchemaInitialValues",function(){return h.b}),r.d(t,"FormPath",function(){return Fe}),O(),S(Pe()),Ie(),Te(),$e();const Xe=R()(o.a.forwardRef((e,t)=>{const{children:r,className:n,...i}=e;return o.a.createElement(V,a()({className:`rs-uform ${n||""}`},i,{ref:t}),o.a.createElement("div",{className:"rs-uform-content"},o.a.createElement(q,{name:"",path:[],schemaPath:[]})),r)})),De=z,Ye=D.c,_e=D.b,He=()=>Object(Ce.createActions)("getFormState","getFieldState","setFormState","setFieldState","getSchema","reset","submit","validate","dispatch"),Ue=()=>Object(Ce.createAsyncActions)("getFormState","getFieldState","setFormState","setFieldState","getSchema","reset","submit","validate","dispatch");Xe.displayName="SchemaForm";t.default=Xe},116:function(e,t,r){"use strict";var n=r(118);const i=e=>Object(n.a)(e)?e:e?[e]:[],a=(e,t,r)=>{if(Object(n.a)(e)){if(r){for(let r=e.length-1;r>=0;r--)if(!1===t(e[r],r))return}else for(let r=0,n=e.length;r<n;r++)if(!1===t(e[r],r))return}else for(let r in e)if(Object.hasOwnProperty.call(e,r)&&!1===t(e[r],r))return},s=(e,t,r,n)=>{let i=r;return a(e,(e,r)=>{i=t(i,e,r)},n),i},o=Symbol("newer"),l=Symbol("older");function c(e,t){"number"!=typeof e&&(t=e,e=0),this.size=0,this.limit=e,this.oldest=this.newest=void 0,this._keymap=new Map,t&&(this.assign(t),e<1&&(this.limit=this.size))}function d(e,t){this.key=e,this.value=t,this[o]=void 0,this[l]=void 0}function u(e){this.entry=e}function h(e){this.entry=e}function p(e){this.entry=e}function m(e){return" "===e||"\n"===e||"\t"===e||"\f"===e||"\r"===e}function f(e){return e?Object(n.a)(e)?e.join("."):Object(n.h)(e)?e:"":""}c.prototype._markEntryAsUsed=function(e){e!==this.newest&&(e[o]&&(e===this.oldest&&(this.oldest=e[o]),e[o][l]=e[l]),e[l]&&(e[l][o]=e[o]),e[o]=void 0,e[l]=this.newest,this.newest&&(this.newest[o]=e),this.newest=e)},c.prototype.assign=function(e){let t,r=this.limit||Number.MAX_VALUE;this._keymap.clear();let n=e[Symbol.iterator]();for(let e=n.next();!e.done;e=n.next()){let n=new d(e.value[0],e.value[1]);if(this._keymap.set(n.key,n),t?(t[o]=n,n[l]=t):this.oldest=n,t=n,0==r--)throw new Error("overflow")}this.newest=t,this.size=this._keymap.size},c.prototype.get=function(e){var t=this._keymap.get(e);if(t)return this._markEntryAsUsed(t),t.value},c.prototype.set=function(e,t){var r=this._keymap.get(e);return r?(r.value=t,this._markEntryAsUsed(r),this):(this._keymap.set(e,r=new d(e,t)),this.newest?(this.newest[o]=r,r[l]=this.newest):this.oldest=r,this.newest=r,++this.size,this.size>this.limit&&this.shift(),this)},c.prototype.shift=function(){var e=this.oldest;if(e)return this.oldest[o]?(this.oldest=this.oldest[o],this.oldest[l]=void 0):(this.oldest=void 0,this.newest=void 0),e[o]=e[l]=void 0,this._keymap.delete(e.key),--this.size,[e.key,e.value]},c.prototype.find=function(e){let t=this._keymap.get(e);return t?t.value:void 0},c.prototype.has=function(e){return this._keymap.has(e)},c.prototype.delete=function(e){var t=this._keymap.get(e);if(t)return this._keymap.delete(t.key),t[o]&&t[l]?(t[l][o]=t[o],t[o][l]=t[l]):t[o]?(t[o][l]=void 0,this.oldest=t[o]):t[l]?(t[l][o]=void 0,this.newest=t[l]):this.oldest=this.newest=void 0,this.size--,t.value},c.prototype.clear=function(){this.oldest=this.newest=void 0,this.size=0,this._keymap.clear()},u.prototype[Symbol.iterator]=function(){return this},u.prototype.next=function(){let e=this.entry;return e?(this.entry=e[o],{done:!1,value:[e.key,e.value]}):{done:!0,value:void 0}},h.prototype[Symbol.iterator]=function(){return this},h.prototype.next=function(){let e=this.entry;return e?(this.entry=e[o],{done:!1,value:e.key}):{done:!0,value:void 0}},p.prototype[Symbol.iterator]=function(){return this},p.prototype.next=function(){let e=this.entry;return e?(this.entry=e[o],{done:!1,value:e.value}):{done:!0,value:void 0}},c.prototype.keys=function(){return new h(this.oldest)},c.prototype.values=function(){return new p(this.oldest)},c.prototype.entries=function(){return this},c.prototype[Symbol.iterator]=function(){return new u(this.oldest)},c.prototype.forEach=function(e,t){"object"!=typeof t&&(t=this);let r=this.oldest;for(;r;)e.call(t,r.value,r.key,this),r=r[o]},c.prototype.toJSON=function(){for(var e=new Array(this.size),t=0,r=this.oldest;r;)e[t++]={key:r.key,value:r.value},r=r[o];return e},c.prototype.toString=function(){for(var e="",t=this.oldest;t;)e+=String(t.key)+":"+t.value,(t=t[o])&&(e+=" < ");return e};const b=new c(1e3);function g(e){if(Object(n.a)(e))return e;if(Object(n.h)(e)&&e){const t=b.get(e);if(t)return t;const r=e.split("."),n=[];for(let e=0;e<r.length;e++){let t=r[e];for(;"\\"===t[t.length-1]&&void 0!==r[e+1];)t=t.slice(0,-1)+".",t+=r[++e];n.push(t)}return b.set(e,n),n}return Object(n.d)(e)?[e]:[]}class v{constructor(e,t){this.text=e,this.index=0,this.cbs=t,this.state=this.processNameStart,this.declareNameStart=0,this.declareNameEnd=0,this.nbraceCount=0,this.nbracketCount=0}goto(e){this.state=this.StateMap[e]}parse(){let e="",t="",r=this.text.length;for(;this.index<r;this.index++)e=this.text.charAt(this.index),this.EOF=r-1===this.index,this.state(e,t),t=e}processNameStart(e){"{"===e||"["===e?(this.state=this.processDestructStart,this.index--):m(e)||(this.declareNameStart=this.index,this.state=this.processName)}processName(e,t){m(e)?(this.declareNameEnd=this.index,this.cbs.name(this.getName())):this.EOF&&(this.declareNameEnd=this.index+1,this.cbs.name(this.getName()))}processDestructStart(e){"{"===e?(this.nbraceCount++,this.cbs.destructObjectStart()):"["===e?(this.nbracketCount++,this.cbs.destructArrayStart()):m(e)||(this.state=this.processDestructKey,this.destructKeyStart=this.index,this.index--)}processDestructKey(e,t){"}"===e?(this.nbraceCount--,(this.nbraceCount||this.nbracketCount)&&(this.state=this.processDestructStart),m(t)||(this.destructKey=this.text.substring(this.destructKeyStart,this.index)),this.cbs.destructKey(this.destructKey),this.cbs.destructObjectEnd(),this.nbraceCount||this.nbracketCount||(this.index=this.text.length)):"]"===e?(this.nbracketCount--,(this.nbraceCount||this.nbracketCount)&&(this.state=this.processDestructStart),m(t)||(this.destructKey=this.text.substring(this.destructKeyStart,this.index)),this.cbs.destructKey(this.destructKey),this.cbs.destructArrayEnd(),this.nbraceCount||this.nbracketCount||(this.index=this.text.length)):(m(e)||":"===e||","===e)&&(m(t)||(this.destructKey=this.text.substring(this.destructKeyStart,this.index)),m(e)||(this.state=this.processDestructStart,this.cbs.destructKey(this.destructKey,":"===e)))}getName(){return this.text.substring(this.declareNameStart,this.declareNameEnd)}}const y=(e,t)=>{const r=(e,t,i)=>((e,t,r)=>{let i=Object(n.a)(e)?[]:{};return a(e,(e,r)=>{const a=t(e,r);Object(n.a)(i)?i.push(a):i[r]=a},r),i})(e,(e,a)=>{const s=t.concat(a);return Object(n.a)(e)||Object(n.f)(e)?r(e,s,i):i(s,s.slice(0,s.length-1).concat(e))});return r(e,[],t)},x=e=>{const t=g(e),r=t[t.length-1],i=t.slice(0,t.length-1);return{path:t,lastKey:r,startPath:i,destruct:(e=>{if(!Object(n.h)(e))return e;let t,r,i,a=[],s="",o="";return new v(e,{name(e){i=e},destructKey(e,i){if(e){if(s=e,i)return o=e,void(r=t);Object(n.a)(t)?t.push(e):Object(n.f)(t)&&(t[o&&r===t?o:e]=e),o="",r=t}},destructArrayStart(){t=t?[]:i=[];const e=a[a.length-1];Object(n.f)(e)?e[s]=t:Object(n.a)(e)&&e.push(t),a.push(t)},destructObjectStart(){t=t?{}:i={};const e=a[a.length-1];Object(n.f)(e)?e[s]=t:Object(n.a)(e)&&e.push(t),a.push(t)},destructArrayEnd(){a.pop(),t=a[a.length-1]},destructObjectEnd(){a.pop(),t=a[a.length-1]}}).parse(),i})(r)}},j=e=>{const t=[],r=x(e);return Object(n.h)(r.destruct)?e:r.destruct?(((e,t)=>{const r=(e,t,i)=>{if(Object(n.h)(e))return i(e,e);a(e,(e,a)=>{const s=t.concat(a);Object(n.a)(e)||Object(n.f)(e)?r(e,s,i):i(s,e)})};r(e,[],t)})(r.destruct,(e,n)=>{t.push({path:r.startPath.concat(e),startPath:r.startPath,endPath:e,key:n})}),t):e},O=(e,t)=>{const r=new Map;return(i,s,o)=>{let l=[];return(l=r.get(s))||(l=j(s),r.set(s,l)),Object(n.a)(l)?(l&&l.length&&a(l,({path:r,key:n,startPath:a,endPath:s})=>{e(i,a.concat(n),t(o,s))}),i):e(i,s,o)}};const F=(e=>{const t=new Map;return(r,i,a)=>{let s=null;return(s=t.get(i))||(s=x(i),t.set(i,s)),Object(n.a)(s.destruct)||Object(n.f)(s.destruct)?y(s.destruct,(t,n)=>e(r,s.startPath.concat(n))):e(r,i,a)}})(function(e,t,r){if(!Object(n.e)(e)||!t)return e;if((t=f(t))in e)return e[t];const i=g(t);for(let t=0;t<i.length;t++){if(!Object.prototype.propertyIsEnumerable.call(e,i[t]))return r;if(null==(e=e[i[t]])){if(t!==i.length-1)return r;break}}return e}),E=O(function(e,t,r){if(!Object(n.e)(e)||!t)return;if((t=f(t))in e)return void(e[t]=r);const i=g(t);for(let t=0;t<i.length;t++){const a=i[t];Object(n.e)(e[a])||(e[a]={}),t===i.length-1&&(e[a]=r),e=e[a]}},F),w=O(function(e,t){if(!Object(n.e)(e)||!t)return;if((t=f(t))in e)return void delete e[t];const r=g(t);for(let t=0;t<r.length;t++){const i=r[t];if(t===r.length-1)return void(Object(n.a)(e)?e.splice(i,1):delete e[i]);if(e=e[i],!Object(n.e)(e))return}},F);(e=>{const t=new Map})(function(e,t){if(!Object(n.e)(e)||!t)return!1;if((t=f(t))in e)return!0;const r=g(t);for(let t=0;t<r.length;t++){if(!Object(n.e)(e))return!1;if(!(r[t]in e))return!1;e=e[r[t]]}return!0});var S=n.a,C=Object.keys,k=Object.prototype.hasOwnProperty;const N=function(e,t,r){try{return function e(t,r,i){if(t===r)return!0;if(t&&r&&"object"==typeof t&&"object"==typeof r){var a,s,o,l=S(t),c=S(r);if(l&&c){if((s=t.length)!==r.length)return!1;for(a=s;0!=a--;)if(!e(t[a],r[a],i))return!1;return!0}if(l!=c)return!1;var d=t instanceof Date,u=r instanceof Date;if(d!=u)return!1;if(d&&u)return t.getTime()==r.getTime();var h=t instanceof RegExp,p=r instanceof RegExp;if(h!=p)return!1;if(h&&p)return t.toString()==r.toString();var m=t instanceof URL,f=r instanceof URL;if(m&&f)return m.href==f.href;var b=C(t);if((s=b.length)!==C(r).length)return!1;for(a=s;0!=a--;)if(!k.call(r,b[a]))return!1;for(a=s;0!=a--;)if("_owner"!==(o=b[a])||!t.$$typeof)if(Object(n.c)(i)){if(i({a:t[o],b:r[o]},o)&&!e(t[o],r[o],i))return!1}else if(!e(t[o],r[o],i))return!1;return!0}return t&&r&&"function"==typeof t&&"function"==typeof r?t.toString()===r.toString():t!=t&&r!=r}(e,t,r)}catch(e){if(e.message&&e.message.match(/stack|recursion/i)||-2146828260===e.number)return console.warn("Warning: react-fast-compare does not handle circular references.",e.name,e.message),!1;throw e}};var V=r(153),A=r.n(V);class P{constructor(){A()(this,"entries",[]),A()(this,"buffer",[])}subscribe(e,t){if(!Object(n.c)(e))return()=>{};let r=this.entries.length;return this.entries.push({subscriber:e,subscription:t}),this.flushBuffer(this.entries[r]),()=>{this.entries.splice(r,1)}}unsubscribe(){this.entries.length=0,this.buffer.length=0}flushBuffer({subscriber:e,subscription:t}){a(this.buffer,({payload:r,filter:i})=>{if(Object(n.c)(i)){let n;(n=i(r,t))&&e(n)}else e(r,t)})}notify(e,t){0!==this.length?(a(this.entries,({subscriber:r,subscription:i})=>{if(Object(n.c)(t)){let n;(n=t(e,i))&&r(n)}else r(e,i)}),this.buffer.length=0):this.buffer.push({payload:e,filter:t})}}var I=r(134),T=Object.prototype.hasOwnProperty,$=Object.prototype.toString;function q(e){if(null==e)return!0;if("boolean"==typeof e)return!1;if("number"==typeof e)return!1;if("string"==typeof e)return 0===e.length;if("function"==typeof e)return 0===e.length;if(Array.isArray(e)){if(0===e.length)return!0;for(let t=0;t<e.length;t++)if(void 0!==e[t]&&null!==e[t]&&""!==e[t]&&0!==e[t])return!1;return!0}if(e instanceof Error)return""===e.message;if(e.toString===$)switch(e.toString()){case"[object File]":case"[object Map]":case"[object Set]":return 0===e.size;case"[object Object]":for(var t in e)if(T.call(e,t))return!1;return!0}return!1}const B=/^\d+$/,M={},z=(e,t)=>{let r=e,n=0;t=i(t);for(let e=0;e<t.length;e++){var a=t[e];r&&!q(r.properties)?(r=r.properties[a],n++):r&&!q(r.items)&&B.test(a)&&(r=r.items,n++)}return n===t.length?r:void 0},R=(e,t)=>e&&e.type===t,X=e=>!!M[e],D=e=>{M[e]=!0},Y=e=>X(e.type)||X(e["x-component"]),_=(e,t,r=[],n=[])=>{e&&(Y(e)&&(r=r.slice(0,r.length-1)),t(e,{path:r,schemaPath:n}),R(e,"object")||e.properties?a(e.properties,(e,i)=>{_(e,t,r.concat(i),n.concat(i))}):(R(e,"array")||e.items)&&e.items&&t(e.items,i=>{_(e.items,t,r.concat(i),n.concat(i))},r))},H=(e,t,r)=>(t=t||e.default||{},_(e,(e,s,o)=>{const l=e.default;if(Object(n.c)(s)&&o)a(i(F(t,o)),function(e,t){s(t)});else if(s){const i=Y(e),a=i?s.schemaPath.join("."):s.path.join("."),o=i?s.schemaPath:s.path,c=s.schemaPath,d=F(t,a);let u=q(d)?l:d;if(q(u)||E(t,a,u),Object(n.c)(r)){r({name:a,path:o,schemaPath:c},e,u)}}}),t),U=r(154),L=e=>String(e||"").toLowerCase(),W=()=>{let e,t;return{promise:new Promise((r,n)=>{e=r,t=n}),resolve:e,reject:t}};r.d(t,"i",function(){return g}),r.d(t,"h",function(){return F}),r.d(t,"w",function(){return E}),r.d(t,"f",function(){return w}),r.d(t,"x",function(){return i}),r.d(t,"g",function(){return a}),r.d(t,"t",function(){return s}),r.d(t,"n",function(){return N}),r.d(t,"a",function(){return P}),r.d(t,"o",function(){return n.c}),r.d(t,"k",function(){return n.a}),r.d(t,"r",function(){return n.h}),r.d(t,"l",function(){return n.b}),r.d(t,"p",function(){return n.e}),r.d(t,"q",function(){return n.g}),r.d(t,"d",function(){return I.a}),r.d(t,"j",function(){return z}),r.d(t,"v",function(){return R}),r.d(t,"u",function(){return D}),r.d(t,"b",function(){return H}),r.d(t,"m",function(){return q}),r.d(t,"c",function(){return U}),r.d(t,"s",function(){return L}),r.d(t,"e",function(){return W})},118:function(e,t,r){"use strict";r.d(t,"c",function(){return i}),r.d(t,"a",function(){return a}),r.d(t,"f",function(){return s}),r.d(t,"h",function(){return o}),r.d(t,"b",function(){return l}),r.d(t,"d",function(){return c}),r.d(t,"e",function(){return d}),r.d(t,"g",function(){return u});const n=e=>t=>null!=t&&Object.prototype.toString.call(t)===`[object ${e}]`,i=n("Function"),a=Array.isArray||n("Array"),s=n("Object"),o=n("String"),l=n("Boolean"),c=n("Number"),d=e=>"object"==typeof e,u=n("RegExp")},119:function(e,t,r){"use strict";r.d(t,"c",function(){return a});var n=r(116);r.d(t,"a",function(){return n.d}),r.d(t,"b",function(){return n.g}),r.d(t,"d",function(){return n.h}),r.d(t,"e",function(){return n.k}),r.d(t,"f",function(){return n.m}),r.d(t,"g",function(){return n.n}),r.d(t,"h",function(){return n.o}),r.d(t,"i",function(){return n.p}),r.d(t,"j",function(){return n.q}),r.d(t,"k",function(){return n.r}),r.d(t,"l",function(){return n.t}),r.d(t,"m",function(){return n.x});const i=/%[sdj%]/g;function a(...e){let t=1;const r=e[0],n=e.length;if("function"==typeof r)return r.apply(null,e.slice(1));if("string"==typeof r){return String(r).replace(i,r=>{if("%%"===r)return"%";if(t>=n)return r;switch(r){case"%s":return String(e[t++]);case"%d":return Number(e[t++]);case"%j":try{return JSON.stringify(e[t++])}catch(e){return"[Circular]"}default:return r}})}return r}},120:function(e,t,r){"use strict";(function(e){r.d(t,"c",function(){return o}),r.d(t,"b",function(){return l}),r.d(t,"a",function(){return c});var n=r(119),i=r(144);const a=e||window,s={messages:{},lang:(()=>a.navigator&&(a.navigator.browserlanguage||a.navigator.language)||"en")()},o=e=>{Object.assign(s.messages,e)},l=e=>{s.lang=e},c=e=>Object(n.d)(s.messages,`${(e=>{let t=s.lang;return Object(n.b)(s.messages,(r,n)=>{if(n.indexOf(e)>-1||String(e).indexOf(n)>-1)return t=n,!1}),t})(s.lang)}.${e}`)||"field is not valid,but not found error message.";o(i.a)}).call(this,r(36))},121:function(e,t,r){"use strict";(function(e){r.d(t,"u",function(){return l}),r.d(t,"d",function(){return c}),r.d(t,"w",function(){return d}),r.d(t,"n",function(){return u}),r.d(t,"k",function(){return h}),r.d(t,"t",function(){return p}),r.d(t,"s",function(){return m}),r.d(t,"b",function(){return f});var n=r(141),i=r.n(n),a=r(155),s=r(116);r.d(t,"a",function(){return s.a}),r.d(t,"c",function(){return s.b}),r.d(t,"e",function(){return s.d}),r.d(t,"f",function(){return s.e}),r.d(t,"g",function(){return s.f}),r.d(t,"h",function(){return s.g}),r.d(t,"i",function(){return s.h}),r.d(t,"j",function(){return s.j}),r.d(t,"l",function(){return s.k}),r.d(t,"m",function(){return s.l}),r.d(t,"o",function(){return s.m}),r.d(t,"p",function(){return s.n}),r.d(t,"q",function(){return s.o}),r.d(t,"r",function(){return s.r}),r.d(t,"v",function(){return s.t}),r.d(t,"x",function(){return s.w}),r.d(t,"y",function(){return s.x});const o=e||window,l=o.requestAnimationFrame&&(a.scheduleCallback||a.unstable_scheduleCallback||o.requestAnimationFrame)||o.setTimeout,c=o.requestAnimationFrame&&(a.cancelCallback||a.unstable_cancelCallback||o.cancelAnimationFrame)||o.clearTimeout,d=e=>Object(s.k)(e)?e.reduce((e,t)=>e.concat(Object(s.i)(t)),[]):Object(s.r)(e)?d(Object(s.i)(e)):void 0,u=(e,t)=>{if(e&&t&&e.path&&t.path){for(let r=0;r<t.path.length;r++)if(e.path[r]!==t.path[r])return!1;return t.path.length<e.path.length}return!1},h=e=>Object(s.x)(e).some(e=>e&&e.required),p=e=>{const{values:t,valid:r,invalid:n,errors:i,pristine:a,dirty:s}=e;return{values:t,valid:r,invalid:n,errors:i,pristine:a,dirty:s}},m=e=>{const{value:t,valid:r,invalid:n,errors:i,visible:a,editable:o,initialValue:l,name:c,path:d,props:u,effectErrors:h,loading:p,pristine:m,required:f,rules:b}=e;return{value:Object(s.d)(t),valid:r,invalid:n,editable:o,visible:a,loading:p,errors:i.concat(h),pristine:m,initialValue:l,name:c,path:d,props:u,required:f,rules:b}};class f{constructor(){i()(this,"data",[]),i()(this,"indexes",{})}push(e,t,r){if(this.indexes[e]){let r=this.data[this.indexes[e]];-1===r.values.indexOf(t)&&r.values.push(t)}else{let n=this.data.length;this.data.push({...r,key:e,values:[t]}),this.indexes[e]=n}}forEach(e){for(let t=0;t<this.data.length;t++)Object(s.o)(e)&&e(this.data[t],this.data[t].key)}remove(e,t){this.data=this.data.reduce((t,r,n)=>r.key===e?(delete this.indexes[e],t):(this.indexes[e]=t.length,t.concat(r)),[])}}}).call(this,r(36))},132:function(e,t,r){"use strict";r.r(t);var n=r(159),i=r.n(n),a=r(160),s=r.n(a),o=r(0),l=r.n(o),c=r(2),d=r.n(c),u=r(115),h=r(1),p=r.n(h),m=r(161),f=r.n(m);const b=p()(e=>{const[t,r]=Object(o.useState)(!0);return l.a.createElement(f.a,s()({},e,{style:{overlay:{zIndex:99999}},isOpen:t,onRequestClose:()=>{r(!1)}}),l.a.createElement("div",{className:"close-btn",onClick:()=>{r(!1)}},l.a.createElement("img",{src:"//img.alicdn.com/tfs/TB1KikcO5rpK1RjSZFhXXXSdXXa-200-200.svg"})),l.a.createElement("div",{className:"dialog-content",style:{overflow:"auto"}},e.children))})`
  position: relative;
  margin: 100px;
  padding: 30px;
  height: calc(100% - 200px);
  overflow: auto;
  border: 1px solid #eee;
  background: #fff;
  outline: none;
  .close-btn {
    position: absolute;
    top: 15px;
    right: 10px;
    width: 25px;
    height: 25px;
    cursor: pointer;
    img {
      width: 100%;
    }
  }
  .dialog-content {
    overflow: auto;
    height: 100%;
  }
`,g=e=>{if(e)return{type:e.type,"x-props":e["x-props"],"x-component":e["x-component"],"x-index":e["x-index"],"x-rules":e["x-rules"],maxItems:e.maxItems,minItems:e.minItems,default:e.default,enum:e.enum,title:e.title,required:e.required,properties:Object.keys(e.properties||{}).reduce((t,r)=>(t[r]=g(e.properties[r]),t),{}),items:g(e.items)}};t.default=class extends l.a.Component{constructor(...e){super(...e),i()(this,"actions",Object(u.createFormActions)()),i()(this,"onClickHandler",async e=>{e.preventDefault();const t=await this.actions.getSchema("");((e={})=>{const t=document.createElement("div");("string"==typeof e||l.a.isValidElement(e))&&(e={content:e}),document.body.appendChild(t),d.a.render(l.a.createElement(b,s()({},e,{appElement:t,afterClose:()=>{d.a.unmountComponentAtNode(t),t.parentNode.removeChild(t)}}),e.content),t)})(l.a.createElement("pre",null,l.a.createElement("code",null,(e=>JSON.stringify(g(e),null,2))(t))))})}render(){const{children:e,className:t}=this.props;return e&&e.props&&e.props.actions&&(this.actions=e.props.actions),l.a.createElement("div",{className:t},l.a.cloneElement(e,{actions:this.actions}),l.a.createElement("a",{href:"",style:{fontSize:12,textDecoration:"none",margin:"20px 0",display:"block",textAlign:"center"},onClick:this.onClickHandler},"Print JSON Schema"))}}},134:function(e,t,r){"use strict";(function(e){r.d(t,"a",function(){return s});var n=r(118);const i=e||window,a=[["Map",e=>new Map(e)],["WeakMap",e=>new WeakMap(e)],["WeakSet",e=>new WeakSet(e)],["Set",e=>new Set(e)],"FileList","File","URL","RegExp",["Promise",e=>new Promise((t,r)=>e.then(t,r))]],s=(e,t)=>{let r;if(Array.isArray(e))return e.map(e=>s(e,t));if(r=(e=>{for(let t=0;t<a.length;t++){let r=a[t];if(Array.isArray(r)&&r[0]){if(i[r[0]]&&e instanceof i[r[0]])return r[1]?r[1]:r[0]}else if(i[r]&&e instanceof i[r])return r}})(e))return Object(n.c)(r)?r(e):e;if("object"==typeof e&&e){if("$$typeof"in e&&"_owner"in e)return e;let r={};for(let i in e)Object.hasOwnProperty.call(e,i)&&(Object(n.c)(t)?t(e[i],i)?r[i]=s(e[i],t):r[i]=e[i]:r[i]=s(e[i],t));return r}return e}}).call(this,r(36))},139:function(e,t,r){var n={"./bash":123,"./bash.js":123,"./css":124,"./css.js":124,"./htmlbars":125,"./htmlbars.js":125,"./javascript":126,"./javascript.js":126,"./scss":127,"./scss.js":127,"./typescript":128,"./typescript.js":128};function i(e){var t=a(e);return r(t)}function a(e){if(!r.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}i.keys=function(){return Object.keys(n)},i.resolve=a,e.exports=i,i.id=139},144:function(e,t,r){"use strict";t.a={en:{pattern:"%s value %s does not match pattern %s",required:"%s is required",number:"%s is not a number",integer:"%s is not an integer number",url:"%s is a invalid url",email:"%s is not a email format",ipv6:"%s is not a ipv6 format",ipv4:"%s is not a ipv4 format",idcard:"%s is not an idcard format",taodomain:"%s is not a taobao domain format",qq:"%s is not a qq number format",phone:"%s is not a phone number format",money:"%s is not a currency format",zh:"%s is not a chinese string",date:"%s is not a valid date format",zip:"%s is not a zip format"},zh:{pattern:"该字段不是一个合法的字段",required:"该字段是必填字段",number:"该字段不是合法的数字",integer:"该字段不是合法的整型数字",url:"该字段不是合法的url",email:"该字段不是合法的邮箱格式",ipv6:"该字段不是合法的ipv6格式",ipv4:"该字段不是合法的ipv4格式",idcard:"该字段不是合法的身份证格式",taodomain:"该字段不符合淘系域名规则",qq:"该字段不符合QQ号格式",phone:"该字段不是有效的手机号",money:"该字段不是有效货币格式",zh:"该字段不是合法的中文字符串",date:"该字段不是合法的日期格式",zip:"该字段不是合法的邮编格式"}}},146:function(e,t){e.exports=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}},149:function(e,t,r){"use strict";r.r(t);var n=r(122),i=r.n(n),a=r(131),s=r.n(a),o=r(0),l=r.n(o),c=r(115),d=r(145),u=r.n(d),h=r(68),p={addItem:"添加",array_invalid_minItems:"条目数不允许小于%s条",array_invalid_maxItems:"条目数不允许大于%s条",operations:"操作"},m=r(1),f=r.n(m),b=r(2),g=r.n(b),v=r(172),y=r.n(v),x=r(116);const j=f()(class extends l.a.Component{render(){const{dataSource:e=[],...t}=this.props,r=e.map(e=>{const{label:t,value:r,...n}=e;return l.a.createElement(h.Select.Option,i()({key:r},n,{label:t,value:r}),t)});return l.a.createElement(h.Select,i()({className:this.props.className},t),r)}})`
  min-width: 200px;
  max-width: 300px;
`,O=f()(e=>{let t;if(e.dataSource&&e.dataSource.length){t=e.dataSource.filter(({value:t})=>Array.isArray(e.value)?e.value.indexOf(t)>-1:e.value===t).map(e=>e.label).join(" , ")}else t=Array.isArray(e.value)?e.value.join(" ~ "):String(void 0===e.value||null===e.value?"":e.value);return l.a.createElement("div",{className:`${e.className} ${e.size||""} text-field`},t||"N/A",e.addonAfter?" "+e.addonAfter:"")})`
  height: 32px;
  line-height: 32px;
  vertical-align: middle;
  font-size: 13px;
  color: #333;
  &.small {
    height: 24px;
    line-height: 24px;
  }
  &.large {
    height: 40px;
    line-height: 40px;
  }
`,F=e=>(class extends l.a.Component{componentDidMount(){this.wrapper&&(this.wrapperDOM=g.a.findDOMNode(this.wrapper),this.mapState())}componentDidUpdate(){this.mapState()}mapState(){const{state:e}=this.props,t=["xxs","xs","small","medium","large","xl","xxl","xxxl"];if(this.classList=this.classList||[],this.wrapperDOM){const r=this.wrapperDOM.querySelector(".anticon");if(!r||!r.classList)return;"loading"===e?(r.classList.forEach(e=>{e.indexOf("anticon-")>-1&&"anticon-spin"!==e&&t.every(t=>`anticon-${t}`!==e)&&(r.classList.remove(e),this.classList.push(e))}),r.classList.contains("anticon-spin")||r.classList.add("anticon-spin")):(r.classList.remove("anticon-spin"),this.classList.forEach(e=>{r.classList.add(e)}),this.classList=[])}}render(){return l.a.createElement(e,i()({ref:e=>{e&&(this.wrapper=e)}},this.props))}}),E=F(j),w=e=>({dataSource:t,...r})=>t||r.showSearch?l.a.createElement(E,{dataSource:t,...r}):l.a.createElement(e,r),S=(e,{loading:t,size:r})=>{t&&(e.state=e.state||"loading"),r&&(e.size=r)},C=(e,t,{editable:r,name:n})=>{if(void 0!==r)if(Object(x.o)(r)){if(!r(n))return O}else if(!1===r)return O;return e},k=(e,t)=>({dataSource:r,...n})=>l.a.createElement(e,{[t]:r,...n}),N=e=>{e&&(e.scrollIntoView?e.scrollIntoView({behavior:"smooth",inline:"start",block:"start"}):(new y.a).move(e.getBoundingClientRect().top))};var V,A;const{Provider:P,Consumer:I}=l.a.createContext(),T=e=>"object"==typeof e?e:{span:e},$=(e,t)=>{if(e&&(!e||e.matches))return e.matches(t)?e:$(e.parentNode||e.parentElement,t)},q=f()((A=V=class extends l.a.Component{getItemLabel(){const{id:e,required:t,label:r,labelCol:n,wrapperCol:a,prefix:s,extra:o,labelAlign:c,labelTextAlign:d,autoAddColon:p,isTableColItem:m}=this.props;if(!r||m)return null;const f=l.a.createElement("label",{htmlFor:e,required:t,key:"label"},r," "===r?"":p?"：":""),b=u()({[`${s}form-item-label`]:!0,[`${s}${d}`]:!!d});return(a||n)&&"top"!==c?l.a.createElement(h.Col,i()({},T(n),{className:b}),f,(o&&o.length>20||l.a.isValidElement(o))&&this.renderHelper()):l.a.createElement("div",{className:b},f,(o&&o.length>20||l.a.isValidElement(o))&&this.renderHelper())}getItemWrapper(){const{labelCol:e,wrapperCol:t,children:r,extra:n,label:a,labelAlign:s,help:o,prefix:c,noMinHeight:d,size:u,isTableColItem:p}=this.props,m=l.a.createElement("div",{className:`${c}form-item-msg ${d?"":`${c}form-item-space`}`},o&&l.a.createElement("div",{className:`${c}form-item-help`},o),!o&&n&&n.length<=20&&l.a.createElement("div",{className:`${c}form-item-extra`},n));return(t||e)&&"top"!==s&&!p&&a?l.a.createElement(h.Col,i()({},T(t),{className:`${c}form-item-control`,key:"item"}),l.a.cloneElement(r,{size:u}),m):l.a.createElement("div",{className:`${c}form-item-control`},l.a.cloneElement(r,{size:u}),m)}renderHelper(){return l.a.createElement(h.Popover,{closable:!1,placement:"top",content:this.props.extra},l.a.createElement(h.Icon,{type:"question-circle",size:"small"}))}render(){const{className:e,labelAlign:t,labelTextAlign:r,style:n,prefix:a,wrapperCol:s,labelCol:o,size:c,help:d,extra:p,noMinHeight:m,isTableColItem:f,validateState:b,autoAddColon:g,required:v,type:y,schema:x,...j}=this.props,O=u()({[`${a}form-item`]:!0,[`${a}${t}`]:t,[`has-${b}`]:!!b,[`${a}${c}`]:!!c,[`${e}`]:!!e,[`field-${y}`]:!!y}),F=(s||o)&&"top"!==t?h.Row:"div",E="inset"===t?null:this.getItemLabel();return l.a.createElement(F,i()({},j,{gutter:0,className:O,style:n}),E,this.getItemWrapper())}},s()(V,"defaultProps",{prefix:"ant-"}),A))`
  margin-bottom: 0 !important;
  .ant-form-item-control {
    display: block;
    line-height: 32px;
  }
  &.field-table {
    .ant-form-item-control {
      overflow: auto;
    }
  }
  .antd-uploader {
    display: block;
  }
  .ant-form-item-msg {
    &.ant-form-item-space {
      min-height: 24px;
      .ant-form-item-help,
      .ant-form-item-extra {
        margin-top: 0;
        line-height: 1.5;
      }
    }
  }
  .ant-form-item-extra {
    color: #888;
    font-size: 12px;
    line-height: 1.7;
  }
  &.ant-form-item.ant-row {
    display: flex;
  }
  .ant-col {
    padding-right: 0;
  }
  .ant-card-head {
    background: none;
  }
  .ant-form-item-label label:after {
    content: '';
  }
  .ant-form-item-label label {
    color: #666;
    font-size: 12px;
  }
  ul {
    padding: 0;
    li {
      margin: 0;
      & + li {
        margin: 0;
      }
    }
  }
  .ant-left {
    text-align: left;
  }
  .ant-right {
    text-align: right;
  }
  .ant-center {
    text-align: center;
  }
`,B=e=>Array.isArray(e)?e:e?[e]:[];Object(c.registerFormWrapper)(e=>{e=f()(e)`
    &.ant-inline,
    .ant-inline {
      display: flex;
      .rs-uform-content {
        margin-right: 15px;
      }
      .ant-form-item {
        display: inline-block;
        vertical-align: top;
      }
      .ant-form-item:not(:last-child) {
        margin-right: 20px;
      }
      .ant-form-item.ant-left .ant-form-item-control {
        display: inline-block;
        display: table-cell\0;
        vertical-align: top;
        line-height: 0;
      }
    }
    .ant-form-item-label {
      line-height: 32px;
      padding-right: 12px;
      text-align: right;
    }
    .ant-small {
      .ant-form-item-label {
        line-height: 24px;
      }
      .ant-radio-group,
      .ant-checkbox-group {
        line-height: 24px;
        min-height: 24px;
      }
    }
    .ant-large {
      .ant-form-item-label {
        line-height: 40px;
      }
      .ant-radio-group,
      .ant-checkbox-group {
        line-height: 40px;
        min-height: 40px;
      }
    }
    .ant-form-item-label label[required]:before {
      margin-right: 4px;
      content: '*';
      color: #ff3000;
    }
    .ant-form-item-help {
      margin-top: 4px;
      font-size: 12px;
      line-height: 1.5;
      color: #999;
    }
    .ant-form-item.has-error .ant-form-item-help {
      color: #ff3000;
    }
    .ant-radio-group,
    .ant-checkbox-group {
      line-height: 32px;
      & > label {
        margin-right: 15px;
      }
    }
    .ant-range {
      margin-top: 10px;
    }
    .ant-number-picker-normal {
      min-width: 62px;
      width: 100px;
      .ant-number-picker-input-wrap {
        width: calc(100% - 22px);
        .ant-number-picker-input {
          width: 100%;
          input {
            text-align: left;
            padding: 0 8px;
          }
        }
      }
    }
    .ant-table {
      table {
        table-layout: auto;
      }
    }
    .ant-rating-default {
      min-height: 30px;
      line-height: 30px;
    }
    .ant-rating-small {
      min-height: 24px;
      line-height: 24px;
    }
    .ant-rating-large {
      min-height: 40px;
      line-height: 40px;
    }
  `;class t extends l.a.Component{constructor(...e){super(...e),s()(this,"FormRef",l.a.createRef())}validateFailedHandler(e){return(...t)=>{Object(x.o)(e)&&e(...t);const r=this.FormRef.current;if(r){const e=r.querySelectorAll(".ant-form-item-help");if(e&&e.length){const t=$(e[0],".ant-form-item");t&&N(t)}}}}render(){const{className:t,inline:r,size:n,labelAlign:a,labelTextAlign:s,autoAddColon:o,children:c,component:d,labelCol:h,wrapperCol:p,style:m,prefix:f,...b}=this.props,g=u()({[`${f}form`]:!0,[`${f}inline`]:r,[`${f}${n}`]:n,[`${f}form-${a}`]:!!a,[t]:!!t});return l.a.createElement(P,{value:{labelAlign:a,labelTextAlign:s,labelCol:h,wrapperCol:p,inline:r,size:n,autoAddColon:o,FormRef:this.FormRef}},l.a.createElement(e,i()({},b,{formRef:this.FormRef,onValidateFailed:this.validateFailedHandler(b.onValidateFailed),className:g,style:m}),c))}}return s()(t,"defaultProps",{component:"form",prefix:"ant-",size:"default",labelAlign:"left",locale:p,autoAddColon:!0}),s()(t,"displayName","SchemaForm"),t.LOCALE=p,t});const M=(e,t)=>{const r=t(e);return r&&"array"===r.type&&"table"===r["x-component"]};Object(c.registerFieldMiddleware)(e=>t=>{const{name:r,errors:n,editable:i,path:a,required:s,schema:o,getSchema:c}=t;return 0===a.length?l.a.createElement(e,t):l.a.createElement(I,{},({labelAlign:d,labelTextAlign:u,labelCol:h,wrapperCol:p,size:m,autoAddColon:f})=>l.a.createElement(q,{labelAlign:d,labelTextAlign:u,labelCol:h,wrapperCol:p,autoAddColon:f,size:m,...o["x-item-props"],label:o.title,noMinHeight:"object"===o.type&&!o["x-component"],isTableColItem:M(a.slice(0,a.length-2),c),type:o["x-component"]||o.type,id:r,validateState:B(n).length?"error":void 0,required:!1!==i&&s,extra:o.description,help:B(n).join(" , ")||o["x-item-props"]&&o["x-item-props"].help},l.a.createElement(e,t)))}),Object(c.registerFormField)("string",Object(c.connect)({getProps:S,getComponent:C})(w(h.Input))),Object(c.registerFormField)("number",Object(c.connect)({getProps:S,getComponent:C})(w(h.InputNumber))),Object(c.registerFormField)("boolean",Object(c.connect)({valueName:"checked",getProps:S})(w(h.Switch)));var z=r(69),R=r.n(z);const{RangePicker:X,MonthPicker:D}=h.DatePicker;const Y=F(h.DatePicker),_=F(X),H=F(D),U=F(class extends l.a.Component{render(){return l.a.createElement(h.DatePicker,i()({},this.props,{mode:"year"}))}}),L=(e,t="YYYY-MM-DD HH:mm:ss")=>e&&e.format?e.format(t):e;var W,K;Object(c.registerFormField)("date",Object(c.connect)({getValueFromEvent(e,t){const r=this.props||{};return L(t,r.showTime?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD")},getProps:e=>{const{value:t,showTime:r=!1,disabled:n=!1,...i}=e;try{!n&&t&&(e.value=R()(t,r?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD"))}catch(e){throw new Error(e)}S(e,i)},getComponent:C})(Y)),Object(c.registerFormField)("daterange",Object(c.connect)({getValueFromEvent(e,[t,r]){const n=(this.props||{}).showTime?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD";return[L(t,n),L(r,n)]},getProps:e=>{const{value:t=[],showTime:r=!1,disabled:n=!1,...i}=e;try{!n&&t.length&&(e.value=t.map(e=>e&&R()(e,r?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD")||""))}catch(e){throw new Error(e)}S(e,i)},getComponent:C})(_)),Object(c.registerFormField)("month",Object(c.connect)({getValueFromEvent:(e,t)=>L(t),getProps:e=>{const{value:t,showTime:r=!1,disabled:n=!1,...i}=e;try{!n&&t&&(e.value=R()(t,r?"YYYY-MM-DD HH:mm:ss":"YYYY-MM"))}catch(e){throw new Error(e)}S(e,i)},getComponent:C})(H)),Object(c.registerFormField)("year",Object(c.connect)({getValueFromEvent:(e,t)=>(console.log(e,t),L(t)),getProps:e=>{const{value:t,showTime:r=!1,disabled:n=!1,...i}=e;try{!n&&t&&(e.value=R()(t,r?"YYYY-MM-DD HH:mm:ss":"YYYY-MM"))}catch(e){throw new Error(e)}S(e,i)},getComponent:C})(U)),Object(c.registerFormField)("time",Object(c.connect)({getValueFromEvent:(e,t)=>t,getProps:e=>{const{value:t,disabled:r=!1,...n}=e;try{!r&&t&&(e.value=R()(t,"HH:mm:ss"))}catch(e){throw new Error(e)}S(e,n)},getComponent:C})(h.TimePicker)),Object(c.registerFormField)("range",Object(c.connect)({defaultProps:{style:{width:320}},getProps:S})(class extends l.a.Component{render(){const{onChange:e,value:t,min:r,max:n,marks:i}=this.props;let a={};return Array.isArray(i)?i.forEach(e=>{a[e]=e}):a=i,l.a.createElement(h.Slider,{onChange:e,value:t,min:r,max:n,marks:a})}}));const{Dragger:G}=h.Upload,Q=[{ext:/\.docx?/i,icon:"//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png"},{ext:/\.pptx?/i,icon:"//img.alicdn.com/tfs/TB1ItgWr_tYBeNjy1XdXXXXyVXa-200-200.png"},{ext:/\.jpe?g/i,icon:"//img.alicdn.com/tfs/TB1wrT5r9BYBeNjy0FeXXbnmFXa-200-200.png"},{ext:/pdf/i,icon:"//img.alicdn.com/tfs/TB1GwD8r9BYBeNjy0FeXXbnmFXa-200-200.png"},{ext:/\.png/i,icon:"//img.alicdn.com/tfs/TB1BHT5r9BYBeNjy0FeXXbnmFXa-200-200.png"},{ext:/\.eps/i,icon:"//img.alicdn.com/tfs/TB1G_iGrVOWBuNjy0FiXXXFxVXa-200-200.png"},{ext:/\.ai/i,icon:"//img.alicdn.com/tfs/TB1B2cVr_tYBeNjy1XdXXXXyVXa-200-200.png"},{ext:/\.gif/i,icon:"//img.alicdn.com/tfs/TB1DTiGrVOWBuNjy0FiXXXFxVXa-200-200.png"},{ext:/\.svg/i,icon:"//img.alicdn.com/tfs/TB1uUm9rY9YBuNjy0FgXXcxcXXa-200-200.png"},{ext:/\.xlsx?/i,icon:"//img.alicdn.com/tfs/TB1any1r1OSBuNjy0FdXXbDnVXa-200-200.png"},{ext:/\.psd?/i,icon:"//img.alicdn.com/tfs/TB1_nu1r1OSBuNjy0FdXXbDnVXa-200-200.png"},{ext:/\.(wav|aif|aiff|au|mp1|mp2|mp3|ra|rm|ram|mid|rmi)/i,icon:"//img.alicdn.com/tfs/TB1jPvwr49YBuNjy0FfXXXIsVXa-200-200.png"},{ext:/\.(avi|wmv|mpg|mpeg|vob|dat|3gp|mp4|mkv|rm|rmvb|mov|flv)/i,icon:"//img.alicdn.com/tfs/TB1FrT5r9BYBeNjy0FeXXbnmFXa-200-200.png"},{ext:/\.(zip|rar|arj|z|gz|iso|jar|ace|tar|uue|dmg|pkg|lzh|cab)/i,icon:"//img.alicdn.com/tfs/TB10jmfr29TBuNjy0FcXXbeiFXa-200-200.png"},{ext:/\..+/i,icon:"//img.alicdn.com/tfs/TB10.R4r3mTBuNjy1XbXXaMrVXa-200-200.png"}],J=f()(e=>l.a.createElement("div",null,l.a.createElement(h.Icon,{type:e.loading?"loading":"plus"}),l.a.createElement("div",{className:"ant-upload-text"},"上传")))``,Z=(e,t)=>t&&Object(x.k)(t.include)?t.include.some(t=>e.test(t)):!t||!Object(x.k)(t.exclude)||!t.exclude.some(t=>e.test(t)),ee=(e,t)=>{for(let r=0;r<Q.length;r++)if(Q[r].ext.test(e)&&Z(Q[r].ext,t))return Q[r].icon||e;return e},te=e=>{let t=Object(x.k)(e)?[...e]:"object"==typeof e?{...e}:e;return Object(x.k)(t)&&(t=t.map(e=>({...e,uid:e.uid||Math.random().toFixed(16).slice(2,10)}))),t};Object(c.registerFormField)("upload",Object(c.connect)({getProps:S})((K=W=class extends l.a.Component{constructor(e){super(e),s()(this,"onRemoveHandler",e=>{const{value:t}=this.state,r=[];t.forEach(t=>{t.uid!==e.uid&&r.push(t)}),this.props.onChange(r)}),s()(this,"onChangeHandler",({fileList:e,file:t})=>{const{onChange:r}=this.props;(e=Object(x.x)(e)).every(e=>"done"===e.status||e.imgURL||e.downloadURL)&&e.length?(e=(e=>e&&e.length?e.map(e=>({uid:e.uid,status:e.status,name:e.name,url:e.downloadURL||e.imgURL||e.url,...e.response,thumbUrl:ee(e.imgURL||e.downloadURL||e.url,{exclude:[".png",".jpg",".jpeg",".gif"]})})):[])(e),this.setState({value:e},()=>{r(e.length>0?e:void 0)})):this.setState({value:e})}),this.state={value:te(Object(x.x)(e.value))}}componentDidUpdate(e){this.props.value&&!Object(x.n)(this.props.value,e.value)&&this.setState({value:te(this.props.value)})}render(){const{listType:e,locale:t,onChange:r,value:n,...a}=this.props;return e.indexOf("card")>-1?l.a.createElement(h.Upload,i()({},a,{fileList:this.state.value,onChange:this.onChangeHandler,onRemove:this.onRemoveHandler,listType:"picture-card"}),l.a.createElement(J,null)):e.indexOf("dragger")>-1?l.a.createElement(G,i()({},a,{fileList:this.state.value,onChange:this.onChangeHandler,onRemove:this.onRemoveHandler,listType:e.indexOf("image")>-1?"image":"text"}),l.a.createElement("p",{className:"ant-upload-drag-icon"},l.a.createElement(h.Icon,{type:"inbox"})),l.a.createElement("p",{className:"ant-upload-text"},"拖拽上传")):l.a.createElement(h.Upload,i()({},a,{fileList:this.state.value,onChange:this.onChangeHandler,onRemove:this.onRemoveHandler,listType:e}),l.a.createElement(h.Button,{style:{margin:"0 0 10px"}},l.a.createElement(h.Icon,{type:"upload"}),t&&t.uploadText||"上传文件"))}},s()(W,"defaultProps",{action:"https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload",listType:"text",multiple:!0,className:"antd-uploader"}),K)));const{Group:re}=h.Checkbox;Object(c.registerFormField)("checkbox",Object(c.connect)({getProps:S,getComponent:C})(k(re,"options")));const{Group:ne}=h.Radio;Object(c.registerFormField)("radio",Object(c.connect)({getProps:S,getComponent:C})(k(ne,"options"))),Object(c.registerFormField)("rating",Object(c.connect)({getProps:S})(h.Rate)),Object(c.registerFormField)("transfer",Object(c.connect)({getProps:S})(h.Transfer));const ie=f.a.div.attrs({className:"cricle-btn"})`
  ${e=>e.hasText?"":"width:30px;\n  height:30px;"}
  margin-right:10px;
  border-radius: ${e=>e.hasText?"none":"100px"};
  border: ${e=>e.hasText?"none":"1px solid #eee"};
  margin-bottom:20px;
  cursor:pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${e=>e.hasText?"":"&:hover{\n    background:#f7f4f4;\n  }"}
  .op-name{
    margin-left:3px;
  }
}
`,ae=f.a.div.attrs({className:"ant-btn-text"})`
  display: inline-block;
  height:20px;
  line-height: 20px;
  cursor: pointer;
  .op-name {
    margin-left: 4px;
  }
  ${e=>e.inline&&m.css`
      display: inline-block;
      width: auto;
    `}
`,se=Object(c.createArrayField)({CircleButton:ie,TextButton:ae,AddIcon:()=>l.a.createElement(h.Icon,{type:"plus"}),RemoveIcon:()=>l.a.createElement(h.Icon,{type:"delete"}),MoveDownIcon:()=>l.a.createElement(h.Icon,{type:"down"}),MoveUpIcon:()=>l.a.createElement(h.Icon,{type:"up"})});Object(c.registerFormField)("array",f()(class extends se{render(){const{className:e,name:t,schema:r,value:n,renderField:i}=this.props,a=r["x-props"]&&r["x-props"].style||{};return l.a.createElement("div",{className:e,style:a,onClick:this.onClearErrorHandler()},n.map((e,r)=>l.a.createElement("div",{className:"array-item",key:`${t}.${r}`},l.a.createElement("div",{className:"array-index"},l.a.createElement("span",null,r+1)),l.a.createElement("div",{className:"array-item-wrapper"},i(r)),l.a.createElement("div",{className:"array-item-operator"},this.renderRemove(r,e),this.renderMoveDown(r,e),this.renderMoveUp(r,e),this.renderExtraOperations(r)))),this.renderEmpty(),n.length>0&&this.renderAddition())}})`
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
          color: rgb(255, 255, 255);
          z-index: 1;
          font-size: 12px;
          top: 3px;
          left: 3px;
          line-height: initial;
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
        .ant-btn-text {
          color: #999;
          i {
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
      line-height: normal !important;
      background: #fbfbfb;
      .ant-btn-text {
        color: #888;
        i {
          margin-right: 3px;
        }
      }
    }
  `);const oe=f()(class extends o.Component{renderCell({record:e,col:t,rowIndex:r,colIndex:n}){return l.a.createElement("div",{className:"ant-table-cell-wrapper"},Object(x.o)(t.cell)?t.cell(e?e[t.dataIndex]:void 0,r,e):e?e[t.dataIndex]:void 0)}renderTable(e,t){return l.a.createElement("div",{className:"ant-table-body"},l.a.createElement("table",null,l.a.createElement("colgroup",null,e.map((e,t)=>l.a.createElement("col",{key:t,style:{width:e.width}}))),l.a.createElement("thead",null,l.a.createElement("tr",null,e.map((e,t)=>l.a.createElement("th",{key:t,className:"ant-table-header-node"},l.a.createElement("div",{className:"ant-table-cell-wrapper"},e.title))))),l.a.createElement("tbody",null,t.map((t,r)=>l.a.createElement("tr",{key:r,className:"ant-table-row"},e.map((e,n)=>l.a.createElement("td",{key:n,className:"ant-table-cell"},this.renderCell({record:t,col:e,rowIndex:r,colIndex:n}))))),this.renderPlacehodler(t,e))))}renderPlacehodler(e,t){if(0===e.length)return l.a.createElement("tr",{className:"ant-table-row"},l.a.createElement("td",{className:"ant-table-cell",colSpan:t.length},l.a.createElement("div",{className:"ant-table-empty",style:{padding:10}},l.a.createElement("img",{src:"//img.alicdn.com/tfs/TB1cVncKAzoK1RjSZFlXXai4VXa-184-152.svg",style:{height:60}}))))}getColumns(e){const t=[];return l.a.Children.forEach(e,e=>{l.a.isValidElement(e)&&(e.type!==le&&"@schema-table-column"!==e.type.displayName||t.push(e.props))}),t}render(){const e=this.getColumns(this.props.children),t=Object(x.x)(this.props.dataSource);return l.a.createElement("div",{className:this.props.className},l.a.createElement("div",{className:"ant-table zebra"},l.a.createElement("div",{className:"ant-table-inner"},this.renderTable(e,t))))}})`
  .ant-table {
    position: relative;
  }

  .ant-table,
  .ant-table *,
  .ant-table :after,
  .ant-table :before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .ant-table table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    background: #fff;
    display: table !important;
    margin: 0 !important;
  }

  .ant-table table tr:first-child td {
    border-top-width: 0;
  }

  .ant-table th {
    padding: 0;
    background: #ebecf0;
    color: #333;
    text-align: left;
    font-weight: 400;
    min-width: 200px;
    border: 1px solid #dcdee3;
  }

  .ant-table th .ant-table-cell-wrapper {
    padding: 12px 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }

  .ant-table td {
    padding: 0;
    border: 1px solid #dcdee3;
  }

  .ant-table td .ant-table-cell-wrapper {
    padding: 12px 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    display: flex;
  }

  .ant-table.zebra tr:nth-child(odd) td {
    background: #fff;
  }

  .ant-table.zebra tr:nth-child(2n) td {
    background: #f7f8fa;
  }

  .ant-table-empty {
    color: #a0a2ad;
    padding: 32px 0;
    text-align: center;
  }

  .ant-table-row {
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    background: #fff;
    color: #333;
    border: none !important;
  }

  .ant-table-row.hidden {
    display: none;
  }

  .ant-table-row.hovered,
  .ant-table-row.selected {
    background: #f2f3f7;
    color: #333;
  }

  .ant-table-body,
  .ant-table-header {
    overflow: auto;
    font-size: 12px;
  }

  .ant-table-body {
    font-size: 12px;
  }
`;class le extends o.Component{render(){return this.props.children}}var ce;s()(le,"displayName","@schema-table-column"),Object(c.registerFormField)("table",f()(class extends se{createFilter(e,t){const{schema:r}=this.props,n=r["x-props"]&&r["x-props"].columnFilter;return(r,i)=>Object(x.o)(n)?n(e,t)?Object(x.o)(r)?r():r:Object(x.o)(i)?i():i:r()}render(){const{value:e,schema:t,locale:r,className:n,renderField:a,getOrderProperties:s}=this.props,o=t["x-props"]&&t["x-props"].style,c=this.createFilter("addition",t);return l.a.createElement("div",{className:n,style:o,onClick:this.onClearErrorHandler()},l.a.createElement("div",null,l.a.createElement(oe,{dataSource:e},s(t.items&&t.items.properties).reduce((e,{key:t,schema:r})=>{return this.createFilter(t,r)(()=>e.concat(l.a.createElement(le,i()({},r,{key:t,title:r.title,dataIndex:t,cell:(e,r)=>a([r,t])}))),()=>e)},[]),c(()=>l.a.createElement(le,{key:"operations",title:r.operations,dataIndex:"operations",width:180,cell:(e,t)=>l.a.createElement("div",{className:"array-item-operator"},this.renderRemove(t,e),this.renderMoveDown(t,e),this.renderMoveUp(t,e),this.renderExtraOperations(t))}))),this.renderAddition()))}})`
    display: inline-block;
    .array-item-addition {
      line-height: normal !important;
      padding: 10px;
      background: #fbfbfb;
      border-left: 1px solid #dcdee3;
      border-right: 1px solid #dcdee3;
      border-bottom: 1px solid #dcdee3;
      .ant-btn-text {
        color: #888;
        i {
          margin-right: 3px;
        }
      }
    }
    .ant-table-cell-wrapper > .ant-form-item {
      margin-bottom: 0;
    }
    .array-item-operator {
      display: flex;
    }
  `);var de=function(e){return e>=48&&e<=57},ue=function(e){return e>=97&&e<=122},he=function(e){return e>=65&&e<=90},pe=function(e){return!(ue(e)||he(e)||de(e))},me=function(e){return ue(e)||he(e)};const fe=e=>{if(!e)return 0;let t=0,r=0,n=0,i=0,a=0,s=0,o=0,l=0,c=0;const d=()=>t+r+n+i;for(var u=0;u<e.length;u++){var h=e.charCodeAt(u);de(h)?(t++,0!==u&&u!==e.length-1&&a++,u>0&&de(e.charCodeAt(u-1))&&l++):ue(h)?(r++,u>0&&ue(e.charCodeAt(u-1))&&l++):he(h)?(n++,u>0&&he(e.charCodeAt(u-1))&&l++):(i++,0!==u&&u!==e.length-1&&a++);for(var p=!1,m=0;m<e.length;m++)e[u]===e[m]&&u!==m&&(p=!0,o+=Math.abs(e.length/(m-u)));if(p){s++;var f=e.length-s;o=f?Math.ceil(o/f):Math.ceil(o)}if(u>1){var b=e.charCodeAt(u-1),g=e.charCodeAt(u-2);if(me(h)){if(me(b)&&me(g)){var v=e.toLowerCase(),y=v.charCodeAt(u),x=v.charCodeAt(u-1);y-x==x-v.charCodeAt(u-2)&&1===Math.abs(y-x)&&c++}}else de(h)?de(b)&&de(g)&&h-b==b-g&&1===Math.abs(h-b)&&c++:pe(b)&&pe(g)&&h-b==b-g&&1===Math.abs(h-b)&&c++}}let j=0,O=d();return j+=4*O,r>0&&(j+=2*(O-r)),n>0&&(j+=2*(O-n)),t!==O&&(j+=4*t),j+=6*i,j+=2*a,j+=2*(()=>{var e=t>0?1:0;return e+=r>0?1:0,e+=n>0?1:0,(e+=i>0?1:0)>2&&d()>=8?e+1:0})(),O===r+n&&(j-=O),O===t&&(j-=t),j-=o,j-=2*l,(j=(j=(j-=3*c)<0?0:j)>100?100:j)>=80?100:j>=60?80:j>=40?60:j>=20?40:20},be=f()((ce=class extends l.a.Component{constructor(...e){super(...e),s()(this,"state",{value:this.props.value||this.props.defaultValue,strength:0,eye:!1}),s()(this,"onChangeHandler",e=>{const t=e.target.value;this.setState({value:t,strength:fe(t)},()=>{this.props.onChange&&this.props.onChange(t)})})}componentDidUpdate(e,t){e.value!==this.props.value&&this.props.value!==this.state.value&&this.setState({value:this.props.value,strength:fe(this.props.value)})}renderStrength(){const{strength:e}=this.state;return l.a.createElement("div",{className:"password-strength-wrapper"},l.a.createElement("div",{className:"div-1 div"}),l.a.createElement("div",{className:"div-2 div"}),l.a.createElement("div",{className:"div-3 div"}),l.a.createElement("div",{className:"div-4 div"}),l.a.createElement("div",{className:"password-strength-bar",style:{clipPath:`polygon(0 0,${e}% 0,${e}% 100%,0 100%)`}}))}switchEye(){return()=>{this.setState({eye:!this.state.eye})}}renderEye(){return this.state.eye?l.a.createElement("img",{className:"eye",onClick:this.switchEye(),src:"//img.alicdn.com/tfs/TB1xiXlsVzqK1RjSZFvXXcB7VXa-200-200.svg"}):l.a.createElement("img",{className:"eye",onClick:this.switchEye(),src:"//img.alicdn.com/tfs/TB1wyXlsVzqK1RjSZFvXXcB7VXa-200-200.svg"})}render(){const{className:e,checkStrength:t,value:r,onChange:n,htmlType:a,innerAfter:s,...o}=this.props;return l.a.createElement("div",{className:e},l.a.createElement(h.Input,i()({type:this.state.eye?"text":"password",className:`input-${this.state.eye?"text":"password"}`,value:this.state.value,onChange:this.onChangeHandler,suffix:this.renderEye()},o)),t&&this.renderStrength())}},ce))`
  .ant-input-prefix,
  .ant-input-suffix {
    z-index: 10;
    right:20px !important;
    .eye {
      position: absolute;
      max-width: initial;
      width: 20px;
      height: 20px;
      top: 50%;
      left: -5px;
      transform: translate(0, -50%);
      opacity: 0.3;
      cursor: pointer;
      transition: all 0.15s ease-in-out;
      &:hover {
        opacity: 0.6;
      }
    }
  }
  .ant-input {
    width: 100%;
    position: relative;
    &.input-password input {
      font-size: 16px;
      letter-spacing: 2px;
    }
    input {
      padding-right: 25px;
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
`;Object(c.registerFormField)("password",Object(c.connect)()(be));const ge=f()(class extends se{renderOperations(e,t){return l.a.createElement(o.Fragment,null,this.renderRemove(t,e),this.renderMoveDown(t,e),this.renderMoveUp(t,e),this.renderExtraOperations(t))}renderEmpty(e){return l.a.createElement(h.Card,{title:e,className:"card-list"},super.renderEmpty())}render(){const{value:e,className:t,schema:r,renderField:n}=this.props,{title:a,renderAddition:s,renderRemove:o,renderEmpty:c,renderMoveDown:d,renderMoveUp:u,renderOperations:p,...m}=this.getProps()||{};return l.a.createElement("div",{className:t,onClick:this.onClearErrorHandler()},Object(x.x)(e).map((e,t)=>l.a.createElement(h.Card,i()({},m,{title:l.a.createElement("span",null,t+1,". ",a||r.title),className:"card-list",key:t,extra:this.renderOperations(e,t)}),n(t))),0===e.length&&this.renderEmpty(a),l.a.createElement("div",{className:"addition-wrapper"},e.length>0&&this.renderAddition()))}})`
  .ant-card-body {
    padding-top: 30px;
    padding-bottom: 0 !important;
  }
  .ant-card-head-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ant-card {
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
        align-items: center;
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
  .ant-card.card-list {
    margin-top: 20px;
  }

  .addition-wrapper .array-item-addition {
    margin-top: 20px;
    margin-bottom: 3px;
  }
  .cricle-btn {
    margin-bottom: 0;
  }
  .ant-card-extra {
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
`;Object(c.registerFormField)("cards",ge);class ve extends o.Component{render(){const{prefix:e,pure:t,wrap:r,fixed:n,gutter:a,fixedWidth:s,align:c,justify:d,hidden:h,className:p,component:m,children:f,...b}=this.props;let g;!0===h?g={[`${e}row-hidden`]:!0}:"string"==typeof h?g={[`${e}row-${h}-hidden`]:!!h}:Array.isArray(h)&&(g=h.reduce((t,r)=>(t[`${e}row-${r}-hidden`]=!!r,t),{}));const v=u()({[`${e}row`]:!0,[`${e}row-wrap`]:r,[`${e}row-fixed`]:n,[`${e}row-fixed-${s}`]:!!s,[`${e}row-justify-${d}`]:!!d,[`${e}row-align-${c}`]:!!c,...g,[p]:!!p});let y=Object(x.x)(f);const j=parseInt(a,10);if(0!==j){const e=`${j/2}px`;b.style={marginLeft:`-${e}`,marginRight:`-${e}`,...b.style||{}},y=o.Children.map(f,(t,r)=>{if(t&&t.type&&"function"==typeof t.type&&t.type.isNextCol){return Object(o.cloneElement)(t,{style:{paddingLeft:e,paddingRight:e,...t.style||{}}})}return t})}return l.a.createElement(m,i()({role:"row",className:v},b),y)}}s()(ve,"defaultProps",{prefix:"ant-",pure:!1,fixed:!1,gutter:0,wrap:!1,component:"div"});const ye=["xxs","xs","s","m","l","xl"];class xe extends o.Component{render(){const{prefix:e,pure:t,span:r,offset:n,fixedSpan:a,fixedOffset:s,hidden:o,align:c,xxs:d,xs:h,s:p,m:m,l:f,xl:b,component:g,className:v,children:y,...x}=this.props,j=ye.reduce((t,r)=>{let n={};return"object"==typeof this.props[r]?n=this.props[r]:n.span=this.props[r],t[`${e}col-${r}-${n.span}`]=!!n.span,t[`${e}col-${r}-offset-${n.offset}`]=!!n.offset,t},{});let O;!0===o?O={[`${e}col-hidden`]:!0}:"string"==typeof o?O={[`${e}col-${o}-hidden`]:!!o}:Array.isArray(o)&&(O=o.reduce((t,r)=>(t[`${e}col-${r}-hidden`]=!!r,t),{}));const F=u()({[`${e}col`]:!0,[`${e}col-${r}`]:!!r,[`${e}col-fixed-${a}`]:!!a,[`${e}col-offset-${n}`]:!!n,[`${e}col-offset-fixed-${s}`]:!!s,[`${e}col-${c}`]:!!c,...j,...O,[v]:v});return l.a.createElement(g,i()({role:"gridcell",className:F},x),y)}}s()(xe,"isNextCol",!0),s()(xe,"defaultProps",{prefix:"ant-",pure:!1,component:"div"}),ve.__docgenInfo={description:"",methods:[],displayName:"Row",props:{prefix:{defaultValue:{value:"'ant-'",computed:!1},required:!1},pure:{defaultValue:{value:"false",computed:!1},required:!1},fixed:{defaultValue:{value:"false",computed:!1},required:!1},gutter:{defaultValue:{value:"0",computed:!1},required:!1},wrap:{defaultValue:{value:"false",computed:!1},required:!1},component:{defaultValue:{value:"'div'",computed:!1},required:!1}}},xe.__docgenInfo={description:"",methods:[],displayName:"Col",props:{prefix:{defaultValue:{value:"'ant-'",computed:!1},required:!1},pure:{defaultValue:{value:"false",computed:!1},required:!1},component:{defaultValue:{value:"'div'",computed:!1},required:!1}}};var je,Oe,Fe=r(173),Ee=r.n(Fe);const we=f()((Oe=je=class extends o.Component{renderChildren(){const{children:e,itemStyle:t,offset:r,span:n}=this.props;return l.a.createElement("div",{className:"button-group"},l.a.createElement(ve,null,l.a.createElement(xe,{span:n},l.a.createElement(xe,{offset:r,className:"inline"},l.a.createElement("div",{className:"inline-view",style:t},e)))))}getStickyBoundaryHandler(e){return()=>(this.formNode=this.formNode||g.a.findDOMNode(e.current),!this.formNode||((e,{offset:t=0,threshold:r=0}={})=>{const{top:n,right:i,bottom:a,left:s,width:o,height:l}=e,c=a,d=window.innerWidth-s,u=window.innerHeight-n,h=i,p=r*o,m=r*l;return c>=(t.top||t+m)&&d>=(t.right||t+p)&&u>=(t.bottom||t+m)&&h>=(t.left||t+p)})(this.formNode.getBoundingClientRect()))}render(){const{sticky:e,style:t,className:r}=this.props,n=l.a.createElement(I,null,({inline:e}={})=>l.a.createElement("div",{className:u()(r,{"is-inline":!!e}),style:t},this.renderChildren()));return e?l.a.createElement("div",null,l.a.createElement(I,null,({inline:e,FormRef:i}={})=>{if(i)return l.a.createElement(Ee.a,{edge:"bottom",triggerDistance:this.props.triggerDistance,offsetDistance:this.props.offsetDistance,zIndex:this.props.zIndex,getStickyBoundary:this.getStickyBoundaryHandler(i),style:{borderTop:"1px solid #eee",background:t&&t.background||"#fff",padding:t&&t.padding||"8px 0"}},l.a.createElement("div",{className:r,style:t},n))})):n}},s()(je,"defaultProps",{span:24}),Oe))`
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
`,Se=({showLoading:e,...t})=>l.a.createElement(c.FormConsumer,null,({status:r,schema:n})=>l.a.createElement(h.Button,i()({type:"primary",htmlType:"submit"},t,{loading:e?"submitting"===r:void 0}),t.children||"提交")),Ce=e=>l.a.createElement(c.FormConsumer,null,({status:t,reset:r})=>l.a.createElement(h.Button,i()({},e,{onClick:r}),e.children||"重置"));var ke,Ne,Ve,Ae;Se.__docgenInfo={description:"",methods:[],displayName:"Submit"},Ce.__docgenInfo={description:"",methods:[],displayName:"Reset"};const Pe=(e,t=0)=>e?"object"==typeof e?e:{span:e}:t,Ie=Object(c.createVirtualBox)("layout",({children:e,...t})=>l.a.createElement(I,null,r=>{let n={...r,...t},i=n.inline||n.className||n.style?l.a.createElement("div",{className:u()(n.className,{"ant-form ant-inline":!!n.inline}),style:n.style},e):e;return l.a.createElement(P,{value:n},i)})),Te=Object(c.createVirtualBox)("grid",class extends o.Component{renderFormItem(e){const{title:t,description:r,name:n,help:i,extra:a,...s}=this.props;return l.a.createElement(I,{},({labelAlign:a,labelTextAlign:o,labelCol:c,wrapperCol:d,size:u,autoAddColon:h})=>l.a.createElement(q,{labelAlign:a,labelTextAlign:o,labelCol:c,wrapperCol:d,autoAddColon:h,size:u,...s,label:t,noMinHeight:!0,id:n,extra:r,help:i},e))}renderGrid(){let{children:e,cols:t,title:r,description:n,help:a,extra:s,...o}=this.props;e=Object(x.x)(e),t=Object(x.x)(t).map(e=>Pe(e));const c=e.length;if(t.length<c){let e=c-t.length,r=24-t.reduce((e,t)=>e+Number(t.span?t.span:0)+Number(t.offset?t.offset:0),0);for(let n=0;n<e;n++)t.push(parseInt(r/e))}return t=Object(x.x)(t).map(e=>Pe(e)),l.a.createElement(h.Row,o,e.reduce((e,r,n)=>r?e.concat(l.a.createElement(h.Col,i()({key:n},t[n]),r)):e,[]))}render(){const{title:e}=this.props;return e?this.renderFormItem(this.renderGrid()):this.renderGrid()}}),$e=Object(c.createVirtualBox)("card",f()((Ne=ke=class extends o.Component{render(){const{children:e,className:t,...r}=this.props;return l.a.createElement(h.Card,i()({className:t},r),e)}},s()(ke,"defaultProps",{}),Ne))`
    margin-bottom: 30px;
    .ant-card-body {
      padding-top: 30px;
      padding-bottom: 0 !important;
    }
    &.ant-card {
      display: block;
      margin-bottom: 30px;
    }
  `),qe=Object(c.createVirtualBox)("block",f()((Ae=Ve=class extends o.Component{render(){const{children:e,className:t,...r}=this.props;return l.a.createElement(h.Card,i()({className:t},r),e)}},s()(Ve,"defaultProps",{}),Ae))`
    margin-bottom: 0px;
    .ant-card-body {
      padding-top: 20px;
      padding-bottom: 0 !important;
    }
    &.ant-card {
      border: none;
      padding: 0 15px;
      padding-bottom: 15px;
      display: block;
      box-shadow: none;
    }
    .ant-card-head {
      padding: 0 !important;
      min-height: 24px;
      font-weight: normal;
    }
    .ant-card-head-title {
      padding: 0;
    }
  `);Te.__docgenInfo={description:"",methods:[{name:"renderFormItem",docblock:null,modifiers:[],params:[{name:"children",optional:!1,type:null}],returns:null},{name:"renderGrid",docblock:null,modifiers:[],params:[],returns:null}]},r.d(t,"SchemaForm",function(){return c.SchemaForm}),r.d(t,"Field",function(){return c.Field}),r.d(t,"setValidationLocale",function(){return c.setValidationLocale}),r.d(t,"setValidationLanguage",function(){return c.setValidationLanguage}),r.d(t,"createFormActions",function(){return c.createFormActions}),r.d(t,"createAsyncFormActions",function(){return c.createAsyncFormActions}),r.d(t,"registerFormField",function(){return c.registerFormField}),r.d(t,"registerFormFields",function(){return c.registerFormFields}),r.d(t,"registerFormWrapper",function(){return c.registerFormWrapper}),r.d(t,"registerFieldMiddleware",function(){return c.registerFieldMiddleware}),r.d(t,"registerFormFieldPropsTransformer",function(){return c.registerFormFieldPropsTransformer}),r.d(t,"caculateSchemaInitialValues",function(){return c.caculateSchemaInitialValues}),r.d(t,"FormPath",function(){return c.FormPath}),r.d(t,"createVirtualBox",function(){return c.createVirtualBox}),r.d(t,"FormSlot",function(){return c.FormSlot}),r.d(t,"connect",function(){return c.connect}),r.d(t,"FormBridge",function(){return c.FormBridge}),r.d(t,"FormProvider",function(){return c.FormProvider}),r.d(t,"useForm",function(){return c.useForm}),r.d(t,"FormConsumer",function(){return c.FormConsumer}),r.d(t,"createArrayField",function(){return c.createArrayField}),r.d(t,"FormButtonGroup",function(){return we}),r.d(t,"Submit",function(){return Se}),r.d(t,"Reset",function(){return Ce}),r.d(t,"FormLayout",function(){return Ie}),r.d(t,"FormItemGrid",function(){return Te}),r.d(t,"FormCard",function(){return $e}),r.d(t,"FormBlock",function(){return qe}),r.d(t,"mapStyledProps",function(){return S}),r.d(t,"mapTextComponent",function(){return C});t.default=c.SchemaForm}}]);