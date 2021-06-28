# 查询列表

查询列表目前formily对应的解决方案是阿里巴巴统一列表组件 [AList](https://alist.wiki)，具体参考AList写法

在1.x中，我们提供了useFormTableQuery的React Hook给用户使用，但是发现，该Hook
- 在简单场景，其实使用 [ahooks](https://ahooks.js.org/)中的useTable就能解决问题
- 复杂场景，useFormTableQuery的抽象度又并不高，还是会导致很多样板代码，相反 [AList](https://alist.wiki) 在复杂场景的表现则很优秀

所以，专业的领域就让专业的项目去解决吧，Formily的定位始终还是表单