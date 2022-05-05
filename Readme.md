# WEB IM
## Run Server
```bash
> pip install -r requirements.txt

> python manage.py runserver
```
(Default)Then starting development server at http://127.0.0.1:8000/

## Parts
**前端处理模块('static/js/*'),后端的所有功能,前端都有对应的函数** 

1. 用户管理模块('user/')
   - 后端`login` `register`
   - 前端 `register.js`里对输入进行验证
2. 好友管理模块
3. 消息管理模块
4. 辅助模块





## Details

> 画图[processon](https://www.processon.com/) ,全都默认就行

1. 需求分析...(chen)

2. 引言
   1. 引言
   2. 系统功能设计
      1. 功能模块设计
         - 各个模块汇总的一张图
      2. 用户管理模块设计
         - `**子模块:包含**功能。`
      3. 好友管理模块
      4. 消息管理模块
      5. 辅助模块
   3. 数据库设计
      - 打开`db.sqllite3`,介绍里面的表
   4. 接口及过程设计
      - 各个模块的IPO图
   5. 界面设计
      - 交给wu神写
   6. 其他设计
      - api返回的json格式内容
   7. 设计小结
      - 瞎扯就行了
3. 系统实现
   1. 人员安排
   2. 系统通用类介绍
      - 介绍下django里的基本模块
   3. 用户管理模块实现
      1. **模块实现简介
      2. **模块相关函数实现
         1. 前端
         2. 后端
      3. **模块文件及跳转关系
         1. 模块涉及代码函数列表
         2. 模块涉及页面跳转关系图
      4. **模块程序流程
         - 流程图
      5. **模块实现界面
   4. 好友管理模块实现
   5. 消息管理模块实现
   6. 辅助模块实现
   7. 实现小结
4. 系统测试...(wu)
5. 心得体会...(together)
