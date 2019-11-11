export const state={
    userInfo:{
        token:'',
        user:{}
    }
};


export const mutations={
    setUserInfo(state,data){
        state.userInfo=data;
    },

    cleanUserInfo(state){
        //删除本地存储上的用户信息
        localStorage.removeItem('vuex');

        //重置存在store仓库中的用户信息
        state.userInfo={
            token:'',
            user:{}
        }
    }

}

//异步修改state的数据，组件的方法共享
export const actions={
    login(store,data){
        console.log(this);
        
        this.$axios({
            url:'/accounts/login',
            method:'post',
            data
        }).then(res=>{
            store.commit('setUserInfo',res.data);
            
        }).catch(err=>{
            // console.log(res.response);
            // if(res.response.status==400){
            //     this.$message.error(res.response.data.message);
            // }
        })
    }
}