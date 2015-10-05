# 组件开发原则 #

  * 开发者在开发过程中遇到需要可以抽象出公用组件的部分，需要将其抽象出公用组件，放到cubee中，以避免其他人实现类似的组件进行重复开发，命名空间应当属于T.DP.tbwidget(根据不同的网站定制，每个定制都统一即可)
  * 开发者在开发过程中遇到常用的功能性函数，需要将其抽象出通用函数，放到cubee中，作为一个通用解决方案避免其他人实现类似的方案进行的重复开发。命名空间应当属于T.base
  * 凡是进行组件和通用函数的开发，都应当在t-mojos.js中定义好其依赖关系。

# 公用组件的开发 #
  * 开发者在开发公用组件的时候，需要自己命名组件名称，组件名称必须使用小写字母数字和中横线，语义上应当是“形容词-名词”，能简写的尽量简写，不要使用匈牙利命名或者使用下划线分割单词（为了保持和yui3组件命名风格一致），例如组件的名称可以为：
```
mini-menu，ad-slider，nava-banner
```
> 这些是不好的命名：
```
miniMenu，ad_slider，tabnew-advertisment
```
  * 原则上并不对组件的js文件命名规则做硬性规定，但仍然建议组件的js文件的命名应当和cubee和yui3的js文件命名风格一致，即应当由小写字母和中横线组成，单词之间的隔断使用中横线。如果组件需要由多个新开发的子模块组成，则组件的命名和其子模块的命名应当有继承关系，例如，组件的名称是 mini-menu，其js文件名为t-minimenu.js，这个组件需要拆分成若干子模块，则可以命名为t-minimenu-extend.js 和t-minmenu-iframe.js等
  * 组件所在的目录应当是cubee/tbwidget/中，每个组件存放于一个目录中，目录的命名必须使用小写字母，不建议使用中横线和下划线，除非组件包含版本，则可以使用类似minimenu\_1\_1\_beta的命名方式，鉴于taobaocdn可以覆盖，所以普通的组件开发不推荐使用版本号来组成目录的命名。
  * 组件所需要的资源文件包括css和img等资源需要放在组件所在目录根下，css文件也应当作为组件的子模块，因此模块名称可以为“t- minimenu-css”，css文件和img的命名暂不做硬性规定。
  * 组件需要在cubee/base/t-mojos.js中定义好新开发组件的名称和引用的css和js文件地址。例如t-mojos.js中关于base 的定义：
```
TBloader.addmojo({
    't-base':{
   fullpath:cubeeBase+'base/t-base.js',
   requires:[]
    },
    't-base-io':{
   fullpath:cubeeBase+'tbwidget/t-base-io.js',
   requires:['t-base']
    },
    't-base-templet':{
   fullpath:cubeeBase+'tbwidget/t-base-templet.js',
   requires:['t-base']
    }
});
```
  * 完善文档。