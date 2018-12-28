<template>
    <div>
    <el-row>
        <el-col :span="24">
            <!-- 给组件绑定原生事件的话，需要一个.native的修饰符 -->
            <el-input placeholder="请输入路由id" class="search-input" @keyup.enter.native="userSearch" v-model="userVal">
            <el-button slot="append" icon="el-icon-search" @click="userSearch"></el-button>
            </el-input>
            <el-button type="success" plain @click="addDialogFormVisible=true">添加路由</el-button>
        </el-col>
    </el-row>
    <!-- 添加服务 start -->
    <el-dialog title="添加路由" :visible.sync="addDialogFormVisible">
    <el-form :model="addForm" :rules="ServerRules" label-width="82px" ref="addUserForm">
        <el-form-item label="路由id " prop="id">
        <el-input v-model="addForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="配置路径" prop="path">
        <el-input v-model="addForm.path" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="转发地址" prop="url">
        <el-input v-model="addForm.url" auto-complete="off" placeholder="http://"></el-input>
        </el-form-item>
        <el-form-item label="转发服务名" prop="serviceId">
        <el-input v-model="addForm.serviceId" auto-complete="off"></el-input>
        </el-form-item>
        <div class="clearfix">
        <el-form-item label="去掉前缀" prop="stripPrefix" class="fl" style="margin-right:50px">
            <el-switch
            v-model="addForm.stripPrefix"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </el-form-item>
        <el-form-item label="是否启用 " prop="enabled" class="fl">
            <el-switch
            v-model="addForm.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </el-form-item>
        </div>
        <el-form-item label="路由描述" prop="description">
        <el-input v-model="addForm.description" auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit('addUserForm')">确 定</el-button>
    </div>
</el-dialog>
    <!-- 添加服务 end -->

    <!-- 编辑服务 start -->
       <el-dialog title="编辑路由" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm" :rules="ServerRules" label-width="82px" ref="editUserForm">
        <el-form-item label="路由id " prop="id">
        <el-input v-model="editForm.id" auto-complete="off" :disabled="edit"></el-input>
        </el-form-item>
        <el-form-item label="配置路径" prop="path">
        <el-input v-model="editForm.path" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="转发地址" prop="url">
        <el-input v-model="editForm.url" auto-complete="off" placeholder="http://"></el-input>
        </el-form-item>
        <el-form-item label="转发服务名" prop="serviceId">
        <el-input v-model="editForm.serviceId" auto-complete="off"></el-input>
        </el-form-item>
        <div class="clearfix">
        <el-form-item label="去掉前缀" prop="stripPrefix" class="fl" style="margin-right:50px">
            <el-switch
            v-model="editForm.stripPrefix"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </el-form-item>
        <el-form-item label="是否启用 " prop="enabled" class="fl">
            <el-switch
            v-model="editForm.enabled"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </el-form-item>
        </div>
        <el-form-item label="路由描述" prop="description">
        <el-input v-model="editForm.description" auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserSubmit('editUserForm')">确 定</el-button>
    </div>
    </el-dialog>
    <!-- 编辑服务 end -->
    <el-table
    :data="serviceList"
    border
    style="width:100%;font-size:16px;margin-top:10px">
    <el-table-column
        type="index"
        fixed
        label="序号"
        align="center">
    </el-table-column>
    <el-table-column
        prop="id"
        fixed
        label="路由id"
        align="center"
        width="130">
    </el-table-column>
    <el-table-column
        prop="path"
        label="匹配路径"
        align="center"
        width="200">
    </el-table-column>
    <el-table-column
        prop="url"
        align="center"
        label="转发地址"
        width="200">
    <template slot-scope="scope">
        {{scope.row.url ? scope.row.url : '无'}}   
    </template>
    </el-table-column>
    <el-table-column
        prop="serviceId"
        align="center"
        label="转发服务名"
        width="200">
    <template slot-scope="scope">
        {{scope.row.serviceId ? scope.row.serviceId : '无'}}   
    </template>
    </el-table-column>
   <!-- <el-table-column
      label="是否可用"
      align="center"
      width="100">
        <template slot-scope="scope">
             <el-button type="success" icon="el-icon-check" style="font-size:12px" circle v-if="serviceList[scope.$index].status"></el-button>
             <el-button type="danger" icon="el-icon-close" style="font-size:12px" circle v-else></el-button>
        </template>
    </el-table-column> -->
    <el-table-column
    prop="enabled"
    align="center"
    label="是否启用"
    width="100">
    <template slot-scope="scope">
        {{scope.row.enabled ? '是' : '否'}}   
    </template>
    </el-table-column>
    <el-table-column
    prop="stripPrefix"
    align="center"
    label="去掉前缀"
    width="100">
    <template slot-scope="scope">
        {{scope.row.stripPrefix ? '是' : '否'}}
    </template>
    </el-table-column>
    <el-table-column
        prop="description"
        align="center"
        label="路由描述"
        width="200">
        <template slot-scope="scope">
            {{scope.row.description ? scope.row.description : '无'}}   
        </template>
    </el-table-column>
    <el-table-column 
    label="操作" 
    align="center" 
    fixed="right" 
    width="300">
        <template slot-scope="scope">
            <el-button type="success" @click="editRow(scope)">编辑</el-button>
            <!-- <el-button type="info" :loading="scope.row.checks" @click="test(scope)">检测</el-button> -->
            <el-button type="danger" @click="deleteRow(scope.row.id)">删除</el-button>
  <!-- <el-button type="primary">配置</el-button> -->
        </template>
    </el-table-column>
