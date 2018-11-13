<template>
  <div class="iframe">
    <iframe src="http://192.168.1.106:8070/signin" id="mobsf" scrolling="auto" frameborder="0" style="position:absolute;left:200px;top:120px"></iframe>
  </div>
</template>
 
 
<script>
  export default {

    data () {
      return {
      }
    },
    mounted(){
      /**
      * iframe-宽高自适应显示   
      */
      function changeMobsfIframe(){
        const mobsf = document.getElementById('mobsf');
        const deviceWidth = document.body.clientWidth;
        const deviceHeight = document.body.clientHeight;
        mobsf.style.width = (Number(deviceWidth)-200) + 'px'; //数字是页面布局宽度差值
        mobsf.style.height = (Number(deviceHeight)-120) + 'px'; //数字是页面布局高度差
      }
 
      changeMobsfIframe()
 
      window.onresize = function(){
        changeMobsfIframe()
      }
    },     
  }
</script>


