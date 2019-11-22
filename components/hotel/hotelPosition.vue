<template>
  <el-row class="hotel-position" type="flex" justify="start" :gutter="10">
      <el-col :span="13">
          <el-row class="row">
               <el-col :span="3">区域:</el-col>
               <el-col :span="21">
                  <el-row :class="{hide:!isShowMore,show:isShowMore}">
                    <span class="all scenic"><el-link :underline="false">全部</el-link></span>
                    <span class="scenic" v-for="(item,index) in scenic" :key="index"><el-link>{{item.name}}</el-link></span>
                  </el-row>
                  <el-link class="more" :underline="false" @click="isShowMore=!isShowMore"> <i class="el-icon-more"></i> 等{{scenic.length}}个区域</el-link>
               </el-col>
          </el-row>
          <el-row class="row">
                <el-col :span="3">攻略:</el-col>
                <el-col :span="21">
                    北京，你想要的都能在这找到。博古通今，兼容并蓄，天下一城，如是帝都。 景点以故宫为中心向四处辐射；地铁便宜通畅，而且覆盖绝大多数景点。 由于早上有天安门升旗仪式，所以大多数人选择在天安门附近住宿。
                </el-col>
          </el-row>
          <el-row class="row">
                <el-col :span="3">均价:</el-col>
                <el-col>
                    
                </el-col>
          </el-row>
      </el-col>
      <el-col :span="11" style="width:400px;height:260px">
          <div id="container"></div>
      </el-col>
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
    watch:{
        data(val){
            if(val.length===0){
                this.scenic=[]
            }else{

                this.scenic=val[0].scenic;
            }
            // this.hotelData=val;

            window.onLoad  = ()=>{
                var map = new AMap.Map('container',{
                    resizeEnable: true,
                    zoom: 13, //地图显示的缩放级别
                });
                
                // 多个点实例组成的数组
                // var markerList = [];
                val.forEach(e => {
                    var marker = new AMap.Marker({
                        position: new AMap.LngLat(e.location.longitude, e.location.latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                        title: e.name,
                    });
                    // markerList.push(marker)
                    map.add(marker);
                    
                });
                map.setFitView();
            }

            var url = 'https://webapi.amap.com/maps?v=1.4.15&key=04721202c08959eb5940c770136b67f5&callback=onLoad';
            var jsapi = document.createElement('script');
            jsapi.charset = 'utf-8';
            jsapi.src = url;
            document.head.appendChild(jsapi);
        }
    },

    mounted(){
       
    },
    data(){
        return {
            isShowMore:false,
            // hotelData:[],
            scenic:[]
        }
    }
}
</script>

<style lang="less" scoped>

.hotel-position{
    .row{
        font-size: 14px;
        color: #666;
        margin-bottom:20px;
    }
    .all{
        background: #eee;
        text-decoration: none;
        color: #999;
    }
    .scenic{
        margin-right: 20px;
        padding: 0 2px;
        display: inline-block;
        cursor: pointer;
        &:hover{
            color: #0099ff;
        }
    }
    .more{
        line-height: 20px;
        margin-right: 20px;
        padding: 0 2px;
        cursor: pointer;
    }
    #container{
        width: 400px;
        height: 260px;
    }
}


.hide{
    height: 45px ;
    overflow: hidden;
}
.show{
    height: 100%;
}
</style>