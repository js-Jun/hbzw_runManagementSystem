import Vue from 'vue'

//导入并绑定Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//定义数据存储仓库（状态管理）
const state = {
    recordNavItem:[{name:'首页',path:'/index'}], //用户选中的导航菜单项
    activeItemIndex:"/index"
}

//定义用于修改数据的方法
const mutations = {
    //里面定义修改state中数据的函数 默认有一个参数就是state对象
    addNavItem:(state,obj) => { //定义recordNavItem数组添加
        if(JSON.stringify(state.recordNavItem).indexOf(JSON.stringify(obj)) == -1){
            state.recordNavItem.push(obj)
        }
    },
    deleteNavItem:(state,index) => { //定义recordNavItem数组删除
        state.recordNavItem.splice(index,1)
    },
    setActiveItemIndex:(state,path) => {
        state.activeItemIndex = path
    }
}

//用于异步修改state的数据
const actions = {}  //触发 mutations中的函数来达到修改state中的数据

//计算属性
const getters ={
    //username: (state) => localStorage.getItem('username')  里面不是函数 是属性
}

//导出store实例
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})