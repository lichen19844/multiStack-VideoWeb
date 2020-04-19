<template>
  <div>
    <h3 class="pa-3">{{ course.name }}</h3>
    <!-- <div>{{ id }}</div> -->
    <!-- <div>{{ course }}</div> -->
    <v-select
      v-model="currentIndex"
      :items="course.episodes.map((v, i) => ({ text: v.name, value: i }))"
    ></v-select>
    <!-- <div>{{ episode.file }}</div> -->
    <video width="100%" :src="episode.file" controls></video>
  </div>
</template>

<script>
export default {
  // asyncData({isDiv, route, store, env, params, query, req, res, redirect, error}) {
  async asyncData({ params, $axios }) {
    const { id } = params
    const course = await $axios.$get(`courses/${id}`, {
      params: {
        query: { populate: 'episodes' }
      }
    })
    return {
      id,
      course
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  computed: {
    episode() {
      return this.course.episodes[this.currentIndex]
    }
  }
}
</script>

<style></style>
