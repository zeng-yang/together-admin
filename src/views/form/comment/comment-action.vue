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
                        <FormItem label="评论用户" prop="userId" >
                            <Input v-model="formComment.userId" :readonly="true"></Input>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="所属文章" prop="articleId">
                            <Input v-model="formComment.articleId" :readonly="true"></Input>
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
                            <Select v-model="formComment.audit">
                                <Option value="true">是</Option>
                                <Option value="false">否</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="10">
                        <FormItem label="是否置顶" prop="toTop">
                            <Select v-model="formComment.toTop">
                                <Option value="true">是</Option>
                                <Option value="false">否</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormItem label="回复内容" prop="replyContent">
                            <Input v-model="formComment.replyContent" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
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
        articleId: '',
        content: '',
        createTime: '',
        replyContent: ''
      },
      ruleValidate: {
        replyContent: [
          { required: true, message: 'Please enter reply', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      },
      isView: false
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
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
        this.formComment = res.data
      })
    }
  },
  mounted () {
    this.getDiscuss(this.$route.params.commentId)
    //   this.getDiscuss(localStorage.commentId);
    // this.formComment.audit = localStorage.commentAudit
    // this.formComment.toTop = localStorage.commentToTop
    // this.formComment.userId = localStorage.commentUser
    // this.formComment.articleId = localStorage.commentArticle
    // this.formComment.content = localStorage.commentContent
    // this.formComment.createTime = localStorage.commentTime
    // this.formComment.replyContent = localStorage.commentReply
  }
}
</script>
