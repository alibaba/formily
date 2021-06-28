# Type Checker

## isObservable

#### 描述

判断某个对象是否是 observable 对象

#### 签名

```ts
interface isObservable {
  (target: any): boolean
}
```

## isAnnotation

#### 描述

判断某个对象是否是 Annotation

#### 签名

```ts
interface isAnnotation {
  (target: any): boolean
}
```

## isSupportObservable

#### 描述

判断某个对象是否可以被 observable

#### 签名

```ts
interface isSupportObservable {
  (target: any): boolean
}
```
