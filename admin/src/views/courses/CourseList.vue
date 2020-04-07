<template>
  <div>
    <h3>课程列表</h3>
    <div>
      <el-button type="primary" size="small" @click="$router.push(`/courses/create`)">创建课程</el-button>
    </div>
    <el-table :data="data.data" border stripe>
      <el-table-column
        v-for="(field, name) in fields"
        :prop="name"
        :key="name"
        :label="field.label"
        :width="field.width"
      ></el-table-column>
      <el-table-column label="操作" width="200">
        <template v-slot="{row}">
          <!-- <template v-slot="scope"> -->
          <!-- <el-button type="success" size="small" @click="$router.push(`/ourses/edit/${scope.row._id}`)"></el-button> -->
          <el-button
            type="success"
            size="small"
            @click="$router.push(`/courses/edit/${row._id}`)"
          >编辑</el-button>
          <el-button type="danger" size="small" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class CourseList extends Vue {
  data: any = {};
  fields: any = {
    _id: { label: "ID" },
    name: { label: "课程名称" },
    cover: { label: "课程封面图" }
  };

  async fetch() {
    const res = await this.$http.get("courses");
    this.data = res.data;
    console.log("courselist data is ", this.data);
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
    this.$message({
      type: "success",
      message: "删除成功!"
    });
    this.fetch();
  }

  created() {
    this.fetch();
  }
}
</script>

<style>
</style>