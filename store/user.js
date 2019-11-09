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