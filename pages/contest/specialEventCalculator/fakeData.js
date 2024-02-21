export default{
  havePack: false,
  haveClubRewords: true,
  haveSkin: false,
  havePackConditions: true,
  haveEventKey: true,
  packConditions: 200,
  toolCars: [
    {
      car_id: "giulia",
      fullName: "Alfa Romeo Giulia GTAm🔑",
      nickName: "Giulia",
      isKeyCar: true,
      rankLimits: [],
      star: 5,
    },
    {
      car_id: "apolloevo",
      fullName: "Apollo EVO",
      nickName: "菠萝EVO",
      isKeyCar: false,
      rankLimits: [],
      star: 6,
    },
    {
      car_id: "m600",
      fullName: "Noble M600 Speedster",
      nickName: "M600",
      isKeyCar: false,
      rankLimits: [],
      star: 6,
    },
    {
      car_id: "saleens7",
      fullName: "Saleen S7 Twin Turbo🔑",
      nickName: "萨林S7",
      isKeyCar: true,
      rankLimits: [],
      star: 6,
    },
    {
      car_id: "ts900",
      fullName: "Tushek TS 900 Racer Pro",
      nickName: "TS900",
      isKeyCar: false,
      rankLimits: [],
      star: 6,
    },
    

   
    {
      car_id: "lykanneon",
      fullName: "W Motors Lykan Neon🔑",
      nickName: "霓虹狼崽",
      isKeyCar: true,
      rankLimits: [],
      star: 6,
    },
  ],
  processRewords: [
    { conditions: 10, reword: { type: 'seCard', count: 2 } },
    { conditions: 30, reword: { type: 'token', count: 50 } },
    
    
    { conditions: 100, reword: { type: 'seCard', count: 2 }  },
    { conditions: 150, reword: { type: 'credit', count: 250000 } },
    
    
    { conditions: 250, reword: { type: 'token', count: 100 } },
    { conditions: 300, reword: { type: 'seCard', count: 1 } },
    { conditions: 350, reword: { type: 'sePart', count: 1 } },
    { conditions: 365, reword: { type: 'seKey', count: 1 } },
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
          conditions: 20,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'lykanneon', freeTry: true }],
          rewords: [
            { type: 'credit', count: 250000 },
            { type: 'token', count: 150 },
          ],
        },
      ],
    },
    {
      stage: 2,
      unlockConditions: 10,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        {
          conditions: 15,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'giulia', freeTry: true }],
          rewords: [
            { type: 'credit', count: 125000 },
          ],
        },
        {
          conditions: 7,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'giulia', freeTry: true }],
          rewords: [
            { type: 'credit', count: 250000 },
            { type: 'seCard', count: 2 },
          ],
        },
        {
          conditions: 8,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'giulia', freeTry: true }],
          rewords: [
            { type: 'seCard', count: 3 },
            { type: 'token', count: 100 },
          ],
        },
        {
          conditions: 9,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'giulia', freeTry: true }],
          rewords: [
            { type: 'credit', count: 750000 },
            { type: 'seCard', count: 4 },
          ],
        },
        {
          conditions: 13,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'giulia', freeTry: true }],
          rewords: [
            { type: 'token', count: 200 },
            { type: 'seCard', count: 6 },
            { type: 'sePart', count: 2 },
          ],
        },
      ],
    },
    // generate stage 3 to 25 like stage 2
    {
      stage: 3,
      unlockConditions: 30,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        {
          conditions: 15,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'apolloevo', freeTry: false }],
          rewords: [
            { type: 'credit', count: 125000 },
          ],
        },
        {
          conditions: 6,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'apolloevo', freeTry: false }],
          rewords: [
            { type: 'token', count: 50 },
            { type: 'seCard', count: 1 },
          ],
        },
        {
          conditions: 7,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'apolloevo', freeTry: false }],
          rewords: [
            { type: 'credit', count: 250000 },
            { type: 'seCard', count: 2 },
          ],
        },
        {
          conditions: 7,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'apolloevo', freeTry: false }],
          rewords: [
            { type: 'token', count: 75 },
            { type: 'seCard', count: 2 },
          ],
        },
        {
          conditions: 8,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'apolloevo', freeTry: false }],
          rewords: [
            { type: 'credit', count: 750000 },
            { type: 'seCard', count: 3 },
          ],
        },
        {
          conditions: 12,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: 'apolloevo', freeTry: false }],
          rewords: [
            { type: 'token', count: 150 },
            { type: 'seCard', count: 5 },
            { type: 'sePart', count: 2 },
          ],
        },
      ],
    },
    {
      stage: 4,
      unlockConditions: 60,
      clubRewords: [
        { type: 'token', count: 20 },
      ],
      missions: [
        {
          conditions: 15,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'm600', freeTry: false }],
          rewords: [
            { type: 'credit', count: 125000 },
          ],
        },
        {
          conditions: 6,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'm600', freeTry: false }],
          rewords: [
            { type: 'token', count: 50 },
            { type: 'seCard', count: 1 },
          ],
        },
        {
          conditions: 7,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'm600', freeTry: false }],
          rewords: [
            { type: 'credit', count: 250000 },
            { type: 'seCard', count: 2 },
          ],
        },
        {
          conditions: 7,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'm600', freeTry: false }],
          rewords: [
            { type: 'token', count: 75 },
            { type: 'seCard', count: 2 },
          ],
        },
        {
          conditions: 8,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'm600', freeTry: false }],
          rewords: [
            { type: 'credit', count: 750000 },
            { type: 'seCard', count: 3 },
          ],
        },
        {
          conditions: 12,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: 'm600', freeTry: false }],
          rewords: [
            { type: 'token', count: 150 },
            { type: 'seCard', count: 5 },
            { type: 'sePart', count: 2 },
          ],
        },
      ],
    },
    {
      stage: 5,
      unlockConditions: 100,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        {
          conditions: 20,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'lykanneon', freeTry: true }],
          rewords: [
            { type: 'credit', count: 250000 },
            { type: 'token', count: 150 },
          ],
        },
      ],
    },
    {
      stage: 6,
      unlockConditions: 140,
      clubRewords: [
        { type: 'credit', count: 10000 },
      ],
      missions: [
        {
          conditions: 15,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'saleens7', freeTry: true }],
          rewords: [
            { type: 'credit', count: 125000 },
          ],
        },
        {
          conditions: 7,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'saleens7', freeTry: true }],
          rewords: [
            { type: 'token', count: 50 },
            { type: 'seCard', count: 2 },
          ],
        },
        {
          conditions: 7,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'saleens7', freeTry: true }],
          rewords: [
            { type: 'credit', count: 250000 },
            { type: 'seCard', count: 2 },
          ],
        },
        {
          conditions: 8,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'saleens7', freeTry: true }],
          rewords: [
            { type: 'token', count: 100 },
            { type: 'seCard', count: 3 },
          ],
        },
        {
          conditions: 9,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'saleens7', freeTry: true }],
          rewords: [
            { type: 'credit', count: 750000 },
            { type: 'seCard', count: 4 },
          ],
        },
        {
          conditions: 13,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: 'saleens7', freeTry: true }],
          rewords: [
            { type: 'token', count: 200 },
            { type: 'seCard', count: 6 },
            { type: 'sePart', count: 2 },
          ],
        },
      ],
    },
    {
      stage: 7,
      unlockConditions: 180,
      clubRewords: [
        { type: 'token', count: 25 },
      ],
      missions: [
        {
          conditions: 15,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'ts900', freeTry: false }],
          rewords: [
            { type: 'credit', count: 125000 },
          ],
        },
        {
          conditions: 7,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'ts900', freeTry: false }],
          rewords: [
            { type: 'token', count: 50 },
            { type: 'seCard', count: 2 },
          ],
        },
        {
          conditions: 7,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'ts900', freeTry: false }],
          rewords: [
            { type: 'credit', count: 250000 },
            { type: 'seCard', count: 2 },
          ],
        },
        {
          conditions: 8,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'ts900', freeTry: false }],
          rewords: [
            { type: 'token', count: 100 },
            { type: 'seCard', count: 3 },
          ],
        },
        {
          conditions: 9,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'ts900', freeTry: false }],
          rewords: [
            { type: 'credit', count: 750000 },
            { type: 'seCard', count: 4 },
          ],
        },
        {
          conditions: 13,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: 'ts900', freeTry: false }],
          rewords: [
            { type: 'token', count: 200 },
            { type: 'seCard', count: 6 },
            { type: 'sePart', count: 2 },
          ],
        },
      ],
    },
    {
      stage: 8,
      unlockConditions: 210,
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
          toolCars: [{ car_id: 'lykanneon', freeTry: true }],
          rewords: [
            { type: 'credit', count: 375000 },
          ],
        },
        {
          conditions: 5,
          join: {
            star: 2,
            rank: 0,
          },
          toolCars: [{ car_id: 'lykanneon', freeTry: true }],
          rewords: [
            { type: 'token', count: 150 },
          ],
        },
        {
          conditions: 5,
          join: {
            star: 3,
            rank: 0,
          },
          toolCars: [{ car_id: 'lykanneon', freeTry: true }],
          rewords: [
            { type: 'credit', count: 750000 },
          ],
        },
        {
          conditions: 5,
          join: {
            star: 4,
            rank: 0,
          },
          toolCars: [{ car_id: 'lykanneon', freeTry: true }],
          rewords: [
            { type: 'token', count: 250 },
          ],
        },
        {
          conditions: 5,
          join: {
            star: 5,
            rank: 0,
          },
          toolCars: [{ car_id: 'lykanneon', freeTry: true }],
          rewords: [
            { type: 'credit', count: 1250000 },
          ],
        },
        {
          conditions: 10,
          join: {
            star: 6,
            rank: 0,
          },
          toolCars: [{ car_id: 'lykanneon', freeTry: true }],
          rewords: [
            { type: 'token', count: 750 },
            { type: 'sePart', count: 5 },
          ],
        },
      ],
    },
    {
      stage: 9,
      unlockConditions: 210,
      clubRewords: [
        
      ],
      missions: [
        {
          conditions: 0,
          join: {
            star: 1,
            rank: 0,
          },
          toolCars: [{ car_id: 'lykanneon', freeTry: true }],
          rewords: [
            
          ],
        },
      ],
    },

    
    
    
  ],
}