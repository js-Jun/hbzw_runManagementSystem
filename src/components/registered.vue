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
            prop="nodeName"
            label="节点名称"
            align="center"
            width="300">
            </el-table-column>
            <el-table-column
            prop="instanceNum"
            label="实例数量"
            align="center"
            width="150">
            </el-table-column>
            <el-table-column
            prop="onlineNum"
            align="center"
            label="已上线数量"
            width="300">
            </el-table-column>
            <el-table-column
            prop="outLineNum"
            align="center"
            label="已下线数量"
            width="300">
            </el-table-column>
            <el-table-column
            prop="desc"
            label="描述">
            <template slot-scope="scope">
              {{scope.row.desc ? scope.row.desc:'无'}}
            </template>
            </el-table-column>
        </el-table>
        </el-card>
    </div>
</template>
<script>
import {registeredCenter} from '@/api/index.js'
 export default {
    data() {
      return {
        tableData: [],
      }
    },
    methods: {
      initList (){
        registeredCenter().then(res => {
          if(res.code === 1){
            this.tableData = res.data
          }
        })
      }
    },
    created(){
         this.initList ()
    }
  };   
</script>