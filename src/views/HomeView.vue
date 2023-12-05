<template>
  <div class="home">
    <!-- <input type="text" placeholder="请输入用户名" v-model="nameWord" /><br /> -->
    <input type="tel" placeholder="请输入电话号码" v-model="numberWord" /><br />
    <input type="password" placeholder="手机号前六位" v-model="keyWord" /><br />
    <el-button :plain="true" @click="fuck">提交验证</el-button>
  </div>
</template>

<script>
import { userData } from "../apis/login";
import { ifOnce } from "../apis/login";

export default {
  name: "HomeView",
  data() {
    return {
      // nameWord: "",
      keyWord: "",
      numberWord: "",
    };
  },
  methods: {
    async fuck() {
      let formerData = {
        // name: this.nameWord,
        mobile: this.numberWord,
        password: this.keyWord,
      };
      try {
        const ref = await userData(formerData);
        // this.$router.push("/fuckordinary");
        // console.log("请求成功", ref.data);
        // // // //输出tokne信息
        // console.log(ref.data.aToken);

        if (ref.code === 1003) {
          this.$message("账号或密码不正确");
          return;
        }
        let red = null;
        if (ref.code === 1000) {
          console.log("进入");
          console.log(ref);
          localStorage.setItem("accessToken", ref.data.aToken);
          localStorage.setItem("isBoss", ref.data.is_boss);

          red = await ifOnce();
          console.log("win" + ref.data.aToken);
        }
        console.log(red);
        if (ref.code === 1000 && red.code === 1000) {
          this.$router.push("/fuckordinary"); //进入后台页面
          this.$alert("登录成功", "提示操作", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$message({
                type: "info",
                message: `提示: 已登录`,
              });
            },
          });
        } else if (red.code === 1010) {
          console.log("新用户");
          this.$router.push("/inputer"); //进入录入页面
        }
      } catch (error) {
        this.$alert("连接超时", "提示操作", {
          confirmButtonText: "确定",
          callback: (action) => {
            this.$message({
              type: "info",
              message: `提示: 断开连接`,
            });
          },
        });
        console.log("请求失败", error.message);
      }
    },
  },
};
</script>
<style scoped>
.home {
  text-align: center;
}
input {
  width: 300px;
  height: 40px;
  margin-top: 100px;
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