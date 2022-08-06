<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <tree-tools :treeNode="company" :isRoot="true" @add='dialogVisible=true'></tree-tools>
        <!-- 树形控件 -->
        <el-tree :data="treeDate" :props="defaultProps" default-expand-all>
          <template v-slot="{data}">
            <tree-tools :treeNode="data" @remove="getDepts" @add='showAddDept'></tree-tools>
          </template>
        </el-tree>
      </el-card>
    </div>
    <!-- 添加部门弹层 -->
    <add-dept :visible.sync="dialogVisible" :currentNode= 'currentNode' @add-success='getDepts'></add-dept>
  </div>
</template>

<script>
import TreeTools from './components/tree-tools.vue'
import {getDeptsApi} from '@/api/departments'
import {transListToTree} from '@/utils/index'
import AddDept from './components//add-dept'
export default {
  data() {
    return {
      treeDate: [
        {name: '总裁办', children: [{name: '董事会'}]},
        {name: '行政部'},
        {name: '人事部'},
      ],
      defaultProps: {
        label: 'name',
      },
      company: {name: '传智教育', manager: '负责人'},
      dialogVisible:false,
      currentNode:{}
    }
  },

  components: {
    TreeTools,
    AddDept
  },

  created() {
    this.getDepts()
  },

  methods: {
    async getDepts() {
      const res = await getDeptsApi()
      console.log(res);
      this.treeDate=transListToTree(res.depts,'')
    },
    showAddDept(val) {
      this.dialogVisible=true
      this.currentNode = val
    }
  },
}
</script>

<style scoped lang="less"></style>
