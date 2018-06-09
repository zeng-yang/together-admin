<style lang="less">
    @import '../../../../styles/common.less';
    @import './about.less';
</style>

<template>
    <div class="about">
        <div class="common-div">
            <Card>
                <Form ref="formAbout" :model="formAbout" :rules="ruleValidate" :label-width="80" >
                    <Row>
                        <Col span="10">
                            <FormItem label="公司名称" prop="company">
                                <Input v-model="formAbout.company" icon="android-list"/>
                            </FormItem>
                        </Col>
                        <Col span="11">
                            <FormItem label="小程序简介" prop="introduction" :label-width="100">
                                <Input v-model="formAbout.introduction" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10" class="about-con">
                            <FormItem label="logo图">
                                <div class="cropper">
                                    <img id="cropImg" alt="" :src="formAbout.logo">
                                </div>
                            </FormItem>
                        </Col>
                        <Col span="4" class="about-con-col">
                            <div class="about-con-btn-div">
                                <FormItem prop="logo">
                                    <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChange" id="fileinput" class="fileinput" />
                                </FormItem>
                                <label class="filelabel" for="fileinput"><Icon type="image"></Icon>&nbsp;选择图片</label>
                            </div>
                            <div class="about-con-btn-div">
                                <span><Button @click="handleCrop" class="btn-cut" type="primary" icon="crop">裁剪</Button></span>
                            </div>
                        </Col>
                        <Col span="8">
                            <Row type="flex" justify="center" align="middle" class="about-con-preview-con">
                                <div id="preview"></div>
                            </Row>
                            <Modal v-model="option.showCropedImage">
                                <p slot="header">预览裁剪之后的图片</p>
                                <img :src="option.cropedImg" alt="" v-if="option.showCropedImage" style="width: 100%;">
                            </Modal>
                        </Col>
                    </Row>
                    <Row>
                        <Col class="about-form-btn">
                            <span><Button type="primary" class="common-button" @click="handleSaveBanner('formAbout')" icon="folder">保存</Button></span>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    </div>
</template>
<script>
import Cropper from 'cropperjs'
import '../../../my-components/image-editor/cropper.min.css'
export default {
  name: 'about',
  data () {
    return {
      formAbout: {
        id: '1',
        company: '组起',
        introduction: '好友游戏匹配神器',
        logo: ''
      },
      ruleValidate: {
        company: [{required: true, message: '公司名称不能为空', trigger: 'blur'}],
        introduction: [{required: true, message: '小程序简介不能为空', trigger: 'blur'}]
      },
      cropper: {},
      option: {
        showCropedImage: false,
        cropedImg: ''
      }
    }
  },
  methods: {
    handleChange (e) {
      let file = e.target.files[0]
      let reader = new FileReader()
      reader.onload = () => {
        this.cropper.replace(reader.result)
        reader.onload = null
      }
      reader.readAsDataURL(file)
    },
    handleCrop () {
      let file = this.cropper.getCroppedCanvas().toDataURL()
      this.option.cropedImg = file
      this.option.showCropedImage = true
    },
    handleSaveBanner (formAbout) {
      this.$refs[formAbout].validate((valid) => {
        if (valid) {
            this.$api.updateAbout(this.formAbout).then(res => {
                
            })
          this.$Message.success('Success!')
          // 保存广告
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  },
  mounted () {
    this.$api.getAbout().then(res => {
      this.formAbout = res.data
    })
    let img = document.getElementById('cropImg')
    this.cropper = new Cropper(img, {
      dragMode: 'move',
      preview: '#preview',
      restore: false,
      center: false,
      highlight: false,
      cropBoxMovable: false,
      toggleDragModeOnDblclick: false
    })
  }
}
</script>
