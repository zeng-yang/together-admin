<style lang="less">
    @import '../../../styles/common.less';
</style>

<template>
    <div class="banner">
        <div class="table-add"><Button @click="handleAddGame" class="long-add-btn common-button" long>添加游戏</Button></div>
        <div>
            <Table border :columns="games" :data="gameData"></Table>
        </div>
        <div class="common-page">
            <Page :total="dataCount" :page-size="pageSize"  show-total  @on-change="changePage"></Page>

        </div>
    </div>
</template>

<script>
export default {
  name: 'games',
  data () {
    return {
      ajaxGameData: [],
      // 初始化信息总条数
      dataCount: 15,
      // 每页显示多少条
      pageSize: 10,
      games: [
        {
          title: '游戏ID',
          key: 'id',
          width: 90,
          align: 'center'
        },
        {
          title: '游戏名称',
          key: 'name',
          width: 90,
          align: 'center'
        },
        {
          title: 'logo图',
          key: 'logo',
          align: 'center'
        },
        {
          title: '游戏图片',
          key: 'imgUrl',
          align: 'center'
        },
        {
          title: '最大匹配人数',
          key: 'maxMember',
          align: 'center'
        },
        {
          title: '是否热门',
          key: 'hot',
          align: 'center',
          render: (h,params)=>{
            let text=''
            if(params.row.hot){text = '热门'}
            else{text = '不热门'}
            return h('span',{
              props:{}
              },text)
          }
        },
        {
          title: '是否停用',
          key: 'deleted',
          align: 'center',
          render: (h,params)=>{
            let text=''
            if(params.row.deleted){text = '停用'}
            else{text = '未停用'}
            return h('span',{
              props:{}
              },text)
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: 155,
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
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    let argu = { gameId: params.row.id };
                    this.$router.push({
                        name: 'games-config',
                        params: argu
                    });
                  }
                }
              }, '配置'),
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
      gameData: []
    }
  },
  methods: {
    handleAddGame () {
      localStorage.actionType = 'add'
      this.$router.push({
        name: 'games-add'
      })
    },
    edit (index) {
      localStorage.actionType = 'update'
      localStorage.gameId = this.gameData[index].id
      localStorage.gameName = this.gameData[index].name
      localStorage.imgUrl = this.gameData[index].imgUrl
      localStorage.logo = this.gameData[index].logo
      localStorage.maxMember = this.gameData[index].maxMember
      localStorage.gameHot = this.gameData[index].hot
      localStorage.gameDeleted = this.gameData[index].deleted
      localStorage.gameTime = this.gameData[index].createTime
      this.$router.push({
        name: 'games-edit'
      })
    },
    remove (index) {
      this.$api.deleteGame(this.gameData[index].id)
      this.gameData.splice(index, 1)
    },
    changePage (index) {
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.gameData = this.ajaxGameData.slice(_start, _end)
    },
    getGameTypeList() {
      this.$api.getGameTypeList().then(res => {
        this.gameData = res.data
        this.dataCount = res.data.length
      })
    }
  },
  created () {
    this.getGameTypeList()
  }
}
</script>
