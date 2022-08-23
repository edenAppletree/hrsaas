<template>
  <el-dropdown @command="onCommand">
    <span class="el-dropdown-link">
      <svg-icon
        style="color: #fff; font-size: 20px"
        icon-class="language"
      ></svg-icon>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh">中</el-dropdown-item>
      <el-dropdown-item command="en">英</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  name: 'ToggleLang',
  data() {
    return {}
  },

  created() {},

  methods: {
    onCommand() {
      console.log(onCommand)
    },
  },
}
</script>

<style scoped></style>
