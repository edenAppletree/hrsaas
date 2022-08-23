<template>
  <div class="calender">
    <el-row type="flex" justify="end">
      <el-col :span="8">
        <el-select @change="updateCalendar" v-model="currentYear">
          <el-option
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-select @change="updateCalendar" v-model="currentMonth">
          <el-option v-for="item in 12" :key="item" :label="item" :value="item">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{date}">
        <div class="cell-box">
          {{ date.getDate() }}
          <span v-if="isWeek(date)">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  name: 'Calendar',
  data() {
    return {
      currentYear: '',
      currentMonth: '',
      currentDate: '',
      years: [], //当前年份，和前后各五年
    }
  },

  created() {
    this.initCalendar()
  },

  methods: {
    initCalendar() {
      const date = new Date()
      this.currentYear = date.getFullYear()
      this.currentMonth = date.getMonth() + 1
      // this.years = Array(11)
      //   .fill(this.currentYear - 5)
      //   .map((item, i) => item + i)
      this.years = Array.from(
        Array(11).fill(this.currentYear - 5),
        (item, i) => item + i,
      )
      this.currentDate = date
    },
    isWeek(date) {
      return date.getDay() === 6 || date.getDay() === 0
    },
    updateCalendar() {
      this.currentDate = this.currentYear + '-' + this.currentMonth
    },
  },
}
</script>

<style scoped lang="scss">
::v-deep .el-calendar__header {
  display: none;
}
::v-deep .el-calendar-table td {
  border: unset !important;
}
.cell-box {
  color: green;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
