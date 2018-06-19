<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div class="banner">
        <div class="table-add"><Button @click="handleAddBanner" class="long-add-btn common-button" long>添加广告</Button></div>
        <div>
            <Table border :columns="banners" :data="bannerData"></Table>
        </div>
        <div class="common-page">
            <!-- <Page :total="dataCount" :page-size="pageSize"  show-total  @on-change="changePage"></Page> -->
        </div>
    </div>
</template>

<script>
export default {
  name: 'banner',
  data () {
    return {
      ajaxBannerData: [],
      // 初始化信息总条数
      dataCount: 15,
      // 每页显示多少条
      pageSize: 10,
      banners: [
        {
          title: '广告ID',
          key: 'id',
          width: 90,
          align: 'center'
        },
        {
          title: '文章ID',
          key: 'articleId',
          width: 90,
          align: 'center'
        },
        {
          title: '广告标题',
          key: 'title',
          align: 'center'
        },
        {
          title: '广告链接',
          key: 'advertUrl',
          align: 'center'
        },
        {
          title: '发布时间',
          key: 'createTime',
          align: 'center'
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
              }, '编辑'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ],
      bannerData: []
    }
  },
  methods: {
    handleAddBanner () {
      localStorage.actionType = 'add'
      this.$router.push({
        name: 'banner-add'
      })
    },
    edit (index) {
      localStorage.actionType = 'update'
      localStorage.bannerId = this.bannerData[index].id
      localStorage.bannerArticle = this.bannerData[index].articleId
      localStorage.bannerTitle = this.bannerData[index].title
      localStorage.bannerUrl = this.bannerData[index].advertUrl
      localStorage.bannerTime = this.bannerData[index].createTime
      this.$router.push({
        name: 'banner-edit'
      })
    },
    remove (index) {
      this.$api.deleteBanner(this.bannerData[index].id)
      this.bannerData.splice(index, 1)
    },
    getBannerList() {
      this.$api.getBannerList().then(res => {
        this.bannerData = res.data
      })
    },
    changePage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.bannerData = this.ajaxBannerData.slice(_start, _end)
    }
  },
  created () {
    this.getBannerList()
  }
}
</script>
