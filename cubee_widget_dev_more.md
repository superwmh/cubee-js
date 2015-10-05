# 基于cubee的模块代码的书写 #

基于cubee的模块代码的书写风格和yui3的模块代码书写风格保持一致，即推荐使用如下写法：
```

YUI.namespace('T.DP.projectname');
YUI.add('t-projectname',function(Y){
    _P = {
        init:function(){
       Y.log(Y.dump(window));
        }
    };
    T.DP.projectname = _P;
},'',{requires:['dump']});
```
也可以使用非yui3风格的写法
```
YUI.namespace("T.DP.projectname");
T.DP.projectname = function(){
   return {
      init:function(){}
   };
}();
```