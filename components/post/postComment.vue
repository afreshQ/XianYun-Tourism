<template>
    <div class="comment">

            <div class="post-comment">
                <h4 class="comment-title">评论</h4>
                <el-input
                class="input"
                type="textarea"
                :rows="2"
                placeholder="说点什么把..."
                v-model="form.content"
                resize="none">
                </el-input>
                <el-row type="flex" justify="space-between" class="img-upload">
                    <el-col>
                        <el-upload
                        name="files"
                        :action="$axios.defaults.baseURL + '/upload'"
                        list-type="picture-card"
                        :on-success="coverUploaded"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" class="upload-img" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-col>
                    <el-col :span="3">
                          <el-button type="primary" @click="handleSubmit">提交</el-button>
                    </el-col>
                </el-row>
                <div class="no-comments" v-if="commentData.length===0">
                                    暂无评论，赶紧抢占沙发！
                </div>

                <commentItem :data="item" v-for="(item,index) in commentData" :key="index" v-else/>    
            </div>


            <!-- 分页 -->
            <div></div>
    </div>
</template>

<script>
import commentItem from '@/components/post/commentItem';
export default {
    components:{
        commentItem
    },
    data(){
        return {
            commentData:[],

            //图片预览组件
            dialogImageUrl: '',
            dialogVisible: false,

            //评论表单
            form:{
                content:'',
                pics:[]
            },
        }
    },

    mounted(){
        const {id}=this.$route.query;
        this.$axios({
            url:'/posts/comments',
            params:{
                post:id
            }
        }).then(res=>{

            const {data}=res.data;
            console.log(data);
            
            this.commentData=data;
        })
    },

    methods:{
                // 文件上传成功时的钩子
        coverUploaded(response){
            this.form.pics.push(response[0]);
        },
        //图片删除时的钩子
        handleRemove(file, fileList) {
        console.log(file, fileList);
            this.form.pics=fileList;
        },

        // 点击图片时的钩子
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },


        //提交评论
        handleSubmit(){
            const post=this.postId
            this.form={...this.form,post};
            console.log(this.form);
            
            this.$axios({
                url:'/comments',
                method:'post',
                headers:{
                    'Content-Type':"application/json; charset=utf-8",
                    Authorization:"Bearer "+this.$store.state.user.userInfo.token
                },
                data:this.form
            }).then(res=>{
                console.log(res);
                
            })
        }
    }
}
</script>

<style lang="less" scoped>
.post-comment{
    .comment-title{
        font-size: 18px;
        font-weight: normal;
        margin-bottom: 20px;
    }
    .input{
        margin-bottom: 10px;
    }
    .img-upload{
        margin-bottom: 30px;
    }
    /deep/.el-upload{
        width: 100px;
        height: 100px;
        line-height: 100px;
    }
    /deep/.el-upload-list__item-actions,
    /deep/.el-upload-list__item{
        width: 100px;
        height: 100px;
    }
    .no-comments{
        font-size: 14px;
        color: #999;
        padding: 30px;
        text-align: center;
        border: 1px dashed #dddddd;
    }
}
</style>