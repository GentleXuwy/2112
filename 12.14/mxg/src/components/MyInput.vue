<template>
  <div>
    <div class="box">
      <el-input placeholder="请输入内容" :value="value" @input="inputChange" class="input-with-select">
        <el-button slot="append" @click="search" icon="el-icon-search"></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, undefined]
  },
  data() {
    return {
      inputValue: this.value
    }
  },
  methods: {
    inputChange(val) {
      this.$emit("input", val)
    },
    search() {
      this.$emit("search")
    }
  },
  created() {},
  mounted() {},
  components: {},
  computed: {},
  watch: {}
}
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  width: 480px;
  ::v-deep .el-input__inner {
    width: 430px !important;
  }
}
</style>
