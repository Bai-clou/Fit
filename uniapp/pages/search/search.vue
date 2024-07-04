
<template>
    <view>
        <d-search-log 
        :color_border="color_border"
        :color_text="color_border"
        :search_list_hot="search_list_hot"
        :store_key="store_key"
		:search_name="search_name"
		:input_text="input_text"
        @onClickDelAllApi="onClickDelAll"
        @onSearchNameApi="onSearchName"
        ></d-search-log>

    </view>
</template>

<script>
    import dSearchLog from 'uni_modules/d-search-log/components/d-search-log/d-search-log.vue'

    export default {
        components: {
            "dSearchLog": dSearchLog
        },
        computed:{

        },

        data() {
            return {
                color_border:"#ff00ff",
                search_list_hot:[],
                store_key:'search_list',
				search_name:'取消',
				input_text:''
            }
        },
        onLoad(e) {
			console.log(e)
			this.input_text=e.searchword
			this.$request.get('/hotsearch/selectAll').then(res => {
				this.search_list_hot = res.data
			})
        },
        methods: {
            onClickDelAll() {
                console.log('[父级接收事件]：删除全部搜索记录')
            },
            onSearchName(e) {
                console.log('[父级接收事件]：点击搜索:'+e)
				uni.navigateTo({
					url: '/pages/searchdetail/searchdetail?value='+e
				});
            }
        }
    }
</script>

<style>

    .my-theme-bg {
        background: linear-gradient(117deg,#60DF9D,#31CB7B);
        color:#fff;
    }
</style>