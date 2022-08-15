<template>
  <div>
    <el-upload
      action="#"
      v-loading="loading"
      list-type="picture-card"
      :http-request="httpRequest"
      :file-list="fileList"
      :on-change="onChange"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="1"
      :class="fileList.length ? 'hide' : ''"
      class="custom-upload"
      :before-upload="beforeUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img :src="imgUrl" />
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
var cos = new COS({
  SecretId: 'AKID99vS9dsaDdpiMo22pOima9TbyA9tRlqi',
  SecretKey: 'nNipkSzNZXGm8HBqHVUG8rMdgWAalhW0',
})
console.log(cos)
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [
        // {
        //   name: 'ceshi',
        //   url: 'http://destinyee1.gitee.io/image/cxk.gif',
        // },
      ],
      dialogVisible: false,
      imgUrl: '',
      loading: false,
    }
  },

  created() {},

  methods: {
    httpRequest({file}) {
      this.loading = true
      // 上传对象到腾讯云
      cos.putObject(
        {
          Bucket: 'hm-31-1313341601' /* 必须 */,
          Region: 'ap-nanjing' /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 必须 */,
          StorageClass: 'STANDARD',
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData))
          },
        },
        // 不管上传成功与否都会进入
        (err, data) => {
          this.loading = false
          if (err || data.statusCode !== 200) {
            return this.$message.error('上传失败，请重试')
          }
          this.$emit('onSuccess', {
            url: 'https://' + data.Location,
          })
        },
      )
    },
    onChange(file, fileList) {
      this.fileList = fileList
      console.log('图片改变', fileList)
    },
    onRemove(file, fileList) {
      this.fileList = fileList
      console.log('图片改变', fileList)
    },
    onPreview(file) {
      console.log(file)
      this.dialogVisible = true
      this.imgUrl = file.url
    },
    beforeUpload(file) {
      // console.log(file);
      // 限制上传图片的类型
      const types = ['image/jpeg', 'image/gif']
      if (!types.includes(file.type)) {
        this.$message.error('请上传' + types.join('、') + '类型的图片')
        return false
      }

      // 限制上传图片的大小
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('上传图片的大小不能超过2Mb')
        return false
      }
    },
  },
}
</script>

<style lang="scss">
.hide .el-upload--picture-card {
  display: none;
}
.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
