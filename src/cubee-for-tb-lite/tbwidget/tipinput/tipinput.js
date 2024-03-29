/**
*/
YUI.namespace('T.tbwidget.tipInput');
YUI.add('tipInput',function(Y){

	T.tbwidget.tipInput = function(){
		this.init.apply(this,arguments);
		this.render();
	};
	T.tbwidget.tipInput.prototype = {
		YD: YAHOO.util.Dom,
		YE: YAHOO.util.Event,
		setTxt:function(str){
			var fd = this;
			fd.defaultvalue = str;
		},
		init:function(inpt,conf){//input element
			var fd = this;
			var config = conf||{};
			if(typeof inpt == 'string')var inpt = fd.YD.get(inpt);
			if(!inpt)return;
			this.defaultvalue = inpt.value||'';
			this.id = inpt.id||'';
			this.input = inpt;
			fd.YD.addClass(inpt,'lightgray');
			fd.YE.on(inpt,'focus',function(e){
				var el = fd.YE.getTarget(e);
				if(fd.defaultvalue== el.value){//默认文字
					el.value = '';
					fd.YD.removeClass(el,'lightgray');
				}else{
					fd.YD.removeClass(el,'lightgray');
					if(config.autoSelected == true)el.select();
				}
			});
			fd.YE.on(inpt,'blur',function(e){
				var el = fd.YE.getTarget(e);
				setTimeout(function(){
					if(el.value == '' || el.value == fd.defaultvalue){
						fd.YD.addClass(el,'lightgray');
						el.value = fd.defaultvalue;
					}
				},101);
			});
		},
		render:function(){
			var fd = this;
			if(!fd.input)return;
			fd.YD.addClass(fd.input,'lightgray');
			fd.input.value = fd.defaultvalue;
		}
	};

});
