import {createStore} from "vuex"
const store = createStore({
    state(){
        return {
            isLoggedIn:false,
            authUser:{},
            isLoginOpen:false,
            isSignUpOpen:false
        }
    },
    mutations:{
        setIsLoggedIn(state,payload){
            state.isLoggedIn=payload
        },
        setAuthUser(state,payload){
            state.authUser= payload
        },
        setLoginModal(state,payload){
            state.isLoginOpen= payload
        },
        setSignUpModal(state,payload){
            state.isSignUpOpen= payload
        }
    }
})
export default store