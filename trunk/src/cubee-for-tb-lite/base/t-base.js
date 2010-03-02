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
	* �ύ���ݺ���
	* @memberOf T.base
	* @param method {string}  �ύ��ʽ
	* @param url {string} �ύ��ַ
	* @param suback {function} �ɹ���Ķ���
	* @param data {string}: POST�����ݣ����ʹ��setForm()����Ϊnull
	* @param onfailure {function}:ʧ�ܵĻص�
	* @param contentType {string}:��������
	* @param args {object}: Y.io��argument
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
						Y.log('�ӿڷ���Ϊ�գ����߸�ʽ����','error');
						//onfailure('�������');	
						return;
					}
					if(typeof re.status == 'undefined'){
						Y.log('���ݸ�ʽ����','error');
						//onfailure('���ݸ�ʽ����');	
						return;
					}
					if(Number(re.status) == -1){
						onfailure(re.errContent);
						return;
					}
					suback(re.data);
				}
				/*
				failure:onfailure('�ύ��...')
				*/
			}
		};
		var request = Y.io(url,cfg);
	},

	trim:function(str){
		return str.replace(/(^\s*)|(\s*$)/g, ""); 
	},

	/**
	* �õ�URL��search�ֶκ�hash�ֶεı�����search�ֶ�����
	* @param { string } ��Ҫ�õ�������URL��Ĭ��Ϊ��ǰҳ�������
	* @memberOf T.base
	* @return { object } ����ΪJSON������ͨ��getUrlValue()['key']���õ�
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
	* �õ�URL��hash�ֶεı���
	* @memberOf T.base
	* @param { string } ��Ҫ�õ�������URL��Ĭ��Ϊ��ǰҳ�������
	* @return { object } ����ΪJSON������ͨ��getHash()['key']���õ�
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
	* ��url�е�hash�ֶθ�����������һ��������url
	* @param { string } sUrl: ��Ҫ��ֵ��url�ַ���
	* @param { object } data: ��Ҫ��ֵ��key:value��
	* @return { string } ����һ��������url
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
	 * �������
	 * @param { array } a: ԭʼ����
	 * @param { number } n: ���� 
	 * @return { array } aa:���ز�ֺõ�����
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
	* ɾ�������е�item,ֻƥ���һ��
	* @memberOf T.base
	* @param { value } v : Ҫɾ������ֵ
	* @param { array }a : ��Ҫ����������
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
	* �滻�����е�item,ֻƥ���һ��
	* @memberOf T.base
	* @param { value } v : Ҫ�滻����ֵ
	* @param { value } n : �µ���ֵ
	* @param { array } a : ��Ҫ����������
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
	* �ж���ֵ�Ƿ����������
	* @memberOf T.base
	* @param {value } v : Ҫƥ�����ֵ
	* @param { array } a : ���ڵ�����
	* @return { boolean } ����һ������ֵ
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
	* �����ַ�����,һ�����ĵ���2��Ӣ�ĳ��ȼ���
	* @memberOf T.base
	* @param { string }  ��Ҫ�󳤶ȵ��ַ���
	* @return { number } �õ�����õĳ���
	*/
	cn_strlen : function(string){
		return string.replace(/[^\u00-\uFF]/g, "**").length;
	},
	/**
	* ���ֺ���,���Լ������Ľ�ȡ
	* @memberOf T.base
	* @param {string} string:��Ҫ��ȡ���ַ���
	* @param {number} length : ��Ҫ��ȡ�ĳ��ȣ���Ӣ��Ϊ׼��һ������������Ӣ�ģ����Զ���...��
	* @return {string} ���ؽ�ȡ����ַ���
	*/
	substr : function(string, length){
		//stringΪ��ʱ���ؿհ�
		if(string === undefined){
			return "";
		}
		//start��������������ʱ����ԭ�ı�
		if(typeof length != "number"){
			return string;
		}
		//�����Ȳ���ʱ�����ص�ǰ�ı�
		if(string.length*2 <= length){
			return string;
		}
		//��ʼ����
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
		//�����Ĳ���
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
	* ģ�庯��
	* @memberOf T.base
	* @param { string } templet : ģ��
	* @param { object } data : ģ����Ҫ������
	* @return �������ģ������õ�HTML
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
	* add event,���ȶ�����o���fun�ĺ���������ʹ��o����ʱ�Զ�ִ��fun 
	* @method AE 
	* @memberOf T.base
	* @param {Function} ���۲���  
	* @param {Function} Ҫfire�ĺ��� 
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
	* ����Ŀ�¡
	* @method YAHOO.CN.sns.base.clone
	* @memberOf T.base
	* @param o ����¡�Ķ���
	*/
	clone :Y.clone,
	/**
	* �������ַ��Ľ������,�����ַ���
	* @method YAHOO.CN.sns.base.wbtrim
	* @memberOf T.base
	* @param { string } str ��ԭʼ�ַ���
	* @param { number } count:�ضϵĵ�λ����,Ĭ��Ϊ40
	* @return { string } str:���ع��˺���ַ���
	*/
	wbtrim:function(str,count){
		var count = count || 10;
		//var thexp = new RegExp("(([!@#$%^&*_+=-]|[a-z]|[A-Z]|[0-9])+|\s|.)","g");
		var thexp = new RegExp("(([!@#$%^&*_+=-����@��������������������������]|[a-z]|[A-Z]|[0-9])+|\s|.)","g");
		var a = str.match(thexp);
		var _str = '';
		for(var i = 0;i<a.length;i++){
			if(a[i].length>count && /([!@#$%^&*_+=-����@��������������������������]|[a-z]|[A-Z]|[0-9])+/i.test(a[i])){
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
	* ����������ַ���,����Ĳ���ʹ��ʡ�Ժű�ʾ
	* @method trimSize
	* @param { string } str ��ԭʼ�ַ���
	* @param { number } bsize:��Ҫ������ַ�������
	* @memberOf T.base
	* @return { string } str:���ؽ�ȡ����ַ���
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
	* �����Ƴ����κ� HTML �� XML ��ǩ���ַ���
	* @method stripTags
	* @param { string } str ��ԭʼ�ַ���
	* @memberOf T.base
	* @return { string } str:���ع��˺���ַ���
	*/
	stripTags: function(str) {
		return str.replace(/<\/?[^>]+>/gi, '');
	},
	/**
	* ���ع��˺��html�ı�
	* @method stripHTML
	* @param { string } str ��ԭʼ�ַ���
	* @memberOf T.base
	* @return { string } str:���ع��˺���ַ���
	*/
	stripHTML: function(str){
		return str.replace('<','&lt;').replace('>','&gt;').replace('"','&quot;').replace('&','&amp;');
	},
	/**
	* �����Ƴ����κ�script����ַ���
	* @method stripScripts
	* @param { string } str ��ԭʼ�ַ���
	* @memberOf T.base
	* @return { string } str:���ع��˺���ַ���
	*/
	stripScripts: function(str) {
		return str.replace(new RegExp('<script[^>]*>([\\S\\s]*?)<\/script>', 'img'), '');
	}

	//�� escapeHTML() �෴
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

