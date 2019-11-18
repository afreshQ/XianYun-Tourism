<template>
    <div class="contianer"  @mouseleave="isShowMenu=false">
        <div class="city-list">
            <div class="city-item" v-for="(item,index) in data" :key="index" @mouseover="showMenu(index)">
                <div class="city-item-content" >
                    <span class="item-txt">{{item.type}}</span>
                    <i class="el-icon-arrow-right"></i>
                </div>
            </div>
        </div>
        <div class="city-menu" v-if="isShowMenu">
            <ul>
                <li class="menu-item" v-for="(item,index) in data[menuIndex].children" :key="index" >
                    
                            <i class="number blue">{{index+1}}</i>
                        <div>
                            <el-link class="link" type="info" :underline="false" @click="sendCity(item.city)">
                                <strong class="city">{{item.city}}</strong>
                                <span class="desc">{{item.desc}}</span>
                            </el-link>
                        </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Array,
            default:[]
        }
    },
    data(){
        return {

            isShowMenu:false,

            menuIndex:0
        }
    },
    methods:{
        showMenu(index){
            this.isShowMenu=true;
            this.menuIndex=index;
        },
        sendCity(city){
            this.$emit('setSeacrhCity',city);
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
        &:hover{
            color: #409eff;
        }
        .item-txt{
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
        .blue{
            color:#409eff;
        }
        .link:hover .desc{
            color:#409eff;
        }
        .number{
            font-size: 20px;
            vertical-align: middle;
        }
        .city{
            margin: 0 10px;
        }
    }
}
</style>