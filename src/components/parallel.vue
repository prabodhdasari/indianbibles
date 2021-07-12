<template>
  <div class="row" style="margin-top:25px">
    <div class="container center-block">
      <div class="row" style="margin:0;padding:0">
        <div class="col m4 center "></div>
        <div class="col m4 center " style="margin:0;padding:0">
          <div class="input-field col s5" style="margin:0;padding:4">
            <select id="firstlang" name="firstlang"
              class="custom-select"
              v-model="selectedlanguage1"
              @change="getbooknames(), getv(0, 1), getallbooks()">
              <option v-for="language in langs" :key="language">
                <span> {{ language }} </span>
              </option>
            </select>
            <label>Language 1</label>
          </div>

             <div class="input-field col s5" style="margin:0;padding:0">
            <select id="secondlang" name="secondlang"
              class="custom-select"
              v-model="selectedlanguage2"
              @change="getbooknames(), getv(0, 1), getallbooks()" >
              <option v-for="language in langs1" :key="language">
                <span> {{ language }} </span>
              </option>
            </select>
            <label>Language 2</label>
          </div>

        </div>
      </div>
      <div>
        <h6 class="col left darken-3 teal-text">Old Testament</h6>
        <div class="col left" v-if="OT">
          <ul>
            <li
              v-for="(book, index) in OT"
              :key="book"
              @click="getchapternumbers(book, index), getv(booknumber, 1)"
            >
              <span>{{ book }} </span>
            </li>
          </ul>
        </div>
        <h6 class="col left darken-3 teal-text">New Testament</h6>
        <div class="col left" v-if="NT">
          <ul>
            <li
              v-for="(book, index) in NT"
              :key="book"
              @click="getchapternumbers(book, index + 39), getv(booknumber, 1)"
            >
              <span>{{ book }} </span>
            </li>
          </ul>
          <hr />
        </div>
      </div>

      <div class="col s12 m12 l12">
        <ul>
          <li
            v-for="chapterno in parseInt(chaptercount)"
            :key="chapterno"
            @click="getv(booknumber, chapterno)"
          >
            <span class="primary "> {{ chapterno }} </span>
          </li>
        </ul>
        <hr />
      </div>
      <div class="">
        <div class="left col col left darken-3 teal-text">
          <h5>
            <strong>{{ bookname }}</strong> {{ chapternumber }}
          </h5>
          <!-- booknumber{{booknumber}} -->
        </div>

        <div class="col s12 m12 l12 left-align" v-if="verses">
          <div class="progress" v-if="loading">
            <div class="indeterminate"></div>
          </div>

            <ul> 
                <li v-for="(verse, ) in allverses" :key="verse" > 
                  
              <span> {{parseInt(verse.Verseid.substr(5,3))+1}}) {{verse.Verse}} </span> 
               
                </li> 
                </ul> 
        </div>
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
      info: "",
      headers: [],
      booknames: "",
      selectedlanguage1: "English",
       selectedlanguage2: "తెలుగు",
      chaptercount: 50,
      booknumber: 0,
      bookname: "",
      chapternumber: 1,
      verses: [], allverses:[], verses2:[],
      nv1:[],nv2:[],nv3:[],
      loading: true,
      langs: [
        "English",
        "తెలుగు",
        "தமிழ்",
        "हिंदी",
        "ಕನ್ನಡ",
        "മലയാളം",
        "ગુજરાતી",
        "বাংলা",
        "ଓଡିଆ",
        "ਪੰਜਾਬੀ"
      ],
       langs1: [
        "English",
        "తెలుగు",
        "தமிழ்",
        "हिंदी",
        "ಕನ್ನಡ",
        "മലയാളം",
        "ગુજરાતી",
        "বাংলা",
        "ଓଡିଆ",
        "ਪੰਜਾਬੀ"
      ],
      OT: [],
      NT: []
    };
  },
  mounted() {
    M.AutoInit();
    // this.getlanguages()
    // this.getloader()
    this.getallbooks();
    this.getbooknames();
    this.getv(0, 1);
  },
  methods: {
    getloader() {
      this.loading = true;
    },
    getunloader() {
      this.loading = false;
    },
    getchapternumbers(book, index) {
      var chapternumber = index;
      // this.chapternumber=index

      this.bookname = book;
      this.booknumber = index;
      this.chapternumber = 1;

      //this.chaptercount=0
      axios
        .get("/allbooks.json")
        // .then(response=>this.chaptercount=response.data)
        .then(response => {
          this.chaptercount = response.data.books[chapternumber].Chapters;
          // console.log(response.data.books[chapternumber])
        });
    },
    getv(booknumber, selectedchapterno) {
        var v1,v2
      this.getloader();
      console.log(this.selectedlanguage1)
      this.chapternumber = selectedchapterno;
      this.booknumber = booknumber;
      ///get first selected language data
        const requestOne = axios.get("./" + this.selectedlanguage1 + ".json");
          const requestTwo = axios.get("./" + this.selectedlanguage2 + ".json");
          axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
          const responseOne = responses[0].data.Book[booknumber].Chapter[this.chapternumber - 1].Verse
           const responseTwo = responses[1].data.Book[booknumber].Chapter[this.chapternumber - 1].Verse
         
          const mergeddata=responseOne.concat(responseTwo)
        //  console.log(mergeddata.sort(xyz))
          this.allverses=mergeddata.sort(xyz)
           this.getunloader()
        //  console.log(mergeddata)
  // use/access the results 
          })).catch(errors => {
  // react on errors.
  
          })
         
      

    },
    getallbooks() {
      var lang = this.selectedlanguage1;
      this.allbooknames = "";
      if (!lang) {
        lang = "English";
      }
      axios
        .get("/headers1.json")
        //console.log(response.data.headers[0][lang][0]
        .then(response => {
          this.OT = response.data.headers[0][lang][0].OT;
          this.NT = response.data.headers[0][lang][1].NT;
        });
    },
    getbooknames() {
      var lang = this.selectedlanguage1;
      this.booknames = "";

      if (!lang) {
        lang = "English";
      }
      axios.get("/headers.json").then(response => {
        this.booknames = response.data.headers[0][lang];
        this.bookname = this.booknames[0];
        // console.log(this.booknames[0])
        // this.booknames=books
      });
      this.chaptercount = 50;
    },
    getbooknumbers(book, booknumber) {
      var booknumber = booknumber;
      this.bookname = book;

      axios
        .get("/allbooks.json")
        // .then(response=>this.chaptercount=response.data)
        .then(response => {
          this.chaptercount = response.data.books[booknumber].Chapters;
        });
    },
  }
};

function xyz(a, b) {

    return a.Verseid - b.Verseid;
}

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
