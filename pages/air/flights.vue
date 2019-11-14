<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <div>
                    
                </div>
                
                <!-- 航班头部布局 -->
                <flightsListHead/>
                
                
                <!-- 航班信息 -->
                <flightsItem :data="item" v-for="(item,index) in flightsData.flights" :key="index"/>

                  <!-- 分页 -->
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageIndex"
                :page-sizes="[5, 10, 15]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>

            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
    </section>
</template>

<script>
import flightsListHead from '@/components/air/flightsListHead';
import flightsItem from '@/components/air/flightsItem';
import moment from "moment";

export default {
    components:{
      flightsListHead,
      flightsItem
    },
    data(){
        return {
            flightsData:{
                flights:[]
            },

            //分页
            pageSize:5,
            pageIndex:1,
            total:0
        }
    },

    mounted(){
        this.$axios({
            url:'/airs',
            method:'get',
            params:this.$route.query
        }).then(res=>{
            
            this.flightsData=res.data;
        })
    },


    methods:{
        // 选择多少条每页触发
        handleSizeChange(){

        },

        // 点击页数触发
        handleCurrentChange(){

        }
    }
}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>