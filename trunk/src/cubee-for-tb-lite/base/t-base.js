YUI.namespace('T.base');

YUI.add('t-base',function(Y){
    /**
     * @class T.base
     */

	Y.mix(T.base , {


	getLength:function(o){
		var n = 0;
		if(typeof o == 'array' || typeof o == 'string')return o.length;
		for(var i in o){
			n++;
		}
		return n;
	},
	createIframe:function(id,src,foo){
		var iframe = document.createElement("iframe");
		iframe.id = id;
		iframe.src = src;
		iframe.width = '0px';
		iframe.frameBorder = '0';
		iframe.border = '0';
		iframe.height = '0px';
		if (iframe.attachEvent){
		   iframe.attachEvent("onload", function(){
				foo(id);
			});} else {
			iframe.onload = function(){
				foo(id);
			};
		}
		document.body.appendChild(iframe);
	},

	/**
	* 提交数据函数
	* @memberOf T.base
	* @param method {string}  提交方式
	* @param url {string} 提交地址
	* @param suback {function} 成功后的动作
	* @param data {string}: POST的数据；如果使用setForm()，则为null
	* @param onfailure {function}:失败的回调
	* @param contentType {string}:请求类型
	* @param args {object}: Y.io的argument
	*/
	io: function(method, url, suback, postData,onfailure,contentType,args){
		if(typeof postData == 'undefined')var postString = '';
		if(typeof onfailure == 'undefined')onfailure = new Function;
		if(typeof contentType == 'undefined' || contentType == '')var contentType = 'application/x-www-form-urlencoded; charset=gbk';
		if(typeof postData == 'object'){
			var postString = Y.JSON.stringify(postData);
		}else{
			var postString = postData;
		}
		var cfg = {
			method:typeof method == 'undefined'?'GET':method,
			data:postString,
			headers:{
				'Content-Type':contentType
			},
			arguments:typeof args == 'undefined'?'':args,
			on:{
				complete:function(id,o){
					try{
						eval("var re = "+o.responseText.replace(/<!--(.*?)-->/g, ''));
					}catch(e){
						Y.log('接口返回为空，或者格式不对','error');
						//onfailure('网络错误');	
						return;
					}
					if(typeof re.status == 'undefined'){
						Y.log('数据格式错误','error');
						//onfailure('数据格式错误');	
						return;
					}
					if(Number(re.status) == -1){
						onfailure(re.errContent);
						return;
					}
					suback(re.data);
				}
				/*
				failure:onfailure('提交中...')
				*/
			}
		};
		var request = Y.io(url,cfg);
	},

	trim:function(str){
		return str.replace(/(^\s*)|(\s*$)/g, ""); 
	},

	/**
	* 得到URL中search字段和hash字段的变量，search字段优先
	* @param { string } 需要得到变量的URL，默认为当前页面的链接
	* @memberOf T.base
	* @return { object } 返回为JSON，可以通过getUrlValue()['key']来得到
	*/ 
	getUrlValue:function(url){
		var url = (url !== undefined) ? url : window.location.href;
		if(url.indexOf("#") > -1){
			var variable = url.split("#")[1];
		}else{
			var variable = url.split("?")[1];
		}
		if(variable == '' ||  typeof variable == "undefined"){
			return {};
		}else{
			var value = {};
			variable = variable.split("&");
			for(var i = 0, m = variable.length; i<m; i++){
				value[variable[i].split("=")[0]] = variable[i].split("=")[1];
			}
			return value;
		}
	},
	/**
	* 得到URL中hash字段的变量
	* @memberOf T.base
	* @param { string } 需要得到变量的URL，默认为当前页面的链接
	* @return { object } 返回为JSON，可以通过getHash()['key']来得到
	*/ 
	getHash : function(sUrl){
		var url = sUrl || window.location.href;
		if(url.indexOf("#") < 0){
			return {};
		}else{
			var hash = url.split('#')[1];
			if(hash == '')return {};
			if(hash[hash.length-1] == '&')hash = hash.substr(0, hash.length-1);
			hash = hash.replace(/'/ig,'"');
			hash = hash.replace(/=/ig,':\'');
			hash = hash.replace(/&/ig,'\',');
			hash += '\'';
			eval('var o = {'+hash+'};');
			return o;
		}
	},

	/**
	* 给url中的hash字段赋参数，返回一个完整的url
	* @param { string } sUrl: 需要赋值的url字符串
	* @param { object } data: 需要赋值的key:value对
	* @return { string } 返回一个完整的url
	* @memberOf T.base
	*/ 
	setHash : function(sUrl, data){
		var url = sUrl||window.location.href;
		if(url.indexOf("#") < 0){
			url+='#';
		}
		var o = this.getHash(url);
		for(var i in data){
			o[i] = data[i];
		}
		url = url.split("#")[0]+'#';
		for(var i in o){
			url+=i+'='+o[i]+'&';
		}
		url = url.substr(0,url.length-1);
		return url;
	},

	setUrlValue : function(sUrl, data){
		var fd = this;
		var url = sUrl||window.location.href;
		if(url.indexOf("?") < 0){
			url+='?';
		}
		var o = fd.getUrlValue(url);
		for(var i in data){
			o[i] = data[i];
		}
		url = url.split("?")[0]+'?';
		for(var i in o){
			url+=i+'='+o[i]+'&';
		}
		url = url.substr(0,url.length-1);
		return url;
	},
	/**
	 * 拆分数组
	 * @param { array } a: 原始数组
	 * @param { number } n: 步长 
	 * @return { array } aa:返回拆分好的数组
	 * @memberOf T.base
	 */
	breakupArray:function(a,n){
		if(!YAHOO.lang.isArray(a))return a;
		var aa = [];
		for(var i = 0;i<=Math.floor(a.length/n);i++){
			var _a = [];
			for(var j = 0;j<n;j++){
				if(a[i*n+j] === undefined)break;
				_a[j] = a[i*n+j];
			}
			aa.push(_a);
		}
		return aa;
	 },
	/**
	* 删除数组中的item,只匹配第一个
	* @memberOf T.base
	* @param { value } v : 要删除的数值
	* @param { array }a : 需要操作的数组
	*/
	removeArray : function(v, a){
		for(var i=0,m=a.length; i<m; i++){
			if(a[i] == v){
				a.splice(i, 1);
				break;
			}
		}
	},
	/**
	* 替换数组中的item,只匹配第一个
	* @memberOf T.base
	* @param { value } v : 要替换的数值
	* @param { value } n : 新的数值
	* @param { array } a : 需要操作的数组
	*/
	replaceArray : function(v, n, a){
		for(var i=0,m=a.length; i<m; i++){
			if(a[i] == v){
				a.splice(i, 1, n);
				break;
			}
		}
	},
	/**
	* 判断数值是否存在数组中
	* @memberOf T.base
	* @param {value } v : 要匹配的数值
	* @param { array } a : 存在的数组
	* @return { boolean } 返回一个布尔值
	*/
	inArray : function(v, a){
		var o = false;
		for(var i=0,m=a.length; i<m; i++){
			if(a[i] == v){
				o = true;
				break;
			}
		}
		return o;
	},
	/**
	* 计算字符长度,一个中文当成2个英文长度计算
	* @memberOf T.base
	* @param { string }  需要求长度的字符串
	* @return { number } 得到计算得的长度
	*/
	cn_strlen : function(string){
		return string.replace(/[^\u00-\uFF]/g, "**").length;
	},
	/**
	* 截字函数,可以兼容中文截取
	* @memberOf T.base
	* @param {string} string:需要截取的字符串
	* @param {number} length : 需要截取的长度（以英文为准，一个中文算两个英文，会自动加...）
	* @return {string} 返回截取后的字符串
	*/
	substr : function(string, length){
		//string为空时返回空白
		if(string === undefined){
			return "";
		}
		//start不超过字数限制时返回原文本
		if(typeof length != "number"){
			return string;
		}
		//当长度不够时，返回当前文本
		if(string.length*2 <= length){
			return string;
		}
		//开始算字
		var out = "", num = 0;
		for(var i=0, m=string.length; i<m; i++){
			out += string.substr(i, 1);
			if(/[^\u00-\uFF]/i.test(string.substr(i, 1))){
				num += 2;
			}else{
				num += 1;
			}
			if(num >= length) break;
		}
		//超出的补充
		if(string != out){
			if(/[^\u00-\uFF]/i.test(out.substr(-2))){
				out = out.substr(0, out.length-2)+"...";
			}else{
				out = out.substr(0, out.length-3)+"...";
			}
		}
		return out;
	},

	/**
	* 模板函数
	* @memberOf T.base
	* @param { string } templet : 模板
	* @param { object } data : 模板需要的数据
	* @return 输出按照模板整理好的HTML
	*/
	templetShow : function(templet, data){
		var fd = this;
		if(data instanceof Array){
			var str_in = '';
			for(var i = 0;i<data.length;i++){
				str_in += fd.templetShow(templet,data[i]);
			}
			templet = str_in;
		}else{
			var value_s = templet.match(/{\$(.*?)}/g);
			if(data !== undefined && value_s != null){
				for(var i=0, m=value_s.length; i<m; i++){
					var par = value_s[i].replace(/({\$)|}/g, '');
					value = (data[par] !== undefined) ? data[par] : '';
					templet = templet.replace(value_s[i], value);
				}
			}
		}
		return templet;
	},

	/**
	* add event,给既定函数o添加fun的函数监听，使得o运行时自动执行fun 
	* @method AE 
	* @memberOf T.base
	* @param {Function} 被观察者  
	* @param {Function} 要fire的函数 
	*/
	AE : function(o,fun){
		if((typeof o).toLowerCase() != "function")return o;
		var _fun = o;
		o = function(){
			_fun.apply(_fun,arguments);
			fun.apply(fun,arguments);
		};
		return o;
	},


	/**
	* 对象的克隆
	* @method YAHOO.CN.sns.base.clone
	* @memberOf T.base
	* @param o 被克隆的对象
	*/
	clone :Y.clone,
	/**
	* 长连续字符的解决方案,过滤字符串
	* @method YAHOO.CN.sns.base.wbtrim
	* @memberOf T.base
	* @param { string } str ：原始字符串
	* @param { number } count:截断的单位长度,默认为40
	* @return { string } str:返回过滤后的字符串
	*/
	wbtrim:function(str,count){
		var count = count || 10;
		//var thexp = new RegExp("(([!@#$%^&*_+=-]|[a-z]|[A-Z]|[0-9])+|\s|.)","g");
		var thexp = new RegExp("(([!@#$%^&*_+=-《》@『』【】×￥～，。；：＇＂]|[a-z]|[A-Z]|[0-9])+|\s|.)","g");
		var a = str.match(thexp);
		var _str = '';
		for(var i = 0;i<a.length;i++){
			if(a[i].length>count && /([!@#$%^&*_+=-《》@『』【】×￥～，。；：＇＂]|[a-z]|[A-Z]|[0-9])+/i.test(a[i])){
				var exp = new RegExp(".{"+count+"}","g");
				var r = a[i].substr(Math.floor(a[i].length/count)*count,Math.floor(a[i].length%count));
				var t = a[i].match(exp).join("<wbr />")+r;
				a[i] = t;
			}
			_str += a[i];
		}
		return _str;
	},
	/**
	* 过滤输出长字符串,多余的部分使用省略号表示
	* @method trimSize
	* @param { string } str ：原始字符串
	* @param { number } bsize:需要输出的字符串长度
	* @memberOf T.base
	* @return { string } str:返回截取后的字符串
	*/
	trimSize:function(str, bsize) {
		if(!str && 'string' != typeOf(str)) {
			return '';
		}
		str = trim(str);
		var rs = '';
		var blen = 0;
		for(var i = 0; i < str.length && blen < bsize; i++) {
			rs += str.charAt(i);
			if(/[\u4E00-\u9FA5]/.test(str.charAt(i))) {
				blen += 2;
			}
			else {
				blen++;
			}
		}
		if(blen >= bsize && bsize > 2) {
			rs = rs.substring(0, rs.length - 2) + '...';
		}
		return rs;
	},
	/**
	* 返回移除了任何 HTML 或 XML 标签的字符串
	* @method stripTags
	* @param { string } str ：原始字符串
	* @memberOf T.base
	* @return { string } str:返回过滤后的字符串
	*/
	stripTags: function(str) {
		return str.replace(/<\/?[^>]+>/gi, '');
	},
	/**
	* 返回过滤后的html文本
	* @method stripHTML
	* @param { string } str ：原始字符串
	* @memberOf T.base
	* @return { string } str:返回过滤后的字符串
	*/
	stripHTML: function(str){
		return str.replace('<','&lt;').replace('>','&gt;').replace('"','&quot;').replace('&','&amp;');
	},
	/**
	* 返回移除了任何script块的字符串
	* @method stripScripts
	* @param { string } str ：原始字符串
	* @memberOf T.base
	* @return { string } str:返回过滤后的字符串
	*/
	stripScripts: function(str) {
		return str.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'), '');
	}

	//与 escapeHTML() 相反
	/*
	unescapeHTML: function(str) {
		var temp = document.createElement("div");
		temp.innerHTML = str;
		var result = temp.childNodes[0].nodeValue;
		temp.removeChild(temp.firstChild)
		return result;
	}
	*/


	});//base end 

});

