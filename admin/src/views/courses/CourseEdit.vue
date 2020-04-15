<template>
  <div>
    <h3>{{isNew? "创建": "编辑"}}课程</h3>
    <ele-form
      v-model="data"
      :form-desc="fields"
      :request-fn="handleSubmit"
    ></ele-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({})
export default class CourseEdit extends Vue {
  // 接收总路由里传来的id，并使用’definite assignment assertion类型断言!:执行初始化，确保它有值‘
  // @Prop(String) id: string | undefined
  @Prop(String) id !: string

  data: any = {}

  fields: any = {
    name: {label: '课程名称', type: 'input'},
    cover: {label: '课程封面图', type: 'input'}
  }

  get isNew () {
    return !this.id
  }

  async handleSubmit (data: any) {
    console.log('handleSubmit data is', data)
    const url = this.isNew ? `courses` : `courses/${this.id}`
    const method = this.isNew ? `post` : `put`
    try {
      // await this.$http.post('courses', data)
      await this.$http[method](url, data)
      this.$message.success('保存成功')
      // 清空页面表单数据，请不清空无所谓
      this.data = {}
      // 返回上一个页面
      this.$router.go(-1)
    } catch(err) {
      this.$message.error('报错啦')
    }
    
  }

  async fetch() {
    const res = await this.$http.get(`courses/${this.id}`)
    this.data = res.data
  }
  // 当不是创建页面时拉取id相关的数据
  created() {
    !this.isNew && this.fetch()
  }

}
</script>

<style>

</style>