<template>
    <div class="serviceDetails">
        <el-card shadow="hover">
        <el-table
            :data="serviceDetailsData"
            :span-method="objectSpanMethod"
            style="width: 100%;font-size:16px">
            <!-- <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="注册中心节点名称:">
                    <span>{{ props.row.nodeName }}</span>
                </el-form-item>
                <el-form-item label="是否注册:">
                    <span v-if="JSON.stringify(props.row) !== '{}'">
                     <i class="el-icon-success" style="font-size:20px;color: #67C23A;" v-if="props.row.registeredStatus === 'passing'"></i>
                     <i class="el-icon-error" style="font-size:20px;color: #F56C6C;" v-else-if="props.row.registeredStatus === 'critical'"></i>
                     <i class="el-icon-warning" style="font-size:20px;color: #E6A23C;" v-else></i>
                    </span>
                </el-form-item>
                <el-form-item label="注册中心地址:">
                    <span>{{ props.row.registeredAddress }}</span>
                </el-form-item>
                <el-form-item label="是否可用:">
                  <span v-if="JSON.stringify(props.row) !== '{}'">
                     <i class="el-icon-success" style="font-size:20px;color: #67C23A;" v-if="props.row.availableStatus === 'passing'"></i>
                     <i class="el-icon-error" style="font-size:20px;color: #F56C6C;" v-else-if="props.row.availableStatus === 'critical'"></i>
                     <i class="el-icon-warning" style="font-size:20px;color: #E6A23C;" v-else></i>
                  </span>
                </el-form-item>
                </el-form>
            </template>
            </el-table-column> -->
            <el-table-column
            label="服务名称"
             align="center"
            prop="app">
            </el-table-column>
            <el-table-column
            label="实例id"
             align="center"
            prop="instanceId">
            </el-table-column>
            <el-table-column
            label="实例地址"
             align="center"
            prop="ipAddr">
            </el-table-column>
            <el-table-column
            label="实例端口"
             align="center"
            prop="port.port">
            </el-table-column>
            <el-table-column
            label="实例状态"
             align="center"
            prop="status">
                <template slot-scope="props">
                    {{props.row.status === 'UP' ? '上线' : '下线'}}
                    <!-- <span v-if="JSON.stringify(props.row) !== '{}'">
                    <span style="font-size:16px" v-if="props.row.registeredStatus === 'passing' && props.row.availableStatus === 'passing'">
                        <i class="el-icon-success" style="font-size:20px;color: #67C23A;"></i> 2
                    </span>
                     <span style="font-size:16px" v-else-if="props.row.registeredStatus === 'passing' || props.row.availableStatus === 'passing'">
                        <i class="el-icon-success" style="font-size:20px;color: #67C23A;"></i> 1
                        <i class="el-icon-error" style="font-size:20px;color: #F56C6C;"></i> 1
                    </span>
                    <span style="font-size:16px" v-else-if="props.row.registeredStatus === 'critical' && props.row.availableStatus === 'critical'">
                        <i class="el-icon-error" style="font-size:20px;color: #F56C6C;"></i> 2
                    </span>
                     <span style="font-size:16px" v-else>
                        <i class="el-icon-warning" style="font-size:20px;color: #E6A23C;"></i>
                    </span>
                    </span> -->
                </template>
            </el-table-column>
            <el-table-column 
            label="操作" 
            align="center" 
            fixed="right"
            width="350">
            <template slot-scope="scope">
                <el-button type="success" @click="detailsInfo(scope.row)">详情</el-button>
            <!-- <el-button type="info" :loading="scope.row.checks" @click="test(scope)">检测</el-button> -->
            <el-button :type="scope.row.status === 'UP'?'info':'primary'" @click="outRow(scope.row)">{{scope.row.status === 'UP' ? '下线' : '上线'}}</el-button>
            <el-button type="danger" @click="deleteRow(scope.row)">删除</el-button>
            <!-- <el-button type="primary">配置</el-button> -->
        </template>
    </el-table-column>
        </el-table>
        </el-card>
        <!-- 详情展示start -->
           <!-- 编辑服务 start -->
       <el-dialog title="实例详情" :visible.sync="editDialogFormVisible" class="details">
           <div>
               <el-card shadow="hover" class="portInfo" >
                   <h3>端口信息:</h3>
                   <div>
                        <ul>
                            <li class="clearfix">
                                <div><span>http端口</span><span> {{prot.port}}</span></div>
                                <div><span>是否启用</span><span>{{prot.enabled?'是':'否'}}</span></div>
                            </li>
                            <li class="clearfix">
                                <div><span>https端口</span><span>{{securePort.port}}</span></div>
                                <div><span>是否启用</span><span>{{securePort.enabled?'是':'否'}}</span></div>
                            </li>
                        </ul>                       
                   </div>
               </el-card>
                <el-card shadow="hover" class="leaseInfo">
                 <h3>租约信息:</h3>
                   <div>
                        <ul>
                            <li class="clearfix">
                                <div><span>心跳间隔（秒）</span><span>{{leaseInfo.renewalIntervalInSecs}}</span></div>
                                <div><span>过期间隔（秒）</span><span>{{leaseInfo.durationInSecs}}</span></div>
                            </li>
                            <li class="clearfix">
                                <div><span>注册时间</span><span>{{leaseInfo.registrationTimestamp}}</span></div>
                                <div><span>最后一次续约时间</span><span>{{leaseInfo.lastRenewalTimestamp}}</span></div>
                            </li>
                            <li class="clearfix">
                                <div><span>最后一次下线时间</span><span>{{leaseInfo.evictionTimestamp}}</span></div>
                                <div><span>启动时间</span><span>{{leaseInfo.serviceUpTimestamp}}</span></div>
                            </li>
                        </ul>                       

                   </div>
               </el-card>
                <el-card shadow="hover" class="operationInfo">
                   <h3>操作信息:</h3>
                   <div>
                        <ul>
                            <li class="clearfix">
                                <div><span>最后更新时间</span><span>{{detailsInfoObj.lastUpdatedTimestamp}}</span></div>
                                <div><span>最后操作的类型</span><span>{{detailsInfoObj.actionType}}</span></div>
                            </li>
                            <li class="clearfix">
                                <div><span>最后操作时间</span><span>{{detailsInfoObj.lastDirtyTimestamp}}</span></div>
                            </li>
                        </ul>                       
                   </div>
               </el-card>
                <el-card shadow="hover" class="basisInfo">
                   <h3>元数据信息:</h3>
                   <div>
                        <ul>
                            <li class="clearfix">
                                <div><span>监控端口</span><span>{{metadata.management_port}}</span></div>
                                <div><span>JMX端口</span><span>{{metadata.jmx_port}}</span></div>
                            </li>
                        </ul>                       
                   </div>
               </el-card>
           </div>
        </el-dialog>
    <!-- 编辑服务 end -->
        <!-- 详情展示end  -->
    </div>
