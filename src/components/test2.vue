<template>
    <div>
      <iframe src="http://zwfw.hubei.gov.cn/" id="mobsf" scrolling="auto" frameborder="0" style="position:absolute;top:115px;left: 220px;"></iframe>
        <!-- <iframe id="show-iframe" frameborder=0 name="showHere" scrolling=auto src="http://192.168.1.114:8070/index.html"></iframe> -->
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
        mobsf.style.width = (Number(deviceWidth)-220) + 'px'; //数字是页面布局宽度差值
        mobsf.style.height = (Number(deviceHeight)-115) + 'px'; //数字是页面布局高度差
      }
 
      changeMobsfIframe()
 
      window.onresize = function(){
        changeMobsfIframe()
      }
    },     
  }
</script>

