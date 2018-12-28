<template>
    <div :id="eleId"></div>
</template>
<script>
import CountUp from 'countup'
export default{
    name:'CountTo',
    data(){
        return {
            conuter: {}
        }
    },
    computed:{
        eleId () {
            //this._uid可以得到每个组件中的唯一id  当前组件唯一的标识
            return `count_up_${this._uid}`
        }
    },
    props: {  //定义父组件传值到子组件  子组件接收
        /** 
        * @description 起始值
        */
        startVal: {
            type:Number,
            default:0      //默认值 父组件可不传值
        },
        /** 
        * @description 动画延迟时间 （单位ms）
        */
        delay: {
            type:Number,
            default:100
        },
        /** 
        * @description 数字动画执行完毕的终止值
        */
        endVal:{
            type:Number,
            required:true  //设置是否必须传值进来
        },
        /** 
        * @description 小数点后面保留几位小数
        */
        decimals:{
            type:Number,
            default:0
        },
        /**  
        * @description 渐变时长 (单位s)
        */
        duration:{
            type:Number,
            default: 1
        },
        /**  
        * @description 是否使用变速效果
        */
        useEasing:{
            type:Boolean,
            default: false
        },
        /**  
        * @description 是否使用分组（三位一组）
        */
          useGrouping:{
            type:Boolean,
            default: true
        },
        /**  
        * @description 分组用的间隔字符
        */
        separator:{
            type:String,
            default: ','
        },
        /**  
        * @description 整数和小数分隔的字符
        */
          decimal:{
            type:String,
            default: '.'
        }
    },
    mounted(){
        //dom都挂载完毕，但是不确定是否都渲染完成
        this.$nextTick(() => {  //渲染完毕后  创建一个countUp对象
        console.log(this.delay)
            this.conuter = new CountUp(this.eleId,this.startVal,this.endVal,this.decimals,this.duration,{
              useEasing: this.useEasing, 
              useGrouping: this.useGrouping, 
              separator: this.separator, 
              decimal: this.decimal, 
           })
           setTimeout(() => {
               this.conuter.start()
           }, this.delay)
        })
    }

}
</script>

