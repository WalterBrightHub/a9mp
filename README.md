# 狂飙小助手

使用uni-app构建，使用uniCloud云开发。

## 微信小程序

![](https://cdn.jsdelivr.net/gh/WalterBrightHub/image-hosting/20200612165059.jpg)
## QQ小程序

![](https://cdn.jsdelivr.net/gh/WalterBrightHub/image-hosting/20200612171026.png)

## 更新日志

### 1.7.0 2021-5-5

+ 修复：通行证任务指引页面，未能分别显示国服与国际服生涯的问题。
+ 修复：打开小程序时，未加载数据时显示“空空如也”的问题。
+ 改进：地图页面和通行证指引页面，计时赛和追逐赛将优先显示在最上方。
+ 改进：通行证任务明确为计时赛时，任务指引查询结果将只显示计时赛。追逐赛同理。+ 改进：现在宽屏Pad设备访问更友好了。（420px是一个节点，最新苹果设备为414px。）
+ 改进：多个页面顶栏的交互更友好了。
+ 改进：现在国服/国际服切换按钮移动到了自定义top-bar上。
+ 改进：深色模式下更美观了。
+ 改进：车辆页面入口：数据排序、版本新车、品牌分类、获取方式。
+ 新增：地图页面中英对照功能。
+ 新增：车辆卡片显示氮速、空速、总图纸数。
+ 新增：点击车辆卡片，跳转到车辆详情页面，可以查看车辆信息，并且可以查询关联赛事。
+ 新增：数据统计功能。
+ 新增：赛事页面，加入赛事进度条，直观了解时间进度。
+ 新增：关键词搜索功能，快速直达车辆。
+ 其他一些微小的工作。

### 1.6.2 2021-4-6

+ 修复：地图页面，未能分别显示国服与国际服生涯的问题。（例：纽约-量子跃迁）
+ 改进：现在Tab图标更美观了。

### 1.6.1 2021-3-9

+ 新增：赛事页面查看精选车辆功能。
+ 新增：通行证页面支持分享。
+ 修复：地图页面查询结果没有正确排序的问题。
+ 修复：地图页面刷新时没有刷新Themes和Tracks的问题。

### 1.6.0 2021-2-27

+ 新增：通行证任务查看功能。
+ 改进：地图页面更方便地查询。

### 1.5.3 2021-2-27

+ 修复：现在改装费、单喷时间未知时，会显示“机密”。
+ 新增：加载时显示一个圈圈动画。
+ 修复：地图查询潜在的问题，即未配置page-size时默认只加载20条数据。
+ 修复：获取tracks表时未设置limit导致默认只获取100条数据的问题。
+ 修复：国际服进入小程序时显示国服D级数据的问题。

### 1.5.2 2021-2-14

+ 数据库查询全部迁移到unicloud-db前端组件。
+ 改进了车辆卡片的界面：单喷时间未知时不显示、国服未发布的车辆显示提醒、修复图纸数量未知时的宽度问题。
+ 按照释放版本查看时，可以方便地看到小记，如“2.5 法拉利赛季”，使用更方便。
+ 修改了分享内容时的文字内容，更直观地看到程序的特色。

### 1.5.1 2021-1-20

+ 调整按等级排布下车辆改为_id排序，而不是rank排序（针对只知道0改数据的新车）
+ 首页性能优化
+ 赛事页面默认展示“热门”，即当前进行的和未来举行的；历史赛事在新增“往期”选项中。

### 1.5.0 2020-11-16

+ 地图页面新增精确查询功能，精准找到赛道位置。
+ 重新组织了赛事页面，添加国际服赛事，添新增筛选功能，使用更便捷。
+ 调整了车辆页面UI，修复了单喷时间未测时显示0.00的BUG。
+ 现在国服和国际服可跟随切换。
+ 云服务转移到了UniCloud。赛事页面使用clientdb组件，但刷新时会清空数据，造成页面闪动。

### 1.4.0 2020-7-10

+ 车辆页面新增“版本释放”筛选选项。
+ 车辆页面的“全车”选项优化了长列表加载体验，同时加入升序/降序功能。
+ 优化了车辆卡片中的小数点显示。
+ 卡片显示等级
+ 赛事列表显示
+ 国服国际服车辆列表全局切换

### 1.3.2 2020-6-12

+ 调整了页面Tab顺序为车辆、地图、赛事。
+ 调整了赛事页面的UI
+ 地图页面可切换国服/国际服
+ 车辆页面新增筛选选项，可按国际服等级、国服等级、性能、品牌厂商来排布车辆。