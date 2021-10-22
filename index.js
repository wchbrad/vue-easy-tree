import veTree from "./src/components/ve-tree.vue";

veTree.install = function(Vue) {
    Vue.component(veTree.name, veTree);
};

export default veTree;