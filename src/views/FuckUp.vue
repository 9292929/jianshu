<template>
  <div class="fuck">
    <div class="title">
      <span>三月简书及博客管理系统</span>
    </div>
    <div class="jiemian">
      <nav>
        <router-link to="/home" exact active-class="active-link">
          <span
            :class="{ 'active-link': activeButton === 'user' }"
            @click="activateButton('user')"
            >普通用户登录</span
          >
        </router-link>
        <router-link to="/about" exact active-class="active-link">
          <span
            :class="{ 'active-link': activeButton === 'admin' }"
            @click="activateButton('admin')"
            >超级管理员登录</span
          >
        </router-link>
      </nav>

      <router-view />
    </div>
  </div>
</template>
 
 <script>
export default {
  name: "FuckUp",
  data() {
    return {
      activeButton: "user",
    };
  },
  methods: {
    activateButton(buttonName) {
      this.activeButton = buttonName;
    },
  },
};
</script>
 
 <style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}

.ggg span {
  color: black;
}

.title {
  font-size: 85px;
  font-weight: 900;
  text-align: center;
}
.title span {
  text-shadow: 0px 1px 0px #c0c0c0, 0px 2px 0px #b0b0b0, 0px 3px 0px #a0a0a0,
    0px 4px 0px #909090, 0px 5px 10px rgba(0, 0, 0, 0.6);

  color: #f7cfba;
  opacity: 0.5;
  font-family: "得意黑 斜体";
  font-weight: 400;
  src: url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/jPTq7jIeDDZq.woff2")
      format("woff2"),
    url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/L2GAXjMMurqT.woff")
      format("woff");
}

.fuck {
  width: 100%;
  height: 100vh;
  /* 背景渐变 */
  background-image: linear-gradient(
    -225deg,
    #8bb42b 0%,
    #8c24bd 34%,
    #1e6baa 100%
  );
}
nav {
  text-align: center;
  padding-top: 70px;
  display: flex;
  a {
    text-decoration: none;
  }
  span {
    font-family: "阿里妈妈东方大楷 Regular";
    font-weight: 400;
    src: url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/VzNuPSQhuQIt.woff2")
        format("woff2"),
      url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/YrMrpGtzP4L8.woff")
        format("woff");
    font-family: "阿里妈妈东方大楷 Regular";
    font-weight: 400;
    src: url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/XNgcST3ggX5F.woff2")
        format("woff2"),
      url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/Irzt7bocems4.woff")
        format("woff");
    font-display: swap;
    color: rgb(144, 111, 175);
    font-size: 30px;
    font-weight: 900;
    padding-left: 38px;
  }
}
.jiemian {
  text-align: center;
  width: 500px;
  height: 550px;
  background: rgba(blue, 0.2);
  margin: 0 auto;
  margin-top: 80px;
  box-shadow: 20px 15px 50px;
  border-radius: 20px 20px 20px 20px;
}
.active-link {
  color: skyblue;
  font-weight: bold;
}
</style>