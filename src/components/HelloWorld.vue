<template>
  <div class="row">
    <div class="col s12 m4 l4">
      <div class="card">
        <div class="card-content">
          <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
            I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
          <a href="#" class="btn blue lighten-1">This is a link</a>
          <a href="#" class="btn blue darken-1">This is a link</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
