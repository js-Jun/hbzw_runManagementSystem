<template>
 <div class="login" v-if="isReload">
    <el-form ref="form" :model="form" class="container" :rules="rules">
      <el-form-item>
        <div class="avatar">
          <img src="../assets/loginLog.png" alt="" width="100px">
        </div>
      </el-form-item>
      <el-form-item prop="username">
        <el-input v-model="form.username" placeholder="账户" prefix-icon="myicon myicon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="form.password" placeholder="密码" prefix-icon="myicon myicon-key"></el-input>
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
  background-color: #909399;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
        background-color: #fff;
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
