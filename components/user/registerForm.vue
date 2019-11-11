<template>
    <el-form 
        :model="form" 
        ref="form" 
        :rules="rules" 
        class="form">
            <el-form-item class="form-item" prop="username">
                <el-input 
                placeholder="用户名手机"
                v-model="form.username"
                >
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="captcha">
                <el-input 
                v-model="form.captcha"
                placeholder="验证码" >
                    <template slot="append">
                        <el-button @click="handleSendCaptcha">
                            发送验证码
                        </el-button>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="nickname">
                <el-input 
                v-model="form.nickname"
                placeholder="你的名字">
                </el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="password">
                <el-input 
                placeholder="密码" 
                type="password"
                v-model="form.password"
                ></el-input>
            </el-form-item>

            <el-form-item class="form-item" prop="checkPassword">
                <el-input 
                placeholder="确认密码" 
                v-model="form.checkPassword"
                type="password">
                </el-input>
            </el-form-item>

            <el-button 
            class="submit" 
            type="primary" 
            @click="handleRegSubmit">
                注册
            </el-button>
        </el-form>
</template>

<script>
export default {
    data(){
        
        const validateUserName=(rule, value, callback)=>{
            if (value === '') {
                callback(new Error('请输入手机号'));
            } else if (!(/^1[3456789]\d{9}$/.test(value))) {
                callback(new Error('手机号格式不正确'));
            } else {
                callback();
            }
        }

        var validatecheckPass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.form.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            // 表单数据
            form: {
                username:'',
                nickname:'',
                captcha:'',
                password:'',
                checkPassword: '',
            },
            // 表单规则
            rules: {
                username : [
                        // { required: true, message: '请输入用户名/手机', trigger: 'blur' },
                        { validator: validateUserName, trigger: 'blur' },
                ],
                nickname: [
                        { required: true, message: '请输入昵称', trigger: 'blur' },
                ],
                captcha : [
                        { required: true, message: '请输入短信验证码', trigger: 'blur' },
                ],
                password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                checkPassword: [
                        { validator: validatecheckPass, trigger: 'blur' },
                ],
            },
        }
    },
    methods: {
        // 发送验证码
        async handleSendCaptcha(){
            
            if(!this.form.username){
                return;
            }
            if(!(/^1[3456789]\d{9}$/.test(this.form.username))){
                return;
            }

           const code = await this.$store.dispatch("user/sendCaptchas", this.form.username);
            
           await this.$alert(`模拟手机验证码: ${code}`,'提示',{
               confirmButtonText:'确定'
           })
        },


        // 注册
        handleRegSubmit(){

            //不需要checkPassword
            let {checkPassword,...props}=this.form;
            console.log(props);
           
                this.$refs.form.validate(async (valid)=>{
                     if(valid){
                       try {
                            await this.$store.dispatch('user/register',props);

                            this.$router.replace('/');

                            this.$message.success('注册成功')
                       } catch (error) {}
                    }
                })
        }
    }
}
</script>

<style scoped lang="less">
    .form{
        padding:25px;
    }

    .form-item{
        margin-bottom:20px;
    }

    .form-text{
        font-size:12px;
        color:#409EFF;
        text-align: right;
        line-height: 1;
    }

    .submit{
        width:100%;
        margin-top:10px;
    }
</style>