</el-table>
    <!-- <div class="page">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="40">
        </el-pagination>
    </div> -->
    </div>
</template>

<script>
import {viewServerData,testSrc,addServerData,deleteData,editServerData} from '@/api/index.js'
    export default {
    data() {
      return {
          addDialogFormVisible:false,//添加服务模态框的显示隐藏
          editDialogFormVisible:false,//编辑服务模态框的显示隐藏
          serviceList:[],            //服务列表信息
          addForm: {                 //添加服务数据
                "id":"",
                "path":"",
                "url":"",
                "serviceId": "",
                "stripPrefix": true,
                "enabled": true,
                "description": ""
            },
            ServerRules:{   //增加服务校验规则
                id:[
                    { required: true, message: '请输入路由id', trigger: 'blur' }
                ],
                path:[
                    { required: true, message: '请输入匹配路径', trigger: 'blur' }
                ]
            },
           editForm:{                 //编辑服务数据
               "id":"",
                "path":"",
                "url":"",
                "serviceId": "",
                "stripPrefix": true,
                "enabled": true,
                "description": ""
            },
            edit:true,
            userVal:'',
      }
    },
    methods: {
    //    handleSizeChange(val) {
    //     console.log(`每页 ${val} 条`);
    //   },
    //   handleCurrentChange(val) {
    //     console.log(`当前页: ${val}`);
    //   },

      initList(){   //初始化数据
        viewServerData().then(res => {
            console.log(res)
            if(res.code === 1){
                //获取数据成功
                this.serviceList = res.data
            }else{
                this.$message.error(res.msg);
            }
        })
      },
    //   test(data){  //检测按钮 检测配置路径是否可用
    //   console.log('点击了')
    //   console.log('配置路径:'+data.row.matchPath)
    //      this.serviceList[data.$index].checks = true
    //      this.serviceList[data.$index].status = false
    //       if(data.row.forwardPath === 'http://www.jd.com'|| data.row.forwardPath =='http://www.baidu.com'){
    //            setTimeout(()=>{
    //            this.serviceList[data.$index].checks = false
    //            this.serviceList[data.$index].status = true
    //            },600)
    //       }else{
    //           let matchAddressStr = data.row.matchPath.replace('**','health')
    //             testSrc(matchAddressStr)
    //             .then(res => {
    //                 console.log(res)
    //                 console.log('检查结果:'+ res.status)
    //                 if(res.status===200){
    //                     this.serviceList[data.$index].status = true
    //                     this.serviceList[data.$index].checks = false
    //                 }else{
    //                      this.serviceList[data.$index].status = false
    //                      this.serviceList[data.$index].checks = false
    //                 }
    //             })
    //             .catch(err => {
    //                  this.serviceList[data.$index].status = false
    //                 this.serviceList[data.$index].checks = false
    //             })
    //       }        
    //   }, 
      addUserSubmit(dom){  //添加服务提交
        this.$refs[dom].validate((valid) => {
        if(!this.addForm.url && !this.addForm.serviceId){
            this.$message.error('抱歉，转发地址与转发服务名至少填写一项');
            return
        }
        if (valid) {
            addServerData(this.addForm)
            .then(res => {
                console.log(res)
                if(res.code === 1){
                    console.log('提交成功')
                    this.serviceList = res.data //data为此时最新的数据
                    this.addDialogFormVisible = false
                    this.$refs[dom].resetFields();
                    this.$message({
                    showClose: true,
                    message: '添加成功',
                    type: 'success'
                    });
                }else{
                    this.$message.error(res.msg);
                }
            })
        } else {
            console.log('error submit!!');
        }
        });
      },
      deleteRow(id){  //删除服务
          deleteData(id).then(res => {
              console.log(res)
              if(res.code === 1){
                this.serviceList = res.data //data为此时最新的数据
                this.$message({
                message: '删除成功！',
                type: 'success'
                });
              }else{
                  this.$message.error(res.msg);
              }
          })
      },
      editRow(scope){  //编辑当前服务模态框信息初始化
        this.editForm = scope.row
        this.editDialogFormVisible = true
      },
      editUserSubmit(dom){ //编辑服务信息提交
        this.$refs[dom].validate((valid) => {
        if(!this.editForm.url && !this.editForm.serviceId){
        this.$message.error('抱歉，转发地址与转发服务名至少填写一项');
        return
        }
        if (valid) {
            editServerData(this.editForm)
            .then(res => {
                if(res.code === 1){
                    this.serviceList = res.data //data为此时最新的数据
                    this.editDialogFormVisible = false
                    this.$refs[dom].resetFields();
                    this.$message({
                    showClose: true,
                    message: '编辑成功',
                    type: 'success'
                    });
                }else{
                    this.$message.error(res.msg);
                }
            })
        } else {
            console.log('error submit!!');
        }
        });
      },
      userSearch(){   //搜索按钮 
        if(this.userVal){
            var newArr= this.serviceList.filter(item => item.id.indexOf(this.userVal) !== -1)
            this.serviceList = newArr
        }else{
            this.initList()
        }
      }
    },
    created(){
        //服务列表数据
        this.initList ()
    }
  }
</script>

<style lang="scss" scoped>
 .search-input {
    width: 300px;
  }
  .page {
    padding: 5px 0;
    background-color: #D3DCE6;
  }
</style>