</template>

<script>
import {serviceDetails,serviceIsout,serviceIsUp,serviceIsdelete} from '@/api/index.js'
  export default {
    data() {
      return {
        serviceDetailsData: [],
        spanArr:[],
        position: 0,
        editDialogFormVisible:false,
        detailsInfoObj:{},  //实例详细信息
        prot:{},
        securePort:{},
        leaseInfo:{},
        metadata:{}
      }
    },
    created(){
        this.initList()
    },
    methods:{
        initList(){
            serviceDetails().then(res => {
                console.log(res)
                if(res.code === 1){
                    //数据获取成功
                    let serviceDetailsData = res.data.applications.application  //服务的数量  对应行数
                    let test = []
                    for(let i = 0; i < serviceDetailsData.length; i++){
                  //  console.log(serviceDetailsData[i].instance.length)  3 1 1
                        //获取spanArr
                        if(serviceDetailsData[i].instance.length === 1){
                            this.spanArr.push(1)
                        }else if(serviceDetailsData[i].instance.length > 1){
                            this.spanArr.push(serviceDetailsData[i].instance.length)
                            for(let j = 0; j < serviceDetailsData[i].instance.length-1;j++){
                                this.spanArr.push(0)                                  
                            }
                        }
                         this.serviceDetailsData = this.serviceDetailsData.concat(serviceDetailsData[i].instance)
                    }
                     console.log(this.spanArr)
                }else{
                    this.$message.error(res.msg);
                }
            })
        },
         objectSpanMethod({ row, column, rowIndex, columnIndex }) {  //表格合并行
    	if (columnIndex === 0) {
    		const _row = this.spanArr[rowIndex];
            const _col = _row>0 ? 1 : 0;
    		return {
    			rowspan: _row,
    			colspan: _col
    		}
    	}
    },
    detailsInfo(info){   // 详情按钮点击
        this.detailsInfoObj = info 
        this.editDialogFormVisible = true
        let aa = this.detailsInfoObj.port
        this.prot = info.port
        this.securePort = info.securePort
        this.leaseInfo = info.leaseInfo
        this.metadata = info.metadata
        console.log(this.prot.port)
    },
    outRow(info){
        let instanceInfo = {
            serviceName:info.app,
            id:info.instanceId
        }
        if(info.status === 'UP'){
            serviceIsout(instanceInfo).then(res => {
                if(res.code === 1){
                     this.$message({
                        message: '下线成功',
                        type: 'success'
                    });
                }else{
                    this.$message.error(res.msg);
                }
            })
        }else if(info.status === 'OUT_OF_SERVICE'){
            serviceIsUp(instanceInfo).then(res => {
                if(res.code === 1){
                     this.$message({
                        message: '上线成功',
                        type: 'success'
                    });
                }else{
                    this.$message.error(res.msg);
                }
            })
        }
    },
    deleteRow(info){
        let instanceInfo = {
            serviceName:info.app,
            id:info.instanceId
        }
         this.$confirm('确定要删除此实例吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
        serviceIsdelete(instanceInfo).then(res => {
            if(res.code === 1){
                    this.$message({
                    message: '删除成功',
                    type: 'success'
                });
            }else{
                this.$message.error(res.msg);
            }
        })
        })

    }
    }
  }
