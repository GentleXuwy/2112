<template>
  <div>
    <el-dialog title="查看物流信息" :visible.sync="dialogFormVisible">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in kuaidi" :key="index" :timestamp="activity.time">
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { kdOrders } from "@/api/order"
export default {
  data() {
    return {
      dialogFormVisible: false,
      kuaidi: []
    }
  },
  methods: {
    info(id) {
      this.dialogFormVisible = true
      kdOrders({ id: id }).then((res) => {
        console.log(res)
        this.kuaidi = res.data.data
      })
    }
    // 控制对话框的显示和隐藏
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
