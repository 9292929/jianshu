<template>
  <div class="baga">
    <div style="height: 1px"></div>
    <div class="top">
      <div></div>
      <div class="title"><span>请录入简书博客链接</span></div>
    </div>
    <div class="main">
      <span>请录入简书链接: </span>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="books_address"
      ></textarea>
    </div>
    <div class="nextmain">
      <span>请录入博客链接: </span>
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="Blog_address"
      ></textarea>
    </div>
    <el-button type="danger" plain @click="luru">提交验证</el-button>
  </div>
</template>

<script>
import { inputData } from "../apis/login";
export default {
  name: "inputer",
  data() {
    return {
      books_address: "",
      Blog_address: "",
    };
  },
  methods: {
    async luru() {
      let formData = {
        books_address: this.books_address,
        Blog_address: this.Blog_address,
      };
      try {
        const rew = await inputData(formData);

        if (rew.code === 1000) {
          this.$alert("链接录入完成", "提示操作", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$message({
                type: "info",
                message: `提示: 链接已录入`,
              });
            },
          });
          this.$router.push("/fuckordinary");
        }
        if (rew.code !== 1000) {
          this.$alert("链接不正确", "提示操作", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$message({
                type: "info",
                message: `提示: 链接不正确`,
              });
            },
          });
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
        console.error("请求出错：", error);
      }
    },
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0px;
  padding: 0px;
}
.baga {
  width: 100%;
  height: 100vh;
  text-align: center;
  /* 背景渐变 */
  background-image: linear-gradient(
    -225deg,
    #98cf16 0%,
    #1728c2 34%,
    #0edfd4 100%
  );
  .top {
    width: 550px;
    height: 600px;
    background-color: rgba($color: rgb(14, 154, 196), $alpha: 0.7);
    text-align: center;
    margin: 0 auto;
    margin-top: 140px;
    box-shadow: 20px 15px 50px;
    border-radius: 20px 20px 20px 20px;

    .title span {
      font-size: 40px;
      font-weight: 600;
      font-family: "阿里妈妈东方大楷 Regular";
      font-weight: 400;
      src: url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/isMVCI4cjcTf.woff2")
          format("woff2"),
        url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/UTQcgoGKzlm4.woff")
          format("woff");
      font-display: swap;
      background: linear-gradient(to right, rgb(242, 255, 0), rgb(255, 128, 0));
      -webkit-background-clip: text;
      color: transparent;
    }
  }
}
.main {
  height: 150px;
  text-align: center;
  margin-top: -500px;
  margin-left: -50px;
  span {
    background: linear-gradient(to right, rgb(255, 60, 0), rgb(30, 0, 255));
    -webkit-background-clip: text;
    color: transparent;
    font-size: 20px;
    font-weight: 900;
    margin-left: -200px;
  }
}
textarea {
  resize: none; /* 阻止用户调整文本框大小 */
  width: 350px;
  height: 100px;
  margin: 0 auto;
  display: block;
  margin-top: 20px;
  background-color: transparent;
  border-bottom-width: 1px;
  border-top-width: 0px;
  border-left-width: 0px;
  border-right-width: 0px;

  text-align: left; /* 设置文本左对齐 */
}
.nextmain {
  text-align: center;
  margin-top: 50px;
  margin-left: -50px;
  span {
    background: linear-gradient(to left, rgb(255, 60, 0), rgb(30, 0, 255));
    -webkit-background-clip: text;
    color: transparent;
    font-size: 20px;
    font-weight: 900;
    margin-left: -200px;
    margin-top: -100px;
  }
}
.el-button {
  margin-top: 50px;
  width: 100px;
  height: 40px;
  background-color: transparent !important;
}
</style>