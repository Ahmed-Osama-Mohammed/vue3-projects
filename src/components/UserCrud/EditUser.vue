<template>
  <teleport to="body">
        <Modal v-if="isEditModalOpen"  @close="isEditModalOpen = false">
            <template #title>
                Add New User
            </template>
            <template #body>
                <form @submit.prevent="editsubmit(updatedUser);isEditModalOpen=false">
                    <div class="p-2">
                        <label>Name</label>
                        <input type="text" placeholder="User Name" class="w-full p-2 rounded border"
                            v-model="updatedUser.first_name">
                    </div>
                    <div class="p-2">
                        <label>Email</label>
                        <input type="text" placeholder="User Email" class="w-full p-2 rounded border"
                            v-model="updatedUser.email">
                    </div>
                    <div class="p-2">
                        <label>Avatar</label>
                        <input type="text" placeholder="Avatar URL" class="w-full p-2 rounded border"
                            v-model="updatedUser.avatar">
                    </div>
                    <div class="p-2">
                        <input type="submit" value="Edit" placeholder="Avatar URL"
                            class="w-full p-2 rounded border hover:bg-gray-300 cursor-pointer">
                    </div>
                </form>
            </template>
        </Modal>
    </teleport>
</template>

<script>
    import axios from "../../plugins/axios"
    import Modal from "../Modal.vue"

export default {
    props: {updatedUser:{},isEditModalOpen:Boolean},
    components: { Modal },
    setup() {
        
        async function editsubmit(user){
            console.log(user);
            await axios.put(`/allUsers/${user.id}`, {
            first_name: user.first_name,
            email: user.email,
            avatar: user.avatar
          })
        }
    
        return {editsubmit}
    
    }

}
</script>

<style>

</style>