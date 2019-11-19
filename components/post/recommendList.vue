<template>
  <nuxt-link :to="`/post/detialPost?id=${data.id}`">
    <el-row class="recommend-item" justify="space-between">
        <el-col :span="10"><img class="item-img" src="/img/default.jpg" alt=""></el-col>
        <el-col :span="14">
           <div class="item-text">
                <div class="title">{{data.title}}</div>
                <div class="desc">{{data.created_at | timeFormat}}  阅读{{data.watch?data.watch:0}}</div>
            </div>
        </el-col>
  </el-row>
  </nuxt-link>
</template>

<script>
import moment from "moment";
export default {
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    filters:{
        timeFormat(val){
            return moment(val).format('YYYY-MM-DD hh:mm')
        }
    }
}
</script>

<style lang="less" scoped>
.recommend-item{
    padding: 20px 0;
    // height: 80px;
    display: flex;

    .item-img{
        width: 100px;
        height: 80px;
    }
    .item-text{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title{
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
        .desc{
            font-size: 12px;
            color: #999;
        }
    }
}
</style>