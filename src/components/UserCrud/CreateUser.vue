<template>
    <button class="px-2 py-1 border rounded my-4" @click="isAddModalOpen = true">Add User</button>

    <teleport to="body">
        <Modal v-if="isAddModalOpen" @close="isAddModalOpen = false">
            <template #title>
                Add New User
            </template>
            <template #body>
                <form @submit.prevent="addSubmit()">
                    <div class="p-2">
                        <label>Name</label>
                        <input type="text" placeholder="User Name" class="w-full p-2 rounded border"
                            v-model="state.Addform.first_name">
                    </div>
                    <div class="p-2">
                        <label>Email</label>
                        <input type="text" placeholder="User Email" class="w-full p-2 rounded border"
                            v-model="state.Addform.email">
                    </div>
                    <div class="p-2">
                        <label>Avatar</label>
                        <input type="text" placeholder="Avatar URL" class="w-full p-2 rounded border"
                            v-model="state.Addform.avatar">
                    </div>
                    <div class="p-2">
                        <input type="submit" value="Create" placeholder="Avatar URL"
                            class="w-full p-2 rounded border hover:bg-gray-300 cursor-pointer">
                    </div>
                </form>
            </template>
        </Modal>
    </teleport>
</template>

<script>
import Modal from "../Modal.vue"
import { ref, reactive } from "vue"
import axios from "../../plugins/axios"
export default {
    components: { Modal },
    setup(_,{emit}) {
        const state = reactive({
            Addform: {
                first_name: '',
                email: "",
                avatar: ""
            },
        })
        const isAddModalOpen = ref(false)
        async function addSubmit() {
            const { data } = await axios.post('/allUsers', state.Addform)
           emit('new-user-added',data)
            state.Addform.email = ""
            state.Addform.first_name = ""
            state.Addform.avatar = ""
            isAddModalOpen.value = false

        }
        return { state, isAddModalOpen, addSubmit }
    }
}
</script>

<style>

</style>