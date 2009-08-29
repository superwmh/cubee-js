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
<script type="text/javascript" src="http://cn.yimg.com/i/yui/3.0.0b1/build/yui/yui-min.js"></script>
<script type="text/javascript" src="cubee/base/t-cubee.js"></script>
<script type="text/javascript">
//T.DP.base & T.DP.framework
TBloader.addmojo({
	't-base':{
		fullpath:'http://10.32.22.154/tb_yui3hack/cubee/base/t-base.js',
		requires:['node','event','oop']
	},
	't-framework':{
		fullpath:'http://10.32.22.154/tb_yui3hack/cubee/tbwidget/t-framework.js',
		requires:['t-base']
	}
});

//msg弹出框
TBloader.addmojo({
	'yahoo-dom-event':{
		fullpath:'http://cn.yimg.com/i/yui/2.7.0/build/yahoo-dom-event/yahoo-dom-event.js'
	},
	'msg-style':{
		type:'css',
		fullpath:'http://cn.yimg.com/i/sns/00007/css/y_global_1.css'
	},
	msg:{
		fullpath:'http://cn.yimg.com/i/sns/js/msg_1_1_0_min.js',
		requires:['yahoo-dom-event','msg-style']
	}
});

//用yui2loader调用yui2的日历选择
TBloader.addmojo({
	'yahoo-loader':{
		fullpath:'http://developer.yahoo.com/yui/build/yuiloader/yuiloader-min.js'
	},
	't-calendar':{
		requires:['yahoo-loader']
	}
});


</script>
</head>

<body class="yui-skin-sam">
<div id="doc">
	<div id="hd">
		<ul>
			<li>菜单1？</li>
			<li>菜单2？</li>
			<li>菜单3？</li>
			<li>菜单4？</li>
		</ul>
	</div>
	<div id="bd">
		<!--{{-->
		<h1>雅虎关系的弹出框</h1>
		<div><a id="show-msg" href="javascript:void(0);">show msg</a></div>
		<!--}}-->
		<!--{{-->
		<h1></h1>
		<h1>yui2 loader 的calendar</h1>
		<a id="load-calendar" href="javascript:void(0);">load calendar</a>
		<div id="calendar_container"></div>
		<!--}}-->
		<!--{{-->
		<h1>yui3 widget (slider)</h1>
		<p id="horiz_value">Value: 0</p>
		<div class="horiz_slider"></div>
		<!--}}-->
		<!--{{-->
		<h1>yui2弹出狂</h1>
		<!--}}-->
<!--应用js-->
<script type="text/javascript">
//项目
var TBproject = new Cubee().addmojo({
	projectname:{
		fullpath:'http://10.32.22.154/tb_yui3hack/project/js/t-project.js',
		requires:['node','event','msg','yahoo-loader','slider','base']
	}
}).require('*'/*,'projectname'*/).onReady(function(){
	T.DP.projectname.init();
});
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
		fullpath:'http://10.32.22.154/tb_yui3hack/project/js/t-framework-hack.js',
		requires:['node','event','t-framework']
	}
});
TBloader.require('t-framework-hack').onReady(function(){
	T.DP.framework.init();
	TBproject.start();
});
</script>
</html>
