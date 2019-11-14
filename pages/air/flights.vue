<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <flightsFilters/>
                
                <!-- 航班头部布局 -->
                <flightsListHead/>
                
                
                <!-- 航班信息 -->
                <flightsItem :data="item" v-for="(item,index) in dataList" :key="index"/>

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
import flightsFilters from '@/components/air/flightsFilters';
import moment from "moment";

export default {
    components:{
      flightsListHead,
      flightsItem,
      flightsFilters,
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

    // 封装显示多少的列表，监听所用到变量=>页数|条数|挂载完的值
    computed:{
        //存放列表机票数据
        dataList(){
            const arr=this.flightsData.flights.slice(
                (this.pageIndex-1)*this.pageSize,
                this.pageSize*this.pageIndex);

            return arr;
        }
    },

    mounted(){
        this.$axios({
            url:'/airs',
            method:'get',
            params:this.$route.query
        }).then(res=>{
            
            this.flightsData=res.data;

            //总数量
            this.total=this.flightsData.total;
        })
    },


    methods:{
        // 选择多少条每页触发
        handleSizeChange(val){
            this.pageSize=val;
            //默认回到第一页
            this.pageIndex=1;
        },

        // 点击页数触发
        handleCurrentChange(val){
            this.pageIndex=val;
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