## BoxSelection

该工具需要实例化才能使用,遵循ES6语法，建议在webpack下进行使用,import导入开发环境中

### API


#### BoxSelection()构造函数

参数{trigger,cube,cubecontent}

+	trigger  :	获取触发事件的容器,ID或者类名
+	cube   :   object  可选参数
  +	cube.backgroundColor  :  框选元素的背景颜色 ，默认是'rgba(65,105,225,.2)'
  +	cube.border   :   框选元素的边框颜色，默认是'1px dashed #1967D2',
+	cubecontent   :   要进行框选选中的元素class类名



### 事件

#### onselect				

进行框选事件，参数callback(data)

callback(data)存放着进行框选时选中的cubecontent元素
