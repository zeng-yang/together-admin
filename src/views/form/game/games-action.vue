<style lang="less">
    @import '../../../styles/common.less';
    @import './game.less';
</style>

<template>
    <div class="feedback">
        <div class="common-div">
            <Card>
                <Form ref="gameAction" :model="gameAction" :rules="ruleValidate" :label-width="80" >
                    <Row>
                        <Col span="10">
                            <FormItem label="游戏名称" prop="name">
                                <Input v-model="gameAction.name" icon="android-list"/>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="最大人数" prop="maxMember">
                                <Input v-model="gameAction.maxMember" icon="android-list"/>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="logo图" prop="logo">
                                <Input v-model="gameAction.logo" icon="android-list"/>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="游戏图片" prop="imgUrl">
                                <Input v-model="gameAction.imgUrl" icon="android-list"/>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="是否热门" prop="hot">
                                <Select v-model="gameAction.hot">
                                    <Option value="true">是</Option>
                                    <Option value="false">否</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="10">
                            <FormItem label="是否停用" prop="deleted">
                                <Select v-model="gameAction.deleted">
                                    <Option value="true">是</Option>
                                    <Option value="false">否</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Col class="game-form-btn">
                            <span><Button type="primary" class="common-button" @click="handleSaveGame('gameAction')" icon="folder">保存</Button></span>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </div>
    </div>
</template>
<script>
export default {
  name: 'gameAction',
  data () {
    return {
      gameAction: {
        id: '',
        name: '',
        hot: 'true',
        deleted: 'false',
        maxMember: 0,
        logo: '',
        imgUrl: '',
        createTime: ''
      },
      ruleValidate: {
        name: [{ required: true, message: '游戏名称不能为空', trigger: 'blur' }],
        maxMember:[{ required: true, message: '最大匹配人数不能为空', trigger: 'blur' },
                    { type: 'number', message: '请输入数字格式', trigger: 'blur', transform(value) {
                        return Number(value);
                    }}
                ],
        logo:[{ required: true, message: 'logo图链接不能为空', trigger: 'blur' }],
        imgUrl:[{ required: true, message: '图片链接不能为空', trigger: 'blur' }]

      },
    }
  },
  methods: {
    handleSaveGame (gameAction) {
        this.$refs[gameAction].validate((valid) => {
        if (valid) {
            if (localStorage.actionType != 'add') {
                  var id = localStorage.gameId
                  this.$api.updateGameType(id, this.gameAction).then(res => {
                      this.$store.commit('removeTag', this.$route.name);
                      this.$router.push({
                        name: 'games'
                      })
                  })
              }else{
                this.$api.createGameType(this.gameAction).then(res => {
                    this.$store.commit('removeTag', this.$route.name);
                    this.$router.push({
                      name: 'games'
                    })
                })
              }
          // 保存广告
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  },
  mounted () {
    if (localStorage.actionType != 'add') {
      this.gameAction.id = localStorage.gameId
      this.gameAction.name = localStorage.gameName
      this.gameAction.imgUrl = localStorage.imgUrl
      this.gameAction.logo = localStorage.logo
      this.gameAction.maxMember = localStorage.maxMember
      this.gameAction.hot = localStorage.gameHot?'true':'false'
      this.gameAction.deleted = localStorage.gameDeleted?'true':'false'
      this.gameAction.createTime = localStorage.gameTime
    }
  }
}
</script>
