<template>
    <section class="flex w-full">
        <div class="m-auto">
            <h1 class="text-2xl text-center mt-5">User Crud</h1>
            <div class="mt-10">
                <CreateUser @new-user-added="addUser" />
                <table>
                    <thead>
                        <tr>
                            <th class="px-4 py-2 border">ID</th>
                            <th class="px-4 py-2 border">Avatar</th>
                            <th class="px-4 py-2 border">Name</th>
                            <th class="px-4 py-2 border">Email</th>
                            <th class="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in state.users" :key="user.id">
                            <td class="border px-4 py-2 ">{{ user.id }}</td>
                            <td class="border px-4 py-2 ">
                                <img :src="user.avatar" :alt="user.name" width="50" style="height:45px"
                                    class="rounded-full">
                            </td>
                            <td class="border px-4 py-2 ">{{ user.first_name }}</td>
                            <td class="border px-4 py-2 ">{{ user.email }}</td>
                            <td class="border px-4 py-2 ">
                                <button class="px-2 py-1 bg-yellow-600 text-white rounded mx-3"
                                    @click="openEdit(user)">Edit</button>
                                <button class="px-2 py-1 bg-red-600 text-white rounded"
                                    @click="remove(user.id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="flex mt-5 justify-center">
                    <button class="px-3 py-2 border rounded mx-1 " @click="first()" :disabled="state.start === 0"
                        :class="state.start === 0 ? 'bg-gray-100 text-gray-300' : 'hover:shadow'">First</button>
                    <button class="px-3 py-2 border rounded mx-1 " @click="prev()" :disabled="state.start === 0"
                        :class="state.start === 0 ? 'bg-gray-100 text-gray-300' : 'hover:shadow'">prev</button>
                    <button v-for="num in state.totalPages" @click="getPageData(num)" class="px-4 mx-2 border rounded" :disabled="state.page === num "
                        :class="state.page === num ? 'bg-gray-100 text-gray-300' : 'hover:shadow'">{{ num }}</button>

                    <button class="px-3 py-2 border rounded mx-1" @click="next()" :disabled="state.page === state.totalPages"
                        :class="state.page === state.totalPages ? 'bg-gray-100 text-gray-300' : 'hover:shadow'">Next</button>
                    <button class="px-3 py-2 border rounded mx-1" @click="last()" :disabled="state.page === state.totalPages"
                        :class="state.page === state.totalPages ? 'bg-gray-100 text-gray-300' : 'hover:shadow'">Last</button>
                </div>

            </div>
        </div>
    </section>
    <EditUser :isEditModalOpen="isEditModalOpen" :updatedUser="state.updateUser" />

</template>

<script>
import { onMounted, reactive, ref } from '@vue/runtime-core'
import axios from "../plugins/axios"
import CreateUser from '../components/UserCrud/CreateUser.vue'
import EditUser from '../components/UserCrud/EditUser.vue'
export default {
    components: { CreateUser, EditUser },
    setup() {
        const state = reactive({
            users: [],
            numOfUsers: 0,
            totalPages: 0,
            updateUser: {
                first_name: '',
                email: "",
                avatar: "",
            },
            start:0,
            page:1,
            limit:4,

        })
        const isEditModalOpen = ref(false)

        onMounted(async () => {
            const { data } = await axios.get(`/allUsers`)
            state.numOfUsers=data.length
            state.users = data.splice(0,state.limit)
            if(state.numOfUsers%state.limit==0){
                state.totalPages= parseInt(state.numOfUsers/state.limit)
            }
            else{
                state.totalPages= parseInt(state.numOfUsers/state.limit)+1
            }
        })
        async function next() {
            const { data } = await axios.get(`/allUsers?_start=${state.start+state.limit}&_limit=${state.limit}`)
            state.users = data
            state.start=state.start+state.limit
            state.page=state.page+1
        }
        async function prev() {
            const { data } = await axios.get(`/allUsers?_start=${state.start-state.limit}&_limit=${state.limit}`)
            state.users = data
            state.start=state.start-state.limit
            state.page=state.page-1


        }
        async function first() {
            const { data } = await axios.get(`/allUsers?_start=0&_limit=${state.limit}`)
            state.users = data
            state.start=0
            state.page=1

        }
        async function last() {
            
            const { data } = await axios.get(`/allUsers?_start=${(state.totalPages-1)*state.limit}&_limit=${state.limit}`)
            state.users = data
            state.start=(state.totalPages-1)*state.limit
            state.page =state.totalPages

        }
        async function getPageData(index){
            console.log((index*state.limit)-state.limit);
            const { data } = await axios.get(`/allUsers?_start=${(index*state.limit)-state.limit}&_limit=${state.limit}`)
            state.users = data
            state.page = index
            state.start=(index*state.limit)-state.limit

        }


        async function remove(id) {
            await axios.delete(`/allUsers/${id}`)
            state.users = state.users.filter((user) => user.id != id)
            state.numOfUsers=state.numOfUsers-1
            if(state.numOfUsers%state.limit==0){
                state.totalPages= parseInt(state.numOfUsers/state.limit)
            }
            else{
                state.totalPages= parseInt(state.numOfUsers/state.limit)+1
            }
            getPageData(state.totalPages)
        }
        function openEdit(user) {
            isEditModalOpen.value = true;
            state.updateUser = user
        }

        function addUser(data) {
            state.users.push(data)
            state.numOfUsers=state.numOfUsers+1
            if(state.numOfUsers%state.limit==0){
                state.totalPages= parseInt(state.numOfUsers/state.limit)
            }
            else{
                state.totalPages= parseInt(state.numOfUsers/state.limit)+1
            }
            getPageData(state.totalPages)

        }
        return { state, isEditModalOpen, next, prev, first, last,getPageData, addUser, remove, openEdit ,}
    }
}
</script>

<style>

</style>