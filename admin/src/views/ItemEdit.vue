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
      <el-form-item label="图标">
          <el-upload class="avatar-uploader" :action="$http.defaults.baseURL+'/upload'"  :show-file-list="false"
            :on-success="afterUpload" :before-upload="beforeAvatarUpload">
            <img v-if="model.icon" :src="model.icon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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
    afterUpload(res) {
        this.$set(this.model, 'icon', res.url)
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    // 编辑/保存数据
    async save() {
      let res;
      if (this.id) {
        //修改
        res = await this.$http.put(`/rest/items/${this.id}`, this.model);
      } else {
        // 创建
        res = await this.$http.post("/rest/items", this.model);
      }
      this.model = res.data;
       this.$router.push("/items/list");
        this.$message({
          type: "success",
          message: "修改成功"
        });
    },
    async fetch() {
      let res = await this.$http.get(`/rest/items/${this.id}`);
      this.model = res.data
    },
    // 获取父级分类列表
    async fetchParents() {
      const res = await this.$http.get(`/rest/items`);
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