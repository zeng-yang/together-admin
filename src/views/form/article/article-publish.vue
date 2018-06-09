<style lang="less">
    @import '../../../styles/common.less';
    @import './article-publish.less';
</style>

<template>
    <div class="common-div">
        <Card>
            <Form :label-width="80">
                <FormItem label="文章标题" :error="articleError">
                    <Input v-model="article.title" @on-blur="handleTitleBlur" icon="android-list"/>
                </FormItem>
                <FormItem label="文章作者" :error="articleError">
                    <Input v-model="article.author" @on-blur="handleAuthorBlur" icon="android-list"/>
                </FormItem>
                <FormItem label="文章简介" :error="articleError">
                    <Input v-model="article.introduction"  icon="android-list"/>
                </FormItem>
                <FormItem label="文章头图" :error="articleError">
                    <Input v-model="article.imgUrl" icon="android-list"/>
                </FormItem>
               
            </Form>
            <div class="margin-top-20">
                <textarea id="articleEditor"></textarea>
            </div>
            <Row class="margin-top-0 publish-button-con">
                <!-- <span class="publish-button"><Button class="common-button" @click="handlePreview">预览</Button></span> -->
                <span class="publish-button"><Button class="common-button" @click="handleSaveDraft">保存</Button></span>
            </Row>
        </Card>
    </div>
</template>

<script>
import tinymce from 'tinymce'
import Cookies from 'js-cookie'
export default {
  name: 'artical-publish',
  data () {
    return {
      article: {
        title: '',
        author: '', 
        imgUrl: 'http://p6rwlbhj0.bkt.clouddn.com/image/together/3.jpg',
        introduction: '',
        content: ''
      },
      articleError: '',
      showLink: false,
      fixedLink: '',
      articlePath: '',
      articlePathHasEdited: false,
      editLink: false,
      editPathButtonType: 'ghost',
      editPathButtonText: '编辑',
      articleStateList: [{value: '草稿'}, {value: '等待复审'}],
      editOpenness: false,
      Openness: '公开',
      currentOpenness: '公开',
      topArticle: false,
      publishTime: '',
      publishTimeType: 'immediately',
      editPublishTime: false, // 是否正在编辑发布时间
      articleTagSelected: [], // 文章选中的标签
      articleTagList: [], // 所有标签列表
      classificationList: [],
      classificationSelected: [], // 在所有分类目录中选中的目录数组
      offenUsedClass: [],
      offenUsedClassSelected: [], // 常用目录选中的目录
      classificationFinalSelected: [], // 最后实际选择的目录
      publishLoading: false,
      addingNewTag: false, // 添加新标签
      newTagName: '' // 新建标签名
    }
  },
  methods: {
    handleTitleBlur () {
      if (this.article.title == '') {
        this.$Message.error('文章标题不可为空哦')
      }
    },
    handleAuthorBlur () {
      if (this.article.author == '') {
        this.$Message.error('文章作者不可为空哦')
      }
    },
    canPublish () {
      if (this.articleTitle == '') {
        this.$Message.error('请输入文章标题')
        return false
      } else {
        return true
      }
    },
    handlePreview () {
      if (this.canPublish()) {
        //     if (this.publishTimeType === 'immediately') {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hour = date.getHours()
        let minute = date.getMinutes()
        let second = date.getSeconds()
        localStorage.publishTime = year + '-' + month + '-' + day + '  ' + hour + ':' + minute + ':' + second
        localStorage.articleTitle = this.articleTitle
        localStorage.articleContent = tinymce.activeEditor.getContent()
        this.$router.push({
          name: 'articleView'
        })
      }
    },
    handleSaveDraft () {
      if (this.canPublish()) {

        this.article.content = tinymce.activeEditor.getContent()

        if (localStorage.actionType != 'add') {
            var id = localStorage.articleId
            this.$api.updateArticle(id, this.article).then(res => {
                this.$router.push({
                  name: 'articles'
                })
            })
        }
        this.$api.createArticle(this.article).then(res => {
            this.$router.push({
              name: 'articles'
            })
        })
        
      }
    }
  },
  computed: {
    completeUrl () {
      let finalUrl = this.fixedLink + this.articlePath
      localStorage.finalUrl = finalUrl // 本地存储完整文章路径
      return finalUrl
    }
  },
  mounted () {
    tinymce.init({
      selector: '#articleEditor',
      branding: false,
      elementpath: false,
      height: 600,
      language: 'zh_CN.GB2312',
      menubar: 'edit insert view format table tools',
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
        'searchreplace visualblocks visualchars code fullscreen fullpage',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons paste textcolor colorpicker textpattern imagetools codesample'
      ],
      toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
      autosave_interval: '20s',
      image_advtab: true,
      table_default_styles: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    })
    if (localStorage.actionType != 'add') {
        var id = localStorage.articleId
        this.$api.getArticle(id).then(res => {
            this.article = res.data
            tinymce.activeEditor.setContent(this.article.content)
        })
    }
  },
  destroyed () {
    tinymce.get('articleEditor').destroy()
  }
}
</script>
