<template>
  <section class="container">
    <el-row>
       <!-- 面包屑导航 -->
        <div class="breadCrumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>酒店</el-breadcrumb-item>
                <el-breadcrumb-item>{{cityName+'酒店预订'}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- 酒店搜索 -->
        <el-form ref="form" class="form">
         <el-row type="flex" justify="start" :gutter="20">
           <el-col>
              <el-form-item>
                <el-autocomplete
                v-model="searchCity"
                placeholder="目的地"
                :fetch-suggestions="querySearch"
                @select="handleSelect"
                @blur="handleBlur"
                ></el-autocomplete>
              </el-form-item>
           </el-col>
           <el-col>
              <el-form-item>
                <el-date-picker
                v-model="selectDate"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="至"
                start-placeholder="入住日期"
                end-placeholder="离店日期">
                </el-date-picker>
              </el-form-item>
           </el-col>
           <el-col>
            <el-form-item>
              <el-input 
              placeholder="人数未定"
              v-model="personLabel" 
              suffix-icon="el-icon-user"
              @focus="isShowSelect=true"
              ></el-input>

              <!-- 隐藏的选择器 -->
              <el-row class="hide-select" v-if="isShowSelect">
                <el-row type="flex" justify="space-between">
                  <el-col :span="8">
                    <span>每间</span>
                  </el-col>
                  <el-col :span="16">
                    <el-row type="flex" :gutter="10">
                      <el-col>
                          <el-select v-model="person.adult" placeholder="成人人数" size="mini">
                            <el-option
                              v-for="item in 7"
                              :key="item"
                              :label="item"
                              :value="item">
                            </el-option>
                          </el-select>
                      </el-col>
                      <el-col>
                          <el-select v-model="person.child" placeholder="儿童人数" size="mini">
                            <el-option
                              v-for="item in 5"
                              :key="item"
                              :label="item-1"
                              :value="item-1">
                            </el-option>
                          </el-select>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="hide-select-btn" type="flex" justify="end">
                    <el-button type="primary" size="mini" @click="personSubmit">提交</el-button>
                </el-row>
              </el-row>
            </el-form-item>
           </el-col>
          
           <el-col>
            <el-form-item>
              <el-button type="primary" @click="checkPrice">查看价格</el-button>
            </el-form-item>
           </el-col>

         </el-row>
         
        </el-form>

        <!-- 地图部分 -->
        <hotelPosition :data="hotelData"/>
        
        <!-- 筛选 -->
        <el-row style="height:80px">

        </el-row>

        <!-- 酒店列表 -->
        <hotelList :data="hotelData"/>

        <!-- 分页 -->
        <el-row type="flex" justify="end">
          <el-pagination
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-size="5"
          layout="total,prev, pager, next, jumper"
          :total="total">
          </el-pagination>
        </el-row>
    </el-row>
  </section>
</template>

<script>
import hotelList from '@/components/hotel/hotelList';
import hotelPosition from '@/components/hotel/hotelPosition';
export default {
  components:{
    hotelList,
    hotelPosition
  },
  data(){
    return {
      //面包屑城市名称
      cityName:'',
      //下拉城市列表
      cities:[],
      //搜索框里的城市名
      searchCity:'',
      //是否显示人数选择框
      isShowSelect:false,
      //选择时间
      selectDate:[],
      //条件
      searchHotelForm:{
        city:null,
        enterTime:null,
        leftTime:null,
        _limit:null,
        _start:null
      },
      //人数输入框显示
      personLabel:'',
      //接受人数选择器的数据
      person:{
        adult:0,
        child:0
      },
      //酒店数据
      hotelData:[],


      // 分页
      pageIndex:1,
      total:0
    }
  },

  watch:{
    selectDate(){
      this.searchHotelForm.enterTime=this.selectDate[0];
      this.searchHotelForm.leftTime=this.selectDate[1];
    },
    //监听表单数据
    searchHotelForm:{
       handler(val, oldVal){
         this.getHotelData(this.searchHotelForm);
       },
      deep: true
    },
  },
  //没带上参数就带上默认的
  beforeRouteEnter (to, from, next) {

    if(!to.query.city){
      to.query.city=74;
      to.query.cityName='南京市'
    }
    next();
  },
  mounted(){
    const {city,cityName}=this.$route.query;
    this.searchHotelForm={
      city,
      enterTime:null,
      leftTime:null,
      _limit:5,
      _start:(this.pageIndex-1)*this.pageSize
    }
    this.cityName=cityName;
    this.searchCity=cityName;
    console.log(this.searchHotelForm);
    
    // this.getHotelData(this.searchHotelForm);
  },

  methods:{
    // 获取酒店信息
    getHotelData(query){
        this.$axios({
          url:'/hotels',
          params:query
        }).then(res=>{
          const {data,total}=res.data
          console.log('酒店数据',data);
          this.hotelData=data;
          this.total=total;
        })
    },
    //选择人数
    personSubmit(){
      const adult=this.person.adult+'成人';
      const child=!this.person.child?'':' '+this.person.child+'儿童';
      const str=adult+child
      this.personLabel=str;

      this.isShowSelect=false;
    },
    //目的地选择城市
    querySearch(value, cb){
        if(!value) return;
        this.$axios({
            url:'/airs/city',
            method:'get',
            params:{
                name:value
            }
        }).then(res=>{
            let {data}=res.data;
            this.cities=data.map(v=>{
                v.value=v.name
                return v;
            })
            cb(this.cities);
        })

    },

    // 城市下拉选择时触发
    handleSelect(item) {
        this.searchHotelForm.city = item.id;
        
        // this.getHotelData(this.searchHotelForm);
    },

    //处理输入框失去焦点的问题
    handleBlur(){
        if(this.cities.length===0||this.searchHotelForm.city==='') return;
        this.searchHotelForm.city=this.cities[0].id;
    },

    // 查看价格
    checkPrice(){
      this.getHotelData(this.searchHotelForm);
    },



    //分页
    // handleSizeChange(val){
    //   this.searchHotelForm._limit=val;
    //   this.searchHotelForm._start=0;
    //   this.pageIndex=1;
    // },
    handleCurrentChange(val){
      this.searchHotelForm._start=(val-1)*5;
    }
  }

}
</script>

<style lang="less" scoped>
.container{
  width:1000px;
  margin:20px auto;
}
.form{
  padding-top: 20px;
}
.hide-select{
  position: absolute;
  top:60px;
  padding: 12px;
  width: 325px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  z-index: 999;
  &-btn{
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px solid #dddddd;
  }
}
</style>