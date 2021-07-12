<template>
    <h1>Home</h1>

    
          <div class="input-field col s12"  style="margin:0;padding:0">
              <select  class="custom-select" 
           v-model="selectedlanguage"  >
              <option v-for="(language) in  (langs)" :key="language" >
              <span>  {{language}} </span> </option>
              </select>
             <label>Select language</label>
            </div>
</template>
<script>
import axios from "axios"
import M from 'materialize-css'
export default {
   mounted(){
       M.AutoInit()
   },
    data(){
    return{
             langs:['English','తెలుగు','தமிழ்','हिंदी','ಕನ್ನಡ','മലയാളം','ગુજરાતી','বাংলা','ଓଡିଆ','ਪੰਜਾਬੀ'],
             selectedlanguage:'English',
          
        }
    },
}

</script>