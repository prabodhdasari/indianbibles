<template>

  <div class="row" style="margin-top:25px">
    <div class="container ">
        <div class="ex  col s12 l4 m4 left-align" id='songlist'>
            <hr>
            Select Song
            <hr>
           <span v-for="song in songindex" :key="song" @click="getv(song.Song_Number, song.Song_Title)" style="cursor:default"> 
               {{song.Song_Title}}<br>
           </span>
        </div>
         <div class="col s12 m6 l6 left-align" style="padding-left:50px;"   id="songcontainer" v-if="fullsong"> 
             <hr>
         
             <strong>Song Number :  {{fullsong.number}} ,  Song Title : {{fullsong.title}}  ,  Tune : {{fullsong.tune}} </strong> 
             <hr> 
              <div  class="right" v-show="mob">       <button @click="back"  > Back to Song list
</button></div>
       <br>
            <h6  class="black-text text-darken-2 pre-formatted" style="padding-bottom:20px"> {{fullsong.lyrics}}</h6>  
                   </div>                                                                         
                </div>
  <!-- <div class="div" v-for="song in songdetails" :key="song">
    {{song.number}} $$ {{song.title}}
  </div> -->
          
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
    mob:false, fullsong:'',
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
        
       //trinityhymnsindexalpha   trinityhymnindex
     axios.get("./trinityhymnsindexalpha.json" ).then(response => {
          this.songindex=response.data.Index
      //   console.log(  response.data.Index)
        
      });
    },
    getv(songnumber, songname) {
      console.log(songnumber)
      this.mob=false
      if(isMobile){this.mob=true}
      this.getloader();
    if(!songnumber){songnumber=1}
    // console.log(songnumber)

      //SongId:null, thalam:null, Author:null, title:null, Verses:null,
      axios.get("./trinityHymnal.json" ).then(response => {
         this.songdetails=response.data
        //  for (i = 0; i < this.test_array.length; i++) {
        //         formatted[i] = { id: i, name: i};
        //     }
        var i=0
         for (i = 0; i < 853; i++){
          if( response.data[i].number==songnumber){
           //
           console.log( response.data[i] , songnumber)
           this.fullsong=response.data[i]
            break
          }
         }
      //console.log( this.fullsong )
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
.pre-formatted {
  white-space: pre;
}

</style>
