<template>
  <div class="about">
    <input
      type="text"
      placeholder="请输入管理员用户名"
      v-model="managername"
    /><br />
    <input
      type="password"
      placeholder="请输入管理员秘钥"
      v-model="managerpassword"
    /><br />
    <el-button :plain="true" @click="fuckmanagerbutton">提交验证</el-button>
  </div>
</template>

<script>
import { LoginAPI } from "../apis/login";
export default {
  name: "AboutView",

  data() {
    return {
      managername: "",
      managerpassword: "",
    };
  },
  methods: {
    async fuckmanagerbutton() {
      let formData = {
        appkey: this.managername,
        appsecret: this.managerpassword,
      };
      try {
        // this.$router.push("/fuckmanager");
        console.log("开心", this.managername, this.managerpassword);
        const res = await LoginAPI(formData);
        console.log(res);
        if (res.code === 1000) {
          this.$router.push("/fuckmanager");
        } else {
          this.$alert("登录失败", "提示操作", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$message({
                type: "info",
                message: `提示: 登录失败`,
              });
            },
          });
        }
      } catch (error) {
        console.error("请求出错：", error);
      }
    },
  },
};
</script>
<style lang="scss" scoped >
.about {
  text-align: center;
}
input {
  width: 300px;
  height: 40px;
  margin-top: 70px;
  background-color: transparent;
  border-bottom-width: 1px;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;
}
.el-button {
  color: rgb(175, 121, 111);
  margin-top: 60px;
  width: 100px;
  height: 40px;
  background-color: transparent;
  border-radius: 20px 20px 20px 20px;
}
</style>

