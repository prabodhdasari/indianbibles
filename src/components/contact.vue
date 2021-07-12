<template>
    <h1>Contact</h1>

 <div class="input-field col s12"  style="margin:0;padding:0">
              <select  class="custom-select" 
           v-model="selectedlanguage"   @change="getbooknames(),getv(0,1),getallbooks()">
              <option v-for="(language) in  (langs)" :key="language" >
              <span>  {{language}} </span> </option>
              </select>
             <label>Select language</label>
            </div>

</template>