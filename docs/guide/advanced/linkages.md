# 实现联动逻辑

Formily1.x中实现联动逻辑只有一种模式，也就是主动模式，必须要监听一个或多个字段的事件变化去控制另一个或者多个字段的状态，这样对于一对多联动场景很方便，但是对于多对一场景就很麻烦了，需要监听多个字段的变化去控制一个字段状态，所以Formily2.x提供了响应式机制，可以让联动支持被动式联动，只需要关注某个字段所依赖的字段即可，依赖字段变化了，被依赖的字段即可自动联动。

实现联动逻辑的方式主要有以下三种方式：
- Form effects中实现
- Field reactions中实现
- Schema x-reactions中实现

## 主动联动

### 一对一联动

#### Form Effects案例

#### Field reactions案例

#### Schema x-reactions案例

### 一对多联动

#### Form Effects案例

#### Field reactions案例

#### Schema x-reactions案例

### 多对一联动

#### Form Effects案例

#### Field reactions案例

#### Schema x-reactions案例

### 多对多联动

#### Form Effects案例

#### Field reactions案例

#### Schema x-reactions案例

### 循环联动

#### Form Effects案例

#### Field reactions案例

#### Schema x-reactions案例

## 被动联动

### 一对一联动

#### Form Effects案例

#### Field reactions案例

#### Schema x-reactions案例

### 一对多联动

#### Form Effects案例

#### Field reactions案例

#### Schema x-reactions案例

### 多对一联动

#### Form Effects案例

#### Field reactions案例

#### Schema x-reactions案例

### 多对多联动

#### Form Effects案例

#### Field reactions案例

#### Schema x-reactions案例

### 循环联动

#### Form Effects案例

#### Field reactions案例

#### Schema x-reactions案例