</script>
<style lang="scss" scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .details{
      .el-card{
          margin-bottom: 10px;
      }
    //公共样式
      h3{
        font-size: 18px;
        margin-bottom: 20px;
        }
        ul{
            padding-left: 50px;
            li{
                margin-bottom: 10px;
                div{
                    float: left;
                    span{
                        font-size: 16px;
                        display: inline-block;
                    }
                    span:first-of-type{
                        color: #303133;
                    }
                    span:last-of-type{
                        color: #606266;
                    }
                }
            }

        }
    //私有样式
      .portInfo{
        
        ul{
            
            li{
                div{
                     span:first-of-type{
                        margin-right: 30px;
                    }
                }
                div:first-of-type{
                    margin-right: 50px;

                    span:first-of-type{
                        width: 100px;
                        text-align: left;
                        margin-right: 0px;
                    }
                   
                }
            }
        }
      }
      .leaseInfo{
          ul{
              li{
                  div{
                      span:first-of-type{
                          width: 150px;
                      }
                      span:last-of-type{
                          display: inline-block;
                          width: 178px;
                      }
                  }
              }
          }
      }
      .operationInfo{
                div{
                      span:first-of-type{
                          width: 150px;
                      }
                      span:last-of-type{
                          display: inline-block;
                          width: 178px;
                      }
                  }
      }
      .basisInfo{
            div{
                    span:first-of-type{
                        width: 100px;
                    }
                    span:last-of-type{
                        width: 100px;
                    }
                }
      }
  }
</style>