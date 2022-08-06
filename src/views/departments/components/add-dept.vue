<template>
  <div>
    <el-dialog title="新增部门" :visible="visible" width="50%" @close="onClose">
      <el-form
        ref="form"
        :model="formData"
        :rules="formRules"
        label-width="100px"
      >
        <el-form-item label="部门名称" prop="name">
          <el-input
            placeholder="请输入部门名称"
            v-model="formData.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门编码" prop="code">
          <el-input
            placeholder="请输入部门编码"
            v-model="formData.code"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门负责人" prop="manager">
          <el-select
            style="width: 100%"
            placeholder="请选择部门负责人"
            v-model="formData.manager"
          >
            <el-option
              v-for="item in employees"
              :key="item.id"
              :label="item.username"
              :value="item.username"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门介绍" prop="introduce">
          <el-input
            type="textarea"
            placeholder="1-300个字符"
            v-model="formData.introduce"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getDeptsApi,addDeptApi} from '@/api/departments'
import {getEmployeesApi} from '@/api/employees'
export default {
  data() {
    const checkDeptName = (rule, value, callback) => {
      if (!this.currentNode.children) return callback()
      // console.log(this.currentNode)
      // 判断输入的部门名称，在原来的同级部门中有没有重复的名字
      const isRepeat = this.currentNode.children.some(
        (item) => item.name === value,
      )
      if (isRepeat) {
        callback(new Error('部门重复'))
      }
      callback()
    }
    const checkDeptCode = async (rule, value, callback) => {
      const {depts} = await getDeptsApi()
      const isRepeatCode = depts.some((item) => item.code === value)
      if (isRepeatCode) {
        callback(new Error('部门编码重复'))
      }
      callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      },
      formRules: {
        name: [
          {required: true, message: '请输入部门名称', trigger: 'blur'},
          {
            validator: checkDeptName,
            trigger: 'blur',
          },
        ],
        code: [
          {required: true, message: '请输入部门名称', trigger: 'blur'},
          {
            validator: checkDeptCode,
            trigger: 'blur',
          },
        ],
        manager: [
          {required: true, message: '请输入部门名称', trigger: 'change'},
        ],
        introduce: [
          {required: true, message: '请输入部门名称', trigger: 'blur'},
        ],
      },
      employees: [],
    }
  },

  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.getEmployeesApi()
  },

  methods: {
    async getEmployeesApi() {
      const res = await getEmployeesApi()
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
    },
    async onSave() {
      this.$refs.form.validate()
      this.formData.pid = this.currentNode.id
      console.log(this.formData)
     try {
       await addDeptApi(this.formData)
      this.$message.success('部门添加成功')
      this.onClose()
      this.$emit('add-success')
     }catch(error) {
      this.$message.error('部门添加失败')
     }
      
    },
  },
}
</script>

<style scoped></style>
