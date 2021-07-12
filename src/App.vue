<template>
  <div class="teal" style="margin-top:0px; height:50px">
    <div class="white-text center-text">
      <h5 class="topbar  m0">The Holy Bible</h5>  
    </div>
  </div> 
  <div class="container">
           
    <dv class="col  s12"> <router-link to="/">Protestant Bibles</router-link> | 
    <router-link to="/catholic">Catholic Bible</router-link> | 
    <router-link to="/parallel">Parallel Bible</router-link> |
     <router-link to="/teluguhymns">Telugu Hymns</router-link> |
    <router-link to="/trinityhymns">Trinity Hymns</router-link>  
      
     </dv>
  
   
  </div>
  
 
  <router-view />
</template>

<script>
import bible2 from "./components/bible2.vue";

import M from "materialize-css";
export default {
  name: "App",
  mounted() {
    M.AutoInit();
  },
  components: {
    bible2
  }
};
// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed');
html, body {
  font-family: 'Roboto', sans-serif;
}
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.topbar{
  margin-top:0px;
  text-align: center;
}
</style>
