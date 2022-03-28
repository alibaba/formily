# Changelog

## v2.0.17(2022-03-28)

### :bug: Bug Fixes

1. [fix(reactive-vue): fix the exception of multiple update nodes in vue3 case (#2991)](https://github.com/alibaba/formily/commit/90486ecb) :point_right: ( [e_the](https://github.com/e_the) )

1. [fix: fix destroy can not remove value/initialValues and FormStep reactive strategy (#2988)](https://github.com/alibaba/formily/commit/4d18c9e7) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(antd): StepPane & createFormStep should not be optional property (#2979)](https://github.com/alibaba/formily/commit/1c6970c5) :point_right: ( [戣蓦](https://github.com/戣蓦) )

1. [fix(next): fix array table warning style (#2973)](https://github.com/alibaba/formily/commit/3cb3ec7f) :point_right: ( [王大白](https://github.com/王大白) )

1. [fix(antd/next): fix PreviewText.Cascader bug (#2969)](https://github.com/alibaba/formily/commit/9990b66d) :point_right: ( [Lyca](https://github.com/Lyca) )

### :memo: Documents Changes

1. [docs: update codesandbox templates that use the latest formily (#2980)](https://github.com/alibaba/formily/commit/7bb26f98) :point_right: ( [liuwei](https://github.com/liuwei) )

### :construction: Add/Update Test Cases

1. [test(json-schema): add test of transformer in json-schema (#2975)](https://github.com/alibaba/formily/commit/c3228191) :point_right: ( [Zardddddd60](https://github.com/Zardddddd60) )

## v2.0.16(2022-03-20)

### :tada: Enhancements

1. [feat(reactive): support observe dynamic tree (#2965)](https://github.com/alibaba/formily/commit/631385d8) :point_right: ( [Janry](https://github.com/Janry) )

### :bug: Bug Fixes

1. [fix(reactive-vue): fix the exception of multiple update nodes in vue3 case (#2966)](https://github.com/alibaba/formily/commit/b1faf4db) :point_right: ( [e_the](https://github.com/e_the) )

1. [fix(antd): fix array tabs error badges (#2964)](https://github.com/alibaba/formily/commit/060cce8f) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix array field remove with memory leak (#2963)](https://github.com/alibaba/formily/commit/1658ae36) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix initialValue=null and reset null invalid bug (#2951)](https://github.com/alibaba/formily/commit/221d39fb) :point_right: ( [frehkxu](https://github.com/frehkxu) )

1. [fix(antd): fix ConfigProvider.ConfigContext error in antd@4.6.3- (#2956)](https://github.com/alibaba/formily/commit/3bdfe2f2) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [fix(antd/next): fix null in dataSource error in SelectTable (#2952)](https://github.com/alibaba/formily/commit/2d428941) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [fix(next/antd): fix single value invalid in PreviewText.Cascader (#2940)](https://github.com/alibaba/formily/commit/33a54e7a) :point_right: ( [Lyca](https://github.com/Lyca) )

## v2.0.15(2022-03-13)

### :tada: Enhancements

1. [feat(next/antd): fix selected bug3 by search in SelectTable (#2927)](https://github.com/alibaba/formily/commit/bc943de3) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [feat(vue): improve performance of mapProps (#2909)](https://github.com/alibaba/formily/commit/5ca0456a) :point_right: ( [月落音阑](https://github.com/月落音阑) )

### :bug: Bug Fixes

1. [fix(grid): fix grid mutation observer infinite loop (#2925)](https://github.com/alibaba/formily/commit/72534b43) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(validator): fix unexpect validate with empty format (#2926)](https://github.com/alibaba/formily/commit/7da26285) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(next/antd): fix label overflow invalid in FormGrid (#2910)](https://github.com/alibaba/formily/commit/485702cd) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [fix(vue): fix error when designable is true (#2908)](https://github.com/alibaba/formily/commit/398fac96) :point_right: ( [月落音阑](https://github.com/月落音阑) )

### :rocket: Improve Performance

1. [perf(reactive-vue): optimize vue3 tracker performance consumption of multiple instances (#2911)](https://github.com/alibaba/formily/commit/83e6a35c) :point_right: ( [e_the](https://github.com/e_the) )

## v2.0.14(2022-03-06)

### :tada: Enhancements

1. [feat(next/antd): support dataSource disabled props in SelectTable (#2902)](https://github.com/alibaba/formily/commit/a3722441) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [feat(vue): support x-slot (#2892)](https://github.com/alibaba/formily/commit/9e268aa8) :point_right: ( [月落音阑](https://github.com/月落音阑) )

1. [feat: add Component Ecology: semi (#2883)](https://github.com/alibaba/formily/commit/3fae57e2) :point_right: ( [programmerwy](https://github.com/programmerwy) )

1. [feat(vue): improve expression scope (#2875)](https://github.com/alibaba/formily/commit/22a3d2bf) :point_right: ( [frehkxu](https://github.com/frehkxu) )

### :bug: Bug Fixes

1. [fix(core): fix empty string or number can not rewrite default value (#2906)](https://github.com/alibaba/formily/commit/b6c3e311) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(reactive-vue): fix vue3 render dependency collection broken (#2904)](https://github.com/alibaba/formily/commit/b226760e) :point_right: ( [e_the](https://github.com/e_the) )

1. [fix(element-components): fix formitem feedback msg (#2899)](https://github.com/alibaba/formily/commit/8d201778) :point_right: ( [skyfore](https://github.com/skyfore) )

1. [fix(antd/next): remove host element after unmount in portal (#2900)](https://github.com/alibaba/formily/commit/a2af5c94) :point_right: ( [zhouxinyong](https://github.com/zhouxinyong) )

1. [fix(antd/next): fix ArrayItems sortItem style (#2893)](https://github.com/alibaba/formily/commit/1ef47b0a) :point_right: ( [zhouxinyong](https://github.com/zhouxinyong) )

1. [fix(antd/next): disable label/wrapper col when vertical layout](https://github.com/alibaba/formily/commit/119fd389) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(next): fix datepicker2 and datepicker format (#2887)](https://github.com/alibaba/formily/commit/9f907c1d) :point_right: ( [xigualzn](https://github.com/xigualzn) )

1. [fix(vue): fix FormConsumer not update correctly (#2888)](https://github.com/alibaba/formily/commit/4e39c082) :point_right: ( [月落音阑](https://github.com/月落音阑) )

### :construction: Add/Update Test Cases

1. [test(code): optimize test case of core/lifecycle (#2874)](https://github.com/alibaba/formily/commit/f1766ecc) :point_right: ( [Zardddddd60](https://github.com/Zardddddd60) )

### :blush: Other Changes

1. [chore(deps): bump url-parse from 1.5.7 to 1.5.10 (#2871)](https://github.com/alibaba/formily/commit/78b5caa6) :point_right: ( [dependabot[bot]](https://github.com/dependabot[bot]) )

## v2.0.13(2022-02-25)

### :tada: Enhancements

1. [feat(next/antd): add valueType props in SelectTable (#2865)](https://github.com/alibaba/formily/commit/d7eb3df5) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [feat(json-schema): support read scope in x-reactions (#2864)](https://github.com/alibaba/formily/commit/25c12648) :point_right: ( [Janry](https://github.com/Janry) )

### :bug: Bug Fixes

1. [fix(antd): fix use treeData props for PreviewText.TreeSelect (#2867)](https://github.com/alibaba/formily/commit/edcc9544) :point_right: ( [Dark](https://github.com/Dark) )

1. [fix(antd/next): fix upload typings (#2856)](https://github.com/alibaba/formily/commit/5b78f97e) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix relative match can not skip void field (#2850)](https://github.com/alibaba/formily/commit/e7c99843) :point_right: ( [Janry](https://github.com/Janry) )

### :memo: Documents Changes

1. [docs: add vant link (#2851)](https://github.com/alibaba/formily/commit/de85f9f7) :point_right: ( [摇了摇头 oO](https://github.com/摇了摇头oO) )

### :blush: Other Changes

1. [chore: improve performance (#2868)](https://github.com/alibaba/formily/commit/0fd17eac) :point_right: ( [Janry](https://github.com/Janry) )

## v2.0.12(2022-02-21)

### :tada: Enhancements

1. [feat(next/antd): add options param in SelectTable onChange props (#2842)](https://github.com/alibaba/formily/commit/89d8026b) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [feat(antd/next): use full text matcha for SelectTable nd remove filterOptionProp](https://github.com/alibaba/formily/commit/127e0c7f) :point_right: ( [janrywang](https://github.com/janrywang) )

### :bug: Bug Fixes

1. [fix(shared): fix merge empty object is not work (#2841)](https://github.com/alibaba/formily/commit/28a58530) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(antd/next): fix FormItem useOverflow bug (#2830)](https://github.com/alibaba/formily/commit/5e88de27) :point_right: ( [Lyca](https://github.com/Lyca) )

### :memo: Documents Changes

1. [docs: update issue-helper api](https://github.com/alibaba/formily/commit/ea4b1009) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs: fix a typo in Field.zh-CN.md (#2825)](https://github.com/alibaba/formily/commit/248ba3b0) :point_right: ( [stefango](https://github.com/stefango) )

### :blush: Other Changes

1. [chore(deps): bump url-parse from 1.5.3 to 1.5.7 (#2840)](https://github.com/alibaba/formily/commit/c38e728a) :point_right: ( [dependabot[bot]](https://github.com/dependabot[bot]) )

## v2.0.11(2022-02-15)

### :tada: Enhancements

1. [feat(next): support checkStrictly props in SelectTable (#2824)](https://github.com/alibaba/formily/commit/feba6375) :point_right: ( [Lyca](https://github.com/Lyca) )

### :blush: Other Changes

1. [chore(antd/next): replace useForm to useParentForm in Form component](https://github.com/alibaba/formily/commit/43a3d6b8) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(antd/next): revert editable](https://github.com/alibaba/formily/commit/16a376d3) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.10(2022-02-13)

### :tada: Enhancements

1. [feat(antd/next): support 16427form scope with Form](https://github.com/alibaba/formily/commit/09a597f7) :point_right: ( [janrywang](https://github.com/janrywang) )

### :bug: Bug Fixes

1. [fix(path): fix nested group match is not work (#2818)](https://github.com/alibaba/formily/commit/cad37dae) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(antd/next): fix SelectTable rowSelection bug (#2815)](https://github.com/alibaba/formily/commit/babc5c23) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [fix(vue): add component name in connect (#2810)](https://github.com/alibaba/formily/commit/5a695c06) :point_right: ( [zhouxinyong](https://github.com/zhouxinyong) )

### :memo: Documents Changes

1. [docs: fix a typo in form.md (#2814)](https://github.com/alibaba/formily/commit/4e1ce55a) :point_right: ( [摇了摇头 oO](https://github.com/摇了摇头oO) )

### :blush: Other Changes

1. [chore(json-schema): improve typings](https://github.com/alibaba/formily/commit/d116d272) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.9(2022-01-20)

### :tada: Enhancements

1. [feat(react): improve expression scopes (#2778)](https://github.com/alibaba/formily/commit/25c48970) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(core): support index/indexes properties (#2769)](https://github.com/alibaba/formily/commit/36143ef0) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(next/antd): support disabled props from field in ArrayBase.Addition (#2746)](https://github.com/alibaba/formily/commit/29624ca5) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [feat(next): add date-picker2 (#2737)](https://github.com/alibaba/formily/commit/36d377cc) :point_right: ( [Janry](https://github.com/Janry) )

### :bug: Bug Fixes

1. [fix(antd/next): fix upload can not preview placeholder (#2784)](https://github.com/alibaba/formily/commit/4660fd81) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix query sibling value is not work (#2781)](https://github.com/alibaba/formily/commit/c5dfb538) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(antd): fix ArrayTabs auto switch activeKey (#2774)](https://github.com/alibaba/formily/commit/72e0bdbd) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix: correct indian rupee regexp (#2714)](https://github.com/alibaba/formily/commit/b2269019) :point_right: ( [catch on me](https://github.com/catch on me) )

1. [fix(element): fix ArrayTable style error (#2760)](https://github.com/alibaba/formily/commit/3b24f7f7) :point_right: ( [Muyao](https://github.com/Muyao) )

### :rose: Improve code quality

1. [refactor(vue): change Field component type to functional (#2773)](https://github.com/alibaba/formily/commit/ffbaba25) :point_right: ( [月落音阑](https://github.com/月落音阑) )

### :blush: Other Changes

1. [chore: change pr template and commit message specific link (#2742)](https://github.com/alibaba/formily/commit/129cd693) :point_right: ( [zhouxinyong](https://github.com/zhouxinyong) )

1. [chore(antd): improve typings (#2733)](https://github.com/alibaba/formily/commit/994180d8) :point_right: ( [rash](https://github.com/rash) )

## v2.0.8(2022-01-05)

### :tada: Enhancements

1. [feat(next/antd): optimize SelectTable component (#2725)](https://github.com/alibaba/formily/commit/b0095895) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [feat(next/antd/vue): add useResponsiveFormLayout fault tolerance and FormItem useOverflow update (#2707)](https://github.com/alibaba/formily/commit/98a544ac) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [feat(docs): add antdv doc link (#2691)](https://github.com/alibaba/formily/commit/9ebdd9c4) :point_right: ( [vimvinter](https://github.com/vimvinter) )

### :bug: Bug Fixes

1. [fix(antd/next): fix Editable component can not set default editable](https://github.com/alibaba/formily/commit/88915bc5) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(antd/next): fix tool methods and provide simple unit tests (#2694)](https://github.com/alibaba/formily/commit/475d10e9) :point_right: ( [小翼](https://github.com/小翼) )

1. [fix(vue): fix postinstall error (#2684)](https://github.com/alibaba/formily/commit/d4b9133f) :point_right: ( [月落音阑](https://github.com/月落音阑) )

## v2.0.7(2021-12-27)

### :tada: Enhancements

1. [feat(devtools): support select node to bind $vm with console (#2682)](https://github.com/alibaba/formily/commit/80ef0792) :point_right: ( [fuzi](https://github.com/fuzi) )

1. [feat(element): improve performance of ArrayTable (#2678)](https://github.com/alibaba/formily/commit/b1f1b4e4) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [feat(reactive-vue): add observer option scheduler (#2672)](https://github.com/alibaba/formily/commit/ca55e484) :point_right: ( [Muyao](https://github.com/Muyao) )

### :bug: Bug Fixes

1. [fix(core): fix void array items node need skip (#2683)](https://github.com/alibaba/formily/commit/a67ab3a4) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(path): update README.md (#2677)](https://github.com/alibaba/formily/commit/589e74bf) :point_right: ( [AlexStacker](https://github.com/AlexStacker) )

1. [fix(reactive-vue): fix vue3.26 error (#2673)](https://github.com/alibaba/formily/commit/03e9e7d5) :point_right: ( [月落音阑](https://github.com/月落音阑) )

1. [fix(element): fix usePlaceholder value empty error (#2665)](https://github.com/alibaba/formily/commit/ea8adc37) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [fix(core): fix setValues is not work when called reset (#2649)](https://github.com/alibaba/formily/commit/7d4ef5dc) :point_right: ( [Janry](https://github.com/Janry) )

### :memo: Documents Changes

1. [docs(core): update setValidationLanguage to setValidateLanguage (#2674)](https://github.com/alibaba/formily/commit/31bc258d) :point_right: ( [JuFeng Zhang](https://github.com/JuFeng Zhang) )

1. [docs(core): update form-path doc path](https://github.com/alibaba/formily/commit/7f901de7) :point_right: ( [janrywang](https://github.com/janrywang) )

### :rose: Improve code quality

1. [refactor(vue): switch type files for vue2/vue3 in postinstall (#2640)](https://github.com/alibaba/formily/commit/6015b7c8) :point_right: ( [月落音阑](https://github.com/月落音阑) )

### :blush: Other Changes

1. [chore(antd/next): improve FormItem props](https://github.com/alibaba/formily/commit/4c36ed26) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.6(2021-12-17)

### :tada: Enhancements

1. [feat(antd-component): provide `getPopupContainer` prop for `FormItem` when use popover feedback (#2619)](https://github.com/alibaba/formily/commit/69ff01cb) :point_right: ( [小翼](https://github.com/小翼) )

### :bug: Bug Fixes

1. [fix(core): fix array remove can not auto clean initialValue (#2638)](https://github.com/alibaba/formily/commit/2e6db177) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(grid): add resize-observer-polyfill (#2630)](https://github.com/alibaba/formily/commit/8c234a8a) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(reactive): fix reaction scheduler prevent setState rerender (#2610)](https://github.com/alibaba/formily/commit/e7432006) :point_right: ( [Janry](https://github.com/Janry) )

### :memo: Documents Changes

1. [docs: update qrcode](https://github.com/alibaba/formily/commit/fe10bfdb) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(core): improve docs (#2636)](https://github.com/alibaba/formily/commit/436dedbe) :point_right: ( [Hencky](https://github.com/Hencky) )

1. [docs(core): fix typo (#2613)](https://github.com/alibaba/formily/commit/0f9e7a0f) :point_right: ( [Grapedge](https://github.com/Grapedge) )

### :blush: Other Changes

1. [chore(grid): improve strictAutoFit](https://github.com/alibaba/formily/commit/d485a49e) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(next): export ExtendTableProps](https://github.com/alibaba/formily/commit/ad82905b) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.5(2021-12-10)

### :bug: Bug Fixes

1. [fix(reactive): fix reaction scheduler prevent setState rerender](https://github.com/alibaba/formily/commit/01078d9d) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(vue): fix format vue3 h function props (#2609)](https://github.com/alibaba/formily/commit/e2dfc0bc) :point_right: ( [zhaowei-plus](https://github.com/zhaowei-plus) )

1. [fix(vue): fix x-content not work in void field (#2603)](https://github.com/alibaba/formily/commit/a7757be5) :point_right: ( [月落音阑](https://github.com/月落音阑) )

1. [fix(antd/next): fix components behaviors (#2601)](https://github.com/alibaba/formily/commit/c9d43f09) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(antd/next): fix FormItem.label can not shown in void field](https://github.com/alibaba/formily/commit/f2bd220c) :point_right: ( [janrywang](https://github.com/janrywang) )

### :memo: Documents Changes

1. [docs(element): update element brandName & codesandbox (#2608)](https://github.com/alibaba/formily/commit/26861a8f) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [docs(core): update effects demo](https://github.com/alibaba/formily/commit/f768143c) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.4(2021-12-08)

### :bug: Bug Fixes

1. [fix(json-schema): fix reactions isolate effect (#2590)](https://github.com/alibaba/formily/commit/f04deb13) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(antd/next): fix FormItem mapProps](https://github.com/alibaba/formily/commit/ccf1bc8f) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(react): fix doc link (#2584)](https://github.com/alibaba/formily/commit/4faa406d) :point_right: ( [燃冰](https://github.com/燃冰) )

1. [fix(next): fix missing ExclamationCircleOutlined Icon (#2564)](https://github.com/alibaba/formily/commit/33d8d278) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [fix(reactive): fix unexpect effect in reactions (#2563)](https://github.com/alibaba/formily/commit/8f8db67a) :point_right: ( [Janry](https://github.com/Janry) )

### :memo: Documents Changes

1. [docs(core): fix typo (#2582)](https://github.com/alibaba/formily/commit/5befbadc) :point_right: ( [翁立鑫](https://github.com/翁立鑫) )

1. [docs(react): update field document urls (#2585)](https://github.com/alibaba/formily/commit/98628470) :point_right: ( [燃冰](https://github.com/燃冰) )

1. [docs: improve site show brandName (#2574)](https://github.com/alibaba/formily/commit/483f79f1) :point_right: ( [Dark](https://github.com/Dark) )

### :rocket: Improve Performance

1. [perf: improve total performance 20% (#2589)](https://github.com/alibaba/formily/commit/2d981385) :point_right: ( [Janry](https://github.com/Janry) )

### :blush: Other Changes

1. [chore: improve code style (#2579)](https://github.com/alibaba/formily/commit/4a083bad) :point_right: ( [Janry](https://github.com/Janry) )

1. [chore: add dingtalk notification for release](https://github.com/alibaba/formily/commit/35a18c48) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.3(2021-12-02)

### :bug: Bug Fixes

1. [fix(json-schema): fix is null (#2560)](https://github.com/alibaba/formily/commit/5f2db004) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(vue): fix void field children is not undefined (#2551)](https://github.com/alibaba/formily/commit/f5a1d1bb) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(next/antd/vue): fix useResponsiveFormLayout props for tooltipIcon bug (#2549)](https://github.com/alibaba/formily/commit/cb9f1348) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [fix(next): fix Space align is not work (#2531)](https://github.com/alibaba/formily/commit/3f4afef1) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(reactive): fix tracker unexpect update with strict-mode (#2526)](https://github.com/alibaba/formily/commit/5a2605e6) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(element): add optinal chain to FormItem useOverflow hook (#2519)](https://github.com/alibaba/formily/commit/da189834) :point_right: ( [qq1037305420](https://github.com/qq1037305420) )

### :memo: Documents Changes

1. [docs(react): fix the typo on ISchemaFieldProps (#2528)](https://github.com/alibaba/formily/commit/0c5c6f1e) :point_right: ( [B2D1](https://github.com/B2D1) )

### :construction: Add/Update Test Cases

1. [test(reactive): adding missing tests and correcting existing tests (#2525)](https://github.com/alibaba/formily/commit/432f6204) :point_right: ( [Yiliang Wang](https://github.com/Yiliang Wang) )

### :blush: Other Changes

1. [chore(reactive): reduce code](https://github.com/alibaba/formily/commit/af700c69) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.2(2021-11-26)

### :bug: Bug Fixes

1. [fix(next): fix the antd-icons is not removed cleanly](https://github.com/alibaba/formily/commit/4e7a4626) :point_right: ( [janrywang](https://github.com/janrywang) )

### :memo: Documents Changes

1. [docs: update Chinese guide 1.x link (#2515)](https://github.com/alibaba/formily/commit/bf0d9b8b) :point_right: ( [csrigogogo](https://github.com/csrigogogo) )

1. [docs: update readme](https://github.com/alibaba/formily/commit/5ad3fdd9) :point_right: ( [janrywang](https://github.com/janrywang) )

### :construction: Add/Update Test Cases

1. [test: update package.json](https://github.com/alibaba/formily/commit/288a8777) :point_right: ( [janrywang](https://github.com/janrywang) )

### :blush: Other Changes

1. [chore(element): update ts-import-plugin version (#2518)](https://github.com/alibaba/formily/commit/4f27990d) :point_right: ( [Muyao](https://github.com/Muyao) )

## v2.0.1(2021-11-25)

### :tada: Enhancements

1. [feat(element): support createFormGrid api (#2510)](https://github.com/alibaba/formily/commit/cadd63b3) :point_right: ( [Muyao](https://github.com/Muyao) )

### :bug: Bug Fixes

1. [fix(core): fix required validate with wrong order (#2508)](https://github.com/alibaba/formily/commit/f0ac9918) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(reactive): fix the incomplete coverage of runReactions batch mode (#2505)](https://github.com/alibaba/formily/commit/91f4ecfa) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix validator will trigger multi times with duplicate triggerTypes (#2495)](https://github.com/alibaba/formily/commit/88d6f83b) :point_right: ( [nexx](https://github.com/nexx) )

1. [fix(element): fix vue list key not update correctly (#2490)](https://github.com/alibaba/formily/commit/c0a37fe0) :point_right: ( [Muyao](https://github.com/Muyao) )

### :memo: Documents Changes

1. [docs: update structure image](https://github.com/alibaba/formily/commit/ad485978) :point_right: ( [janrywang](https://github.com/janrywang) )

### :blush: Other Changes

1. [chore: add ESNext and DOM lib to TS compiler options (#2507)](https://github.com/alibaba/formily/commit/a51d1898) :point_right: ( [Yiliang Wang](https://github.com/Yiliang Wang) )

1. [chore: fix yarn.lock](https://github.com/alibaba/formily/commit/8305c18f) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(antd/next): compat antd@4.17 and remove antd-icons from fusion package (#2492)](https://github.com/alibaba/formily/commit/cc325699) :point_right: ( [Janry](https://github.com/Janry) )

## v2.0.0(2021-11-22)

### :tada: Enhancements

1. [feat(core): add setData & setContent of field models (#2478)](https://github.com/alibaba/formily/commit/f6d31032) :point_right: ( [DivX.Hu](https://github.com/DivX.Hu) )

1. [feat(vue): add injectionCleaner to FormProvider (#2449)](https://github.com/alibaba/formily/commit/56c36468) :point_right: ( [月落音阑](https://github.com/月落音阑) )

### :bug: Bug Fixes

1. [fix(grid): fix calc origin columns (#2468)](https://github.com/alibaba/formily/commit/1a9e37b4) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(element): fix FormLayout provide props not update (#2448)](https://github.com/alibaba/formily/commit/cd50ad7d) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [fix: fix validator notify error message of Antd Upload Item (#2433)](https://github.com/alibaba/formily/commit/8e4a6a98) :point_right: ( [jazzjia](https://github.com/jazzjia) )

### :memo: Documents Changes

1. [docs: update QueryList docs (#2475)](https://github.com/alibaba/formily/commit/f84703b5) :point_right: ( [Janry](https://github.com/Janry) )

### :blush: Other Changes

1. [chore(grid): improve resolveChildren](https://github.com/alibaba/formily/commit/024a74f4) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore: change site domain v2.formilyjs.org -> formilyjs.org](https://github.com/alibaba/formily/commit/342493a0) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore: remove build global scripts (#2474)](https://github.com/alibaba/formily/commit/4cb7e9f9) :point_right: ( [Janry](https://github.com/Janry) )

1. [chore: improve project jest configs (#2473)](https://github.com/alibaba/formily/commit/0682f6c5) :point_right: ( [Janry](https://github.com/Janry) )

1. [chore: update workflow](https://github.com/alibaba/formily/commit/e84a4769) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore: improve validator context (#2439)](https://github.com/alibaba/formily/commit/f3f2989e) :point_right: ( [Janry](https://github.com/Janry) )

## v2.0.0-rc.20(2021-11-13)

### :tada: Enhancements

1. [feat(grid): support dynamic fold/unfold column](https://github.com/alibaba/formily/commit/a8b738e6) :point_right: ( [janrywang](https://github.com/janrywang) )

### :bug: Bug Fixes

1. [fix(grid): fix grid can not observe data-grid-span (#2418)](https://github.com/alibaba/formily/commit/91e070bd) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(grid): fix build by removing build:global (#2417)](https://github.com/alibaba/formily/commit/0d78006d) :point_right: ( [Deng Ruoqi](https://github.com/Deng Ruoqi) )

### :memo: Documents Changes

1. [docs: update links of Chinese guide docs (#2423)](https://github.com/alibaba/formily/commit/630349ba) :point_right: ( [haloworld](https://github.com/haloworld) )

### :rocket: Improve Performance

1. [perf(validator): improve validate performance](https://github.com/alibaba/formily/commit/7585ed16) :point_right: ( [janrywang](https://github.com/janrywang) )

### :blush: Other Changes

1. [chore(deps): bump prismjs from 1.24.1 to 1.25.0 (#2416)](https://github.com/alibaba/formily/commit/4c6cd33b) :point_right: ( [dependabot[bot]](https://github.com/dependabot[bot]) )

## v2.0.0-rc.19(2021-11-09)

### :tada: Enhancements

1. [feat(grid): support onDigest](https://github.com/alibaba/formily/commit/3c857a24) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(grid): add strictAutoFit option (#2403)](https://github.com/alibaba/formily/commit/56a39c42) :point_right: ( [liuwei](https://github.com/liuwei) )

### :bug: Bug Fixes

1. [fix(grid): fix grid calculate failed when container was hidden (#2400)](https://github.com/alibaba/formily/commit/18a09d42) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix reset should clear field caches (#2401)](https://github.com/alibaba/formily/commit/6b1162ad) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(reactive): fix computed/tracker did not recollect dependencies (#2398)](https://github.com/alibaba/formily/commit/6544abbb) :point_right: ( [Janry](https://github.com/Janry) )

### :memo: Documents Changes

1. [docs(core): update links in Form model Chinese doc (#2414)](https://github.com/alibaba/formily/commit/d6cdf71a) :point_right: ( [haloworld](https://github.com/haloworld) )

### :rose: Improve code quality

1. [refactor(grid): use data-grid-span for base grid span](https://github.com/alibaba/formily/commit/712aba94) :point_right: ( [janrywang](https://github.com/janrywang) )

### :rocket: Improve Performance

1. [perf(core): improve field errors/success/warnings read performance](https://github.com/alibaba/formily/commit/32eca498) :point_right: ( [janrywang](https://github.com/janrywang) )

### :hammer_and_wrench: Update Workflow Scripts

1. [build(sourcemap): add "sourcesContent" to the output source map (#2399)](https://github.com/alibaba/formily/commit/3305cf80) :point_right: ( [zengguirong](https://github.com/zengguirong) )

### :blush: Other Changes

1. [chore(core): improve code](https://github.com/alibaba/formily/commit/fa53832c) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(core): improve getFormGraph/setFormGraph performance](https://github.com/alibaba/formily/commit/fb217f2a) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-rc.18(2021-11-03)

### :tada: Enhancements

1. [feat(element): add ArrayTable/ArrayCollapse/ArrayTabs event (#2365)](https://github.com/alibaba/formily/commit/d54cdb8b) :point_right: ( [Muyao](https://github.com/Muyao) )

### :bug: Bug Fixes

1. [fix(reactive): fix computed value can not get real value (#2389)](https://github.com/alibaba/formily/commit/eb34b2de) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix default is not work when name is length (#2387)](https://github.com/alibaba/formily/commit/0adf07ab) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix: fix decorator attrs is not passed down correctly (#2369)](https://github.com/alibaba/formily/commit/fee4af03) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [fix(vue): view should updated when schema changed (#2354)](https://github.com/alibaba/formily/commit/4b3d092d) :point_right: ( [Amorites](https://github.com/Amorites) )

1. [fix(json-schema): fix typings and x-reactions.when (#2360)](https://github.com/alibaba/formily/commit/19e8a4b2) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): make exchangeArrayState be right when move (#2357)](https://github.com/alibaba/formily/commit/a2189465) :point_right: ( [折木](https://github.com/折木) )

1. [fix(react): fix incorrect dts in useFieldSchema (#2350)](https://github.com/alibaba/formily/commit/e8781032) :point_right: ( [Jingkun Hua](https://github.com/Jingkun Hua) )

1. [fix(element): fix style path error (#2348)](https://github.com/alibaba/formily/commit/fada2357) :point_right: ( [Muyao](https://github.com/Muyao) )

### :memo: Documents Changes

1. [docs: fix scenes url (#2384)](https://github.com/alibaba/formily/commit/3538b171) :point_right: ( [PlutoCA](https://github.com/PlutoCA) )

1. [docs: add issues-helper badge (#2359)](https://github.com/alibaba/formily/commit/a99feb43) :point_right: ( [xrkffgg](https://github.com/xrkffgg) )

### :rose: Improve code quality

1. [refactor(core): revert field unmount to skip validate (#2379)](https://github.com/alibaba/formily/commit/8a016794) :point_right: ( [Janry](https://github.com/Janry) )

### :blush: Other Changes

1. [chore(antd/next): improve array table ui (#2373)](https://github.com/alibaba/formily/commit/831ba8b8) :point_right: ( [Janry](https://github.com/Janry) )

## v2.0.0-rc.17(2021-10-23)

### :tada: Enhancements

1. [feat(element): support breakpoints for FormLayout (#2340)](https://github.com/alibaba/formily/commit/345d5f18) :point_right: ( [Muyao](https://github.com/Muyao) )

### :bug: Bug Fixes

1. [fix(core): fix initialValues merge with no fields (#2339)](https://github.com/alibaba/formily/commit/9c2ebc36) :point_right: ( [Janry](https://github.com/Janry) )

### :blush: Other Changes

1. [chore(grid): improve grid responsive effects](https://github.com/alibaba/formily/commit/bbb1a5a8) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-rc.16(2021-10-21)

### :tada: Enhancements

1. [feat(next/antd): support breakpoints for FormLayout (#2336)](https://github.com/alibaba/formily/commit/c894adc8) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [feat(grid): support smart gridSpan -1](https://github.com/alibaba/formily/commit/01ee70d8) :point_right: ( [janrywang](https://github.com/janrywang) )

### :bug: Bug Fixes

1. [fix(grid): fix calcSatisfyColumns](https://github.com/alibaba/formily/commit/04dead36) :point_right: ( [janrywang](https://github.com/janrywang) )

### :memo: Documents Changes

1. [docs: update issue-helper api](https://github.com/alibaba/formily/commit/22877f1c) :point_right: ( [janrywang](https://github.com/janrywang) )

### :rose: Improve code quality

1. [refactor(element): redesign form-grid and improve form-layout (#2337)](https://github.com/alibaba/formily/commit/9e468fae) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [refactor(antd/next/element): adjust the read priority of Form context](https://github.com/alibaba/formily/commit/f0c29bbc) :point_right: ( [janrywang](https://github.com/janrywang) )

### :rocket: Improve Performance

1. [perf(grid): improve grid performance](https://github.com/alibaba/formily/commit/7c60bc1e) :point_right: ( [janrywang](https://github.com/janrywang) )

### :blush: Other Changes

1. [chore(antd/next): improve code](https://github.com/alibaba/formily/commit/506eb129) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(grid): update readme](https://github.com/alibaba/formily/commit/9738292c) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-rc.15(2021-10-16)

### :tada: Enhancements

1. [feat(element): support useRecord for ArrayBase (#2313)](https://github.com/alibaba/formily/commit/74594663) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [feat(next): fix FormDialog footerActions/okProps/cancelProps (#2312)](https://github.com/alibaba/formily/commit/e2fe6734) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [feat(vue): support useParentForm hook (#2306)](https://github.com/alibaba/formily/commit/13008d1f) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [feat(json-schema): support extend schema property (#2284)](https://github.com/alibaba/formily/commit/67ca5e58) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(next/antd): fix ArrayCards/ArrayTable/ArrayCollapse demo bug (#2283)](https://github.com/alibaba/formily/commit/85ab1078) :point_right: ( [Lyca](https://github.com/Lyca) )

### :bug: Bug Fixes

1. [fix(antd/next): fix style compiler error (#2310)](https://github.com/alibaba/formily/commit/44adf04b) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(schema): fix setValidateRule will throw error when use void field (#2281)](https://github.com/alibaba/formily/commit/d752b221) :point_right: ( [Janry](https://github.com/Janry) )

### :rose: Improve code quality

1. [refactor(react): silent useForm for child form sence (#2302)](https://github.com/alibaba/formily/commit/c2c2e305) :point_right: ( [Janry](https://github.com/Janry) )

## v2.0.0-rc.14(2021-10-11)

### :bug: Bug Fixes

1. [fix(core): fix validate lifecycle wrong trigger in skip digest (#2279)](https://github.com/alibaba/formily/commit/1ac87fb4) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(reactive): fix reaction force untrack will effect to setState (#2278)](https://github.com/alibaba/formily/commit/17b9315e) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(validator): getValidatorLocale Maximum call stack size exceeded (#2273)](https://github.com/alibaba/formily/commit/200253e0) :point_right: ( [Suel](https://github.com/Suel) )

## v2.0.0-rc.13(2021-10-05)

### :bug: Bug Fixes

1. [fix(reactive): fix batch api can not throw error (#2268)](https://github.com/alibaba/formily/commit/07227ad2) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix validate skip (#2265)](https://github.com/alibaba/formily/commit/4c1cfeda) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(vue): fix the problem that the component class name will be overwritten rather than merged (#2260)](https://github.com/alibaba/formily/commit/73053737) :point_right: ( [月落音阑](https://github.com/月落音阑) )

### :rose: Improve code quality

1. [refactor(core): reduce core package size (#2261)](https://github.com/alibaba/formily/commit/84f3fc1b) :point_right: ( [Janry](https://github.com/Janry) )

## v2.0.0-rc.12(2021-09-29)

### :tada: Enhancements

1. [feat(next/antd): change ArrayBase.Addition disabled UI (#2251)](https://github.com/alibaba/formily/commit/bfd832af) :point_right: ( [Lyca](https://github.com/Lyca) )

### :bug: Bug Fixes

1. [fix(core): fix reactions initial value will overwrite value (#2252)](https://github.com/alibaba/formily/commit/c4ca495d) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(element): fix form props pass bug (#2253)](https://github.com/alibaba/formily/commit/71859771) :point_right: ( [Muyao](https://github.com/Muyao) )

### :memo: Documents Changes

1. [docs(reactive): update reactive docs](https://github.com/alibaba/formily/commit/db4c35ff) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs: update errors to use selfErrors](https://github.com/alibaba/formily/commit/731ddc02) :point_right: ( [janrywang](https://github.com/janrywang) )

### :blush: Other Changes

1. [chore: update build scripts](https://github.com/alibaba/formily/commit/563c9fe8) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-rc.11(2021-09-25)

### :bug: Bug Fixes

1. [fix(core/json-schema): fix props unexpect patch and field reactions unexpect react (#2232)](https://github.com/alibaba/formily/commit/62fbe265) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(antd/next): remove duplicated exports (#2231)](https://github.com/alibaba/formily/commit/2c8cedb1) :point_right: ( [Robin Wong](https://github.com/Robin Wong) )

1. [fix(vue): fix vue2 scopedSlot and slot pass problem (#2221)](https://github.com/alibaba/formily/commit/2489182c) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [fix(antd/next): fix FormDialog typings](https://github.com/alibaba/formily/commit/4b170ca7) :point_right: ( [janrywang](https://github.com/janrywang) )

### :memo: Documents Changes

1. [docs(vue): add more scopedSlot content tests and readme (#2226)](https://github.com/alibaba/formily/commit/ff7e790f) :point_right: ( [lirui](https://github.com/lirui) )

1. [docs(project): update login-register.md](https://github.com/alibaba/formily/commit/79f948b3) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [doc: fix typo for Ant Design in docs/guide/quick-start.md (#2201)](https://github.com/alibaba/formily/commit/151f6845) :point_right: ( [vagusX](https://github.com/vagusX) )

### :rose: Improve code quality

1. [refactor(element): refactor element slot pass way (#2236)](https://github.com/alibaba/formily/commit/da28fe7e) :point_right: ( [Muyao](https://github.com/Muyao) )

### :rocket: Improve Performance

1. [perf(antd/next): improve FormItem render performance (#2237)](https://github.com/alibaba/formily/commit/64445d09) :point_right: ( [Janry](https://github.com/Janry) )

### :blush: Other Changes

1. [chore: update ci.yml](https://github.com/alibaba/formily/commit/4845ddfe) :point_right: ( [Janry](https://github.com/Janry) )

## v2.0.0-rc.10(2021-09-21)

### :bug: Bug Fixes

1. [fix(core): fix initialValues patch values with wrong type (#2214)](https://github.com/alibaba/formily/commit/334ff1bc) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(element): fix select label error (#2202)](https://github.com/alibaba/formily/commit/c8b513e0) :point_right: ( [Muyao](https://github.com/Muyao) )

### :memo: Documents Changes

1. [docs(vue/element): add codesandbox support (#2206)](https://github.com/alibaba/formily/commit/07739bb9) :point_right: ( [Muyao](https://github.com/Muyao) )

### :rocket: Improve Performance

1. [perf(path): use Map replace LRUMap](https://github.com/alibaba/formily/commit/1141e580) :point_right: ( [janrywang](https://github.com/janrywang) )

### :blush: Other Changes

1. [chore(workflow): update ci actions](https://github.com/alibaba/formily/commit/aba1e3f0) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(deps-dev): bump semver-regex from 2.0.0 to 3.1.3 (#2209)](https://github.com/alibaba/formily/commit/94a6ffcc) :point_right: ( [dependabot[bot]](https://github.com/dependabot[bot]) )

1. [chore(desingbale): move designable-antd/next to designable repo](https://github.com/alibaba/formily/commit/84327d2d) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-rc.9(2021-09-18)

### :tada: Enhancements

1. [feat(element): support element-ui slot (#2162)](https://github.com/alibaba/formily/commit/205e164c) :point_right: ( [Muyao](https://github.com/Muyao) )

### :bug: Bug Fixes

1. [fix(core): fix assign initialValue will overwrite value](https://github.com/alibaba/formily/commit/3fbb8697) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-rc.8(2021-09-17)

### :tada: Enhancements

1. [feat(react): fix schema x-component-props children invalid (#2160)](https://github.com/alibaba/formily/commit/7dc9d9ff) :point_right: ( [Lyca](https://github.com/Lyca) )

### :memo: Documents Changes

1. [docs(reactive): update toJS/markRaw docs](https://github.com/alibaba/formily/commit/77cb7b7b) :point_right: ( [janrywang](https://github.com/janrywang) )

### :rocket: Improve Performance

1. [perf(schema): improve performance](https://github.com/alibaba/formily/commit/184884ca) :point_right: ( [janrywang](https://github.com/janrywang) )

### :blush: Other Changes

1. [chore(workflow): fix actions](https://github.com/alibaba/formily/commit/12dacdcc) :point_right: ( [Janry](https://github.com/Janry) )

1. [chore(designable): lock version](https://github.com/alibaba/formily/commit/b61ad907) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-rc.7(2021-09-15)

### :bug: Bug Fixes

1. [fix(json-schema/reactive): fix circular reference check logic](https://github.com/alibaba/formily/commit/b356dad3) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-rc.6(2021-09-14)

### :bug: Bug Fixes

1. [fix(react): fix x-component-props is not reactive](https://github.com/alibaba/formily/commit/d91ebfff) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-rc.5(2021-09-14)

### :tada: Enhancements

1. [feat(element): add FormCollapse component (#2119)](https://github.com/alibaba/formily/commit/48ed7b08) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [feat(element): radio/checkbox add optionType prop (#2114)](https://github.com/alibaba/formily/commit/54072a67) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [feat(next/antd): add tooltipIcon props to FormLayout & FormItem (#2085)](https://github.com/alibaba/formily/commit/1a817918) :point_right: ( [Lyca](https://github.com/Lyca) )

### :bug: Bug Fixes

1. [fix(antd/next): fix props.prefix is not work for FormGrid/FormLayout (#2151)](https://github.com/alibaba/formily/commit/bcdac582) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix array unshift with incomplete elements (#2150)](https://github.com/alibaba/formily/commit/64633714) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(path): fix path match destructor (#2148)](https://github.com/alibaba/formily/commit/f621d989) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(next/antd/vue): fix Switch type & add classname to ArrayItems.Index (#2093)](https://github.com/alibaba/formily/commit/9f875692) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [fix(designable): fix Uncaught SyntaxError (#1997) (#2089)](https://github.com/alibaba/formily/commit/b56b5b28) :point_right: ( [youshao](https://github.com/youshao) )

1. [fix(reactive-react): fix observer 2nd generic type (#2071)](https://github.com/alibaba/formily/commit/4b18a6ba) :point_right: ( [Yanlin Jiang](https://github.com/Yanlin Jiang) )

1. [fix(core): unmounted field skip validation (#2066)](https://github.com/alibaba/formily/commit/5739fdad) :point_right: ( [null](https://github.com/null) )

### :memo: Documents Changes

1. [docs(core): add data docs](https://github.com/alibaba/formily/commit/e684bb71) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs: add notice for onFormValuesChange (#2146)](https://github.com/alibaba/formily/commit/c8176e53) :point_right: ( [月落音阑](https://github.com/月落音阑) )

1. [docs(site): update Pack on Demand doc (#2086)](https://github.com/alibaba/formily/commit/c0c50ace) :point_right: ( [vimvinter](https://github.com/vimvinter) )

### :rose: Improve code quality

1. [refactor(project): support more features for page description (#2099)](https://github.com/alibaba/formily/commit/6162ad5d) :point_right: ( [Janry](https://github.com/Janry) )

### :blush: Other Changes

1. [chore(project): improve code](https://github.com/alibaba/formily/commit/bc4945e6) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(designable): remove designable workspace](https://github.com/alibaba/formily/commit/0da67a3e) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-rc.4(2021-08-26)

### :tada: Enhancements

1. [feat(designable): add icons for drag source](https://github.com/alibaba/formily/commit/8c14fa6e) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(designable): support componentsIcon/componentsSourceIcon](https://github.com/alibaba/formily/commit/5255e0da) :point_right: ( [janrywang](https://github.com/janrywang) )

### :bug: Bug Fixes

1. [fix(core): fix add effects memo leak in form umount (#2050)](https://github.com/alibaba/formily/commit/f753ba12) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(element): remove Formily namepsace usecase](https://github.com/alibaba/formily/commit/0cc90672) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(vue): fix 'x-content' render named slot not work (#2046)](https://github.com/alibaba/formily/commit/71fb9814) :point_right: ( [jiezi19971225](https://github.com/jiezi19971225) )

1. [fix(designable-antd): fix locales](https://github.com/alibaba/formily/commit/27be2651) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(designable): fix can not drag object to array cards in initialization](https://github.com/alibaba/formily/commit/99b46a3e) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(next): fix usePrefixCls tag undefined (#2042)](https://github.com/alibaba/formily/commit/9af2dda7) :point_right: ( [hellohy](https://github.com/hellohy) )

1. [fix(next): fix formitem inset boder (#2039)](https://github.com/alibaba/formily/commit/19176530) :point_right: ( [Lyca](https://github.com/Lyca) )

### :blush: Other Changes

1. [chore(designable): update dn deps](https://github.com/alibaba/formily/commit/3b92370a) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(react): compat ReactNative with SchemaField only json-schema mode](https://github.com/alibaba/formily/commit/77dd47e4) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(designable): improve DesignableText experience](https://github.com/alibaba/formily/commit/0f0285da) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-rc.3(2021-08-20)

### :blush: Other Changes

1. [chore(project): update yarn.lock](https://github.com/alibaba/formily/commit/be3a1939) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(designable): update dn](https://github.com/alibaba/formily/commit/3ef53458) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-rc.2(2021-08-19)

### :bug: Bug Fixes

1. [fix(element): fix simple array key (#2024)](https://github.com/alibaba/formily/commit/7e368d6f) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [fix(next): fix usePrefixCls](https://github.com/alibaba/formily/commit/da058e63) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(next): fix fullness icon width (#2020)](https://github.com/alibaba/formily/commit/8c4651fb) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [fix(designable-next): fix card styles](https://github.com/alibaba/formily/commit/889a3af7) :point_right: ( [janrywang](https://github.com/janrywang) )

### :memo: Documents Changes

1. [docs(site): update controlled docs](https://github.com/alibaba/formily/commit/b13c3433) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-rc.1(2021-08-13)

### No Change Log

## v2.0.0-rc.0(2021-08-13)

### :bug: Bug Fixes

1. [fix(antd): fix form size=large bug (#1998) (#2008)](https://github.com/alibaba/formily/commit/3edd6e89) :point_right: ( [Grapedge](https://github.com/Grapedge) )

1. [fix(designable-next): fix style and support history (#2007)](https://github.com/alibaba/formily/commit/7e9c9cbd) :point_right: ( [Grapedge](https://github.com/Grapedge) )

1. [fix(next): fix range and transfer styles in FormItem](https://github.com/alibaba/formily/commit/cd9c2159) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(next): fix config provider prefix bug (#2000) (#2002)](https://github.com/alibaba/formily/commit/32746f77) :point_right: ( [Grapedge](https://github.com/Grapedge) )

### :memo: Documents Changes

1. [docs(site): update form builder docs](https://github.com/alibaba/formily/commit/05799d48) :point_right: ( [janrywang](https://github.com/janrywang) )

### :rose: Improve code quality

1. [refactor(json-schema): use with statement for compiler](https://github.com/alibaba/formily/commit/f913b35b) :point_right: ( [janrywang](https://github.com/janrywang) )

### :blush: Other Changes

1. [chore(designable): add links](https://github.com/alibaba/formily/commit/507bcfe9) :point_right: ( [janrywang](https://github.com/janrywang) )

## v2.0.0-beta.89(2021-08-12)

### :tada: Enhancements

1. [feat(designable-antd): support restrictSiblingsComponents (#1984)](https://github.com/alibaba/formily/commit/1b72d11c) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(core): support field destroy method (#1895)](https://github.com/alibaba/formily/commit/52457e10) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(antd/next): improve FormDialog/FormDrawer typings and api (#1886)](https://github.com/alibaba/formily/commit/e3d7d264) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(setters): add ValidatorSetter (#1885)](https://github.com/alibaba/formily/commit/4e2203e7) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(element): update array-table component & doc (#1862)](https://github.com/alibaba/formily/commit/f98129a9) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [feat(shared): add middleware function (#1858)](https://github.com/alibaba/formily/commit/e54525da) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(packages): add react 18 test cases (#1834)](https://github.com/alibaba/formily/commit/aa792203) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(reactive): support autorun.memo/autorun.effect (#1819)](https://github.com/alibaba/formily/commit/e43dda6a) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(project): support bundle dts (#1796)](https://github.com/alibaba/formily/commit/5f8c1879) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(form-dialog): add form dialog and form drawer oncancel return value (#1791)](https://github.com/alibaba/formily/commit/f08de0dc) :point_right: ( [张威](https://github.com/张威) )

1. [feat(gitignore): support ignore .history directory (#1792)](https://github.com/alibaba/formily/commit/0035e61c) :point_right: ( [张威](https://github.com/张威) )

1. [feat(antd): transfer compat label/value](https://github.com/alibaba/formily/commit/2be3a10d) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(element): add element support (#1734)](https://github.com/alibaba/formily/commit/43d1ef0b) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [feat(core): skip validate when parent.visible is equal hidden/none (#1712)](https://github.com/alibaba/formily/commit/0076ef7d) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(vue): add components prop for schema-field (#1686)](https://github.com/alibaba/formily/commit/e9dec48f) :point_right: ( [月落音阑](https://github.com/月落音阑) )

1. [feat(antd): improve Submit API (#1640)](https://github.com/alibaba/formily/commit/6b33ec9c) :point_right: ( [后浪](https://github.com/后浪) )

1. [feat(reactive-react): support Observer Component like vue slot](https://github.com/alibaba/formily/commit/a49ee263) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(antd/next): support inherit mode to FormItem](https://github.com/alibaba/formily/commit/da7423d4) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(antd/next): add Form and Submit components submitFailed callback events (#1597)](https://github.com/alibaba/formily/commit/2517f807) :point_right: ( [后浪](https://github.com/后浪) )

1. [feat(antd/next): add tree-shaking support for antd/next (#1544)](https://github.com/alibaba/formily/commit/6835f6d2) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [feat(json-schema): add silent static method](https://github.com/alibaba/formily/commit/f1277ba2) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(designable): add SchemaRenderWidget](https://github.com/alibaba/formily/commit/ef49b45f) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(next): add ArrayCollapse (#1513)](https://github.com/alibaba/formily/commit/ebddc015) :point_right: ( [Lind](https://github.com/Lind) )

1. [feat(core): support more types for dataSource](https://github.com/alibaba/formily/commit/6715555e) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(next): support form drawer get context from fusion (#1511)](https://github.com/alibaba/formily/commit/7fce306c) :point_right: ( [王大白](https://github.com/王大白) )

1. [feat(json-schema): support extend proeperties to x-reactions](https://github.com/alibaba/formily/commit/439b7976) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(next): add fusion multiple lang of validator (#1504)](https://github.com/alibaba/formily/commit/2ca07e7a) :point_right: ( [王大白](https://github.com/王大白) )

1. [feat(antd): support defaultOpenPanelCount for ArrayCollapse (#1505)](https://github.com/alibaba/formily/commit/e9e3f74e) :point_right: ( [Lind](https://github.com/Lind) )

1. [feat(next): add stopPropagation to array-base events](https://github.com/alibaba/formily/commit/276a5fbb) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(core): remove property of form values with undefined value (#1495)](https://github.com/alibaba/formily/commit/296eae47) :point_right: ( [小黄黄](https://github.com/小黄黄) )

1. [feat(core): support value change trigger validate](https://github.com/alibaba/formily/commit/0473017a) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(core): add extra strategy for merge form value (#1448)](https://github.com/alibaba/formily/commit/0b5606d1) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [feat(vue): improve typings and docs(#1433)](https://github.com/alibaba/formily/commit/fc5d6650) :point_right: ( [月落音阑](https://github.com/月落音阑) )

1. [feat(.md): Form => FormLayout (#1427)](https://github.com/alibaba/formily/commit/2501e72f) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [feat(next): improve form-item styles](https://github.com/alibaba/formily/commit/315c3141) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat: url regexp support /?a=1 and ?a=1 (#1374)](https://github.com/alibaba/formily/commit/4fed6246) :point_right: ( [No.96](https://github.com/No.96) )

1. [feat(shared): remove isValidElement types dependency](https://github.com/alibaba/formily/commit/b649228f) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(react): add context cleaner to FormProvider](https://github.com/alibaba/formily/commit/b1eab98a) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(json-schema): add error when x-component can not found](https://github.com/alibaba/formily/commit/8bc884b3) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(form-item): support string format for labelWidth/wrapperWidth](https://github.com/alibaba/formily/commit/228e259c) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(effects): normoalize onFieldInit](https://github.com/alibaba/formily/commit/98922c8a) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat: add build style (#1201)](https://github.com/alibaba/formily/commit/3ceedb11) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [feat(project): rename fullfill=>fulfill](https://github.com/alibaba/formily/commit/0b794f11) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(reactive): recover batch.scope](https://github.com/alibaba/formily/commit/aeeb9f94) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(antd/next): update extract css name](https://github.com/alibaba/formily/commit/ea3d5194) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat: applicable less and scss to vite (#1187)](https://github.com/alibaba/formily/commit/fb011768) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [feat(reactive): computed annotation](https://github.com/alibaba/formily/commit/b9e6f092) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat: add logic-diagram to Next and AntD (TBD) (#1158)](https://github.com/alibaba/formily/commit/5626d97d) :point_right: ( [soulwu](https://github.com/soulwu) )

1. [feat(FormGrid): update](https://github.com/alibaba/formily/commit/6da06dbf) :point_right: ( [ZirkleTsing](https://github.com/ZirkleTsing) )

1. [feat: update antd message style](https://github.com/alibaba/formily/commit/b6d87da6) :point_right: ( [quirkyshop](https://github.com/quirkyshop) )

1. [feat(react): update mapProps](https://github.com/alibaba/formily/commit/7940cab8) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat: move param-case to shared (#1152)](https://github.com/alibaba/formily/commit/6106257b) :point_right: ( [月落音阑](https://github.com/月落音阑) )

1. [feat: add feedback layout](https://github.com/alibaba/formily/commit/df56cded) :point_right: ( [quirkyshop](https://github.com/quirkyshop) )

1. [feat: update 'feedbackText'](https://github.com/alibaba/formily/commit/9e71f0c9) :point_right: ( [quirkyshop](https://github.com/quirkyshop) )

1. [feat: add formitem demo](https://github.com/alibaba/formily/commit/5a263e68) :point_right: ( [guishu.zc](https://github.com/guishu.zc) )

1. [feat(vue): add vue3 compatibly (#1138)](https://github.com/alibaba/formily/commit/ac3783df) :point_right: ( [月落音阑](https://github.com/月落音阑) )

1. [feat(schema-field): move transformer to json-schema package](https://github.com/alibaba/formily/commit/69677e1d) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(react): connect add hoistNonReactStatics](https://github.com/alibaba/formily/commit/9b68f1ef) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(core): add more effects](https://github.com/alibaba/formily/commit/5b42226d) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(core): support ArrayBase component](https://github.com/alibaba/formily/commit/aa184f71) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(styles): support prefixCls](https://github.com/alibaba/formily/commit/fe53ac42) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat: add `tooltip` into FormItem`s props (#1079)](https://github.com/alibaba/formily/commit/bf360963) :point_right: ( [yezihaohao](https://github.com/yezihaohao) )

1. [feat: update alignment (#1060)](https://github.com/alibaba/formily/commit/fadb3f7d) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat(core): support enableUnmountRemoveNode/disableUnmountRemoveNode API](https://github.com/alibaba/formily/commit/8f99e5b3) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat: add registerPreviewTextComponent (#1041)](https://github.com/alibaba/formily/commit/4b0f9768) :point_right: ( [soulwu](https://github.com/soulwu) )

1. [feat: Add ja validation language (#1028) (#1029)](https://github.com/alibaba/formily/commit/6b65fbb9) :point_right: ( [Yaodong Li](https://github.com/Yaodong Li) )

1. [feat(layout/docs): update docs and fix layout (#1003)](https://github.com/alibaba/formily/commit/16be58cc) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat(schema): add nested form polyfill (#972)](https://github.com/alibaba/formily/commit/6deb86d9) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat(components): add FormMegaLayout className (#935)](https://github.com/alibaba/formily/commit/7a2ad9e2) :point_right: ( [changfuguo](https://github.com/changfuguo) )

1. [feat: add span to array-card dot for custom style (#922)](https://github.com/alibaba/formily/commit/4b2833d5) :point_right: ( [slientcloud](https://github.com/slientcloud) )

1. [feat(layout): support responsive gri layout for older browsers (#916)](https://github.com/alibaba/formily/commit/f87e70dc) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat: support antd v3 (#913)](https://github.com/alibaba/formily/commit/7b4cf527) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat: add ie compat mode of grid(ie) (#912)](https://github.com/alibaba/formily/commit/b7313976) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat(layout): add ts type desc of MegaLayout and fix array-inc doc (#905)](https://github.com/alibaba/formily/commit/f37a0934) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat(layout): add inset mode for mega layout (#900)](https://github.com/alibaba/formily/commit/6f173317) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat: update snapshot and layout test for nested grid (#894)](https://github.com/alibaba/formily/commit/72619eca) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat: compile expression for array-table column title (#868)](https://github.com/alibaba/formily/commit/48fbcf0f) :point_right: ( [soulwu](https://github.com/soulwu) )

1. [feat(docs): add antd TimePicker.RangePicker demo. (#811)](https://github.com/alibaba/formily/commit/fab22309) :point_right: ( [ShiCheng](https://github.com/ShiCheng) )

1. [feat(antd-components): add default export (#810)](https://github.com/alibaba/formily/commit/0b4e64da) :point_right: ( [kenve](https://github.com/kenve) )

1. [feat: add formily-meet documents (#797)](https://github.com/alibaba/formily/commit/03bbd0b7) :point_right: ( [DarK-AleX-alibaba](https://github.com/DarK-AleX-alibaba) )

1. [feat(core): remove initializeLazySyncState](https://github.com/alibaba/formily/commit/70094beb) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat(schema-renderer): support relative target path (#779)](https://github.com/alibaba/formily/commit/f5fe4061) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(docs): add service worker cache (#745)](https://github.com/alibaba/formily/commit/a5879b72) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat: add recursive-render doc and fix some bugs (#736)](https://github.com/alibaba/formily/commit/d7199d82) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(hooks): add onSubmit hook and docs (#727)](https://github.com/alibaba/formily/commit/b99be566) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat(core): support pass FormPathPattern to createMutators, and fix some typings (#728)](https://github.com/alibaba/formily/commit/c0798c6d) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(core): change visible behavior to fix array list delete auto assign value not work (#725)](https://github.com/alibaba/formily/commit/366047e6) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(prject): access unified log module (#723)](https://github.com/alibaba/formily/commit/750ef0af) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(shared): support BigData (#708)](https://github.com/alibaba/formily/commit/7343b960) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat: add wiki (#705)](https://github.com/alibaba/formily/commit/9b2126c9) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat: url type support rtmp (#686)](https://github.com/alibaba/formily/commit/084cbc03) :point_right: ( [Desen Meng](https://github.com/Desen Meng) )

1. [feat: add components and hooks (#670)](https://github.com/alibaba/formily/commit/ef9bc68e) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat: schema editor support json to schema (#639)](https://github.com/alibaba/formily/commit/8c4782ab) :point_right: ( [大康](https://github.com/大康) )

1. [feat(@uform/devtools): update lerna config (#635)](https://github.com/alibaba/formily/commit/7ca92451) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(@uform/core): reset add clearInitialValue (#627)](https://github.com/alibaba/formily/commit/02e715ce) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat: update formitem props (#614)](https://github.com/alibaba/formily/commit/1ff5f8bc) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat: use react-drag-listview instead of ReactDnD and support antd draggable table (#609)](https://github.com/alibaba/formily/commit/88ce573b) :point_right: ( [soulwu](https://github.com/soulwu) )

1. [feat(@uform/core)support visible cache values and intialValues sync action (#588)](https://github.com/alibaba/formily/commit/7bceed76) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat: support change fieldKey](https://github.com/alibaba/formily/commit/ffc8f6a7) :point_right: ( [ziyi.hzy](https://github.com/ziyi.hzy) )

1. [feat: add dragable to @uform/next table field (#561)](https://github.com/alibaba/formily/commit/4c947306) :point_right: ( [soulwu](https://github.com/soulwu) )

1. [featfix(@uform/react-schema-renderer/antd/next) doc and depreacate x-render (#557)](https://github.com/alibaba/formily/commit/2bd1503b) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat: FieldEditor UI 优化](https://github.com/alibaba/formily/commit/071058e4) :point_right: ( [秋逢](https://github.com/秋逢) )

1. [feat: update unitest and document (#476)](https://github.com/alibaba/formily/commit/8c49ca9a) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat: json to basic schema (#450)](https://github.com/alibaba/formily/commit/785a760d) :point_right: ( [大康](https://github.com/大康) )

1. [feat: 表达式 value](https://github.com/alibaba/formily/commit/73c90914) :point_right: ( [秋逢](https://github.com/秋逢) )

1. [feat: fix bug](https://github.com/alibaba/formily/commit/bfd76328) :point_right: ( [ascoders](https://github.com/ascoders) )

1. [feat(@uform/next): update next features (#439)](https://github.com/alibaba/formily/commit/15b6b43e) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(@uform/react): actions support clearErrors (#434)](https://github.com/alibaba/formily/commit/551d74c1) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat: 规则](https://github.com/alibaba/formily/commit/fa6215dc) :point_right: ( [秋逢](https://github.com/秋逢) )

1. [feat(@uform/react): remove raf and fix unittest (#422)](https://github.com/alibaba/formily/commit/670fadbe) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat(@uform/core): support pass visible/display of register method (#421)](https://github.com/alibaba/formily/commit/908882a2) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat: support useFormEffects (#403)](https://github.com/alibaba/formily/commit/dff959c8) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat: 临时交互对焦](https://github.com/alibaba/formily/commit/bed060ff) :point_right: ( [秋逢](https://github.com/秋逢) )

1. [feat: add docs and some test cases (#395)](https://github.com/alibaba/formily/commit/ecff8eff) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat: add react/actions tests](https://github.com/alibaba/formily/commit/21ee40b1) :point_right: ( [anyuxuan](https://github.com/anyuxuan) )

1. [feat: 添加 next components schema](https://github.com/alibaba/formily/commit/1b184a6c) :point_right: ( [秋逢](https://github.com/秋逢) )

1. [feat: add silent option (#377)](https://github.com/alibaba/formily/commit/43771809) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [feat(shared): add unit test (#374)](https://github.com/alibaba/formily/commit/9cd72725) :point_right: ( [s0ngyee](https://github.com/s0ngyee) )

1. [feat(docs): support deconstruction (#179)](https://github.com/alibaba/formily/commit/b114c9e7) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(@uform/types): improve types (#168)](https://github.com/alibaba/formily/commit/0e6fd69c) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(@uform/core): Improve noValidate reset logic](https://github.com/alibaba/formily/commit/efaa75a8) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [feat: update the api docs using typescript (#149)](https://github.com/alibaba/formily/commit/5a9ea5a2) :point_right: ( [Kevin Tan](https://github.com/Kevin Tan) )

1. [feat: make scheduler optional (#141)](https://github.com/alibaba/formily/commit/ed52e4a7) :point_right: ( [Kevin Tan](https://github.com/Kevin Tan) )

1. [feat(@uform/antd/next): Optimize the description of the word count calculation rules and docs #117](https://github.com/alibaba/formily/commit/65c449e0) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(@uform/antd): support form layout properties #116](https://github.com/alibaba/formily/commit/e9cc882d) :point_right: ( [Janry](https://github.com/Janry) )

1. [feat(refactor): perfect test suites and add builder demo in docs (#100)](https://github.com/alibaba/formily/commit/ada8ba9f) :point_right: ( [SkyCai](https://github.com/SkyCai) )

1. [feat(@uform/utils): support ts, but build scripts is not work](https://github.com/alibaba/formily/commit/8e452149) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [feat(@uform/next): add disabled when loading](https://github.com/alibaba/formily/commit/1b1d70db) :point_right: ( [monkindey](https://github.com/monkindey) )

1. [feat(@uform/react): Optimize package size and fixing onFieldChange initialization trigger twice](https://github.com/alibaba/formily/commit/a98c247b) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [feat(packages): some the antd component and the react component](https://github.com/alibaba/formily/commit/c663abc0) :point_right: ( [zsirfs](https://github.com/zsirfs) )

1. [feat(fix): add builder-next package and fix builder bugs. fix(docs): update playground link and fix some bugs](https://github.com/alibaba/formily/commit/71e6af8a) :point_right: ( [cnt1992](https://github.com/cnt1992) )

1. [feat(@uform/next/antd): support mapTextComponent and mapStyledProps](https://github.com/alibaba/formily/commit/b0f7134d) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [feat(utils): export path destruct string parse methods.](https://github.com/alibaba/formily/commit/1bded6c3) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [feat(fix): fix style](https://github.com/alibaba/formily/commit/7841970d) :point_right: ( [janryWang](https://github.com/janryWang) )

### :bug: Bug Fixes

1. [fix(next): fix node scss error (#1995)](https://github.com/alibaba/formily/commit/266e916a) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(reactive): fix dispose omission clean pendding reactions (#1994)](https://github.com/alibaba/formily/commit/a60134b2) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix array nested remove (#1989)](https://github.com/alibaba/formily/commit/2e065593) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(vue): prop "scope" of SchemaField not work with x-reactions (#1976)](https://github.com/alibaba/formily/commit/05e14cea) :point_right: ( [月落音阑](https://github.com/月落音阑) )

1. [fix(core): fix euqal initial empty value will trigger change (#1967)](https://github.com/alibaba/formily/commit/4ccf4e41) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(antd/next): fix FormItem styles (#1966)](https://github.com/alibaba/formily/commit/b4d10955) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(next): fix mapStatus takeState](https://github.com/alibaba/formily/commit/576c9b56) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(antd): fix dark label color](https://github.com/alibaba/formily/commit/c1e5b0f4) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(shared): fix applyMiddleware can not catch error (#1952)](https://github.com/alibaba/formily/commit/22f0379a) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(next): fix FormTab activeKey bug (#1945)](https://github.com/alibaba/formily/commit/29024475) :point_right: ( [Grapedge](https://github.com/Grapedge) )

1. [fix(next): add the default language when the language is undefined (#1939)](https://github.com/alibaba/formily/commit/c74e7f91) :point_right: ( [Grapedge](https://github.com/Grapedge) )

1. [fix(next/designable-antd): fix Select bug && designable-antd spelling error (#1934)](https://github.com/alibaba/formily/commit/739e8c18) :point_right: ( [Grapedge](https://github.com/Grapedge) )

1. [fix(antd/next/element): fix array base addition default value (#1913)](https://github.com/alibaba/formily/commit/5d88e29a) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix setValues/setInitialValues array merge strategy](https://github.com/alibaba/formily/commit/0773b06a) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(next): fix size style in FormItem/main.scss && set default fullness true (#1908)](https://github.com/alibaba/formily/commit/c0e2c126) :point_right: ( [Lyca](https://github.com/Lyca) )

1. [fix(element): fix protal destroy (#1898)](https://github.com/alibaba/formily/commit/1036440c) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [fix(designable-antd): remove switch optionType: 'button' (#1891)](https://github.com/alibaba/formily/commit/c136e349) :point_right: ( [aloha](https://github.com/aloha) )

1. [fix(designable-antd): add default name value](https://github.com/alibaba/formily/commit/a07f1c9a) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(react): fix select type validate error #1838 (#1844)](https://github.com/alibaba/formily/commit/b7975baf) :point_right: ( [张威](https://github.com/张威) )

1. [fix(antd): fix sideEffects mismatch when use babel-plugin-import (#1843)](https://github.com/alibaba/formily/commit/eaccb72a) :point_right: ( [KM.Seven](https://github.com/KM.Seven) )

1. [fix(core): fix object field's children auto clean but they are not additionalProperty (#1840)](https://github.com/alibaba/formily/commit/dd313646) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix ArrayField operation will trigger memo leak (#1831)](https://github.com/alibaba/formily/commit/021c155a) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(path): fix segments match (#1826)](https://github.com/alibaba/formily/commit/6e541dcb) :point_right: ( [砂糖梨子](https://github.com/砂糖梨子) )

1. [fix(vue): fix field doesnt update correctly in designable mode (#1799)](https://github.com/alibaba/formily/commit/837cfc0b) :point_right: ( [月落音阑](https://github.com/月落音阑) )

1. [fix(element): fix vuepress doc not identify fetch (#1769)](https://github.com/alibaba/formily/commit/bc4348e3) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [fix(element): add rollup external to fix element package size (#1766)](https://github.com/alibaba/formily/commit/8104dbfb) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [fix(vue): fix x-content is not work with array type (#1754)](https://github.com/alibaba/formily/commit/66fd1bcd) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [fix(core): fix array value changed but not auto clean node (#1742)](https://github.com/alibaba/formily/commit/83b5f4bf) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(vue): fix vue typing (#1730)](https://github.com/alibaba/formily/commit/b51a2198) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [fix(reactive): fix Tracker memo leak in StrictMode (#1715)](https://github.com/alibaba/formily/commit/e9f23c39) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(json-schema): fix typo about transformer](https://github.com/alibaba/formily/commit/498d3119) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(core): fix lifecycle not working after call form.setXXX (#1699)](https://github.com/alibaba/formily/commit/01c5fb89) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [fix(antd/next): fix event type incorrect of Submit (#1662)](https://github.com/alibaba/formily/commit/acec46fc) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [fix(shared): fix defaults merge with null will get unexpect results #1644](https://github.com/alibaba/formily/commit/d39c426f) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(antd/next): fix Editable is not work with babel-import-plugin #1645](https://github.com/alibaba/formily/commit/cf93945d) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(json-schema): fix findComponent return unexpected result (#1625)](https://github.com/alibaba/formily/commit/3453c69d) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [fix(antd/next): remove FormButtonGroup.FormItem colon #1623](https://github.com/alibaba/formily/commit/48137547) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(antd): fix DatePicker week formatting errors (#1614)](https://github.com/alibaba/formily/commit/dbdd1984) :point_right: ( [sun](https://github.com/sun) )

1. [fix(antd/next): fix array collapse can not reactive panel props](https://github.com/alibaba/formily/commit/0967b134) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(vue): fix unmount a field in a wrong lifecycle function.(#1609) (#1611)](https://github.com/alibaba/formily/commit/26896482) :point_right: ( [月落音阑](https://github.com/月落音阑) )

1. [fix(designable-antd): fix setting schema styles](https://github.com/alibaba/formily/commit/202c0685) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(types): fix global.d.ts](https://github.com/alibaba/formily/commit/df8561d6) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(vue): add deep copy to decorator props (#1587)](https://github.com/alibaba/formily/commit/710f5e1b) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [fix(core): fix createForm memory leak](https://github.com/alibaba/formily/commit/5f11459b) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(project): fix ci](https://github.com/alibaba/formily/commit/61627825) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(next): fix style missing due to wrong sideEffects (#1564)](https://github.com/alibaba/formily/commit/9fb8b93e) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [fix: add defaultLanguage & doc: update setValidateLanguage (#1548)](https://github.com/alibaba/formily/commit/b2777527) :point_right: ( [zkylearner](https://github.com/zkylearner) )

1. [fix(react): fix SchemaField missing props scope (#1543)](https://github.com/alibaba/formily/commit/2293d4b7) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [fix(core): fix array path calculation #1533](https://github.com/alibaba/formily/commit/29249000) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(react): fix useFormEffects not support StrictMode #1491](https://github.com/alibaba/formily/commit/0198b0c4) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(core): fix field value restored incorrectly when hidden toggled (#1529)](https://github.com/alibaba/formily/commit/047c98af) :point_right: ( [JustDs](https://github.com/JustDs) )

1. [fix(vue): remove empty default slots of fields (#1517)](https://github.com/alibaba/formily/commit/00a80b4b) :point_right: ( [月落音阑](https://github.com/月落音阑) )

1. [fix(antd): fix ArrayCollapse collapsed and expanded errors (#1510)](https://github.com/alibaba/formily/commit/12275cf0) :point_right: ( [Lind](https://github.com/Lind) )

1. [fix(core): remove @types/react peerDependencies](https://github.com/alibaba/formily/commit/2ad43225) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(react): fix ReactComponentPropsByPathValue type return error result (#1507)](https://github.com/alibaba/formily/commit/fb7654eb) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [fix(json-schema): fix single function x-reactions not work #1497](https://github.com/alibaba/formily/commit/ae5019df) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(core): fix reactive query #1494](https://github.com/alibaba/formily/commit/a0ca5b2b) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(validator): fix typo](https://github.com/alibaba/formily/commit/b1a83d2b) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(path): fix realative path for sibling in array (#1492)](https://github.com/alibaba/formily/commit/860264d6) :point_right: ( [JustDs](https://github.com/JustDs) )

1. [fix(json-schema): remove array patch state logic](https://github.com/alibaba/formily/commit/73bd9a47) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(antd/next): fix gridSpan calculate algorithm (#1440)](https://github.com/alibaba/formily/commit/3b1f1cfa) :point_right: ( [Nokecy](https://github.com/Nokecy) )

1. [fix(antd): fix btn is too big in small mode (#1455)](https://github.com/alibaba/formily/commit/c33df277) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [fix(vue): fix a type error in ISchemaMarkupFieldProps (#1454)](https://github.com/alibaba/formily/commit/43abadc5) :point_right: ( [月落音阑](https://github.com/月落音阑) )

1. [fix(core): fix the effects of IFormProps losing generic type (#1418)](https://github.com/alibaba/formily/commit/ee8d118d) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [fix(core/reactive): fix toJS and initialValue assign value](https://github.com/alibaba/formily/commit/1d6c4736) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix Form.submit miss return values (#1382)](https://github.com/alibaba/formily/commit/57c2c1b3) :point_right: ( [林法鑫](https://github.com/林法鑫) )

1. [fix(doc): fix next doc (#1385)](https://github.com/alibaba/formily/commit/77e2c486) :point_right: ( [Lind](https://github.com/Lind) )

1. [fix(antd/next): fix the feedbackLayout type definition error of the form-layout (#1372)](https://github.com/alibaba/formily/commit/3c5f6f7c) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [fix json-schema SchemaReaction type error (#1367)](https://github.com/alibaba/formily/commit/adae3da5) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [fix(antd/next): fix missing key in form-collapse map render (#1356)](https://github.com/alibaba/formily/commit/be8b1c75) :point_right: ( [Lind](https://github.com/Lind) )

1. [fix(reactive-react): fix browser crash in strict-mode async linkages scence](https://github.com/alibaba/formily/commit/feb64875) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(antd&next): `false` should be a valid value in `PreviewText.Select` (#1297)](https://github.com/alibaba/formily/commit/388288ae) :point_right: ( [Chao Ning](https://github.com/Chao Ning) )

1. [fix(vue): mapProps、mapReadPretty listeners bug](https://github.com/alibaba/formily/commit/b5f39ce0) :point_right: ( [p(^-^q)](<https://github.com/p(^-^q)>) )

1. [fix(array-table): give toFieldProps an options](https://github.com/alibaba/formily/commit/edf3cab2) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(react/vue): fix onChange can not pass to voidField's component props. (#1264)](https://github.com/alibaba/formily/commit/1764f6ee) :point_right: ( [林法鑫](https://github.com/林法鑫) )

1. [fix(core): fix reset logic for ArrayField/ObjectField](https://github.com/alibaba/formily/commit/909c5907) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(reactive): fix tojs recursive dependence stack overflow (#1245)](https://github.com/alibaba/formily/commit/675df0ce) :point_right: ( [gwsbhqt](https://github.com/gwsbhqt) )

1. [fix(antd/next): fix editable closing being blocked by other controller](https://github.com/alibaba/formily/commit/edd7a675) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(core): rollback onFieldInit behavior](https://github.com/alibaba/formily/commit/15f9a56d) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(antd): Prevent native events bubbles](https://github.com/alibaba/formily/commit/11e14a39) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(core): Fix the problem of onChange event catching exception](https://github.com/alibaba/formily/commit/8d6e1c2b) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(next): fix form-item inset box-shadow](https://github.com/alibaba/formily/commit/d3f09458) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(path): fix accessor](https://github.com/alibaba/formily/commit/4fde9ca0) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(antd): fix multiple select small/large styles](https://github.com/alibaba/formily/commit/7b628cef) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(reactive): fix computed with untracked](https://github.com/alibaba/formily/commit/546740f0) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix antd styles (#1181)](https://github.com/alibaba/formily/commit/2083b01e) :point_right: ( [Dark](https://github.com/Dark) )

1. [fix(core): untracked update values](https://github.com/alibaba/formily/commit/4b54d376) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix: use form.setValuesIn instead of field.removeProperty (#1160)](https://github.com/alibaba/formily/commit/f5fc7e61) :point_right: ( [soulwu](https://github.com/soulwu) )

1. [fix(form-grid): add mutation observer](https://github.com/alibaba/formily/commit/35dd3fd8) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(core): fix observable componentProps](https://github.com/alibaba/formily/commit/dfe2e213) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(devtools): fix serialize function](https://github.com/alibaba/formily/commit/36aef5b8) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(core): Fix the problem that the initialValues cannot be synchronized to values repeatedly](https://github.com/alibaba/formily/commit/09e0f70b) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix: fix form help validate status error (#1071)](https://github.com/alibaba/formily/commit/82d50df4) :point_right: ( [Yohox](https://github.com/Yohox) )

1. [fix(antd-components): fix timepicker format (#1069)](https://github.com/alibaba/formily/commit/a5b1af92) :point_right: ( [haipeng](https://github.com/haipeng) )

1. [fix(next): fix children not rendered](https://github.com/alibaba/formily/commit/52ece397) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(react): fix form render dirty check (#1056)](https://github.com/alibaba/formily/commit/5aeed554) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(next-components): Replace ArrayList.Item with Table.Column. Fix #1034 (#1045)](https://github.com/alibaba/formily/commit/e116838a) :point_right: ( [soulwu](https://github.com/soulwu) )

1. [fix(core): fix hasChanged return type (#1036)](https://github.com/alibaba/formily/commit/d0eb66b6) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix Upload preview image (#1031)](https://github.com/alibaba/formily/commit/e2bfcce9) :point_right: ( [liunian](https://github.com/liunian) )

1. [fix(antd-components): missing 'key' prop warning when table draggable (#1011)](https://github.com/alibaba/formily/commit/a69cdad1) :point_right: ( [daief](https://github.com/daief) )

1. [fix(shared): Fix merge undefined is not work (#1009)](https://github.com/alibaba/formily/commit/40489ac1) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix: compat legal props (#1007)](https://github.com/alibaba/formily/commit/5dde72ae) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix(schema-renderer): fix schema field lazy state (#999)](https://github.com/alibaba/formily/commit/8faab444) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(antd): fix previewPlaceholder errors (#993)](https://github.com/alibaba/formily/commit/eda988c0) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(shared): update cool-path version, ensure bug to be fixed (#988)](https://github.com/alibaba/formily/commit/5ae37fe0) :point_right: ( [soulwu](https://github.com/soulwu) )

1. [fix(schema-renderer): Fix expression complie perf bug (#986)](https://github.com/alibaba/formily/commit/0e8383ee) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix: compat ie10-11 for antd3 (#985)](https://github.com/alibaba/formily/commit/74fa86c9) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix: 回滚 mutators.move 行为 (#984)](https://github.com/alibaba/formily/commit/010e1495) :point_right: ( [soulwu](https://github.com/soulwu) )

1. [fix: mutator insert (#977)](https://github.com/alibaba/formily/commit/f3356321) :point_right: ( [xiaowanzi](https://github.com/xiaowanzi) )

1. [fix(core): fix field default sync exception (#970)](https://github.com/alibaba/formily/commit/d0872817) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(layout): type typo (#962)](https://github.com/alibaba/formily/commit/9b9f052f) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix(core): fix move down throw errors and fix null assign merge throw errors (#961)](https://github.com/alibaba/formily/commit/854feec2) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): use form batch to sync errors in array state exchanging](https://github.com/alibaba/formily/commit/0e4880fb) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(editor): remove import lodash/fp](https://github.com/alibaba/formily/commit/a105cff3) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(core): fix form ref values (#952)](https://github.com/alibaba/formily/commit/777596b7) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(schema): compat eva expression actions (#951)](https://github.com/alibaba/formily/commit/aed0369b) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix(core): fix antd table get row key (#946)](https://github.com/alibaba/formily/commit/6bda3296) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(@formily/core): fix unmountClearStates flags is not right (#944)](https://github.com/alibaba/formily/commit/754a55f4) :point_right: ( [soulwu](https://github.com/soulwu) )

1. [fix(antd,next): fix ie.tsx ssr bug (#936)](https://github.com/alibaba/formily/commit/0d3c3810) :point_right: ( [Markey](https://github.com/Markey) )

1. [fix: issue 853 and 860 (#928)](https://github.com/alibaba/formily/commit/c1774308) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [bugfix (#920)](https://github.com/alibaba/formily/commit/4f41b564) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix value is overwritten by default (#917)](https://github.com/alibaba/formily/commit/f3ad1598) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): sync form state (#906)](https://github.com/alibaba/formily/commit/de32802a) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(react): fix ArrayTable index and FormSpy (#904)](https://github.com/alibaba/formily/commit/944891f7) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(layout): inset mode comflict with labelAlign top (#903)](https://github.com/alibaba/formily/commit/9906a0ce) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix(next/components): incorrect size #884 (#885)](https://github.com/alibaba/formily/commit/c930e27d) :point_right: ( [锦此](https://github.com/锦此) )

1. [fix(schema-renderer): fixed connect onBlur/onFocus throw errors (#874)](https://github.com/alibaba/formily/commit/54012b46) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix: megalayout columns (#871)](https://github.com/alibaba/formily/commit/9bff1f29) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix(schema-renderer): fix virtual box can not receive visible ant display (#869)](https://github.com/alibaba/formily/commit/1d7d94e6) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix: remove warning of addon before (#863)](https://github.com/alibaba/formily/commit/110238c6) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix(react): fix useField/useVirtualField props assign (#858)](https://github.com/alibaba/formily/commit/e71e527a) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(schema-editor): fix dependencies (#857)](https://github.com/alibaba/formily/commit/78f02c38) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(antd/next): fix button-group typings (#855)](https://github.com/alibaba/formily/commit/08077729) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(react): fix formSpy conflict with parent SchemaForm (#854)](https://github.com/alibaba/formily/commit/e122c9d9) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(antd/next): fix FormTextBox doesnot support className (#851)](https://github.com/alibaba/formily/commit/e40bdf2b) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(antd): fix labelCol/wrapperCol can not be overwriten (#850)](https://github.com/alibaba/formily/commit/4f87465c) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix unmounteRemoveValue property is not work #827 (#847)](https://github.com/alibaba/formily/commit/f53d02ae) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(react-schema-renderer): fix x-linkages typings (#823)](https://github.com/alibaba/formily/commit/06c1a310) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(array-table): remove min-width style property (#820)](https://github.com/alibaba/formily/commit/22d03df2) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix immer autoFreeze and reset Native Object (#816)](https://github.com/alibaba/formily/commit/aff23189) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix: arrayTable style (#813)](https://github.com/alibaba/formily/commit/fe913dd9) :point_right: ( [xiaowanzi](https://github.com/xiaowanzi) )

1. [fix(core): fix destruction default value is not work and fix typings (#808)](https://github.com/alibaba/formily/commit/e032d4e4) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix typo (#804)](https://github.com/alibaba/formily/commit/ef102752) :point_right: ( [Robot](https://github.com/Robot) )

1. [fix: FormTab components parseDefaultActiveKey (#802)](https://github.com/alibaba/formily/commit/2fb128b0) :point_right: ( [xiaowanzi](https://github.com/xiaowanzi) )

1. [fix: Add default export for the antd (#787)](https://github.com/alibaba/formily/commit/5f5d4190) :point_right: ( [Rex Guo](https://github.com/Rex Guo) )

1. [fix(react-schema-editor): improve SchemaEditor types (#786)](https://github.com/alibaba/formily/commit/944b6f7a) :point_right: ( [kenve](https://github.com/kenve) )

1. [fix: readme typo (#785)](https://github.com/alibaba/formily/commit/56ef8829) :point_right: ( [WanTong](https://github.com/WanTong) )

1. [fix(next): add onPageSizeChange (#777)](https://github.com/alibaba/formily/commit/b2df2d40) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): add lifecycle buffer gc (#773)](https://github.com/alibaba/formily/commit/360c2110) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(antd/next-components): formStep support current attribute (#771)](https://github.com/alibaba/formily/commit/4f037d1f) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(share): fix toArr if param is a proxy (#760)](https://github.com/alibaba/formily/commit/fca3890e) :point_right: ( [林法鑫](https://github.com/林法鑫) )

1. [fix(antd): fix error auto scroll is not work for antd4 (#750)](https://github.com/alibaba/formily/commit/9d0f2196) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(core): fix unmount onChange trigger and x-linkages array merge (#742)](https://github.com/alibaba/formily/commit/b928dc3a) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix x-index order algorithm (#724)](https://github.com/alibaba/formily/commit/17ae9ddb) :point_right: ( [JerryLyu](https://github.com/JerryLyu) )

1. [fix(printer): fix print schema (#710)](https://github.com/alibaba/formily/commit/eb4b4e37) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix: doc typo of antd (#699)](https://github.com/alibaba/formily/commit/a10efdf9) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix(@formily/core): fix onChange trigger times issue#644 (#667)](https://github.com/alibaba/formily/commit/4499f9f0) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(@formily/meet): fix pacakge config (#659)](https://github.com/alibaba/formily/commit/06837f9e) :point_right: ( [DarK-AleX-alibaba](https://github.com/DarK-AleX-alibaba) )

1. [fix: upload children (#631)](https://github.com/alibaba/formily/commit/9c0095c1) :point_right: ( [JeromeYangtao](https://github.com/JeromeYangtao) )

1. [fix: fix type lint (#628)](https://github.com/alibaba/formily/commit/8215d7f4) :point_right: ( [soulwu](https://github.com/soulwu) )

1. [fix(antd/next): fix antd/next table arr[0] path (#624)](https://github.com/alibaba/formily/commit/fb64eae7) :point_right: ( [WingGao](https://github.com/WingGao) )

1. [fix: 616 (#622)](https://github.com/alibaba/formily/commit/23ff1447) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix(@uform/core/react): fix #613 #615 (#618)](https://github.com/alibaba/formily/commit/8dc609f9) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(@uform/shared): fix isValid (#604)](https://github.com/alibaba/formily/commit/4136691d) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(@uform/core): fix submit catch error (#603)](https://github.com/alibaba/formily/commit/406f9fb9) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(uform/core): recover field visible/display state after parent changed (#567)](https://github.com/alibaba/formily/commit/d270ef78) :point_right: ( [小黄黄](https://github.com/小黄黄) )

1. [fix: issue#540 (#549)](https://github.com/alibaba/formily/commit/4ae1759d) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix: build on windows (#539)](https://github.com/alibaba/formily/commit/8ad99322) :point_right: ( [WingGao](https://github.com/WingGao) )

1. [bugfix: add config files and fix the build error messages](https://github.com/alibaba/formily/commit/2da0edae) :point_right: ( [云数](https://github.com/云数) )

1. [fix(@uform/core): add onFormReset hook](https://github.com/alibaba/formily/commit/8633ae5f) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(@uform/core): add values to submit resolve callback params (#508)](https://github.com/alibaba/formily/commit/06c4f631) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix: form effect demo (#499)](https://github.com/alibaba/formily/commit/93f87ad2) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix schema property `minItems ` (#493)](https://github.com/alibaba/formily/commit/26e12aa1) :point_right: ( [李力](https://github.com/李力) )

1. [fix: use omit to elegant &](https://github.com/alibaba/formily/commit/72e51a61) :point_right: ( [quirkyshop](https://github.com/quirkyshop) )

1. [fix: types merge error](https://github.com/alibaba/formily/commit/950a1930) :point_right: ( [quirkyshop](https://github.com/quirkyshop) )

1. [fix(@uform/antd): Warning Received `true` for a non-boolean attribute `inline` (#494)](https://github.com/alibaba/formily/commit/46fbcb44) :point_right: ( [GODI13](https://github.com/GODI13) )

1. [fix(@uform/core): fix init visible can not remove value (#492)](https://github.com/alibaba/formily/commit/a6dcc18d) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix: merge uform master](https://github.com/alibaba/formily/commit/84d2bf17) :point_right: ( [秋逢](https://github.com/秋逢) )

1. [fix: printer get api and add get form schema to doc (#482)](https://github.com/alibaba/formily/commit/f01988ff) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix(@uform/antd/next/react): doc (#471)](https://github.com/alibaba/formily/commit/6d73c6cd) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix(@uform/validator): fix maximum rule get message logic (#468)](https://github.com/alibaba/formily/commit/752c09e3) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix: Not in the browser](https://github.com/alibaba/formily/commit/676ff5f5) :point_right: ( [jinc.cjc](https://github.com/jinc.cjc) )

1. [fix: in miniapp, globalSelf is existing](https://github.com/alibaba/formily/commit/4b6a9c08) :point_right: ( [jinc.cjc](https://github.com/jinc.cjc) )

1. [fix: in miniapp (worker runtime) , globalThis is not a function](https://github.com/alibaba/formily/commit/745a0d9f) :point_right: ( [jinc.cjc](https://github.com/jinc.cjc) )

1. [fix(@uform/next): formitem compatibility (#440)](https://github.com/alibaba/formily/commit/3bfe515b) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [fix: 引入 next 样式](https://github.com/alibaba/formily/commit/9d12b489) :point_right: ( [秋逢](https://github.com/秋逢) )

1. [fix(antd): return null while time field get falsy value (#372)](https://github.com/alibaba/formily/commit/269a1706) :point_right: ( [腰花](https://github.com/腰花) )

1. [fix: [onFieldChange] types](https://github.com/alibaba/formily/commit/dc4fa80c) :point_right: ( [jinc.cjc](https://github.com/jinc.cjc) )

1. [fix window is not defined (#312)](https://github.com/alibaba/formily/commit/a089fa89) :point_right: ( [Neil](https://github.com/Neil) )

1. [fix(globalThis): fix ReferenceError (#309)](https://github.com/alibaba/formily/commit/9efc90a6) :point_right: ( [Neil](https://github.com/Neil) )

1. [fix: ButtonGroup missing the definition of align prop (#297)](https://github.com/alibaba/formily/commit/a989364f) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [fix docs build errors (#282)](https://github.com/alibaba/formily/commit/40925aaa) :point_right: ( [Kevin Tan](https://github.com/Kevin Tan) )

1. [fix(core): Increase lastValidateValue value processing during initialization (#276)](https://github.com/alibaba/formily/commit/045f6fea) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [fix: getSchema returning undefined doesn't break setIn (#269)](https://github.com/alibaba/formily/commit/da1f7a21) :point_right: ( [Kiho · Cham](https://github.com/Kiho · Cham) )

1. [fix: remove react unstable concurrent (#270)](https://github.com/alibaba/formily/commit/0f7edab9) :point_right: ( [Kiho · Cham](https://github.com/Kiho · Cham) )

1. [fix(antd): improve week type moment parse regex (#254)](https://github.com/alibaba/formily/commit/88654b80) :point_right: ( [Wayne Zhu](https://github.com/Wayne Zhu) )

1. [fix(examples): remove the onChange of next/Detail (#257)](https://github.com/alibaba/formily/commit/62ae0cbb) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [fix(@uform/antd): add typings entry file (#250)](https://github.com/alibaba/formily/commit/a9063a2e) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [fix(@uform/core): add scheduler backward compat (#251)](https://github.com/alibaba/formily/commit/ed948348) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix FormTextBox margin value (#237)](https://github.com/alibaba/formily/commit/6148e332) :point_right: ( [合木](https://github.com/合木) )

1. [fix(@uform/validator): Fix validate threshold check (#235)](https://github.com/alibaba/formily/commit/3ca7c086) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix validator of id card to support tail x (#227)](https://github.com/alibaba/formily/commit/33291e3e) :point_right: ( [合木](https://github.com/合木) )

1. [fix(@uform/react): invariant initialValues will not be changed when form rerender (#214)](https://github.com/alibaba/formily/commit/b9efa4ca) :point_right: ( [Kiho · Cham](https://github.com/Kiho · Cham) )

1. [fix(@uform/antd): Fix Antd Input loading state automatically loses focus (#207)](https://github.com/alibaba/formily/commit/3824942b) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(@uform/antd): support password add size props and use Input.Password in antd(#192)](https://github.com/alibaba/formily/commit/633dd302) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [fix(@uform/core): fix field props transformer is not work](https://github.com/alibaba/formily/commit/8686c7c8) :point_right: ( [合木](https://github.com/合木) )

1. [fix(typings): correction FormLayout、Submit typings (#182)](https://github.com/alibaba/formily/commit/11dde612) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [fix(utils): adjust the order of getting self (#178)](https://github.com/alibaba/formily/commit/4ef2e1ca) :point_right: ( [Kiho · Cham](https://github.com/Kiho · Cham) )

1. [fix(@uform/core): Fix the parameters of changeEditable api which have been defined in interface IField. (#180)](https://github.com/alibaba/formily/commit/54daf28d) :point_right: ( [Rain](https://github.com/Rain) )

1. [fix(docs): fix docs without display property description (#176)](https://github.com/alibaba/formily/commit/24d12be5) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(typescript): fix typescript config](https://github.com/alibaba/formily/commit/546d9f01) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix(typescript): fix ts build can not transplie jsx](https://github.com/alibaba/formily/commit/0dfcba7c) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [fix: empty string can be default value](https://github.com/alibaba/formily/commit/2446cf31) :point_right: ( [monkindey](https://github.com/monkindey) )

1. [fix: move string-length into utils (#154)](https://github.com/alibaba/formily/commit/b84803b4) :point_right: ( [Kevin Tan](https://github.com/Kevin Tan) )

1. [fix(@uform/utils): fix setIn with number key can not auto create array](https://github.com/alibaba/formily/commit/48aa6d57) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix(@uform/utils): Fix the exception of setIn when undefiend value is assigned undefined property](https://github.com/alibaba/formily/commit/7cb63161) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix: antd select should not have max-width by default (#112)](https://github.com/alibaba/formily/commit/b4a494a1) :point_right: ( [Kevin Tan](https://github.com/Kevin Tan) )

1. [fix(@uform/core): Fixed the value was not cached when the field was hidden](https://github.com/alibaba/formily/commit/7923e910) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix array table will show labels wrapped by form card](https://github.com/alibaba/formily/commit/60e0917b) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(@uform/utils): fix bug of every and some (#88)](https://github.com/alibaba/formily/commit/36ab9da0) :point_right: ( [Chen YuBen](https://github.com/Chen YuBen) )

1. [fix(@uform/core): Fix the issue of the onFieldChange event after the Field is removed (#72)](https://github.com/alibaba/formily/commit/30cd1e56) :point_right: ( [Janry](https://github.com/Janry) )

1. [fix(@uform/core): Optimize the 'errors' information structure](https://github.com/alibaba/formily/commit/be680e02) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix(project): Fix known issues. 1. Improve the Button API Description 2. Improve the Field API Description 3. Fix showLoading Submit Component is not work 4. Fix x-index is not work with array table 5. Improve Field Subtree Parsing Performance](https://github.com/alibaba/formily/commit/826ebce1) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix(@uform/react): Fixing index.d.ts can not found registerFormField. #29](https://github.com/alibaba/formily/commit/6c287413) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix(@uform/react): Fix Form List error in JSON Schema driver usecase #22](https://github.com/alibaba/formily/commit/6d11c4bd) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix(@uform/antd): fix upload field is not work when uploading some files #18](https://github.com/alibaba/formily/commit/fbc22e74) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix(@uform/core): fix setFormState Promise resolve is not wait rerender completed.](https://github.com/alibaba/formily/commit/d9a24d44) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix(@uform/react): fix field dynamic hidden will effect other field. When the virtual box without name is hidden in the dynamic display, it will affect the dynamic hiding of the adjacent virtual box.](https://github.com/alibaba/formily/commit/97bb44d9) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix(@uform/nexxt): fix time picker click will throw error](https://github.com/alibaba/formily/commit/e9659ac3) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix(docs): improve Form Schema](https://github.com/alibaba/formily/commit/83a3137f) :point_right: ( [harryyu](https://github.com/harryyu) )

1. [fix(docs): fix docs can not scroll in ios](https://github.com/alibaba/formily/commit/a6e53c2e) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix(@uform/utils): fix isEmpty'result is not correct when ['','']](https://github.com/alibaba/formily/commit/091c2f17) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix(@uform/core): fix bug - fix bug that async schema default property is not work - fix bug that visible property is not work by setFieldState when FormInit](https://github.com/alibaba/formily/commit/8864ba99) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix(@uform/next/antd): fix FormButtonGroup will throw error when root component rerendering](https://github.com/alibaba/formily/commit/ccd93349) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix: 修改版本号](https://github.com/alibaba/formily/commit/a26a5013) :point_right: ( [cnt1992](https://github.com/cnt1992) )

1. [fix(next): replace fusion next package name](https://github.com/alibaba/formily/commit/db2061e8) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [fix(pkg): add access=public to allow lerna to publish scoped package](https://github.com/alibaba/formily/commit/b41d1fab) :point_right: ( [janryWang](https://github.com/janryWang) )

### :memo: Documents Changes

1. [docs(designable): add designable form docs](https://github.com/alibaba/formily/commit/fef3600d) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(site): improve home site contributors ui](https://github.com/alibaba/formily/commit/7592bafe) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(site): add serverless functions](https://github.com/alibaba/formily/commit/d872ea4c) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(reactive): improve home page styles](https://github.com/alibaba/formily/commit/799f4226) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(site): update fragment linkage case](https://github.com/alibaba/formily/commit/7e5e2625) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(reactive): update translated docs](https://github.com/alibaba/formily/commit/a403cd32) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(main): add schema fragment controlled case (#1852)](https://github.com/alibaba/formily/commit/2212486b) :point_right: ( [Janry](https://github.com/Janry) )

1. [docs(project): improve english docs](https://github.com/alibaba/formily/commit/49a74f0a) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(react): improve ObjectField demo code (#1727)](https://github.com/alibaba/formily/commit/ccfba03a) :point_right: ( [砂糖梨子](https://github.com/砂糖梨子) )

1. [docs(core): fix HTML Anchor jump link (#1639)](https://github.com/alibaba/formily/commit/3feaf906) :point_right: ( [后浪](https://github.com/后浪) )

1. [docs: issue helper add codesandbox template (#1623)](https://github.com/alibaba/formily/commit/a7d2726c) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [docs(core): fix Type declaration errors in the document and code of setFieldState method (#1605)](https://github.com/alibaba/formily/commit/bb4f175f) :point_right: ( [后浪](https://github.com/后浪) )

1. [docs(core): add Type number and integer for ValidatorFormats (#1599)](https://github.com/alibaba/formily/commit/03591144) :point_right: ( [codetyphon](https://github.com/codetyphon) )

1. [docs(json-schema): add definitions and doc](https://github.com/alibaba/formily/commit/e729e007) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(core): fix typo (#1512)](https://github.com/alibaba/formily/commit/c568de99) :point_right: ( [后浪](https://github.com/后浪) )

1. [docs(readme): add download stats](https://github.com/alibaba/formily/commit/09ec8e52) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(all): add inject global styles](https://github.com/alibaba/formily/commit/70852e91) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(issue-helper): improve issue-helper](https://github.com/alibaba/formily/commit/e4d10d13) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(guide): update issue helper](https://github.com/alibaba/formily/commit/76b58651) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(react): improve schema static declarations document (#1310)](https://github.com/alibaba/formily/commit/02aee29f) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [docs(antd): fix antd time picker ref (#1282)](https://github.com/alibaba/formily/commit/affa40c4) :point_right: ( [Pandazki](https://github.com/Pandazki) )

1. [docs(antd/next): add useIndex api](https://github.com/alibaba/formily/commit/b36efe4a) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(vue): update vue schema docs](https://github.com/alibaba/formily/commit/a54cf82b) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(main): fix main site docs](https://github.com/alibaba/formily/commit/cd6a3474) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(fusion): update fusion docs](https://github.com/alibaba/formily/commit/1256a385) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs: JOSN -> JSON (#1196)](https://github.com/alibaba/formily/commit/87837801) :point_right: ( [zkylearner](https://github.com/zkylearner) )

1. [docs(all): fix lint](https://github.com/alibaba/formily/commit/5c7a77fb) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(formily): add quick-start doc](https://github.com/alibaba/formily/commit/e29857ee) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(antd): add form-layout doc](https://github.com/alibaba/formily/commit/f167a750) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(react): add react docs](https://github.com/alibaba/formily/commit/76b799aa) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(project): add contribution.md](https://github.com/alibaba/formily/commit/a6748df8) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [docs(codesandbox): update dependencies](https://github.com/alibaba/formily/commit/e8260eda) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [doc:improve validate documents (#1000)](https://github.com/alibaba/formily/commit/3a145304) :point_right: ( [wangmingxu](https://github.com/wangmingxu) )

1. [docs(antd): mardown special symbol escape (#882)](https://github.com/alibaba/formily/commit/9c969cc9) :point_right: ( [kromalee](https://github.com/kromalee) )

1. [docs: add type definition of x-linkages and x-mega-props (#876)](https://github.com/alibaba/formily/commit/c93b5171) :point_right: ( [Empireo](https://github.com/Empireo) )

1. [docs(antd): fix registerVirtualBox demo (#834)](https://github.com/alibaba/formily/commit/02fcd0d4) :point_right: ( [kenve](https://github.com/kenve) )

1. [docs(antd/component): fix labelAlign type and remove labelTextAlign (#817)](https://github.com/alibaba/formily/commit/3704873c) :point_right: ( [kenve](https://github.com/kenve) )

1. [docs: fix spelling (#791)](https://github.com/alibaba/formily/commit/f27a66ba) :point_right: ( [kenve](https://github.com/kenve) )

1. [docs: formatted with prettier (#768)](https://github.com/alibaba/formily/commit/cb7f095d) :point_right: ( [kenve](https://github.com/kenve) )

1. [docs(antd-components): update import package name (#758)](https://github.com/alibaba/formily/commit/c038dbdd) :point_right: ( [Janry](https://github.com/Janry) )

1. [docs: add introduction and support FormTab and support FieldState. unmountRemoveValue (#752)](https://github.com/alibaba/formily/commit/bfaa3ed7) :point_right: ( [Janry](https://github.com/Janry) )

1. [doc(next/antd): array item docs optimization (#749)](https://github.com/alibaba/formily/commit/b12bce24) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [docs : add complex-field-component.md (#737)](https://github.com/alibaba/formily/commit/1235a11a) :point_right: ( [Janry](https://github.com/Janry) )

1. [doc: add form and formitem (#700)](https://github.com/alibaba/formily/commit/aaa4742a) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [docs(@formily/react-schema-renderer): fix docs example (#681)](https://github.com/alibaba/formily/commit/a546e6a2) :point_right: ( [朱建](https://github.com/朱建) )

1. [docs(project): add devtools doc (#665)](https://github.com/alibaba/formily/commit/02ed0b63) :point_right: ( [Janry](https://github.com/Janry) )

1. [docs: update next/antd (#661)](https://github.com/alibaba/formily/commit/611125c7) :point_right: ( [quirkyvar](https://github.com/quirkyvar) )

1. [docs(examples): fix FormStep examples (#593)](https://github.com/alibaba/formily/commit/27018c6c) :point_right: ( [常泽清](https://github.com/常泽清) )

1. [docs(@uform/core): improve docs (#402)](https://github.com/alibaba/formily/commit/ded9b937) :point_right: ( [Janry](https://github.com/Janry) )

1. [doc: add questions(customize action) (#289)](https://github.com/alibaba/formily/commit/baecbaab) :point_right: ( [xiaowanzi](https://github.com/xiaowanzi) )

1. [docs(Submit): fix table style (#203)](https://github.com/alibaba/formily/commit/d59436b3) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [docs: add detail of createForm (#156)](https://github.com/alibaba/formily/commit/ae8bb439) :point_right: ( [Kevin Tan](https://github.com/Kevin Tan) )

1. [docs: optimize demo of form detail in docs (#150)](https://github.com/alibaba/formily/commit/b04d4135) :point_right: ( [合木](https://github.com/合木) )

1. [docs(antd-relations): fix MM visible toggle is not work](https://github.com/alibaba/formily/commit/a930f78c) :point_right: ( [Janry](https://github.com/Janry) )

1. [docs(Field_React): fix rule description](https://github.com/alibaba/formily/commit/827cb26a) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [docs(questions): add Q/A](https://github.com/alibaba/formily/commit/b98c0565) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [docs(api): fix form text box docs](https://github.com/alibaba/formily/commit/69b3c5a9) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [docs(docs): remove statis](https://github.com/alibaba/formily/commit/3203efbe) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [docs: add HarrisFeng as a contributor (#93)](https://github.com/alibaba/formily/commit/255d153e) :point_right: ( [allcontributors[bot]](https://github.com/allcontributors[bot]) )

1. [docs(readme): add english version of readme (#73)](https://github.com/alibaba/formily/commit/12422a39) :point_right: ( [Janry](https://github.com/Janry) )

1. [docs: improve the English version (#3)](https://github.com/alibaba/formily/commit/d592cbf9) :point_right: ( [Harry Yu](https://github.com/Harry Yu) )

1. [docs(api): update SchemaForm API links](https://github.com/alibaba/formily/commit/0573af76) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [docs(site): move github pages==>netlify](https://github.com/alibaba/formily/commit/dc9abdfa) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [docs(all): sort api table](https://github.com/alibaba/formily/commit/930ce7aa) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [docs(API): Fix jump link can't jump in doc site. #59](https://github.com/alibaba/formily/commit/724affdb) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [docs: remove useless column in field api table (#61)](https://github.com/alibaba/formily/commit/49be9871) :point_right: ( [Kiho · Cham](https://github.com/Kiho · Cham) )

1. [docs: update .all-contributorsrc](https://github.com/alibaba/formily/commit/eab401c7) :point_right: ( [allcontributors[bot]](https://github.com/allcontributors[bot]) )

1. [docs(@uform/docs): Optimize package bundle size](https://github.com/alibaba/formily/commit/c42ea06a) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [docs(examples): add international docs #25](https://github.com/alibaba/formily/commit/aaa22278) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [docs(site): build doc site](https://github.com/alibaba/formily/commit/64f10b8e) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [docs(site_pages): add gitter.im sidebar](https://github.com/alibaba/formily/commit/5809a987) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [docs(next/antd): add createAsyncFormActions docs](https://github.com/alibaba/formily/commit/4ab122e1) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [docs: add README.md](https://github.com/alibaba/formily/commit/52fc2c2d) :point_right: ( [cnt1992](https://github.com/cnt1992) )

### :rose: Improve code quality

1. [refactor(reactive): change model default batch annotation to action annotation](https://github.com/alibaba/formily/commit/6162639b) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [refactor(element): refactor FormDialog/FormDrawer & refactor component export type (#1892)](https://github.com/alibaba/formily/commit/cc3cb360) :point_right: ( [Muyao](https://github.com/Muyao) )

1. [refactor(project): remove Formily.\* use cases (#1820)](https://github.com/alibaba/formily/commit/72a2958c) :point_right: ( [Janry](https://github.com/Janry) )

1. [refactor(designable-ant): expose upload component's textContent property in setting form (#1818)](https://github.com/alibaba/formily/commit/15344449) :point_right: ( [nekic](https://github.com/nekic) )

1. [refactor(json-schema): remove json-schema index type](https://github.com/alibaba/formily/commit/76a302cc) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [refactor(reactive): fix #1598 and support #1586 and super performance optimization](https://github.com/alibaba/formily/commit/a1e72006) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [refactor(designable-antd): refactor and add DesignableArrayTable](https://github.com/alibaba/formily/commit/97c78dbd) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [refactor(desingbale-antd): improve dir name](https://github.com/alibaba/formily/commit/ceb8a8d5) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [refactor(antd/next): improve docs and support x-component/x-decorator ReactComponent style](https://github.com/alibaba/formily/commit/65bfef1e) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [refactor(core): controlled ==> designable](https://github.com/alibaba/formily/commit/ac79c196) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [refactor(reactive-react): refactor observer function (#1523)](https://github.com/alibaba/formily/commit/55b93420) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [refactor(antd/next): rewrite PreviewText to JSXComponent (#1509)](https://github.com/alibaba/formily/commit/3f6c34d2) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [refactor(json-schema): refactor stringify type to fix literal type is erased (#1508)](https://github.com/alibaba/formily/commit/43e79a61) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [refactor(project): update lerna scripts](https://github.com/alibaba/formily/commit/92ae8d74) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [refactor(core): modify IFormState type (#1434)](https://github.com/alibaba/formily/commit/57a7ea37) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [refactor(reactive): add benchmark scripts](https://github.com/alibaba/formily/commit/6954a1fb) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [refactor: adjust the umd compilation process of the ui library (#1206)](https://github.com/alibaba/formily/commit/e3fc6ade) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [refactor: update rollup config (#1193)](https://github.com/alibaba/formily/commit/a8d119c0) :point_right: ( [Dark](https://github.com/Dark) )

1. [refactor(antd): fine adjustment (#1188)](https://github.com/alibaba/formily/commit/ea022745) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [refactor: remove disabled, update props name, update NodeTypes enum(#1155)](https://github.com/alibaba/formily/commit/43972bae) :point_right: ( [soulwu](https://github.com/soulwu) )

1. [refactor(project): remove react-shared-components](https://github.com/alibaba/formily/commit/6f6dbed4) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [refactor(react): improve form-spy (#824)](https://github.com/alibaba/formily/commit/c4dc2144) :point_right: ( [Janry](https://github.com/Janry) )

1. [refactor(@uform/react-schema-editor): update (#606)](https://github.com/alibaba/formily/commit/179cd62a) :point_right: ( [Andy](https://github.com/Andy) )

1. [refactor:code and style refactor (#522)](https://github.com/alibaba/formily/commit/24b3503e) :point_right: ( [Andy](https://github.com/Andy) )

1. [refactor(antd): adjust the handling of importing components on demand (#485)](https://github.com/alibaba/formily/commit/2fb41e9a) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [refactor(typings): update FormStep、dispatch、notify typings](https://github.com/alibaba/formily/commit/929ef2c6) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [refactor: 代码优化](https://github.com/alibaba/formily/commit/e9f2c04e) :point_right: ( [秋逢](https://github.com/秋逢) )

1. [refactor: improve test case (#375)](https://github.com/alibaba/formily/commit/dfec008a) :point_right: ( [Janry](https://github.com/Janry) )

1. [refactor(@uform/core): remove processing test case](https://github.com/alibaba/formily/commit/56835f9e) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [refactor(build): add build docs flow in CI and remove dynamic style inject](https://github.com/alibaba/formily/commit/1fb5cc07) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [refactor: next in TypeScript (#206)](https://github.com/alibaba/formily/commit/33e4bfb8) :point_right: ( [Kiho · Cham](https://github.com/Kiho · Cham) )

1. [refactor: use isEqual instead of isEmpty](https://github.com/alibaba/formily/commit/41aa26e8) :point_right: ( [monkindey](https://github.com/monkindey) )

1. [refactor(pkg): update eslint-plugin-react version](https://github.com/alibaba/formily/commit/a9f0c7ce) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [refactor(test): update react-test-library==>@test-library/react](https://github.com/alibaba/formily/commit/a97ffa0b) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [refactor(pkg): add ts deps](https://github.com/alibaba/formily/commit/bfdfb822) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [refactor(project): move @alifd/next and antd dependencies to peerDependencies](https://github.com/alibaba/formily/commit/201a53d2) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [refactor(docs): fix docs version](https://github.com/alibaba/formily/commit/db71c52c) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [refactor(docs): add docs packages to use npm cdnjs](https://github.com/alibaba/formily/commit/d3672aa5) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [refactor(ci): update .travis.yml](https://github.com/alibaba/formily/commit/9396e9d6) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [refactor: monaco editor amd](https://github.com/alibaba/formily/commit/4535cbe0) :point_right: ( [cnt1992](https://github.com/cnt1992) )

1. [refactor: split next version](https://github.com/alibaba/formily/commit/b77cedb1) :point_right: ( [cnt1992](https://github.com/cnt1992) )

1. [refactor(builder): delete package-lock.json and config/jest](https://github.com/alibaba/formily/commit/d35820c4) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [refactor(gitignore): remove lib](https://github.com/alibaba/formily/commit/8677e38d) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [refactor(project): LESENCE.md ==> LICENSE.md](https://github.com/alibaba/formily/commit/1968d1f3) :point_right: ( [janryWang](https://github.com/janryWang) )

### :rocket: Improve Performance

1. [perf(path): improve path performance](https://github.com/alibaba/formily/commit/4018d545) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [perf(array): shorten the code (#678)](https://github.com/alibaba/formily/commit/f8706760) :point_right: ( [Neil](https://github.com/Neil) )

### :hammer_and_wrench: Update Workflow Scripts

1. [build: fix build global may be failed (#1744)](https://github.com/alibaba/formily/commit/818aa132) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [build: fix git message sort incorrect (#1708)](https://github.com/alibaba/formily/commit/617ce88c) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [build: add sourcemap support (#1687)](https://github.com/alibaba/formily/commit/7bb433bb) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [build(shared): external path package](https://github.com/alibaba/formily/commit/be3ae401) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [build(project): buld project](https://github.com/alibaba/formily/commit/fc455da7) :point_right: ( [janryWang](https://github.com/janryWang) )

### :construction: Add/Update Test Cases

1. [test(core): add designable tests (#1972)](https://github.com/alibaba/formily/commit/6a437c8b) :point_right: ( [Janry](https://github.com/Janry) )

1. [test(reactive): optimize box test case (#1866)](https://github.com/alibaba/formily/commit/4e191e0f) :point_right: ( [Zardddddd60](https://github.com/Zardddddd60) )

1. [test(core): nested reaction should recall the tracker (#1696)](https://github.com/alibaba/formily/commit/a6b81042) :point_right: ( [小黄黄](https://github.com/小黄黄) )

1. [test: update jest config (#1634)](https://github.com/alibaba/formily/commit/f228a405) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [test(reactive): add mark tests and fix docs typo](https://github.com/alibaba/formily/commit/b3b2679e) :point_right: ( [gwsbhqt](https://github.com/gwsbhqt) )

1. [test(project): update mobx => @formily/reactive](https://github.com/alibaba/formily/commit/7ae0a923) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [test(json-schema): update snapshot](https://github.com/alibaba/formily/commit/0c5947a8) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [test(react): fix typings](https://github.com/alibaba/formily/commit/322e1fd7) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [test(validator): add some core tests](https://github.com/alibaba/formily/commit/c5236042) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [test(@uform/react): improve field and virtualField test cases (#438)](https://github.com/alibaba/formily/commit/853e051f) :point_right: ( [dahuang](https://github.com/dahuang) )

1. [test(@uform/utils): add setIn testcase](https://github.com/alibaba/formily/commit/67a82e67) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [test(effects): remove unnecessary button tags](https://github.com/alibaba/formily/commit/7d25ac4c) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [test(project): add large test cases](https://github.com/alibaba/formily/commit/68fd2e1c) :point_right: ( [janryWang](https://github.com/janryWang) )

### :blush: Other Changes

1. [chore(docs): add antd-formily-boost link](https://github.com/alibaba/formily/commit/4fb9ff8d) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(dn): update designable](https://github.com/alibaba/formily/commit/8af0467f) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(pkg): update package.json](https://github.com/alibaba/formily/commit/d96dcfa9) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(flow): update release.yml](https://github.com/alibaba/formily/commit/278e496d) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(core): improve heart](https://github.com/alibaba/formily/commit/de97e76f) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(designable): add save service to playground](https://github.com/alibaba/formily/commit/badd7f9a) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(designable-antd): add locale namespace to resolve easy conflict](https://github.com/alibaba/formily/commit/79f01dff) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(ts): map @formily/\* to src folder during development (#1917)](https://github.com/alibaba/formily/commit/65259a06) :point_right: ( [JuFeng Zhang](https://github.com/JuFeng Zhang) )

1. [chore(validator): improve validator (#1918)](https://github.com/alibaba/formily/commit/b1681bff) :point_right: ( [Janry](https://github.com/Janry) )

1. [chore(flow): add eslint action](https://github.com/alibaba/formily/commit/5c46ed3d) :point_right: ( [Janry](https://github.com/Janry) )

1. [chore(project): improve typings and fix typo (#1802)](https://github.com/alibaba/formily/commit/af23767b) :point_right: ( [Janry](https://github.com/Janry) )

1. [chore(setters): improve DataSourceSetter ui](https://github.com/alibaba/formily/commit/1c12f543) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(path): add benchmark case](https://github.com/alibaba/formily/commit/9533e049) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore: replace 'disgusting' with 'sophisticated' (#1574)](https://github.com/alibaba/formily/commit/d14c042e) :point_right: ( [Riting LIU](https://github.com/Riting LIU) )

1. [chore(pkg): add workspaces](https://github.com/alibaba/formily/commit/d8af530e) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(github): update pr template](https://github.com/alibaba/formily/commit/b3149307) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(dumi): update next css link](https://github.com/alibaba/formily/commit/6843d946) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(project): prettier all code and change style behavior](https://github.com/alibaba/formily/commit/3792c221) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(scripts): remove mapCoverage.js](https://github.com/alibaba/formily/commit/3b3c3134) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(workflow): add issue helper](https://github.com/alibaba/formily/commit/ddebfca1) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(workflow): move travis to github action](https://github.com/alibaba/formily/commit/b678b54f) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(workflow): rename main.yml ==>commitlint.yml](https://github.com/alibaba/formily/commit/45734661) :point_right: ( [Janry](https://github.com/Janry) )

1. [chore(actions): update commit checker action](https://github.com/alibaba/formily/commit/573b60fe) :point_right: ( [Janry](https://github.com/Janry) )

1. [chore(pkg): add preversion/version lerna scripts hook](https://github.com/alibaba/formily/commit/d933f1fe) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(pkg): change the execution timing of the changelog generator](https://github.com/alibaba/formily/commit/0ff511f6) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(scripts): slice changelog counts](https://github.com/alibaba/formily/commit/fead7843) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore(antd/next): update resize-observer-polyfill](https://github.com/alibaba/formily/commit/71542b08) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore: improve github pull request template (#1328)](https://github.com/alibaba/formily/commit/353e87a7) :point_right: ( [liuwei](https://github.com/liuwei) )

1. [ci(core): fix tests](https://github.com/alibaba/formily/commit/faaceba0) :point_right: ( [janrywang](https://github.com/janrywang) )

1. [chore: unify ts dependencies (#296)](https://github.com/alibaba/formily/commit/5268ce80) :point_right: ( [Kevin Tan](https://github.com/Kevin Tan) )

1. [chore(travis): Guaranteed dependency peering (#288)](https://github.com/alibaba/formily/commit/97885c2c) :point_right: ( [atzcl](https://github.com/atzcl) )

1. [chore(docs): UFrom --> UForm (#228)](https://github.com/alibaba/formily/commit/e55d8400) :point_right: ( [Kiho · Cham](https://github.com/Kiho · Cham) )

1. [chore(docs): remove unused file and correct antd multiple example (#184)](https://github.com/alibaba/formily/commit/eee944f5) :point_right: ( [Kiho · Cham](https://github.com/Kiho · Cham) )

1. [chore: resolve the conflict](https://github.com/alibaba/formily/commit/22a7c32f) :point_right: ( [monkindey](https://github.com/monkindey) )

1. [chore: remove tslint and use typescript-eslint (#159)](https://github.com/alibaba/formily/commit/97caa9cd) :point_right: ( [Kevin Tan](https://github.com/Kevin Tan) )

1. [chore(project): release v0.1.15 (#94)](https://github.com/alibaba/formily/commit/bc3125d2) :point_right: ( [Janry](https://github.com/Janry) )

1. [chore(scripts): correct git commit specific url)](https://github.com/alibaba/formily/commit/341b2ffb) :point_right: ( [monkindey](https://github.com/monkindey) )

1. [chore(alpha): change version to v0.1.0-beta.20](https://github.com/alibaba/formily/commit/5bead131) :point_right: ( [janryWang](https://github.com/janryWang) )

1. [chore: merge](https://github.com/alibaba/formily/commit/4b7aacb9) :point_right: ( [cnt1992](https://github.com/cnt1992) )

1. [chore: delete no use files](https://github.com/alibaba/formily/commit/49deb94f) :point_right: ( [cnt1992](https://github.com/cnt1992) )

1. [chore: rebuild](https://github.com/alibaba/formily/commit/2b95a387) :point_right: ( [cnt1992](https://github.com/cnt1992) )

1. [chore: add react & react-dom in package.json](https://github.com/alibaba/formily/commit/3b814059) :point_right: ( [cnt1992](https://github.com/cnt1992) )

1. [chore: upgrade webpack-dev-server](https://github.com/alibaba/formily/commit/2dfa848c) :point_right: ( [cnt1992](https://github.com/cnt1992) )
