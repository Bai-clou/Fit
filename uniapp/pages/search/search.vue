
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
            this.search_list_hot = [
                '手机','电脑','河南老君山','三亚一游','北京环球影城','杭州西湖','保定驴肉火烧','保定狼牙山玻璃栈道'
            ]
        },
        methods: {
            onClickDelAll() {
                console.log('[父级接收事件]：删除全部搜索记录')
            },
            onSearchName(e) {
                console.log('[父级接收事件]：点击搜索:'+e)
            }
        }
    }
</script>

<style>

    .my-theme-bg {
        background: linear-gradient(117deg,#60DF9D,#31CB7B);
        color:#fff;
        /* background: linear-gradient(117deg,#23C0F7,#ff661e); */
        /* background: linear-gradient(90deg, #FFAA57, #23C0F7); */
        /* background: linear-gradient(90deg, #F37749, #FFAA57); */
        /* #FFAA57 */
        /* background-image: linear-gradient(45deg, #39b54a, #8dc63f); */
        /* color: #ffffff; */
        /* background-color: #f37b1d; */
        /* color: #ffffff; */
        /* background-color: #ffffff; */
        /* color: #666666; */
        /* linear-gradient(-27deg, #33CB80, #28D0AF) */
        /* background-image: line=ar-gradient(-27deg,#33CB80,#28D0AF); */
        /* color: #ffffff; */
        /* background-image: line=ar-gradient(-27deg,#fff,#fff); */
        /* background-image: line=ar-gradient(-27deg,#23C0F7,#23C0F7); */
        /* color: #000; */
    }
</style>