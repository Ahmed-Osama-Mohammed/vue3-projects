<template>
    <div  class="w-1/2 m-auto ">
        <h1 class="text-2xl text-center my-2"> Calendar</h1>
        <section class="px-10 flex justify-between">
            <h2 class="font-bold text-xl">{{ currentMonthName }}</h2>
            <h2 class="font-bold text-xl ">{{ currentYear }}</h2>
        </section>
        <section class="flex my-5 text-center">
            <p class="font-semibold	 text-xl" style="width:14.28%" v-for="day in days" :key="day">{{ day }}</p>
        </section>
        <section class="flex flex-wrap text-center">
            <p class="my-2 text-xl text-gray-300" style="width:14.28%" v-for="num in startDay()" :key="num">{{ num }}</p>
            <p class="my-2 text-xl" style="width:14.28%" v-for="num in daysInMonth()" :key="num" :class="currentDateClass(num)">{{ num }}</p>
        </section>
        <section class="flex justify-between my-5">
            <button class="px-2 border rounded" @click="prev()">Prev</button>
            <button class="px-2 border rounded" @click="next()">Next</button>
        </section>
    </div>
</template>

<script>
export default {
  
    data(){
        return {
            currentDate: new Date().getDate(),
            currentYear:new Date().getFullYear(),
            currentMonth:(new Date().getMonth() ),
            days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat"]
        }
    },
    methods:{
        daysInMonth(){
            return new Date(this.currentYear,this.currentMonth+1,0).getDate()
        },
        startDay(){
            let lastDay=new Date(this.currentYear,this.currentMonth,0).getDate();
            let lastDays=[]
            let blanks=new Date(this.currentYear,this.currentMonth,1 ).getDay()
            for(let i =1;i<=blanks;i++&&lastDay--){
                lastDays.unshift(lastDay)
            }
            return lastDays
        },
        next(){
            if(this.currentMonth===11){
                this.currentMonth=0;
                this.currentYear++
            }
            else{
                this.currentMonth++
            }
        },
        prev(){
            if(this.currentMonth===0){
                this.currentMonth=11;
                this.currentYear--
            }
            else{
                this.currentMonth--
            }
        },
        currentDateClass(num){
            const calendarFullDate = new Date(this.currentYear,this.currentMonth,num).toDateString()
            const currentFullDate  = new Date().toDateString()
            return calendarFullDate===currentFullDate ? "bg-blue-800 text-white" : ''

        }
    },
    computed:{
        currentMonthName(){
         return new Date(this.currentYear,this.currentMonth).toLocaleString("default",{month:"long"})
        }
    }

}
</script>

<style>
p:hover{
    transition: .5s linear all;
    background: #8080801c;
    color: black;
}
</style>