
<template>
  <AppHeader  />
  <router-view></router-view>
  <teleport to="body">
    <LoginModule />
    <SignupModule/>
  </teleport>
</template>

  <script >
  import AppHeader from './components/AppHeader.vue'
  import LoginModule from './components/LoginModule.vue'
  import SignupModule from './components/SignupModule.vue'
  import { onAuthStateChanged } from "firebase/auth";
  import { auth } from "./utilities/firebase"

  export default {
    components:{AppHeader, LoginModule ,SignupModule},
   
  mounted(){
    onAuthStateChanged(auth, (user) => {
  if (user) {
    this.$store.commit("setIsLoggedIn",true)
    this.$store.commit("setAuthUser",user)

  } else {
  this.$store.commit("setIsLoggedIn",false)
   this.$store.commit("setAuthUser",{})
  }
});

  }
  }
  
  </script>

<style scoped>


</style>
