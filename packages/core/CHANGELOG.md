# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 2.0.0-beta.52 (2021-05-20)

### Bug Fixes

- **antd:** Prevent native events bubbles ([11e14a3](https://github.com/alibaba/formily/commit/11e14a3973bd19bb38d5371aa8dd6cc2163c821b))
- **core:** fix array move ([830bb79](https://github.com/alibaba/formily/commit/830bb79d417dba965152e1895737d0aaa5e2916e))
- **core:** fix empty checker in intialFieldValue ([7db3417](https://github.com/alibaba/formily/commit/7db3417947f42101640aa2ce934a03de3d0b77e6))
- **core:** fix initialValue empty string is not work ([eb7562c](https://github.com/alibaba/formily/commit/eb7562c89ab7091dbf4a2c984509ab9350f3544d))
- **core:** fix initialValues merge logic ([92e9522](https://github.com/alibaba/formily/commit/92e95226e1818916a8116699a3695798af875691))
- **core:** fix initialValues merge strategy ([c9ccd70](https://github.com/alibaba/formily/commit/c9ccd709b670272de7953b1849591c634a42c2c7))
- **core:** fix input change trigger order ([1cebca6](https://github.com/alibaba/formily/commit/1cebca66f46792396af756b84f6b197f19783b37))
- **core:** fix observable componentProps ([dfe2e21](https://github.com/alibaba/formily/commit/dfe2e2131b70c3eab14f101c9a7c2376393c84a3))
- **core:** fix reset logic for ArrayField/ObjectField ([909c590](https://github.com/alibaba/formily/commit/909c59070a03a20c9dc8a00cc72d9eb796b17c0d))
- **core:** fix the effects of IFormProps losing generic type ([#1418](https://github.com/alibaba/formily/issues/1418)) ([ee8d118](https://github.com/alibaba/formily/commit/ee8d118de71070b6ce03ed076508737b5cc4a634))
- **core:** Fix the problem of onChange event catching exception ([8d6e1c2](https://github.com/alibaba/formily/commit/8d6e1c2b6b5e36c14b5134deb674cfc260614345))
- **core:** Fix the problem that the initialValues cannot be synchronized to values repeatedly ([09e0f70](https://github.com/alibaba/formily/commit/09e0f70beb6b3bceb1dae3f7a23f684e4c79d44a))
- **core:** fix typo ([55821bc](https://github.com/alibaba/formily/commit/55821bc0756e2c12c9d83f592cc32041942e79ee))
- **core:** relative query ([77f5349](https://github.com/alibaba/formily/commit/77f5349a6d65e1bf67521cb20fae2473d4bcdbfc))
- **core:** rollback onFieldInit behavior ([15f9a56](https://github.com/alibaba/formily/commit/15f9a56d49afdfe653c02ba98bebdeabb968a29d))
- **core:** untracked update values ([4b54d37](https://github.com/alibaba/formily/commit/4b54d3767651f8fe846762723c143f724e909910))
- **core/reactive:** fix toJS and initialValue assign value ([1d6c473](https://github.com/alibaba/formily/commit/1d6c473663ab89dab2c2d1001f791e644acbcf28))
- **json-schema:** fix transformer patch state ([78f35e7](https://github.com/alibaba/formily/commit/78f35e7ee6895803abf933da38d51b8009d050ff))
- **project:** fix typings ([47eb9cd](https://github.com/alibaba/formily/commit/47eb9cd5af5c500701c66824422eb30f52eee3b3))
- **reactive:** bugfix ([c4550bc](https://github.com/alibaba/formily/commit/c4550bc080d9a05c5d0b60e559994b0f7ec744c3))
- **reactive-react:** fix rendering exception in strict mode and repeated invalid update ([2c44ae4](https://github.com/alibaba/formily/commit/2c44ae410a73f02735c63c6430e021a50e21f3ec))

### Features

- **antd:** support form-dialog and form-drawer ([0237c25](https://github.com/alibaba/formily/commit/0237c25d08f93d944ee2b595c8781f5a884ca50c))
- **antd:** support form-tab and form-collapse ([0c751fe](https://github.com/alibaba/formily/commit/0c751fea6723844ce4a691cc25c00cb10122d9d1))
- **core:** add extra strategy for merge form value ([#1448](https://github.com/alibaba/formily/issues/1448)) ([0b5606d](https://github.com/alibaba/formily/commit/0b5606d15ad5a71c4ef05e67450018d6a7e02d23))
- **core:** add generic type support for form ([#1400](https://github.com/alibaba/formily/issues/1400)) ([29ef93f](https://github.com/alibaba/formily/commit/29ef93f15dc73470d1ffeab40561208c8e282866))
- **core:** add more effects ([5b42226](https://github.com/alibaba/formily/commit/5b42226dab1bcd2e9b30f1e7c896ac0571a4b7ff))
- **core:** createForm supports generic type ([#1403](https://github.com/alibaba/formily/issues/1403)) ([e73cea1](https://github.com/alibaba/formily/commit/e73cea1fc848cfc164a8e3a206210858820eb550))
- **core:** import @formily/reactive ([442fd29](https://github.com/alibaba/formily/commit/442fd2963a5aa73b3c87cce453a3b6b787fac936))
- **core:** improve code ([d4cbb79](https://github.com/alibaba/formily/commit/d4cbb79a77c7db4c6b6d66a2ab64bae172f05a9a))
- **core:** improve code ([2351390](https://github.com/alibaba/formily/commit/2351390e4be2905d79dc6ad0e98181e0407f68aa))
- **core:** support ArrayBase component ([a6e1ff3](https://github.com/alibaba/formily/commit/a6e1ff3b488e792ad77f954d2a3cc6fb90b9fa15))
- **core:** support clearFormGraph ([544adf2](https://github.com/alibaba/formily/commit/544adf29f7dadd21f10de6450c30a5680c7720dd))
- **core:** support controlled mode for lowcode ([c45c751](https://github.com/alibaba/formily/commit/c45c751055ae2e391f245b45eff9cf0a4ce799e3))
- **core:** support controlled property ([cd8fa41](https://github.com/alibaba/formily/commit/cd8fa4149bfdc305acc747aac8f8dd59afd2c0a8))
- **core:** support display props ([e4f73fc](https://github.com/alibaba/formily/commit/e4f73fc820869ba521d32ac947cdb1d618fc498f))
- **core:** support enableUnmountRemoveNode/disableUnmountRemoveNode API ([8f99e5b](https://github.com/alibaba/formily/commit/8f99e5b32ae0a1e342945dfd4ab8ff393776c684))
- **core:** support setFieldState ([1b7ecec](https://github.com/alibaba/formily/commit/1b7ececc6857aa90396872e66b9411ce096a91ef))
- **core:** support validate ([b41fbe6](https://github.com/alibaba/formily/commit/b41fbe664aa41d20345f5ef020344c04a4268dd1))
- **core:** support value change trigger validate ([0473017](https://github.com/alibaba/formily/commit/0473017a191b78579cb737f0e03ee992f94cf367))
- **core:** update ([f814eb5](https://github.com/alibaba/formily/commit/f814eb599a77d89fb0ae567d33fc24f848ed882e))
- **core:** update ([5750842](https://github.com/alibaba/formily/commit/575084241f8cebe2be4f385b3b310d4ccadd500b))
- **core:** update ([9cdeae4](https://github.com/alibaba/formily/commit/9cdeae404cfc70b67eee9664b69bc67b0fbcd572))
- **core:** update ([8bd672f](https://github.com/alibaba/formily/commit/8bd672f8ca4bb881fca35b1476707ae580c0c54b))
- **core:** update ([dda6b35](https://github.com/alibaba/formily/commit/dda6b35cf57217177468e31e2fe67d0104d9baa6))
- **core:** update ([9818c0a](https://github.com/alibaba/formily/commit/9818c0affb1d5f5e783ab36a8e3db820cd449fcb))
- **core:** update ([9e9091e](https://github.com/alibaba/formily/commit/9e9091e80867bb818cc735a05a54b3169ff015c3))
- **core:** update ([d02f495](https://github.com/alibaba/formily/commit/d02f4954533f9133e416d26a40c3090dcc6985dc))
- **core:** update ([8725e65](https://github.com/alibaba/formily/commit/8725e65fa65c841383419091955ccca22a0d2417))
- **core:** update query ([d3fd6a7](https://github.com/alibaba/formily/commit/d3fd6a728af662ba65ca6de5076c6904ea9d5b66))
- **core:** update reactive library ([eb9e421](https://github.com/alibaba/formily/commit/eb9e42186d5d19ea54ec79e592171e93cf20cb44))
- **core:** update typings ([eb526c1](https://github.com/alibaba/formily/commit/eb526c160e480b67def46792a61533e7851e82aa))
- **core:** update typings ([473e5bc](https://github.com/alibaba/formily/commit/473e5bc33ae6c7380fee309470366cec3b1f9b3d))
- **core:** update typings ([42ad687](https://github.com/alibaba/formily/commit/42ad6877abaea71d58cbfdd38bc280e727fd126d))
- **core:** update typings ([3b8e29c](https://github.com/alibaba/formily/commit/3b8e29c1d3c82112565816c95eadbd7654e9829c))
- **core:** update values manage ([38618cf](https://github.com/alibaba/formily/commit/38618cf9edc370c3bab81685cb73fac8855c9a53))
- **effects:** normoalize onFieldInit ([98922c8](https://github.com/alibaba/formily/commit/98922c8a68e1c4a4fdcfdce0ff24a8c45cb0a2c3))
- **project:** improve code ([9a66a5b](https://github.com/alibaba/formily/commit/9a66a5b479f835838bf59dd0a18eb4818124245a))
- **project:** improve code ([55f91d2](https://github.com/alibaba/formily/commit/55f91d21f8615545fe442a7551ab45f96eecf753))
- **project:** improve code ([2c79cbb](https://github.com/alibaba/formily/commit/2c79cbb1166c6699aefbeeb28a882ed191ee7065))
- **project:** improve code ([396d720](https://github.com/alibaba/formily/commit/396d720f857db90f21d3c587c462e67932c1e3b5))
- **project:** improve code ([2943b4a](https://github.com/alibaba/formily/commit/2943b4abf5a9bf8f834cea9228a3cc0a5dc037e5))
- **project:** improve code ([bf4af6f](https://github.com/alibaba/formily/commit/bf4af6f359e04e2fab9dc409f2b099e56331f13e))
- **project:** improve code ([e586614](https://github.com/alibaba/formily/commit/e586614016371ca0e4c43d2a5a45ae7bbee37647))
- **project:** improve code ([d25c9ff](https://github.com/alibaba/formily/commit/d25c9ff402a9498611c712f57f09923247092acd))
- **project:** improve code ([5438205](https://github.com/alibaba/formily/commit/54382054f16b30a4dc7aaabba901978eab2c6c80))
- **project:** improve code ([37e41c1](https://github.com/alibaba/formily/commit/37e41c19b39dbdc7025057c8bf45814934e13f4a))
- **project:** improve code ([2d64ce6](https://github.com/alibaba/formily/commit/2d64ce626fb8aaa75b7d7ac71f715306b500e1b0))
- **project:** improve code ([e03e45a](https://github.com/alibaba/formily/commit/e03e45a2454a8a88a6960ae352f2d235525d7836))
- **project:** improve code ([e973986](https://github.com/alibaba/formily/commit/e9739863cc07156f1bb6fa8e1493da32ed9b5a61))
- **project:** improve code ([739b803](https://github.com/alibaba/formily/commit/739b803dcd5f7bd3155aa639ba3241c84c2f770e))
- **project:** improve code ([f3552f7](https://github.com/alibaba/formily/commit/f3552f72f3fb90771547b084e656385f33b92b75))
- **project:** improve code ([3f81bf0](https://github.com/alibaba/formily/commit/3f81bf0f7b963f49ee2d8b6dc7d237a417cddd74))
- **project:** improve code ([44b4396](https://github.com/alibaba/formily/commit/44b439666803c8b93da2445a6b4b50aff673dd4c))
- **project:** improve code ([5c24cae](https://github.com/alibaba/formily/commit/5c24cae8d40dc0992cda949a50d71e53c43b74e6))
- **project:** improve code ([292fa8b](https://github.com/alibaba/formily/commit/292fa8b748f906feca4508fe59d3042c1a0afcf4))
- **project:** improve code ([7ffaea8](https://github.com/alibaba/formily/commit/7ffaea850bb99b382a7fad6482c3251a1155ea72))
- **project:** improve code ([e42e06b](https://github.com/alibaba/formily/commit/e42e06b362c1e3886416c0a33fc5d72c5696ac9f))
- **project:** improve code ([d3268f3](https://github.com/alibaba/formily/commit/d3268f3ca9d586db56e5a7b8bc019004496ba038))
- **project:** improve code ([b111590](https://github.com/alibaba/formily/commit/b11159056637445b628f50d2f0b6edaa24f95a9a))
- **project:** improve code ([13a4407](https://github.com/alibaba/formily/commit/13a4407fd0898f84adf15c48fdbc70d16ebcf9de))
- **project:** improve code ([c69d229](https://github.com/alibaba/formily/commit/c69d2297c4c098383595b98a68de1c83a2032d6d))
- **project:** improve code ([75f76ba](https://github.com/alibaba/formily/commit/75f76ba533b5e4625cd85b06f4de17f69103501b))
- **project:** improve typings ([d53bace](https://github.com/alibaba/formily/commit/d53baced08441de815ef747480e8506ff31eaf48))
- **project:** remove mobx-react-lite ([7078616](https://github.com/alibaba/formily/commit/70786169a2e6fc042355590c2cbdc8ab03b8293a))
- **project:** support array tabs ([aed8200](https://github.com/alibaba/formily/commit/aed8200225425a9e8314e36e4b571807e74c9c76))
- **project:** support field.dataSource ([74b7b1f](https://github.com/alibaba/formily/commit/74b7b1f8e3f6786608606a556c0f6d3c62eff08c))
- **project:** support field.dataSource ([edb07ec](https://github.com/alibaba/formily/commit/edb07ec42e7abad6eca7fbf465d26f2e34a646e1))
- **project:** update styles ([fcc2976](https://github.com/alibaba/formily/commit/fcc29760b588e3e0fd38b71f801ebda6b6b5b1c1))
- **react:** improve code ([152b93e](https://github.com/alibaba/formily/commit/152b93e2e642530f640323b5b1455830c506396a))
- **react:** improve code ([a6d2321](https://github.com/alibaba/formily/commit/a6d232132525ba1bbd85fcc79d70a129be9728f1))
- **react:** improve code ([83f8ac4](https://github.com/alibaba/formily/commit/83f8ac46034ec0722affc54477bd905d3f3538e2))
- **react:** improve code ([8880c51](https://github.com/alibaba/formily/commit/8880c51535d77052e9768ee061f55ad24ad1eede))
- **react:** improve code ([b254c20](https://github.com/alibaba/formily/commit/b254c20193249f70b0076311c20dfc8bb0ede411))
- **react:** improve code ([5ed768c](https://github.com/alibaba/formily/commit/5ed768c867792e3b2711e6f6c433a43af26dc910))
- **react:** improve code ([84950ec](https://github.com/alibaba/formily/commit/84950ecfabb4cfe7eea75bdda68f7de71762f5d0))
- **react:** improve code ([6a75fc3](https://github.com/alibaba/formily/commit/6a75fc3bc97d63d01972a2c8d3a5f535ee8de91e))
- **react:** improve code ([4eb89da](https://github.com/alibaba/formily/commit/4eb89da8383d2db43af64d4c01cc764b9b99a125))
- **react:** improve code ([6afc70c](https://github.com/alibaba/formily/commit/6afc70c54fbca7e67dac905355ca38833001aabf))
- **react:** improve code ([dcf19ad](https://github.com/alibaba/formily/commit/dcf19ad08f8bfb56d05448db0d0554a59e93255c))
- **react:** improve code ([dedc15e](https://github.com/alibaba/formily/commit/dedc15e477625227c2cded4eb105865c3a3c3dc5))
- **react:** improve code ([bc61cd6](https://github.com/alibaba/formily/commit/bc61cd665c6c26085e16af47e8d6093d3e4d4a63))
- **react:** improve code ([377b898](https://github.com/alibaba/formily/commit/377b898422468a9bc0b0c415024d73497ed902b7))
- **react:** improve code ([eeee6f8](https://github.com/alibaba/formily/commit/eeee6f88166d16ba9d313e8dbab8cc61aa4b8a58))
- **react:** improve code ([7e7d2c5](https://github.com/alibaba/formily/commit/7e7d2c5c7f9659406e8ea913cc01da6bc6356159))
- **react:** improve code ([86a4bab](https://github.com/alibaba/formily/commit/86a4bab50f3697c8bdcabf225741400bc296d903))
- **react:** improve code ([7f9fb94](https://github.com/alibaba/formily/commit/7f9fb947ce6f4792c2fc121e29f6b7772d6a15e5))
- **react:** improve code ([a34d7f9](https://github.com/alibaba/formily/commit/a34d7f92b5ac882eac7b05120f6abe6032659173))
- **react:** improve code ([8d3b96e](https://github.com/alibaba/formily/commit/8d3b96e9e10544921813ebaace7bca9e62348824))
- **react:** improve code ([5f8fc05](https://github.com/alibaba/formily/commit/5f8fc05a997326240a4ac135b9b335834b314b6a))
- **react:** improve code ([0943225](https://github.com/alibaba/formily/commit/094322563a6c8e93abfd1163197b1188b78182d6))
- **react:** improve code ([2c6d9e4](https://github.com/alibaba/formily/commit/2c6d9e409c81eca8f35565e471d235c795a052aa))
- **react:** improve code ([85907ef](https://github.com/alibaba/formily/commit/85907ef9de207b42be45a05fdb3f246264b63a6b))
- **react:** improve code ([8cbe0f4](https://github.com/alibaba/formily/commit/8cbe0f499c14bee42d3b189e8e90dfe17ed74e79))
- **react:** improve code ([d804a2c](https://github.com/alibaba/formily/commit/d804a2c281d20a3a8622549e12df040380b5e813))
- **react:** improve code ([0d694b9](https://github.com/alibaba/formily/commit/0d694b930dec20f83d15fe545f33f26de31f1ba1))
- **react:** improve code ([4508e33](https://github.com/alibaba/formily/commit/4508e332dc18beeb3fd4a8d035ce181d43f4483d))
- **react:** improve code ([e4e8225](https://github.com/alibaba/formily/commit/e4e8225029668fbedcfdc106453efdc2fe690d0d))
- **react:** improve code ([f078adf](https://github.com/alibaba/formily/commit/f078adfd114c6bbac6a9be3d9d9a597a150e4718))
- **react-logic-diagram:** update docs ([859feed](https://github.com/alibaba/formily/commit/859feedf38c3461f7c011c10dfc4189d19ffad41))
- **react-schema-field:** improve code ([692c3d0](https://github.com/alibaba/formily/commit/692c3d0099079f112bcc62afad648db931c26023))
- **react-schema-field:** improve code ([4ac569c](https://github.com/alibaba/formily/commit/4ac569ca812aeb96b5efdbf4580f536b35dd588a))
- **reactive:** computed annotation ([b9e6f09](https://github.com/alibaba/formily/commit/b9e6f09213987126deaa699ca683de6ecae4b5e6))
- **reactive:** recover batch.scope ([aeeb9f9](https://github.com/alibaba/formily/commit/aeeb9f94f74ec159426213bac6a65de0177784a3))
- **reactive:** switch formily core ([48a0094](https://github.com/alibaba/formily/commit/48a0094e2eff9e4e07ae6e12cbd147e60156b582))

### Performance Improvements

- **core:** improve performance ([bb2898d](https://github.com/alibaba/formily/commit/bb2898d3998dc25cabae1863f4a2aca8f56549c9))
- **path:** improve path performance ([4018d54](https://github.com/alibaba/formily/commit/4018d545bb601473b7079bd607ed0ac2a7d53cd1))

## 1.3.4 (2020-10-09)

### Bug Fixes

- **core:** fix hasChanged return type ([#1036](https://github.com/alibaba/formily/issues/1036)) ([d0eb66b](https://github.com/alibaba/formily/commit/d0eb66b67802289fe111c64d8a275201891b67ad))

## 1.3.3 (2020-09-21)

## 1.3.2 (2020-09-07)

## 1.3.1 (2020-08-20)

# 1.3.0 (2020-08-17)

## 1.2.11 (2020-08-03)

### Bug Fixes

- 回滚 mutators.move 行为 ([#984](https://github.com/alibaba/formily/issues/984)) ([010e149](https://github.com/alibaba/formily/commit/010e1495e83a002d734f775e7e45f1f14010865c))

## 1.2.10 (2020-07-28)

### Bug Fixes

- mutator insert ([#977](https://github.com/alibaba/formily/issues/977)) ([f335632](https://github.com/alibaba/formily/commit/f3356321c73c1ff0b8659efc5b14c13394ee4248))
- **core:** fix unmount remove errors ([#976](https://github.com/alibaba/formily/issues/976)) ([3da2765](https://github.com/alibaba/formily/commit/3da2765bbd7fdf9f8ca06105ca6fa9fda4a87e6b))

## 1.2.9 (2020-07-24)

## 1.2.8 (2020-07-21)

### Bug Fixes

- **core:** fix field default sync exception ([#970](https://github.com/alibaba/formily/issues/970)) ([d087281](https://github.com/alibaba/formily/commit/d08728173fa265342ad07b675f63c2d6d6d673b6))

### Performance Improvements

- **core:** improve array remove node performance ([#971](https://github.com/alibaba/formily/issues/971)) ([970adbb](https://github.com/alibaba/formily/commit/970adbbadf95a4f9a27926b0e16ff26a0823e5a8))

## 1.2.7 (2020-07-14)

### Bug Fixes

- **core:** fix move down throw errors and fix null assign merge throw errors ([#961](https://github.com/alibaba/formily/issues/961)) ([854feec](https://github.com/alibaba/formily/commit/854feec2c9312bc749df3e399be590df231cedef))

## 1.2.5 (2020-07-09)

### Bug Fixes

- **core:** fix array remove state exchange ([e6bed6c](https://github.com/alibaba/formily/commit/e6bed6c5047dc840421bf1d22bf01c215142ef24))
- **core:** fix array remove state exchange ([3d077e9](https://github.com/alibaba/formily/commit/3d077e9b5da3beab7c0f0aec1292e6545d3e004f))
- **core:** fix ci ([33a48c4](https://github.com/alibaba/formily/commit/33a48c469b6df13430ba163b6e9fafe7c41a4419))
- **core:** fix ci ([7c90009](https://github.com/alibaba/formily/commit/7c9000983dda22f573090f1eefc19f375f51130d))
- **core:** fix form ref values ([#952](https://github.com/alibaba/formily/issues/952)) ([777596b](https://github.com/alibaba/formily/commit/777596b75732340946c94c11e28147f838673ab9))
- **core:** fix unmount throw errors ([b84904c](https://github.com/alibaba/formily/commit/b84904cf2dd24ef8ac5b358e6ff7ea0338deb635))
- **core:** use form batch to sync errors in array state exchanging ([0e4880f](https://github.com/alibaba/formily/commit/0e4880fb510c1c79980e31a453679585aeb4a2d5))

## 1.2.4 (2020-07-06)

## 1.2.3 (2020-07-05)

### Bug Fixes

- **@formily/core:** fix unmountClearStates flags is not right ([#944](https://github.com/alibaba/formily/issues/944)) ([754a55f](https://github.com/alibaba/formily/commit/754a55f4d9d3f36e5648d03f8d5cd1db48989395))
- **core:** fix antd table get row key ([#946](https://github.com/alibaba/formily/issues/946)) ([6bda329](https://github.com/alibaba/formily/commit/6bda32964d457264766ef1f9ade1d77584c5c622))
- **core:** fix array list move algorithm ([#947](https://github.com/alibaba/formily/issues/947)) ([f6fc0bc](https://github.com/alibaba/formily/commit/f6fc0bc72804e89e8c5585ba7c5fad9c99dfc9c1))
- **core:** fix array move ([#945](https://github.com/alibaba/formily/issues/945)) ([6ac8312](https://github.com/alibaba/formily/commit/6ac8312c9593dc3c9f17d8c276619b06ef88bb1d))
- **core:** fix form change trigger ([#934](https://github.com/alibaba/formily/issues/934)) ([2958e00](https://github.com/alibaba/formily/commit/2958e00a707053442b46f0a845ac124f8ea0b0fb))
- **core:** fix reset deep children ([#933](https://github.com/alibaba/formily/issues/933)) ([c8dd390](https://github.com/alibaba/formily/commit/c8dd3908a551513328557105729994909f70c92a))

### Features

- **core:** support_disable_unmount_clear_states ([#938](https://github.com/alibaba/formily/issues/938)) ([236c781](https://github.com/alibaba/formily/commit/236c781204e8846b5ce778925a49da5ea51a0b62))

## 1.2.2 (2020-06-30)

### Bug Fixes

- **core:** fix value is overwritten by default ([#917](https://github.com/alibaba/formily/issues/917)) ([f3ad159](https://github.com/alibaba/formily/commit/f3ad1598dcaef5d2441e7e355a4b116e79e3858a))

# 1.2.0 (2020-06-28)

### Bug Fixes

- **core:** fix array list mutators ([#888](https://github.com/alibaba/formily/issues/888)) ([50f4e9e](https://github.com/alibaba/formily/commit/50f4e9e5b5d5380e73ae73e49f8ae169ab65afc5))
- **core:** fix event trigger order ([#908](https://github.com/alibaba/formily/issues/908)) ([ccac95b](https://github.com/alibaba/formily/commit/ccac95bc5645079550518a3c72a3208859471f35))
- **core:** fix intialValues sync ([#875](https://github.com/alibaba/formily/issues/875)) ([9847f7e](https://github.com/alibaba/formily/commit/9847f7ea8f243a4580015f60bfbf2b8fac9d6c23))
- **core:** fix rules normalize ([5b66de6](https://github.com/alibaba/formily/commit/5b66de63f0ad904891a7306ba6a2e5c351f4462c))
- **core:** fix trigger parent value changes ([f64d766](https://github.com/alibaba/formily/commit/f64d766dec18037a56bdff8933121c585aee9b67))
- **core:** fix types of errors/warnings in IFormState ([#898](https://github.com/alibaba/formily/issues/898)) ([b6bb1da](https://github.com/alibaba/formily/commit/b6bb1daa0a0369009b1f0cdeab53f3472bf72bec))
- **core:** fix value sync bug ([62c345c](https://github.com/alibaba/formily/commit/62c345c42437c421f633bf2d56e40708b5f067b3))
- **core:** sync form state ([#906](https://github.com/alibaba/formily/issues/906)) ([de32802](https://github.com/alibaba/formily/commit/de32802afe46587901bf6a617e4e33dde49ad530))
- **react:** fix ArrayTable index and FormSpy ([#904](https://github.com/alibaba/formily/issues/904)) ([944891f](https://github.com/alibaba/formily/commit/944891f78664a0d0334ac2ef528e32b4e7553f71))

### Features

- chore(publish): v1.2.0 ([34f15ce](https://github.com/alibaba/formily/commit/34f15ce59c40da4e444939833cbc225146dacb90))

## 1.1.6 (2020-05-25)

## 1.1.5 (2020-05-19)

## 1.1.4 (2020-05-18)

### Bug Fixes

- **core:** fix unmounteRemoveValue property is not work [#827](https://github.com/alibaba/formily/issues/827) ([#847](https://github.com/alibaba/formily/issues/847)) ([f53d02a](https://github.com/alibaba/formily/commit/f53d02aee34f2b7d5b8fedb05a0894cbb4dbc52b))

## 1.1.3 (2020-04-27)

### Bug Fixes

- **core:** fix immer autoFreeze and reset Native Object ([#816](https://github.com/alibaba/formily/issues/816)) ([aff2318](https://github.com/alibaba/formily/commit/aff23189a97fc1d6c99c3be53d47b75fecdc6ec6))

### Features

- **antd/next:** improve useFormTableQuery ([#821](https://github.com/alibaba/formily/issues/821)) ([2de71a3](https://github.com/alibaba/formily/commit/2de71a36951ce66da71d6d9cfd33daed6e1253c0))

## 1.1.2 (2020-04-19)

### Bug Fixes

- **core:** fix destruction default value is not work and fix typings ([#808](https://github.com/alibaba/formily/issues/808)) ([e032d4e](https://github.com/alibaba/formily/commit/e032d4e4b4093d5d81b60a230cf1ff7136503d26))

## 1.1.1 (2020-04-14)

### Bug Fixes

- **core:** fix ci ([a09bb07](https://github.com/alibaba/formily/commit/a09bb071ffaa32714100e193982cca7849f71ed9))
- **project:** fix [#788](https://github.com/alibaba/formily/issues/788) [#789](https://github.com/alibaba/formily/issues/789) [#790](https://github.com/alibaba/formily/issues/790) [#792](https://github.com/alibaba/formily/issues/792) ([#793](https://github.com/alibaba/formily/issues/793)) ([890b64e](https://github.com/alibaba/formily/commit/890b64eb44aada82b9a63fa60f7688d3fa5fb291))

### Features

- **core:** remove initializeLazySyncState ([70094be](https://github.com/alibaba/formily/commit/70094beb7878d51c81bfaf766e85c8d0e1071641))

### Performance Improvements

- **core:** improve initialize performance ([0c06596](https://github.com/alibaba/formily/commit/0c06596d412d7c10ab2b1ca0d61f2515bd3f778e))

# 1.1.0 (2020-04-05)

## 1.0.11 (2020-04-04)

### Bug Fixes

- **core:** add lifecycle buffer gc ([#773](https://github.com/alibaba/formily/issues/773)) ([360c211](https://github.com/alibaba/formily/commit/360c2110eb119e349f4f200f4213bff461ce6fa5))
- **core:** fix initialValues validate ([#770](https://github.com/alibaba/formily/issues/770)) ([ce2e2fc](https://github.com/alibaba/formily/commit/ce2e2fc8816cc55604e66105a42d9a85832ef0b6))
- **core:** Fix the wrong publishing sequence of initialization events ([#772](https://github.com/alibaba/formily/issues/772)) ([e2af6a7](https://github.com/alibaba/formily/commit/e2af6a717bbea981c627ed56af762e1f7a685f85))
- **core:** fix typings ([#762](https://github.com/alibaba/formily/issues/762)) ([e5ef40b](https://github.com/alibaba/formily/commit/e5ef40b4282b58bcadb4d2414012afe4d4fc0124))
- **devtools:** fix devtools performance ([#775](https://github.com/alibaba/formily/issues/775)) ([f041adf](https://github.com/alibaba/formily/commit/f041adfe08053015f9cb887c439d319214df9809))

## 1.0.10 (2020-03-28)

### Bug Fixes

- **core:** fix unmount onChange trigger and x-linkages array merge ([#742](https://github.com/alibaba/formily/issues/742)) ([b928dc3](https://github.com/alibaba/formily/commit/b928dc3a8bf0b7a93e89da15a76759d61dffb8f1))

### Performance Improvements

- **core:** improve validate perf ([#755](https://github.com/alibaba/formily/issues/755)) ([3ea6416](https://github.com/alibaba/formily/commit/3ea64169ceadc0c440965b00f984b9d2140796a1))

## 1.0.9 (2020-03-22)

### Bug Fixes

- **core:** fix field notify ([ca4ccec](https://github.com/alibaba/formily/commit/ca4ccec3db0bfb840de146fd6d4e089d128751bd))
- **schema-renderer:** fix linkage can not access expressionScope ([#726](https://github.com/alibaba/formily/issues/726)) ([27de669](https://github.com/alibaba/formily/commit/27de669a86c769f640eb4c2d66960b838f4f0bad))

### Features

- **core:** support pass FormPathPattern to createMutators, and fix some typings ([#728](https://github.com/alibaba/formily/issues/728)) ([c0798c6](https://github.com/alibaba/formily/commit/c0798c6d2ddd2a9fc7869c01e3fad164393cd829))
- **hooks:** add onSubmit hook and docs ([#727](https://github.com/alibaba/formily/issues/727)) ([b99be56](https://github.com/alibaba/formily/commit/b99be5668a0e823a3d5dccefffdb12629679ebf3))
- add recursive-render doc and fix some bugs ([#736](https://github.com/alibaba/formily/issues/736)) ([d7199d8](https://github.com/alibaba/formily/commit/d7199d82c67d56d9ac8d550fd266a2307597a088))

## 1.0.7 (2020-03-15)

### Features

- **core:** change visible behavior to fix array list delete auto assign value not work ([#725](https://github.com/alibaba/formily/issues/725)) ([366047e](https://github.com/alibaba/formily/commit/366047e68a92339d0060bd52bdf05db61e5fd9e5))

## 1.0.6 (2020-03-14)

### Bug Fixes

- **core:** fix typings ([#718](https://github.com/alibaba/formily/issues/718)) ([6000f71](https://github.com/alibaba/formily/commit/6000f71480d53140e7476b4734b8e52022f1c12e))

### Features

- **core:** Support form state modified property ([#717](https://github.com/alibaba/formily/issues/717)) ([68e395f](https://github.com/alibaba/formily/commit/68e395f82eaa5a5bc9fbaf7bb20735fb4279da87))
- **prject:** access unified log module ([#723](https://github.com/alibaba/formily/issues/723)) ([750ef0a](https://github.com/alibaba/formily/commit/750ef0af4cf0350235b2a616e35dee672c1b9e13))
- **shared:** support BigData ([#708](https://github.com/alibaba/formily/issues/708)) ([7343b96](https://github.com/alibaba/formily/commit/7343b96063ab988763e4b265cf47548c40fd3412))

### Performance Improvements

- **core:** fix nested path update performance ([#722](https://github.com/alibaba/formily/issues/722)) ([130feea](https://github.com/alibaba/formily/commit/130feeaeb2107849e378d8fb1b702167d93a7e89))

## 1.0.5 (2020-03-08)

## 1.0.3 (2020-02-29)

## 1.0.1 (2020-02-22)

### Bug Fixes

- **@formily/core:** fix onChange trigger times issue[#644](https://github.com/alibaba/formily/issues/644) ([#667](https://github.com/alibaba/formily/issues/667)) ([4499f9f](https://github.com/alibaba/formily/commit/4499f9f043afe12be56a6a974ee57dda798020c7))
- **@uform/antd:** time picker throw errors ([#589](https://github.com/alibaba/formily/issues/589)) ([9d8c1a0](https://github.com/alibaba/formily/commit/9d8c1a09003ee682a598cf4a9a051ef945ef1028))
- **@uform/antd/next:** fix components error ([8edf2e9](https://github.com/alibaba/formily/commit/8edf2e9822f8b3a0acdfd15ca95f286fe1739217))
- **@uform/core:** add onFormReset hook ([8633ae5](https://github.com/alibaba/formily/commit/8633ae5f4d14a2f9a03c494d870df3a996497f39))
- **@uform/core:** add values to submit resolve callback params ([#508](https://github.com/alibaba/formily/issues/508)) ([06c4f63](https://github.com/alibaba/formily/commit/06c4f631b62884d9cdc8f0ff3ec8fe2c105011dd))
- **@uform/core:** compat onFormSubmit ([#462](https://github.com/alibaba/formily/issues/462)) ([8dfe105](https://github.com/alibaba/formily/commit/8dfe10503f0b6cba59d37feaccbec79a0ba40797))
- **@uform/core:** fix batch update([#497](https://github.com/alibaba/formily/issues/497)) ([5d3abb4](https://github.com/alibaba/formily/commit/5d3abb4aeda34d9206c8589031fc8de0bb9531ac))
- **@uform/core:** fix effect errors can not prevent submit ([#595](https://github.com/alibaba/formily/issues/595)) ([11dc893](https://github.com/alibaba/formily/commit/11dc8933c93cc567c497dcf4821419011b818257))
- **@uform/core:** fix init visible can not remove value ([#492](https://github.com/alibaba/formily/issues/492)) ([a6dcc18](https://github.com/alibaba/formily/commit/a6dcc18db566c287764e9ba1eed40e05fbe84960))
- **@uform/core:** fix onsubmit immutable values ([#424](https://github.com/alibaba/formily/issues/424)) ([06677ad](https://github.com/alibaba/formily/commit/06677ad8965c81c8b1b6fb2ec3672d02f69e5407))
- **@uform/core:** fix position of stack counter ([ba5678c](https://github.com/alibaba/formily/commit/ba5678c2b2fe1b7dbabfc5129186ab14ec031567))
- **@uform/core:** fix process calculation logic ([42952c2](https://github.com/alibaba/formily/commit/42952c2b3557c8000bab44e35478218e7baf6e64))
- **@uform/core:** fix required ([#404](https://github.com/alibaba/formily/issues/404)) ([7b73255](https://github.com/alibaba/formily/commit/7b73255bcbdce8266b59ff542f4b165fe547198f))
- **@uform/core:** fix submit catch error ([#603](https://github.com/alibaba/formily/issues/603)) ([406f9fb](https://github.com/alibaba/formily/commit/406f9fb9941863ac02f9817c1a9f91b4252787f8))
- **@uform/core:** fix sync value ([#460](https://github.com/alibaba/formily/issues/460)) ([9e72dd6](https://github.com/alibaba/formily/commit/9e72dd6f0faae45b875e5598dbcd88c342a563dc))
- **@uform/core:** fix visible/display behave ([86dd387](https://github.com/alibaba/formily/commit/86dd3873f2749f6f69217a6bb2d2fdff7d14f70a))
- **@uform/core:** validate ([#484](https://github.com/alibaba/formily/issues/484)) ([9093ab2](https://github.com/alibaba/formily/commit/9093ab2b22e622d902f23de907c93f8e29952512))
- **@uform/core/react:** fix [#613](https://github.com/alibaba/formily/issues/613) [#615](https://github.com/alibaba/formily/issues/615) ([#618](https://github.com/alibaba/formily/issues/618)) ([8dc609f](https://github.com/alibaba/formily/commit/8dc609f948673f26be4d001462c4ca09a554d3b4))
- **@uform/react-shared-components:** fix text ([#349](https://github.com/alibaba/formily/issues/349)) ([209a4da](https://github.com/alibaba/formily/commit/209a4da200e0d896c7e4a98df90042a84020d38e))
- **@uform/shared:** fix isValid ([#604](https://github.com/alibaba/formily/issues/604)) ([4136691](https://github.com/alibaba/formily/commit/4136691d6a24dbe54b14f6fc8cdb2fa718b931fd))
- **meet:** fix ci ([#660](https://github.com/alibaba/formily/issues/660)) ([0aba448](https://github.com/alibaba/formily/commit/0aba4483b2efd522d1e3fce0205174e0edf957be))
- **uform/core:** recover field visible/display state after parent changed ([#567](https://github.com/alibaba/formily/issues/567)) ([d270ef7](https://github.com/alibaba/formily/commit/d270ef785d61c8330e29b3595108aa727c014b9f))
- build on windows ([#539](https://github.com/alibaba/formily/issues/539)) ([8ad9932](https://github.com/alibaba/formily/commit/8ad9932232f787793603273a670cfe532b53eecc))
- issue[#543](https://github.com/alibaba/formily/issues/543) ([#545](https://github.com/alibaba/formily/issues/545)) ([ec9c0df](https://github.com/alibaba/formily/commit/ec9c0dfca2aeb96ab73b1afd6626ad09c281290f))

### Features

- **@uform/antd/next:** improve form step ([#431](https://github.com/alibaba/formily/issues/431)) ([b446c02](https://github.com/alibaba/formily/commit/b446c028af8552ebd0466564479d270945b040a5))
- **@uform/antd/next:** Support error scroll ([#419](https://github.com/alibaba/formily/issues/419)) ([204b2ad](https://github.com/alibaba/formily/commit/204b2ad87332d5a6ca65551d5e4550e31c6bb03b))
- **@uform/core:** reset add clearInitialValue ([#627](https://github.com/alibaba/formily/issues/627)) ([02e715c](https://github.com/alibaba/formily/commit/02e715ce7caea1f36a6a1e44c7c580c025cea1a0))
- **@uform/core:** support pass visible/display of register method ([#421](https://github.com/alibaba/formily/issues/421)) ([908882a](https://github.com/alibaba/formily/commit/908882a2968db2b0fbde4792f6c8ca7dc2725016))
- **@uform/core/react:** add unittest and add lifecycles ([#536](https://github.com/alibaba/formily/issues/536)) ([8550732](https://github.com/alibaba/formily/commit/855073222895079893548619e3381835c9ef8127))
- **@uform/react:** support filter changed ([#353](https://github.com/alibaba/formily/issues/353)) ([fc516fb](https://github.com/alibaba/formily/commit/fc516fbcec5bf1910d40a2b90774078b7e30bb9e))
- add docs and some test cases ([#395](https://github.com/alibaba/formily/issues/395)) ([ecff8ef](https://github.com/alibaba/formily/commit/ecff8efff7fa7c1459cd5d3fd3104feeebc1355a))
- add silent option ([#377](https://github.com/alibaba/formily/issues/377)) ([4377180](https://github.com/alibaba/formily/commit/4377180973affe0fa18457e8f1db72b3e7df4169))
- onFieldChange types ([e933304](https://github.com/alibaba/formily/commit/e9333042a27119599e9751aa50ba736a0a19d18b))
- update formitem props ([#614](https://github.com/alibaba/formily/issues/614)) ([1ff5f8b](https://github.com/alibaba/formily/commit/1ff5f8bcdf031c507d5a5ab975245346681191f7))
- **@uform/react-schema-renderer:** improve linkage ([3261894](https://github.com/alibaba/formily/commit/3261894ea0e3ad8abd04e594164f8da3ed4df809))
- **core:** add graph unit test ([#357](https://github.com/alibaba/formily/issues/357)) ([778a020](https://github.com/alibaba/formily/commit/778a0201dcba43cf20a523f4c909db4a1de31a9e))
- **core:** add model unit test ([#359](https://github.com/alibaba/formily/issues/359)) ([e7edcfa](https://github.com/alibaba/formily/commit/e7edcfa202f78cbd14b84043972135487937fa58))
- **project:** rename uform==>formily ([#636](https://github.com/alibaba/formily/issues/636)) ([48c47c2](https://github.com/alibaba/formily/commit/48c47c2946f49bd71559173ad9ceed69546457f8))

## 0.4.3 (2019-09-30)

## 0.4.2 (2019-09-23)

## 0.4.1 (2019-09-09)

# 0.4.0 (2019-09-01)

### Bug Fixes

- **@uform/core:** fix async validate prevent submit ([#290](https://github.com/alibaba/formily/issues/290)) ([efdf0bf](https://github.com/alibaba/formily/commit/efdf0bf2f7d71d32f1b31c9c0facacec0c8b1b1f))
- **core:** Increase lastValidateValue value processing during initialization ([#276](https://github.com/alibaba/formily/issues/276)) ([045f6fe](https://github.com/alibaba/formily/commit/045f6fea44588dd0dc6a5c15cba5dca26dcb432e))

## 0.3.11 (2019-08-18)

## 0.3.10 (2019-08-10)

### Bug Fixes

- **@uform/core:** add scheduler backward compat ([#251](https://github.com/alibaba/formily/issues/251)) ([ed94834](https://github.com/alibaba/formily/commit/ed9483480fdd5a6696414e97c44d2f430de4efc9))
- **@uform/core:** scheduler compact ([#246](https://github.com/alibaba/formily/issues/246)) ([a06598d](https://github.com/alibaba/formily/commit/a06598ddf5128c6e110810691d21f434fc9fa477))

## 0.3.9 (2019-08-06)

## 0.3.9-beta.0 (2019-08-06)

## 0.3.8 (2019-08-06)

### Bug Fixes

- **@uform/core:** fix value can't be remove in onFieldChange subscriber ([#233](https://github.com/alibaba/formily/issues/233)) ([3896efb](https://github.com/alibaba/formily/commit/3896efb6309aa80050bde54198bf2c69fd3df64c))
- **@uform/react:** invariant initialValues will not be changed when form rerender ([#214](https://github.com/alibaba/formily/issues/214)) ([b9efa4c](https://github.com/alibaba/formily/commit/b9efa4ca8b74fdf24761264d96aaaaf33482d6a0))

## 0.3.7 (2019-07-30)

## 0.3.6 (2019-07-25)

## 0.3.5 (2019-07-25)

## 0.3.4 (2019-07-25)

### Bug Fixes

- **@uform/core:** fix field props transformer is not work ([e149be8](https://github.com/alibaba/formily/commit/e149be8d2c7e85e176ff3b0c29a3ca02dd12c573))

## 0.3.3 (2019-07-23)

### Bug Fixes

- **@uform/core:** fix setFormState is not work( [#189](https://github.com/alibaba/formily/issues/189)) ([66eb0a2](https://github.com/alibaba/formily/commit/66eb0a2d8ffde1ea778daca65d76f50310bc1d18))
- **@uform/core:** remove excess updateChildVisible ([#183](https://github.com/alibaba/formily/issues/183)) ([ce88670](https://github.com/alibaba/formily/commit/ce88670bbc11ab637592b7e2d8c6ba91dd9a31c7))

## 0.3.2 (2019-07-18)

### Bug Fixes

- **@uform/core:** Fix the parameters of changeEditable api which have been defined in interface IField. ([#180](https://github.com/alibaba/formily/issues/180)) ([54daf28](https://github.com/alibaba/formily/commit/54daf28dfaf48e2cf8caaff1cf743510b036db83))
- **utils:** adjust the order of getting self ([#178](https://github.com/alibaba/formily/issues/178)) ([4ef2e1c](https://github.com/alibaba/formily/commit/4ef2e1cabec811c852a591e0d5cc6beadb39794f))

## 0.3.1 (2019-07-16)

### Bug Fixes

- **typescript:** fix ts build can not transplie jsx ([0dfcba7](https://github.com/alibaba/formily/commit/0dfcba7c4c3e823edbe5718ff6d00cd09693fbc7))
- **typescript:** fix typescript config ([546d9f0](https://github.com/alibaba/formily/commit/546d9f01ba63853b69c52078c214d9c3f76abf98))

### Reverts

- Revert "chore(publish): v0.3.0" ([d02c102](https://github.com/alibaba/formily/commit/d02c102eebba43b2dbbd982f8080adc2b9c3eb96))

# 0.3.0 (2019-07-15)

### Bug Fixes

- **@uform/react:** Fix form controlled ([#167](https://github.com/alibaba/formily/issues/167)) ([c12ecb9](https://github.com/alibaba/formily/commit/c12ecb912fdebc1e5427394d392dd78ed538e364))

### Features

- **@uform/core:** support display of fieldState ([#166](https://github.com/alibaba/formily/issues/166)) ([e0ae0fb](https://github.com/alibaba/formily/commit/e0ae0fb8a80a7be7c839de1c3b731b99f50c4fe1))
- **@uform/core:** support onFieldInit ([#171](https://github.com/alibaba/formily/issues/171)) ([0dfadc0](https://github.com/alibaba/formily/commit/0dfadc013c5ae9003db1d2694e092bad01db0b56))
- **@uform/react:** Feat improve broadcast ([#169](https://github.com/alibaba/formily/issues/169)) ([177d6b2](https://github.com/alibaba/formily/commit/177d6b21d75de3b94da0033746c7d88da455b7ab))
- **@uform/types:** improve types ([#168](https://github.com/alibaba/formily/issues/168)) ([0e6fd69](https://github.com/alibaba/formily/commit/0e6fd69c8e67ab8be75c0a65b36671ab2ab783ac))
