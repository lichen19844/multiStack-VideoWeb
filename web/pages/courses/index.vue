<template>
  <div class="pa-3">
    <h3>热门课程</h3>
    <!-- <div>{{ courses }}</div> -->
    <v-container>
      <v-row>
        <v-col v-for="item of courses" :key="item._id" md="3">
          <v-card :to="`/courses/${item._id}`" class="mx-auto" max-width="344">
            <v-img :src="item.cover" height="200px"></v-img>

            <v-card-title>
              {{ item.name }}
            </v-card-title>

            <v-card-subtitle>
              {{ item.createdAt }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn text>Share</v-btn>

              <v-btn color="purple" text>
                Explore
              </v-btn>

              <v-spacer></v-spacer>

              <!-- <v-btn icon @click="show = !show">
                <v-icon>{{
                  show ? 'mdi-chevron-up' : 'mdi-chevron-down'
                }}</v-icon>
              </v-btn> -->
            </v-card-actions>

            <!-- <v-expand-transition>
              <div v-show="show">
                <v-divider></v-divider>

                <v-card-text>
                  I'm a thing. But, like most politicians, he promised more than
                  he could deliver. You won't have time for sleeping, soldier,
                  not with all the bed making you'll be doing. Then we'll go
                  with that data file! Hey, you add a one and two zeros to that
                  or we walk! You're going to do his laundry? I've got to find a
                  way to escape.
                </v-card-text>
              </div>
            </v-expand-transition> -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  // data: () => ({
  //   show: false
  // }),
  // asyncData({isDiv, route, store, env, params, query, req, res, redirect, error}) {
  async asyncData({ $axios }) {
    const data = await $axios.$get('courses')
    return {
      courses: data.data
    }
  }
}
</script>

<style></style>
