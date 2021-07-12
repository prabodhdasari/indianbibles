<template>
  <div class="row" style="margin-top:10px">
    <div class="container">
      <h6 class="col left darken-3 teal-text">Old Testament</h6>
      <div class="col left" v-if="OT">
        <ul>
          <li
            v-for="bookn in OT"
            :key="bookn"
            @click="getbooks(bookn.name, bookn.total), bookwise(bookn.name)"
          >
            <span>{{ bookn.name }} </span>
          </li>
        </ul>
      </div>
      <h6 class="col left darken-3 teal-text">New Testament</h6>
      <div class="col left" v-if="NT">
        <ul>
          <li
            v-for="bookn in NT"
            :key="bookn"
            @click="getbooks(bookn.name, bookn.total), bookwise(bookn.name)"
          >
            <span> {{ bookn.name }} </span>
          </li>
        </ul>
        <hr />
      </div>
    </div>
    <div class="container">
      <div class="col s12 m12 l12">
        <ul>
          <li
            v-for="chapterno in parseInt(chaptercount)"
            :key="chapterno"
            @click="getverses(chapterno)"
          >
            <span class="primary "> {{ chapterno }} </span>
          </li>
        </ul>
        <hr />
      </div>
    </div>
  </div>

  <div class="container">
    <h5 class="darken-3 teal-text left-align">
      <strong>{{ bookname }}</strong>
    </h5>

    <div class="progress" v-if="loading">
      <div class="indeterminate"></div>
    </div>

    <div class="card-body  left-align" v-if="verses">
      <ul>
        <li v-for="(verse, index) in verses" :key="verse">
          <span> {{ index }} {{ verse }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  mounted() {
    this.getverses();
  },
  data() {
    return {
      chaptercount: 50,
      chapternumber: "1",
      bookname: "",
      total: "",
      chapter: "",
      verses: [],
      bookname: "",
      loading: true,
      OT: [
        { name: "Genesis", total: 50 },
        { name: "Exodus", total: 40 },
        { name: "Leviticus", total: 27 },
        { name: "Numbers", total: 36 },
        { name: "Deuteronomy", total: 34 },
        { name: "Joshua", total: 24 },
        { name: "Judges", total: 21 },
        { name: "Ruth", total: 4 },
        { name: "1-Samuel", total: 31 },
        { name: "2-Samuel", total: 24 },
        { name: "1-Kings", total: 22 },
        { name: "2-Kings", total: 25 },
        { name: "1-Chronicles", total: 29 },
        { name: "2 Chronicles", total: 36 },
        { name: "Ezra", total: 10 },
        { name: "Nehemiah", total: 13 },
        { name: "Tobit", total: 14 },
        { name: "Judith", total: 16 },
        { name: "Esther", total: 16 },
        { name: "Job", total: 42 },
        { name: "Psalms", total: 150 },
        { name: "Proverbs", total: 31 },
        { name: "Ecclesiastes", total: 12 },
        { name: "Song of Songs ", total: 8 },
        { name: "Wisdom", total: 19 },
        { name: "Sirach", total: 51 },
        { name: "Isaiah", total: 66 },
        { name: "Jeremiah", total: 52 },
        { name: "Lamentations", total: 5 },
        { name: "Baruch", total: 6 },
        { name: "Ezekiel", total: 48 },
        { name: "Daniel", total: 14 },
        { name: "Hosea", total: 14 },
        { name: "Joel", total: 3 },
        { name: "Amos", total: 9 },
        { name: "Obadiah", total: 1 },
        { name: "Jonah", total: 4 },
        { name: "Micah", total: 7 },
        { name: "Nahum", total: 3 },
        { name: "Habakkuk", total: 3 },
        { name: "Zephaniah", total: 3 },
        { name: "Haggai", total: 2 },
        { name: "Zechariah", total: 14 },
        { name: "Malachi", total: 4 },
        { name: "1-Maccabees", total: 16 },
        { name: "2-Maccabees", total: 15 }
      ],
      NT: [
        { name: "Matthew", total: 28 },
        { name: "Mark", total: 16 },
        { name: "Luke", total: 24 },
        { name: "John", total: 21 },
        { name: "Acts", total: 28 },
        { name: "Romans", total: 16 },
        { name: "1-Corinthians", total: 13 },
        { name: "2-Corinthians", total: 13 },
        { name: "Galatians", total: 6 },
        { name: "Ephesians", total: 6 },
        { name: "Philippians", total: 4 },
        { name: "Colossians", total: 4 },
        { name: "1-Thessalonians", total: 5 },
        { name: "2-Thessalonians", total: 3 },
        { name: "1-Timothy", total: 6 },
        { name: "2-Timothy", total: 4 },
        { name: "Titus", total: 3 },
        { name: "Philemon", total: 1 },
        { name: "Hebrews", total: 13 },
        { name: "James", total: 5 },
        { name: "1-Peter", total: 5 },
        { name: "2-Peter", total: 3 },
        { name: "1-John", total: 5 },
        { name: "2-John", total: 1 },
        { name: "3-John", total: 1 },
        { name: "Jude", total: 1 },
        { name: "Revelation", total: 22 }
      ]
    };
  },
  methods: {
    getloader() {
      this.loading = true;
    },
    getunloader() {
      this.loading = false;
    },
    getbooks(bookname, total) {
      this.bookname = bookname;
      this.chaptercount = total;
    },
    bookwise(bookname) {
      this.bookname = bookname;
      this.chapternumber = "1";
      this.getloader();
      axios.get("./cdp.json").then(response => {
        this.verses = response.data[this.bookname][this.chapternumber];
        this.getunloader();
      });
    },
    getverses(chapternumber) {
      if (!this.bookname) {
        this.bookname = "Genesis";
      }
      if (!chapternumber) {
        chapternumber = "1";
      }
      this.chapternumber = chapternumber;
      this.getloader();
      axios.get("./cdp.json").then(response => {
        this.verses = response.data[this.bookname][chapternumber];
        this.getunloader();
      });
    }
  }
};
</script>
