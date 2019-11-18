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
        </el-col>
        <el-col :span="7">
            2
        </el-col>
    </el-row>
  </section>
</template>

<script>
import postRender from '@/components/post/postRender';
export default {
    components:{
        postRender
    },
    data(){
        return {
            postData:{
                
                city:{},
                comments:[]
            },

            //该文章id
            postId:null
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
</style>