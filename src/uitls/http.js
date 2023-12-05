import axios from "axios";	//导入 Axios 库，用于发送 HTTP 请求。
// import { userData } from "../apis/login";

// import { userLogin } from '@/stores/user.js';
// 创建新的axios实例
const http = axios.create({
    // 环境变量，需要在.env文件中配置
    baseURL: "http://152.136.50.60:8081",
    // 超时时间暂定5s
    timeout: 30000,
});

// Configure Axios to use the token in subsequent requests
http.interceptors.request.use(
    (config) => {
        // Retrieve the token from local storage
        const token = localStorage.getItem("accessToken")
        console.log("token", token)
        // console.log(token);
        // Add the token to the request headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// axios响应式拦截器
http.interceptors.response.use(res => {
    // if (res.data.code === 1007) {
    //     //统一错误提示

    //     //跳转到登录页面
    //     router.push("/");
    // }
    return res.data
}, e => {
    // if (e.data.code === 1006) {

    //     //跳转到登录页面
    //     router.push("/");
    // }
    console.log("响应拦截器", e);
    return Promise.reject(e)
})

export default http; //导出封装后的 Axios 对象，以便在其他地方引用和使用。