<template>

  <div class="row" style="margin-top:25px">
    <div class="container ">
        <div class="ex col left-align" >
           <span v-for="song in songindex" :key="song" @click="getv(song.Song_Number)" > 
               {{song.Song_Number}}. {{song.Song_Title}}<br>
           </span>
        </div>
         <div class="col s12 m6 l6  ">
             <span >
                
                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ducimus maxime magnam ipsam tempora, sequi consequuntur veritatis explicabo consectetur dignissimos facilis ad consequatur, quaerat nemo, assumenda laudantium excepturi perspiciatis pariatur laborum!</span>
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
      title:null, author:null, number :null,lyrics:null, first_line:null, loading: true, selectedsongnumber:1, songindex:[], keyword:''
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
    get_index(songnumber){         
        
       
      axios.get("./trinityhymnindex.json" ).then(response => {
          this.songindex=response.data.Index
         //  console.log(  response.data.Index)
        
      });
    },
    getv(songnumber) {
      this.getloader();
        console.log(songnumber)
      //SongId:null, thalam:null, Author:null, title:null, Verses:null,
      axios.get("./trinityHymnal.json" ).then(response => {
        //   this.songdenumbertails=response.data
        //   this.SongId=response.data.SongId
        //   this.ragam=response.data.ragam
        //   this.thalam=response.data.thalam
        //   this.Author=response.data.author
        //   this.songtitle=response.data.title
        //   this.Verses=response.data.Verses
          console.log(  response.data[songnumber])
        this.getunloader();
      });
    },
     
    
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
 
  width: 50%;
  height: 500px;
  overflow: scroll;
}

</style>
