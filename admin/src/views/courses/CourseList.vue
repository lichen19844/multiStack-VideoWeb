<template>
  <div>
    <h3>课程列表</h3>
    <el-table :data="data.data" border stripe>
      <el-table-column v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width">
      </el-table-column>
    </el-table>
    
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"

@Component({})
export default class CourseList extends Vue {
  data: object = {}
  fields: object = {
    _id: {label: 'ID'},
    name: {label: '课程名称'},
    cover: {label: '课程封面图'}
  }

  async fetch() {
    const res = await this.$http.get('courses')
    this.data = res.data
    console.log('courselist data is ', this.data)
  }

  created() {
    this.fetch()
  }

}
</script>

<style>

</style>