<template>
  <section class="container">
      <el-row type="flex"  justify="space-between">
        <!-- 侧边栏 -->
        <el-col :span="7">
          <div class="sidebar">
            <!-- 城市列表 -->
            <cityMenu :data="allMenuData" />

            <!-- 推荐城市 -->
            <div class="recommendCity">
              <div class="recommendCity-title">
                <span>推荐城市</span>
              </div>
              <img class="recommendCity-img" src="http://157.122.54.189:9093/images/pic_sea.jpeg">
            </div>
          </div>
        </el-col>

        <!-- 文章列表 -->
        <el-col :span="17">
          <div class="post-wrapper">
            <!-- 城市搜索 -->
            <div class="city-search">
              <el-input v-model="cityNameSearch" placeholder="请输入想去的地方，比如：'广州'">
                <el-button slot="append" icon="el-icon-search" @click="handleCitySearch"></el-button>
              </el-input>
              <div class="search-recommend">推荐 : 
                <span class="recommend" 
                v-for="(item,index) in recommendCity"
                :key="index" 
                @click="handleRecommend(item)"
                >
                  {{item}}
                </span>
              </div>
            </div>
            <!-- 标题 -->
            <div class="post-title">
              <el-row type="flex" justify="space-between" align="middle">
                <h4 class="title">推荐攻略</h4>
                <el-button type="primary" icon="el-icon-edit">写游记</el-button>
              </el-row>
            </div>
            <!-- 攻略文章 -->
            <div class="post-list">
              <postList :data="postItem" v-for="(postItem,index) in allPostData" :key="index"/>
            </div>
            <!-- 分页组件 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageIndex"
              :page-sizes="[3,5,10]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
          </div>
        </el-col>
      </el-row>
  </section>
</template>

<script>
import cityMenu from '@/components/post/cityMenu';
import postList from '@/components/post/postList';
export default {
  components:{
    cityMenu,
    postList
  },
  data(){
    return {
      cityNameSearch:'',

      recommendCity:[
        '广州','上海','北京'
      ],

      allMenuData:[],
      allPostData:[
        {
          images:[],
          account:{}
        }
      ],

      // 分页需要的变量
      pageSize:3,
      pageIndex:1,
      total:0
    }
  },
  mounted(){
      //获取城市菜单
      this.$axios({
          url:'/posts/cities',
          method:'get'
      }).then(res=>{
          const {data}=res.data;
          console.log(data);
          this.allMenuData=data;
      })

      this.getPostList()
  },

  methods:{
    //获取推荐菜单
    getPostList(){
      this.$axios({
        url:'/posts',
        method:'get',
        params:{
          city:this.cityNameSearch?this.cityNameSearch:null,
          _start:(this.pageIndex-1)*this.pageSize,
          _limit: this.pageSize
        }
      }).then(res=>{
        const {data,total}=res.data;
        console.log(data);
        
        this.allPostData=data;
        this.total=total;
      })
      
    },

    //切换多少条每页触发
    handleSizeChange(val){
      console.log(`每页 ${val} 条`);
      this.pageSize=val;
      this.pageIndex=1;
      this.getPostList();
    },

    // 点击页数触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex=val;
      this.getPostList();
    },

    //城市搜索
    handleCitySearch(){
      this.getPostList();
    },

    handleRecommend(city){
      this.cityNameSearch=city;
      this.getPostList();
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  width:1000px;
  margin:0 auto;
}
.sidebar{
  width: 260px;
  .recommendCity{
    margin-top: 20px;
    &-title{
      padding-bottom: 10px;
      border-bottom: 1px solid #dddddd;
    }
    &-img{
      margin-top: 10px;
      width: 100%;
      object-fit: cover;
    }
  }
}
.post-wrapper{
  margin: 20px 0;
  .search-recommend{
    padding: 10px 0;
    font-size: 12px;
    color: #666;
    .recommend{
      margin-right:5px;
      &:hover{
        color: #409eff;
        cursor: pointer;
      }
    }
  }
  .post-title{
    border-bottom: 1px solid #dddddd;
    .title{
      color: #409eff;
      font-size: 18px;
      font-weight: normal;
      border-bottom: 2px solid #409eff;
      line-height: 50px;
    }
  }
}
</style>