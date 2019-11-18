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
            <div class="detial-post">
                <div class="post-header">
                    <h1 class="post-title">{{postData.title}}</h1>
                    <div class="release-news">
                        <span>攻略 : {{postData.city.created_at}}</span>
                        <span>阅读 : {{postData.watch}}</span>
                    </div>
                </div>
                <div class="post-content" v-html="postData.content"></div>
                <div class="post-footer">
                    <div class="icon"><i class="el-icon-chat-line-square"></i><p>评论({{postData.comments.length}})</p></div>
                    <div class="icon"><i class="el-icon-star-off"></i><p>收藏</p></div>
                    <div class="icon"><i class="el-icon-share"></i><p>分享</p></div>
                    <div class="icon"><i class="el-icon-thumb"></i><p>点赞({{postData.like}})</p></div>
                </div>
            </div>
        </el-col>
        <el-col :span="7">
            2
        </el-col>
    </el-row>
  </section>
</template>

<script>
export default {
    data(){
        return {
            postData:{
                city:{},
                comments:[]
            }
        }
    },
    mounted(){
        const {id}=this.$route.query;

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
    }
}
</script>

<style lang="less" scoped>
.container{
  width:1000px;
  margin:20px auto;
}
.detial-post{
    .post-header{
        .post-title{
            padding: 20px 0;
            font-size: 32px;
            border-bottom: 1px solid #dddddd;
        }
        .release-news{
            padding: 20px;
            float: right;
            span{
                margin-left: 15px;
                color: #999999;
            }
        }
    }
    .post-content{
        clear: both;
        /deep/p{
            line-height: 24px;
        }
        /deep/span > img{
            margin: 10px 0;
            width: 100%;
            object-fit: cover;
        }
        /deep/p > img{
            margin: 10px 0;
            object-fit: cover;
        }
    }

    .post-footer{
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
}
</style>