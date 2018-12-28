<template>
    <div class="navTags">
        <div @click.stop="linkTag(index,item.path)" v-for="(item,index) in tags" :key="item.path">
            <span>{{item.name}}</span>
            <i @click.stop="overBtn(index)" class="el-icon-close fr"></i>
        </div>
    </div>
</template>
<script>
export default {
    data() {
      return {
        tags:[]
      };
    },
    methods:{
       linkTag(index,path){ 
           var path = this.tags[index].path;
           console.log('点击元素')
           console.log(path)
           this.$router.push(path);  //跳转到用户选中的菜单项 
       },
       overBtn(index){ //删除选中的菜单项
       console.log('点击删除')
           this.$store.commit('deleteNavItem',index);   //删除用户选中的菜单项
           let recordNavItem = this.$store.state.recordNavItem;
           this.$router.push({path:recordNavItem[recordNavItem.length-1].path}) //跳转到最后一个path
       }
    },
    created(){
        this.tags = this.$store.state.recordNavItem;
        console.log(this.$route.meta.name)
    },
    watch:{
        $route(to,from){
             let curObj = {name:to.meta.name,path:to.path}
             this.$store.commit('setActiveItemIndex',to.path) //设置左侧导航栏的高亮
             this.$store.commit('addNavItem',curObj)  //添加左侧的导航项
        }
    }
  }
</script>
<style lang="scss" scoped>
.navTags{
    padding: 5px 10px;
    background-color: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
    div{
        display: inline-block;
        height: 30px;
        line-height: 30px;
        background-color: #ccc;
        border-radius: 4px;
        text-align: center;
        background-color: #409EFF;
        color: #fff;
        margin-right: 10px;
        padding:0 10px;
        cursor:pointer;
        i{
            margin-top: 7px;
            margin-left: 10px;
            color: #fff;
        }
    }
}
</style>
