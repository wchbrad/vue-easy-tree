[![npm](https://img.shields.io/npm/v/@wchbrad/vue-easy-tree.svg)](https://www.npmjs.com/package/@wchbrad/vue-easy-tree)
[![vue2](https://img.shields.io/badge/vue-2.6+-brightgreen.svg)](https://vuejs.org/)
[![last commit](https://img.shields.io/github/last-commit/wchbrad/vue-easy-tree.svg)](https://www.npmjs.com/package/@wchbrad/vue-easy-tree)
[![NPM downloads](https://img.shields.io/npm/dm/@wchbrad/vue-easy-tree.svg?style=flat)](https://npmjs.org/package/@wchbrad/vue-easy-tree)
[![license](https://img.shields.io/npm/l/@wchbrad/vue-easy-tree.svg?maxAge=2592000)](http://www.opensource.org/licenses/mit-license.php)

# vue-easy-tree

[English](./README.md) | **中文**

## 介绍

一款基于vue2.x，同时支持少量数据或大量数据、多种功能和虚拟滚动的树组件。

基于[element-ui](https://element.eleme.cn/#/zh-CN/component/tree)(License:MIT)中抽取的tree样式和功能，结合[vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)(License:MIT)所做的树组件。

## v1.0 功能列表 [![npm](https://img.shields.io/npm/v/@wchbrad/vue-easy-tree.svg)](https://www.npmjs.com/package/@wchbrad/vue-easy-tree)

-   大数据量支持虚拟滚动
-   基本树形数据的展示
-   支持checkbox选择
-   支持懒加载
-   默认展开和默认选中
-   禁用节点
-   通过多种方式选中节点和获取选中的节点信息
-   支持自定义节点内容
-   支持节点过滤
-   非虚拟滚动下，支持手风琴模式
-   非懒加载时，支持节点拖拽

## 特点

-   支持虚拟滚动
-   不仅支持大数据量的树形数据展示，还支持数据的操作和更改

## 安装

```
npm install @wchbrad/vue-easy-tree
```

或

```
yarn add @wchbrad/vue-easy-tree
```

## 引入

### 全局引入

在 `main.js` 文件中引入：

```JS
import Vue from "vue";
import VueEasyTree from "@wchbrad/vue-easy-tree";
// 样式文件，可以根据需要自定义样式或主题
import "@wchbrad/vue-easy-tree/src/assets/index.scss"

Vue.use(VueEasyTree)
```

### 组件引入

在组件中引入：

```JS
import VueEasyTree from "@wchbrad/vue-easy-tree";
// 样式文件，可以根据需要自定义样式或主题
import "@wchbrad/vue-easy-tree/src/assets/index.scss"

export default {
  components: {
    VueEasyTree
  }
}
```

## 使用:

:warning: 在使用虚拟滚动时，必须设置 `node-key`。

```html
<template>
  <div class="ve-tree" style="height:calc(100vh - 20px)">
  <!-- 不使用虚拟滚动时只需去掉height参数即可 -->
    <vue-easy-tree
      ref="veTree"
      node-key="id"
      height="calc(100vh - 20px)"
      :data="treeData"
      :props="props"
    ></vue-easy-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      props: {
        label: "name",
        children: "children"
      },
      treeData: []
    };
  },
  created() {
    const data = [],
      root = 8,
      children = 3,
      base = 1000;
    for (let i = 0; i < root; i++) {
      data.push({
        id: `${i}`,
        name: `test-${i}`,
        children: []
      });
      for (let j = 0; j < children; j++) {
        data[i].children.push({
          id: `${i}-${j}`,
          name: `test-${i}-${j}`,
          children: []
        });
        for (let k = 0; k < base; k++) {
          data[i].children[j].children.push({
            id: `${i}-${j}-${k}`,
            name: `test-${i}-${j}-${k}`
          });
        }
      }
    }
    this.treeData = data;
  }
};
</script>

```

## 在项目中改变 SCSS 变量
通过新建一个样式文件，如：`ve-tree-var.scss`，写入以下内容：

```JS
/* 改变主题色变量 */
$--color-primary: #ea5404;

/* 改变 icon 字体路径变量，必需 */
$--font-path: "~@wchbrad/vue-easy-tree/src/assets/fonts";

@import "@wchbrad/vue-easy-tree/src/assets/index.scss";
```
:warning: 需要注意的是，覆盖字体路径变量是必需的，将其赋值为 @wchbrad/vue-easy-tree 中 icon 图标所在的相对路径即可。

然后在 `main.js` 中直接引入以上样式文件即可：
```JS
import Vue from 'vue'
import VueEasyTree from "@wchbrad/vue-easy-tree";
import "./css/ve-tree-var.scss"

Vue.use(VueEasyTree)
```


## 其它属性和方法

**来自[element-ui 官方文档](https://element.eleme.cn/#/zh-CN/component/tree)**<br />
**需要使用虚拟滚动时，增加 `height` 属性即可，如：**
```html
<vue-easy-tree :data="data" height="calc(100vh - 20px)" :props="defaultProps" @node-click="handleNodeClick"></vue-easy-tree>
```

**[快速查看示例和api](./element-ui-tree.zh-CN.md)**


## License

[MIT](http://www.opensource.org/licenses/mit-license.php)
