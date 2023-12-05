<template>
  <div class="ddd">
    <el-container>
      <el-header>
        后台管理

        <el-button
          class="tongbu"
          @click="tongmen"
          :loading="isLoading1"
          type="warning"
          >同步部门信息</el-button
        >
        <el-button
          class="tongbu"
          @click="tongren"
          type="warning"
          :loading="isLoading"
          >同步人员信息</el-button
        >
      </el-header>
      <el-container>
        <el-aside width="200px" style="background-color: #545c64">
          <el-row>
            <el-col :span="24">
              <el-menu
                :default-active="path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="white"
                active-text-color="rgb(202, 161, 25)"
                style="border-right: none"
                router
              >
                <el-menu-item index="tabel">
                  <i class="el-icon-menu"></i>
                  <span slot="title">人员信息</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>

        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 组件A
import { EventBus } from "../uitls/event-bus";
import { updataData } from "../apis/login";
import { updatapersonsData } from "../apis/login";

export default {
  name: "Fuckmanager",

  data() {
    return {
      path: "",
      isLoading: false, // 初始加载状态为false
      isLoading1: false,
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    async tongmen() {
      try {
        console.log("fuck");
        this.isLoading1 = true; // 设置为加载中

        // 调用table1Data函数获取结果，将isBossValue传递给接口
        const result = await updataData();
        console.log(result);
        // 提取Code和Msg字段
        const { Code, Msg } = result;

        // 打印或使用Code和Msg
        console.log("Code:", Code);
        console.log("Msg:", Msg);

        console.log("isloading起作用了");
        if (Msg === "success") {
          this.isLoading1 = false; // 设置为加载中
          this.$alert("同步部门状态成功", "提示操作", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$message({
                type: "info",
                message: `提示: 部门已同步`,
              });
            },
          });
        }
        // 在需要的地方触发事件
        EventBus.$emit("custom-event");
      } catch (error) {
        console.error("请求出错：", error);
      }
    },
    async tongren() {
      try {
        console.log("fuck");
        this.isLoading = true; // 设置为加载中
        // 调用table1Data函数获取结果，将isBossValue传递给接口
        const result = await updatapersonsData();
        console.log(result);
        // 提取Code和Msg字段
        const { Code, Msg } = result;

        // 打印或使用Code和Msg
        console.log("Code:", Code);
        console.log("Msg:", Msg);

        console.log("isloading起作用了");
        if (Msg === "success") {
          this.isLoading = false;
          this.$alert("同步人员状态成功", "提示操作", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$message({
                type: "info",
                message: `提示: 人员状态已同步`,
              });
            },
          });
        }
        // 在需要的地方触发事件
        EventBus.$emit("custom-event");
      } catch (error) {
        console.error("请求出错：", error);
      }
    },
  },

  watch: {
    $route(to, from) {
      const fullPath = to.path; // Update path when the route changes
      const pathSegments = fullPath.split("/"); // 使用 '/' 分割路径
      this.path = pathSegments[pathSegments.length - 1]; // 获取最后一个路径部分
      console.log(this.path);
    },
  },
  mounted() {
    const fullPath = this.$route.path; // Update path when the route changes
    const pathSegments = fullPath.split("/"); // 使用 '/' 分割路径
    this.path = pathSegments[pathSegments.length - 1]; // 获取最后一个路径部分
    console.log(this.path, "this.path");
  },
};
</script>

<style lang='scss' scoped >
.ddd {
  background-image: linear-gradient(
    -225deg,
    #8bb42b 0%,
    #8c24bd 34%,
    #1e6baa 100%
  );

  width: 100%;
  height: 100vh;
}
.el-menu-vertical-demo {
  height: 80vh;
}
.el-header {
  text-align: center;
  width: 100%;
  margin: 0 auto;
  font-size: 50px;
  font-weight: 1000;
  font-family: "阿里妈妈方圆体 VF Regular";
  src: url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/A1iVXZ7ycT8H.woff2")
      format("woff2"),
    url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/PMwjxdVPw3qE.woff")
      format("woff");
  font-display: swap;
  font-display: swap;
  color: rgb(202, 161, 25);
  background-color: #545c64;
  padding-left: 350px;
}
.tongbu {
  float: right;
  font-size: 18px;
  margin-top: 20px;
  margin-right: 20px;

  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 15px 1px 15px 1px;
  font-family: "阿里妈妈数黑体 Bold";
  font-weight: 700;
  src: url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/rYSOiCJM4z9i.woff2")
      format("woff2"),
    url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/lL9SRozQo0kF.woff")
      format("woff");
  font-display: swap;
}
.tongbu:hover {
  color: black;
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>
