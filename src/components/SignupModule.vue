<template>
    <div v-if="isSignUpOpen">
    <section @click="close()" class="z-20 w-screen h-screen bg-gray-500 fixed top-0 opacity-50">
    </section>
    <div class="absolute inset-0 border shadow-lg">
        <div class="flex h-full">
            <div class="z-30 m-auto bg-white px-6 py-4 rounded shadow w-1/3 border">
                <div class="p-2  ">
                    <h1 class="text-2xl text-center">Sign up</h1>
                    <form class="my-4" @submit.prevent="submit()">
                        <div class="my-4">
                            <label>Email or Username</label>
                            <input ref="emailRef" placeholder="Enter your E-mail or Username"
                                class="rounded shadow p-2 w-full" v-model="form.email">
                        </div>
                        <div class="my-4">
                            <label>Password</label>
                            <input placeholder="Enter your Password" class="rounded shadow p-2 w-full"
                                v-model="form.password">
                        </div>
                        <small class="text-red-700" v-if="error">Invalid Email or Password</small>
                        <div class="my-4">
                            <button type="submit"
                                class="w-full rounded shadow bg-gradient-to-r from-red-800 to-pink-800 text-white h-10 p-2">
                                <span v-if="!isLoading">Sign up</span>
                                <span v-else>⏳</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { auth } from "../utilities/firebase"
import { createUserWithEmailAndPassword  } from "firebase/auth";
import GoogleLogin from "./Login/GoogleLogin.vue"
export default {
    components: { GoogleLogin },
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            isLoading: false,
            error:''
        }
    },
    methods: {
        submit() {
            this.isLoading = true;
            createUserWithEmailAndPassword(auth, this.form.email, this.form.password)
                .then(() => {
                    // Signed in 
                    this.isLoading = false;
                    this.form.email = '';
                    this.form.password = '';
                    this.close()

                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    this.error = error.message;
                    this.isLoading = false;

                });

        },

        close() {
            this.$store.commit('setSignUpModal',false)
        },
      
    },
    computed:{
        isSignUpOpen(){
            return this.$store.state.isSignUpOpen
        }
    }

}
</script>

<style>

</style>