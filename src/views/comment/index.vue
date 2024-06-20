<template>
  <div class="app-container">
    <el-table :data="tableData" border style="width: 100%" v-loading="loading">
      <el-table-column
        label="序号"
        header-align="center"
        align="center"
        width="50"
      >
        <template slot-scope="scope">
          {{ scope.$index + 1 + (currPage - 1) * pageLimit }}
        </template>
      </el-table-column>
      <el-table-column
        label="头像"
        header-align="center"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-avatar
            shape="square"
            :size="50"
            :src="scope.row.avatar"
          ></el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="昵称"
        header-align="center"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="blog.title"
        label="评论文章"
        header-align="center"
        align="center"
        width="300"
      >
      </el-table-column>
      <el-table-column
        prop="content"
        label="评论内容"
        header-align="center"
        align="center"
      >
      </el-table-column>
      <el-table-column
        label="评论日期"
        header-align="center"
        align="center"
        width="240"
      >
        <template slot-scope="scope">
          {{ format(scope.row.createDate) }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        header-align="center"
        align="center"
        width="100"
      >
        <template slot-scope="scope">
          <el-tooltip content="删除" placement="top" :hide-after="1500">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              circle
              @click="deleteHandle(scope.row.id)"
            ></el-button
          ></el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :total.sync="total"
      :current-page.sync="currPage"
      :pager-count="11"
      :page-sizes="[5, 10, 20]"
      :page-size.sync="pageLimit"
      layout="prev, pager, next, total, ->, sizes, jumper"
      @size-change="sizeChangeHandle"
      @current-change="currChangeHandle"
    >
    </el-pagination>
  </div>
</template>

<script>
import format from "@/utils/format";
import { getComment, deleteComment } from "@/api/comment";

export default {
  data() {
    return {
      tableData: [],
      loading: true,
      currPage: 1,
      pageLimit: 10,
      total: 0,
    };
  },
  methods: {
    format,
    getComment() {
      getComment(this.currPage, this.pageLimit).then((resp) => {
        this.total = resp.data.total;
        this.tableData = resp.data.rows;
        if (this.currPage * this.pageLimit > this.total)
          this.currPage = Math.ceil(this.total / this.pageLimit);
        this.loading = false;
      });
    },
    deleteHandle(id) {
      this.$confirm("确定删除这条评论吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteComment(id).then((resp) => {
            if (!resp.code && resp.data) {
              this.getComment().then(() => {
                this.$message({
                  message: "成功删除",
                  type: "success",
                });
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    sizeChangeHandle(limit) {
      this.currPage = 1;
      this.pageLimit = limit;
      this.loading = true;
      this.getComment();
    },
    currChangeHandle(page) {
      this.currPage = page;
      this.loading = true;
      this.getComment();
    },
  },
  created() {
    this.getComment();
  },
};
</script>

<style lang="scss" scoped>
.el-pagination {
  margin: 50px 0;
}
</style>
