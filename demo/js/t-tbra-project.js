YUI.namespace('T.tbraTest');
YUI.add('t-tbraproject',function(Y){
	T.base = Y.mix(T.base,TB);	


	T.tbraTest = function(){
		var showTbEnv = function(){
			var con = Y.Node.get('#tb-env');
			for (e in TB.env) {
				Y.Node.getDOMNode(con).innerHTML += e+' = '+TB.env[e]+'<br/>';
			}
			var str = '_msg_=0&_msg_v=true&cookie21=IDb1VdmEwQ%3D%3D&cookie14=KPiwCtlxat9pLQ%3D%3D&cookie15=dHJ1ZQ==&cookie16=LAnUCk8IqqUpaP%2FZeVW6SbdjuQ%3D%3D&cookie17=KsdeHsAz8Ao%3D&existShop=false&existXShop=false&lltime=1189652710'
			var cookieMap = str.toQueryParams();
			for (k in cookieMap) {
				Y.Node.getDOMNode(con).innerHTML +=k + ' = ' + cookieMap[k] + '<br/>';
			}
		};

		var formatMessage = function(){
			var con = Y.Node.get('#tb-fm1');
			Y.Node.getDOMNode(con).innerHTML = TB.common.formatMessage('{0}天有{1}个小时', [1, 24]);

			var con = Y.Node.get('#tb-fm2');
			Y.Node.getDOMNode(con).innerHTML = TB.common.formatMessage('{day}天有{hour}个小时', {day:1, hour:24}, function(o){return o*2;});
		};


		var applyIf = function(){
			var con = Y.Node.get('#tb-ai');
			var source = {'key':'value', 'key1':'value1', 'key2':45};
			var config = {'key':'config', 'key3':'value3', 'date':new Date()};
			Y.Node.getDOMNode(con).innerHTML += (YAHOO.lang.hasOwnProperty(source, 'key'));
			Y.Node.getDOMNode(con).innerHTML += (YAHOO.lang.hasOwnProperty(source, 'key3'));
			var targetIf = TB.common.applyIf(source, config);
			var target = TB.common.apply(source, config);
			Y.Node.getDOMNode(con).innerHTML += (targetIf);
			Y.Node.getDOMNode(con).innerHTML += (target);
		};


		var randomInt = function(){
			var con = Y.Node.get('#tb-ri');
			var count = 200;
			var repeat = 0;
			var randoms = [];
			for(var i = 0; i < count; i++) {
				var random = Math.randomInt(count);
				if(randoms.indexOf(random) != -1) {
					repeat++;
				} else {
					randoms.push(random);
				}
			}
			Y.Node.getDOMNode(con).innerHTML += ('repeat time: ' + repeat + '<br />');
			Y.Node.getDOMNode(con).innerHTML += ('randoms.length: ' + randoms.length + '<br />');

		};


		var parseUri = function(){
			var con = Y.Node.get('#tb-pu');
			var uri = TB.common.parseUri('http://list.taobao.com/browse/1512/t-95---------------------------------40--coefp-0-all-1512.htm?at_topsearch=1#ListItem');
			for(var i in uri) {
				Y.Node.getDOMNode(con).innerHTML += (i + " = " + uri[i] + "<br />");
			}


		};

		return {
			/*程序入口*/
			init:function(){
				showTbEnv();
				formatMessage();
				applyIf();
				randomInt();
				parseUri();
			}
		};
	}();

},'',{requires:['dump']});

