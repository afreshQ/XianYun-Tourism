<template>
  <div class="draft-box">
      <h4 class="draft-title">草稿箱（{{$store.state.post.draftList.length}}）</h4>
      <div class="draft-list">
            <div class="draft-item" v-for="(item,index) in $store.state.post.draftList" :key="index">
                <div class="title" @click="toCreate(item.form)">{{item.form.title}} <i class="el-icon-edit"></i></div>
                <p class="time">{{item.createTime}}</p>
            </div>
      </div>
  </div>
</template>

<script>
export default {
    methods:{
        toCreate(form){
            const data={...form}
            this.$emit('setForm',data)
        }
    }
}
</script>

<style lang="less" scoped>
.draft-box{
    border: 1px solid #ddd;
    padding: 10px;
    .draft-title{
        margin-bottom: 10px;
        font-weight: 400;
        color: #666;
        
    }
    .draft-item{
            margin-bottom: 10px;
            font-size: 14px;
        .title{
            &:hover{
                color: #ffa500;
                cursor: pointer;
            }
        }
        .time{
            color: #999;
        }
    }
}
</style>