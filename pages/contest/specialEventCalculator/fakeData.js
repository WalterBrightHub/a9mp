export default   {
  havePack: false,
  haveClubRewords: true,
  haveSkin: false,
  havePackConditions: false,
  haveEventKey: false,
  packConditions: 0,
  toolCars: [
    {
      car_id: 'roma',
      fullName: 'Ferrari Roma',
      nickName: '罗马',
      isKeyCar: false,
      rankLimits: [],
      star: 4,
    },
    {
      car_id: '004c',
      fullName: 'Glickenhaus 004C🔑',
      nickName: '004C',
      isKeyCar: true,
      rankLimits: [],
      star: 5,
    },
    {
      car_id: '296',
      fullName: 'Ferrari 296 GTB🔑',
      nickName: '296',
      isKeyCar: true,
      rankLimits: [],
      star: 5,
    },
    {
      car_id: 'mclarengt',
      fullName: 'McLaren GT',
      nickName: '迈凯伦GT',
      isKeyCar: false,
      rankLimits: [],
      star: 5,
    },
    {
      car_id: 'solus',
      fullName: 'McLaren Solus GT🔑',
      nickName: 'Solus',
      isKeyCar: true,
      rankLimits: [],
      star: 5,
    },
    {
      car_id: 'bc',
      fullName: 'Pagani Huayra BC',
      nickName: 'BC',
      isKeyCar: false,
      rankLimits: [],
      star: 6,
    },
    

   
    
    {
      car_id: 'lykanneon',
      fullName: 'W Motors Lykan Neon',
      nickName: '霓虹狼崽',
      isKeyCar: false,
      rankLimits: [],
      star: 6,
    },
  ],
  processRewords: [
    { conditions: 50, reword: { type: 'credit', count: 50000 } },
    { conditions: 75, reword: { type: 'seCard', count: 2 }  },
    { conditions: 140, reword: { type: 'token', count: 150 } },
    { conditions: 180, reword: { type: 'seCard', count: 2 }  },
    { conditions: 200, reword: { type: 'sePart', count: 1 } },
    { conditions: 230, reword: { type: 'seSkin', count: 1 } },
    
    
  ],
  notes: [
    

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
          conditions: 19,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'lykanneon', freeTry: true }],
          rewords: [
            { type: 'credit', count: 250000 },
            { type: 'token', count: 100 },
          ],
        },
      ],
    },
    {
      stage: 2,
      unlockConditions: 19,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'roma', freeTry: false }],
          rewords: [
            
          ],
        },
        {
          conditions: 5,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'roma', freeTry: false }],
          rewords: [
            { type: 'credit', count: 250000 },
            
          ],
        },
        {
          conditions: 4,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'roma', freeTry: false }],
          rewords: [
            { type: 'token', count: 100 },
            
          ],
        },
        {
          conditions: 3,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'roma', freeTry: false }],
          rewords: [
            { type: 'seCard', count: 3 },
            
          ],
        },
        
      ],
    },
    // generate stage 3 to 25 like stage 2
    {
      stage: 3,
      unlockConditions: 35,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: '004c', freeTry: true }],
          rewords: [
            
          ],
        },
        {
          conditions: 9,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: '004c', freeTry: true }],
          rewords: [
            { type: 'credit', count: 250000 },
            { type: 'token', count: 100 },
            
          ],
        },
        {
          conditions: 5,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: '004c', freeTry: true }],
          rewords: [
            { type: 'seCard', count: 5 },
            
          ],
        },
        {
          conditions: 9,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: '004c', freeTry: true }],
          rewords: [
            { type: 'credit', count: 400000 },
            { type: 'token', count: 120 },
            
          ],
        },
        {
          conditions: 6,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: '004c', freeTry: true }],
          rewords: [
            { type: 'seCard', count: 5 },
            { type: 'sePart', count: 1 },
            
          ],
        },
      ],
    },
    {
      stage: 4,
      unlockConditions: 65,
      clubRewords: [
        { type: 'token', count: 20 },
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: '296', freeTry: true }],
          rewords: [
            
          ],
        },
        {
          conditions: 9,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: '296', freeTry: true }],
          rewords: [
            { type: 'credit', count: 250000 },
            { type: 'token', count: 100 },
            
          ],
        },
        {
          conditions: 5,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: '296', freeTry: true }],
          rewords: [
            { type: 'seCard', count: 5 },
            
          ],
        },
        {
          conditions: 9,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: '296', freeTry: true }],
          rewords: [
            { type: 'credit', count: 400000 },
            { type: 'token', count: 120 },
            
          ],
        },
        {
          conditions: 6,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: '296', freeTry: true }],
          rewords: [
            { type: 'seCard', count: 5 },
            { type: 'sePart', count: 1 },
            
          ],
        },
      ],
    },
    {
      stage: 5,
      unlockConditions: 95,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'mclarengt', freeTry: false }],
          rewords: [
            
          ],
        },
        {
          conditions: 9,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'mclarengt', freeTry: false }],
          rewords: [
            { type: 'credit', count: 250000 },
            { type: 'token', count: 100 },
            
          ],
        },
        {
          conditions: 5,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'mclarengt', freeTry: false }],
          rewords: [
            { type: 'seCard', count: 5 },
            
          ],
        },
        {
          conditions: 9,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'mclarengt', freeTry: false }],
          rewords: [
            { type: 'credit', count: 400000 },
            { type: 'token', count: 120 },
            
          ],
        },
        {
          conditions: 6,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'mclarengt', freeTry: false }],
          rewords: [
            { type: 'seCard', count: 5 },
            { type: 'sePart', count: 1 },
            
          ],
        },
      ],
    },
    {
      stage: 6,
      unlockConditions: 125,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'solus', freeTry: true }],
          rewords: [
            
          ],
        },
        {
          conditions: 9,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'solus', freeTry: true }],
          rewords: [
            { type: 'credit', count: 250000 },
            { type: 'token', count: 100 },
            
          ],
        },
        {
          conditions: 5,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'solus', freeTry: true }],
          rewords: [
            { type: 'seCard', count: 5 },
            
          ],
        },
        {
          conditions: 9,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'solus', freeTry: true }],
          rewords: [
            { type: 'credit', count: 400000 },
            { type: 'token', count: 120 },
            
          ],
        },
        {
          conditions: 6,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'solus', freeTry: true }],
          rewords: [
            { type: 'seCard', count: 5 },
            { type: 'sePart', count: 1 },
            
          ],
        },
      ],
    },
    {
      stage: 7,
      unlockConditions: 160,
      clubRewords: [
        { type: 'token', count: 25 },
      ],
      missions: [
        {
          conditions: 10,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'bc', freeTry: false }],
          rewords: [
            
          ],
        },
        {
          conditions: 9,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'bc', freeTry: false }],
          rewords: [
            { type: 'credit', count: 300000 },
            { type: 'token', count: 160 },
            
          ],
        },
        {
          conditions: 5,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'bc', freeTry: false }],
          rewords: [
            { type: 'seCard', count: 5 },
            
          ],
        },
        {
          conditions: 9,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'bc', freeTry: false }],
          rewords: [
            { type: 'credit', count: 450000 },
            { type: 'token', count: 200 },
            
          ],
        },
        {
          conditions: 6,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'bc', freeTry: false }],
          rewords: [
            { type: 'seCard', count: 5 },
            { type: 'sePart', count: 1 },
            
          ],
        },
        {
          conditions: 1,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: 'bc', freeTry: false }],
          rewords: [
            { type: 'sePart', count: 1 },
            
          ],
        },
      ],
    },
    {
      stage: 8,
      unlockConditions: 200,
      clubRewords: [
        { type: 'credit', count: 20000 },
        
      ],
      missions: [
        {
          conditions: 15,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [
            { car_id: 'lykanneon', freeTry: true },
            { car_id: 'roma', freeTry: false },
            { car_id: '004c', freeTry: false },
            { car_id: '296', freeTry: false },
            { car_id: 'mclarengt', freeTry: false },
            { car_id: 'solus', freeTry: false },
            { car_id: 'bc', freeTry: false },
          ],
          rewords: [
            { type: 'seCard', count: 5 },
            
          ],
        },
        {
          conditions: 9,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [
            { car_id: 'lykanneon', freeTry: true },
            { car_id: 'roma', freeTry: false },
            { car_id: '004c', freeTry: false },
            { car_id: '296', freeTry: false },
            { car_id: 'mclarengt', freeTry: false },
            { car_id: 'solus', freeTry: false },
            { car_id: 'bc', freeTry: false },
          ],
          rewords: [
            { type: 'token', count: 240 },
            { type: 'credit', count: 500000 },
            
          ],
        },
        {
          conditions: 6,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [
            { car_id: 'lykanneon', freeTry: true },
            { car_id: 'roma', freeTry: false },
            { car_id: '004c', freeTry: false },
            { car_id: '296', freeTry: false },
            { car_id: 'mclarengt', freeTry: false },
            { car_id: 'solus', freeTry: false },
            { car_id: 'bc', freeTry: false },
          ],
          rewords: [
            { type: 'seCard', count: 5 },
            { type: 'sePart', count: 1 },
            
          ],
        },
        {
          conditions: 9,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [
            { car_id: 'lykanneon', freeTry: true },
            { car_id: 'roma', freeTry: false },
            { car_id: '004c', freeTry: false },
            { car_id: '296', freeTry: false },
            { car_id: 'mclarengt', freeTry: false },
            { car_id: 'solus', freeTry: false },
            { car_id: 'bc', freeTry: false },
          ],
          rewords: [
            { type: 'token', count: 300 },
            { type: 'credit', count: 750000 },
            
          ],
        },
        {
          conditions: 5,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [
            { car_id: 'lykanneon', freeTry: true },
            { car_id: 'roma', freeTry: false },
            { car_id: '004c', freeTry: false },
            { car_id: '296', freeTry: false },
            { car_id: 'mclarengt', freeTry: false },
            { car_id: 'solus', freeTry: false },
            { car_id: 'bc', freeTry: false },
          ],
          rewords: [
            { type: 'seCard', count: 5 },
            { type: 'credit', count: 750000 },
            
          ],
        },
        {
          conditions: 1,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [
            { car_id: 'lykanneon', freeTry: true },
            { car_id: 'roma', freeTry: false },
            { car_id: '004c', freeTry: false },
            { car_id: '296', freeTry: false },
            { car_id: 'mclarengt', freeTry: false },
            { car_id: 'solus', freeTry: false },
            { car_id: 'bc', freeTry: false },
          ],
          rewords: [
            { type: 'sePart', count: 1 },
            
          ],
        },
      ],
    },
    {
      stage: 9,
      unlockConditions: 200,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 0,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'lykanneon', freeTry: false }],
          rewords: [
            
          ],
        },
      ],
    },

    
    
    
  ],
}




