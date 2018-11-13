<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  // created() {
  //     try {
  //       document.body.removeChild(document.getElementById('appLoading'))
  //       setTimeout(function() {
  //         document.getElementById('app').style.display = 'block';
  //       }, 500)
  //     } catch (e) {
  //     }
  //   }
}
</script>

<style>
#app {
  /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
}
</style>
