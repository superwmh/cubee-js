/**
 * t-pagination.js | taobao分页组件
 * autohr:yizhou@taobao.com
 * @class T.tbwidget.pagination
 * @module t-pagination
 * @param { object } 配置项
 * @return { object } 生成一个分页实例
 * @requires { css/reset.css & css/grid.css & css/font.css & global.css } 样式依赖
 * 
 * property:
 *		static:
 *		public:
 * interfaces:
 *		init:初始化
 * example
 *	var p = new T.tbwidget.pagination(Y.one('#kao_page'), {index:1, max:200, page:function(n) {alert(n);}});
 *		
 */

YUI.namespace('T.tbwidget.pagination');
YUI.add('t-pagination',function(Y){
	T.tbwidget.pagination = function(el, cmlist) {
		if(typeof el==='undefined' || typeof cmlist==='undefined') {
			return;
		}
		var _winn = typeof cmlist.step == 'undefined'?7:cmlist.step;//最好为奇数
		var _showArrow = typeof cmlist.showArrow == 'undefined'?true:cmlist.showArrow;//默认为true
		var _cur = cmlist.index;
		var _max = cmlist.max;
		var _page = cmlist.page;
		var _genbeltstring = function() {
			var str = [];
			if(_max<_winn) {
				var i=1;
				for(i=1; i<=_max; i++) {
					str.push('<a href="javascript:void(0);">'+i+'</a>');
				}
				for(; i<=_winn; i++) {
					str.push('<a href="javascript:void(0);" class="t-pagenull">'+i+'</a>');
				}
			}
			else {
				for(var i=1; i<= _max; i++) {
					str.push('<a href="javascript:void(0);">'+i+'</a>');
				}
			}
			return str.join('');
		};
		var _create = function() {
			if(_showArrow){
				var display = '';
			}else{
				var display = 'none';
			}
			el.set('innerHTML', [
				'<span class="t-p-ctrl">',
					'<a href="javascript:void(0);" style="display:'+display+'" class="J_first">&lt;&lt;</a> <a href="javascript:void(0);" class="J_previous">&lt;</a>',
				'</span>',
				'<span class="t-p-frame"><span class="t-p-framebelt">',
					_genbeltstring(),
				'</span></span>',
				'<span class="t-p-ctrl">',
					'<a href="javascript:void(0);" class="J_next">&gt;</a> <a href="javascript:void(0);" style="display:'+display+'" class="J_last">&gt;&gt;</a>',
				'</span>'].join(''));
		};
		var _doanim = function() {
			var m = Math.floor(_winn/2),l,r=0;
			var as = el.all('.t-p-framebelt A');
			var aslen = as.size();
			if(_cur<=m) {
				l = 1;
				r = _winn;
			}
			else if(_cur>aslen-m) {
				l = aslen-_winn+1;
				r = aslen;
			}
			else {
				l = _cur-m;
				r = _cur+m;
			}
			//frame
			var fw = 0;
			for(var i=l; i<=r; i++) {
				var node = as.item(i-1);
				fw += node.get('offsetWidth') + parseInt(node.getStyle('marginRight'));
			}
			//fw += parseInt(el.one('.t-p-frame').getStyle('paddingLeft'));
			var animframe = new Y.Anim({
				node: el.one('.t-p-frame'),
				duration: 0.5,
				to: {
					width: fw
				}
			});
			//belt
			var ml = 0;
			for(var i = 1; i <= l - 1; i++) {
				var node = as.item(i-1);
				ml += node.get('offsetWidth') + parseInt(node.getStyle('marginRight'));
			}
			var animbelt = new Y.Anim({
				node: el.one('.t-p-framebelt'),
				duration: 0.5,
				to: {
					marginLeft: -ml
				}
			});
			//run
			animframe.run();
			animbelt.run();
		};
		var _setpos = function(cp) {
			var as = el.all('.t-p-framebelt A');
			if(_max < cp) {
				cp = _max;
			}
			if(cp<1) {
				cp = 1;
			}
			if(as.item(cp-1).hasClass('t-pagenull')) {
				return;
			}
			as.item(_cur-1).removeClass('current');
			_cur = cp;
			as.item(_cur-1).addClass('current');
			//animation
			_doanim();
			return;//by jay
			//invoke external
			if(_page) {
				_page(_cur);
			}
		};
		var _event = function() {
			el.all('.t-p-ctrl').on('click', function(e) {
				if(e.target.get('tagName') == 'A') {
					e.halt();
					e.target.blur();
					if(e.target.hasClass('J_first')) {
						if(_cur == 1)return;
						_setpos(1);
						if(_page) {
							_page(1);
						}
					}
					else if(e.target.hasClass('J_previous')) {
						/*
						if(_cur == 1)return;
						_setpos(_cur-1);
						if(_page) {
							_page(_cur-1);
						}
						*/

						var p = _cur;
						if(p == 1)p=1;
						else p-=1;
						_setpos(p);
						if(_page) {
							_page(p);
						}
					}
					else if(e.target.hasClass('J_next')) {
						var p = _cur;
						if(_cur >= _max)p=_max;
						else p+=1;
						_setpos(p);
						if(_page) {
							_page(p);
						}
					}
					else if(e.target.hasClass('J_last')) {
						_setpos(_max);
						if(_page) {
							_page(_max);
						}
					}
				}
			});
			el.one('.t-p-framebelt').on('click', function(e) {
				if(e.target.hasClass('t-pagenull'))return;
				if(e.target.get('tagName') == 'A') {
					e.halt();
					e.target.blur();
					var n = parseInt(e.target.get('innerHTML'));
					if(n != _cur) {
						_setpos(n);
						if(_page) {
							_page(n);
						}
					}
				}
			});
		};
		var _init = function() {
			if(_cur<1) {
				_cur=1;
			}
			if(_max<1) {
				_max=1;
			}
			if(_cur>_max) {
				_cur=_max;
			}
			_create();
			_event();
			_setpos(_cur);
		};
		//初始化
		_init();
		//by jayli
		var _setmax = function(max){
			var as = Y.get('.t-p-frame').queryAll('a');
			var i = 0;
			_max = max;
			as.each(function(node){
				i++;
				//Y.Event.purgeElement(node,true);
				if(node.hasClass('current'))return true;
				else if(i <= Number(max)){
					node.removeClass('t-pagenull');
				}else {
					node.addClass('t-pagenull');
				}
			});
			//_event();

		};
		return {
			setpos: _setpos,
			setmax: _setmax
		};
	};
	//var p = new PAGINATION(Y.one('#kao_page'), {index:1, max:200, page:function(n) {alert(n);}});
	//var p = new PAGINATION(Y.one('#kao_page'), {auto:false,index:1, max:200, page:function(n) {alert(n);}});
},'',{requires:['dump','node','anim']});
