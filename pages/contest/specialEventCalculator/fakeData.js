export default {
  havePack: false,
  haveClubRewords: true,
  haveSkin: true,
  havePackConditions: true,
  haveEventKey: true,
  packConditions: 200,
  toolCars: [
    {
      car_id: '911gts',
      fullName: 'Purchase 911 GTS Coupe',
      nickName: '911GTS',
      star: 3,
      isKeyCar: false,
      rankLimits: [],
    },
    {
      car_id: 'vulcan',
      fullName: 'Aston Martin Vulcan',
      nickName: '火神',
      star: 4,
      isKeyCar: false,
      rankLimits: [],
    },
    {
      car_id: 'gtr',
      fullName: 'Nissan GT-R Nismo',
      nickName: 'GTR',
      star: 4,
      isKeyCar: false,
      rankLimits: [],
    },
    {
      car_id: 'centenario',
      fullName: 'Lamborghini Centenario',
      nickName: '百年牛',
      star: 5,
      isKeyCar: false,
      rankLimits: [],
    },
    {
      car_id: 'fxxk',
      fullName: 'Ferrari FXX K',
      nickName: 'FXXK',
      star: 5,
      isKeyCar: false,
      rankLimits: [],
    },
    {
      car_id: 'vulcano',
      fullName: 'Icona Vulcano Titanium',
      nickName: '火山',
      star: 5,
      isKeyCar: false,
      rankLimits: [],
    },
    {
      car_id: 'lykan',
      fullName: 'W Motors Lykan Hypersport',
      nickName: '狼崽',
      star: 5,
      isKeyCar: false,
      rankLimits: [],
    },





    {
      car_id: 'f1',
      fullName: 'McLaren F1 LM🔑', // key imoji=🔑
      nickName: 'F1',
      star: 6,
      isKeyCar: true,
      rankLimits: [],
    },
    {
      car_id: 'huayrar',
      fullName: 'Pagani Huayra R', 
      nickName: '花雅R',
      star: 6,
      isKeyCar: false,
      rankLimits: [],
    },
    {
      car_id: 'sf90',
      fullName: 'Ferrari SF90 Stradale', 
      nickName: 'SF90',
      star: 6,
      isKeyCar: false,
      rankLimits: [],
    },
    {
      car_id: 'valkyrie',
      fullName: 'Aston Martin Valkyrie', 
      nickName: '女武神',
      star: 6,
      isKeyCar: false,
      rankLimits: [],
    },
    {
      car_id: 'ssc',
      fullName: 'SSC Tuatara🔑', 
      nickName: '大蜥蜴',
      star: 6,
      isKeyCar: true,
      rankLimits: [],
    },
    {
      car_id: 'centodieci',
      fullName: 'Bugaatti Centodieci🔑', 
      nickName: '白龙',
      star: 6,
      isKeyCar: true,
      rankLimits: [],
    },
    {
      car_id: '935',
      fullName: 'Purchase 935(2019)🔑', 
      nickName: '935',
      star: 6,
      isKeyCar: true,
      rankLimits: [],
    },





    
    {
      car_id: 'p72',
      fullName: 'DE Tomaso P72🔑',
      nickName: 'P72',
      star: 6,
      isKeyCar: false,
      rankLimits: [],
    },
    
  ],
  processRewords: [
    
    { conditions: 300, reword: { type: 'seCard', count: 3 } },
    { conditions: 350, reword: { type: 'seCard', count: 3 } },
    { conditions: 400, reword: { type: 'sePart', count: 1 } },
    { conditions: 450, reword: { type: 'sePart', count: 1 } },
    { conditions: 500, reword: { type: 'seSkin', count: 100 } },
    { conditions: 555, reword: { type: 'seKey', count: 1 } },
  ],
  notes: [
    "感觉……不如Driver 555"
  ],
  stages: [
    
    {
      stage: 1,
      unlockConditions: 0,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        {
          conditions: 31,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: 'f1', freeTry: true },
          ],
          rewords: [
            { type: 'credit', count: 220000 },
            { type: 'token', count: 90 },
            { type: 'seCard', count: 2 },
            
          ],
        },
      ],
    },

    
    {
      stage: 2,
      unlockConditions: 15,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        
        
        {
          conditions: 19,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: 'vulcan', freeTry: false },
            { car_id: 'huayrar', freeTry: false },
          ],
          rewords: [
            { type: 'credit', count: 45000 },
            { type: 'token', count: 15 },
          ],
        },
        {
          conditions: 12,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: 'huayrar', freeTry: false },
          ],
          rewords: [
            { type: 'credit', count: 175000 },
            { type: 'token', count: 75 },
            { type: 'seCard', count: 2 },
            
          ],
        },
      ],
    },
    
    {
      stage: 3,
      unlockConditions: 30,
      clubRewords: [
        { type: 'token', count: 15 },
      ],
      missions: [
        
        {
          conditions: 20,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: 'p72', freeTry: true },
          ],
          rewords: [
            
            { type: 'token', count: 175 },
            { type: 'credit', count: 275000 },
          ],
        },
      ],
    },
    
    {
      stage: 4,
      unlockConditions: 60,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        
                
        {
          conditions: 19,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: 'gtr', freeTry: false },
            { car_id: 'sf90', freeTry: false },
          ],
          rewords: [
            { type: 'credit', count: 45000 },
            { type: 'token', count: 15 },
          ],
        },
        {
          conditions: 12,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: 'sf90', freeTry: false },
          ],
          rewords: [
            { type: 'credit', count: 175000 },
            { type: 'token', count: 75 },
            { type: 'seCard', count: 2 },
            
          ],
        },
      ],
    },
    
    {
      stage: 5,
      unlockConditions: 90,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        
               
        {
          conditions: 19,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: 'centenario', freeTry: false },
            { car_id: 'valkyrie', freeTry: false },
          ],
          rewords: [
            { type: 'credit', count: 45000 },
            { type: 'token', count: 15 },
          ],
        },
        {
          conditions: 12,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: 'valkyrie', freeTry: false },
          ],
          rewords: [
            { type: 'credit', count: 175000 },
            { type: 'token', count: 75 },
            { type: 'seCard', count: 2 },
            
          ],
        },
      ],
    },
    
    {
      stage: 6,
      unlockConditions: 120,
      clubRewords: [
        { type: 'token', count: 20 },
      ],
      missions: [

        
        {
          conditions: 20,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: 'p72', freeTry: true },
          ],
          rewords: [
            
            { type: 'token', count: 175 },
            { type: 'credit', count: 275000 },
          ],
        },
      ],
    },
    
    {
      stage: 7,
      unlockConditions: 150,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
                
               
        {
          conditions: 31,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: 'ssc', freeTry: true },
          ],
          rewords: [
            { type: 'credit', count: 220000 },
            { type: 'token', count: 90 },
            { type: 'seCard', count: 2 },
            
          ],
        },
      ],
    },
    
    {
      stage: 8,
      unlockConditions: 180,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        {
          conditions: 31,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: 'centodieci', freeTry: true },
          ],
          rewords: [
            { type: 'credit', count: 220000 },
            { type: 'token', count: 90 },
            { type: 'seCard', count: 2 },
            
          ],
        },
      ],
    },
    
    {
      stage: 9,
      unlockConditions: 210,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        
        {
          conditions: 31,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: '935', freeTry: true },
          ],
          rewords: [
            { type: 'credit', count: 220000 },
            { type: 'token', count: 90 },
            { type: 'seCard', count: 2 },
            
          ],
        },
      ],
    },
    
    {
      stage: 10,
      unlockConditions: 240,
      clubRewords: [
        { type: 'token', count: 25 },
      ],
      missions: [
        
        {
          conditions: 20,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: 'p72', freeTry: true },
          ],
          rewords: [
            
            { type: 'token', count: 175 },
            { type: 'credit', count: 275000 },
          ],
        },
      ],
    },
    
    {
      stage: 11,
      unlockConditions: 270,
      clubRewords: [
        { type: 'credit', count: 20000 },
      ],
      missions: [
        
        {
          conditions: 18,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [
            { car_id: 'f1', freeTry: true },
            { car_id: '911gts', freeTry: false }
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'credit', count: 165000 },

          ],
        },
        
        {
          conditions: 14,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: 'f1', freeTry: true }],
          rewords: [
            { type: 'seCard', count: 6 },
            { type: 'sePart', count: 1 },
            { type: 'credit', count: 625000 },
            { type: 'token', count: 275 },
          ],
        },
      ],
    },
    
    {
      stage: 12,
      unlockConditions: 300,
      clubRewords: [
        { type: 'credit', count: 20000 },
      ],
      missions: [
      
        {
          conditions: 18,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [
            { car_id: 'huayrar', freeTry: false },
            { car_id: 'vulcan', freeTry: false }
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'credit', count: 165000 },

          ],
        },
        
        {
          conditions: 14,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: 'huayrar', freeTry: false }],
          rewords: [
            { type: 'seCard', count: 6 },
            { type: 'sePart', count: 1 },
            { type: 'credit', count: 625000 },
            { type: 'token', count: 275 },
          ],
        },
      ],
    },
    
    {
      stage: 13,
      unlockConditions: 330,
      clubRewords: [
        { type: 'credit', count: 20000 },
      ],
      missions: [
        {
          conditions: 18,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [
            { car_id: 'sf90', freeTry: false },
            { car_id: 'gtr', freeTry: false }
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'credit', count: 165000 },

          ],
        },
        
        {
          conditions: 14,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: 'sf90', freeTry: false }],
          rewords: [
            { type: 'seCard', count: 6 },
            { type: 'sePart', count: 1 },
            { type: 'credit', count: 625000 },
            { type: 'token', count: 275 },
          ],
        },
      ],
    },
    
    {
      stage: 14,
      unlockConditions: 360,
      clubRewords: [
        { type: 'credit', count: 20000 },
      ],
      missions: [
        {
          conditions: 18,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [
            { car_id: 'valkyrie', freeTry: false },
            { car_id: 'centenario', freeTry: false },
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'credit', count: 165000 },

          ],
        },
        
        {
          conditions: 15,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: 'valkyrie', freeTry: false }],
          rewords: [
            { type: 'seCard', count: 6 },
            { type: 'sePart', count: 1 },
            { type: 'credit', count: 625000 },
            { type: 'token', count: 275 },
          ],
        },
      ],
    },
    
    {
      stage: 15,
      unlockConditions: 390,
      clubRewords: [
        { type: 'credit', count: 20000 },
      ],
      missions: [
        
        {
          conditions: 18,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [
            { car_id: 'ssc', freeTry: true },
            { car_id: 'fxxk', freeTry: false }
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'credit', count: 165000 },

          ],
        },
        
        {
          conditions: 14,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: 'ssc', freeTry: true }],
          rewords: [
            { type: 'seCard', count: 8 },
            { type: 'sePart', count: 1 },
            { type: 'credit', count: 625000 },
            { type: 'token', count: 275 },
          ],
        },
      ],
    },
    
    {
      stage: 16,
      unlockConditions: 420,
      clubRewords: [
        { type: 'credit', count: 20000 },
      ],
      missions: [
      
        {
          conditions: 18,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [
            { car_id: 'centodieci', freeTry: true },
            { car_id: 'vulcano', freeTry: false }
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'credit', count: 165000 },

          ],
        },
        
        {
          conditions: 15,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: 'centodieci', freeTry: true }],
          rewords: [
            { type: 'seCard', count: 8 },
            { type: 'sePart', count: 1 },
            { type: 'credit', count: 625000 },
            { type: 'token', count: 275 },
          ],
        },
      ],
    },
    
    {
      stage: 17,
      unlockConditions: 450,
      clubRewords: [
        { type: 'credit', count: 20000 },
      ],
      missions: [
             
        {
          conditions: 18,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [
            { car_id: '935', freeTry: true },
            { car_id: 'lykan', freeTry: false }
          ],
          rewords: [
            { type: 'token', count: 125 },
            { type: 'credit', count: 165000 },

          ],
        },
        
        {
          conditions: 16,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: '935', freeTry: true }],
          rewords: [
            { type: 'seCard', count: 10 },
            { type: 'sePart', count: 1 },
            { type: 'credit', count: 625000 },
            { type: 'token', count: 275 },
          ],
        },
      ],
    },
    
    {
      stage: 18,
      unlockConditions: 480,
      clubRewords: [
        { type: 'credit', count: 25000 },
      ],
      missions: [
        
        {
          conditions: 15,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'p72', freeTry: true }],
          rewords: [
            
          ],
        },
        
        {
          conditions: 10,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'p72', freeTry: true }],
          rewords: [
            { type: 'token', count: 275 },
            { type: 'credit', count: 375000 },
          ],
        },
        {
          conditions: 12,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'p72', freeTry: true }],
          rewords: [
            
            { type: 'credit', count: 500000 },
            { type: 'token', count: 500 },
            { type: 'sePart', count: 2 },
            
          ],
        },
        {
          conditions: 13,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: 'p72', freeTry: true }],
          rewords: [
            
            { type: 'credit', count: 775000 },
            { type: 'token', count: 775 },
            
            { type: 'sePart', count: 3 },
          ],
        },
      ],
    },
    

    {
      stage: 19,
      unlockConditions:480,
      clubRewords:[

      ],
      missions:[

        {
          conditions: 0,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'p72', freeTry: false }],
          rewords: [
            
          ],
        },
      ],
    },
  ],
}

