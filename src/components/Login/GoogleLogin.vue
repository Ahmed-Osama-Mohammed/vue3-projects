<template>
    <section class="text-center my-5">
        <button @click="loginWithGoogle()" class="border px-3 py-2 rounded">Login with
            Google</button>
    </section>
</template>

<script>
    import { auth } from "../../utilities/firebase";
    import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
export default {

    methods: {
        loginWithGoogle() {
            const provider = new GoogleAuthProvider();
            signInWithPopup(auth, provider).then(res => {
                this.$emit('close-login-from-google')

            })

        },
    }

}
</script>

<style>

</style>