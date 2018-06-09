<style lang="less">
    @import '../../../../styles/common.less';
</style>

<template>
    <div class="banner">
        <div>
            <Table border :columns="feedbacks" :data="feedbackData"></Table>
        </div>
        <div class="common-page">
            <Page :total="dataCount" :page-size="pageSize"  show-total  @on-change="changePage"></Page>

        </div>
    </div>
</template>

<script>
export default {
  name: 'feedback',
  data () {
    return {
      ajaxFeedbackData: [],
      // 初始化信息总条数
      dataCount: 0,
      // 每页显示多少条
      pageSize: 100,
      feedbacks: [
        {
          title: '意见ID',
          key: 'id',
          width: 90,
          align: 'center'
        },
        {
          title: '用户ID',
          key: 'userId',
          width: 90,
          align: 'center'
        },
        {
          title: '用户邮箱',
          key: 'email',
          align: 'center'
        },
        {
          title: '反馈意见',
          key: 'content',
          align: 'center'
        },
        {
          title: '反馈时间',
          key: 'createTime',
          align: 'center'
        },
        {
          title: '是否处理',
          key: 'finished',
          align: 'center',
          render: (h,params)=>{
            let text=''
            if(params.finished == 'true'){text = '已处理'}
            else{text = '未处理'}
            return h('span',{
              props:{}
              },text)
            }
        },
        {
          title: '操作',
          key: 'action',
          width: 180,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.edit(params.index)
                  }
                }
              }, '处理')
            ])
          }
        }
      ],
      feedbackData: []
    }
  },
  methods: {
    edit (index) {
      localStorage.actionType = 'update'
      localStorage.feedbackId = this.feedbackData[index].id
      localStorage.feedbackUser = this.feedbackData[index].userId
      localStorage.feedbackEmail = this.feedbackData[index].email
      localStorage.feedbackContent = this.feedbackData[index].content
      localStorage.feedbackFinished = this.feedbackData[index].finished
      this.$router.push({
        name: 'feedback-edit'
      })
    },
    handleListApproveBanner () {
      // 保存取到的所有数据
      this.ajaxFeedbackData = testData.feedbacks
      this.dataCount = testData.feedbacks.length
      // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
      if (testData.feedbacks.length < this.pageSize) {
        this.feedbackData = this.ajaxFeedbackData
      } else {
        this.feedbackData = this.ajaxFeedbackData.slice(0, this.pageSize)
      }
    },
    changePage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.feedbackData = this.ajaxFeedbackData.slice(_start, _end)
    },
    getFeedbackList() {
      this.$api.getFeedBackList().then(res => {
        this.feedbackData = res.data
        this.dataCount = res.data.length
      })
    }
  },
  created () {
    this.getFeedbackList()
  }
}
</script>
