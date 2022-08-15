<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="登录账户设置" name="login" >
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input v-model="formDate.username" style="width: 300px" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  v-model="formDate.password"
                  style="width: 300px"
                  type="password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="update">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="userinfo"><UserInfo/> </el-tab-pane>
          <el-tab-pane label="岗位信息" name="job"/>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import {getUserDetailInfo, saveUserDetailById} from '@/api/user'
import UserInfo from './components/user-info.vue'
import Cookies from 'js-cookie'
export default {
  data() {
    return {
      formDate: {},
      activeName:Cookies.get('employeeDetailTab') || 'userinfo'
    }
  },
  components: {
    UserInfo,
  },

  created() {
    this.loadPageInfo()
  },

  methods: {
    async loadPageInfo() {
      console.log(this.$route)
      const res = await getUserDetailInfo(this.$route.params.id)
      console.log(res)
      this.formDate = res
    },
    async update() {
      await saveUserDetailById(this.formDate)
      this.$message.success('更新成功')
      this.$router.go(-1)
    },
    handleClick() {
      Cookies.set('employeeDetailTab',this.activeName)
    }
  },
}
</script>

<style scoped></style>
