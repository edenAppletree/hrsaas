<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 分配权限弹框 -->
      <el-dialog
        title="给角色分配权限"
        :visible.sync="rightsDialog"
        width="50%"
      >
        <el-tree
          default-expand-all
          show-checkbox
          node-key="id"
          :data="permissions"
          :props="{label: 'name'}"
          :default-checked-keys="defaultCheckKeys"
          ref='perTree'
        ></el-tree>

        <span slot="footer" class="dialog-footer">
          <el-button @click="rightsDialog = false">取 消</el-button>
          <el-button
            type="primary"
            @click="onSaveRights"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <!-- 表格 -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="dialogVisible = true"
            >新增角色</el-button
          >
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="name" label="角色名称"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="{row}">
                <el-button
                  size="small"
                  type="success"
                  @click="showRightsDialog(row.id)"
                  >分配权限</el-button
                >
                <el-button size="small" type="primary">编辑</el-button>
                <el-button size="small" type="danger">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="block">
            <el-pagination
              layout="prev, pager, next,sizes"
              :total="total"
              :pageSize="pageSize"
              :page-sizes="[3, 5, 10, 20]"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            >
            </el-pagination>
            <!-- 添加角色对话框 -->
            <el-dialog
              @close="closeDialog"
              title="新增角色"
              :visible.sync="dialogVisible"
              width="50%"
            >
              <el-form
                ref="form"
                :model="addRoleForm"
                :rules="addRoleFormRules"
                label-width="80px"
              >
                <el-form-item label="角色名称" prop="name">
                  <el-input v-model="addRoleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="角色描述">
                  <el-input v-model="addRoleForm.description"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="onClose">取 消</el-button>
                <el-button type="primary" @click="onAddRoles">确 定</el-button>
              </span>
            </el-dialog>
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="companyInfo.name"></el-input>
            </el-form-item>

            <el-form-item label="公司地址">
              <el-input
                disabled
                v-model="companyInfo.companyAddress"
              ></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="companyInfo.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="companyInfo.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import {getRolesApi, AddRoleApi, getRolesInfo,assignPerm} from '@/api/role'
import {getCompanyInfoApi} from '@/api/setting'
import {getPermissionList} from '@/api/permissions'
import {transListToTree} from '@/utils/index'
export default {
  data() {
    return {
      activeName: 'first',
      tableData: [],
      pageSize: 2,
      total: 0,
      page: 1,
      dialogVisible: false,
      rightsDialog: false,
      addRoleForm: {
        name: '',
        description: '',
      },
      addRoleFormRules: {
        name: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'blur',
          },
        ],
      },
      companyInfo: {},
      permissions: [], //权限树形数据
      defaultCheckKeys: [], //分配权限选中项
      roleId:''
    }
  },

  created() {
    this.getRoles(), this.getCompanyInfo()
    this.getPermissions()
  },

  methods: {
    // 获取列表数据
    async getRoles() {
      const {rows, total} = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize,
      })
      // console.log(rows)
      this.tableData = rows
      this.total = total
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    onClose() {
      this.dialogVisible = false
    },
    async onAddRoles() {
      await this.$refs.form.validate()
      await AddRoleApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.dialogVisible = false
      this.getRoles()
    },
    // 监听对话框关闭事件
    closeDialog() {
      // 表单重置只能重置有校验规则的
      this.$refs.form.resetFields()
      this.addRoleForm.description = ''
    },
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.componyId,
      )
      this.companyInfo = res
    },
    // 点击给角色分配权限
    async showRightsDialog(id) {
      this.rightsDialog = true
      const res = await getRolesInfo(id)
      this.defaultCheckKeys = res.permIds
      this.roleId=id
    },
    // 获取权限列表
    async getPermissions() {
      const res = await getPermissionList()
      const treePermission = transListToTree(res, '0')
      this.permissions = treePermission
      // console.log(res);
    },
    // 确定分配权限操作
    async onSaveRights() {
      this.rightsDialog = false
      await assignPerm(
        {id:this.roleId,
        permIds:this.$refs.perTree.getCheckedKeys()}
      )
      this.$message.success('分配成功')
      this.setRightsDialog=false
    }
  },
}
</script>

<style scoped lang="less"></style>
