const seasonPassGL = {
  seasonName: '电光火石赛季',
  startTime: new Date('2020-08-27 18:00 utc+8').getTime(),
  endTime: new Date('2021-10-22 18:00 UTC+0800').getTime(), 
  episodes: [{
    episode_id: 1,
    missions: [{
      tags: ['苏格兰', '追逐赛'],
      mapNames: ['自由路线', '风之小径'],
      solution: '第一章/特殊赛事'
    }]
  }, {
    episode_id: 2,
    missions: [{
      tags: ['纽约', '计时赛', '量子跃迁'],
      solution: '英国赛季-3'
    }]
  }, {
    episode_id: 3,
    missions: [{
      tags: ['古代遗迹', 'DB11'],
      solution: '英国赛季-6 / B新手-1'
    }]
  }, {
    episode_id: 4,
    missions: [{
        tags: ['苏格兰 荒地', '410', '计时赛'],
        solution: '英国赛季-7'
      },
      {
        tags: ['苏格兰 古代遗迹', '410'],
        solution: '英国赛季-6'
      }
    ]
  }, {
    episode_id: 5,
    missions: [{
      tags: ['业余、高阶或专家'],
      solution: '每日金币赛'
    }]
  }, {
    episode_id: 6,
    missions: [{
        tags: ['苏格兰 灯塔', 'P1'],
        solution: '英国赛季-9'
      },
      {
        tags: ['纽约', '计时赛', 'P1'],
        solution: '英国赛季-3'
      }
    ]
  }, {
    episode_id: 7,
    missions: [{
        tags: ['苏格兰 洞穴', 'P1', '苏格兰 洞穴', 'P1', '苏格兰 洞穴', 'P1', '苏格兰 洞穴', 'P1', '苏格兰 洞穴', 'P1', ],
        solution: 'A菜鸟6 / 英国赛季-12'
      },
      {
        tags: ['苏格兰 风车', 'DB11'],
        solution: '英国赛季-11'
      },
      {
        tags: ['苏格兰 幽灵船', '410'],
        solution: '英国赛季-10'
      },
      {
        tags: ['苏格兰', '计时赛', 'Lotus'],
        mapNames: ['风之小径', '洞穴'],
        solution: '英国赛季-7'
      }
    ]
  }]
}

const seasonPassAL={
          seasonName: '兰博基尼赛季',
          startTime: new Date('2020-08-27 18:00 utc+8').getTime(),
          endTime: new Date('2021-10-22 18:00 utc+8').getTime(),
          episodes: [{
            episode_id: 1,
            missions: [{
              tags: ['苏格兰', '追逐赛'],
              mapNames:['自由路线','风之小径'],
              solution: '第一章/特殊赛事'
            }]
          }, {
            episode_id: 2,
            missions: [{
              tags: ['纽约', '计时赛', '量子跃迁'],
              solution: '英国赛季-3'
            }]
          }, {
            episode_id: 3,
            missions: [{
              tags: ['古代遗迹', 'DB11'],
              solution: '英国赛季-6 / B新手-1'
            }]
          }, {
            episode_id: 4,
            missions: [{
                tags: ['苏格兰 荒地', '410', '计时赛'],
                solution: '英国赛季-7'
              },
              {
                tags: ['苏格兰 古代遗迹', '410'],
                solution: '英国赛季-6'
              }
            ]
          }, {
            episode_id: 5,
            missions: [{
              tags: ['业余、高阶或专家'],
              solution: '每日金币赛'
            }]
          }, {
            episode_id: 6,
            missions: [{
                tags: ['苏格兰 灯塔', 'P1'],
                solution: '英国赛季-9'
              },
              {
                tags: ['纽约', '计时赛', 'P1'],
                solution: '英国赛季-3'
              }
            ]
          }, {
            episode_id: 7,
            missions: [{
                tags: ['苏格兰 洞穴', 'P1','苏格兰 洞穴', 'P1','苏格兰 洞穴', 'P1','苏格兰 洞穴', 'P1','苏格兰 洞穴', 'P1',],
                solution: 'A菜鸟6 / 英国赛季-12'
              },
              {
                tags: ['苏格兰 风车', 'DB11'],
                solution: '英国赛季-11'
              },
              {
                tags: ['苏格兰 幽灵船', '410'],
                solution: '英国赛季-10'
              },
              {
                tags: ['苏格兰', '计时赛', 'Lotus'],
                mapNames:['风之小径','洞穴'],
                solution: '英国赛季-7'
              }
            ]
          }]
        }

export {
  seasonPassGL,
  seasonPassAL
}