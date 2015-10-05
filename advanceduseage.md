# Cubee全局静态对象 #
Cubee是由种子文件带出来的全局静态对象，用于生成类似yuiloader的实例，cubee包含：
|成员  	 |描述  |	 属性|
|:-----|:---|:---|
|Cubee._INFOPATH_|cubee-info.js的路径 |	静态属性|
|Cubee._GM_|globalModules，用于存放全局模块列表 	|静态属性|
|Cubee._GR_|globalRequires，用于存放全局模块引用的列表 |	静态属性|
|Cubee._AGR_|all golbal requires，用于存放包含yui3组件在内的所有引用模块列表| 	静态属性|
|Cubee.prototype.init |	构造器的初始化 |	原型方法|
|Cubee.prototype.addmojo |	增加模块 |	原型方法|
|Cubee.prototype.addmodule| 	同上 	|原型方法|
|Cubee.prototype.onReady 	|加载成功的回调 |	原型方法|
|Cubee.prototype.onFailure |	加载失败的回调| 	原型方法|
|Cubee.prototype.configure |	配置 	|原型方法|
|Cubee.prototype.require 	|引用模块 |	原型方法|
|Cubee.prototype.distinct 	|数组去重 |	原型方法|
|(new Cubee()).start 	|启动入口 |	实例成员|

# Cubee的用法 #
Cubee应当在定义页面逻辑的时候使用，比如工程师需要在页面中实现一个功能模块，则可以这样：
Cubee应当在定义页面逻辑的时候使用，比如工程师需要在页面中实现一个功能模块，则可以这样：
```
new Cubee().addmojo({/*custom module*/}).require('*').onReady(function(){
   //your code
}).start();
```
这里的start()是这段逻辑执行的入口，这段代码是说程序模块加载完成后立即执行。通常为了保持页面逻辑清晰，则可以将start()放入需要执行的入口处。比如可以这样添加主要代码：
```
var adBanner = new Cubee().addmojo({/*custom module*/}).require('*').onReady(function(){
   //your code
});
```
然后在其调用处添加启动入口
```
//other code
adBanner.start();
//other code
```
cubee对象作为组织页面js代码的工具，只能在页面中开辟出一段script代码区域中使用，不能在模块所在的js文件中使用。

demo： http://cubee-js.googlecode.com/svn/trunk/sandbox/demo_index.html