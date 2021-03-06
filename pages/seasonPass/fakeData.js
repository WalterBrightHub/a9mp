import moment from 'moment'

const seasonPassAL = {
  seasonName: 'Lamborghini赛季',
  startTime: 1580032800000,
  endTime: 1617098400000,
  episodes: [{
    episode_id: 1,
    missions: []
  }, {
    episode_id: 2,
    missions: [{
      tags: ['高地穿梭', 'Lamborghini'],
      mapNames: ['高原峡谷'],
      solution: '第5章 兰博基尼 第10关'
    }, {
      tags: ['古老斗技场', ],
      mapNames: ['偏僻小道'],
      solution: '第3章 斗兽场之车 第12关'
    }, {
      tags: ['明珠港口', ],
      mapNames: ['东方巴黎'],
      solution: '第2章 东部逃亡 第1关'
    }, {
      tags: ['西部牧场'],
      mapNames: ['龙卷风！'],
      solution: '第2章 终极肌肉 第1关'
    }, ]
  }, {
    episode_id: 3,
    missions: [{
      tags: ['古老斗技场', '蓝牛'],
      mapNames: ['旧时风情'],
      solution: '第3章 斗兽场之车 第14关'
    }, {
      tags: ['沙漠迷雾/热带天堂'],
      mapNames: ['岛屿幻想', '胜地冲刺'],
      solution: '第2章 欢迎来到天堂 第1关'
    }, {
      tags: ['神山垭口', ],
      mapNames: ['信仰之跃'],
      solution: '第3章 异域野兽 第1关'
    }, ]
  }, {
    episode_id: 4,
    missions: [{
      tags: ['樱花港', ],
      mapNames: ['明治冲击'],
      solution: '第1章 樱花之旅 第1关'
    }, {
      tags: ['高地穿梭', ],
      mapNames: ['高原峡谷'],
      solution: '第1章 D级新手 第1关'
    }, {
      tags: ['大桥海湾', ],
      mapNames: ['喧闹铁路'],
      solution: '第1章 纯肌肉车 第1关'
    }, ]
  }, {
    episode_id: 5,
    missions: [{
      tags: ['古老斗技场', 'Lamborghini'],
      mapNames: ['永恒之城'],
      solution: '第3章 斗兽场之车 第3关'
    }, {
      tags: ['热带天堂', ],
      mapNames: ['酒店大道'],
      solution: '第2章 欢迎来到天堂 第2关'
    }, {
      tags: ['明珠港口', ],
      mapNames: ['东方巴黎'],
      solution: '第2章 东部逃亡 第1关'
    }, {
      tags: ['沙漠迷雾/西部牧场', ],
      mapNames: ['岛屿幻想', '龙卷风！', '铁道迷'],
      solution: '第1章 D级职业 第1关'
    }, ]
  }, {
    episode_id: 6,
    missions: [{
        tags: ['西部牧场', ],
        mapNames: ['时间旅行'],
        solution: '第4章 B级职业 第1关'
      }, {
        tags: ['高地穿梭', 'Lamborghini'],
        mapNames: ['高原峡谷'],
        solution: '第5章 Lamborghini 第10关'
      },
      {
        tags: ['大桥海湾', '360度撞翻'],
        mapNames: ['决战大桥'],
        solution: '第2章 通缉 第7关'
      }, {
        tags: ['神山垭口', ],
        mapNames: ['信仰之跃'],
        solution: '第3章 异域野兽 第1关'
      }, {
        tags: ['热带天堂', ],
        mapNames: ['胜地冲刺'],
        solution: '第2章 欢迎来到天堂 第1关'
      }, {
        tags: ['樱花港', ],
        mapNames: ['明治冲击'],
        solution: '第1章 樱花之旅 第1关'
      },
    ]
  }, ]
}

const seasonPassGL = {
  seasonName: '电光石火赛季',
  startTime: new Date('2021-2-12 18:00 utc+8').getTime(),
  endTime: new Date('2021-4-8 18:00 utc+8').getTime(),
  episodes: [{
    episode_id: 1,
    missions: [{
        tags: ['加勒比海'],
        mapNames: ['地狱谷'],
        solution: '第2章 Fire & Lighting 第1关'
      },

    ]
  }, {
    episode_id: 2,
    missions: [{
      tags: ['上海', '英菲尼迪'],
      mapNames: ['漫步南京路'],
      solution: '第2章 Fire & Lighting 第2关'
    }]
  }, {
    episode_id: 3,
    missions: [{
      tags: ['内华达'],
      mapNames: ['发夹冲刺'],
      solution: '第2章 Fire & Lighting 第3关'
    }, {
      tags: ['苏格兰', ],
      mapNames: ['灯塔'],
      solution: '第2章 Fire & Lighting 第4关'
    }, ]
  }, ]
}

export {
  seasonPassGL,
  seasonPassAL
}
