<template>
    <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <flightsFilters :data="cacheFlightsData" @filtered="filtered"/>
                
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
                <FlightsAside/>
            </div>
        </el-row>
    </section>
</template>

<script>
import flightsListHead from '@/components/air/flightsListHead';
import flightsItem from '@/components/air/flightsItem';
import flightsFilters from '@/components/air/flightsFilters';
import FlightsAside from "@/components/air/flightsAside.vue"
import moment from "moment";

export default {
    components:{
      flightsListHead,
      flightsItem,
      flightsFilters,
      FlightsAside
    },
    data(){
        return {
            flightsData:{
                flights:[]
            },


            //分页
            pageSize:5,
            pageIndex:1,
            total:0,

            //缓存的一份含所有机票信息的新数据
            cacheFlightsData:{
                flights:[],
                info:{},
                options:{}
            }
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

    //设置组件守卫
    beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        this.getAirListByQuery(to.query);
        next();
        
    },

    mounted(){
       this.getAirListByQuery(this.$route.query);
    },


    methods:{
        getAirListByQuery(query){
             this.$axios({
                url:'/airs',
                method:'get',
                params:query
            }).then(res=>{
                
                this.flightsData=res.data;

                //缓存一份新的数据用于条件过滤，因为一直会有所有的数据，不会影响修改,
                //而flightsData会被修改，再传到子组件的时候已经时过滤一遍的了,故要用到新的数据,
                //使用es6的...语法拆分一份新数据（不同的内存地址）
                this.cacheFlightsData = {...res.data};
                //总数量
                this.total=this.flightsData.total;
            })
        },
        // 选择多少条每页触发
        handleSizeChange(val){
            this.pageSize=val;
            //默认回到第一页
            this.pageIndex=1;
        },

        // 点击页数触发
        handleCurrentChange(val){
            this.pageIndex=val;
        },

        //子组件传过来的已通过过滤的列表
        filtered(arr){
            this.flightsData.flights=arr;
            this.total=arr.length;
            //回到第一页
            this.pageIndex=1;
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