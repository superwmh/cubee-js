
//wrong
T.namespace("T.DP.mymodule");
T.DP.mymodule = new Cubee().addmojo({mysubmodule:{
		fullpath:'http://10.32.22.154/tb_yui3hack/r_sns/js/t-mysubmodule.js',
		requires:[]
	}
}).require('mysubmodule').onReady(function(){
	T.log('mymodule begin');
	T.DP.mysubmodule.init();//这里有问题，*的问题很大
});
