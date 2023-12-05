<template>
  <div class="tabel">
    <h2>搜索：</h2>
    <el-input
      placeholder="请输入姓名"
      v-model.lazy="searchname"
      @input="API"
    ></el-input>
    <!-- 根据isLoading的状态来显示加载中的信息 -->
    <div v-if="isLoading" class="loading-message">数据正在加载中...</div>
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane
        v-for="(item, index) in persons"
        :key="index"
        :label="item.high_dept_name"
        :name="item.high_dept_name"
      >
        <div class="table">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item
              v-for="(subDept, index) in item.TypeNameEnd"
              :key="index"
              class="table2"
              :title="subDept.dept_name"
              :name="index"
              ><div class="jianshu">
                <el-button
                  type="danger"
                  class="danger"
                  @click="
                    updateiswrite(subDept.dept_id, subDept.is_write_books)
                  "
                >
                  {{ getyesorno(subDept.is_write_books) }}
                </el-button>
              </div>

              <div
                v-for="(shun, index) in subDept.TypeName"
                :key="index"
                class="table1"
              >
                <div class="name">
                  {{ shun.name }}
                </div>
                <div class="mobile">
                  {{ shun.mobile }}

                  <el-button
                    type="primary"
                    class="primary"
                    @click="toggleAdminStatus(shun.user_id, shun.is_boss)"
                  >
                    {{ getButtonLabel(shun.is_boss) }}
                  </el-button>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { allDept } from "../apis/login";
import { table1Data } from "../apis/login";
import { updateBumen } from "../apis/login";

import { EventBus } from "../uitls/event-bus";

export default {
  name: "tabel",
  data() {
    return {
      persons: [],
      activeName: "全职部",
      activeNames: "", //防止浏览器报错
      searchname: "",
      isLoading: true, // 初始状态为加载中
    };
  },

  methods: {
    handleChange(val) {
      //同上，浏览器会报错说未定义，在渲染期间引用
      console.log(" handleChange", val);
    },

    async API() {
      console.log("调用了API");
      try {
        // 在发送请求之前，将isLoading设置为true
        this.isLoading = true;
        const res = await allDept(this.searchname);
        // 在这里处理响应数据，例如将数据赋值给 persons 数组
        this.persons = res.data;
        // 这里假设数据加载完成后，将isLoading设置为false
        this.isLoading = false;
        // 在数据加载完成后触发自定义事件
        this.$emit("data-loaded", this.persons);
      } catch (error) {
        console.error("请求出错：", error);
      }
    },
    async toggleAdminStatus(user_id, is_boss) {
      try {
        console.log("进入线程");

        const userid = user_id;
        console.log("userid:", userid);
        console.log("is_boss:", is_boss);
        // 将true转化为1，false转化为0
        const isBossValue = is_boss ? 0 : 1;

        // 调用table1Data函数获取结果，将isBossValue传递给接口
        const result = await table1Data(userid, isBossValue);
        console.log(result);
        // 提取code和msg字段
        const { code, msg } = result;

        // 打印或使用code和msg
        console.log("code:", code);
        console.log("msg:", msg);
        // 如果返回的msg为success，则更新按钮状态和提示
        if (msg === "success") {
          this.$alert("修改管理员成功", "提示", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$message({
                type: "info",
                message: `提示:管理员状态已修改`,
              });
            },
          });
          this.API(); // Refresh the data
        }
      } catch (error) {
        console.error("请求出错：", error);
      }
    },
    async updateiswrite(dept_id, is_write_books) {
      try {
        console.log("进入线程2");

        console.log("dept_id:", dept_id);
        console.log("is_write_books:", is_write_books);
        //如果是0，赋值为1，修改状态
        const qufan = is_write_books === 0 ? 1 : 0;

        const finals = await updateBumen(dept_id, qufan);
        console.log(finals);
        // 提取code\和msg字段
        const { code, msg } = finals;

        // 打印或使用code和msg
        console.log("code2:", code);
        console.log("msg2:", msg);
        // 如果返回的msg为success，则更新按钮状态和提示
        if (msg === "success") {
          this.$alert("修改简书状态成功", "提示操作", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$message({
                type: "info",
                message: `提示: 操作成功`,
              });
            },
          });
          this.API(); // Refresh the data
        }
      } catch (error) {
        console.error("请求出错：", error);
      }
    },
  },
  computed: {
    getButtonLabel() {
      // Return "设置为管理员" if is_boss is 0, and "取消管理员" if is_boss is 1
      return (is_boss) => (is_boss === false ? "设置为管理员" : "取消管理员");
    },
    getyesorno() {
      return (is_write_books) =>
        is_write_books === 0 ? "取消部门简书博客" : "需要写简书博客";
    },
  },
  created() {
    // 在组件B的创建钩子中监听事件
    EventBus.$on("custom-event", this.API);
  },
  mounted() {
    this.API();
  },
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}
.tabel {
  background-color: #fff;
  overflow-y: auto;
  height: 85vh;
}

.table {
  color: white;
}
.table1 {
  display: flex;
  font-size: 20px;
}
.el-collapse-item__header {
  font-size: 50px;
}
.name {
  width: 150px;
  text-align: center;
}
.mobile {
  width: 500px;
  text-align: center;
}
.jianshu {
  height: 30px;
  width: 200px;
  float: right;
}
.loading-message {
  position: fixed;
  width: 1630px;
  height: 560px;
  background-color: rgba(
    255,
    255,
    255,
    1
  ); /* 这里的最后一个参数(0.8)表示透明度，可以根据需要调整 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 确保loading在其他元素之上 */
  color: skyblue;
}
h2 {
  color: skyblue;
  font-family: "阿里妈妈刀隶体 Regular";
  font-weight: 400;
  // src: url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/T6CMn1lgf8yd.woff2")
  //     format("woff2"),
  //   url("//at.alicdn.com/wf/webfont/4qEToiDg12q4/DnU3JDlNTOd7.woff")
  //     format("woff");
  font-display: swap;
}
.el-input {
  width: 300px;
}
.primary {
  float: right;
  width: 100px;
  height: 30px;
}
.danger {
  width: 120px;
  height: 40px;
}
</style>