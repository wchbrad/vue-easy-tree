<template>
  <div
    v-show="node.visible"
    ref="node"
    class="el-tree-node"
    :class="{
      'is-expanded': expanded,
      'is-current': node.isCurrent,
      'is-hidden': !node.visible,
      'is-focusable': !node.disabled,
      'is-checked': !node.disabled && node.checked,
      'is-treeline': tree.treeLine
    }"
    role="treeitem"
    tabindex="-1"
    :aria-expanded="expanded"
    :aria-disabled="node.disabled"
    :aria-checked="node.checked"
    :draggable="tree.draggable"
    @click.stop="handleClick"
    @contextmenu="($event) => this.handleContextMenu($event)"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
  >
    <div class="el-tree-node__content" :style="`height: ${itemSize}px;`">
      <b
        aria-hidden="true"
        class="ele-tree-indent"
        v-for="(item,index) in (node.level - 1)"
        :style="{
          'min-width':  tree.indent + 'px',
        }"
      ></b>
      <span
        :class="[
          {
            'is-leaf': node.isLeaf,
            expanded: !node.isLeaf && expanded,
          },
          'el-tree-node__expand-icon',
          'el-tree-node__expand-icon-no-transition',
          tree.treeLine ? (!node.isLeaf && expanded ? 'el-icon-remove-outline no-rotate' : 'el-icon-circle-plus-outline no-rotate') : (tree.iconClass ? tree.iconClass : 'el-icon-caret-right')
        ]"
        @click.stop="handleExpandIconClick"
      ></span>
      <el-checkbox
        v-if="showCheckbox"
        v-model="node.checked"
        :indeterminate="node.indeterminate"
        :disabled="!!node.disabled"
        @click.native.stop
        @change="handleCheckChange"
      ></el-checkbox>
      <span
        v-if="node.loading"
        class="el-tree-node__loading-icon el-icon-loading"
      ></span>
      <node-content :node="node"></node-content>
    </div>
  </div>
</template>

<script type="text/jsx">
import ElCheckbox from "./packages/checkbox";
import emitter from "./mixins/emitter";
import commonMethods from "./mixins/common-methods";

export default {
  name: "ElTreeVirtualNode",
  componentName: "ElTreeVirtualNode",

  components: {
    ElCheckbox,
    NodeContent: {
      props: {
        node: {
          required: true,
        },
      },
      render(h) {
        const parent = this.$parent;
        const tree = parent.tree;
        const node = this.node;
        const { data, store } = node;
        return parent.renderContent
          ? parent.renderContent.call(parent._renderProxy, h, {
              _self: tree.$vnode.context,
              node,
              data,
              store,
            })
          : tree.$scopedSlots.default
          ? tree.$scopedSlots.default({ node, data })
          : h(
              "span",
              {
                class: "el-tree-node__label",
              },
              node.label
            );
      },
    },
  },

  mixins: [emitter, commonMethods],

  props: {
    itemSize: {
      type: Number,
      default: 26,
    },
    node: {
      default() {
        return {};
      },
    },
    renderContent: Function,
    showCheckbox: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      tree: null,
      expanded: false,
      childNodeRendered: false,
      oldChecked: null,
      oldIndeterminate: null,
    };
  },

  watch: {
    "node.indeterminate"(val) {
      this.handleSelectChange(this.node.checked, val);
    },

    "node.checked"(val) {
      this.handleSelectChange(val, this.node.indeterminate);
    },

    "node.expanded"(val) {
      this.$nextTick(() => (this.expanded = val));
      if (val) {
        this.childNodeRendered = true;
      }
    },
  },
  methods: {},

  created() {
    this.init(this.$parent.$parent);
  },
};
</script>
<style scoped>
.el-tree-node__expand-icon.no-rotate{
  transform: none;
}
.ele-tree-indent{
  position: relative;
  height: 100%;
}
.is-treeline .ele-tree-indent::before{
  position: absolute;
  top: -2px;
  right: 6px;
  bottom: -2px;
  border-right: 1px solid #d9d9d9;
  content: "";
}
.is-treeline .ele-tree-indent:last-of-type::after{
  position: absolute;
  top: 12px;
  left: 11px;
  display: block;
  width: 14px;
  height: 1px;
  background-color: #d9d9d9;
  content: "";
}
</style>
