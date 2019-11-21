<template>
  <section class="container">
    <!-- 面包屑 -->
      <el-row>
           <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/hotel' }">酒店</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/hotel' }">{{detialData.real_city+'酒店预订'}}</el-breadcrumb-item>
                <el-breadcrumb-item>{{detialData.name}}</el-breadcrumb-item>
            </el-breadcrumb>
      </el-row>
      <!-- 酒店名称 -->
      <el-row class="module">
        <h4>{{detialData.name}}</h4>
        <p>{{detialData.alias}}</p>
        <span><i class="el-icon-location"></i>{{detialData.address}}</span>
      </el-row>
      <!-- 预览图 -->
      <el-row :gutter="20"  class="module">
        <el-col :span="16" style="height:350px">
          <img class="interiorView" :src="interiorView" alt="">
        </el-col>
        <el-col :span="8" class="right">
          <div class="smallBox" v-for="(srcItem,index) in imgs" :key="index">
            <img class="interiorView" :src="srcItem" alt="" @click="toggleImg(srcItem)">
            </div>
        </el-col>
      </el-row>
      <!-- 价格来源 -->
      <el-row  class="module">
        <el-row class="module-item field" type="flex" justify="space-between" align="middle">
          <el-col :span="4">价格来源</el-col>
          <el-col :span="4">低价房型</el-col>
          <el-col :span="4">最低价格/每晚</el-col>
        </el-row>
        <el-row class="module-item data" type="flex" justify="space-between" align="middle"
        v-for="(item,index) in detialData.products"
        :key="index">
          <el-col :span="4">{{item.name}}</el-col>
          <el-col :span="4">{{item.bestType}}</el-col>
          <el-col :span="4">
            <el-row type="flex" :gutter="10" justify="start">
              <el-col :span="7"><span class="price">￥{{item.price}}</span></el-col>
              <el-col :span="7">起<i class="el-icon-arrow-right"></i></el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-row>

      <!-- 地图模块 -->
      <el-row class="module">
        <el-col>
        </el-col>
        <el-col></el-col>
      </el-row>

      <!-- 入职须知 -->
      <el-row class="module">
        <el-row type="flex" class="module-item2">
          <el-col :span="5">基本信息</el-col>
          <el-col>
            <el-row type="flex" justify="space-between">
              <el-col :span="5">入住时间: 14:00之后</el-col>
              <el-col :span="5">离店时间: 12:00之前</el-col>
              <el-col :span="5">{{detialData.creation_time}}/{{detialData.renovat_time}}</el-col>
              <el-col :span="5">酒店规模:{{detialData.roomCount}}间房</el-col>
            </el-row>
          </el-col>
        </el-row>
         <el-row type="flex" class="module-item2">
          <el-col :span="5">主要设施</el-col>
          <el-col>
             <el-row type="flex" justify="start">
              <el-col v-for="(item,index) in detialData.hotelassets" :key="index">
                {{item.name}}
              </el-col>
             </el-row>
          </el-col>
        </el-row>
         <el-row type="flex" class="module-item2">
          <el-col :span="5">停车服务</el-col>
          <el-col>1</el-col>
        </el-row>
         <el-row type="flex" class="module-item2">
          <el-col :span="5">品牌信息</el-col>
          <el-col>1</el-col>
        </el-row>
      </el-row>

      <!-- 用户评论 -->
      <el-row class="module">
        <h4>{{detialData.all_remarks+detialData.good_remarks+detialData.bad_remarks}}条真实用户评论</h4>
        <el-row class="module">
          <el-row>
            <el-col :span="5">
              <div>总评数:{{detialData.all_remarks}}</div>
              <div>好评数:{{detialData.good_remarks}}</div>
              <div>差评数:{{detialData.bad_remarks}}</div>
            </el-col>
            <el-col>
              
            </el-col>
          </el-row>
        </el-row>
      </el-row>
  </section>
</template>

<script>
export default {
    data(){
      return {
        detialData:{
          pics:[]
        },

        interiorView:'/img/default.jpg',

        imgs:[
          '/img/default.jpg',
          '/img/1.jpg',
          '/img/2.jpg',
          '/img/3.jpg',
          '/img/4.jpg',
          '/img/5.jpg',
        ]
      }
    },
    mounted(){
      this.$axios({
        url:'/hotels',
        params:this.$route.query
      }).then(res=>{
        console.log(res.data);
        const {data}=res.data;
        this.detialData=data[0];
        // this.interiorView=data[0].photos;
      })
    },
    methods:{
      toggleImg(src){
        this.interiorView=src;
      }
    }
}
</script>

<style lang="less" scoped>
.container{
    width: 1000px;
    margin: 20px auto;
    .interiorView{
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .right{
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      .smallBox{
        // width: 45%;
        height: 110px;
        flex: 45%;
        padding: 0 10px 10px 0;
        cursor: pointer;
      }
    }
    .module{
      padding:20px 0;
      &-item{
        font-size: 14px;
        padding: 15px 0;
        border-bottom: 1px solid #ebeef5;
      }
      &-item2{
        font-size: 14px;
        padding: 20px 0;
        border-bottom: 1px solid #ebeef5;
      }
      .price{
        color: #ff9900;
        margin-right: 10px;
      }
    }
    
}

.field{
  color: #909399;
  font-weight: 700;
}
.data{
  color: #606266;
  cursor: pointer;

  &:hover{
    background-color: #f5f7fa;
  }
}
</style>