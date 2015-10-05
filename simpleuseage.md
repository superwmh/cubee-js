# 如何使用cubee #
引入种子并配置
```
<script charset="gb18030" type="text/javascript" src="http://a.tbcdn.cn/app/dp/eb/js/cubee/base/cubee.js">
	var jsbase = 'http://a.tbcdn.cn/app/dp/eb/js/';
	var cubeeInfo = {
		fullpath:jsbase+'cubee/cubee-info.js',
		tbmojo:false,
	};
	var yuiCfg = {
		base:'http://a.tbcdn.cn/yui/3.0.0/build/', 
		charset:'gb18030',
		root:"yui/3.0.0/build/",  
		combine:false,
		loadOptional:true
	};

</script>
<script charset="gb18030" type="text/javascript" src="http://a.tbcdn.cn/app/dp/eb/js/cubee/base/t-mojos.js"></script>
```
其中，第一个script src代表cubee.js的地址，jsbase代表项目js文件存放的目录，yuiCfg.base代表yui3的目录，最后一个script src代表模块树的地址。
在项目逻辑块中添加一个逻辑的js，类似这种逻辑在页面可能会有多个：
```
<script>
<!--
var TheDemo= (new Cubee()).addmojo({
	 'demo':{
		 fullpath:jsbase+'demo.js',
		 tbmojo:false,
		 requires:['t-base','dump','node','event']
	 }
 }).require('*').onReady(function(){
	 T.Demo.init();
 });
//-->
</script>
```
主程序的启动入口，启动入口只有一个
```
<script>
<!--
TBloader.onReady(function(){
	TheDemo.start();//Demo逻辑
	TheSlider.start();//其他的逻辑
	TheCookie.start();
	TheLatestBook.start();
	TheRank.start();
});
//-->
</script>
```
例子可以参照
http://zazhi.taobao.com