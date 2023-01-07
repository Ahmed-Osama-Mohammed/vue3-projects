<template>
    <div class="flex flex-wrap w-full relative overflow-x-hidden">
        <div v-for="(color,index) in sliders" :key="color" class="absolute w-full">
            <transition name="fade">
            <div v-if="currentSlide == index" :class="color" style="height:700px"></div>
            </transition>
        </div>
        <div class="w-full" style="height:700px">
            <div class="absolute bottom-3 flex w-full justify-center">

                <div
                 v-for="(item,index) in sliders"
                 :key="item"
                 @click="makeActive(index)"
                 class="mx-2 w-8 h-8 rounded-full cursor-pointer shadow-md"
                 :class="currentSlide===index ? 'bg-gray-700':'bg-gray-300'">
            </div>
              
            </div>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentSlide: 0,
            sliders: ["bg-blue-500", "bg-yellow-500", "bg-teal-500", "bg-red-500", "bg-gray-500"],
            interval: '',
            isTitleShowing:true,
        }
    },
    methods:{
      makeActive(index){
        this.currentSlide=index
      }
    },
    mounted() {
        this.interval = setInterval(() => {
            this.currentSlide = this.currentSlide === 4 ? 0 : this.currentSlide + 1
        }, 6000);
    },
    beforeUnmount() {
        clearInterval(this.interval)

    }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: all 3s ease;

}

.fade-enter-from{
    opacity: 0;
    transform: translateX(-100%);

}
.fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>