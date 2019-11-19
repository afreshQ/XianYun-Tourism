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
            <!-- 用户交换功能 -->
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
            <postComment/>

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

            //相关文章数据
            recommendPostData:[]
        }
    },
    //处理点击相关文章能跳到对应文章详情
    beforeRouteUpdate (to, from, next) {
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
        //获取当前文章数据
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
        cursor: pointer;
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

.aside-title{
    font-weight: normal;
    font-size: 18px;
    padding-bottom: 10px;
    border-bottom: 1px solid #dddddd;
}
</style>