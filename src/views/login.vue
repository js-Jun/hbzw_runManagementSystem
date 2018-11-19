<template>
 <div class="login" v-if="isReload">
   <div class="logoImg">
     <img src="../assets/logo.png" alt="">
   </div>
    <el-form ref="form" :model="form" class="container" :rules="rules">
      <el-form-item>
        <h1 class="systemName">鄂汇办-运行管理系统</h1>
        <h3 class="loginTitle">用户登录</h3>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="form.username" class="userInfoInput" placeholder="账户" prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" class="userInfoInput" type="password" placeholder="密码" prefix-icon="myicon myicon-key" @keyup.enter.native="validationLogin"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="validationLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        isReload:false,
        // fullscreenLoading: false
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods:{
    validationLogin(){
      // 发送用户的数据到后台验证 , 如果通过 ,跳到首页展示
      if(this.form.username == 'admin' && this.form.password == 123456){
        this.$router.push({name:'Home'})
      }else{
        this.$message.error('请输入正确的用户名和密码');
      }
    }
  },
  created(){
if (this.$store.state.recordNavItem.length > 1) { // 判断是否已经刷新
     return window.location.reload() 
    }
    // 正式显示页面内容
    this.isReload = true
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background:url('../assets/bgcLoginImg.png') no-repeat;
  background-size:100% 100%;  
  background-position: center 40%;
  .logoImg{
    position: absolute;
    top: 10px;
    left: 15px;
    width: 179px;
    height: 60px;
  }
  .el-form-item{
margin-bottom: 30px;
  }
  .container {
    position: absolute;
    top: 50%;
    right: 100px;
    transform: translate(0,-50%);
    width: 415px;
    padding: 100px 30px 100px;
    border-radius: 4px;
    // background: rgba(255, 255, 255, 0.1);
    // box-shadow: -15px 11px 25px #409EFF;
    .systemName{
      position: absolute;
      top: -80px;
      left: 0;
      font-size: 35px;
      color: #fff;
    }
      .loginTitle{
        height: 24px;
        font-weight: normal;
        font-size: 26px;
        line-height: 16px;
        padding-left: 10px;
        color: #fff;
        margin-bottom: 5px;
        border-left: 1px solid #fff;
      }
      .login-btn {
        width: 100%;
        background-color: #E6A23C;
      }
    }
}
</style>
