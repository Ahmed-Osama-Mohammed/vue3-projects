export default {
    data(){
        return{
            timeOut:''
        }

    },
    methods:{
        debounced(func,wait=1000){
            clearTimeout(this.timeOut);
           this.timeOut= setTimeout(func, wait);
            
         }
    }
}