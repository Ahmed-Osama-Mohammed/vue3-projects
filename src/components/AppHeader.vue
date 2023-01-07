<template>
  <nav class="w-full bg-gradient-to-r from-blue-800 to-blue-600 p-5">
    <section class="flex justify-between">

      <router-link to="/" class="text-white text-2xl">Vue Apps</router-link>
      <div>
        <router-link v-for="item in list" :key="item" :to='item.to'
          class="text-white text-xl mx-3">{{ item.title }}</router-link>
          <div class="inline" v-if="isLoggedIn">            
            <button  class="mx-3 text-white text-xl" @click="logout">Logout</button>
          </div>
          <div class="inline" v-else>
            <button  class="mx-3 text-white text-xl" @click="openLogin()">Login</button>
            <button class="mx-3 text-white text-xl" @click="openSignup()">Sign Up</button>
          </div>
      </div>
    </section>

  </nav>
</template>

<script>
import { signOut } from "firebase/auth";
import { auth } from "../utilities/firebase"
export default {
  data() {
    return {
      list: [
        { title: 'DCHeros', to: '/dc-heros' },
        { title: 'Calendar', to: '/calendar' },
        { title: 'Mark down', to: '/markdown' },
        { title: 'Slider Carousel', to: '/slider-carousal' },
        { title: 'Calculator', to: '/calculator' },
        { title: 'Modal', to: '/reuseable-modal' },
        { title: 'Chat', to: '/chat' },
        { title: 'User Crud', to: '/user-crud' },
      ],
    }
  },
  computed:{
    isLoggedIn(){
      return this.$store.state.isLoggedIn
    }
  }
  ,
  methods: {
    logout() {
      signOut(auth).then((res) => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
    },
    openLogin(){
      this.$store.commit('setLoginModal',true)
    },
    openSignup(){
      this.$store.commit('setSignUpModal',true)

    }
  }

}
</script>

<style>

</style>