<template>
  <div class="row" style="margin-top:25px">
     <div class="container center-block">
           <div class="input-field col s12" style="margin:0;padding:0">
               <div class="col m6 s6 l6 right-align " style="padding-top:20px">  Song Number</div>
               <div class="col m2 l2 s3"> <select
              class="custom-select"  v-model="songnumber"
              @change="getv(songnumber)">
              <option v-for="songnumber in 686" :key="songnumber">
                <span> {{songnumber}} </span>
              </option>
            </select></div>
           
          
          </div> 
          <div>
         <strong>Song Number :  {{this.SongId}}</strong>    Song Title : {{this.songtitle}}   Raagam : {{this.ragam}} Thalam : {{this.thalam}} Author :{{this.Author}}
             
          </div><hr>
            <div class="progress" v-if="loading">
             <div class="indeterminate"></div>
             </div>
          <div v-for="(verse, index) in Verses" :key="verse" class="left-align">
         <p>{{index+1}})  {{verse}}</p>   
          </div>
         
     </div>
        
  </div>
</template>

<script>
import axios from "axios";
import M from "materialize-css";
export default {
  data() {
    return {
       songnumber:1, songname:null, songdetails:null, ragam:null, SongId:null, thalam:null, Author:null, songtitle:null, Verses:null,loading: true,
    };
  },
  mounted() {
    M.AutoInit();
    // this.getlanguages()
    // this.getloader()
    
    this.getv( 1);
  },
  methods: {
    getloader() {
      this.loading = true;
    },
    getunloader() {
      this.loading = false;
    },
    
    getv(songnumber) {
      this.getloader();

      this.songnumber = songnumber;
      //SongId:null, thalam:null, Author:null, title:null, Verses:null,
      axios.get("./teluguhymnsjson/" + this.songnumber + ".json").then(response => {
          this.songdetails=response.data
          this.SongId=response.data.SongId
          this.ragam=response.data.ragam
          this.thalam=response.data.thalam
          this.Author=response.data.author
          this.songtitle=response.data.title
          this.Verses=response.data.Verses
           console.log(  response.data)
        this.getunloader();
      });
    },
     
    
  }
};
</script>

<style>
ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: white;
}

li {
  float: left;
  padding-right: 20px;
  cursor: pointer;
}

li a {
  display: block;
  color: black;
  text-align: center;
  padding: 50px;
  text-decoration: none;
}

li a:hover {
  background-color: #111111;
}
.container1 {
  margin-top: 80px;
  align-content: center;
  align-self: center;
  align-items: center;
}

.h4 {
  margin: 0px;
}
</style>
