new Vue({
	//el控制页面的范围
	el: ".container",
	data:{
		limitNum:3,
		addressList:[],
		currentIndex:0,
		shipping:1
	},
	//实例插入文档
	mounted:function(){
		this.$nextTick(function(){
			this.getAddressList();
		});
	},
//	<!--默认显示多少条内容过滤器,截取返回新数组-->
	computed:{
		filterAddress:function(){
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods:{
		getAddressList:function(){
			var _this=this;
			//调用http方法
			this.$http.get("data/address.json").then(function(response){
				var res=response.data;
				if(res.status=="0"){
					//结果保存在数组里
					_this.addressList=res.result;
				}
			});
		},
		loadMore:function(){
			this.limitNum=this.addressList.length;
		},
		setDefault:function(addressId){
//			在addressList遍历
			this.addressList.forEach(function(address,index){
				if(address.addressId==addressId){
					address.isDefault=true;
				}else{
					address.isDefault=false;
				}
			});
		}
	}
})
