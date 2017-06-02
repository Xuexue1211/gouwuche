window.onload=function(){new Vue({
	el: "#app",
	data:{
		//属性；
		totalPrice: 0,
		productList:[],
		checkAllFlag:false,
		delFlag:false,
		curProduct:[]
	},
	mounted: function(){
		 this.getItemList();
	},
//	filters:{
//		money:function(value){
//			return "$" +value.toFixed(2);
//		}
//	},
	methods:{
		getItemList:function(){
//			var _this=this;
			this.$http.get("data/cartData.json").then(function(response){
				this.productList=response.data.result.list;
//				console.log(JSON.stringify(productList));
//				console.log(res);
			});
		},
		changeProduct: function(product,way){
			if(way>0){
				product.productQuentity++;
			}else{
				product.productQuentity--;
				if(product.productQuentity < 0){
					product.productQuentity = 1;
				}
			}
			this.caclTotalPrice();
		},
		delConfirm: function(item){
			this.delFlag=true;
			this.curProduct=item;
		},
		deleteProduct: function(item){
			//indexOf搜索选到的商品
			var delItem=this.productList.indexOf(this.curProduct);
			//获得索引，并用splice删除
			this.productList.splice(item,1);
			this.delFlag=false;
		},
		//单选
		seletProduct:function(item){
			if(typeof item.checked=='undefined'){
				//vue监听一个不存在的变量，使用全局注册Vue.set()item对象添加checked变量（属性）
//				Vue.set(item,"checked",true);
				//局部注册
				this.$set(item,"checked",true);
			}else{
				item.checked=!item.checked;
			}
			this.caclTotalPrice();
		},
		checkAll:function(){
			this.checkAllFlag=!this.checkAllFlag;
			var _this=this;
//			if(this.checkAllFlag){
				this.productList.forEach(function(item,index){
					if(typeof item.checked=='undefined'){
						_this.$set(item,"checked",_this.checkAllFlag);
					}else{
						item.checked=_this.checkAllFlag;
					}
					_this.caclTotalPrice();
				});
//			}
		},
		caclTotalPrice:function(){
			var _this=this;
			this.totalPrice=0;
			this.productList.forEach(function(item,index){
				if(item.checked){
					_this.totalPrice+=item.productPrice*item.productQuentity;
				}
			});
		}
	}
	//页面初始化时
	
})
}
//全局过滤器的使用
//Vue.filter("money",function(value){
//	return "$" +value.toFixed(2);
//})