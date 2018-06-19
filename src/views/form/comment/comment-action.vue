<style lang="less">
    @import '../../../styles/common.less';
    @import './comment.less';
</style>

<template>
    <div class="common-div">
        <div class="comment-action">
            <Form ref="formComment" :model="formComment" :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="10">
                        <FormItem label="评论用户" prop="nickname" >
                            <Input v-model="formComment.nickname" :readonly="true"></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="所属文章" prop="articleTitle">
                            <Input v-model="formComment.articleTitle" :readonly="true"></Input>
                            <!-- <Select v-model="formComment.articleId" disabled>
                                <Option v-for="item in articles" :value="item.id">{{item.title}}</Option>                            
                            </Select> -->
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                        <FormItem label="评论内容" prop="content">
                            <Input v-model="formComment.content" :readonly="true" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="评论时间" prop="createTime">
                            <Input v-model="formComment.createTime" :readonly="true"></Input>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="10">
                        <FormItem label="是否审核" prop="audit">
                            <Select v-model="formComment.audit?'true':'false'">
                                <Option value="true">是</Option>
                                <Option value="false">否</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="是否置顶" prop="toTop">
                            <Select v-model="formComment.toTop?'true':'false'">
                                <Option value="true">是</Option>
                                <Option value="false">否</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="回复内容" prop="replyContent">
                            <Input v-model="formComment.replyContent" type="textarea" :autosize="{minRows: 0,maxRows: 5}" placeholder="Enter something..."></Input>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem class="comment-action-btn">
                    <Button v-show="!isView" type="primary" @click="handleSubmit('formComment')">保存</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      'articles': [],
      formComment: {
        audit: false,
        toTop: false,
        userId: '',
        nickname: '',
        articleId: '',
        articleTitle: '',
        content: '',
        createTime: '',
        replyContent: ''
      },
      ruleValidate: {
        replyContent: [
          { required: true, message: 'Please enter reply', trigger: 'blur' },
          { type: 'string', trigger: 'blur' }
        ]
      },
      isView: false
    }
  },
  methods: {
    handleSubmit (formComment) {
      this.$refs[formComment].validate((valid) => {
        if (valid) {
            this.$api.updateDiscuss(this.$route.params.commentId,this.formComment).then(res =>{
                this.$Message.success('Success!')
          })
            this.$router.push({
                name: 'comment'
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    getDiscuss(id){
        this.$api.getDiscuss(id).then(res => {
            console.log(res)
           let comment = res.data
            this.$api.getArticle(comment.articleId).then(res => {
                let article = res.data
                this.formComment = comment;
                this.formComment.nickname = comment.user.nickname
                this.formComment.articleTitle = article.title
                console.log(this.formComment)
            })
        })
    }
  },
  mounted () {
    this.getDiscuss(this.$route.params.commentId)
  }
}
</script>
