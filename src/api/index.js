//导入axios
import axios from 'axios'
//设置请求的根路径
// const baseURL = '/api';
// axios.defaults.baseURL = baseURL;

//登陆验证
// export const checkUser =params =>{
//     return axios.post('login',params).then(res => res.data)
// }

//查看服务数据
export const viewServerData = () => {
    return axios.get('/api/actuator/gateway/routes').then(res => res.data)
}
//查看配置路径是否连通
export const testSrc = params => {
    return axios.get('/api'+params).then(res => res)
}
//增加服务
export const addServerData = params => {
    return axios.post('/api/route/add',params).then(res => res)
}
//删除服务 两个api都要执行
export const deleteData = params => {
    return axios.all([axios.get('/api/route/routes/'+params),axios.get('/api/route/delete/'+params)]).then(axios.spread(function (res1, res2) {
        return {res1,res2}
      }))
}
//编辑服务信息
export const editServerData = params => {
    return axios.post('/api/route/update',params).then(res => res)
}
//注册中心 服务详情
export const serviceDetails = () => {
    return axios.get('/service/v1/internal/ui/nodes?dc=dc1').then(res => res.data)
}
