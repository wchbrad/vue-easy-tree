import { getNodeKey } from "../model/util";

export default {
    methods: {
        init(parent) {
            if (parent.isTree) {
                this.tree = parent;
            } else {
                this.tree = parent.tree;
            }

            const tree = this.tree;
            if (!tree) {
                console.warn("Can not find node's tree.");
            }

            const props = tree.props || {};
            const childrenKey = props["children"] || "children";

            this.$watch(`node.data.${childrenKey}`, () => {
                this.node.updateChildren();
            });

            if (this.node.expanded) {
                this.expanded = true;
                this.childNodeRendered = true;
            }

            if (this.tree.accordion && !this.tree.height) {
                this.$on("tree-node-expand", (node) => {
                    if (this.node !== node) {
                        this.node.collapse();
                    }
                });
            }
        },

        getNodeKey(node) {
            return getNodeKey(this.tree.nodeKey, node.data);
        },
        handleDragStart(event) {
            if (!this.tree.draggable) return;
            this.tree.$emit("tree-node-drag-start", event, this);
        },

        handleDragOver(event) {
            if (!this.tree.draggable) return;
            this.tree.$emit("tree-node-drag-over", event, this);
            event.preventDefault();
        },

        handleDragEnd(event) {
            if (!this.tree.draggable) return;
            this.tree.$emit("tree-node-drag-end", event, this);
        },

        handleDrop(event) {
            event.preventDefault();
        },

        handleSelectChange(checked, indeterminate) {
            const node = this.node;

            if (
                this.oldChecked !== checked &&
                this.oldIndeterminate !== indeterminate
            ) {
                this.tree.$emit(
                    "check-change",
                    node.data,
                    checked,
                    indeterminate,
                );
            }
            this.oldChecked = checked;
            this.indeterminate = indeterminate;
        },

        handleClick() {
            const node = this.node;
            const store = this.tree.store;

            store.setCurrentNode(node);
            this.tree.$emit(
                "current-change",
                store.currentNode ? store.currentNode.data : null,
                store.currentNode,
            );
            this.tree.currentNode = this;
            if (this.tree.expandOnClickNode) {
                this.handleExpandIconClick();
            }
            if (this.tree.checkOnClickNode && !node.disabled) {
                this.handleCheckChange(null, {
                    target: { checked: !node.checked },
                });
            }

            this.tree.$emit("node-click", node.data, node, this);
        },

        handleContextMenu(event) {
            const node = this.node;

            if (
                this.tree._events["node-contextmenu"] &&
                this.tree._events["node-contextmenu"].length > 0
            ) {
                event.stopPropagation();
                event.preventDefault();
            }
            this.tree.$emit("node-contextmenu", event, node.data, node, this);
        },

        handleExpandIconClick() {
            const node = this.node;

            if (node.isLeaf) return;
            if (this.expanded) {
                this.tree.$emit("node-collapse", node.data, node, this);
                node.collapse();
            } else {
                node.expand();
                this.$emit("node-expand", node.data, node, this);
            }
        },

        handleCheckChange(_, ev) {
            const node = this.node;

            node.setChecked(ev.target.checked, !this.tree.checkStrictly);
            this.$nextTick(() => {
                const store = this.tree.store;
                this.tree.$emit("check", node.data, {
                    checkedNodes: store.getCheckedNodes(),
                    checkedKeys: store.getCheckedKeys(),
                    halfCheckedNodes: store.getHalfCheckedNodes(),
                    halfCheckedKeys: store.getHalfCheckedKeys(),
                });
            });
        },

        handleChildNodeExpand(nodeData, node, instance) {
            this.broadcast(this.tree.treeNodeName, "tree-node-expand", node);
            this.tree.$emit("node-expand", nodeData, node, instance);
        },
    },
};