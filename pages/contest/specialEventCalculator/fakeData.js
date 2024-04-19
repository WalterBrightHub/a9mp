export default {
  havePack: false,
  haveClubRewords: false,
  haveSkin: true,
  havePackConditions: false,
  haveEventKey: false,
  packConditions: 0,
  toolCars: [
    {
      car_id: 'gt350r',
      fullName: 'Ford Shelby GT350R',
      nickName: '野马',
      isKeyCar: false,
      rankLimits: [],
      star: 4,
    },
    {
      car_id: 'rs01',
      fullName: 'Renault R.S. 01🔑',
      nickName: '雷诺RS',
      isKeyCar: true,
      rankLimits: [],
      star: 5,
    },
    {
      car_id: 'stingray',
      fullName: 'Chevrolet Corvette Stingray',
      nickName: '黄貂鱼',
      isKeyCar: false,
      rankLimits: [],
      star: 5,
    },
    {
      car_id: 'cgs',
      fullName: 'Chevrolet Corvette Grand Sport',
      nickName: '五菱',
      isKeyCar: false,
      rankLimits: [],
      star: 5,
    },
    {
      car_id: 'mk2',
      fullName: 'Ford GT MKII🔑',
      nickName: 'MK2',
      isKeyCar: true,
      rankLimits: [],
      star: 4,
    },
    {
      car_id: 'berlinetta',
      fullName: 'Puritalia Berlinetta',
      nickName: 'Berlinetta',
      isKeyCar: false,
      rankLimits: [],
      star: 5,
    },



    {
      car_id: '911gt3',
      fullName: 'Porsche 911 GT3 RS',
      nickName: '911GT3',
      isKeyCar: false,
      rankLimits: [],
      star: 6,
    },
  ],
  processRewords: [
    { conditions: 15, reword: { type: 'credit', count: 35000 } },
    { conditions: 70, reword: { type: 'seSkin', count: 1 }  },
    { conditions: 90, reword: { type: 'token', count: 80 } },
    { conditions: 230, reword: { type: 'sePart', count: 1 } },
    
    
  ],
  notes: [
    

  ],
  stages: [
    {
      stage: 1,
      unlockConditions: 0,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'gt350r', freeTry: true }],
          rewords: [
            { type: 'credit', count: 80000 },
          ],
        },
        {
          conditions: 7,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'gt350r', freeTry: true }],
          rewords: [
            { type: 'token', count: 40 },
          ],
        },
      ],
    },
    {
      stage: 2,
      unlockConditions: 10,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'rs01', freeTry: true }],
          rewords: [
            { type: 'credit', count: 100000 },
            
          ],
        },
        {
          conditions: 4,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'rs01', freeTry: true }],
          rewords: [
            { type: 'token', count: 60 },
            
          ],
        },
        {
          conditions: 7,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'rs01', freeTry: true }],
          rewords: [
            { type: 'credit', count: 200000 },
            
          ],
        },
        
      ],
    },
    // generate stage 3 to 25 like stage 2
    {
      stage: 3,
      unlockConditions: 20,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'stingray', freeTry: true }],
          rewords: [
            { type: 'credit', count: 100000 },
            
          ],
        },
        {
          conditions: 4,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'stingray', freeTry: true }],
          rewords: [
            { type: 'token', count: 60 },
            
          ],
        },
        {
          conditions: 7,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'stingray', freeTry: true }],
          rewords: [
            { type: 'credit', count: 200000 },
            
          ],
        },
      ],
    },
    {
      stage: 4,
      unlockConditions: 30,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'cgs', freeTry: true }],
          rewords: [
            { type: 'credit', count: 120000 },
            
          ],
        },
        {
          conditions: 4,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'cgs', freeTry: true }],
          rewords: [
            { type: 'token', count: 80 },
            
          ],
        },
        {
          conditions: 7,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'cgs', freeTry: true }],
          rewords: [
            { type: 'credit', count: 240000 },
            
          ],
        },
      ],
    },
    {
      stage: 5,
      unlockConditions: 40,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'mk2', freeTry: true }],
          rewords: [
            { type: 'credit', count: 120000 },
            
          ],
        },
        {
          conditions: 7,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'mk2', freeTry: true }],
          rewords: [
            { type: 'token', count: 80 },
            
          ],
        },
      ],
    },
    {
      stage: 6,
      unlockConditions: 50,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'berlinetta', freeTry: true }],
          rewords: [
            { type: 'credit', count: 120000 },
            
          ],
        },
        {
          conditions: 4,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'berlinetta', freeTry: true }],
          rewords: [
            { type: 'token', count: 80 },
            
          ],
        },
        {
          conditions: 7,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'berlinetta', freeTry: true }],
          rewords: [
            { type: 'credit', count: 240000 },
            
          ],
        },
      ],
    },
    {
      stage: 7,
      unlockConditions: 60,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: '911gt3', freeTry: true }],
          rewords: [
            { type: 'credit', count: 120000 },
            
          ],
        },
        {
          conditions: 4,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: '911gt3', freeTry: true }],
          rewords: [
            { type: 'token', count: 80 },
            
          ],
        },
        {
          conditions: 7,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: '911gt3', freeTry: true }],
          rewords: [
            { type: 'credit', count: 240000 },
            { type: 'seCard', count: 3 },
            
          ],
        },
      ],
    },
    {
      stage: 8,
      unlockConditions: 75,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 14,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'gt350r', freeTry: false }],
          rewords: [
            { type: 'credit', count: 160000 },
          ],
        },
        {
          conditions: 6,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'gt350r', freeTry: false }],
          rewords: [
            { type: 'token', count: 100 },
          ],
        },
      ],
    },
    {
      stage: 9,
      unlockConditions: 85,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 14,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'rs01', freeTry: true }],
          rewords: [
            { type: 'token', count: 120 },
          ],
        },
        {
          conditions: 3,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'rs01', freeTry: true }],
          rewords: [
            
          ],
        },
      ],
    },
    {
      stage: 10,
      unlockConditions: 100,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'stingray', freeTry: false }],
          rewords: [
          ],
        },
        {
          conditions: 6,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'stingray', freeTry: false }],
          rewords: [
            { type: 'token', count: 120 },
            
          ],
        },
      ],
    },
    {
      stage: 11,
      unlockConditions: 115,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'cgs', freeTry: false }],
          rewords: [
          ],
        },
        {
          conditions: 6,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'cgs', freeTry: false }],
          rewords: [
            { type: 'token', count: 140 },
            
          ],
        },
      ],
    },
    {
      stage: 12,
      unlockConditions: 130,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 14,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'mk2', freeTry: true }],
          rewords: [
            { type: 'credit', count: 200000 },
          ],
        },
        {
          conditions: 7,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'mk2', freeTry: true }],
          rewords: [
            { type: 'token', count: 100 },
            
          ],
        },
      ],
    },
    {
      stage: 13,
      unlockConditions: 145,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'berlinetta', freeTry: false }],
          rewords: [
          ],
        },
        {
          conditions: 6,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'berlinetta', freeTry: false }],
          rewords: [
            { type: 'token', count: 140 },
            
          ],
        },
      ],
    },
    {
      stage: 14,
      unlockConditions: 160,
      clubRewords: [

      ],
      missions: [
        {
          conditions: 6,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: '911gt3', freeTry: false }],
          rewords: [
          ],
        },
        {
          conditions: 8,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: '911gt3', freeTry: false }],
          rewords: [
            { type: 'token', count: 140 },
            { type: 'seCard', count: 4 },
            
          ],
        },
        {
          conditions: 2,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: '911gt3', freeTry: false }],
          rewords: [
            { type: 'sePart', count: 2 },
            
          ],
        },
      ],
    },
    
    {
      stage: 15,
      unlockConditions: 165,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 0,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: '911gt3', freeTry: true }],
          rewords: [
            
          ],
        },
      ],
    },

    
    
    
  ],
}

