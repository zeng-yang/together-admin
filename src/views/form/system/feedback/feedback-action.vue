<style lang="less">
    @import '../../../../styles/common.less';
    @import './feedback.less';
</style>

<template>
    <div class="feedback">
        <div class="common-div">
            <Card>
                <Form ref="formFeedback" :model="formFeedback" :rules="ruleValidate" :label-width="80" >
                    <Row>
                        <Col span="10">
                            <FormItem label="用户名称">
                                <Input v-model="formFeedback.userId" :readonly="true" icon="android-list"/>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="用户邮箱">
                                <Input v-model="formFeedback.email" :readonly="true" icon="android-list"/>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="10">
                            <FormItem label="反馈意见">
                                <Input v-model="formFeedback.content" :readonly="true" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="处理状态" prop="finished">
                                <Select v-model="formFeedback.finished?'true':'false'">
                                    <Option value="true">已处理</Option>
                                    <Option value="false">未处理</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col class="feedback-form-btn">
                            <span><Button type="primary" class="common-button" @click="handleSaveFeedback('formFeedback')" icon="folder">保存</Button></span>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    </div>
</template>
<script>
export default {
  name: 'feedbackAction',
  data () {
    return {
      formFeedback: {
        id: '',
        userId: '',
        email: '',
        content: '',
        createTime: '',
        finished: false
      },
      ruleValidate: {
        company: [{required: true, message: '公司名称不能为空', trigger: 'blur'}],
        introduction: [{required: true, message: '小程序简介不能为空', trigger: 'blur'}]
      },
    }
  },
  methods: {
    handleSaveFeedback (formFeedback) {
         this.$refs[formFeedback].validate((valid) => {
            if (valid) {
                this.$api.updateFeedBack(localStorage.feedbackId).then(res => {
                    this.$Message.success('Success!')
                    this.$store.commit('removeTag', this.$route.name);
                    this.$router.push({
                        name: 'feedback'
                    })
                })
            } else {
          this.$Message.error('Fail!')
        }
        })
    }
  },
  mounted () {
    if (localStorage.actionType != 'add') {
      this.formFeedback.id = localStorage.feedbackId
      this.formFeedback.userId = localStorage.feedbackUser
      this.formFeedback.email = localStorage.feedbackEmail
      this.formFeedback.content = localStorage.feedbackContent
      this.formFeedback.finished = localStorage.feedbackFinished
    }
  }
}
</script>
