<template>
    <div class="registered">
         <el-card shadow="always">
         <el-table
            :data="tableData"
            style="width: 100%;font-size:16px;">
            <el-table-column
            type="index"
            label="序号"
            align="center"
            width="80">
            </el-table-column>
            <el-table-column
            prop="serviceName"
            label="节点名称"
            align="center"
            width="300">
            </el-table-column>
            <el-table-column
            prop="serviceNum"
            label="服务数量"
            align="center"
            width="150">
            </el-table-column>
            <el-table-column
            prop="serviceAddress"
            align="center"
            label="地址"
            width="300">
            </el-table-column>
            <el-table-column
            prop=""
            label="其他">

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
        tableData: [],
      }
    },
    methods: {
      initList (){
        serviceDetails().then(res => {
            console.log(res)
            var thanArr = [];
            for(let i = 0; i < res.length; i++){
                 let obj={};
                 obj.serviceName = res[i].Node
                 obj.serviceNum = res[i].Services.length-1
                 obj.serviceAddress = res[i].Address+':8500'
                 thanArr.push(obj)
            }
            this.tableData = thanArr
        })
      }
    },
    created(){
         this.initList ()
    }
  };   
</script>