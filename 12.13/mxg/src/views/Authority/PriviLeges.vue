<template>
  <div>
    <el-dialog title="分配权限" :visible.sync="dialogFormVisible">
      <el-tree
        :data="treeList"
        show-checkbox
        node-key="id"
        default-expand-all
        @getHalfCheckedKeys="trueTree(val)"
        :default-checked-keys="[5]"
        :props="defaultProps"
        ref="tree"
      >
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="upTree">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { treeRoles } from "@/api/roles"
export default {
  data() {
    return {
      defaultProps: {
        // 指定子树
        children: "children",
        // 指定节点标签
        label: "authName"
      },
      // 分配权限
      treeList: [],
      // 模态框的打开关闭
      dialogFormVisible: false
    }
  },
  methods: {
    // 权限数据
    getTree() {
      treeRoles("tree").then((res) => {
        this.treeList = res.data.data
      })
    }
  },
  created() {
    this.getTree()
  },
  mounted() {},
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
