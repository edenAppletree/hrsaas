<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 头部 -->
      <pageTools :isShowLeft="false">
        <template slot="right">
          <el-button type="primary" size="small">添加权限</el-button>
        </template>
      </pageTools>
      <!-- 表格 -->
      <el-table
        row-key="id"
        :data="permissions"
        slot="right"
        style="width: 100%"
        ref='table'
      >
        <el-table-column label="名称" width="180">
          <template v-slot="{row}">
            <i
              v-if="row.children"
              style="margin-right: 5px"
              class="el-icon-folder-opened"
              @click="expand(row)"
            ></i>
            <span>{{ row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="code" label="标识" width="180">
        </el-table-column>
        <el-table-column prop="description" label="描述"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="text">添加</el-button>
            <el-button type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getPermissionList} from '@/api/permissions'
import {transListToTree} from '@/utils'
export default {
  data() {
    return {
      permissions: [],
      isExpand: false,
    }
  },

  created() {
    this.getPermissions()
  },

  methods: {
    async getPermissions() {
      const res = await getPermissionList()
      // console.log(res)
      this.permissions = transListToTree(res, '0')
    },
    // 点击图标展开树形
    expand(row) {
      row.isExpand = !row.isExpand
      this.$refs.table.toggleRowExpansion(row, row.isExpand)
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep.el-table [class*='el-table__row--level'] .el-table__expand-icon {
  display: none;
}
</style>
