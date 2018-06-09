<style lang="less">
    @import '../../../styles/common.less';
    @import './image-editor.less';
</style>

<template>
    <div class="image-editor">
        <div class="common-div">
            <Card>
                <Form ref="formBanner" :model="formBanner" :rules="ruleValidate" :label-width="80" >
                    <Row>
                        <Col span="10">
                            <FormItem label="广告标题" prop="title">
                                <Input v-model="formBanner.title" @on-blur="handleAdvertTitleBlur" icon="android-list"/>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="广告图片" prop="advertUrl">
                                <Input v-model="formBanner.advertUrl"  icon="android-list"/>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="文章ID" prop="articleId">
                                <Input v-model="formBanner.articleId"  icon="android-list"/>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
                <Row :gutter="10">
                    <Col span="14" class="image-editor-con">
                        <div class="cropper">
                            <img id="cropImg" alt="" :src="formBanner.bannerUrl">
                        </div>
                    </Col>
                    <Col span="10" class="image-editor-con">
                        <Row type="flex" justify="center" align="middle" class="image-editor-con-preview-con">
                            <div id="preview"></div>
                        </Row>
                        <div class="image-editor-con1-btn-con margin-top-10">
                            <input type="file" accept="image/png, image/jpeg, image/gif, image/jpg" @change="handleChange" id="fileinput1" class="fileinput" />
                            <label class="filelabel" for="fileinput1"><Icon type="image"></Icon>&nbsp;选择图片</label>
                            <span><Button @click="handleCrop" type="primary" icon="crop">裁剪</Button></span>
                            <span><Button type="primary" class="common-button" @click="handleSaveBanner('formBanner')" icon="folder">保存</Button></span>
                        </div>
                        <Modal v-model="option.showCropedImage">
                            <p slot="header">预览裁剪之后的图片</p>
                            <img :src="option.cropedImg" alt="" v-if="option.showCropedImage" style="width: 100%;">
                        </Modal>
                    </Col>
                </Row>
            </Card>
        </div>
    </div>
</template>

<script>
import Cropper from 'cropperjs';
import './cropper.min.css';
export default {
    name: 'image-editor',
    data () {
        return {
           
            formBanner: {
                title: '',
                articleId: '',
                advertUrl: ''
            },
            ruleValidate:{
                title:[{required: true, message: '广告标题不能为空', trigger: 'blur'}],
                articleId:[{required: true, message: '所属文章不能为空', trigger: 'blur'}],
                advertUrl:[{required: true, message: '图片地址不能为空', trigger: 'blur'}]
            },
            cropper: {},
            option: {
                showCropedImage: false,
                cropedImg: ''
            },
        };
    },
    methods: {
        handleAdvertTitleBlur(){},
        handleChange (e) {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                this.cropper.replace(reader.result);
                reader.onload = null;
            };
            reader.readAsDataURL(file);
        },
        handleCrop () {
            let file = this.cropper.getCroppedCanvas().toDataURL();
            this.option.cropedImg = file;
            this.option.showCropedImage = true;
        },
        handleSaveBanner(formBanner){
            this.$refs[formBanner].validate((valid) => {
                if (valid) {
                    if ('add' != localStorage.actionType ) {
                        var id = localStorage.bannerId
                        this.$api.updateBanner(id, this.formBanner).then(res => {
                            this.$Message.success('Success!');
                            this.$router.push({
                                name: 'banner'
                            });
                        })
                    } else {
                        this.$api.createBanner(this.formBanner).then(res => {
                            this.$Message.success('Success!');
                            this.$router.push({
                                name: 'banner'
                            });
                        })
                    }
                    
                    //保存广告
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
    },
    mounted () {
        if ('add' != localStorage.actionType ) {
            var id = localStorage.bannerId
            this.formBanner.title = localStorage.bannerTitle;
            this.formBanner.articleId = localStorage.bannerArticle;
            this.formBanner.advertUrl = localStorage.bannerUrl;
        }
        let img = document.getElementById('cropImg');
        this.cropper = new Cropper(img, {
            dragMode: 'move',
            preview: '#preview',
            restore: false,
            center: false,
            highlight: false,
            cropBoxMovable: false,
            toggleDragModeOnDblclick: false
        });
    }
};
</script>

<style>

</style>
