<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          :to="item.link"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-subheader class="mt-4 grey--text text--darken-1">订阅</v-subheader>
        <v-list>
          <v-list-item v-for="item in items2" :key="item.text" link>
            <v-list-item-avatar>
              <img
                :src="
                  `https://randomuser.me/api/portraits/men/${item.picture}.jpg`
                "
                alt=""
              />
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text" />
          </v-list-item>
        </v-list>

        <v-list-item v-if="$store.state.auth.user" class="mt-4">
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-lock</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">
            欢迎您:{{ $store.state.auth.user.username }}
          </v-list-item-title>
        </v-list-item>

        <v-list-item v-else class="mt-4" @click="isShowLoginForm = true">
          <v-list-item-action
            >Î
            <v-icon color="grey darken-1">mdi-lock</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">
            登录
          </v-list-item-title>
        </v-list-item>

        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1"
            >Manage Subscriptions</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="red" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon class="mx-4" large>
        mdi-youtube
      </v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">全栈之巅</span>
      </v-toolbar-title>
      <v-spacer />
      <v-row align="center" style="max-width: 650px">
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="搜索..."
          single-line
          append-icon="mdi-magnify"
          color="white"
          hide-details
        />
      </v-row>
    </v-app-bar>

    <v-content>
      <!-- <v-container class="fill-height">
        <v-row justify="center" align="center">
          <v-col class="shrink">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn :href="source" icon large target="_blank" v-on="on">
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  href="https://codepen.io/johnjleider/pen/aezMOO"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-codepen</v-icon>
                </v-btn>
              </template>
              <span>Codepen</span>
            </v-tooltip>
          </v-col>
        </v-row>
      </v-container> -->
      <nuxt-child />
    </v-content>

    <v-bottom-sheet v-model="isShowLoginForm" inset>
      <v-form class="pa-4" @submit.prevent="login">
        <v-text-field
          v-model="loginModel.username"
          label="用户名"
        ></v-text-field>
        <v-text-field
          v-model="loginModel.password"
          label="密码"
          type="password"
          autocomplete="new-password"
        ></v-text-field>
        <v-btn color="success" type="submit">登录</v-btn>
      </v-form>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
export default {
  // props: {
  //   source: String
  // },
  data: () => ({
    drawer: null,
    items: [
      { icon: 'mdi-home', text: '首页', link: '/' },
      { icon: 'mdi-trending-up', text: '热门课程', link: '/courses' },
      { icon: 'mdi-youtube-subscription', text: '热门评论', link: '/comments' }
      // { icon: 'mdi-history', text: 'History' },
      // { icon: 'mdi-playlist-play', text: 'Playlists' },
      // { icon: 'mdi-clock', text: 'Watch Later' }
    ],
    items2: [
      { picture: 28, text: 'Joseph' },
      { picture: 38, text: 'Apple' },
      { picture: 48, text: 'Xbox Ahoy' },
      { picture: 58, text: 'Nokia' },
      { picture: 78, text: 'MKBHD' }
    ],
    isShowLoginForm: false,
    loginModel: {}
  }),
  methods: {
    async login() {
      // console.log(this.loginModel)
      // this.$http.post('login', this.loginModel)
      // try {
      await this.$auth.loginWith('local', {
        data: this.loginModel
      })
      this.isShowLoginForm = false
      console.log('登录成功')
      // } catch (err) {
      //   console.log(err)
      // }
    }
  },
  created() {
    this.$vuetify.theme.dark = true
  }
}
</script>
