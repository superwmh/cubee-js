var TBloader = TBloader || new Cubee();

TBloader.addmojo({
	't-framework':{
		path:'demo/js/t-framework.js',
		tbmojo:true,
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

//T.DP.framework
/*
TBloader.addmojo({
	't-framework':{
		fullpath:'http://taobao-wd.ns1.name/jayli/cubee/demo/js/t-framework.js',
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
*/
