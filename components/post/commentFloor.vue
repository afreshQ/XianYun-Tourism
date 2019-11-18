<template>
  <div class="floor-item">
    <floor v-if="data.parent" :data="data.parent"/>
    <div class="header">
        <div class="userInfo">
            <span class="username">{{data.account.nickname}}</span>
            <i>{{data.account.created_at | time}}</i>
        </div>
        <span>1</span>
    </div>
    <div class="content">
        <p>{{data.content}}</p>
        <el-row v-if="data.pics.length>0" class="cmt-imgs">
            <el-image 
            v-for="(item,index) in data.pics" 
            :key="index"
            style="width: 100px; height: 100px"
            :src="$axios.defaults.baseURL+item.url" 
            :preview-src-list="[$axios.defaults.baseURL+item.url]">
            </el-image>
        </el-row>
    </div>
    <div class="reply"><el-link type="primary">回复</el-link></div>
  </div>
</template>

<script>
import moment from "moment";
export default {
    name:'floor',
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    filters:{
        time(val){
            return moment(val).format('YYYY-MM-DD hh:mm')
        }
    }
}
</script>

<style lang="less" scoped>
.floor-item{
    padding: 2px;
    border: 1px solid #dddddd;
    margin-top: -1px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        .userInfo{
            display: flex;
            align-items: center;
            .username{
                color: #666666;
                margin-right: 10px;
            }
            i{
                font-size: 12px;
                color: #999;
            }
        }
    }
    .content{
        p{
            margin-top: 10px;
        }
        .cmt-imgs{
            margin-top: 10px;
        }
    }
    .reply{
        align-self: flex-end;
    }
}
</style>