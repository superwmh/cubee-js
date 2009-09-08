<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="zh">
<head>
<title> test </title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style>
#hd{height:100px;background:lightgray;}
#hd li{float:left;padding:10px;}
#bd{ padding:10px;height:500px;margin:10px 0;border:1px solid #cccccc}
#ft{height:50px;background:lightgray;}
#calendar_container{position:absolute;}

</style>
<!--script type="text/javascript" src="http://cn.yimg.com/i/yui/3.0.0b1/build/yui/yui-min.js"></script-->
<script type="text/javascript" src="gt.php?cubee/yui3/yui/yui-min.js&cubee/base/t-cubee.js&cubee/base/t-cubee-config.js"></script>
</head>

<body class="yui-skin-sam">
<div id="doc">
	<div id="hd">
		<ul>
			<li>菜单1</li>
			<li>菜单2</li>
			<li>菜单3</li>
			<li>菜单4</li>
		</ul>
	</div>
	<div id="bd">
		<h1>使用Cubee加载”框架“和”应用“,两个应用的js分别使用单体和yui.add闭包来实现</h1>
		<!--{{-->
		<h2>雅虎关系的弹出框</h2>
		<div><a id="show-msg" href="javascript:void(0);">show msg</a></div>
		<!--}}-->
		<!--{{-->
		<h2>使用yui2 loader异步加载yui2的calendar</h2>
		<a id="load-calendar" href="javascript:void(0);">load calendar</a>
		<div id="calendar_container"></div>
		<!--}}-->
		<!--{{-->
		<h2>yui3 widget (slider)</h2>
		<p id="horiz_value">Value: 0</p>
		<div class="horiz_slider"></div>
		<!--}}-->
		<!--{{-->
		<h2>yui2弹出狂</h2>
		<!--}}-->
<!--应用js-->
<script type="text/javascript">
//项目
var TBproject = new Cubee().addmojo({
	/*主程序使用Cubee，模块使用单体*/
	't-project':{
		fullpath:hostname+'/project/js/t-project.js',
		requires:['node','event','msg','yahoo-loader','slider','base']
	},
	/*主程序使用Cubee，模块使用yui.add*/
	't-project2':{
		fullpath:hostname+'/project/js/t-project2.js'
	}
}).require('*'/*,'t-project','t-project2'*/).onReady(function(){
	T.DP.projectname.init();
	T.DP.projectname2.init();
});

//{{
//}}
</script>
	
	</div>
	<div id="ft">尾部</div>
</div>

<!--page html code -->
</body>



<!--框架js-->
<script type="text/javascript">
//页面框架
TBloader.addmojo({
	't-framework-hack':{
		fullpath:hostname+'/project/js/t-framework-hack.js',
		requires:['node','event','t-framework']
	}
});
TBloader.require('t-framework-hack').onReady(function(){
	T.DP.framework.init();
	TBproject.start();
});
</script>
</html>
