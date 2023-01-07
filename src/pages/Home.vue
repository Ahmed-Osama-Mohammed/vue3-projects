<template>
  <section class="flex w-full">
    <div class="m-auto">
      <h1 class="text-center text-5xl text-gray-500 my-5">Vue Projects </h1>
      <h1 class="text-center text-3xl text-gray-500 my-5">Hello , This My own practice projects on vue 3 </h1>

      <table class="divide-y divide-gray-200 table-fixed dark:divide-gray-700  my-10">
        <thead class="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 px-4 py-2 border">Project</th>
            <th class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 px-4 py-2 border">Details</th>
            <th class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 px-4 py-2 border">Features Used</th>
            <th class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400 px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
          <tr v-for="project in state.projects" :key="project.name" class="hover:bg-gray-100 dark:hover:bg-gray-700">
            <td class="border  py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{{project.name}}</td>
            <td class="border  py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">{{ project.details }}</td>
            <td class="border  py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <ol  class="list-decimal h-20 overflow-y-scroll">
                <li v-for="(feature,index) in project.features" :key="index">{{ index+1}}- {{ feature }}</li>
              </ol>
            </td>
            <td class="border  py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <router-link :to='project.to' class="px-2 py-1 bg-blue-600 text-white rounded mx-3">Open Project</router-link>
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </section>
</template>

<script>
import { reactive } from 'vue'
export default {
  setup() {
    const state = reactive({
      projects: [
        {
          name: 'DC Heros',
          details: 'a simple application that shows your favorite DC heroes',
          features: ["v-for", "v-bind", "v-model", "v-on", "methods", "computed properties ( getters & setters)", "vue components"],
          to: '/dc-heros' 
        }, {
          name: 'Calendar',
          details: 'It is an application to know the calendar day, month and year',
          features: ['javascript Date', 'Vue Router'],
          to: '/calendar'
        }, {
          name: 'Markdown',
          details: ' low-level compiler for parsing markdown without caching or blocking for long periods of time',
          features: ['Using External Library', 'Vue Mixins'],
          to: '/markdown'
        }, {
          name: 'Slider',
          details: 'a simple slider for divs with animation and selector ',
          features: ['Vue Transition & Animation', 'virtual DOM', 'lifecycle hooks']
          ,to: '/slider-carousal'
        }, {
          name: 'Login & Sign up Pages',
          details: 'Login/Signup form connected with firebase to create user and login ',
          features: ['Create Modal','Vue Custom Events Emitting', 'Form Handling', 'firebase authentication', 'loading effect', 'Template Refs', 'component props', 'firebase google login', 'Refactoring with component','vue3 teleport']
          , to: '/chat' 
        },{
          name: 'Calculator',
          details: 'Simple Calculator',
          features: ['Composition API', 'Vue Router' ,'resuable composition api']
          , to: '/calculator'
        },{
          name: 'ReuseableModal',
          details: 'Modal rused in other apps like UserCrud and Login/Sign up Forms',
          features: ['slots', 'named slots']
          , to: '/reuseable-modal'
        },{
          name: 'Chat',
          details: "It is a real-time chat application that users can use it after logging in",
          features: ['Firebase Realtime Database', 'vuex v4' , 'Custom Router middleware']
          , to: '/chat' 
        },{
          name: 'UserCrud',
          details: "its atable of users with pagination ,add ,edit and delete featuers",
          features: ['using axios', 'external API' , 'reactive vue3 api' , 'pagination','envirnment variable (.env file)']
          ,to: '/user-crud'
        },
      ]
    })
  return {state}
  }


}
</script>

<style>

</style>