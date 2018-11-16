<template>
    <div class="serviceDetails">
        <el-card shadow="hover">
        <el-table
            :data="serviceDetailsData"
            style="width: 100%;font-size:16px">
            <el-table-column type="expand">
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
            </el-table-column>
            <el-table-column
            label="名称"
             align="center"
            prop="serviceName">
            </el-table-column>
            <el-table-column
            label="地址"
             align="center"
            prop="serviceAddress">
            </el-table-column>
            <el-table-column
            label="端口"
             align="center"
            prop="servicePort">
            </el-table-column>
            <el-table-column
            label="检查"
             align="center"
            prop="check">
                <template slot-scope="props">
                    <span v-if="JSON.stringify(props.row) !== '{}'">
                    <!-- {{props.row}} -->
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
                    </span>
                </template>
            </el-table-column>
        </el-table>
        </el-card>
    </div>
</template>

<script>
import {serviceDetails} from '@/api/index.js'
  export default {
    data() {
      return {
        serviceDetailsData: [
                {
                // serviceName:'cty-gateway',
                // serviceAddress:'192.168.1.74',
                // servicePort:'8000',
                // check:'',
                // nodeName:'centos7.5-192.168.129.128',
                // registeredStatus:'passing',  //服务是否注册 passing为true
                // availableStatus:'critical',  //服务是否可用 passing为true
                // registeredAddress:'192.168.129.136' //注册中心地址
            }
        ]
      }
    },
    created(){
        this.initList()
    },
    methods:{
        initList(){
            serviceDetails().then(res => {
                // console.log(res)
                var thanArr = [];
                for(let i = 0; i < res.length; i++){
                    var serviceArr =  res[i].Services;
                    var checksArr = res[i].Checks;
                    for(let j = 1; j < serviceArr.length; j++){
                        let obj = {};
                        obj.serviceName = serviceArr[j].Service
                        obj.serviceAddress = serviceArr[j].Address
                        obj.servicePort = serviceArr[j].Port
                        obj.availableStatus = checksArr[j].Status
                        obj.registeredStatus = checksArr[0].Status
                        obj.nodeName = checksArr[0].Node
                        obj.registeredAddress = res[i].Address+':8500'
                        thanArr.push(obj)
                        console.log(thanArr)
                    }
                }
                this.serviceDetailsData = thanArr
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
</style>