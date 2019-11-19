<template>
  <section class="container">
    <el-row type="flex" class="row-bg" :gutter="20">
        <!-- 文章详情 -->
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
        <!-- 相关攻略 -->
        <el-col :span="7">
            <h4 class="aside-title">相关攻略</h4>
            <recommendList :data="item" v-for="(item,index) in recommendPostData" :key="index"/>
        </el-col>
    </el-row>
  </section>
</template>

<script>
import postRender from '@/components/post/postRender';
import postComment from '@/components/post/postComment';
import recommendList from '@/components/post/recommendList';
export default {
    components:{
        postRender,
        postComment,
        recommendList
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
            dialogVisible: false,

            //相关文章数据
            recommendPostData:[]
        }
    },
    beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
        this.getDetailPost(to.query.id);
        next()
    },
    mounted(){
        const {id}=this.$route.query;
        this.postId=id;

        this.getDetailPost(id);

        this.getRecommendPostData(id);
    },

    methods:{
        getDetailPost(id){
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
        //获取相关攻略文章
        getRecommendPostData(id){
            this.$axios({
            url:'/posts/recommend',
            params:{
                id
            }
            }).then(res=>{
                const {data}=res.data;
                console.log(data);

                this.recommendPostData=data;
            })
        },
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
        },
        handleRemove(file, fileList) {
        console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
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
.aside-title{
    font-weight: normal;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dddddd;
}
</style>