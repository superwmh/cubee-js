YUI.namespace('T.base');


YUI.add('t-base',function(Y){

	Y.mix(T.base , {

	/**
	*得到URL中的变量
	*url : 需要得到变量的URL，默认为当前页面的链接
	*返回为JSON，可以通过getUrlValue()['key']来得到
	*/ 
	getUrlValue:function(url){
		var url = (url !== undefined) ? url : window.location.href;
		if(url.indexOf("#") > -1){
			var variable = url.split("#")[1];
		}else{
			var variable = url.split("?")[1];
		}
		if(variable === undefined){
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
	//prepare
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

	//sUrl,{key:value},返回一个完整的url
	setHash : function(sUrl, data){
		var url = sUrl||window.location.href;
		if(url.indexOf("#") < 0){
			url+='#';
		}
		var o = getHash(url);
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
	/**
	 * 拆分数组
	 * a：原始数组
	 * n：步长
	 * 返回拆分好的数组
	 * */
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
	*删除组的方法
	*v : 要删除的数值
	*a : 需要操作的数组
	*只匹配第一个
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
	*替换组的方法
	*v : 要替换的数值
	*n : 新的数值
	*a : 需要操作的数组
	*只匹配第一个
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
	*判断数值是否存在数组中
	*v : 要匹配的数值
	*a : 存在的数组
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
	*计算长度
	*in_el : 输入框的对向
	*out_el : 显示字数的对象
	*length : 最大长度
	*/
	strlenShow : function(in_el, out_el, length){
		var fd = this;
		var valur = "";
		if(!in_el) return;
		var lenfun = function(){
			if(out_el){
				var len = (in_el.value.length > length) ? value.length : in_el.value.length;
				out_el.innerHTML = len+"/"+length;
			}
			if(in_el.value.length < length){
				value = in_el.value;
			}else{
				in_el.value = value;
			}
		}
		fd.YE.on(in_el, "keydown", lenfun);
		fd.YE.on(in_el, "keyup", lenfun);
        fd.YE.on(in_el, "mouseup", lenfun);
	},
	/**
	*计算字符长度
`	*string : 需要求长度的字符串
	*/
	cn_strlen : function(string){
		return string.replace(/[^\u00-\uFF]/g, "**").length;
	},
	/**
	*截字函数
	*string : 需要截取的字符串
	*length : 需要截取的长度（以英文为准，一个中文算两个英文，会自动加...）
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
	*模板函数
	*templet : 模板
	*data : 模板需要的数据
	*输出按照模板整理好的HTML
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


	getData:function(){},
	postData:function(){},
	/**
	* @method YAHOO.CN.sns.base.clone
	* @param o 被克隆的对象
	*/
	clone :Y.clone,
	/**
	* @method YAHOO.CN.sns.base.wbtrim
	* @param str ：原始字符串
	* @param count:截断的单位长度,默认为40
	* @return str，结果字符串
	* @ 	长连续字符的解决方案
	*/
	wbtrim:function(str,count){},
	//trimsize
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
	trimDate:function(str) {
		if(!str && 'string' != typeOf(str)) {
			return '';
		}
		str = trim(str);
		var sp = str.split(' ');
		if(null == sp[1]) {
			return str;
		}
		var dd = sp[0].split('-');
		if(null == dd[2]) {
			return str;
		}
		var tt = sp[1].split(':');
		if(null == tt[2]) {
			return str;
		}
		var old = new Date();
		old.setYear(dd[0]);
		old.setMonth(dd[1]-1);
		old.setDate(dd[2]);
		old.setHours(tt[0], tt[1], tt[2]);
		var now = new Date();
		var delta = now.getTime() - old.getTime();
		var textTemplate = {1:['刚才', ' 星期前', ' 天前', ' 小时前', ' 分钟前'], 2:['刚才', ' 星期', ' 天', ' 小时', ' 分钟']};
		if(delta>=0) {
			text = textTemplate[1];
		}
		else {
			delta = -delta;
			text = textTemplate[2];
		}
		if(delta > 1000 * 60 * 60 * 24 * 30) {
			return str.split(' ')[0]; 
		}
		if(delta <= 0) {
			return text[0];
		}
		var zhou = Math.floor(delta/(1000 * 60 * 60 * 24 * 7));
		if(zhou) {
			return (zhou+text[1]);
		}
		var tian = Math.floor(delta/(1000 * 60 * 60 * 24));
		if(tian) {
			return (tian+text[2]);
		}
		var xiaoshi = Math.floor(delta/(1000 * 60 * 60));
		if(xiaoshi) {
			return (xiaoshi+text[3]);
		}
		var fenzhong = Math.floor(delta/(1000 * 60));
		if(fenzhong) {
			return (fenzhong+text[4]);
		}
		return text[0];
	},
	trimDate2:function(str) {
		if(!str && 'string' != typeOf(str)) {
			return '';
		}
		str = trim(str);
		var sp = str.split(' ');
		if(null == sp[1]) {
			return str;
		}
		var dd = sp[0].split('-');
		if(null == dd[2]) {
			return str;
		}
		var tt = sp[1].split(':');
		if(null == tt[2]) {
			return str;
		}
		var old = new Date();
		old.setYear(dd[0]);
		old.setMonth(dd[1]-1);
		old.setDate(dd[2]);
		old.setHours(tt[0], tt[1], tt[2]);
		var today_midnight = new Date();
		today_midnight.setHours(0, 0, 0, 0);
		var delta = today_midnight.getTime() - old.getTime();
		if(delta <= 0) {
			return '今天';
		}
		else if(delta > 0 && delta < 1000 * 60 * 60 * 24) {
			return '昨天';
		}
		else {
			return dd[0]+'年'+dd[1]+'月'+dd[2]+'日';
		}
	},
	trimDate3:function(str) {
		if(!str && 'string' != typeOf(str)) {
			return '';
		}
		str = trim(str);
		var sp = str.split(' ');
		if(null == sp[1]) {
			return str;
		}
		var dd = sp[0].split('-');
		if(null == dd[2]) {
			return str;
		}
		var tt = sp[1].split(':');
		if(null == tt[2]) {
			return str;
		}
		var newd = new Date();
		if(newd.getFullYear() == dd[0]) {
			return dd[1]+'月'+dd[2]+'日';
		}
		else {
			return dd[0]+'年'+dd[1]+'月'+dd[2]+'日';
		}
	},
	//返回移除了任何 HTML 或 XML 标签的字符串
	stripTags: function() {
		return this.replace(/<\/?[^>]+>/gi, '');
	},
	//返回移除了任何 <script /> 块的字符串
	stripScripts: function(str) {
		return str.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'), '');
	},

	//与 escapeHTML() 相反
	unescapeHTML: function(str) {
		var temp = document.createElement("div");
		temp.innerHTML = str;
		var result = temp.childNodes[0].nodeValue;
		temp.removeChild(temp.firstChild)
		return result;
	}


	});//base end 

});
