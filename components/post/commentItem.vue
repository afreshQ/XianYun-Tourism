<template>
  <div class="cmt-item" @mouseenter="isShowRely=!isShowRely" @mouseleave="isShowRely=!isShowRely">
    <div class="header">
        <div class="userInfo">
            <img class="avater" :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt="">
            <span class="username">{{data.account.nickname}}</span>
            <i>{{data.account.created_at | time}}</i>
        </div>
        <span>{{floorLength}}</span>
    </div>
    
    <div class="content">
        <div class="cmt-floor" v-if="data.parent">
            <commentFloor :data="data.parent" :floorLength="floorLength-1"/>
        </div>
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
    <div class="reply" :class="{hide:!isShowRely,show:isShowRely}"><el-link type="primary">回复</el-link></div>
  </div>
</template>

<script>
import commentFloor from '@/components/post/commentFloor';
import moment from "moment";
export default {
    components:{
        commentFloor
    },
    data(){
        return {
            isShowRely:false,
            floorLength:1
        }
    },
    mounted(){
        this.floorLength=this.countParent(1,this.data);
    },
    methods:{
        countParent(num, obj){
            if (obj.parent) {
                return this.countParent(num + 1, obj.parent)
            }else {
                // console.log(num);
                
                return num;
            }
        }
    },
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
.cmt-item{
    border-radius: 12px;
    padding: 20px 20px 5px;
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
            .avater{
                margin: 5px;
                width: 16px;
                height: 16px;
                vertical-align: middle;
            }
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
        padding-left: 30px;
        .cmt-floor{
            border-radius: 6px;
            background-color:#f4f4f5;
        }
        p{
            margin-top: 10px;
        }
        .cmt-imgs{
            margin-top: 10px;
        }
    }
    .reply{
        height: 24px;
        line-height: 24px;
        align-self: flex-end;
    }

}
.hide{
    visibility: hidden;
}
.show{
    visibility: visible;
}
</style>