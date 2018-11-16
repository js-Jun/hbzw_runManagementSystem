<template>
    <div class="home">
        <el-container>
    <!-- 侧边栏 start -->
            <el-aside width="auto">

            <el-menu
            :default-active="$store.state.activeItemIndex"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="activationCallback"
            background-color="#545c64"
            text-color="#fff"
            :router=true
            active-text-color="#409EFF"
            :collapse="isCollapse">
            <el-menu-item index="/home/index">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
            </el-menu-item>
            <el-menu-item index="/home/Registered">
                <i class="el-icon-view"></i>
                <span slot="title">注册中心</span>
            </el-menu-item>
            <el-menu-item index="/home/ServiceDetails">
                <i class="el-icon-location-outline"></i>
                <span slot="title">服务详情</span>
            </el-menu-item>
            <el-menu-item index="/home/ServiceConfig">
                <i class="el-icon-setting"></i>
                <span slot="title">服务配置</span>
            </el-menu-item>  
            </el-menu>
            </el-aside>
    <!-- 侧边栏 end -->
            <el-container>
    <!-- 头部 start -->
                <el-header>
                    <i @click="toggleContraction" class="myicon myicon-menu toggle-btn"></i>
                    <div class="system-title">运行管理平台</div>
                   <div>
                    <span>您好,admin</span>&nbsp;&nbsp;
                    <el-button type="text" @click="logOut">退出</el-button>
                   </div>
                </el-header>
    <!-- 头部 end -->

    <!-- 子组件 展示标签 -->
                <navtags> </navtags>
    <!-- 中间内容区域 start -->
                <el-main>
                    <router-view></router-view>
                </el-main>
    <!-- 中间内容区域  end-->
            </el-container>
        </el-container>
    </div>
</template>
<script>
import navTags from '@/assets/navTag.js'
import navtags from './navTagsChildren.vue'
 export default {
     data(){
         return {
             isCollapse:false
         }
     },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },  
      activationCallback(index,indexPath){ //激活菜单时的回调
        console.log('index:'+index)
        console.log('indexPath:'+indexPath)
        var navItem = navTags.filter(item => item.path === index)[0]; //得到用户点击的菜单项
        this.$store.commit('addNavItem',navItem)   //使用mutations添加数据到state中
      }, 
      logOut(){ //退出按钮
        //   window.location.reload()
          this.$router.push({name:'Login'})
      },
      toggleContraction(){
        this.isCollapse = !this.isCollapse;
      },
       tishi(){
        this.$notify.success({
                title: '您好：admin',
                message: '欢迎登陆运行管理平台系统',
                showClose: false
                });
        },
        linkPath(){
           console.log(123123)
        }
    },
    created(){
        this.$router.push({name:'Index'})
    },
    mounted(){
        this.tishi()
    },
    components:{navtags}
    }

</script>
<style lang="scss" scoped>
.home {
  height: 100%;
  .el-container {
    height: 100%;
    .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  }
  .el-aside {
    background-color: #545c64;
    .el-menu{
        margin-top:60px
    }
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #dcdcdc;
  }
//   .logo {
//     height:60px;
//     // background: url(../assets/logo.png);
//     // background-size: cover;
//     background-color: #989898;
//   }
  .toggle-btn {
    font-size: 36px;
    color: #989898;
    cursor: pointer;
    line-height: 60px;
  }
  .system-title {
    font-size: 28px;
    color: #303133;
    font-weight: 700
  }
//   .logout-btn {
//     color: orange;
//   }
    // .nav_tags{
    //     width: 100%;
    //     background: pink;
    //     height: 50px;
    // }
}
</style>

