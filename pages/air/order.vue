<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->
            <OrderForm :data="infoData"/>

            <!-- 侧边栏 -->
            <OrderAside :data="infoData"/>
        </el-row>
    </div>
</template>

<script>
import OrderForm from "@/components/air/orderForm.vue";
import OrderAside from "@/components/air/OrderAside.vue";
export default {
    components: {
        OrderForm,
        OrderAside
    },
    data(){
      return {
          // 机票信息
            infoData:{
                insurances:[],
                seat_infos:{}
            }
      }
    },
    //获取机票信息
    created(){
        const {id,seat_xid}=this.$route.query;
        
        this.$axios({
            url:'/airs/'+id,
            headers:{
                Authorization:this.$store.state.user.userInfo.token
            },
            params: {
                seat_xid
            }
        }).then(res=>{
            console.log(res.data);
            this.infoData=res.data
        })
    },
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>