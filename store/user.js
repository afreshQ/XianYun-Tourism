export const state=()=>{
    return {
        userInfo:{
            token:'',
            user:{}
        }
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
        
       return this.$axios({
            url:'/accounts/login',
            method:'post',
            data
        }).then(res=>{
            store.commit('setUserInfo',res.data);
            
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
    },


    // 用户注册
    register(store,props){

           return this.$axios({
                url:'/accounts/register',
                method:'post',
                data:props
            }).then(res=>{
               console.log(res);
                
               //注册完毕后登录
                store.commit('setUserInfo',res.data);

            })
    }
}