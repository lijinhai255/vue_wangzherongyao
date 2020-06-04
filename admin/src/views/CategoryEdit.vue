<!--新建和编辑分类公用一个页面-->
<template>
  <div>
    <h1>{{id?"新建":"编辑"}}分类</h1>
    <el-form label-width="80px" @submit.native.prevent="save">
        <el-form-item label="上级分类">
          <el-select v-model="model.parent">
            <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
      <el-form-item label="名称">
        <el-input class="el-input-width" v-model="model.name" clearable maxlength="10"></el-input>
      </el-form-item>
      <el-form-item label="title">
        <el-input class="el-input-width" v-model="model.title" clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    id: {}
  },
  data() {
      return {
        model: {},
        parents: [],
        breadcrumbItem: ['内容管理', '分类管理', `${this.id ? '编辑分类':'新建分类'}`],
      };
    },
  methods: {
    // 编辑/保存数据
    async save() {
      let res;
      if (this.id) {
        //修改
        res = await this.$http.put(`/rest/categories/${this.id}`, this.model);
      } else {
        // 创建
        res = await this.$http.post("/rest/categories", this.model);
      }
      this.model = res.data;
       this.$router.push("/categories/list");
        this.$message({
          type: "success",
          message: "修改成功"
        });
    },
    async fetch() {
      let res = await this.$http.get(`/rest/categories/${this.id}`);
      this.model = res.data
    },
    // 获取父级分类列表
    async fetchParents() {
      const res = await this.$http.get(`/rest/categories`);
      this.parents = res.data;
    }
  },
  created() {
    this.fetchParents();
    this.id && this.fetch();
  }
};
</script>
<style lang='less' scoped>
</style>