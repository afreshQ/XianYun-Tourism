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
}

//异步修改state的数据，组件的方法共享
export const actions={
    // 用户登录
    login(store,data){
        
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
    },


    //发送验证码
    sendCaptchas(store,tel){
        // 返回验证码code
        return this.$axios({
            url: '/captchas',
            method: "POST",
            data: {
                tel
            }
        }).then(res => {
            
            const {code} = res.data;
            
            return code;
        })
    }
}