<template>
    <div>
    <el-row>
        <el-col :span="24">
            <!-- 给组件绑定原生事件的话，需要一个.native的修饰符 -->
            <el-input placeholder="请输入服务名称" class="search-input" v-model="userVal">
            <el-button slot="append" icon="el-icon-search" @click="userSearch"></el-button>
            </el-input>
            <el-button type="success" plain @click="addDialogFormVisible=true">添加服务</el-button>
        </el-col>
    </el-row>
    <!-- 添加服务 start -->
    <el-dialog title="添加服务" :visible.sync="addDialogFormVisible">
    <el-form :model="addForm" label-width="80px" ref="addUserForm">
        <el-form-item label="服务名" prop="username">
        <el-input v-model="addForm.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="配置路径" prop="password">
        <el-input v-model="addForm.predicates[0].args.pattern" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="转发地址" prop="email">
        <el-input v-model="addForm.uri" auto-complete="off"></el-input>
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUserSubmit('addUserForm')">确 定</el-button>
    </div>
</el-dialog>
    <!-- 添加服务 end -->

    <!-- 编辑服务 start -->
        <el-dialog title="编辑服务" :visible.sync="editDialogFormVisible">
    <el-form :model="editForm" label-width="80px" ref="editUserForm">
        <el-form-item label="服务名" prop="username">
        <el-input v-model="editForm.id" auto-complete="off" :disabled="edit"></el-input>
        </el-form-item>
        <el-form-item label="配置路径" prop="password">
        <el-input v-model="editForm.predicates[0].args.pattern" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="转发地址" prop="email">
        <el-input v-model="editForm.uri" auto-complete="off"></el-input>
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
    style="width: 100%;font-size:16px;margin-top:10px;">
    <el-table-column
        type="index"
        label="序号"
        align="center"
        width="80">
    </el-table-column>
    <el-table-column
        prop="serviceName"
        label="服务名称"
        align="center"
        width="180">
    </el-table-column>
    <el-table-column
        prop="matchPath"
        label="匹配路径"
        align="center"
        width="180">
    </el-table-column>
    <el-table-column
        prop="forwardPath"
        align="center"
        label="转发地址">
    </el-table-column>
    <el-table-column 
        label="是否可用" 
        align="center" 
        width="180">
        <template slot-scope="scope">
            <!-- <el-switch v-model="value"></el-switch> -->
             <el-button type="success" icon="el-icon-check" circle v-if="serviceList[scope.$index].status"></el-button>
             <el-button type="danger" icon="el-icon-close" circle v-else></el-button>
        </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
        <template slot-scope="scope">
  <el-button type="success" @click="editRow(scope)">编辑</el-button>
  <el-button type="info" :loading="scope.row.checks" @click="test(scope)">检测</el-button>
  <el-button type="danger" @click="deleteRow(scope)">删除</el-button>
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
          addForm: {                 //添加服务数据储存
                    "filters":[],
                    "id":"",
                    "order":0,
                    "predicates":[{
                        "args":{
                            "pattern":""
                        },
                        "name":"Path"
                    }
                        ],
                    "uri":""    
                },
           editForm:{
                "filters":[],
                "id":"",
                "order":0,
                "predicates":[{
                    "args":{
                        "pattern":""
                    },
                    "name":"Path"
                }
                    ],
                "uri":""    
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

      initList (){   //初始化数据
        viewServerData().then(res => {
            console.log(res)
            console.log(this.serviceList)
            var thanArr = [];
            for(let i = 0; i < res.length; i++){
            let obj={};
            obj.serviceName = res[i].route_id
            obj.matchPath = res[i].route_definition.predicates[0].args.pattern
            obj.forwardPath = res[i].route_definition.uri
            obj.checks = false
            //检查配置路径是否可用
            console.log(obj.matchPath)
            if(obj.matchPath=='/baidu'){
                obj.status = true
                thanArr.push(obj)
            }else{
                testSrc(obj.matchPath)
                .then(res => {
                    if(res.status===200){
                        obj.status = true
                    }else{
                        obj.status = false
                    }
                })
                .then(res => {
                    thanArr.push(obj)
                })
                .catch(err => {
                    console.log(err)
                    obj.status = false
                    thanArr.push(obj)
                })
            }
            // testSrc(obj.matchPath).then(res => {
            //     if(res.status===200){
            //         obj.status = true
            //     }
            // }).then(res => {
            //     thanArr.push(obj)
            // })
            //  thanArr.push(obj)
            }
            this.serviceList = thanArr    //将拼好的数据数组赋值给vue实例定义的数组
        })
      },
      test(data){  //检测按钮 检测配置路径是否可用
      console.log('配置路径:'+data.row.matchPath)
         this.serviceList[data.$index].checks = true
         this.serviceList[data.$index].status = false
          if(data.row.matchPath === '/baidu'){
               setTimeout(()=>{
               this.serviceList[data.$index].checks = false
               this.serviceList[data.$index].status = true
               },600)
          }else{
                testSrc(data.row.matchPath)
                .then(res => {
                    console.log(res)
                    console.log('检查结果:'+ res.status)
                    if(res.status===200){
                        this.serviceList[data.$index].status = true
                        this.serviceList[data.$index].checks = false
                    }else{
                         this.serviceList[data.$index].status = false
                         this.serviceList[data.$index].checks = false
                    }
                })
                .catch(err => {
                     this.serviceList[data.$index].status = false
                    this.serviceList[data.$index].checks = false
                })
          }
            
      },
      addUserSubmit(dom){  //添加服务提交
          addServerData(this.addForm).then(res => {
              this.initList()                   //初始化列表数据
              this.addDialogFormVisible = false //关闭添加模态框
          })
      },
      deleteRow(scope){    //删除服务
          deleteData(scope.row.serviceName).then(res => {
              console.log(res)
              if(res.res1.status===200 && res.res2.status===200){
                  this.$message({
                message: '删除成功！',
                type: 'success'
                });
                    this.initList() //初始化列表数据
              }
          })
      },
      editRow(scope){  //编辑当前服务模态框信息初始化
          this.editDialogFormVisible=true
          console.log(scope)
        this.editForm.id = scope.row.serviceName //服务名
        this.editForm.predicates[0].args.pattern = scope.row.matchPath  //配置路径
        this.editForm.uri = scope.row.forwardPath   //转发地址
      },
      editUserSubmit(dom){ //编辑服务信息提交
        editServerData(this.editForm).then(res => {
            console.log(res)
            if(res.status === 200){
                this.$message({
                    message: '编辑成功！',
                    type: 'success'
                });
            }
            this.initList()                   //初始化列表数据
            this.editDialogFormVisible = false //关闭添加模态框
        })
      },
      userSearch(){   //搜索按钮 
        if(this.userVal){
            var newArr= this.serviceList.filter(item => item.serviceName.indexOf(this.userVal) !== -1)
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
