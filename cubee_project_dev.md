# 基于cubee的项目开发 #

  1. 项目应当单独占据一个js文件，
  1. 这个js文件应当按照如下方式添加进页面中：
```
TBloader.addmojo({
    't-framework-hack':{
   fullpath:'http://taobao-wd.ns1.name/jayli/cubee/demo/js/t-framework-hack.js',
   requires:['node','event','t-framework']
    }
}).require('t-framework-hack').onReady(function(){
    T.DP.framework.init();
});
```
这段代码可以是在页面文件cubee种子引用后的任意地方，建议放到页面的body结束处。

# 项目的命名规则 #

  * 暂不对项目的命名规则做硬性规定，但建议项目的命名规则和框架保持一致，即页面逻辑所在的js文件应当由小写字母和中横线组成，模块名称也是由小写字母和中横线组成
  * 项目所需要的资源文件比如js、css和img不应当和cubee放在一起