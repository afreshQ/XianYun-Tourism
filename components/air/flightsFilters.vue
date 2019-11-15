<template>
    <div class="filters">
        <el-row type="flex" class="filters-top" justify="space-between" align="middle">
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} - {{data.info.destCity}} 
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select 
                size="mini" 
                v-model="airport" 
                placeholder="起飞机场" 
                @change="handleAirport"
                >
                    <el-option
                    v-for="(item,index) in data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                    <el-option
                    label="测试机场"
                    value="测试机场"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option
                    v-for="(item,index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from}-${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany" >
                    <el-option
                    v-for="(item,index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                    v-for="(item,index) in sizeOptions"
                    :key="index"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
        <!-- 用于调用computed里面的filter函数 -->
        <span v-show="false">{{filter}}</span>
    </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default:{}
        }
    },
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
            
            //机型下拉文字配置
            sizeOptions: [
                {name: "大", size: "L"},
                {name: "中", size: "M"},
                {name: "小", size: "S"},
            ],
        }
    },

    //使用computed监听筛选值的变化
    computed:{
        filter(){

            const arr=this.data.flights.filter(v=>{
                //假设全部符合
                let valid=true;

                //处理起飞时间
                const [from,to]=this.flightTimes.split('-');
                const current=+v.dep_time.split(':')[0];
                //然后找出不符合的
                if(this.airport && this.airport!=v.org_airport_name || 
                    this.company && this.company!=v.airline_name || 
                    this.airSize && this.airSize!=v.plane_size || 
                    this.flightTimes && (from>current || to<=current)){
                    valid=false;
                }

               return valid;
            })
            
            this.$emit('filtered',arr);

            return '';
        }
    },
    methods: {
        // 选择机场时候触发
        handleAirport(value){},

        // 选择出发时间时候触发
        handleFlightTimes(value){
            console.log(value);
            const [from,to]=value.split('-');
            
            const arr=this.data.flights.filter(v=>{
                const time=+v.dep_time.split(':')[0];
                if(from<=time && time<to){
                    return v;
                }
            })
            
            this.$emit('filtered',arr);
        },

         // 选择航空公司时候触发
        handleCompany(value){},
            
         // 选择机型时候触发
        handleAirSize(value){},
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            this.airport= "";        // 机场
            this.flightTimes= "";    // 出发时间
            this.company= "";        // 航空公司
            this.airSize= "";        // 机型大小

            this.$emit('filtered',this.data.flights);
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>