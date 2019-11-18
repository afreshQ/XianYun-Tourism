<template>
  <section class="container">
    <el-row type="flex" class="row-bg" :gutter="40">
        <el-col :span="17">
            <!-- 面包屑导航 -->
            <div class="breadCrumbs">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
                    <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 文章详情渲染 -->
            <postRender :postData="postData"/>
            <!-- 用户功能 -->
             <div class="post-bar">
                <div class="icon"><i class="el-icon-chat-line-square"></i><p>评论({{postData.comments.length | zerofill}})</p></div>
                <div class="icon"
                @click="handleStar"
                ><i class="el-icon-star-off"></i><p>收藏</p></div>
                <div class="icon"><i class="el-icon-share"></i><p>分享</p></div>
                <div class="icon"
                @click="handleLike"
                ><i class="el-icon-thumb"></i><p>点赞({{postData.like | zerofill}})</p></div>
            </div>

            <!-- 文章评论 -->
            <div class="post-comment">
                <h4 class="comment-title">评论</h4>
                <el-input
                class="input"
                type="textarea"
                :rows="2"
                placeholder="说点什么把..."
                v-model="textarea"
                resize="none">
                </el-input>
                <el-row type="flex" justify="space-between" class="img-upload">
                    <el-col>
                        <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" class="upload-img" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-col>
                    <el-col :span="3">
                          <el-button type="primary">提交</el-button>
                    </el-col>
                </el-row>
                <div class="no-comments" v-if="postData.comments.length===0">
                                    暂无评论，赶紧抢占沙发！
                </div>
                <postComment :postId="postId" v-else/>

            </div>
        </el-col>
        <el-col :span="7">
            2
        </el-col>
    </el-row>
  </section>
</template>

<script>
import postRender from '@/components/post/postRender';
import postComment from '@/components/post/postComment';
export default {
    components:{
        postRender,
        postComment
    },
    data(){
        return {
            //该文章id
            postId:null,
            //文章数据
            postData:{
                city:{},
                comments:[],
                account:{}
            },

            textarea:'',

            //图片上传组件
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    mounted(){
        const {id}=this.$route.query;
        this.postId=id;

        this.$axios({
            url:'/posts',
            params:{
                id
            }
        }).then(res=>{
            const {data}=res.data;
            console.log(data[0]);

            this.postData=data[0];

        })
    },

    methods:{
        //收藏文章
        handleStar(){
            this.$axios({
                url:'/posts/star',
                headers:{
                    Authorization:"Bearer "+this.$store.state.user.userInfo.token
                },
                params:{
                    id:this.postId
                }
            }).then(res=>{
                this.$message.success(res.data.message);
            })
        },

        //点赞文章
        handleLike(){
             this.$axios({
                url:'/posts/like',
                headers:{
                    Authorization:"Bearer "+this.$store.state.user.userInfo.token
                },
                params:{
                    id:this.postId
                }
            }).then(res=>{
                this.$message.success(res.data.message);
            })
        }
    },

    filters:{
        zerofill(value){

            return value?value:0
        }
    }
}
</script>

<style lang="less" scoped>
.container{
  width:1000px;
  margin:20px auto;
}
.post-bar{
    padding: 50px 0 30px 0;
    display: flex;
    justify-content: center;
    .icon{
        margin: 0 30px;
        display: flex;
        flex-direction: column;
        align-items: center;
        i{
            font-size: 40px;
            color: #409eff;
        }
        p{
            color: #999999;
            font-size: 14px;
            margin-top: 5px;
        }
    }
}

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
    .no-comments{
        font-size: 14px;
        color: #999;
        padding: 30px;
        text-align: center;
        border: 1px dashed #dddddd;
    }
}
</style>