<template>
    <div class="edit">
       <h1>分类列表</h1>
        <el-table :data="items" height="550" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="_id" label="ID" width="230"></el-table-column>
        <el-table-column prop="parent.name" label="上级分类"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="small" circle
              @click="$router.push(`/categories/edit/${scope.row._id}`)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" circle @click="remove(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
//   import Breadcrumb from '../components/Breadcrumb'?
  export default {
    components: {
    //   Breadcrumb
    },
    data() {
      return {
        breadcrumbItem: ['内容管理', '分类管理'],
        items: [],
        total: 0,
        query: '',
        pageNum: 1, // 当前页
        pageSize: 10, // 页大小
      }
    },
     created() {
      this.fetch(); // 在列表组件渲染成功之前自动执行该方法获取数据库数据
    },
    methods: {
          // 获取列表
      async fetch() {
        const res = await this.$http.get(
          `/categories`);
        this.items = res.data;
        console.log(res,"res-121")
        this.total = res.data.count;
      },

    }
  }
</script>
