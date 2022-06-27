const specialEventData = {
  havePack: true,
  toolCars: [{
      _id: 'f5',
      fullName: 'Venom F5',
      isKeyCar: true,
      rankLimits: [],
      star: 6,
      getMethod: '特殊赛事',
    },{
      _id: 'lancer',
      fullName: 'Mitsubishi Lancer Evolution',
      isKeyCar: false,
      rankLimits: [1000, 1381],
      star: 3,
      getMethod: '寻车',
    },
    {
      _id: 'chiron',
      fullName: 'Bugatti Chiron',
      isKeyCar: false,
      rankLimits: [4000, 4755],
      getMethod: '精英大奖赛',
      star: 6,
    },
    {
      _id: 'jesko',
      fullName: 'Koenisegg Jesko🔑',
      isKeyCar: true,
      rankLimits: [4000, 4826],
      getMethod: '惊艳亮相',
      star: 6,
    },
  ],
  notes: [
    '俱乐部赛季可获取3张图纸',
    '通行证可获取1张图纸，',
    '高级通行证可再获取3张图纸，1张金卡'
  ],
  processRewords: [{
    conditions: 5,
    reword: {
      type: 'seCard',
      count: 1,
    }
  }, {
    conditions: 25,
    reword: {
      type: 'seCard',
      count: 1,
    }
  }, {
    conditions: 45,
    reword: {
      type: 'seCard',
      count: 1,
    }
  }, {
    conditions: 65,
    reword: {
      type: 'seCard',
      count: 1,
    }
  }, {
    conditions: 85,
    reword: {
      type: 'seCard',
      count: 1,
    }
  }, {
    conditions: 90,
    reword: {
      type: 'seKey',
      count: 1,
    }
  }, ],
  stages: [{
    clubRewords: [{
        type: 'token',
        count: 100
      },
      {
        type: 'credit',
        count: 10000
      },
      {
        type: 'seCard',
        count: 5
      },
      {
        type: 'sePack',
        count: 5
      },
    ],
    unlockConditions: 0,
    missions: [{
      tooCarId: 'lancer',
      join: {
        freeTry: false,
        star: 1,
        rank: -1,
      },
      conditions: 5,
      rewords: [{
          type: 'token',
          count: 100
        },
        {
          type: 'credit',
          count: 10000
        },
        {
          type: 'seCard',
          count: 5
        },
        {
          type: 'sePack',
          count: 5
        },
      ],
    }, {
      tooCarId: 'lancer',
      join: {
        freeTry: false,
        star: 2,
        rank: -1,
      },
      conditions: 10,
      rewords: [{
          type: 'token',
          count: 100
        },
        {
          type: 'credit',
          count: 10000
        },
        {
          type: 'seCard',
          count: 5
        },
        {
          type: 'sePack',
          count: 5
        },
      ],
    }, {
      tooCarId: 'lancer',
      join: {
        freeTry: false,
        star: 3,
        rank: -1,
      },
      conditions: 15,
      rewords: [{
          type: 'token',
          count: 100
        },
        {
          type: 'credit',
          count: 10000
        },
        {
          type: 'seCard',
          count: 5
        },
        {
          type: 'sePack',
          count: 5
        },
      ],
    }]
  }, {
    clubRewords: [{
        type: 'token',
        count: 100
      },
      {
        type: 'credit',
        count: 10000
      },
      {
        type: 'seCard',
        count: 5
      },
      {
        type: 'sePack',
        count: 5
      },
    ],
    unlockConditions: 20,
    missions: [{
      tooCarId: 'chiron',
      join: {
        freeTry: false,
        star: 1,
        rank: -1,
      },
      conditions: 5,
      rewords: [{
          type: 'token',
          count: 100
        },
        {
          type: 'credit',
          count: 10000
        },
        {
          type: 'seCard',
          count: 5
        },
        {
          type: 'sePack',
          count: 5
        },
      ],
    }, {
      tooCarId: 'chiron',
      join: {
        freeTry: false,
        star: 2,
        rank: -1,
      },
      conditions: 50,
      rewords: [{
          type: 'token',
          count: 100
        },
        {
          type: 'credit',
          count: 10000
        },
        {
          type: 'seCard',
          count: 5
        },
        {
          type: 'sePack',
          count: 5
        },
      ],
    }, {
      tooCarId: 'chiron',
      join: {
        freeTry: false,
        star: 3,
        rank: -1,
      },
      conditions: 15,
      rewords: [{
          type: 'token',
          count: 100
        },
        {
          type: 'credit',
          count: 10000
        },
        {
          type: 'seCard',
          count: 5
        },
        {
          type: 'sePack',
          count: 5
        },
      ],
    }]
  }, {
    clubRewords: [{
        type: 'token',
        count: 100
      },
      {
        type: 'credit',
        count: 10000
      },
      {
        type: 'seCard',
        count: 5
      },
      {
        type: 'sePack',
        count: 5
      },
    ],
    unlockConditions: 10,
    missions: [{
      tooCarId: 'jesko',
      join: {
        freeTry: true,
        star: 1,
        rank: -1,
      },
      conditions: 5,
      rewords: [{
          type: 'token',
          count: 100
        },
        {
          type: 'credit',
          count: 10000
        },
        {
          type: 'seCard',
          count: 5
        },
        {
          type: 'sePack',
          count: 5
        },
      ],
    }, {
      tooCarId: 'jesko',
      join: {
        freeTry: true,
        star: 2,
        rank: -1,
      },
      conditions: 10,
      rewords: [{
          type: 'token',
          count: 100
        },
        {
          type: 'credit',
          count: 10000
        },
        {
          type: 'seCard',
          count: 5
        },
        {
          type: 'sePack',
          count: 5
        },
      ],
    }, {
      tooCarId: 'jesko',
      join: {
        freeTry: true,
        star: 3,
        rank: -1,
      },
      conditions: 15,
      rewords: [{
          type: 'token',
          count: 100
        },
        {
          type: 'credit',
          count: 10000
        },
        {
          type: 'seCard',
          count: 5
        },
        {
          type: 'sePack',
          count: 5
        },
        {
          type: 'seSkin',
          count: 1
        },
      ],
    }]
  }]
}

const canJoin=(join,userCar)=>{
  return join.rank<=userCar.rank&&(join.freeTry||userCar.unlock)&&join.star<=userCar.star
}

export default specialEventData

export {canJoin}
