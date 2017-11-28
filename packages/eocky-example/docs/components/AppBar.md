## AppBar

[app bar](https://material.google.com/layout/structure.html#structure-app-bar) 相当于安卓应用中的 action bar, 是一种特殊的工具栏，用于放置 logo，导航菜单，搜索以及一些按钮。

```san-example
<template>
    <div>
        <san-appbar title="SAN-MUI" class="example-drawer-appbar" />
    </div>
</template>
<script>
import {AppBar} from 'san-mui';
export default {
    components: {
        'san-appbar': AppBar
    }
};
</script>
```
## API

### 属性

| 名称 | 类型 | 必须 | 默认值 | 描述 |
| --- | --- | --- | --- | --- |
| title | string | true | 无 | 标题 |
| zDepth | number | 1 | false | 阴影深度，不显示阴影设为 0 |
| showLeftIcon | boolean | false | true | 显示左侧icon |
| showRightIcon | boolean | false | true | 展示右侧icon |

### 事件

无

### 插槽

|名称|描述|
|---|---|
|left|左侧按钮|
|right|右侧按钮|
