<template>
  <div class="normol">
    <head>
      <meta name="referrer" content="no-referrer" />
    </head>
    <div class="header">
      <span class="header-sp">首页</span>
      <div class="user">
        <img :src="userData.avatar" alt="" />
        <span class="user-sp">admin：{{ userData.name }}</span>
        <el-button type="primary" round @click="back">退出</el-button>
      </div>
    </div>
    <div class="main">
      <h1>简书</h1>
      <el-tabs
        type="border-card"
        v-model="activeName"
        v-loading="loading"
        style="font-size: 16px"
      >
        <el-tab-pane
          v-for="(item, index) in jianshu"
          :key="index"
          :label="item.dept_name"
          :name="item.dept_name"
        >
          <div class="table">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item
                v-for="(subDept, index) in item.TypeArticle"
                :key="index"
                class="table2"
                :title="subDept.name"
                :name="index"
              >
                <el-row v-if="boss === 'true'">
                  <el-button
                    v-if="subDept.is_top != 1"
                    type="success"
                    round
                    style="float: right"
                    @click="youxiu_jianshu(1, subDept.ID, 1)"
                    >评为优秀简书</el-button
                  >
                  <el-button
                    v-else
                    type="danger"
                    round
                    style="float: right"
                    @click="youxiu_jianshu(1, subDept.ID, 0)"
                    >取消优秀简书</el-button
                  >
                </el-row>
                <div class="table1">
                  <a :href="`${subDept.article_url}`" class="title"
                    >《 {{ subDept.book_title }}》</a
                  >
                  <div class="artical">
                    {{ subDept.book_article }}
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
      </el-tabs>
      <h1>博客</h1>
      <el-tabs type="border-card" v-model="activeName1">
        <el-tab-pane
          v-for="(item, index) in blog"
          :key="index"
          :label="item.dept_name"
          :name="item.dept_name"
        >
          <div class="table">
            <el-collapse v-model="activeNames1" @change="handleChange">
              <el-collapse-item
                v-for="(subDept, index) in item.TypeBlog"
                :key="index"
                class="table2"
                :title="subDept.name"
                :name="index"
              >
                <el-row v-if="boss === 'true'">
                  <el-button
                    v-if="subDept.is_top != 1"
                    type="success"
                    round
                    style="float: right"
                    @click="youxiu_jianshu(0, subDept.ID, 1)"
                    >评为优秀博客</el-button
                  >
                  <el-button
                    v-else
                    type="danger"
                    round
                    style="float: right"
                    @click="youxiu_jianshu(0, subDept.ID, 0)"
                    >取消优秀博客</el-button
                  >
                </el-row>
                <div class="table1">
                  <div class="title">《 {{ subDept.book_title }}》</div>
                  <div class="artical" v-html="subDept.book_article">
                    {{ subDept.book_article }}
                  </div>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getuserData, excellent } from "../apis/login";
import { getjianshuData } from "../apis/login";
import { getblogData } from "../apis/login";
export default {
  name: "FuckordinaryView",
  data() {
    return {
      // loading: true,
      blog: [],
      jianshu: [],
      activeNames: "",
      activeName: "乐知五期（18期）",
      activeNames1: "",
      activeName1: "乐知五期（18期）",
      userData: "", // 用来存储接口返回的数据
      boss: localStorage.getItem("isBoss"),
      res: [],
    };
  },
  created() {
    // 在页面创建时调用接口
    this.alluserblog();
    this.fetchUserData();
    this.alluserjianshu();
  },
  methods: {
    handleChange(val) {
      //同上，浏览器会报错说未定义，在渲染期间引用
      console.log(" handleChange", val);
    },
    async fetchUserData() {
      const response = await getuserData(); // 调用接口请求函数
      this.userData = response.data; // 将接口返回的数据存储在userData中
      console.log(this.userData);
    },
    async back() {
      this.$router.push("/home");
    },
    //获取所有人的简书
    async alluserjianshu() {
      const result = await getjianshuData();
      this.jianshu = result.data;
      console.log(result.data);
    },
    //获取所有人博客
    async alluserblog() {
      const result1 = await getblogData();
      this.blog = result1.data;
      console.log(result1.data);
    },
    //评优秀简书
    async youxiu_jianshu(isBlogORBook, a, isTop) {
      let res = await excellent(isBlogORBook, a, isTop);
      console.log(res);
      if (isBlogORBook === 1) {
        this.alluserjianshu();
      } else {
        console.log("222");
        this.alluserblog();
      }
    },
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.normol {
  width: 100%;
  height: 100vh;
  /* 背景渐变 */
  background-image: linear-gradient(
    -225deg,
    #91c022 0%,
    #babd24 34%,
    #1eaa77 100%
  );
  .main {
    padding-top: 20px;
    padding-left: 20px;
    padding-right: 20px;
    width: 90%;
    height: 80vh;
    overflow: auto; /* 或者使用 overflow: scroll; */
    background-color: black;
    margin: 0 auto;
    margin-top: 50px;
    background-color: rgba(255, 255, 255, 1); /* 半透明的红色背景 */
    h1 {
      text-align: center;
      display: block;
      margin-top: 20px;
    }
  }
}

.header {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(47, 45, 45, 0.7); /* 半透明的红色背景 */
  .header-sp {
    width: 200px;
    font-size: 30px;
    font-weight: 600;
    background: linear-gradient(to left, rgb(1, 7, 29), rgb(0, 247, 255));
    -webkit-background-clip: text;
    color: transparent;
    margin-left: 20px;
  }
  .user {
    width: 380px;
    height: 70px;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-around;
    img {
      width: 50px;
      height: 50px;
    }
    .user-sp {
    }
  }
  .el-tabs_content {
    height: 1000px;
  }
}
.title {
  color: blue;
  padding: 10px;
  text-decoration: none;
  font-size: 20px;
  // background-color: #dce1e6;
}
</style>