<template>
    <div class="comment">
        <commentItem :data="item" v-for="(item,index) in commentData" :key="index"/>
        <!-- 分页 -->
        <div></div>
    </div>
</template>

<script>
import commentItem from '@/components/post/commentItem';
export default {
    components:{
        commentItem
    },
    data(){
        return {
            commentData:[]
        }
    },

    mounted(){
        const {id}=this.$route.query;
        this.$axios({
            url:'/posts/comments',
            params:{
                post:id
            }
        }).then(res=>{

            const {data}=res.data;
            console.log(data);
            
            this.commentData=data;
        })
    }
}
</script>

<style lang="less" scoped>

</style>