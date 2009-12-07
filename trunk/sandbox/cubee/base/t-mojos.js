var TBloader = TBloader || new Cubee();

//T.base
TBloader.addmojo({
	't-base':{
		path:'cubee/base/t-base.js',
		tbmojo:true,
		requires:[]
	},
	't-base-io':{
		path:'cubee/tbwidget/t-base-io.js',
		tbmojo:true,
		requires:['t-base']
	},
	't-base-templet':{
		//fullpath:cubeeBase+'tbwidget/t-base-templet.js',
		path:'cubee/tbwidget/t-base-templet.js',
		tbmojo:true,
		requires:['t-base']
	},

	///////////

});

