import http from "../uitls/http"
//超级管理员登录
export const LoginAPI = (data) => {
    return http({
        url: "/superAdmin/superLogin",
        method: "POST",
        data
    })

}
//普通用户和管理员登录
export const userData = (data) => {
    return http({
        url: "/user/login",
        method: "POST",
        data
    })
}
//人员信息
export const allDept = (searchname) => {
    return http({
        url: "/superAdmin/allDept",
        method: "POST",
        params: {
            name: searchname
        }
    })
}
//修改管理员
export const table1Data = (userid, is_boss) => {
    return http({
        url: `/superAdmin/updateAdmin/${userid}/${is_boss}`,
        method: "GET",
        // params: {
        //     userid: userid,
        //     is_boss: is_boss
        // }
    })
}
//同步部门信息
export const updataData = () => {
    return http({
        url: "/ding/getDeptList",
        method: "POST"
    })
}
//同步人员信息
export const updatapersonsData = () => {
    return http({
        url: "/ding/getUsers",
        method: "POST"
    })
}
//查询部门
export const bumenData = (dept_name) => {
    return http({
        url: "/superAdmin/searchDept",
        method: "GET",
        params: {
            dept_name
        }
    })
}
//查询人员
export const personsData = () => {
    return http({
        url: "/superAdmin/searchUser",
        method: "GET"
    })
}
//修改部门是否需要写简书
export const updateBumen = (dept_id, is_write_books) => {

    return http({
        url: `/superAdmin/isWriteDept/${dept_id}/${is_write_books}`,
        method: "GET",
        // params: {
        //     dept_id: dept_id,
        //     is_write_books: is_write_books
        // }
    })
}
//判断是否是第一次登录
export const ifOnce = () => {

    return http({
        url: `/userLogin/bookAddress`,
        method: "POST",
        // params: 
        //     dept_id: dept_id,
        //     is_write_books: is_write_books
        // }
    })
}
//判断是否是第一次登录
export const inputData = (data) => {

    return http({
        url: `/userLogin/inputAddress`,
        method: "POST",
        data
    })
}
//查看当前登录用户的信息
export const getuserData = () => {

    return http({
        url: `/userLogin/selfInformation`,
        method: "GET",

    })
}
//查询所有人的简书
export const getjianshuData = () => {

    return http({
        url: `/article/selectBook`,
        method: "GET",

    })
}
//查看所有人博客
export const getblogData = () => {

    return http({
        url: `/article/selectBlog`,
        method: "GET",

    })
}
//评优秀简书
export const excellent=(book_or_blog,id,is_top)=>{
    return http({
        url:`/admin/elect`,
        method:"POST",
        data:{
            book_or_blog,//评选的文章是简书还是博客，0博客，1简书
            id,//简书或者博客id
            is_top//是否优秀，1为优秀，0为取消
        }
    })
}