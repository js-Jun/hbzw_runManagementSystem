<template>
    <div class="home">
      <div class="dataShow1">
            <h3>数据展示</h3>
            <el-row>
            <el-col :span="8"><div class="grid-content">
                <div class="test1">
                    <div class="test1box">
                        <h5>
                            <count-to :end-val="endVal"></count-to>
                        </h5>
                        <span></span>
                        <p>日活跃数</p>
                    </div>
                </div>
            </div></el-col>
            <el-col :span="8">
                <div class="grid-content">
                      <div class="test1">
                    <div class="test1box">
                        <h5>{{num}}</h5>
                        <span></span>
                        <p>日活跃数</p>
                    </div>
                </div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content">
                      <div class="test1">
                    <div class="test1box">
                        <h5>{{num}}</h5>
                        <span></span>
                        <p>日活跃数</p>
                    </div>
                </div>
                </div>
            </el-col>
        </el-row>
      </div>
     <div class="dataShow3">
        <h3>图表展示</h3>
        <el-row :gutter="20">
         <el-col :span="12">
            <div class="grid-content bg-purple">
                <ve-line :data="chartData"></ve-line>
            </div>
        </el-col>
        <el-col :span="12">
            <div class="grid-content bg-purple">
                <ve-line :data="chartData"></ve-line>        
            </div>
        </el-col>
</el-row>
    </div>
     <div class="dataShow2">
            <h3>选项卡展示</h3>
            <el-row :gutter="30">
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import CountTo from './count-to'
 export default {
  name:'count_to',
  components:{CountTo},
  data: function () {
    return {
      endVal:1000.45,
      chartData: {
        columns: ['日期', '访问用户', '下单用户', '下单率'],
        rows: [
          { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
          { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
          { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
          { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
          { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
          { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
        ]
      },
      num:0
    }
  },
  created(){
      var Time = setInterval(()=>{
          if(this.num <= 999){
          this.num = this.num+2
          }else{
              this.num = '1,000'
            clearInterval(Time)
          }
      },0.00001)
  },
}   
</script>

<style lang="scss" scoped>
.home{
    // background-color: #C0C4CC;
     h3{
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 20px
        }
.dataShow1{
     margin-top:20px;
     margin-bottom:50px;
      .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    .test1{
        .test1box{
            text-align: center;
            h5{
                font-size: 40px;
                font-weight: 700;
                color: #409EFF;
            }
            span{
                display: inline-block;
                width:28px;
                height: 1px;
                background-color: #606266 
            }
            p{
                font-size: 20px;
                margin-top: 10px;
                color: #909399;
            }
        }
    }
  }
 }
 .dataShow2{
     margin-top: 70px;
     margin-bottom: 50px;
     .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    height: 180px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
 }
}
 

</style>
