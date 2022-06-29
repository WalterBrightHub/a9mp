export default {
  "havePack": false,
  "haveClubRewords": false,
  "haveSkin": true,
  "havePackConditions": true,
  "haveEventKey": false,
  "packConditions": 285,
  "dataTableImage": "https://s3.bmp.ovh/imgs/2022/06/28/b6bc33ae95b28661.jpg",
  "toolCars": [ {
    "car_id": "v12",
    "fullName": "Aston Martin V12 Speedster",
    "nickName": "AM V12",
    "isKeyCar": false,
    "rankLimits": [],
    "star": 4,
  }, {
    "car_id": "n",
    "fullName": "Apollo N",
    "nickName": "菠萝",
    "isKeyCar": false,
    "rankLimits": [],
    "star": 5,
  }, {
    car_id: "570",
    "fullName": "McLaren 570S",
    "nickName": "570s",
    "isKeyCar": false,
    "rankLimits": [],
    "star": 6,
  }, {
    "car_id": "aperta",
    "fullName": "Ferrari Laferrari Aperta",
    "nickName": "黑拉法",
    "isKeyCar": false,
    "rankLimits": [],
    "star": 6,
  }, {
    "car_id": "bc",
    "fullName": "Pagani Huayra BC",
    "nickName": "BC",
    "isKeyCar": false,
    "rankLimits": [],
    "star": 6,
  }, {
    "car_id": "sc20",
    "fullName": "Lamborghini SC20",
    "nickName": "SC20",
    "isKeyCar": true,
    "rankLimits": [],
    "star": 6,
  }, {
    "car_id": "nsxgt3",
    "fullName": "Acura NSX GT3 Evo",
    "nickName": "讴歌GT3",
    "isKeyCar": true,
    "rankLimits": [],
    "star": 5,
  },{
    "car_id": "veyron",
    "fullName": "Bugatti Veyron",
    "nickName": "威龙",
    "isKeyCar": false,
    "rankLimits": [],
    "star": 6,
  },],
  "notes": [],
  "processRewords": [
    {
      "conditions": 50,
      "reword": {
        "type": "seCard",
        "count": 1
      }
    },
    {
      "conditions": 100,
      "reword": {
        "type": "seCard",
        "count": 1
      }
    },
    {
      "conditions": 150,
      "reword": {
        "type": "seCard",
        "count": 1
      }
    },
    {
      "conditions": 200,
      "reword": {
        "type": "seCard",
        "count": 1
      }
    },
    {
      "conditions": 300,
      "reword": {
        "type": "sePart",
        "count": 1
      }
    },
    {
      "conditions": 350,
      "reword": {
        "type": "sePart",
        "count": 1
      }
    },
    {
      "conditions": 400,
      "reword": {
        "type": "sePart",
        "count": 1
      }
    },
    {
      "conditions": 450,
      "reword": {
        "type": "sePart",
        "count": 1
      }
    },
  ],
  "stages": [
    {
      unlockConditions: 0,
      clubRewords: [],
      missions: [
        {
          join: { star: 1, rank: 0, },
          conditions: 15,
          toolCars: [
            { car_id: 'v12', freeTry: true },
          ],
          rewords: [
            { type: 'credit', count: 300000 },
          ],
        },
        {
          join: { star: 2, rank: 0, },
          conditions: 5,
          toolCars: [
            { car_id: 'v12', freeTry: true },
          ],
          rewords: [
            { type: 'token', count: 125 },
          ],
        },
        {
          join: { star: 3, rank: 0, },
          conditions: 3,
          toolCars: [
            { car_id: 'v12', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 3 },
          ],
        },
      ]
    },
    {
      unlockConditions: 10,
      clubRewords: [],
      missions: [

        {
          join: { star: 1, rank: 0, },
          conditions: 10,
          toolCars: [
            { car_id: 'n', freeTry: true },
          ],
          rewords: [

          ],
        },
        {
          join: { star: 2, rank: 0, },
          conditions: 10,
          toolCars: [
            { car_id: 'n', freeTry: true },
          ],
          rewords: [
            { type: 'credit', count: 300000 },
          ],
        },
        {
          join: { star: 3, rank: 0, },
          conditions: 6,
          toolCars: [
            { car_id: 'n', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 1 },
            { type: 'token', count: 125 },
          ],
        },
        {
          join: { star: 4, rank: 0, },
          conditions: 5,
          toolCars: [
            { car_id: 'n', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 2 },
            { type: 'credit', count: 150000 },
          ],
        },
      ]
    },
    {
      unlockConditions: 20,
      clubRewords: [],
      missions: [

        {
          join: { star: 1, rank: 0, },
          conditions: 23,
          toolCars: [
            { car_id: 'veyron', freeTry: true },
          ],
          rewords: [

            { type: 'token', count: 500 },

            { type: 'credit', count: 500000 },
          ],
        },
      ]
    },
    {
      unlockConditions: 30,
      clubRewords: [],
      missions: [

        {
          join: { star: 1, rank: 0, },
          conditions: 5,
          toolCars: [
            { car_id: '570', freeTry: true },
          ],
          rewords: [

          ],
        },
        {
          join: { star: 2, rank: 0, },
          conditions: 10,
          toolCars: [
            { car_id: '570', freeTry: true },
          ],
          rewords: [
            { type: 'credit', count: 300000 },
          ],
        },
        {
          join: { star: 3, rank: 0, },
          conditions: 6,
          toolCars: [
            { car_id: '570', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 1 },
            { type: 'token', count: 125 },
          ],
        },
        {
          join: { star: 4, rank: 0, },
          conditions: 4,
          toolCars: [
            { car_id: '570', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 1 },
            { type: 'credit', count: 150000 },
          ],
        },
        {
          join: { star: 5, rank: 0, },
          conditions: 6,
          toolCars: [
            { car_id: '570', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 3 },
            { type: 'credit', count: 225000 },
          ],
        },
      ]
    },
    {
      unlockConditions: 50,
      clubRewords: [],
      missions: [

        {
          join: { star: 1, rank: 0, },
          conditions: 5,
          toolCars: [
            { car_id: 'aperta', freeTry: true },
          ],
          rewords: [

          ],
        },
        {
          join: { star: 2, rank: 0, },
          conditions: 10,
          toolCars: [
            { car_id: 'aperta', freeTry: true },
          ],
          rewords: [
            { type: 'credit', count: 300000 },
          ],
        },
        {
          join: { star: 3, rank: 0, },
          conditions: 6,
          toolCars: [
            { car_id: 'aperta', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 1 },
            { type: 'token', count: 125 },
          ],
        },
        {
          join: { star: 4, rank: 0, },
          conditions: 4,
          toolCars: [
            { car_id: 'aperta', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 1 },
            { type: 'credit', count: 150000 },
          ],
        },
        {
          join: { star: 5, rank: 0, },
          conditions: 6,
          toolCars: [
            { car_id: 'aperta', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 3 },
            { type: 'credit', count: 225000 },
          ],
        },
      ]
    },
    {
      unlockConditions: 75,
      clubRewords: [],
      missions: [
        {
          join: { star: 1, rank: 0, },
          conditions: 5,
          toolCars: [
            { car_id: 'bc', freeTry: true },
          ],
          rewords: [

          ],
        },
        {
          join: { star: 2, rank: 0, },
          conditions: 10,
          toolCars: [
            { car_id: 'bc', freeTry: true },
          ],
          rewords: [
            { type: 'credit', count: 300000 },
          ],
        },
        {
          join: { star: 3, rank: 0, },
          conditions: 6,
          toolCars: [
            { car_id: 'bc', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 1 },
            { type: 'token', count: 125 },
          ],
        },
        {
          join: { star: 4, rank: 0, },
          conditions: 4,
          toolCars: [
            { car_id: 'bc', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 1 },
            { type: 'credit', count: 150000 },
          ],
        },
        {
          join: { star: 5, rank: 0, },
          conditions: 6,
          toolCars: [
            { car_id: 'bc', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 3 },
            { type: 'credit', count: 225000 },
          ],
        },
      ]
    },
    {
      unlockConditions: 100,
      clubRewords: [],
      missions: [

        {
          join: { star: 1, rank: 0, },
          conditions: 23,
          toolCars: [
            { car_id: 'veyron', freeTry: true },
          ],
          rewords: [

            { type: 'token', count: 300 },

            { type: 'credit', count: 500000 },
          ],
        },
      ]
    },
    {
      unlockConditions: 120,
      clubRewords: [],
      missions: [
        {
          join: { star: 1, rank: 0, },
          conditions: 5,
          toolCars: [
            { car_id: 'sc20', freeTry: true },
          ],
          rewords: [

          ],
        },
        {
          join: { star: 2, rank: 0, },
          conditions: 10,
          toolCars: [
            { car_id: 'sc20', freeTry: true },
          ],
          rewords: [
            { type: 'credit', count: 300000 },
          ],
        },
        {
          join: { star: 3, rank: 0, },
          conditions: 8,
          toolCars: [
            { car_id: 'sc20', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 3 },
            { type: 'token', count: 125 },
          ],
        },
        {
          join: { star: 4, rank: 0, },
          conditions: 8,
          toolCars: [
            { car_id: 'sc20', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 5 },
            { type: 'credit', count: 150000 },
          ],
        },
      ]
    },
    {
      unlockConditions: 150,
      clubRewords: [],
      missions: [
        {
          join: { star: 1, rank: 0, },
          conditions: 5,
          toolCars: [
            { car_id: 'nsxgt3', freeTry: true },
          ],
          rewords: [

          ],
        },
        {
          join: { star: 2, rank: 0, },
          conditions: 10,
          toolCars: [
            { car_id: 'nsxgt3', freeTry: true },
          ],
          rewords: [
            { type: 'credit', count: 300000 },
          ],
        },
        {
          join: { star: 3, rank: 0, },
          conditions: 6,
          toolCars: [
            { car_id: 'nsxgt3', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 1 },
            { type: 'token', count: 125 },
          ],
        },
        {
          join: { star: 4, rank: 0, },
          conditions: 5,
          toolCars: [
            { car_id: 'nsxgt3', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 2 },
            { type: 'credit', count: 150000 },
          ],
        },
      ]
    },
    {
      unlockConditions: 180,
      clubRewords: [],
      missions: [
        {
          join: { star: 1, rank: 0, },
          conditions: 23,
          toolCars: [
            { car_id: 'veyron', freeTry: true },
          ],
          rewords: [

            { type: 'token', count: 300 },

            { type: 'credit', count: 500000 },
          ],
        },
      ]
    },
    {
      unlockConditions: 200,
      clubRewords: [],
      missions: [

        {
          join: { star: 1, rank: 0, },
          conditions: 22,
          toolCars: [
            { car_id: 'v12', freeTry: false },
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'credit', count: 225000 },
            { type: 'seCard', count: 8 },
            { type: 'sePart', count: 1 }
          ],
        },
      ]
    },
    {
      unlockConditions: 200,
      clubRewords: [],
      missions: [
        {
          join: { star: 1, rank: 0, },
          conditions: 19,
          toolCars: [
            { car_id: 'n', freeTry: false },
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'credit', count: 225000 },
            { type: 'seCard', count: 5 },
            { type: 'sePart', count: 1 }
          ],
        },
      ]
    },
    {
      unlockConditions: 200,
      clubRewords: [],
      missions: [
        {
          join: { star: 1, rank: 0, },
          conditions: 20,
          toolCars: [
            { car_id: 'nsxgt3', freeTry: true },
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'credit', count: 225000 },
            { type: 'seCard', count: 6 },
            { type: 'sePart', count: 1 }
          ],
        },
      ]
    },
    {
      unlockConditions: 250,
      clubRewords: [],
      missions: [
        {
          join: { star: 1, rank: 0, },
          conditions: 19,
          toolCars: [
            { car_id: 'bc', freeTry: false },
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'credit', count: 225000 },
            { type: 'seCard', count: 5 },
            { type: 'sePart', count: 1 }
          ],
        },
      ]
    },
    {
      unlockConditions: 250,
      clubRewords: [],
      missions: [
        {
          join: { star: 1, rank: 0, },
          conditions: 19,
          toolCars: [
            { car_id: '570', freeTry: false },
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'credit', count: 225000 },
            { type: 'seCard', count: 5 },
            { type: 'sePart', count: 1 }
          ],
        },
      ]
    },
    {
      unlockConditions: 250,
      clubRewords: [],
      missions: [
        {
          join: { star: 1, rank: 0, },
          conditions: 19,
          toolCars: [
            { car_id: 'aperta', freeTry: false },
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'credit', count: 225000 },
            { type: 'seCard', count: 5 },
            { type: 'sePart', count: 1 }
          ],
        },
      ]
    },
    {
      unlockConditions: 250,
      clubRewords: [],
      missions: [
        {
          join: { star: 1, rank: 0, },
          conditions: 8,
          toolCars: [
            { car_id: 'sc20', freeTry: true },
          ],
          rewords: [
            { type: 'credit', count: 225000 },
          ],
        },
        {
          join: { star: 5, rank: 0, },
          conditions: 10,
          toolCars: [
            { car_id: 'sc20', freeTry: true },
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'seCard', count: 5 },
          ],
        },
        {
          join: { star: 6, rank: 0, },
          conditions: 12,
          toolCars: [
            { car_id: 'sc20', freeTry: true },
          ],
          rewords: [
            { type: 'seCard', count: 10 },
            { type: 'sePart', count: 2 },
          ],
        },
      ]
    },
    {
      unlockConditions: 300,
      clubRewords: [],
      missions: [

        {
          join: { star: 1, rank: 0, },
          conditions: 5,
          toolCars: [
            { car_id: 'veyron', freeTry: false },
          ],
          rewords: [
            
          ],
        },
        {
          join: { star: 2, rank: 0, },
          conditions: 5,
          toolCars: [
            { car_id: 'veyron', freeTry: false },
          ],
          rewords: [
            { type: 'credit', count: 100000 },
          ],
        },
        {
          join: { star: 3, rank: 0, },
          conditions: 11,
          toolCars: [
            { car_id: 'veyron', freeTry: false },
          ],
          rewords: [
            { type: 'credit', count: 450000 },
            { type: 'token', count: 125 },
          ],
        },
        {
          join: { star: 4, rank: 0, },
          conditions: 8,
          toolCars: [
            { car_id: 'veyron', freeTry: false },
          ],
          rewords: [
            { type: 'seSkin', count: 1 },
            { type: 'credit', count: 600000 },
          ],
        },
        {
          join: { star: 5, rank: 0, },
          conditions: 9,
          toolCars: [
            { car_id: 'veyron', freeTry: false },
          ],
          rewords: [
            { type: 'credit', count: 900000 },
            { type: 'sePart', count: 1 },
          ],
        },
        {
          join: { star: 6, rank: 0, },
          conditions: 11,
          toolCars: [
            { car_id: 'veyron', freeTry: false },
          ],
          rewords: [
            { type: 'credit', count: 1500000 },
            { type: 'sePart', count: 2 },
          ],
        },
      ]
    },
    {
      unlockConditions: 300,
      clubRewords: [],
      missions: [

        {
          join: { star: 1, rank: 0, },
          conditions: 0,
          toolCars: [
            { car_id: 'veyron', freeTry: false },
          ],
          rewords: [
          ],
        },
      ]
    },
  ]
}
