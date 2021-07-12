<template>
    <h1>About</h1>
  
    <div class="row" style="margin:0;padding:0">
        <div class="col m4 center "></div>
        <div class="col m4 center " style="margin:0;padding:0">
          <div class="input-field col s5" style="margin:0;padding:4">
            <select id="firstlang" name="firstlang"
              class="custom-select"
              v-model="selectedlanguage1"
              @change=" sort()">
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
              @change="sort()" >
              <option v-for="language in langs1" :key="language">
                <span> {{ language }} </span>
              </option>
            </select>
            <label>Language 2</label>
          </div>

        </div>
      </div>
     
{{verses}}
     <ul v-if="verses"> 
     <!-- <li v-for="(verse, ) in arr3" :key="verse"> 
       {{parseInt(verse.Verseid.substr(5,3))+1}}) {{verse.Verse}}
     </li>  -->
     <li>
       hello
     </li>
      </ul>  
</template>

<script>
// <li v-for="(verse, index) in verses" :key="verse">
  import axios from "axios";
 
import M from "materialize-css";
export default {
    data(){
        return{
            arr1:[{ 'Name':'jack','id':1}, {'Name':'jill','id':2}],
            arr2:[{ 'Name':'Mack','id':1}, {'Name':'Sack','id':2}],
            arr3:[{ 'Name':'jack','id':1}, {'Name':'jill','id':2},{ 'Name':'Mack','id':1}, {'Name':'Sack','id':2}],
            verses1:[], verses2:[],verses:[], selectedlanguage1:'English', selectedlanguage2:'తెలుగు',
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
      ], m1:[], m2:[],m3:[],
        }
    },
  
mounted() {
    //this.getall();
     M.AutoInit();
  //   this.con()
 this.sort()
    
  },
    
    methods:{
        //var allWeirdWords = words.concat(moreWords)
      
        sort(){
          
          const requestOne = axios.get("./" + this.selectedlanguage1 + ".json");
          const requestTwo = axios.get("./" + this.selectedlanguage2 + ".json");
          axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
          const responseOne = responses[0].data.Book[0].Chapter[0].Verse
           const responseTwo = responses[1].data.Book[0].Chapter[0].Verse
         
          const mergeddata=responseOne.concat(responseTwo)
        //  console.log(mergeddata.sort(xyz))
          this.verses=mergeddata.sort(xyz)
        //  console.log(mergeddata)
  // use/access the results 
          })).catch(errors => {
  // react on errors.
          })
            //   axios.get("./" + this.selectedlanguage1 + ".json")
            //   .then(response1=>{ this.m1=response1.data.Book[0].Chapter[0].Verse;
            //   // mn=this.arr1.concat(this.arr2)
             
            // //   mn =this.m1.concat(this.m2)
            //   })
              
            //    axios.get("./" + this.selectedlanguage2 + ".json")
            //   .then(response2=>{ this.m2=response2.data.Book[0].Chapter[0].Verse;
               //mn=m1.concat(m2)
            //   mn =this.m1.concat(this.m2)
            //  const z=mn
              // const z= con(this.m1,this.m2)
             //  z=z.sort(xyz)
            //   console.log(mn)
             // console.log(this.z)

           //   })
              //this.getme()
              
        },  
       
        
    }
}  

function xyz(a, b) {

    return a.Verseid - b.Verseid;
}

</script>
