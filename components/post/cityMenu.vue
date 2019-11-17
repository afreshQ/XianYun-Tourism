<template>
    <div class="contianer" @mouseout="isShowMenu=false">
        <div class="city-list">
            <div class="city-item" v-for="(item,index) in allMenuData" :key="index" >
                <div class="city-item-content" @mouseover="showMenu(index)">
                    <span>{{item.type}}</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
        </div>
        <div class="city-menu" v-if="isShowMenu">
            <ul>
                <li class="menu-item" v-for="(item,index) in menuData" :key="index">
                    <el-link>
                          <i class="number">{{index}}</i>
                          <strong class="city">{{item.city}}</strong>
                          <span>{{item.desc}}</span>
                    </el-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            allMenuData:[],

            isShowMenu:false,

            menuData:[]
        }
    },
    mounted(){

        this.$axios({
            url:'/posts/cities',
            method:'get'
        }).then(res=>{
            const {data}=res.data;
            console.log(data);
            this.allMenuData=data;
        })
    },

    methods:{
        showMenu(index){
            this.isShowMenu=true;
            this.menuData=this.allMenuData[index].children;
        }
    }
}
</script>

<style lang="less" scoped>
.contianer{
    margin-top: 20px;
    position: relative;
}
.city-list{
    width: 260px;
    border: 1px solid #dddddd;
    border-bottom: 0;
}
.city-item{
    width: 100%;
    line-height: 40px;
    &-content{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        border-bottom: 1px solid #dddddd;
        span{
            font-size: 14px;
        }
        i{
            font-size: 16px;
        }
    }
}
.city-menu{
    width: 350px;
    border: 1px solid #dddddd;
    position:absolute;
    top: 0;
    left: 259px;
    padding: 10px 20px;
    background-color:#fff;
    z-index: 3;
    .menu-item{
        line-height: 38px;
        font-size: 14px;
        display: flex;
        align-items: center;
        .number{
            font-size: 20px;
        }
        .city{
            margin: 0 10px;
        }
    }
}
</style>