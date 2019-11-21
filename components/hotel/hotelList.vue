<template>
    <el-row class="hotel-list">
         <el-row type="flex" justify="space-between" class="hotel-item" v-for="(item,index) in data" :key="index">
             <!-- 酒店封面 -->
            <el-col :span="6">
                <nuxt-link to="#">
                    <el-image
                    style="width: 320px; height: 210px"
                    :src="item.photos">
                    </el-image>
                </nuxt-link>
            </el-col>
            <!-- 酒店描述 -->
            <el-col :span="9">
                <!-- 酒店标题 -->
               <el-row type="flex" justify="space-between" align="middle">
                  <el-col :span="20"> <h4 class="hotel-name"> <nuxt-link :to="`/hotel/detialHotel?id=${item.id}`">{{item.name}}</nuxt-link></h4></el-col>
                  <el-col :span="4"> <span class="alias">{{item.hoteltype.name}}</span></el-col>
               </el-row>
               <!-- 英文描述 -->
               <div class="alias">{{item.alias}}</div>
               <!-- 分级 -->
               <el-row type="flex" justify="space-between" class="grading" align="middle">
                   <el-col :span="8">{{item.stars}}分</el-col>
                   <el-col :span="8">
                       <div>{{item.all_remarks}}条评论</div>
                   </el-col>
                   <el-col :span="8">
                       <div>20篇游记</div>
                   </el-col>
               </el-row>
               <!-- 位置 -->
               <el-row>
                   <div class="address"><i class="el-icon-location"></i>{{item.address}}</div>
               </el-row>
            </el-col>
            <!-- 酒店友链 -->
            <el-col :span="5">
                <el-row 
                class="product-item" 
                type="flex" 
                justify="space-between" 
                align="middle" 
                v-for="(productItem,index) in item.products" 
                :key="index">
                    <el-col>
                        <span>{{productItem.name}}</span>
                    </el-col>
                    <el-col>
                        <div><span class="price">￥{{productItem.price}}</span>起<i class="el-icon-arrow-right"></i></div>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <!-- 分页 -->
        <el-row>
          
        </el-row>
    </el-row>
</template>

<script>
export default {
    props:{
        data:{
            type:Array,
            default:[]
        }
    },

    // data(){
    //     return {
    //     }
    // }
}
</script>

<style lang="less" scoped>
// .hotel-list{

// }
.hotel-item{
    padding: 25px 0;
    .hotel-name{
        font-size: 24px;
        font-weight: 400;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .alias{
        color: #999;
    }
    .grading{
        padding: 15px 0;
    }
    .address{
        color: #666;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .product-item{
        padding: 12px;
        border-bottom: 1px solid #ebeef5;
        color: #606266;
        .price{
            color: #ff9900;
        }
    }
}  
</style>