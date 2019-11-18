<template>
   <div>
    <el-row class="post-item" type="flex" justify="space-between" v-if="data.images.length<3">
        <el-col :span="8">
            <img class="item-img" :src="data.images.length>0?data.images[0]:'/img/default.jpg'" alt="">
        </el-col>
        <el-col :span="16">
            <div class="item-text">
                <h4 class="item-title"><nuxt-link to="#">{{data.title}}</nuxt-link></h4>
                <p class="item-content">
                    {{data.summary}}
                </p>
                <div class="item-footer">
                    <div class="info-left">
                        <span>
                            <i class="el-icon-location-outline"></i>
                            {{data.cityName}}
                        </span>
                        <div class="userInfo">
                            by
                            <el-link type="info" :underline="false">
                                <img class="avater" :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt="">
                                <span class="username">{{data.account.nickname}}</span>
                            </el-link>
                        </div>
                        <span> <i class="el-icon-view"></i> {{data.watch | zerofill}}</span>
                    </div>
                    <span class="info-right">{{data.like | zerofill}}赞</span>
                </div>
            </div>
        </el-col>
    </el-row>
    <el-row class="post-item" type="flex" justify="space-between" v-else>
        <el-col :span="24">
            <div class="item-text">
                <h4 class="item-title"><nuxt-link to="#">{{data.title}}</nuxt-link></h4>
                <p class="item-content">
                    {{data.summary}}
                </p>
                <div class="item-images">
                    <img class="item-img" :src="data.images.length>0?data.images[0]:'/img/default.jpg'" alt="">
                    <img class="item-img" :src="data.images.length>0?data.images[1]:'/img/default.jpg'" alt="">
                    <img class="item-img" :src="data.images.length>0?data.images[2]:'/img/default.jpg'" alt="">
                </div>
                <div class="item-footer">
                    <div class="info-left">
                        <span>
                            <i class="el-icon-location-outline"></i>
                            {{data.cityName}}
                        </span>
                        <div class="userInfo">
                            by
                            <el-link type="info" :underline="false">
                                <img class="avater" :src="$axios.defaults.baseURL+data.account.defaultAvatar" alt="">
                                <span class="username">{{data.account.nickname}}</span>
                            </el-link>
                        </div>
                        <span> <i class="el-icon-view"></i> {{data.watch | zerofill}}</span>
                    </div>
                    <span class="info-right">{{data.like | zerofill}}赞</span>
                </div>
            </div>
        </el-col>
    </el-row>
   </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
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
.post-item{
    padding: 20px 0;
    .item-img{
        display: block;
        width: 220px;
        height: 150px;
        object-fit: cover;
    }
    .item-text{
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        height: 100%;
        .item-title{
            font-size: 18px;
            font-weight: normal;
            margin-bottom: 15px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            &:hover{
                color: #409eff;
            }
        }
        .item-content{
            line-height: 24px;
            flex: 1;
            font-size: 14px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
            overflow: hidden;
            margin-bottom: 15px;
        }
        .item-images{
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }
        .item-footer{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .info-left{
                font-size: 12px;
                display: flex;
                color: #999;
                display: flex;
                align-items: center;
            }
            .info-right{
                color: #409eff;
            }
        }
    }
    .userInfo{
        display: flex;
        align-items: center;
        margin: 0 10px;
        .avater{
            margin: 5px;
            width: 16px;
            height: 16px;
            vertical-align: middle;
        }
        .username{
            color: #409eff;
        }
    }
}

</style>