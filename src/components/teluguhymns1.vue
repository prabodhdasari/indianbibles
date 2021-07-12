<template>

  <div class="row" style="margin-top:25px">
    <div class="container ">
        <div class="ex  col s12 l4 m4 left-align" id='songlist'>
            <hr>
            Select Song
            <hr>
           <span v-for="song in songindex" :key="song" @click="getv(song.key, song.name)" style="cursor:default"> 
               {{song.name}}<br>
           </span>
        </div>
         <div class="col s12 m6 l6 left-align" style="padding-left:50px;"   id="songcontainer"> 
             <hr>
          
             <strong>Song Number :  {{SongId}}   Song Title : {{songtitle}}   Raagam : {{ragam}} Thalam : {{thalam}} Author :{{Author}} </strong> 
             <hr> 
              <div  class="right" v-show="mob">       <button @click="back"  > Back to Song list
</button></div>
       <br>
            <h6 v-for="verse in Verses" :key="verse" class="black-text text-darken-2" style="padding-bottom:20px"> {{verse}}</h6>  
                   </div>                                                                         
                </div>
  
          
  </div>
</template>

<script>

import { isMobile } from 'mobile-device-detect';
import { scrollTo } from 'vue-scrollto'
import axios from "axios";
import M from "materialize-css";
export default {
  data() {
    return {
      title:null, author:null, number :null,lyrics:null, first_line:null, loading: true, selectedsongnumber:1, songindex:[], keyword:'',
         songnumber:1, songname:null, songdetails:null, ragam:null, SongId:null, thalam:null, Author:null, songtitle:null, Verses:null,loading: true,
    mob:false,
    };
  },
  mounted() {
    M.AutoInit();
    // this.getlanguages()
    // this.getloader()
    this.get_index(1)
    this.getv( 1)
  },
  
  methods: {
    getloader() {
      this.loading = true;
    },
    getunloader() {
      this.loading = false;
    },
    get_index(){         
        
       
      axios.get("./teluguhymnsjson/telugusongsindex.json" ).then(response => {
          this.songindex=response.data.Songs
        //  console.log(  response.data)
        
      });
    },
    getv(songnumber, songname) {
      this.mob=false
      if(isMobile){this.mob=true}
      this.getloader();
      if(!songname){songname='1 dd'}
      songname=songname.split(' ')
    //  console.log(songname)

        if(!songnumber){songnumber=1}
      this.songnumber = songnumber;
      //SongId:null, thalam:null, Author:null, title:null, Verses:null,
      axios.get("./teluguhymnsjson/" + this.songnumber + ".json").then(response => {
        //   this.songdetails=response.data
          this.SongId=songname[0]
          this.ragam=response.data.ragam
           this.thalam=response.data.thalam
           this.Author=response.data.author
           this.songtitle=response.data.title
          this.Verses=response.data.Verses
     // console.log(  response.data)
     scrollTo('#songcontainer', 500, { easing: 'ease-in-out' })
        this.getunloader();
      });
    },
     back(){
        scrollTo('#songlist', 500, { easing: 'ease-in-out' })
     }
    
  }
};
</script>

<style scoped>
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
  .ex {
 
  width: 20%;
  height: 800px;
  overflow: scroll;
}


</style>
