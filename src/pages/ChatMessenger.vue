<template>
    <section class="flex w-full">
        <div class="m-auto w-full flex flex-wrap justify-center">
            <h1 class="text-center text-3xl my-4 w-full">Real Time Chat</h1>
            <div class="border rounded-lg w-1/2 md:w-4/12">
                <div v-if="userId" class="h-80 p-2 overflow-y-scroll">
                    <div v-for="chat in state.chats" :key="chat.message" class="w-full"
                        :class="chat.userId === userId ? 'text-right' : ''">
                        <p :class="chat.userId === userId ? 'bg-blue-400' : 'bg-gray-400'" class="inline px-2 py-1 rounded text-white ">{{ chat.message }}</p>
                    </div>
                </div>
                <div class="h-8 p-2">
                    <input v-model="state.message" placeholder="Start Typing..."
                        class="p-1 border rounded shadow w-full" @keydown.enter="addMessage" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import {  auth , chatsRef } from "../utilities/firebase"
import { onChildAdded, set ,push } from "firebase/database";
import { useStore } from 'vuex';
export default {
    setup() {
        const state = reactive({
            chats: [],
            message: '',
        });
        const store=useStore()
        const userId=computed(()=>store.state.authUser.uid)

        onMounted(() => {
            
            onChildAdded( chatsRef, (data) => {
                state.chats.push({key:data.key,...data.val()})
            });
        
        })

         function addMessage() {
            const newChat= push(chatsRef)
            set(newChat,  {
                userId:userId.value,
                message: state.message
            });
            state.message = ""
        }

        return { state, addMessage ,userId }

    }

}
</script>

<style>

</style>