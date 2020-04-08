<template>
  <div>
    <avue-crud
      v-if="option.column"
      :data="resData.data"
      :option="option"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      :page.sync="page"
      @on-load="changePage"
      @sort-change="changeSort"
    ></avue-crud>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({})
export default class ResourceCrud extends Vue {
  @Prop(String) resource!: string;

  // 一些初始data
  resData: any = {};
  option: any = {
    // title: '课程管理',
    // column: [
    //   // { label: 'ID', prop: '_id' },
    //   { label: '课程名称', prop: 'name' },
    //   { label: '课程封面图', prop: 'cover' }
    // ]
  };
  page: any = {
    // pageSize: 5,
    // pageSizes: [2, 5, 10],
    currentPage: 1,
    total: 0
  };
  query: any = {
    limit: 5,
    // sort: {_id: -1}
  };

  async fetchOption () {
    const res = await this.$http.get(`${this.resource}/option`);
    this.option = res.data;
    console.log("courselist option is ", this.option);
  }

  async changePage ({pageSize, currentPage}: any) {
  // async changePage(page: any) {
    // console.log(page)
    // this.query.page = page.currentPage;
    // this.query.limit = page.pageSize;
    this.query.page = currentPage;
    this.query.limit = pageSize;
    // 点击分页刷新页面
    this.fetch()
  }

  async changeSort ({prop, order}) {
  // async changeSort (params) {
    // console.log('params is ', params)
    if (!order) { // !order等同于order = null
      this.query.sort = null
    } else {
      this.query.sort = {
        [prop]: order == 'ascending' ? 1: -1
      }
    }
    this.fetch()
  }

  async fetch () {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    });
    // this.page["total"] = res.data.total 等同于 this.page.total = res.data.total
    this.page.total = res.data.total;
    this.resData = res.data;
    console.log("courselist data is ", res);
  }

  async create(row: any, done: any) {
    await this.$http.post(`${this.resource}`, row);
    console.log("avue row is ", row);
    this.$message.success("创建成功");
    this.fetch();
    done();
  }

  async update(row: any, index: any, done: any) {
    console.log("avue row is ", row);
    const data = JSON.parse(JSON.stringify(row));
    delete data.$index;
    await this.$http.put(`${this.resource}/${row._id}`, data);
    this.$message.success("更新成功");
    this.fetch();
    done();
  }

  // try catch 方法
  async remove(row: any) {
    try {
      // $confirm 是element提供的
      await this.$confirm(`是否确定要删除分类？${row.name}`, "提示", {
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
    await this.$http.delete(`${this.resource}/${row._id}`);
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

  created() {
    this.fetchOption();
    // 首次加载会调用on-load方法加载数据，从而触发this.fetch方法，这里就不要了
    // this.fetch();
  }
}
</script>

<style>
</style>