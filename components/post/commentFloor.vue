<template>
  <div class="floor-item" @mouseenter="isShowRely=!isShowRely" @mouseleave="isShowRely=!isShowRely">
    <floor v-if="data.parent" :data="data.parent" :floorLength="floorLength-1" @reply='reply'/>
    <div class="pad">
        <div class="header">
            <div class="userInfo">
                <span class="username">{{data.account.nickname}}</span>
                <i>{{+data.account.created_at | time}}</i>
            </div>
            <span>{{floorLength}}</span>
        </div>
        <div class="content">
            <p>{{data.content}}</p>
            <el-row v-if="data.pics.length>0" class="cmt-imgs">
                <img 
                v-for="(item,index) in data.pics" 
                :key="index"
                style="width: 100px; height: 100px;cursor: pointer;"
                :src="$axios.defaults.baseURL+item.url" 
                @click="fanDa($axios.defaults.baseURL+item.url)"
                >
                <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-row>
        </div>
        <div class="reply" :class="{hide:!isShowRely,show:isShowRely}"><el-link type="primary" @click='reply'>回复</el-link></div>
    </div>
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
        },
        floorLength:{
            type:Number
        }
    },
    data(){
        return {
            isShowRely:false,

            // 图片预览
            dialogVisible:false,
            dialogImageUrl:''
        }
    },
    filters:{
        time(val){
            return moment(val).format('YYYY-MM-DD hh:mm')
        }
    },

    methods:{
        reply(Obj) {

            if (Obj.id) {
                this.$emit('reply', Obj)
            }else {
                this.$emit('reply', {name:this.data.account.nickname,id:this.data.id})
            }
        },
        fanDa(src){
            this.dialogImageUrl=src;
            this.dialogVisible=true;
        }
    }

}
</script>

<style lang="less" scoped>
.floor-item{
    border-radius: 6px;
    padding: 2px;
    border: 1px solid #dddddd;
    margin-top: -1px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .pad{
        padding: 5px 10px 3px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
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
.hide{
    visibility: hidden;
}
.show{
    visibility: visible;
}
</style>