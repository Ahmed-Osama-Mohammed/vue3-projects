export  function auth(next,store){
    if(!store.state.isLoggedIn){
        next("/")
        store.commit('setLoginModal',true)
     }else{
        next()
     }
}