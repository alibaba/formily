(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{107:function(e,t,r){"use strict";var i=r(132),n=(r(133),r(134)),a=(r(135),function(e){var t={exports:{}};e(t,t.exports);var r=t.exports.__esModule&&t.exports.default||t.exports;return"function"==typeof r?r:function(){return i.createElement("div",{},"Code snippet should export a component!")}}(function(e,t){var i=r(10);t.__esModule=!0,t.default=function(){return n.default.createElement(o.default,null,n.default.createElement(a.SchemaForm,{onSubmit:function(e){return console.log(e)},actions:l,labelCol:7,wrapperCol:12,effects:function(e,t){var r=t.setFieldState;e("onFormMount").subscribe(function(){r("radio",function(e){e.required=!0})})}},n.default.createElement(a.Field,{type:"radio",enum:["1","2","3","4"],title:"Radio",name:"radio"}),n.default.createElement(a.Field,{type:"string",enum:["1","2","3","4"],required:!0,title:"Select",name:"select"}),n.default.createElement(a.Field,{type:"checkbox",enum:["1","2","3","4"],required:!0,title:"Checkbox",name:"checkbox"}),n.default.createElement(a.Field,{type:"number",title:"数字选择",name:"number"}),n.default.createElement(a.Field,{type:"boolean",title:"开关选择",name:"boolean"}),n.default.createElement(a.Field,{type:"date",title:"日期选择",name:"date"}),n.default.createElement(a.Field,{type:"daterange",title:"日期范围",default:["2018-12-19","2018-12-19"],name:"daterange"}),n.default.createElement(a.Field,{type:"year",title:"年份",name:"year"}),n.default.createElement(a.Field,{type:"time",title:"时间",name:"time"}),n.default.createElement(a.Field,{type:"upload",title:"卡片上传文件",name:"upload","x-props":{listType:"card"}}),n.default.createElement(a.Field,{type:"upload",title:"拖拽上传文件",name:"upload2","x-props":{listType:"dragger"}}),n.default.createElement(a.Field,{type:"upload",title:"普通上传文件",name:"upload3","x-props":{listType:"text"}}),n.default.createElement(a.Field,{type:"range",title:"范围选择",name:"range","x-props":{min:0,max:1024,marks:[0,1024]}}),n.default.createElement(a.Field,{type:"transfer",title:"穿梭框",name:"transfer"}),n.default.createElement(a.Field,{type:"rating",title:"等级",name:"rating"}),n.default.createElement(a.FormButtonGroup,{offset:7,sticky:!0},n.default.createElement(a.Submit,null),n.default.createElement(a.Reset,null),n.default.createElement(s.Button,{onClick:function(){l.setFieldState("upload",function(e){e.value=[{downloadURL:"//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png",imgURL:"//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png",name:"doc.svg"}]})}},"上传文件"),n.default.createElement(s.Button,{onClick:function(){l.setFormState(function(e){e.values={radio:"4",checkbox:["2","3"]}})}},"改变radio的值"))))};var n=i(r(0)),a=(i(r(2)),r(144)),s=r(68),o=i(r(129));r(148);var l=(0,a.createFormActions)()})),s=function(){return i.createElement(i.Fragment,{},i.createElement("h1",{id:"简单场景",className:"react-demo-h1"},"简单场景"),i.createElement("blockquote",{className:"react-demo-blockquote"},i.createElement("p",{className:"react-demo-p"},"最简单的表单使用场景，只需要很简单使\n用",i.createElement("code",{className:"react-demo-code"},"<SchemaForm/>/<Field/><FormButtonGroup/><Submit/><Reset/>"),"即可")),i.createElement("h4",{id:"demo-示例",className:"react-demo-h4"},"Demo 示例"),i.createElement(n,{code:'import React from \'react\'\nimport ReactDOM from \'react-dom\'\nimport {\n  SchemaForm,\n  Field,\n  FormButtonGroup,\n  Submit,\n  Reset,\n  FormItemGrid,\n  FormCard,\n  FormPath,\n  FormBlock,\n  FormLayout,\n  createFormActions\n} from \'@uform/antd\'\nimport { Button } from \'antd\'\nimport Printer from \'@uform/printer\'\nimport \'antd/dist/antd.css\'\n\nconst actions = createFormActions()\n\nReactDOM.render(\n  <Printer>\n    <SchemaForm\n      onSubmit={v => console.log(v)}\n      actions={actions}\n      labelCol={7}\n      wrapperCol={12}\n      effects={($, { setFieldState }) => {\n        $(\'onFormMount\').subscribe(() => {\n          setFieldState(\'radio\', state => {\n            state.required = true\n          })\n        })\n      }}\n    >\n      <Field\n        type="radio"\n        enum={[\'1\', \'2\', \'3\', \'4\']}\n        title="Radio"\n        name="radio"\n      />\n      <Field\n        type="string"\n        enum={[\'1\', \'2\', \'3\', \'4\']}\n        required\n        title="Select"\n        name="select"\n      />\n      <Field\n        type="checkbox"\n        enum={[\'1\', \'2\', \'3\', \'4\']}\n        required\n        title="Checkbox"\n        name="checkbox"\n      />\n      <Field type="number" title="数字选择" name="number" />\n      <Field type="boolean" title="开关选择" name="boolean" />\n      <Field type="date" title="日期选择" name="date" />\n      <Field\n        type="daterange"\n        title="日期范围"\n        default={[\'2018-12-19\', \'2018-12-19\']}\n        name="daterange"\n      />\n      <Field type="year" title="年份" name="year" />\n      <Field type="time" title="时间" name="time" />\n      <Field\n        type="upload"\n        title="卡片上传文件"\n        name="upload"\n        x-props={{\n          listType: \'card\',\n        }}\n      />\n      <Field\n        type="upload"\n        title="拖拽上传文件"\n        name="upload2"\n        x-props={{ listType: \'dragger\' }}\n      />\n      <Field\n        type="upload"\n        title="普通上传文件"\n        name="upload3"\n        x-props={{ listType: \'text\' }}\n      />\n      <Field\n        type="range"\n        title="范围选择"\n        name="range"\n        x-props={{ min: 0, max: 1024, marks: [0, 1024] }}\n      />\n      <Field type="transfer" title="穿梭框" name="transfer" />\n      <Field type="rating" title="等级" name="rating" />\n      <FormButtonGroup offset={7} sticky>\n        <Submit />\n        <Reset />\n        <Button\n          onClick={() => {\n            actions.setFieldState(\'upload\', state => {\n              state.value = [\n                {\n                  downloadURL:\n                    \'//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png\',\n                  imgURL:\n                    \'//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png\',\n                  name: \'doc.svg\'\n                }\n              ]\n            })\n          }}\n        >\n          上传文件\n        </Button>\n        <Button\n          onClick={() => {\n            actions.setFormState(state => {\n              state.values = {\n                radio: \'4\',\n                checkbox: [\'2\', \'3\']\n              }\n            })\n          }}\n        >\n          改变radio的值\n        </Button>\n      </FormButtonGroup>\n    </SchemaForm>\n  </Printer>,\n  document.getElementById(\'root\')\n)\n',justCode:!1,lang:"jsx"},i.createElement(a,{})))};s.meta={username:"zhili.wzl",email:"wangzhili56@126.com"},e.exports=s},115:function(e,t,r){"use strict";r.r(t);var i={};r.r(i),r.d(i,"url",function(){return H}),r.d(i,"email",function(){return U}),r.d(i,"ipv6",function(){return L}),r.d(i,"ipv4",function(){return W}),r.d(i,"number",function(){return K}),r.d(i,"integer",function(){return G}),r.d(i,"qq",function(){return Q}),r.d(i,"phone",function(){return J}),r.d(i,"idcard",function(){return Z}),r.d(i,"taodomain",function(){return ee}),r.d(i,"money",function(){return te}),r.d(i,"zh",function(){return re}),r.d(i,"date",function(){return ie}),r.d(i,"zip",function(){return ne});var n=r(9),a=r.n(n),s=r(0),o=r.n(s),l=r(116),c=r.n(l),d=r(137),u=r.n(d),h=r(117);const p=(e,t,r)=>Object(h.t)(t,(e,t)=>Object(h.o)(t)?t(e):e,e,r),m=e=>t=>r=>e({...t},r),f=(e,t)=>"properties"!==t&&"items"!==t,b=(e,t)=>"properties"!==t&&"items"!==t&&"children"!==t;let g,v,y,x,j;const O=()=>{var e,t;g=[],v={},y={},x=void 0,t=e=class extends o.a.Component{render(){const{formRef:e,component:t,...r}=this.props;return o.a.createElement(t,{...r,ref:e})}},c()(e,"defaultProps",{component:"form"}),(j=t).displayName="Form"},F=(e,t,r)=>{Object(h.r)(e)&&e&&(Object(h.o)(t)||"string"==typeof t.styledComponentId)&&(r?(v[Object(h.s)(e)]=t,v[Object(h.s)(e)].registerMiddlewares=[]):(v[Object(h.s)(e)]=p(t,g,!0),v[Object(h.s)(e)].registerMiddlewares=g),v[Object(h.s)(e)].displayName=u()(e))},E=e=>{Object(h.g)(e,(e,t)=>{F(t,e)})},w=(...e)=>{g=g.concat(e),Object(h.g)(v,(t,r)=>{t.registerMiddlewares.some(t=>e.indexOf(t)>-1)||(v[r]=p(v[r],e,!0),v[r].registerMiddlewares=g)})},S=(...e)=>{j=e.reduce((e,t,r)=>{let i=Object(h.o)(t)?t(e):e;return i.displayName=`FormWrapperLevel${r}`,i},j)},C=(e,t)=>{Object(h.o)(t)&&(y[e]=t)},k=e=>y[e],N=e=>v[e],V=o.a.forwardRef((e,t)=>o.a.createElement(j,{...e,ref:t})),A=e=>e.reduce((e,t)=>Object(h.k)(t)?e.concat(A(t)):e.concat(t),[]),P=e=>({change(t){e.form.setValue(e.name,t)},dispatch(t,r){e.form.triggerEffect(t,{name:e.name,path:e.path,payload:r})},errors(t,...r){e.form.setErrors(e.name,A(Object(h.x)(t)),...r)},push(t){const r=Object(h.x)(e.form.getValue(e.name));e.form.setValue(e.name,r.concat(t))},pop(){const t=[].concat(Object(h.x)(e.form.getValue(e.name)));t.pop(),e.form.setValue(e.name,t)},insert(t,r){const i=[].concat(Object(h.x)(e.form.getValue(e.name)));i.splice(t,0,r),e.form.setValue(e.name,i)},remove(t){let r=e.form.getValue(e.name);(e=>"number"==typeof e)(t)&&Object(h.k)(r)?((r=[].concat(r)).splice(t,1),e.form.setValue(e.name,r)):e.form.removeValue(e.name)},unshift(t){const r=[].concat(Object(h.x)(e.form.getValue(e.name)));r.unshift(t),e.form.setValue(e.name,r)},shift(){const t=[].concat(Object(h.x)(e.form.getValue(e.name)));t.shift(),e.form.setValue(e.name,t)},move(t,r){const i=[].concat(Object(h.x)(e.form.getValue(e.name))),n=i[t];i.splice(t,1),i.splice(r,0,n),e.form.setValue(e.name,i)}}),I=o.a.createContext(),$=o.a.createContext(),T=o.a.createContext(),q=m((e,t)=>{class r extends s.Component{constructor(e){super(e),c()(this,"renderField",(e,t)=>{const r=this.props.path.concat(e),i=this.props.schemaPath.concat(e),n=r.join(".");return o.a.createElement(q,{key:t?n:void 0,path:r,name:n,schemaPath:i})}),c()(this,"getOrderProperties",e=>{const{schema:t,path:r}=this.props;if(!t&&!e)return[];const i=[];return Object(h.g)((e||t||{}).properties,(e,t)=>{let n=e["x-index"],a=r.concat(t),s=a.join(".");"number"==typeof n?i[n]={schema:e,key:t,path:a,name:s}:i.push({schema:e,key:t,path:a,name:s})}),i}),this.initialized=!1,this.state={},this.field=e.form.registerField(e.name||e.schemaPath.join("."),{path:e.schemaPath,onChange:this.onChangeHandler(e),props:e.schema}),this.initialized=!0,this.mutators=P(e)}onChangeHandler(){return e=>{if(this.initialized){if(this.unmounted)return;this.setState(e)}else this.state=e}}componentWillUnmount(){this.unmounted=!0,this.field.remove()}componentDidMount(){this.unmounted=!1,this.field.restore()}componentDidUpdate(e){Object(h.n)(this.props.schema,e.schema,f)||this.field.changeProps(this.props.schema)}render(){const{name:e,path:r,schemaPath:i,locale:n,getSchema:a}=this.props,{value:s,visible:l,props:c,errors:d,loading:u,editable:p,required:m}=this.state,f=Object(h.v)(c,"object")?s||{}:Object(h.v)(c,"array")?s||[]:s;return!1===l?o.a.createElement(o.a.Fragment,null):o.a.createElement(t,{name:e,value:f,errors:d,required:m,path:r,editable:p,locale:n,loading:u,schemaPath:i,getSchema:a,renderField:this.renderField,getOrderProperties:this.getOrderProperties,mutators:this.mutators,schema:c})}}return c()(r,"displayName","StateField"),e=>{const{name:t,path:i,schemaPath:n}=e,{form:a,getSchema:l,locale:c}=Object(s.useContext)($);return o.a.createElement(r,{name:t,path:i,form:a,schema:l(n||i),locale:c,getSchema:l,schemaPath:n})}})()(e=>{const t=e.schema,r=Object(h.s)(t["x-component"]||t.type),i=t["x-render"]?i=>o.a.createElement(N(r),{...e,...i,schema:t,path:e.path,name:e.name}):void 0,n=t["x-render"]?(()=>x)():N(r);return n?o.a.createElement(n,{...e,renderComponent:i}):(console&&console.error&&(r?console.error(`The schema field \`${r}\`'s component is not found.`):console.error("The schema field's component is not found, or field's schema is not defined.")),o.a.createElement(o.a.Fragment,null))});var B=r(2);let M=0;const R=(e,t)=>{const r=Object(s.useContext)(I);if(Object(h.v)(r,"object")){let t=e.name||(()=>`UFORM_NO_NAME_FIELD_$${M++}`)();return r.properties=r.properties||{},r.properties[t]=Object(h.d)(e,b),o.a.createElement(I.Provider,{value:r.properties[t]},e.children)}return Object(h.v)(r,"array")?(r.items=Object(h.d)(e,b),o.a.createElement(I.Provider,{value:r.items},e.children)):e.children||o.a.createElement(o.a.Fragment,null)},z=m((e,t)=>{var r,i;return i=r=class extends s.Component{constructor(...e){super(...e),c()(this,"portalRoot",document.createElement("div"))}render(){let{children:e,initialValues:r,defaultValue:i,value:n,schema:s,...l}=this.props,c=!1;return s?c=!0:s={type:"object"},M=0,o.a.createElement(o.a.Fragment,null,!c&&Object(B.createPortal)(o.a.createElement(I.Provider,{value:s},e),this.portalRoot),o.a.createElement(t,a()({},l,{defaultValue:n||i,value:n,initialValues:r,schema:s}),e))}},c()(r,"displayName","SchemaMarkupParser"),i});R.__docgenInfo={description:"",methods:[],displayName:"SchemaField"};var X=r(119),D=r(120);const Y=(e,t,r)=>{if(Object(X.f)(t))return"";return Object(X.j)(e)&&(e.lastIndex=0),(Object(X.h)(e)?e(t):Object(X.j)(e)?e.test(String(t)):new RegExp(String(e)).test(String(t)))?"":r};var _=(e,t,r,i)=>{if(t.pattern)return Y(t.pattern,e,Object(X.c)(t.message||Object(D.a)("pattern"),i,e,t.pattern))};const H=new RegExp("^(?:(?:(?:https?|ftp):)?//)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:22[0-3]|2[01]\\d|[1-9]\\d?|1\\d\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1?\\d{1,2})){2}(?:\\.(?:25[0-4]|2[0-4]\\d|1\\d\\d|[1-9]\\d?))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$"),U=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,L=/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/,W=/^((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){3}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})$/,K=/^[+-]?\d+(\.\d+)?$/,G=/^[+-]?\d+$/,Q=/^(\+?[1-9]\d*|0)$/,J=/^\d{3}-\d{8}$|^\d{4}-\d{7}$|^\d{11}$/,Z=/^\d{15}$|^\d{18}$/,ee=/^(https?\:)?\/\/[a-zA-Z0-9\.\-]+\.(taobao|tmall|alitrip|yao\.95095)(\.daily)?\.(com|net|hk(\/hk)?)/,te=/^([\u0024\u00A2\u00A3\u00A4\u20AC\u00A5\u20B1\20B9\uFFE5]\s*)(\d+,?)+\.?\d*\s*$/,re=/^[\u4e00-\u9fa5]+$/,ie=/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-\/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-\/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/,ne=/^[0-9]{6}$/,ae=Object.keys(i);var se=(e,t,r,n)=>((e,t,r,n)=>{for(let r=0;r<ae.length;r++)if(ae[r]===t.format)return Y(i[ae[r]],e,Object(X.c)(t.message||Object(D.a)(t.format),n,e))})(e,t,0,n),oe=(e,t,r,i)=>{if(t.required)return Object(X.f)(e)?Object(X.c)(t.message||Object(D.a)("required"),i):""},le=(e,t,r,i)=>{if(Object(X.h)(t.validator))return t.validator(e,t,r,i)};const ce=(e,t,r,i)=>Promise.all(((...e)=>(...t)=>e.map(e=>Promise.resolve(e(...t))))(se,oe,_,le)(e,t,r,i)),de=e=>Object(X.l)(e,(e,t)=>Object(X.e)(t)?e.concat(de(t)):t?e.concat(t):e,[]),ue=(e,t,r,i)=>{const n=[];return Object(X.h)(r)&&(i=r,r=!1),Object(X.b)(t,(t,i)=>{const a=Object(X.d)(e,i);if(!1===t.visible||!1===t.editable)return;if(Object(X.g)(t.__lastValidateValue,a)&&!r)return;const s=t.props&&t.props.title;let o=setTimeout(()=>{t.loading=!0,t.dirty=!0,t.notify&&t.notify()},100);n.push(Promise.all(Object(X.m)(t.rules).map(t=>((e,t,r,i)=>{const n=Object(X.i)(t)?t:Object(X.k)(t)?{format:t}:Object(X.h)(t)?{validator:t}:{};return ce(e,n,r,i)})(a,t,e,s||i))).then(e=>{clearTimeout(o);let n=t.errors;const s=t.valid,l=t.loading;return t.loading=!1,r?(e&&(t.errors=de(Object(X.m)(e))),t.errors.length?(t.valid=!1,t.invalid=!0):(t.valid=!0,t.invalid=!1),t.errors&&t.errors.length&&(t.dirty=!0)):t.pristine||(e&&(t.errors=de(Object(X.m)(e))),t.errors.length?(t.valid=!1,t.invalid=!0):(t.valid=!0,t.invalid=!1),Object(X.g)(s,t.valid)&&Object(X.g)(n,t.errors)||(t.dirty=!0)),t.loading!==l&&(t.dirty=!0),t.dirty&&t.notify&&t.notify(),t.__lastValidateValue=Object(X.a)(a),{name:i,value:a,field:t,invalid:t.invalid,valid:t.valid,errors:t.errors}}))}),Promise.all(n).then(e=>(Object(X.h)(i)&&i(e),e))};var he=r(121);const pe=(e,t)=>"properties"!==t&&"items"!==t;class me{constructor(e,t){this.fieldbrd=new he.a,this.context=e,this.dirty=!1,this.pristine=!0,this.valid=!0,this.removed=!1,this.invalid=!1,this.visible=!0,this.editable=!0,this.destructed=!1,this.loading=!1,this.errors=[],this.effectErrors=[],this.initialized=!1,this.initialize(t),this.initialized=!0}initialize(e){const t=this.getEditableFromProps(e.props),r=this.getRulesFromProps(e.props);this.value=Object(he.o)(e.value)?this.value:Object(he.e)(e.value),this.initialValue=Object(he.o)(e.initialValue)?Object(he.o)(this.initialValue)?this.getInitialValueFromProps(e.props):this.initialValue:e.initialValue,this.name=Object(he.o)(e.name)?this.name||"":e.name,this.namePath=Object(he.w)(this.name),this.editable=Object(he.o)(t)?this.editable:t,this.path=Object(he.w)(Object(he.o)(e.path)?this.path||[]:e.path),this.rules=Object(he.o)(r)?this.rules:r,this.required=Object(he.k)(this.rules),this.props=Object(he.o)(e.props)?this.props||{}:Object(he.o)(this.props)?Object(he.e)(e.props):{...this.props,...Object(he.e)(e.props)},this.removed&&(this.removed=!1,this.visible=!0),this.initialized||Object(he.o)(this.value)&&!Object(he.o)(this.initialValue)&&(this.value=Object(he.e)(this.initialValue),this.context.setIn(this.name,this.value),this.context.setInitialValueIn(this.name,this.initialValue)),Object(he.q)(e.onChange)&&this.onChange(e.onChange)}getInitialValueFromProps(e){if(e&&!Object(he.o)(e.default))return e.default}getEditableFromProps(e){if(e){if(!Object(he.o)(e.editable))return this.getEditable(e.editable);if(e["x-props"]&&!Object(he.o)(e["x-props"].editable))return this.getEditable(e["x-props"].editable)}return this.getEditable(this.context.editable)}getRulesFromProps(e){if(e){const t=Object(he.y)(e["x-rules"]);return e.required&&!t.some(e=>e.required)&&t.push({required:!0}),Object(he.e)(t)}return this.rules}getRequiredFromProps(e){if(!Object(he.o)(e.required))return e.required}getEditable(e){return Object(he.q)(e)?e(this.name):Object(he.m)(e)?e:this.editable}onChange(e){Object(he.q)(e)&&(this.unSubscribeOnChange&&this.unSubscribeOnChange(),e(this.publishState()),this.unSubscribeOnChange=this.subscribe(e))}pathEqual(e){if(Object(he.r)(e)&&e===this.name)return!0;if((e=Object(he.w)(e)).length===this.path.length){for(let t=0;t<e.length;t++)if(e[t]!==this.path[t])return!1;return!0}if(e.length===this.namePath.length){for(let t=0;t<e.length;t++)if(e[t]!==this.namePath[t])return!1;return!0}return!1}publishState(){return Object(he.s)(this)}subscribe(e){return this.fieldbrd.subscribe(e)}notify(e){(this.dirty||e)&&(this.fieldbrd.notify(this.publishState()),this.dirty=!1,this.dirtyType="")}unsubscribe(){this.fieldbrd.unsubscribe()}changeProps(e,t){let r=this.props;Object(he.o)(e)||!t&&Object(he.p)(r,e,pe)||(this.props=Object(he.e)(e,pe),this.editable=this.getEditableFromProps(this.props),this.rules=this.getRulesFromProps(this.props),this.dirty=!0,this.notify())}changeEditable(e){this.props&&Object(he.o)(this.props.editable)&&(this.props["x-props"]&&!Object(he.o)(this.props["x-props"].editable)||(this.editable=this.getEditable(e),this.dirty=!0,this.notify()))}restore(){this.removed&&(this.visible=!0,this.removed=!1)}remove(){this.value=void 0,this.initialValue=void 0,this.visible=!1,this.removed=!0,this.context&&(this.context.deleteIn(this.name),this.context.deleteInitialValues(this.name),"object"==typeof this.value&&this.context.updateChildrenVisible(this,!1))}checkState(e=this.publishState()){Object(he.p)(e.value,this.value)||(this.value=e.value,this.pristine=!1,this.context.setIn(this.name,this.value),this.context.updateChildrenValue(this),this.dirtyType="value",this.dirty=!0),Object(he.p)(e.initialValue,this.initialValue)||(this.initialValue=e.initialValue,this.context.setInitialValueIn(this.name,this.value),this.context.updateChildrenInitalValue(this),this.dirtyType="initialValue",this.dirty=!0);const t=this.getEditable(e.editable);if(Object(he.p)(t,this.editable)){const t=this.getEditableFromProps(e.props);Object(he.o)(t)||Object(he.p)(t,this.editable)||(this.editable=t,this.dirtyType="editable",this.dirty=!0)}else this.editable=t,this.dirtyType="editable",this.dirty=!0;if(e.errors=Object(he.y)(e.errors).filter(e=>!!e),Object(he.p)(e.errors,this.effectErrors)||(this.effectErrors=e.errors,this.valid=this.effectErrors.length>0&&this.errors.length>0,this.invalid=!this.valid,this.dirtyType="errors",this.dirty=!0),Object(he.p)(e.rules,this.rules)){const t=this.getRulesFromProps(this.props),r=this.getRulesFromProps(e.props);Object(he.o)(r)||Object(he.p)(t,r)||Object(he.p)(r,this.rules)||(this.rules=r,this.errors=[],Object(he.k)(this.rules)&&(this.required=!0,e.required=!0),this.valid=!0,this.invalid=!1,this.dirtyType="rules",this.dirty=!0)}else this.rules=e.rules,this.errors=[],this.valid=!0,Object(he.k)(this.rules)&&(this.required=!0,e.required=!0),this.invalid=!1,this.dirtyType="rules",this.dirty=!0;if(Object(he.p)(e.required,this.required)){const t=this.getRequiredFromProps(e.props);Object(he.o)(t)||Object(he.p)(t,this.required)||(this.required=t,this.errors=[],this.required?Object(he.k)(this.rules)||(this.rules=Object(he.y)(this.rules).concat({required:!0}),this.errors=[],this.valid=!0,this.invalid=!1):(this.rules=Object(he.y)(this.rules).filter(e=>!e||!e.required),this.errors=[],this.valid=!0,this.invalid=!1),this.dirty=!0)}else this.required=e.required,this.required?Object(he.k)(this.rules)||(this.rules=Object(he.y)(this.rules).concat({required:!0}),this.errors=[],this.valid=!0,this.invalid=!1):(this.rules=Object(he.y)(this.rules).filter(e=>!e||!e.required),this.errors=[],this.valid=!0,this.invalid=!1),this.dirty=!0;e.loading!==this.loading&&(this.loading=e.loading,this.dirtyType="loading",this.dirty=!0),Object(he.p)(e.visible,this.visible)||(this.visible=e.visible,this.visible?(this.value=void 0!==this.value?this.value:Object(he.e)(this.initialValue),void 0!==this.value&&this.context.setIn(this.name,this.value),this.context.updateChildrenVisible(this,!0)):(this.context.deleteIn(this.name),this.context.updateChildrenVisible(this,!1)),this.dirtyType="visible",this.dirty=!0),Object(he.p)(e.props,this.props,pe)||(this.props=Object(he.e)(e.props,pe),this.dirtyType="props",this.dirty=!0)}updateState(e){if(!Object(he.q)(e))return;const t={name:this.name,path:this.path,props:Object(he.e)(this.props,pe),value:Object(he.e)(this.value),initialValue:Object(he.e)(this.initialValue),valid:this.valid,loading:this.loading,editable:this.editable,invalid:this.invalid,pristine:this.pristine,rules:Object(he.e)(this.rules),errors:Object(he.e)(this.effectErrors),visible:this.visible,required:this.required};e(t),this.checkState(t)}destructor(){this.destructed||(this.destructed=!0,void 0!==this.value&&(this.value=void 0,this.context.deleteIn(this.name)),this.context.updateChildrenVisible(this,!1),delete this.context,this.unsubscribe(),delete this.fieldbrd)}}var fe=r(152),be=r(153),ge=r(151),ve=r.n(ge);const ye=(e,t,r)=>Object(he.q)(t)?e&&t(r):e,xe=/\*/,je={match(e,t,r){e+="";const i=ve()(e);Object(he.q)(t)&&(r=t,t=!1);const n=e=>e&&e.fieldState?ye(i(Object(he.w)(t?e.fieldState.path:e.fieldState.name)),r,e.fieldState):e&&e.name&&e.path?ye(i(Object(he.w)(t?e.path:e.name)),r,e):Object(he.r)(e)?ye(i(Object(he.w)(e)),r,{name:e}):!!Object(he.l)(e)&&ye(i(e),r,{path:e});return n.hasWildcard=xe.test(e),n.string=e,n},exclude:e=>t=>Object(he.q)(e)?!e(t):!!Object(he.r)(e)&&!je.match(e)(t),transform:(e,t,r)=>r(...Object(he.v)(Object(he.w)(e),(e,r)=>new RegExp(t).test(r)?e.concat(r):e,[]))},Oe=e=>({initialValues:{},onSubmit:e=>{},effects:e=>{},...e});class Fe{constructor(e){c()(this,"triggerEffect",(e,...t)=>{this.subscribes[e]&&this.subscribes[e].next(...t)}),c()(this,"setFieldState",(e,t,r)=>{if(!this.destructed)return Object(he.q)(t)&&(r=t,t=!1),(Object(he.r)(e)||Object(he.l)(e)||Object(he.q)(e))&&this.updateQueue.push({path:e,callback:r}),new Promise(e=>{this.syncUpdateMode&&(this.updateFieldStateFromQueue(t),e()),this.updateQueue.length>0&&(this.updateRafId&&Object(he.d)(this.updateRafId),this.updateRafId=Object(he.u)(()=>{this.destructed||(this.updateFieldStateFromQueue(t),e())}))})}),c()(this,"getFieldState",(e,t)=>{let r;if(Object(he.h)(this.fields,t=>{if(t.pathEqual(e))return r=t,!1}),r)return Object(he.q)(t)?t(r.publishState()):r.publishState()}),c()(this,"getFormState",e=>Object(he.q)(e)?e(this.publishState()):this.publishState()),c()(this,"setFormState",e=>{if(!Object(he.q)(e))return;const t=this.publishState();return e(t,e),Promise.resolve(this.checkState(t))}),this.options=Oe(e),this.formbrd=new he.a,this.initialized=!1,this.state={},this.fields={},this.subscribes=e.subscribes||{},this.updateQueue=[],this.updateBuffer=new he.b,this.editable=e.editable,this.schema=e.schema||{},this.initialize(this.options.initialValues),this.initializeEffects(),this.initialized=!0,this.destructed=!1,this.fieldSize=0}initialize(e=this.state.initialValues){const t=this.state.values,r=this.state.dirty;this.state={valid:!0,invalid:!1,errors:[],pristine:!0,initialValues:Object(he.e)(e)||{},values:Object(he.e)(e)||{},dirty:r||!!this.initialized&&!Object(he.p)(e,t)},this.options.onFormChange&&!this.initialized&&(this.subscribe(this.options.onFormChange),this.options.onFormChange({formState:this.publishState()})),this.updateFieldsValue(!1)}changeValues(e){const t=this.state.values,r=this.state.dirty;this.state.values=e||{},this.state.dirty=r||!!this.initialized&&!Object(he.p)(e,t),this.updateFieldsValue()}changeEditable(e){this.editable=e,Object(he.h)(this.fields,(t,r)=>{t.changeEditable(e)})}initializeEffects(){const{effects:e}=this.options;Object(he.q)(e)&&e((e,t)=>(this.subscribes[e]||(this.subscribes[e]=new fe.Subject),Object(he.r)(t)||Object(he.q)(t)?this.subscribes[e].pipe(Object(be.filter)(Object(he.r)(t)?je.match(t):t)):this.subscribes[e]),{setFieldState:this.setFieldState,getFieldState:this.getFieldState,getFormState:this.getFormState,setFormState:this.setFormState})}checkState(e){return Object(he.p)(this.state.values,e.values)?Object(he.p)(this.state.initialValues,e.initialValues)?void 0:(this.state.initialValues=e.initialValues,this.state.dirty=!0,this.updateFieldInitialValue()):(this.state.values=e.values,this.state.dirty=!0,this.updateFieldsValue())}syncUpdate(e){Object(he.q)(e)&&(this.syncUpdateMode=!0,e(),this.syncUpdateMode=!1)}asyncUpdate(e){Object(he.q)(e)&&(this.syncUpdateMode?(this.syncUpdateMode=!1,e(),this.syncUpdateMode=!0):e())}updateFieldStateFromQueue(e){const t={},r={};Object(he.h)(this.updateQueue,({path:i,callback:n},a)=>{Object(he.h)(this.fields,s=>{if(i&&(Object(he.q)(i)||Object(he.l)(i)||Object(he.r)(i)))if(Object(he.q)(i)?i(s):s.pathEqual(i)){if(s.updateState(n),this.syncUpdateMode&&(s.dirty=!1),i.hasWildcard&&this.updateBuffer.push(i.string,n,{path:i}),s.dirty){const e=s.dirtyType;s.notify(),r[s.name]&&Object(he.d)(r[s.name]),r[s.name]=Object(he.u)(()=>{"value"===e?this.internalValidate().then(()=>{this.formNotify(s.publishState())}):this.formNotify(s.publishState())})}}else t[a]=t[a]||0,t[a]++,this.fieldSize<=t[a]&&(e||i.hasWildcard)&&(Object(he.r)(i)?this.updateBuffer.push(i,n,{path:i}):Object(he.q)(i)&&i.hasWildcard&&this.updateBuffer.push(i.string,n,{path:i}))})}),this.updateQueue=[]}updateFieldStateFromBuffer(e){const t={};this.updateBuffer.forEach(({path:r,values:i,key:n})=>{if(Object(he.q)(r)?r(e):e.pathEqual(r)){if(i.forEach(t=>e.updateState(t)),this.syncUpdateMode&&(e.dirty=!1),e.dirty){const r=e.dirtyType;e.notify(),t[e.name]&&Object(he.d)(t[e.name]),t[e.name]=Object(he.u)(()=>{"value"===r?this.internalValidate().then(()=>{this.formNotify(e.publishState())}):this.formNotify(e.publishState())})}r.hasWildcard||this.updateBuffer.remove(n)}})}internalValidate(e=this.state.values,t){if(!this.destructed)return new Promise(r=>{this.rafValidateId&&Object(he.d)(this.rafValidateId),this.rafValidateId=Object(he.u)(()=>this.destructed?r():ue(e||this.state.values,this.fields,t).then(e=>{const t=this.state.valid;let r=Object(he.v)(e,(e,{name:t,errors:r})=>r.length?e.concat({name:t,errors:r}):e,[]);this.state.valid=0===r.length,this.state.invalid=!this.state.valid,this.state.errors=r,this.state.valid!==t&&(this.state.dirty=!0);const i=this.state.pristine;return Object(he.p)(this.state.values,this.state.initialValues)?this.state.pristine=!0:this.state.pristine=!1,i!==this.state.pristine&&(this.state.dirty=!0),e}).then(r))})}registerField(e,t){const r=this.getValue(e),i=this.getInitialValue(e,t.path),n=this.fields[e];if(n)n.initialize({...t,value:Object(he.o)(r)?i:r,initialValue:i}),this.asyncUpdate(()=>{this.updateFieldStateFromBuffer(n)}),this.triggerEffect("onFieldChange",n.publishState());else{this.fields[e]=new me(this,{name:e,value:Object(he.o)(r)?i:r,path:t.path,initialValue:i,props:t.props});let n=this.fields[e];t.onChange&&(this.asyncUpdate(()=>{this.updateFieldStateFromBuffer(n),n.onChange(t.onChange)}),this.triggerEffect("onFieldChange",n.publishState())),this.fieldSize++}return this.fields[e]}setIn(e,t){Object(he.x)(this.state.values,e,t)}setInitialValueIn(e,t){Object(he.x)(this.state.initialValues,e,t)}setValue(e,t){const r=this.fields[e];r&&(r.updateState(e=>{e.value=t}),r.pristine=!1,r.dirty&&(r.notify(),this.internalValidate(this.state.values).then(()=>{this.formNotify(r.publishState())})))}setErrors(e,t,...r){t=Object(he.y)(t);const i=this.fields[e];if(i){const e=i.errors;Object(he.p)(e,t)||(i.errors=t.map(e=>Object(X.c)(e,...r)),t.length?(i.invalid=!0,i.valid=!1):(i.invalid=!1,i.valid=!0),i.dirty=!0,i.notify())}}updateChildrenValue(e){e.path&&!this.batchUpdateField&&Object(he.h)(this.fields,(t,r)=>{if(Object(he.n)(t,e)){let e=this.getValue(r);Object(he.p)(t.value,e)||(t.dirty=!0,t.value=e,t.notify(),this.triggerEffect("onFieldChange",t.publishState()))}})}updateChildrenInitalValue(e){e.path&&Object(he.h)(this.fields,(t,r)=>{if(Object(he.n)(t,e)){let e=this.getInitialValue(r);Object(he.p)(t.initialValue,e)||(t.dirty=!0,t.initialValue=e)}})}updateFieldInitialValue(){this.state.dirty&&this.initialized&&Object(he.h)(this.fields,(e,t)=>{let r=this.getInitialValue(t);e.initialValue=r})}updateFieldsValue(e=!0){const{promise:t,resolve:r}=Object(he.f)(),i=()=>{const e=[];this.batchUpdateField=!0,Object(he.h)(this.fields,(t,r)=>{let i=this.getValue(r);t.updateState(e=>{e.value=i}),t.dirty&&e.push(new Promise(e=>{Object(he.u)(()=>{this.destructed||(t.notify(),this.triggerEffect("onFieldChange",t.publishState()),e())})}))}),this.batchUpdateField=!1,r(Promise.all(e))};return this.state.dirty&&this.initialized&&(e?this.internalValidate(this.state.values,!0).then(()=>{this.formNotify(),i()}):i()),t}updateChildrenVisible(e,t){e.path&&Object(he.h)(this.fields,(r,i)=>{if(i!==e.name&&Object(he.n)(r,e)){if(t){let e=void 0!==r.value?r.value:Object(he.e)(r.initialValue);void 0!==r.value&&this.setIn(i,e)}else this.deleteIn(i);r.visible!==t&&(r.visible=t,r.dirty=!0)}})}getInitialValue(e,t){const r=Object(he.i)(this.state.initialValues,e);let i,n;return void 0===r&&void 0!==(n=(i=t?Object(he.j)(this.schema,t):void 0)&&i.default)&&this.setIn(e,n),void 0!==r?r:n}getValue(e,t){return t?Object(he.e)(Object(he.i)(this.state.values,e)):Object(he.i)(this.state.values,e)}deleteIn(e){Object(he.g)(this.state.values,e)}deleteInitialValues(e){Object(he.g)(this.state.initialValues,e)}reset(e){Object(he.h)(this.fields,(t,r)=>{const i=this.getValue(r),n=this.getInitialValue(r,t.path);Object(he.o)(i)&&Object(he.o)(n)||(t.updateState(t=>{t.value=e?void 0:n}),t.dirty&&Object(he.u)(()=>{this.destructed||t.notify()}))}),this.internalValidate(this.state.values,!0).then(()=>{this.formNotify(),Object(he.u)(()=>{const e=this.publishState();this.triggerEffect("onFormReset",e),Object(he.q)(this.options.onReset)&&this.options.onReset({formState:e})})})}publishState(){return Object(he.t)(this.state)}formNotify(e){const t=this.publishState();return Object(he.q)(this.options.onFieldChange)&&this.options.onFieldChange({formState:t,fieldState:e}),e&&this.triggerEffect("onFieldChange",e),this.state.dirty&&this.formbrd.notify({formState:t,fieldState:e}),this.state.dirty=!1,t}validate(){return this.internalValidate(this.state.values,!0).then(()=>new Promise((e,t)=>{this.formNotify(),Object(he.u)(()=>{this.state.valid?e(this.publishState()):(this.options.onValidateFailed&&this.options.onValidateFailed(this.state.errors),t(this.state.errors))})}))}submit(){return this.validate().then(e=>(this.triggerEffect("onFormSubmit",e),Object(he.q)(this.options.onSubmit)&&this.options.onSubmit({formState:e}),e))}subscribe(e){return this.formbrd.subscribe(e)}destructor(){this.destructed||(this.destructed=!0,this.formbrd.unsubscribe(),Object(he.h)(this.subscribes,e=>{e.unsubscribe()}),Object(he.h)(this.fields,(e,t)=>{e.destructor(),delete this.fields[t]}),this.fieldSize=0,delete this.fields,delete this.formbrd)}}const Ee=({initialValues:e,onSubmit:t,onReset:r,schema:i,onFormChange:n,onFieldChange:a,onFormWillInit:s,subscribes:o,editable:l,effects:c,onValidateFailed:d})=>{let u=[];e=Object(he.c)(i,e,({name:e,path:t,schemaPath:r},i,n)=>{u.push({name:e,path:t,schemaPath:r,schema:i,value:n})});const h=new Fe({initialValues:e,onSubmit:t,onReset:r,subscribes:o,onFormChange:n,onFieldChange:a,editable:l,effects:c,onValidateFailed:d,schema:i});return Object(he.q)(s)&&s(h),u=u.map(({name:e,path:t,schemaPath:r,schema:i,value:n})=>h.registerField(e||r.join("."),{path:r,props:i})),h.syncUpdate(()=>{h.triggerEffect("onFormInit",h.publishState())}),h};var we=r(138);const Se=()=>e=>{const t=t=>{const r=Object(s.useContext)(T);return r?o.a.createElement(e,a()({},t,{broadcast:r})):o.a.createElement(Ce,null,r=>o.a.createElement(e,a()({},t,{broadcast:r})))};return t.displayName="FormBroadcast",t};class Ce extends s.Component{constructor(...e){super(...e),c()(this,"broadcast",new h.a)}componentWillUnmount(){this.broadcast.unsubscribe()}render(){const{children:e}=this.props;return o.a.createElement(T.Provider,{value:this.broadcast},Object(h.o)(e)?e(this.broadcast):e)}}c()(Ce,"displayName","FormProvider");const ke=({testingAct:e}={})=>{let[t,r]=Object(s.useState)({}),i=Object(s.useContext)(T),n=!1;Object(s.useMemo)(()=>{i&&(i.subscribe(({type:i,state:a,schema:s})=>{"submit"!==i&&"reset"!==i&&(n?e?e(()=>r({status:i,state:a,schema:s})):r({status:i,state:a,schema:s}):t={status:i,state:a,schema:s})}),n=!0)},[i]);const{status:a,state:o,schema:l}=t;return{status:a,state:o,schema:l,submit:()=>{i&&i.notify({type:"submit"})},reset:()=>{i&&i.notify({type:"reset"})},dispatch:(e,t)=>{i&&i.notify({type:"dispatch",name:e,payload:t})}}},Ne=({children:e,testingAct:t})=>{const r=ke({testingAct:t});return r?Object(h.o)(e)?e(r):e||o.a.createElement(o.a.Fragment,null):o.a.createElement(o.a.Fragment,null)};Ce.__docgenInfo={description:"",methods:[],displayName:"FormProvider"},Ne.__docgenInfo={description:"",methods:[],displayName:"FormConsumer"};const Ve=m((e,t)=>{class r extends s.Component{constructor(e){super(e),c()(this,"getSchema",e=>{const{schema:t}=this.props,r=Object(h.j)(t,e),i=r&&k(r["x-component"]||r.type);return i?i(r):r}),c()(this,"onNativeSubmitHandler",e=>{e.preventDefault&&(e.stopPropagation(),e.preventDefault()),this.form.submit().catch(e=>{console&&console.error&&console.error(e)})}),c()(this,"getValues",()=>this.form.getValue()),c()(this,"submit",()=>this.form.submit()),c()(this,"reset",e=>{this.form.reset(e)}),c()(this,"validate",()=>this.form.validate()),c()(this,"dispatch",(e,t)=>{this.form.triggerEffect(e,t)}),this.initialized=!1,this.form=Ee({initialValues:e.defaultValue||e.initialValues,effects:e.effects,subscribes:e.subscribes,schema:e.schema,editable:e.editable,onSubmit:this.onSubmitHandler(e),onFormChange:this.onFormChangeHandler(e),onFieldChange:this.onFieldChangeHandler(e),onValidateFailed:e.onValidateFailed,onReset:this.onResetHandler(e),onFormWillInit:t=>{e.implementActions({setFormState:t.setFormState,getFormState:t.getFormState,setFieldState:t.setFieldState,getFieldState:t.getFieldState,reset:this.reset,submit:this.submit,validate:this.validate,getSchema:this.getSchema,dispatch:this.dispatch})}}),this.state={},this.initialized=!0}notify(e){const{broadcast:t,schema:r}=this.props;t&&(e.schema=r,t.notify(e))}onFormChangeHandler(e){let t=this.state;return({formState:e})=>{this.unmounted||(t&&t.pristine!==e.pristine&&(t.pristine?this.notify({type:"changed",state:e}):this.notify({type:"reseted",state:e})),t=e,this.initialized?e.dirty&&(clearTimeout(this.timerId),this.timerId=setTimeout(()=>{clearTimeout(this.timerId),this.setState(e)},60)):(this.state=e,this.notify({type:"initialize",state:e})))}}onFieldChangeHandler(e){return({formState:t})=>{if(e.onChange){const r=t.values;Object(h.n)(this.lastFormValues,r)||(e.onChange(r),this.lastFormValues=Object(h.d)(r))}}}onSubmitHandler(e){return({formState:t})=>{if(e.onSubmit){const r=e.onSubmit(Object(h.d)(t.values));r&&r.then&&(this.notify({type:"submitting",state:this.state}),r.then(()=>{this.notify({type:"submitted",state:this.state})},e=>{throw this.notify({type:"submitted",state:this.state}),e}))}}}onResetHandler(e){return({formState:t})=>{e.onReset&&e.onReset(Object(h.d)(t.values))}}shouldComponentUpdate(e){return!Object(h.n)(e,this.props)}componentDidUpdate(e){const{value:t,editable:r,initialValues:i}=this.props;Object(h.m)(t)||Object(h.n)(t,e.value)||this.form.changeValues(t),Object(h.m)(i)||Object(h.n)(i,e.initialValues)||this.form.initialize(i),Object(h.m)(r)||Object(h.n)(r,e.editable)||this.form.changeEditable(r)}componentDidMount(){this.unmounted=!1,this.form.triggerEffect("onFormMount",this.form.publishState()),this.unsubscribe=this.props.broadcast.subscribe(({type:e,name:t,payload:r})=>{"submit"===e?this.submit():"reset"===e?this.reset():"dispatch"===e&&this.form.triggerEffect(t,r)})}componentWillUnmount(){this.unmounted=!0,this.form&&(this.form.destructor(),this.unsubscribe(),delete this.form)}render(){const{onSubmit:e,onChange:r,onReset:i,onValidateFailed:n,initialValues:s,defaultValue:l,actions:c,effects:d,implementActions:u,dispatch:h,editable:p,createEvents:m,subscribes:f,subscription:b,children:g,schema:v,broadcast:y,locale:x,value:j,...O}=this.props;return o.a.createElement($.Provider,{value:{form:this.form,getSchema:this.getSchema,locale:x,broadcast:this.broadcast}},o.a.createElement(t,a()({},O,{onSubmit:this.onNativeSubmitHandler}),g))}}return c()(r,"displayName","StateForm"),c()(r,"defaultProps",{locale:{}}),Object(we.connect)({autoRun:!1})(Se()(r))});var Ae=()=>F("object",class extends o.a.Component{renderProperties(){const{renderField:e,getOrderProperties:t}=this.props,r=t(),i=[];return Object(h.g)(r,({key:t}={})=>{t&&i.push(e(t,!0))}),i}render(){return this.renderProperties()}}),Pe=()=>{var e,t;return(e=>{x=e})((t=e=class extends o.a.Component{render(){return Object(h.o)(this.props.schema["x-render"])?this.props.schema["x-render"](this.props):o.a.createElement(o.a.Fragment,null)}},c()(e,"displayName","FieldXRenderer"),t))},Ie=()=>{var e,t;Object(h.u)("slot"),F("slot",(t=e=class extends o.a.Component{render(){const{schema:e}=this.props;return o.a.createElement(o.a.Fragment,null,e.renderChildren)}},c()(e,"displayName","FormSlot"),t))};const $e=(e,t)=>{var r,i;Object(h.u)(e),F(e,(i=r=class extends o.a.PureComponent{render(){const{schema:e,schemaPath:r,path:i,getOrderProperties:n}=this.props,a=i.slice(0,i.length-1),s=n(e).map(({key:e})=>{const t=a.concat(e),i=t.join("."),n=r.concat(e);return o.a.createElement(q,{key:n,name:i,path:t,schemaPath:n})});return o.a.createElement(t,e["x-props"],s)}},c()(r,"displayName","VirtualBoxWrapper"),i),!0);const n=({children:t,name:r,render:i,...n})=>o.a.createElement(R,{type:"object",name:r,"x-component":e,"x-props":n,"x-render":i},t);return t.defaultProps&&(n.defaultProps=t.defaultProps),n.displayName=u()(e),n},Te=({name:e,children:t})=>o.a.createElement(R,{type:"object",name:e,"x-component":"slot",renderChildren:t});Te.__docgenInfo={description:"",methods:[],displayName:"FormSlot"};const qe="undefined"!=typeof window&&window.navigator&&window.navigator.product&&"ReactNative"===window.navigator.product,Be=e=>t=>(e={valueName:"value",eventName:"onChange",...e},class extends s.PureComponent{render(){const{value:r,name:i,mutators:n,schema:a,editable:s}=this.props;let l={...e.defaultProps,...a["x-props"],[e.valueName]:r,[e.eventName]:(t,...r)=>{n.change(e.getValueFromEvent?e.getValueFromEvent.call({props:a["x-props"]||{}},t,...r):((e,t)=>{if((e=>!!(e&&e.stopPropagation&&e.preventDefault))(e)){if(!t&&e.nativeEvent&&void 0!==e.nativeEvent.text)return e.nativeEvent.text;if(t&&void 0!==e.nativeEvent)return e.nativeEvent.text;const r=e,{target:{type:i,value:n,checked:a,files:s},dataTransfer:o}=r;return"checkbox"===i?!!a:"file"===i?s||o&&o.files:"select-multiple"===i?(e=>{const t=[];if(e)for(let r=0;r<e.length;r++){const i=e[r];i.selected&&t.push(i.value)}return t})(e.target.options):n}return e})(t,qe))}};if(void 0!==s&&(Object(h.o)(s)?s(i)||(l.disabled=!0,l.readOnly=!0):!1===s&&(l.disabled=!0,l.readOnly=!0)),Object(h.o)(a["x-effect"])&&(l=((e,t,r)=>(Object(h.g)(t(r,{...e}),(t,r)=>{const i="onChange"===r?e[r]:void 0;e[r]=((...e)=>{if(Object(h.o)(i)&&i(...e),Object(h.o)(t))return t(...e)})}),e))(l,a["x-effect"],n.dispatch)),Object(h.o)(e.getProps)){let t=e.getProps(l,this.props);void 0!==t&&(l=t)}return Object(h.k)(a.enum)&&!l.dataSource&&(l.dataSource=((e,t)=>Object(h.k)(e)?e.map((e,r)=>"object"==typeof e?{...e}:{...e,label:Object(h.k)(t)&&t[r]||e,value:e}):[])(a.enum,a.enumNames)),void 0!==l.editable&&delete l.editable,o.a.createElement(Object(h.o)(e.getComponent)?e.getComponent(t,l,this.props):t,l)}}),Me=e=>{const{TextButton:t,CircleButton:r,AddIcon:i,RemoveIcon:n,MoveDownIcon:a,MoveUpIcon:s}={TextButton:()=>o.a.createElement("div",null,"You Should Pass The TextButton."),CircleButton:()=>o.a.createElement("div",null,"You Should Pass The CircleButton."),AddIcon:()=>o.a.createElement("div",null,"You Should Pass The AddIcon."),RemoveIcon:()=>o.a.createElement("div",null,"You Should Pass The RemoveIcon."),MoveDownIcon:()=>o.a.createElement("div",null,"You Should Pass The MoveDownIcon."),MoveUpIcon:()=>o.a.createElement("div",null,"You Should Pass The MoveUpIcon."),...e};return class extends o.a.Component{constructor(...e){super(...e),c()(this,"isActive",(e,t)=>{const r=this.getProps("readOnly"),i=this.getDisabled();return Object(h.o)(i)?i(e,t):Object(h.o)(r)?r(e,t):!r&&!i})}getApi(e){const{value:t}=this.props;return{index:e,isActive:this.isActive,dataSource:t,record:t[e],add:this.onAddHandler(),remove:this.onRemoveHandler(e),moveDown:r=>this.onMoveHandler(e,e+1>t.length-1?0:e+1)(r),moveUp:r=>this.onMoveHandler(e,e-1<0?t.length-1:e-1)(r)}}getProps(e){return Object(h.h)(this.props.schema,`x-props${e?"."+e:""}`)}renderWith(e,t,r){const i=this.getProps(Object(h.c)(`render-${e}`));return Object(h.o)(t)&&(r=t,t=0),Object(h.o)(i)?i(this.getApi(t)):r?Object(h.o)(r)?r(this.getApi(t),i):r:void 0}renderAddition(){const{locale:e}=this.props,{value:r}=this.props;return this.isActive("addition",r)&&this.renderWith("addition",({add:r},n)=>o.a.createElement("div",{className:"array-item-addition",onClick:r},o.a.createElement(t,null,o.a.createElement(i,null),n||e.addItem||"添加")))}renderEmpty(e){const{locale:r,value:n}=this.props;return 0===n.length&&this.renderWith("empty",({add:e,isActive:a},s)=>{const l=a("empty",n);return o.a.createElement("div",{className:`array-empty-wrapper ${l?"":"disabled"}`,onClick:l?e:void 0},o.a.createElement("div",{className:"array-empty"},o.a.createElement("img",{style:{backgroundColor:"transparent"},src:"//img.alicdn.com/tfs/TB1cVncKAzoK1RjSZFlXXai4VXa-184-152.svg"}),l&&o.a.createElement(t,null,o.a.createElement(i,null),s||r.addItem||"添加")))})}renderRemove(e,t){return this.isActive(`${e}.remove`,t)&&this.renderWith("remove",e,({remove:e},t)=>o.a.createElement(r,{onClick:e,hasText:!!t},o.a.createElement(n,null),t&&o.a.createElement("span",{className:"op-name"},t)))}renderMoveDown(e,t){const{value:i}=this.props;return i.length>1&&this.isActive(`${e}.moveDown`,t)&&this.renderWith("moveDown",e,({moveDown:e},t)=>o.a.createElement(r,{onClick:e,hasText:!!t},o.a.createElement(a,null),o.a.createElement("span",{className:"op-name"},t)))}renderMoveUp(e,t){const{value:i}=this.props;return i.length>1&&this.isActive(`${e}.moveUp`,i)&&this.renderWith("moveUp",e,({moveUp:e},t)=>o.a.createElement(r,{onClick:e,hasText:!!t},o.a.createElement(s,null),o.a.createElement("span",{className:"op-name"},t)))}renderExtraOperations(e){return this.renderWith("extraOperations",e)}getDisabled(){const{editable:e,name:t}=this.props,r=this.getProps("disabled");if(void 0!==e)if(Object(h.o)(e)){if(!e(t))return!0}else if(!1===e)return!0;return r}onRemoveHandler(e){const{value:t,mutators:r,schema:i,locale:n}=this.props,{minItems:a}=i;return i=>{i.stopPropagation(),a>=0&&t.length-1<a?r.errors(n.array_invalid_minItems,a):r.remove(e)}}onMoveHandler(e,t){const{mutators:r}=this.props;return i=>{i.stopPropagation(),r.move(e,t)}}onAddHandler(){const{value:e,mutators:t,schema:r,locale:i}=this.props,{maxItems:n}=r;return r=>{r.stopPropagation(),n>=0&&e.length+1>n?t.errors(i.array_invalid_maxItems,n):t.push()}}onClearErrorHandler(){return()=>{const{value:e,mutators:t,schema:r}=this.props,{maxItems:i,minItems:n}=r;(i>=0&&e.length<=i||n>=0&&e.length>=n)&&t.errors()}}validate(){const{value:e,mutators:t,schema:r,locale:i}=this.props,{maxItems:n,minItems:a}=r;e.length>n?t.errors(i.array_invalid_maxItems,n):e.length<a?t.errors(i.array_invalid_minItems,a):t.errors()}componentDidUpdate(e){Object(h.n)(e.value,this.props.value)||this.validate()}componentDidMount(){this.validate()}}};r.d(t,"SchemaForm",function(){return Re}),r.d(t,"Field",function(){return ze}),r.d(t,"setValidationLocale",function(){return Xe}),r.d(t,"setValidationLanguage",function(){return De}),r.d(t,"createFormActions",function(){return Ye}),r.d(t,"createAsyncFormActions",function(){return _e}),r.d(t,"createVirtualBox",function(){return $e}),r.d(t,"FormSlot",function(){return Te}),r.d(t,"connect",function(){return Be}),r.d(t,"FormBridge",function(){return Se}),r.d(t,"FormProvider",function(){return Ce}),r.d(t,"useForm",function(){return ke}),r.d(t,"FormConsumer",function(){return Ne}),r.d(t,"createArrayField",function(){return Me}),r.d(t,"registerFormField",function(){return F}),r.d(t,"registerFormFields",function(){return E}),r.d(t,"registerFormWrapper",function(){return S}),r.d(t,"registerFieldMiddleware",function(){return w}),r.d(t,"registerFormFieldPropsTransformer",function(){return C}),r.d(t,"caculateSchemaInitialValues",function(){return h.b}),r.d(t,"FormPath",function(){return je}),O(),S(Ve()),Ae(),Pe(),Ie();const Re=z()(o.a.forwardRef((e,t)=>{const{children:r,className:i,...n}=e;return o.a.createElement(V,a()({className:`rs-uform ${i||""}`},n,{ref:t}),o.a.createElement("div",{className:"rs-uform-content"},o.a.createElement(q,{name:"",path:[],schemaPath:[]})),r)})),ze=R,Xe=D.c,De=D.b,Ye=()=>Object(we.createActions)("getFormState","getFieldState","setFormState","setFieldState","getSchema","reset","submit","validate","dispatch"),_e=()=>Object(we.createAsyncActions)("getFormState","getFieldState","setFormState","setFieldState","getSchema","reset","submit","validate","dispatch");Re.displayName="SchemaForm";t.default=Re},117:function(e,t,r){"use strict";var i=r(118);const n=e=>Object(i.a)(e)?e:e?[e]:[],a=(e,t,r)=>{if(Object(i.a)(e)){if(r){for(let r=e.length-1;r>=0;r--)if(!1===t(e[r],r))return}else for(let r=0,i=e.length;r<i;r++)if(!1===t(e[r],r))return}else for(let r in e)if(Object.hasOwnProperty.call(e,r)&&!1===t(e[r],r))return},s=(e,t,r,i)=>{let n=r;return a(e,(e,r)=>{n=t(n,e,r)},i),n},o=Symbol("newer"),l=Symbol("older");function c(e,t){"number"!=typeof e&&(t=e,e=0),this.size=0,this.limit=e,this.oldest=this.newest=void 0,this._keymap=new Map,t&&(this.assign(t),e<1&&(this.limit=this.size))}function d(e,t){this.key=e,this.value=t,this[o]=void 0,this[l]=void 0}function u(e){this.entry=e}function h(e){this.entry=e}function p(e){this.entry=e}function m(e){return" "===e||"\n"===e||"\t"===e||"\f"===e||"\r"===e}function f(e){return e?Object(i.a)(e)?e.join("."):Object(i.h)(e)?e:"":""}c.prototype._markEntryAsUsed=function(e){e!==this.newest&&(e[o]&&(e===this.oldest&&(this.oldest=e[o]),e[o][l]=e[l]),e[l]&&(e[l][o]=e[o]),e[o]=void 0,e[l]=this.newest,this.newest&&(this.newest[o]=e),this.newest=e)},c.prototype.assign=function(e){let t,r=this.limit||Number.MAX_VALUE;this._keymap.clear();let i=e[Symbol.iterator]();for(let e=i.next();!e.done;e=i.next()){let i=new d(e.value[0],e.value[1]);if(this._keymap.set(i.key,i),t?(t[o]=i,i[l]=t):this.oldest=i,t=i,0==r--)throw new Error("overflow")}this.newest=t,this.size=this._keymap.size},c.prototype.get=function(e){var t=this._keymap.get(e);if(t)return this._markEntryAsUsed(t),t.value},c.prototype.set=function(e,t){var r=this._keymap.get(e);return r?(r.value=t,this._markEntryAsUsed(r),this):(this._keymap.set(e,r=new d(e,t)),this.newest?(this.newest[o]=r,r[l]=this.newest):this.oldest=r,this.newest=r,++this.size,this.size>this.limit&&this.shift(),this)},c.prototype.shift=function(){var e=this.oldest;if(e)return this.oldest[o]?(this.oldest=this.oldest[o],this.oldest[l]=void 0):(this.oldest=void 0,this.newest=void 0),e[o]=e[l]=void 0,this._keymap.delete(e.key),--this.size,[e.key,e.value]},c.prototype.find=function(e){let t=this._keymap.get(e);return t?t.value:void 0},c.prototype.has=function(e){return this._keymap.has(e)},c.prototype.delete=function(e){var t=this._keymap.get(e);if(t)return this._keymap.delete(t.key),t[o]&&t[l]?(t[l][o]=t[o],t[o][l]=t[l]):t[o]?(t[o][l]=void 0,this.oldest=t[o]):t[l]?(t[l][o]=void 0,this.newest=t[l]):this.oldest=this.newest=void 0,this.size--,t.value},c.prototype.clear=function(){this.oldest=this.newest=void 0,this.size=0,this._keymap.clear()},u.prototype[Symbol.iterator]=function(){return this},u.prototype.next=function(){let e=this.entry;return e?(this.entry=e[o],{done:!1,value:[e.key,e.value]}):{done:!0,value:void 0}},h.prototype[Symbol.iterator]=function(){return this},h.prototype.next=function(){let e=this.entry;return e?(this.entry=e[o],{done:!1,value:e.key}):{done:!0,value:void 0}},p.prototype[Symbol.iterator]=function(){return this},p.prototype.next=function(){let e=this.entry;return e?(this.entry=e[o],{done:!1,value:e.value}):{done:!0,value:void 0}},c.prototype.keys=function(){return new h(this.oldest)},c.prototype.values=function(){return new p(this.oldest)},c.prototype.entries=function(){return this},c.prototype[Symbol.iterator]=function(){return new u(this.oldest)},c.prototype.forEach=function(e,t){"object"!=typeof t&&(t=this);let r=this.oldest;for(;r;)e.call(t,r.value,r.key,this),r=r[o]},c.prototype.toJSON=function(){for(var e=new Array(this.size),t=0,r=this.oldest;r;)e[t++]={key:r.key,value:r.value},r=r[o];return e},c.prototype.toString=function(){for(var e="",t=this.oldest;t;)e+=String(t.key)+":"+t.value,(t=t[o])&&(e+=" < ");return e};const b=new c(1e3);function g(e){if(Object(i.a)(e))return e;if(Object(i.h)(e)&&e){const t=b.get(e);if(t)return t;const r=e.split("."),i=[];for(let e=0;e<r.length;e++){let t=r[e];for(;"\\"===t[t.length-1]&&void 0!==r[e+1];)t=t.slice(0,-1)+".",t+=r[++e];i.push(t)}return b.set(e,i),i}return Object(i.d)(e)?[e]:[]}class v{constructor(e,t){this.text=e,this.index=0,this.cbs=t,this.state=this.processNameStart,this.declareNameStart=0,this.declareNameEnd=0,this.nbraceCount=0,this.nbracketCount=0}goto(e){this.state=this.StateMap[e]}parse(){let e="",t="",r=this.text.length;for(;this.index<r;this.index++)e=this.text.charAt(this.index),this.EOF=r-1===this.index,this.state(e,t),t=e}processNameStart(e){"{"===e||"["===e?(this.state=this.processDestructStart,this.index--):m(e)||(this.declareNameStart=this.index,this.state=this.processName)}processName(e,t){m(e)?(this.declareNameEnd=this.index,this.cbs.name(this.getName())):this.EOF&&(this.declareNameEnd=this.index+1,this.cbs.name(this.getName()))}processDestructStart(e){"{"===e?(this.nbraceCount++,this.cbs.destructObjectStart()):"["===e?(this.nbracketCount++,this.cbs.destructArrayStart()):m(e)||(this.state=this.processDestructKey,this.destructKeyStart=this.index,this.index--)}processDestructKey(e,t){"}"===e?(this.nbraceCount--,(this.nbraceCount||this.nbracketCount)&&(this.state=this.processDestructStart),m(t)||(this.destructKey=this.text.substring(this.destructKeyStart,this.index)),this.cbs.destructKey(this.destructKey),this.cbs.destructObjectEnd(),this.nbraceCount||this.nbracketCount||(this.index=this.text.length)):"]"===e?(this.nbracketCount--,(this.nbraceCount||this.nbracketCount)&&(this.state=this.processDestructStart),m(t)||(this.destructKey=this.text.substring(this.destructKeyStart,this.index)),this.cbs.destructKey(this.destructKey),this.cbs.destructArrayEnd(),this.nbraceCount||this.nbracketCount||(this.index=this.text.length)):(m(e)||":"===e||","===e)&&(m(t)||(this.destructKey=this.text.substring(this.destructKeyStart,this.index)),m(e)||(this.state=this.processDestructStart,this.cbs.destructKey(this.destructKey,":"===e)))}getName(){return this.text.substring(this.declareNameStart,this.declareNameEnd)}}const y=(e,t)=>{const r=(e,t,n)=>((e,t,r)=>{let n=Object(i.a)(e)?[]:{};return a(e,(e,r)=>{const a=t(e,r);Object(i.a)(n)?n.push(a):n[r]=a},r),n})(e,(e,a)=>{const s=t.concat(a);return Object(i.a)(e)||Object(i.f)(e)?r(e,s,n):n(s,s.slice(0,s.length-1).concat(e))});return r(e,[],t)},x=e=>{const t=g(e),r=t[t.length-1],n=t.slice(0,t.length-1);return{path:t,lastKey:r,startPath:n,destruct:(e=>{if(!Object(i.h)(e))return e;let t,r,n,a=[],s="",o="";return new v(e,{name(e){n=e},destructKey(e,n){if(e){if(s=e,n)return o=e,void(r=t);Object(i.a)(t)?t.push(e):Object(i.f)(t)&&(t[o&&r===t?o:e]=e),o="",r=t}},destructArrayStart(){t=t?[]:n=[];const e=a[a.length-1];Object(i.f)(e)?e[s]=t:Object(i.a)(e)&&e.push(t),a.push(t)},destructObjectStart(){t=t?{}:n={};const e=a[a.length-1];Object(i.f)(e)?e[s]=t:Object(i.a)(e)&&e.push(t),a.push(t)},destructArrayEnd(){a.pop(),t=a[a.length-1]},destructObjectEnd(){a.pop(),t=a[a.length-1]}}).parse(),n})(r)}},j=e=>{const t=[],r=x(e);return Object(i.h)(r.destruct)?e:r.destruct?(((e,t)=>{const r=(e,t,n)=>{if(Object(i.h)(e))return n(e,e);a(e,(e,a)=>{const s=t.concat(a);Object(i.a)(e)||Object(i.f)(e)?r(e,s,n):n(s,e)})};r(e,[],t)})(r.destruct,(e,i)=>{t.push({path:r.startPath.concat(e),startPath:r.startPath,endPath:e,key:i})}),t):e},O=(e,t)=>{const r=new Map;return(n,s,o)=>{let l=[];return(l=r.get(s))||(l=j(s),r.set(s,l)),Object(i.a)(l)?(l&&l.length&&a(l,({path:r,key:i,startPath:a,endPath:s})=>{e(n,a.concat(i),t(o,s))}),n):e(n,s,o)}};const F=(e=>{const t=new Map;return(r,n,a)=>{let s=null;return(s=t.get(n))||(s=x(n),t.set(n,s)),Object(i.a)(s.destruct)||Object(i.f)(s.destruct)?y(s.destruct,(t,i)=>e(r,s.startPath.concat(i))):e(r,n,a)}})(function(e,t,r){if(!Object(i.e)(e)||!t)return e;if((t=f(t))in e)return e[t];const n=g(t);for(let t=0;t<n.length;t++){if(!Object.prototype.propertyIsEnumerable.call(e,n[t]))return r;if(null==(e=e[n[t]])){if(t!==n.length-1)return r;break}}return e}),E=O(function(e,t,r){if(!Object(i.e)(e)||!t)return;if((t=f(t))in e)return void(e[t]=r);const n=g(t);for(let t=0;t<n.length;t++){const a=n[t];Object(i.e)(e[a])||(e[a]={}),t===n.length-1&&(e[a]=r),e=e[a]}},F),w=O(function(e,t){if(!Object(i.e)(e)||!t)return;if((t=f(t))in e)return void delete e[t];const r=g(t);for(let t=0;t<r.length;t++){const n=r[t];if(t===r.length-1)return void(Object(i.a)(e)?e.splice(n,1):delete e[n]);if(e=e[n],!Object(i.e)(e))return}},F);(e=>{const t=new Map})(function(e,t){if(!Object(i.e)(e)||!t)return!1;if((t=f(t))in e)return!0;const r=g(t);for(let t=0;t<r.length;t++){if(!Object(i.e)(e))return!1;if(!(r[t]in e))return!1;e=e[r[t]]}return!0});var S=i.a,C=Object.keys,k=Object.prototype.hasOwnProperty;const N=function(e,t,r){try{return function e(t,r,n){if(t===r)return!0;if(t&&r&&"object"==typeof t&&"object"==typeof r){var a,s,o,l=S(t),c=S(r);if(l&&c){if((s=t.length)!==r.length)return!1;for(a=s;0!=a--;)if(!e(t[a],r[a],n))return!1;return!0}if(l!=c)return!1;var d=t instanceof Date,u=r instanceof Date;if(d!=u)return!1;if(d&&u)return t.getTime()==r.getTime();var h=t instanceof RegExp,p=r instanceof RegExp;if(h!=p)return!1;if(h&&p)return t.toString()==r.toString();var m=t instanceof URL,f=r instanceof URL;if(m&&f)return m.href==f.href;var b=C(t);if((s=b.length)!==C(r).length)return!1;for(a=s;0!=a--;)if(!k.call(r,b[a]))return!1;for(a=s;0!=a--;)if("_owner"!==(o=b[a])||!t.$$typeof)if(Object(i.c)(n)){if(n({a:t[o],b:r[o]},o)&&!e(t[o],r[o],n))return!1}else if(!e(t[o],r[o],n))return!1;return!0}return t&&r&&"function"==typeof t&&"function"==typeof r?t.toString()===r.toString():t!=t&&r!=r}(e,t,r)}catch(e){if(e.message&&e.message.match(/stack|recursion/i)||-2146828260===e.number)return console.warn("Warning: react-fast-compare does not handle circular references.",e.name,e.message),!1;throw e}};var V=r(116),A=r.n(V);class P{constructor(){A()(this,"entries",[]),A()(this,"buffer",[])}subscribe(e,t){if(!Object(i.c)(e))return()=>{};let r=this.entries.length;return this.entries.push({subscriber:e,subscription:t}),this.flushBuffer(this.entries[r]),()=>{this.entries.splice(r,1)}}unsubscribe(){this.entries.length=0,this.buffer.length=0}flushBuffer({subscriber:e,subscription:t}){a(this.buffer,({payload:r,filter:n})=>{if(Object(i.c)(n)){let i;(i=n(r,t))&&e(i)}else e(r,t)})}notify(e,t){0!==this.length?(a(this.entries,({subscriber:r,subscription:n})=>{if(Object(i.c)(t)){let i;(i=t(e,n))&&r(i)}else r(e,n)}),this.buffer.length=0):this.buffer.push({payload:e,filter:t})}}var I=r(131),$=Object.prototype.hasOwnProperty,T=Object.prototype.toString;function q(e){if(null==e)return!0;if("boolean"==typeof e)return!1;if("number"==typeof e)return!1;if("string"==typeof e)return 0===e.length;if("function"==typeof e)return 0===e.length;if(Array.isArray(e)){if(0===e.length)return!0;for(let t=0;t<e.length;t++)if(void 0!==e[t]&&null!==e[t]&&""!==e[t]&&0!==e[t])return!1;return!0}if(e instanceof Error)return""===e.message;if(e.toString===T)switch(e.toString()){case"[object File]":case"[object Map]":case"[object Set]":return 0===e.size;case"[object Object]":for(var t in e)if($.call(e,t))return!1;return!0}return!1}const B=/^\d+$/,M={},R=(e,t)=>{let r=e,i=0;t=n(t);for(let e=0;e<t.length;e++){var a=t[e];r&&!q(r.properties)?(r=r.properties[a],i++):r&&!q(r.items)&&B.test(a)&&(r=r.items,i++)}return i===t.length?r:void 0},z=(e,t)=>e&&e.type===t,X=e=>!!M[e],D=e=>{M[e]=!0},Y=e=>X(e.type)||X(e["x-component"]),_=(e,t,r=[],i=[])=>{e&&(Y(e)&&(r=r.slice(0,r.length-1)),t(e,{path:r,schemaPath:i}),z(e,"object")||e.properties?a(e.properties,(e,n)=>{_(e,t,r.concat(n),i.concat(n))}):(z(e,"array")||e.items)&&e.items&&t(e.items,n=>{_(e.items,t,r.concat(n),i.concat(n))},r))},H=(e,t,r)=>(t=t||e.default||{},_(e,(e,s,o)=>{const l=e.default;if(Object(i.c)(s)&&o)a(n(F(t,o)),function(e,t){s(t)});else if(s){const n=Y(e),a=n?s.schemaPath.join("."):s.path.join("."),o=n?s.schemaPath:s.path,c=s.schemaPath,d=F(t,a);let u=q(d)?l:d;if(q(u)||E(t,a,u),Object(i.c)(r)){r({name:a,path:o,schemaPath:c},e,u)}}}),t),U=r(149),L=e=>String(e||"").toLowerCase(),W=()=>{let e,t;return{promise:new Promise((r,i)=>{e=r,t=i}),resolve:e,reject:t}};r.d(t,"i",function(){return g}),r.d(t,"h",function(){return F}),r.d(t,"w",function(){return E}),r.d(t,"f",function(){return w}),r.d(t,"x",function(){return n}),r.d(t,"g",function(){return a}),r.d(t,"t",function(){return s}),r.d(t,"n",function(){return N}),r.d(t,"a",function(){return P}),r.d(t,"o",function(){return i.c}),r.d(t,"k",function(){return i.a}),r.d(t,"r",function(){return i.h}),r.d(t,"l",function(){return i.b}),r.d(t,"p",function(){return i.e}),r.d(t,"q",function(){return i.g}),r.d(t,"d",function(){return I.a}),r.d(t,"j",function(){return R}),r.d(t,"v",function(){return z}),r.d(t,"u",function(){return D}),r.d(t,"b",function(){return H}),r.d(t,"m",function(){return q}),r.d(t,"c",function(){return U}),r.d(t,"s",function(){return L}),r.d(t,"e",function(){return W})},118:function(e,t,r){"use strict";r.d(t,"c",function(){return n}),r.d(t,"a",function(){return a}),r.d(t,"f",function(){return s}),r.d(t,"h",function(){return o}),r.d(t,"b",function(){return l}),r.d(t,"d",function(){return c}),r.d(t,"e",function(){return d}),r.d(t,"g",function(){return u});const i=e=>t=>null!=t&&Object.prototype.toString.call(t)===`[object ${e}]`,n=i("Function"),a=Array.isArray||i("Array"),s=i("Object"),o=i("String"),l=i("Boolean"),c=i("Number"),d=e=>"object"==typeof e,u=i("RegExp")},119:function(e,t,r){"use strict";r.d(t,"c",function(){return a});var i=r(117);r.d(t,"a",function(){return i.d}),r.d(t,"b",function(){return i.g}),r.d(t,"d",function(){return i.h}),r.d(t,"e",function(){return i.k}),r.d(t,"f",function(){return i.m}),r.d(t,"g",function(){return i.n}),r.d(t,"h",function(){return i.o}),r.d(t,"i",function(){return i.p}),r.d(t,"j",function(){return i.q}),r.d(t,"k",function(){return i.r}),r.d(t,"l",function(){return i.t}),r.d(t,"m",function(){return i.x});const n=/%[sdj%]/g;function a(...e){let t=1;const r=e[0],i=e.length;if("function"==typeof r)return r.apply(null,e.slice(1));if("string"==typeof r){return String(r).replace(n,r=>{if("%%"===r)return"%";if(t>=i)return r;switch(r){case"%s":return String(e[t++]);case"%d":return Number(e[t++]);case"%j":try{return JSON.stringify(e[t++])}catch(e){return"[Circular]"}default:return r}})}return r}},120:function(e,t,r){"use strict";(function(e){r.d(t,"c",function(){return o}),r.d(t,"b",function(){return l}),r.d(t,"a",function(){return c});var i=r(119),n=r(140);const a=e||window,s={messages:{},lang:(()=>a.navigator&&(a.navigator.browserlanguage||a.navigator.language)||"en")()},o=e=>{Object.assign(s.messages,e)},l=e=>{s.lang=e},c=e=>Object(i.d)(s.messages,`${(e=>{let t=s.lang;return Object(i.b)(s.messages,(r,i)=>{if(i.indexOf(e)>-1||String(e).indexOf(i)>-1)return t=i,!1}),t})(s.lang)}.${e}`)||"field is not valid,but not found error message.";o(n.a)}).call(this,r(36))},121:function(e,t,r){"use strict";(function(e){r.d(t,"u",function(){return l}),r.d(t,"d",function(){return c}),r.d(t,"w",function(){return d}),r.d(t,"n",function(){return u}),r.d(t,"k",function(){return h}),r.d(t,"t",function(){return p}),r.d(t,"s",function(){return m}),r.d(t,"b",function(){return f});var i=r(116),n=r.n(i),a=r(150),s=r(117);r.d(t,"a",function(){return s.a}),r.d(t,"c",function(){return s.b}),r.d(t,"e",function(){return s.d}),r.d(t,"f",function(){return s.e}),r.d(t,"g",function(){return s.f}),r.d(t,"h",function(){return s.g}),r.d(t,"i",function(){return s.h}),r.d(t,"j",function(){return s.j}),r.d(t,"l",function(){return s.k}),r.d(t,"m",function(){return s.l}),r.d(t,"o",function(){return s.m}),r.d(t,"p",function(){return s.n}),r.d(t,"q",function(){return s.o}),r.d(t,"r",function(){return s.r}),r.d(t,"v",function(){return s.t}),r.d(t,"x",function(){return s.w}),r.d(t,"y",function(){return s.x});const o=e||window,l=o.requestAnimationFrame&&(a.scheduleCallback||a.unstable_scheduleCallback||o.requestAnimationFrame)||o.setTimeout,c=o.requestAnimationFrame&&(a.cancelCallback||a.unstable_cancelCallback||o.cancelAnimationFrame)||o.clearTimeout,d=e=>Object(s.k)(e)?e.reduce((e,t)=>e.concat(Object(s.i)(t)),[]):Object(s.r)(e)?d(Object(s.i)(e)):void 0,u=(e,t)=>{if(e&&t&&e.path&&t.path){for(let r=0;r<t.path.length;r++)if(e.path[r]!==t.path[r])return!1;return t.path.length<e.path.length}return!1},h=e=>Object(s.x)(e).some(e=>e&&e.required),p=e=>{const{values:t,valid:r,invalid:i,errors:n,pristine:a,dirty:s}=e;return{values:t,valid:r,invalid:i,errors:n,pristine:a,dirty:s}},m=e=>{const{value:t,valid:r,invalid:i,errors:n,visible:a,editable:o,initialValue:l,name:c,path:d,props:u,effectErrors:h,loading:p,pristine:m,required:f,rules:b}=e;return{value:Object(s.d)(t),valid:r,invalid:i,editable:o,visible:a,loading:p,errors:n.concat(h),pristine:m,initialValue:l,name:c,path:d,props:u,required:f,rules:b}};class f{constructor(){n()(this,"data",[]),n()(this,"indexes",{})}push(e,t,r){if(this.indexes[e]){let r=this.data[this.indexes[e]];-1===r.values.indexOf(t)&&r.values.push(t)}else{let i=this.data.length;this.data.push({...r,key:e,values:[t]}),this.indexes[e]=i}}forEach(e){for(let t=0;t<this.data.length;t++)Object(s.o)(e)&&e(this.data[t],this.data[t].key)}remove(e,t){this.data=this.data.reduce((t,r,i)=>r.key===e?(delete this.indexes[e],t):(this.indexes[e]=t.length,t.concat(r)),[])}}}).call(this,r(36))},129:function(e,t,r){"use strict";r.r(t);var i=r(116),n=r.n(i),a=r(9),s=r.n(a),o=r(0),l=r.n(o),c=r(2),d=r.n(c),u=r(115),h=r(1),p=r.n(h),m=r(154),f=r.n(m);const b=p()(e=>{const[t,r]=Object(o.useState)(!0);return l.a.createElement(f.a,s()({},e,{style:{overlay:{zIndex:99999}},isOpen:t,onRequestClose:()=>{r(!1)}}),l.a.createElement("div",{className:"close-btn",onClick:()=>{r(!1)}},l.a.createElement("img",{src:"//img.alicdn.com/tfs/TB1KikcO5rpK1RjSZFhXXXSdXXa-200-200.svg"})),l.a.createElement("div",{className:"dialog-content",style:{overflow:"auto"}},e.children))})`
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
`,g=e=>{if(e)return{type:e.type,"x-props":e["x-props"],"x-component":e["x-component"],"x-index":e["x-index"],"x-rules":e["x-rules"],maxItems:e.maxItems,minItems:e.minItems,default:e.default,enum:e.enum,title:e.title,required:e.required,properties:Object.keys(e.properties||{}).reduce((t,r)=>(t[r]=g(e.properties[r]),t),{}),items:g(e.items)}};t.default=class extends l.a.Component{constructor(...e){super(...e),n()(this,"actions",Object(u.createFormActions)()),n()(this,"onClickHandler",async e=>{e.preventDefault();const t=await this.actions.getSchema("");((e={})=>{const t=document.createElement("div");("string"==typeof e||l.a.isValidElement(e))&&(e={content:e}),document.body.appendChild(t),d.a.render(l.a.createElement(b,s()({},e,{appElement:t,afterClose:()=>{d.a.unmountComponentAtNode(t),t.parentNode.removeChild(t)}}),e.content),t)})(l.a.createElement("pre",null,l.a.createElement("code",null,(e=>JSON.stringify(g(e),null,2))(t))))})}render(){const{children:e,className:t}=this.props;return e&&e.props&&e.props.actions&&(this.actions=e.props.actions),l.a.createElement("div",{className:t},l.a.cloneElement(e,{actions:this.actions}),l.a.createElement("a",{href:"",style:{fontSize:12,textDecoration:"none",margin:"20px 0",display:"block",textAlign:"center"},onClick:this.onClickHandler},"Print JSON Schema"))}}},131:function(e,t,r){"use strict";(function(e){r.d(t,"a",function(){return s});var i=r(118);const n=e||window,a=[["Map",e=>new Map(e)],["WeakMap",e=>new WeakMap(e)],["WeakSet",e=>new WeakSet(e)],["Set",e=>new Set(e)],"FileList","File","URL","RegExp",["Promise",e=>new Promise((t,r)=>e.then(t,r))]],s=(e,t)=>{let r;if(Array.isArray(e))return e.map(e=>s(e,t));if(r=(e=>{for(let t=0;t<a.length;t++){let r=a[t];if(Array.isArray(r)&&r[0]){if(n[r[0]]&&e instanceof n[r[0]])return r[1]?r[1]:r[0]}else if(n[r]&&e instanceof n[r])return r}})(e))return Object(i.c)(r)?r(e):e;if("object"==typeof e&&e){if("$$typeof"in e&&"_owner"in e)return e;let r={};for(let n in e)Object.hasOwnProperty.call(e,n)&&(Object(i.c)(t)?t(e[n],n)?r[n]=s(e[n],t):r[n]=e[n]:r[n]=s(e[n],t));return r}return e}}).call(this,r(36))},136:function(e,t,r){var i={"./bash":122,"./bash.js":122,"./css":123,"./css.js":123,"./htmlbars":124,"./htmlbars.js":124,"./javascript":125,"./javascript.js":125,"./scss":126,"./scss.js":126,"./typescript":127,"./typescript.js":127};function n(e){var t=a(e);return r(t)}function a(e){if(!r.o(i,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return i[e]}n.keys=function(){return Object.keys(i)},n.resolve=a,e.exports=n,n.id=136},140:function(e,t,r){"use strict";t.a={en:{pattern:"%s value %s does not match pattern %s",required:"%s is required",number:"%s is not a number",integer:"%s is not an integer number",url:"%s is a invalid url",email:"%s is not a email format",ipv6:"%s is not a ipv6 format",ipv4:"%s is not a ipv4 format",idcard:"%s is not an idcard format",taodomain:"%s is not a taobao domain format",qq:"%s is not a qq number format",phone:"%s is not a phone number format",money:"%s is not a currency format",zh:"%s is not a chinese string",date:"%s is not a valid date format",zip:"%s is not a zip format"},zh:{pattern:"该字段不是一个合法的字段",required:"该字段是必填字段",number:"该字段不是合法的数字",integer:"该字段不是合法的整型数字",url:"该字段不是合法的url",email:"该字段不是合法的邮箱格式",ipv6:"该字段不是合法的ipv6格式",ipv4:"该字段不是合法的ipv4格式",idcard:"该字段不是合法的身份证格式",taodomain:"该字段不符合淘系域名规则",qq:"该字段不符合QQ号格式",phone:"该字段不是有效的手机号",money:"该字段不是有效货币格式",zh:"该字段不是合法的中文字符串",date:"该字段不是合法的日期格式",zip:"该字段不是合法的邮编格式"}}},144:function(e,t,r){"use strict";r.r(t);var i=r(9),n=r.n(i),a=r(116),s=r.n(a),o=r(0),l=r.n(o),c=r(115),d=r(141),u=r.n(d),h=r(68),p={addItem:"添加",array_invalid_minItems:"条目数不允许小于%s条",array_invalid_maxItems:"条目数不允许大于%s条",operations:"操作"},m=r(1),f=r.n(m),b=r(2),g=r.n(b),v=r(165),y=r.n(v),x=r(117);const j=f()(class extends l.a.Component{render(){const{dataSource:e=[],...t}=this.props,r=e.map(e=>{const{label:t,value:r,...i}=e;return l.a.createElement(h.Select.Option,n()({key:r},i,{label:t,value:r}),t)});return l.a.createElement(h.Select,n()({className:this.props.className},t),r)}})`
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
`,F=e=>(class extends l.a.Component{componentDidMount(){this.wrapper&&(this.wrapperDOM=g.a.findDOMNode(this.wrapper),this.mapState())}componentDidUpdate(){this.mapState()}mapState(){const{state:e}=this.props,t=["xxs","xs","small","medium","large","xl","xxl","xxxl"];if(this.classList=this.classList||[],this.wrapperDOM){const r=this.wrapperDOM.querySelector(".anticon");if(!r||!r.classList)return;"loading"===e?(r.classList.forEach(e=>{e.indexOf("anticon-")>-1&&"anticon-spin"!==e&&t.every(t=>`anticon-${t}`!==e)&&(r.classList.remove(e),this.classList.push(e))}),r.classList.contains("anticon-spin")||r.classList.add("anticon-spin")):(r.classList.remove("anticon-spin"),this.classList.forEach(e=>{r.classList.add(e)}),this.classList=[])}}render(){return l.a.createElement(e,n()({ref:e=>{e&&(this.wrapper=e)}},this.props))}}),E=F(j),w=e=>({dataSource:t,...r})=>t||r.showSearch?l.a.createElement(E,{dataSource:t,...r}):l.a.createElement(e,r),S=(e,{loading:t,size:r})=>{t&&(e.state=e.state||"loading"),r&&(e.size=r)},C=(e,t,{editable:r,name:i})=>{if(void 0!==r)if(Object(x.o)(r)){if(!r(i))return O}else if(!1===r)return O;return e},k=(e,t)=>({dataSource:r,...i})=>l.a.createElement(e,{[t]:r,...i}),N=e=>{e&&(e.scrollIntoView?e.scrollIntoView({behavior:"smooth",inline:"start",block:"start"}):(new y.a).move(e.getBoundingClientRect().top))};var V,A;const{Provider:P,Consumer:I}=l.a.createContext(),$=e=>"object"==typeof e?e:{span:e},T=(e,t)=>{if(e&&(!e||e.matches))return e.matches(t)?e:T(e.parentNode||e.parentElement,t)},q=f()((A=V=class extends l.a.Component{getItemLabel(){const{id:e,required:t,label:r,labelCol:i,wrapperCol:a,prefix:s,extra:o,labelAlign:c,labelTextAlign:d,autoAddColon:p,isTableColItem:m}=this.props;if(!r||m)return null;const f=l.a.createElement("label",{htmlFor:e,required:t,key:"label"},r," "===r?"":p?"：":""),b=u()({[`${s}form-item-label`]:!0,[`${s}${d}`]:!!d});return(a||i)&&"top"!==c?l.a.createElement(h.Col,n()({},$(i),{className:b}),f,(o&&o.length>20||l.a.isValidElement(o))&&this.renderHelper()):l.a.createElement("div",{className:b},f,(o&&o.length>20||l.a.isValidElement(o))&&this.renderHelper())}getItemWrapper(){const{labelCol:e,wrapperCol:t,children:r,extra:i,label:a,labelAlign:s,help:o,prefix:c,noMinHeight:d,size:u,isTableColItem:p}=this.props,m=l.a.createElement("div",{className:`${c}form-item-msg ${d?"":`${c}form-item-space`}`},o&&l.a.createElement("div",{className:`${c}form-item-help`},o),!o&&i&&i.length<=20&&l.a.createElement("div",{className:`${c}form-item-extra`},i));return(t||e)&&"top"!==s&&!p&&a?l.a.createElement(h.Col,n()({},$(t),{className:`${c}form-item-control`,key:"item"}),l.a.cloneElement(r,{size:u}),m):l.a.createElement("div",{className:`${c}form-item-control`},l.a.cloneElement(r,{size:u}),m)}renderHelper(){return l.a.createElement(h.Popover,{closable:!1,placement:"top",content:this.props.extra},l.a.createElement(h.Icon,{type:"question-circle",size:"small"}))}render(){const{className:e,labelAlign:t,labelTextAlign:r,style:i,prefix:a,wrapperCol:s,labelCol:o,size:c,help:d,extra:p,noMinHeight:m,isTableColItem:f,validateState:b,autoAddColon:g,required:v,type:y,schema:x,...j}=this.props,O=u()({[`${a}form-item`]:!0,[`${a}${t}`]:t,[`has-${b}`]:!!b,[`${a}${c}`]:!!c,[`${e}`]:!!e,[`field-${y}`]:!!y}),F=(s||o)&&"top"!==t?h.Row:"div",E="inset"===t?null:this.getItemLabel();return l.a.createElement(F,n()({},j,{gutter:0,className:O,style:i}),E,this.getItemWrapper())}},s()(V,"defaultProps",{prefix:"ant-"}),A))`
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
  `;class t extends l.a.Component{constructor(...e){super(...e),s()(this,"FormRef",l.a.createRef())}validateFailedHandler(e){return(...t)=>{Object(x.o)(e)&&e(...t);const r=this.FormRef.current;if(r){const e=r.querySelectorAll(".ant-form-item-help");if(e&&e.length){const t=T(e[0],".ant-form-item");t&&N(t)}}}}render(){const{className:t,inline:r,size:i,labelAlign:a,labelTextAlign:s,autoAddColon:o,children:c,component:d,labelCol:h,wrapperCol:p,style:m,prefix:f,...b}=this.props,g=u()({[`${f}form`]:!0,[`${f}inline`]:r,[`${f}${i}`]:i,[`${f}form-${a}`]:!!a,[t]:!!t});return l.a.createElement(P,{value:{labelAlign:a,labelTextAlign:s,labelCol:h,wrapperCol:p,inline:r,size:i,autoAddColon:o,FormRef:this.FormRef}},l.a.createElement(e,n()({},b,{formRef:this.FormRef,onValidateFailed:this.validateFailedHandler(b.onValidateFailed),className:g,style:m}),c))}}return s()(t,"defaultProps",{component:"form",prefix:"ant-",size:"default",labelAlign:"left",locale:p,autoAddColon:!0}),s()(t,"displayName","SchemaForm"),t.LOCALE=p,t});const M=(e,t)=>{const r=t(e);return r&&"array"===r.type&&"table"===r["x-component"]};Object(c.registerFieldMiddleware)(e=>t=>{const{name:r,errors:i,editable:n,path:a,required:s,schema:o,getSchema:c}=t;return 0===a.length?l.a.createElement(e,t):l.a.createElement(I,{},({labelAlign:d,labelTextAlign:u,labelCol:h,wrapperCol:p,size:m,autoAddColon:f})=>l.a.createElement(q,{labelAlign:d,labelTextAlign:u,labelCol:h,wrapperCol:p,autoAddColon:f,size:m,...o["x-item-props"],label:o.title,noMinHeight:"object"===o.type&&!o["x-component"],isTableColItem:M(a.slice(0,a.length-2),c),type:o["x-component"]||o.type,id:r,validateState:B(i).length?"error":void 0,required:!1!==n&&s,extra:o.description,help:B(i).join(" , ")||o["x-item-props"]&&o["x-item-props"].help},l.a.createElement(e,t)))}),Object(c.registerFormField)("string",Object(c.connect)({getProps:S,getComponent:C})(w(h.Input))),Object(c.registerFormField)("number",Object(c.connect)({getProps:S,getComponent:C})(w(h.InputNumber))),Object(c.registerFormField)("boolean",Object(c.connect)({valueName:"checked",getProps:S})(w(h.Switch)));var R=r(69),z=r.n(R);const{RangePicker:X,MonthPicker:D}=h.DatePicker;const Y=F(h.DatePicker),_=F(X),H=F(D),U=F(class extends l.a.Component{render(){return l.a.createElement(h.DatePicker,n()({},this.props,{mode:"year"}))}}),L=(e,t="YYYY-MM-DD HH:mm:ss")=>e&&e.format?e.format(t):e;var W,K;Object(c.registerFormField)("date",Object(c.connect)({getValueFromEvent(e,t){const r=this.props||{};return L(t,r.showTime?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD")},getProps:e=>{const{value:t,showTime:r=!1,disabled:i=!1,...n}=e;try{!i&&t&&(e.value=z()(t,r?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD"))}catch(e){throw new Error(e)}S(e,n)},getComponent:C})(Y)),Object(c.registerFormField)("daterange",Object(c.connect)({getValueFromEvent(e,[t,r]){const i=(this.props||{}).showTime?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD";return[L(t,i),L(r,i)]},getProps:e=>{const{value:t=[],showTime:r=!1,disabled:i=!1,...n}=e;try{!i&&t.length&&(e.value=t.map(e=>e&&z()(e,r?"YYYY-MM-DD HH:mm:ss":"YYYY-MM-DD")||""))}catch(e){throw new Error(e)}S(e,n)},getComponent:C})(_)),Object(c.registerFormField)("month",Object(c.connect)({getValueFromEvent:(e,t)=>L(t),getProps:e=>{const{value:t,showTime:r=!1,disabled:i=!1,...n}=e;try{!i&&t&&(e.value=z()(t,r?"YYYY-MM-DD HH:mm:ss":"YYYY-MM"))}catch(e){throw new Error(e)}S(e,n)},getComponent:C})(H)),Object(c.registerFormField)("year",Object(c.connect)({getValueFromEvent:(e,t)=>(console.log(e,t),L(t)),getProps:e=>{const{value:t,showTime:r=!1,disabled:i=!1,...n}=e;try{!i&&t&&(e.value=z()(t,r?"YYYY-MM-DD HH:mm:ss":"YYYY-MM"))}catch(e){throw new Error(e)}S(e,n)},getComponent:C})(U)),Object(c.registerFormField)("time",Object(c.connect)({getValueFromEvent:(e,t)=>t,getProps:e=>{const{value:t,disabled:r=!1,...i}=e;try{!r&&t&&(e.value=z()(t,"HH:mm:ss"))}catch(e){throw new Error(e)}S(e,i)},getComponent:C})(h.TimePicker)),Object(c.registerFormField)("range",Object(c.connect)({defaultProps:{style:{width:320}},getProps:S})(class extends l.a.Component{render(){const{onChange:e,value:t,min:r,max:i,marks:n}=this.props;let a={};return Array.isArray(n)?n.forEach(e=>{a[e]=e}):a=n,l.a.createElement(h.Slider,{onChange:e,value:t,min:r,max:i,marks:a})}}));const{Dragger:G}=h.Upload,Q=[{ext:/\.docx?/i,icon:"//img.alicdn.com/tfs/TB1n8jfr1uSBuNjy1XcXXcYjFXa-200-200.png"},{ext:/\.pptx?/i,icon:"//img.alicdn.com/tfs/TB1ItgWr_tYBeNjy1XdXXXXyVXa-200-200.png"},{ext:/\.jpe?g/i,icon:"//img.alicdn.com/tfs/TB1wrT5r9BYBeNjy0FeXXbnmFXa-200-200.png"},{ext:/pdf/i,icon:"//img.alicdn.com/tfs/TB1GwD8r9BYBeNjy0FeXXbnmFXa-200-200.png"},{ext:/\.png/i,icon:"//img.alicdn.com/tfs/TB1BHT5r9BYBeNjy0FeXXbnmFXa-200-200.png"},{ext:/\.eps/i,icon:"//img.alicdn.com/tfs/TB1G_iGrVOWBuNjy0FiXXXFxVXa-200-200.png"},{ext:/\.ai/i,icon:"//img.alicdn.com/tfs/TB1B2cVr_tYBeNjy1XdXXXXyVXa-200-200.png"},{ext:/\.gif/i,icon:"//img.alicdn.com/tfs/TB1DTiGrVOWBuNjy0FiXXXFxVXa-200-200.png"},{ext:/\.svg/i,icon:"//img.alicdn.com/tfs/TB1uUm9rY9YBuNjy0FgXXcxcXXa-200-200.png"},{ext:/\.xlsx?/i,icon:"//img.alicdn.com/tfs/TB1any1r1OSBuNjy0FdXXbDnVXa-200-200.png"},{ext:/\.psd?/i,icon:"//img.alicdn.com/tfs/TB1_nu1r1OSBuNjy0FdXXbDnVXa-200-200.png"},{ext:/\.(wav|aif|aiff|au|mp1|mp2|mp3|ra|rm|ram|mid|rmi)/i,icon:"//img.alicdn.com/tfs/TB1jPvwr49YBuNjy0FfXXXIsVXa-200-200.png"},{ext:/\.(avi|wmv|mpg|mpeg|vob|dat|3gp|mp4|mkv|rm|rmvb|mov|flv)/i,icon:"//img.alicdn.com/tfs/TB1FrT5r9BYBeNjy0FeXXbnmFXa-200-200.png"},{ext:/\.(zip|rar|arj|z|gz|iso|jar|ace|tar|uue|dmg|pkg|lzh|cab)/i,icon:"//img.alicdn.com/tfs/TB10jmfr29TBuNjy0FcXXbeiFXa-200-200.png"},{ext:/\..+/i,icon:"//img.alicdn.com/tfs/TB10.R4r3mTBuNjy1XbXXaMrVXa-200-200.png"}],J=f()(e=>l.a.createElement("div",null,l.a.createElement(h.Icon,{type:e.loading?"loading":"plus"}),l.a.createElement("div",{className:"ant-upload-text"},"上传")))``,Z=(e,t)=>t&&Object(x.k)(t.include)?t.include.some(t=>e.test(t)):!t||!Object(x.k)(t.exclude)||!t.exclude.some(t=>e.test(t)),ee=(e,t)=>{for(let r=0;r<Q.length;r++)if(Q[r].ext.test(e)&&Z(Q[r].ext,t))return Q[r].icon||e;return e},te=e=>{let t=Object(x.k)(e)?[...e]:"object"==typeof e?{...e}:e;return Object(x.k)(t)&&(t=t.map(e=>({...e,uid:e.uid||Math.random().toFixed(16).slice(2,10)}))),t};Object(c.registerFormField)("upload",Object(c.connect)({getProps:S})((K=W=class extends l.a.Component{constructor(e){super(e),s()(this,"onRemoveHandler",e=>{const{value:t}=this.state,r=[];t.forEach(t=>{t.uid!==e.uid&&r.push(t)}),this.props.onChange(r)}),s()(this,"onChangeHandler",({fileList:e,file:t})=>{const{onChange:r}=this.props;(e=Object(x.x)(e)).every(e=>"done"===e.status||e.imgURL||e.downloadURL)&&e.length?(e=(e=>e&&e.length?e.map(e=>({uid:e.uid,status:e.status,name:e.name,url:e.downloadURL||e.imgURL||e.url,...e.response,thumbUrl:ee(e.imgURL||e.downloadURL||e.url,{exclude:[".png",".jpg",".jpeg",".gif"]})})):[])(e),this.setState({value:e},()=>{r(e.length>0?e:void 0)})):this.setState({value:e})}),this.state={value:te(Object(x.x)(e.value))}}componentDidUpdate(e){this.props.value&&!Object(x.n)(this.props.value,e.value)&&this.setState({value:te(this.props.value)})}render(){const{listType:e,locale:t,onChange:r,value:i,...a}=this.props;return e.indexOf("card")>-1?l.a.createElement(h.Upload,n()({},a,{fileList:this.state.value,onChange:this.onChangeHandler,onRemove:this.onRemoveHandler,listType:"picture-card"}),l.a.createElement(J,null)):e.indexOf("dragger")>-1?l.a.createElement(G,n()({},a,{fileList:this.state.value,onChange:this.onChangeHandler,onRemove:this.onRemoveHandler,listType:e.indexOf("image")>-1?"image":"text"}),l.a.createElement("p",{className:"ant-upload-drag-icon"},l.a.createElement(h.Icon,{type:"inbox"})),l.a.createElement("p",{className:"ant-upload-text"},"拖拽上传")):l.a.createElement(h.Upload,n()({},a,{fileList:this.state.value,onChange:this.onChangeHandler,onRemove:this.onRemoveHandler,listType:e}),l.a.createElement(h.Button,{style:{margin:"0 0 10px"}},l.a.createElement(h.Icon,{type:"upload"}),t&&t.uploadText||"上传文件"))}},s()(W,"defaultProps",{action:"https://www.easy-mock.com/mock/5b713974309d0d7d107a74a3/alifd/upload",listType:"text",multiple:!0,className:"antd-uploader"}),K)));const{Group:re}=h.Checkbox;Object(c.registerFormField)("checkbox",Object(c.connect)({getProps:S,getComponent:C})(k(re,"options")));const{Group:ie}=h.Radio;Object(c.registerFormField)("radio",Object(c.connect)({getProps:S,getComponent:C})(k(ie,"options"))),Object(c.registerFormField)("rating",Object(c.connect)({getProps:S})(h.Rate)),Object(c.registerFormField)("transfer",Object(c.connect)({getProps:S})(h.Transfer));const ne=f.a.div.attrs({className:"cricle-btn"})`
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
`,se=Object(c.createArrayField)({CircleButton:ne,TextButton:ae,AddIcon:()=>l.a.createElement(h.Icon,{type:"plus"}),RemoveIcon:()=>l.a.createElement(h.Icon,{type:"delete"}),MoveDownIcon:()=>l.a.createElement(h.Icon,{type:"down"}),MoveUpIcon:()=>l.a.createElement(h.Icon,{type:"up"})});Object(c.registerFormField)("array",f()(class extends se{render(){const{className:e,name:t,schema:r,value:i,renderField:n}=this.props,a=r["x-props"]&&r["x-props"].style||{};return l.a.createElement("div",{className:e,style:a,onClick:this.onClearErrorHandler()},i.map((e,r)=>l.a.createElement("div",{className:"array-item",key:`${t}.${r}`},l.a.createElement("div",{className:"array-index"},l.a.createElement("span",null,r+1)),l.a.createElement("div",{className:"array-item-wrapper"},n(r)),l.a.createElement("div",{className:"array-item-operator"},this.renderRemove(r,e),this.renderMoveDown(r,e),this.renderMoveUp(r,e),this.renderExtraOperations(r)))),this.renderEmpty(),i.length>0&&this.renderAddition())}})`
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
  `);const oe=f()(class extends o.Component{renderCell({record:e,col:t,rowIndex:r,colIndex:i}){return l.a.createElement("div",{className:"ant-table-cell-wrapper"},Object(x.o)(t.cell)?t.cell(e?e[t.dataIndex]:void 0,r,e):e?e[t.dataIndex]:void 0)}renderTable(e,t){return l.a.createElement("div",{className:"ant-table-body"},l.a.createElement("table",null,l.a.createElement("colgroup",null,e.map((e,t)=>l.a.createElement("col",{key:t,style:{width:e.width}}))),l.a.createElement("thead",null,l.a.createElement("tr",null,e.map((e,t)=>l.a.createElement("th",{key:t,className:"ant-table-header-node"},l.a.createElement("div",{className:"ant-table-cell-wrapper"},e.title))))),l.a.createElement("tbody",null,t.map((t,r)=>l.a.createElement("tr",{key:r,className:"ant-table-row"},e.map((e,i)=>l.a.createElement("td",{key:i,className:"ant-table-cell"},this.renderCell({record:t,col:e,rowIndex:r,colIndex:i}))))),this.renderPlacehodler(t,e))))}renderPlacehodler(e,t){if(0===e.length)return l.a.createElement("tr",{className:"ant-table-row"},l.a.createElement("td",{className:"ant-table-cell",colSpan:t.length},l.a.createElement("div",{className:"ant-table-empty",style:{padding:10}},l.a.createElement("img",{src:"//img.alicdn.com/tfs/TB1cVncKAzoK1RjSZFlXXai4VXa-184-152.svg",style:{height:60}}))))}getColumns(e){const t=[];return l.a.Children.forEach(e,e=>{l.a.isValidElement(e)&&(e.type!==le&&"@schema-table-column"!==e.type.displayName||t.push(e.props))}),t}render(){const e=this.getColumns(this.props.children),t=Object(x.x)(this.props.dataSource);return l.a.createElement("div",{className:this.props.className},l.a.createElement("div",{className:"ant-table zebra"},l.a.createElement("div",{className:"ant-table-inner"},this.renderTable(e,t))))}})`
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
`;class le extends o.Component{render(){return this.props.children}}var ce;s()(le,"displayName","@schema-table-column"),Object(c.registerFormField)("table",f()(class extends se{createFilter(e,t){const{schema:r}=this.props,i=r["x-props"]&&r["x-props"].columnFilter;return(r,n)=>Object(x.o)(i)?i(e,t)?Object(x.o)(r)?r():r:Object(x.o)(n)?n():n:r()}render(){const{value:e,schema:t,locale:r,className:i,renderField:a,getOrderProperties:s}=this.props,o=t["x-props"]&&t["x-props"].style,c=this.createFilter("addition",t);return l.a.createElement("div",{className:i,style:o,onClick:this.onClearErrorHandler()},l.a.createElement("div",null,l.a.createElement(oe,{dataSource:e},s(t.items).reduce((e,{key:t,schema:r})=>{return this.createFilter(t,r)(()=>e.concat(l.a.createElement(le,n()({},r,{key:t,title:r.title,dataIndex:t,cell:(e,r)=>a([r,t])}))),()=>e)},[]),c(()=>l.a.createElement(le,{key:"operations",title:r.operations,dataIndex:"operations",width:180,cell:(e,t)=>l.a.createElement("div",{className:"array-item-operator"},this.renderRemove(t,e),this.renderMoveDown(t,e),this.renderMoveUp(t,e),this.renderExtraOperations(t))}))),this.renderAddition()))}})`
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
  `);var de=function(e){return e>=48&&e<=57},ue=function(e){return e>=97&&e<=122},he=function(e){return e>=65&&e<=90},pe=function(e){return!(ue(e)||he(e)||de(e))},me=function(e){return ue(e)||he(e)};const fe=e=>{if(!e)return 0;let t=0,r=0,i=0,n=0,a=0,s=0,o=0,l=0,c=0;const d=()=>t+r+i+n;for(var u=0;u<e.length;u++){var h=e.charCodeAt(u);de(h)?(t++,0!==u&&u!==e.length-1&&a++,u>0&&de(e.charCodeAt(u-1))&&l++):ue(h)?(r++,u>0&&ue(e.charCodeAt(u-1))&&l++):he(h)?(i++,u>0&&he(e.charCodeAt(u-1))&&l++):(n++,0!==u&&u!==e.length-1&&a++);for(var p=!1,m=0;m<e.length;m++)e[u]===e[m]&&u!==m&&(p=!0,o+=Math.abs(e.length/(m-u)));if(p){s++;var f=e.length-s;o=f?Math.ceil(o/f):Math.ceil(o)}if(u>1){var b=e.charCodeAt(u-1),g=e.charCodeAt(u-2);if(me(h)){if(me(b)&&me(g)){var v=e.toLowerCase(),y=v.charCodeAt(u),x=v.charCodeAt(u-1);y-x==x-v.charCodeAt(u-2)&&1===Math.abs(y-x)&&c++}}else de(h)?de(b)&&de(g)&&h-b==b-g&&1===Math.abs(h-b)&&c++:pe(b)&&pe(g)&&h-b==b-g&&1===Math.abs(h-b)&&c++}}let j=0,O=d();return j+=4*O,r>0&&(j+=2*(O-r)),i>0&&(j+=2*(O-i)),t!==O&&(j+=4*t),j+=6*n,j+=2*a,j+=2*(()=>{var e=t>0?1:0;return e+=r>0?1:0,e+=i>0?1:0,(e+=n>0?1:0)>2&&d()>=8?e+1:0})(),O===r+i&&(j-=O),O===t&&(j-=t),j-=o,j-=2*l,(j=(j=(j-=3*c)<0?0:j)>100?100:j)>=80?100:j>=60?80:j>=40?60:j>=20?40:20},be=f()((ce=class extends l.a.Component{constructor(...e){super(...e),s()(this,"state",{value:this.props.value||this.props.defaultValue,strength:0,eye:!1}),s()(this,"onChangeHandler",e=>{const t=e.target.value;this.setState({value:t,strength:fe(t)},()=>{this.props.onChange&&this.props.onChange(t)})})}componentDidUpdate(e,t){e.value!==this.props.value&&this.props.value!==this.state.value&&this.setState({value:this.props.value,strength:fe(this.props.value)})}renderStrength(){const{strength:e}=this.state;return l.a.createElement("div",{className:"password-strength-wrapper"},l.a.createElement("div",{className:"div-1 div"}),l.a.createElement("div",{className:"div-2 div"}),l.a.createElement("div",{className:"div-3 div"}),l.a.createElement("div",{className:"div-4 div"}),l.a.createElement("div",{className:"password-strength-bar",style:{clipPath:`polygon(0 0,${e}% 0,${e}% 100%,0 100%)`}}))}switchEye(){return()=>{this.setState({eye:!this.state.eye})}}renderEye(){return this.state.eye?l.a.createElement("img",{className:"eye",onClick:this.switchEye(),src:"//img.alicdn.com/tfs/TB1xiXlsVzqK1RjSZFvXXcB7VXa-200-200.svg"}):l.a.createElement("img",{className:"eye",onClick:this.switchEye(),src:"//img.alicdn.com/tfs/TB1wyXlsVzqK1RjSZFvXXcB7VXa-200-200.svg"})}render(){const{className:e,checkStrength:t,value:r,onChange:i,htmlType:a,innerAfter:s,...o}=this.props;return l.a.createElement("div",{className:e},l.a.createElement(h.Input,n()({type:this.state.eye?"text":"password",className:`input-${this.state.eye?"text":"password"}`,value:this.state.value,onChange:this.onChangeHandler,suffix:this.renderEye()},o)),t&&this.renderStrength())}},ce))`
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
`;Object(c.registerFormField)("password",Object(c.connect)()(be));const ge=f()(class extends se{renderOperations(e,t){return l.a.createElement(o.Fragment,null,this.renderRemove(t,e),this.renderMoveDown(t,e),this.renderMoveUp(t,e),this.renderExtraOperations(t))}renderEmpty(e){return l.a.createElement(h.Card,{title:e,className:"card-list"},super.renderEmpty())}render(){const{value:e,className:t,schema:r,renderField:i}=this.props,{title:a,renderAddition:s,renderRemove:o,renderEmpty:c,renderMoveDown:d,renderMoveUp:u,renderOperations:p,...m}=this.getProps()||{};return l.a.createElement("div",{className:t,onClick:this.onClearErrorHandler()},Object(x.x)(e).map((e,t)=>l.a.createElement(h.Card,n()({},m,{title:l.a.createElement("span",null,t+1,". ",a||r.title),className:"card-list",key:t,extra:this.renderOperations(e,t)}),i(t))),0===e.length&&this.renderEmpty(a),l.a.createElement("div",{className:"addition-wrapper"},e.length>0&&this.renderAddition()))}})`
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
`;Object(c.registerFormField)("cards",ge);class ve extends o.Component{render(){const{prefix:e,pure:t,wrap:r,fixed:i,gutter:a,fixedWidth:s,align:c,justify:d,hidden:h,className:p,component:m,children:f,...b}=this.props;let g;!0===h?g={[`${e}row-hidden`]:!0}:"string"==typeof h?g={[`${e}row-${h}-hidden`]:!!h}:Array.isArray(h)&&(g=h.reduce((t,r)=>(t[`${e}row-${r}-hidden`]=!!r,t),{}));const v=u()({[`${e}row`]:!0,[`${e}row-wrap`]:r,[`${e}row-fixed`]:i,[`${e}row-fixed-${s}`]:!!s,[`${e}row-justify-${d}`]:!!d,[`${e}row-align-${c}`]:!!c,...g,[p]:!!p});let y=Object(x.x)(f);const j=parseInt(a,10);if(0!==j){const e=`${j/2}px`;b.style={marginLeft:`-${e}`,marginRight:`-${e}`,...b.style||{}},y=o.Children.map(f,(t,r)=>{if(t&&t.type&&"function"==typeof t.type&&t.type.isNextCol){return Object(o.cloneElement)(t,{style:{paddingLeft:e,paddingRight:e,...t.style||{}}})}return t})}return l.a.createElement(m,n()({role:"row",className:v},b),y)}}s()(ve,"defaultProps",{prefix:"ant-",pure:!1,fixed:!1,gutter:0,wrap:!1,component:"div"});const ye=["xxs","xs","s","m","l","xl"];class xe extends o.Component{render(){const{prefix:e,pure:t,span:r,offset:i,fixedSpan:a,fixedOffset:s,hidden:o,align:c,xxs:d,xs:h,s:p,m:m,l:f,xl:b,component:g,className:v,children:y,...x}=this.props,j=ye.reduce((t,r)=>{let i={};return"object"==typeof this.props[r]?i=this.props[r]:i.span=this.props[r],t[`${e}col-${r}-${i.span}`]=!!i.span,t[`${e}col-${r}-offset-${i.offset}`]=!!i.offset,t},{});let O;!0===o?O={[`${e}col-hidden`]:!0}:"string"==typeof o?O={[`${e}col-${o}-hidden`]:!!o}:Array.isArray(o)&&(O=o.reduce((t,r)=>(t[`${e}col-${r}-hidden`]=!!r,t),{}));const F=u()({[`${e}col`]:!0,[`${e}col-${r}`]:!!r,[`${e}col-fixed-${a}`]:!!a,[`${e}col-offset-${i}`]:!!i,[`${e}col-offset-fixed-${s}`]:!!s,[`${e}col-${c}`]:!!c,...j,...O,[v]:v});return l.a.createElement(g,n()({role:"gridcell",className:F},x),y)}}s()(xe,"isNextCol",!0),s()(xe,"defaultProps",{prefix:"ant-",pure:!1,component:"div"}),ve.__docgenInfo={description:"",methods:[],displayName:"Row",props:{prefix:{defaultValue:{value:"'ant-'",computed:!1},required:!1},pure:{defaultValue:{value:"false",computed:!1},required:!1},fixed:{defaultValue:{value:"false",computed:!1},required:!1},gutter:{defaultValue:{value:"0",computed:!1},required:!1},wrap:{defaultValue:{value:"false",computed:!1},required:!1},component:{defaultValue:{value:"'div'",computed:!1},required:!1}}},xe.__docgenInfo={description:"",methods:[],displayName:"Col",props:{prefix:{defaultValue:{value:"'ant-'",computed:!1},required:!1},pure:{defaultValue:{value:"false",computed:!1},required:!1},component:{defaultValue:{value:"'div'",computed:!1},required:!1}}};var je,Oe,Fe=r(166),Ee=r.n(Fe);const we=f()((Oe=je=class extends o.Component{renderChildren(){const{children:e,itemStyle:t,offset:r,span:i}=this.props;return l.a.createElement("div",{className:"button-group"},l.a.createElement(ve,null,l.a.createElement(xe,{span:i},l.a.createElement(xe,{offset:r,className:"inline"},l.a.createElement("div",{className:"inline-view",style:t},e)))))}getStickyBoundaryHandler(e){return()=>(this.formNode=this.formNode||g.a.findDOMNode(e.current),!this.formNode||((e,{offset:t=0,threshold:r=0}={})=>{const{top:i,right:n,bottom:a,left:s,width:o,height:l}=e,c=a,d=window.innerWidth-s,u=window.innerHeight-i,h=n,p=r*o,m=r*l;return c>=(t.top||t+m)&&d>=(t.right||t+p)&&u>=(t.bottom||t+m)&&h>=(t.left||t+p)})(this.formNode.getBoundingClientRect()))}render(){const{sticky:e,style:t,className:r}=this.props,i=l.a.createElement(I,null,({inline:e}={})=>l.a.createElement("div",{className:u()(r,{"is-inline":!!e}),style:t},this.renderChildren()));return e?l.a.createElement("div",null,l.a.createElement(I,null,({inline:e,FormRef:n}={})=>{if(n)return l.a.createElement(Ee.a,{edge:"bottom",triggerDistance:this.props.triggerDistance,offsetDistance:this.props.offsetDistance,zIndex:this.props.zIndex,getStickyBoundary:this.getStickyBoundaryHandler(n),style:{borderTop:"1px solid #eee",background:t&&t.background||"#fff",padding:t&&t.padding||"8px 0"}},l.a.createElement("div",{className:r,style:t},i))})):i}},s()(je,"defaultProps",{span:24}),Oe))`
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
`,Se=({showLoading:e,...t})=>l.a.createElement(c.FormConsumer,null,({status:r,schema:i})=>l.a.createElement(h.Button,n()({type:"primary",htmlType:"submit",disabled:e?"submitting"===r:void 0},t,{loading:e?"submitting"===r:void 0}),t.children||"提交")),Ce=e=>l.a.createElement(c.FormConsumer,null,({status:t,reset:r})=>l.a.createElement(h.Button,n()({},e,{onClick:r}),e.children||"重置"));var ke,Ne,Ve,Ae;Se.__docgenInfo={description:"",methods:[],displayName:"Submit"},Ce.__docgenInfo={description:"",methods:[],displayName:"Reset"};const Pe=(e,t=0)=>e?"object"==typeof e?e:{span:e}:t,Ie=Object(c.createVirtualBox)("layout",({children:e,...t})=>l.a.createElement(I,null,r=>{let i={...r,...t},n=i.inline||i.className||i.style?l.a.createElement("div",{className:u()(i.className,{"ant-form ant-inline":!!i.inline}),style:i.style},e):e;return l.a.createElement(P,{value:i},n)})),$e=Object(c.createVirtualBox)("grid",class extends o.Component{renderFormItem(e){const{title:t,description:r,name:i,help:n,extra:a,...s}=this.props;return l.a.createElement(I,{},({labelAlign:a,labelTextAlign:o,labelCol:c,wrapperCol:d,size:u,autoAddColon:h})=>l.a.createElement(q,{labelAlign:a,labelTextAlign:o,labelCol:c,wrapperCol:d,autoAddColon:h,size:u,...s,label:t,noMinHeight:!0,id:i,extra:r,help:n},e))}renderGrid(){let{children:e,cols:t,title:r,description:i,help:a,extra:s,...o}=this.props;e=Object(x.x)(e),t=Object(x.x)(t).map(e=>Pe(e));const c=e.length;if(t.length<c){let e=c-t.length,r=24-t.reduce((e,t)=>e+Number(t.span?t.span:0)+Number(t.offset?t.offset:0),0);for(let i=0;i<e;i++)t.push(parseInt(r/e))}return t=Object(x.x)(t).map(e=>Pe(e)),l.a.createElement(h.Row,o,e.reduce((e,r,i)=>r?e.concat(l.a.createElement(h.Col,n()({key:i},t[i]),r)):e,[]))}render(){const{title:e}=this.props;return e?this.renderFormItem(this.renderGrid()):this.renderGrid()}}),Te=Object(c.createVirtualBox)("card",f()((Ne=ke=class extends o.Component{render(){const{children:e,className:t,...r}=this.props;return l.a.createElement(h.Card,n()({className:t},r),e)}},s()(ke,"defaultProps",{}),Ne))`
    margin-bottom: 30px;
    .ant-card-body {
      padding-top: 30px;
      padding-bottom: 0 !important;
    }
    &.ant-card {
      display: block;
      margin-bottom: 30px;
    }
  `),qe=Object(c.createVirtualBox)("block",f()((Ae=Ve=class extends o.Component{render(){const{children:e,className:t,...r}=this.props;return l.a.createElement(h.Card,n()({className:t},r),e)}},s()(Ve,"defaultProps",{}),Ae))`
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
  `);$e.__docgenInfo={description:"",methods:[{name:"renderFormItem",docblock:null,modifiers:[],params:[{name:"children",optional:!1,type:null}],returns:null},{name:"renderGrid",docblock:null,modifiers:[],params:[],returns:null}]},r.d(t,"SchemaForm",function(){return c.SchemaForm}),r.d(t,"Field",function(){return c.Field}),r.d(t,"setValidationLocale",function(){return c.setValidationLocale}),r.d(t,"setValidationLanguage",function(){return c.setValidationLanguage}),r.d(t,"createFormActions",function(){return c.createFormActions}),r.d(t,"createAsyncFormActions",function(){return c.createAsyncFormActions}),r.d(t,"registerFormField",function(){return c.registerFormField}),r.d(t,"registerFormFields",function(){return c.registerFormFields}),r.d(t,"registerFormWrapper",function(){return c.registerFormWrapper}),r.d(t,"registerFieldMiddleware",function(){return c.registerFieldMiddleware}),r.d(t,"registerFormFieldPropsTransformer",function(){return c.registerFormFieldPropsTransformer}),r.d(t,"caculateSchemaInitialValues",function(){return c.caculateSchemaInitialValues}),r.d(t,"FormPath",function(){return c.FormPath}),r.d(t,"createVirtualBox",function(){return c.createVirtualBox}),r.d(t,"FormSlot",function(){return c.FormSlot}),r.d(t,"connect",function(){return c.connect}),r.d(t,"FormBridge",function(){return c.FormBridge}),r.d(t,"FormProvider",function(){return c.FormProvider}),r.d(t,"useForm",function(){return c.useForm}),r.d(t,"FormConsumer",function(){return c.FormConsumer}),r.d(t,"createArrayField",function(){return c.createArrayField}),r.d(t,"FormButtonGroup",function(){return we}),r.d(t,"Submit",function(){return Se}),r.d(t,"Reset",function(){return Ce}),r.d(t,"FormLayout",function(){return Ie}),r.d(t,"FormItemGrid",function(){return $e}),r.d(t,"FormCard",function(){return Te}),r.d(t,"FormBlock",function(){return qe}),r.d(t,"mapStyledProps",function(){return S}),r.d(t,"mapTextComponent",function(){return C});t.default=c.SchemaForm}}]);