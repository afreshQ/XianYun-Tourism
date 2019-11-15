<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info">
                <div class="member-info-item" v-for="(item,index) in users" :key="index">

                    <el-form-item label="乘机人类型">
                        <el-input placeholder="姓名" class="input-with-select" v-model="item.username" >
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码"  class="input-with-select" v-model="item.id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
                    <el-checkbox 
                    :label="`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}`" 
                    border
                    @change="handleInsurance(item.id)">
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model="contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
        <!-- 用于调用计算总计的函数 -->
        <span>{{allPrice}}</span>
    </div>
</template>

<script>
export default {
    props: {
        // 接收机票信息
        data: {
            type: Object,
            default: {}
        }
    },
    data(){
        return {
            // 乘机人信息
            users:[
                {username:'',id:''}
            ],

            insurances: [], // 保险数据
            contactName: "", // 联系人名字
            contactPhone: "", // 联系人电话
            captcha: "", // 验证码
            invoice: false   // 发票

        }
    },
    computed:{
        allPrice(){
            
            //总金额
            let price=0;

            //机票价格
            price+=this.data.seat_infos.org_settle_price;
            // 机建+燃油
            price+=this.data.airport_tax_audlet;
            //保险
            price+=this.insurances.length*30;
            //人数
            price*=this.users.length;

            //将计算好的价格存到store架构中
            this.$store.commit('air/setAllPrice',price);

            return '';
        }
    },
    methods: {
        // 添加乘机人
        handleAddUsers(){
            // 使用es6的解构语法添加新的对象
            this.users=[...this.users,{username:'',id:''}]
        },
        
        // 移除乘机人
        handleDeleteUser(index){
            this.users.splice(index,1)
        },

        //选择保险触发
        handleInsurance(id){
            //判断是否存在
            const index=this.insurances.indexOf(id);
            // 存在就删除，否则添加
            if(index>-1){
                this.insurances.splice(index,1)
            }else{
                this.insurances.push(id);
            }
            
        },
        
        // 发送手机验证码
        async handleSendCaptcha(){
            
           try {
               const code= await this.$store.dispatch('user/sendCaptchas',this.contactPhone);
           
                this.$alert(`模拟手机验证码为：${code}`, '提示', {
                showCancelButton: false,
                type: 'warning'
                })
           } catch (error) {}
           
        },

        // 提交订单
        handleSubmit(){
            
            const orderData={
                users: this.users,
                insurances: this.insurances,
                contactName: this.contactName,
                contactPhone: this.contactPhone,
                invoice: this.invoice,
                captcha: this.captcha,
                seat_xid: this.data.seat_infos.seat_xid,
                air: this.data.id
            }
            console.log(orderData);
        }
    }
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>