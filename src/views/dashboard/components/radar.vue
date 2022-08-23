<template>
  <div ref="main" class="radarCharts"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },

  created() {},
  mounted() {
    this.initRadar()
  },

  methods: {
    initRadar() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(this.$refs.main)
      // 绘制图表
      const radarOptions = {
  title: {
    text: '员工绩效图 '
  },
  legend: {
    data: ['小张', '小李']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '考勤', max: 100 },
      { name: '技术', max: 100 },
      { name: '管理', max: 100 },
      { name: '分享', max: 100 },
      { name: 'bug', max: 100 },
      { name: '助人', max: 100 }
    ]
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [70,20,40,60,80,50],
          name: '小张'
        },
        {
          value: [100,80,90,80,90,100],
          name: '小李'
        }
      ]
    }
  ]
};
      myChart.setOption(radarOptions)
    },
  },
}
</script>

<style scoped lang="scss">
.radarCharts {
  width: 700px;
  height: 500px;
}
</style>
