<template>
  <div>
    <el-dialog
      title="分配角色"
      :visible="visible"
      @close="onClose"
      @open="onOpen"
    >
      <el-checkbox-group v-model="checkList">
        <!-- label渲染name,会记录选中值id -->
        <el-checkbox v-for="item in roles" :key="item.id" :label="item.id">
          <!-- 插槽也可以用于渲染 -->
          {{ item.name }}
        </el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取消</el-button>
        <el-button type="primary" @click="assignRoles">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getRolesApi, assignRoles} from '@/api/role'
import {getUserDetailInfo} from '@/api/user'

export default {
  data() {
    return {
      checkList: [],
      roles: [],
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    currentEmployeesId: {
      type: String,
      required: true,
    },
  },

  created() {},

  methods: {
    onClose() {
      this.$emit('update:visible', false)
    },
    // 获取角色列表
    async getRolesList() {
      const roles = await getRolesApi()
      this.roles = roles.rows
    },
    // 监听对话框打开
    onOpen() {
      this.getRolesList()
      this.getEmployeesRoles()
    },
    // 获取当前员工的权限数据
    async getEmployeesRoles() {
      const {roleIds} = await getUserDetailInfo(this.currentEmployeesId)
      console.log(roleIds)
      this.checkList = roleIds
    },
    // 分配角色
    async assignRoles() {
      if (this.checkList.length === 0) this.$message.error('请选择角色')
      await assignRoles({id: this.currentEmployeesId, roleIds: this.checkList})
      this.$message.success('分配成功')
    },
  },
}
</script>

<style scoped></style>
