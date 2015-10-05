# 一级 #
|名称 	|描述|
|:---|:-|
|T 	 |一级所有的js命名空间都应当包含在同一个根"T"下,理解为所有的命名空间的根，以及yui3的所有组件的根，即T=Y|
|YUI 	|yui3的YUI全局对象|
|Cubee 	|Cubee全局对象|

# 二级 #
|名称 	|描述|
|:---|:-|
|T.base |	cubee库的公用函数的根，base是小写|
|T.Base |	yui3的库|
|T.widget |	yui3的组件|
|T.tbwidget |	淘宝的组件的命名空间|
|T.DP| 	产品缩写作为二级命名空间，产品缩写应当全为大写|

# 三级 #
|名称 |	描述|
|:--|:--|
|T.base.inArray 	|function(){};cubee库中的成员|
|T.DP.projectName 	|项目所在的单体|
|T.Node.get 	|YUI的Node方法|
|T.tbwidget.sliderBar 	|cubee公用组件|