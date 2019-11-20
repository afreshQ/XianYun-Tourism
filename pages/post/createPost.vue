<template>
  <section class="container">
        <el-row type="flex" justify="space-between" >
            <el-col :span="18">
                <div class="header">
                    <h2 class="title">发表新攻略</h2>
                    <p class="desc">分享你的个人游记，让更多人看到哦！</p>
                </div>
                <div class="center">
                    
                    <el-form :model="form" ref="numberValidateForm" class="demo-ruleForm">
                        <el-form-item prop="title">
                            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
                        </el-form-item>
                        <el-form-item prop="content" >
                            <!-- 富文本 -->
                            <div class="quill-editor" 
                                ref="myQuillEditor"
                                :content="form.content"
                                @change="onEditorChange($event)"
                                v-quill:myQuillEditor="editorOption">
                            </div>

                            <!-- 使用自己的 -->
                            <input
                            type="file"
                            style="display: none;"
                            id="getFile"
                            @change="selectContentImg($event)"
                            accept="image/gif,image/jpeg,image/jpg,image/png"
                            >
                        </el-form-item>
                        <el-form-item label="选择城市" label-width="80px" >
                            <el-autocomplete
                            class="city"
                            v-model="form.city"
                            :fetch-suggestions="querySearch"
                            placeholder="选择游玩城市"
                            @select="handleSelect"
                            @blur="handleBlur"
                            ></el-autocomplete>
                        </el-form-item>
                        <el-form-item class="footer">
                                <el-button type="primary" @click="submitForm('numberValidateForm')">提交</el-button>
                                <span> 或者  <nuxt-link to="javaScript:;" class="draft-btn">保存到草稿</nuxt-link></span>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
            <el-col :span="5">
                1
            </el-col>
        </el-row>
  </section>
</template>

<script>
export default {
    data(){
        return {
            cities:[],
            form:{
                title:"",
                content:"",
                city:""
            },
            //富文本配置
            editorOption: {
                // some quill options
                modules: {
                    toolbar: {
                        container:[
                            ['bold', 'italic', 'underline', 'strike'],
                            [{header:1 }, {header:2 }],,
                            ["image", "video"],
                        ],
                        handlers: {
                            'image': function () {
                            // 意思是使用插入图片的功能时候，触发文件上传控件的点击事件
                            document.getElementById('getFile').click();
                            }
                        }
                    },
                    
                },
                placeholder: '请输入内容',
            }
        }
    },
    methods:{
        onEditorChange({ editor, html, text }) {
            this.form.content = html
        },

        // 选择图片之后的处理
        selectContentImg(e) {
            let file = e.target.files;
            
            if (file.length > 0) {
                let data = new FormData();
                for (let item of file) {
                    
                    data.append('files', item)
                }
                
                // 把图片文件上传文件到服务器
                // 然后把返回的路径拼接好插入到内容里
                this.$axios({
                    url:'/upload',
                    method:'post',
                    data
                }).then(res=>{
                    this.$message.success('图片上传成功');
                    const imgUrl=this.$axios.defaults.baseURL+res.data[0].url;
                    console.log(imgUrl);
                    
                    this.form.content += `<img src="${imgUrl}" alt="内容图片">`;
                })
            }
        },

        //选择城市
        querySearch(value, cb){
            if(!value) return;
            this.$axios({
                url:'/airs/city',
                method:'get',
                params:{
                    name:value
                }
            }).then(res=>{
                let {data}=res.data
                
                this.cities=data.map(v=>{
                    v.value=v.name
                    return v;
                })
                cb(this.cities);
            })

        },

        // 城市下拉选择时触发
        handleSelect(item) {
            this.form.city = item.value;
        },

        //处理输入框失去焦点的问题
        handleBlur(){
            if(this.cities.length===0||this.form.city==='') return;
            this.form.city=this.cities[0].value;
        },

        //提交
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                this.$axios({
                    url:'/posts',
                    method:'post',
                    data:this.form,
                    headers:{
                        Authorization:"Bearer "+this.$store.state.user.userInfo.token
                    }
                    
                }).then(res=>{
                    const {message}=res.data;

                    this.$message.success(message);
                    this.form={
                            title:"",
                            content:"",
                            city:""
                        };
                })


            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
    }
}
</script>

<style lang="less" scoped>
.container{
  width:1000px;
  margin:20px auto;
}
.header{
    .title{
        font-weight: 400;
        font-size: 22px;
        margin-bottom: 10px;
    }
    .desc{
        font-size: 12px;
        color: #999;
        margin-bottom: 10px;
    }

}
.center{
    .quill-editor{
        min-height:400px;
    
        overflow-y:auto;
        
    }
    .city{
        width: 150px;
    }
}
.footer{
    display: flex;
    align-items: center;
    .draft-btn{
        color: #ffa500;
    }
}
</style>