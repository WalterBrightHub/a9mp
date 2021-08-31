const getMethods=[
  {name:'战利品',field:'getLoot'},
  {name:'每日任务',field:'getGoals'},
  {name:'级别杯',field:'getClassCup'},
  {name:'传奇商店',field:'getStore'},
  {name:'独家赛事',field:'getExclusive'},
  {name:'寻车',field:'getHunt'},
  {name:'通行证',field:'getLegendPass'},
  {name:'惊艳亮相',field:'getUnleash'},
  {name:'经典多人',field:'getClassicMP'},
  {name:'1VS1',field:'get1vs1'},
  {name:'特殊赛事',field:'getSpecialEvent'},
  {name:'大奖赛',field:'getGrandPrix'},
  {name:'车联赛事',field:'getDriveSyndicate'},
]
const getMethodField=getMethods.map(item=>item.field)

export default [
  'car_id',
  'fullName',
  'carClass',
  'quality',
  ...getMethodField
]

export {getMethodField,getMethods}