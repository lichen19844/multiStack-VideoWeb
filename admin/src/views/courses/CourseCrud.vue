<template>
  <div>
    <avue-crud 
      :data="data.data" 
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class CourseList extends Vue {
  data: object = {};

  option: object = {
    title: '课程管理',
    column: [
      // { label: 'ID', prop: '_id' },
      { label: '课程名称', prop: 'name' },
      { label: '课程封面图', prop: 'cover' }
    ]
  }

  async create (row: any, done: any) {
    await this.$http.post('courses', row)
    console.log('avue row is ', row)
    this.$message.success('创建成功')
    this.fetch()
    done()
  }

  async update (row: any, index: any, done: any) {
    console.log('avue row is ', row)
    const data = JSON.parse(JSON.stringify(row))
    delete data.$index
    await this.$http.put(`courses/${row._id}`, data)
    this.$message.success('更新成功')
    this.fetch()
    done()
  }

  // try catch 方法
  async remove(row: any) {
    try {
      // $confirm 是element提供的
      await this.$confirm(`是否确定要删除分类？"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
    } catch (e) {
      this.$message({
        type: "info",
        message: "已取消删除"
      });
      return;
    }
    await this.$http.delete(`courses/${row._id}`);
    this.$message.success("删除成功!");
    this.fetch();
  }

  // then catch 方法
  // async remove(row: any) {
  //   // $confirm 是element提供的
  //   await this.$confirm(`是否确定要删除分类？"${row.name}"`, '提示', {
  //     confirmButtonText: '确定',
  //     cancelButtonText: '取消',
  //     type: 'warning'
  //   }).then(async () => {
  //     await this.$http.delete(`courses/${row._id}`)
  //     this.$message({
  //           type: 'success',
  //           message: '删除成功!'
  //     })
  //     this.fetch()
  //   }).catch(() => {
  //       this.$message({
  //         type: 'info',
  //         message: '已取消删除'
  //       })
  //   })
  // }

  async fetch() {
    const res = await this.$http.get("courses");
    this.data = res.data;
    console.log("courselist data is ", this.data);
  }

  created() {
    this.fetch();
  }
}
</script>

<style>
</style>