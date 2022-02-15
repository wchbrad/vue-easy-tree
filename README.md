[![npm](https://img.shields.io/npm/v/@wchbrad/vue-easy-tree.svg)](https://www.npmjs.com/package/@wchbrad/vue-easy-tree)
[![vue2](https://img.shields.io/badge/vue-2.6+-brightgreen.svg)](https://vuejs.org/)
[![last commit](https://img.shields.io/github/last-commit/wchbrad/vue-easy-tree.svg)](https://www.npmjs.com/package/@wchbrad/vue-easy-tree)
[![NPM downloads](https://img.shields.io/npm/dm/@wchbrad/vue-easy-tree.svg?style=flat)](https://npmjs.org/package/@wchbrad/vue-easy-tree)
[![license](https://img.shields.io/npm/l/@wchbrad/vue-easy-tree.svg?maxAge=2592000)](http://www.opensource.org/licenses/mit-license.php)

# vue-easy-tree

**English** | [中文](./README.zh-CN.md)

## Introduction
A tree component based on vue2.x that supports a small amount of data or a large amount of data, multiple functions, and virtual scrolling.

Based on the tree style and function extracted from [element-ui](https://element.eleme.cn/#/en-US/component/tree)(License:MIT), combined with [vue-virtual-scroller](https://github.com/Akryum/vue-virtual-scroller)(License:MIT) tree component.

## v1.0 Feature List [![npm](https://img.shields.io/npm/v/@wchbrad/vue-easy-tree.svg)](https://www.npmjs.com/package/@wchbrad/vue-easy-tree)

-  Large data volume supports virtual scrolling
-  Display of basic tree data
-  Support checkbox selection
-  Support lazy loading
-  Expanded by default and selected by default
-  Disable node
-  Select nodes and obtain selected node information in a variety of ways
-  Support custom node content
-  Support node filtering
-  Support accordion mode under non-virtual scrolling
-  Support node drag and drop when non-lazy loading

## Features

-  Support virtual scrolling
-  Not only supports tree-shaped data display with large amounts of data, but also supports data manipulation and modification


## Install

```
npm install @wchbrad/vue-easy-tree
```

or

```
yarn add @wchbrad/vue-easy-tree
```

## Mount

### mount with global

Import in the `main.js` file:

```JS
import Vue from "vue";
import VueEasyTree from "@wchbrad/vue-easy-tree";
// Style file, you can customize the style or theme according to your needs
import "@wchbrad/vue-easy-tree/src/assets/index.scss"

Vue.use(VueEasyTree)
```

### mount with component

Import in the component：

```JS
import VueEasyTree from "@wchbrad/vue-easy-tree";
// Style file, you can customize the style or theme according to your needs
import "@wchbrad/vue-easy-tree/src/assets/index.scss"

export default {
  components: {
    VueEasyTree
  }
}
```

## Usage:

:warning: When using virtual scrolling, `node-key` must be set

```html
<template>
  <div class="ve-tree" style="height:calc(100vh - 20px)">
  <!-- Just remove the height parameter when not using virtual scrolling -->
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

## Change SCSS variables in the project
By creating a new style file, such as: `ve-tree-var.scss`, write the following content：

```JS
/* Change theme color variable */
$--color-primary: #ea5404;

/* Change the icon font path variable, required */
$--font-path: "~@wchbrad/vue-easy-tree/src/assets/fonts";

@import "@wchbrad/vue-easy-tree/src/assets/index.scss";
```
:warning: It should be noted that it is necessary to override the font path variable, and assign it to the relative path where the icon icon in @wchbrad/vue-easy-tree is located.

Then directly import the above style files in `main.js`：
```JS
import Vue from 'vue'
import VueEasyTree from "@wchbrad/vue-easy-tree";
import "./css/ve-tree-var.scss"

Vue.use(VueEasyTree)
```

## Other properties and methods

**From [element-ui official document](https://element.eleme.cn/#/en-US/component/tree)**<br />
**When you need to use virtual scrolling, just add the `height` property, such as:**
```html
<vue-easy-tree :data="data" height="calc(100vh - 20px)" :props="defaultProps" @node-click="handleNodeClick"></vue-easy-tree>
```

**[Quick view of examples and api](./element-ui-tree.md)**


## License

[MIT](http://www.opensource.org/licenses/mit-license.php)