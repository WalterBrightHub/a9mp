export interface Task {
  danger: 0 | 1 | 2 | 3
  sp: number
  packCount: number
}

export interface Stage {
  stage: number
  sp: number // 当前关卡所有sp
  limit: number[] | string[]
  //spFinish: number //完成当前的sp，等于下一关解锁需要的sp
  tasks: Task[]
}

export interface Chapter {
  title: string
  chapter: number
  stages: Stage[] // 本章每个阶段
  coinPerPack: number //本章每个包的福币数
}

export interface DSData {
  chapters: Chapter[]
  server: 'al' | 'gl'
  _id: string
}

export type DPRes = Task & {
  taskCount: number
}
