<template>
    <div class="edit">
       <h1>分类列表</h1>
         <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" clearable v-model="query" @clear="fetch()">
            <el-button slot="append" icon="el-icon-search" @click="fetch()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click='$router.push("/items/create")'>
            <i class="el-icon-plus"></i>添加</el-button>
        </el-col>
      </el-row>
      <el-table :data="items" height="550" border stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="_id" label="ID" width="230"></el-table-column>
        <el-table-column prop="name" label="装备名称"></el-table-column>
        <el-table-column prop="iocn" label="装备图片">
          <template slot-scope="scope">
            <img :src="scope.row.icon" alt="" style="height:3rem;">
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="small" circle
              @click="$router.push(`/items/edit/${scope.row._id}`)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="small" circle @click="remove(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
        :page-sizes="[10, 15, 20 , 25,]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total" background>
      </el-pagination>
    </el-card>
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
        const res = await this.$http.get(`/rest/items`);
        this.items = res.data;
        this.total = res.data.count;
      },
      // 删除
      async remove(row) {
        this.$confirm(`是否删除分类"${row.name}"`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`/rest/items/${row._id}`)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.fetch(); // 刷新列表
        }).catch(() => {});
      },
    }
  }
</script>
