<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel :beforeUpload="excelSuccess" :onSuccess="onSuccess" />
    </div>
  </div>
</template>

<script>
import UploadExcel from '@/components/UploadExcel'
import importmapKeyPath from '@/constant/employees'
import {importEmployees} from '@/api/employees'
import {formatTime} from '../../filters'
export default {
  data() {
    return {}
  },

  created() {},
  components: {
    UploadExcel,
  },

  methods: {
    excelSuccess({name}) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请选择xlsx文件')
        return false
      } else {
        return true
      }
    },
    async onSuccess({header, results}) {
      const newArr = results.map((item) => {
        const obj = {}
        for (let key in importmapKeyPath) {
          if (key === '入职日期' || key === '转正日期') {
            // excel时间戳
            const timeStamp = item[key]
            // excel的时间从1990.01.00开始计算 js从1970.01.01开始 所以excel的时间比js多70年加1天
            const date = (timeStamp - 1) * 24 * 60 * 60 * 1000
            date.getFullYear(date.getFullYear() - 70)
            obj[importmapKeyPath[key]] = formatTime(data)
          }
          obj[importmapKeyPath[key]] = item[key]
        }
        return obj
      })
      // console.log(newArr)
      await importEmployees(newArr)
      this.$message.success('导入成功')
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped></style>
