//导入axios
import axios from 'axios'
//设置请求的根路径
// const baseURL = '/api';
// axios.defaults.baseURL = baseURL;

//登陆验证
// export const checkUser =params =>{
//     return axios.post('login',params).then(res => res.data)
// }

//查看路由数据
export const viewServerData = () => {
    return axios.get('/route/routes').then(res => res.data)
}
//查看配置路径是否连通
// export const testSrc = params => {
//     return axios.get('/api'+params).then(res => res)
// }
//增加路由
export const addServerData = params => {
    return axios.post('/route/routes/route',params).then(res => res.data)
}
//删除路由
export const deleteData = params => {
    return axios.delete(`/route/routes/route/${params}`).then(res => res.data)
}
//编辑路由信息
export const editServerData = params => {
    return axios.put('/route/routes/route',params).then(res => res.data)
}
// 注册中心
export const registeredCenter = () => {
    return axios.get('/reg/registries/nodes').then(res => res.data)
}

// 查询所有服务信息
export const serviceDetails = () => {
    return axios.get('/reg/registries').then(res => res.data)
}
//服务下线
export const serviceIsout = params => {
    return axios.put(`/reg/registries/out/${params.serviceName}/${params.id}`).then(res => res.data)
}
//服务上线
export const serviceIsUp = params => {
    return axios.delete(`/reg/registries/up/${params.serviceName}/${params.id}`).then(res => res.data)
}
//服务删除
export const serviceIsdelete = params => {
    return axios.delete(`/reg/registries/delete/${params.serviceName}/${params.id}`).then(res => res.data)
}