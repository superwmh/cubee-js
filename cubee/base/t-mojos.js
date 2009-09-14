var TBloader = TBloader || new Cubee();

//T.base
TBloader.addmojo({
	't-base':{
		fullpath:cubeeBase+'base/t-base.js',
		requires:[]
	},
	't-base-io':{
		fullpath:cubeeBase+'tbwidget/t-base-io.js',
		requires:['t-base']
	},
	't-base-templet':{
		fullpath:cubeeBase+'tbwidget/t-base-templet.js',
		requires:['t-base']
	},

	///////////

});

