<template>
  <div>
    <h3>{{isNew? "创建": "编辑"}}课程</h3>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator"

@Component({})
export default class CourseEdit extends Vue {
  // 接收总路由里传来的id
  @Prop(String) id: string | undefined
  // @Prop(String) id!: string

  data: object = {}

  fields: object = {
    _id: {label: 'ID'},
    name: {label: '课程名称'},
    cover: {label: '课程封面图'}
  }

  get isNew () {
    return !this.id
  }

}
</script>

<style>

</style>