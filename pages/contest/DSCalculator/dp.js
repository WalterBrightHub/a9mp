
import { Chapter, Stage, Task, DPRes } from './type'

const dp = ({
  chapter,
  stage,
  tasks,
  stageSpDone,
}) => {
  if(!chapter||!stage||!tasks){
    return
  }


  tasks.sort((a, b) => {
    // 危险度高，sp大的在后面，尽量选择他们
    if (a.danger === b.danger) {
      if (a.packCount === b.packCount) {
        return a.sp - b.sp; //升序，当危险1相同时，解决方案是尽量大的，但是车手可以尽量小。
      }
      return a.packCount - b.packCount; //这里感觉降序也可以啊
    }
    return a.danger - b.danger;
  });

  // 找到最大的packCount  task，同时sp最大
  const taskMax = tasks.reduce((acc, cur) => {
    if (acc.packCount == cur.packCount) {
      return acc.sp > cur.sp ? acc : cur;
    }
    return acc.packCount > cur.packCount ? acc : cur;
  }, tasks[0]);

  // 最大sp和最小sp的任务的cold值为1，但taskMax的cold值为0。
  //当有两个相同最佳方案时，尽量选择cold更少的任务，因为中间sp的容易刷到。
  const coldArray   = new Array(tasks.length).fill(0);
  for (let i = 0; i < tasks.length; i++) {
    if (
      i % 3 === 1 ||
      (tasks[i].sp === taskMax.sp && tasks[i].danger === taskMax.danger)
    ) {
      coldArray[i] = false;
    } else {
      coldArray[i] = true;
    }
  }

  const getCold = (arr  ) => {
    let ans = 0;
    for (let i = 0; i < coldArray.length; i++) {
      ans += coldArray[i] && arr[i] ? 1 : 0;
    }
    return ans;
  };

  // const stageNo = stage.stage;

  const V = stage.sp - 1 - stageSpDone;

  const coinPerPack = chapter.coinPerPack;

  const DP   = new Array(tasks.length + 1)
    .fill(0)
    .map(() => new Array(V + 1).fill(0));

  // init
  for (let i = 0; i <= tasks.length; i++) {
    for (let j = 0; j <= V; j++) {
      DP[i][j] = {
        value: 0,
        check: false,
        cold: 0,
        coldArray: new Array(tasks.length).fill(0),
      };
    }
  }

  for (let i = 1; i <= tasks.length; i++) {
    for (let j = 1; j <= V; j++) {
      if (j < tasks[i - 1].sp) {
        DP[i][j] = {
          value: DP[i - 1][j].value,
          check: false,
          cold: DP[i - 1][j].cold,
          coldArray: Array.from(DP[i - 1][j].coldArray),
        };
        continue;
      }
      const valueNotCheck = DP[i - 1][j].value;
      const valueCheck = DP[i][j - tasks[i - 1].sp].value +
        tasks[i - 1].packCount * coinPerPack;
      const useCheck = () => {
        DP[i][j].value = valueCheck;
        DP[i][j].check = true;

        DP[i][j].coldArray = Array.from(DP[i][j - tasks[i - 1].sp].coldArray);
        DP[i][j].coldArray[i - 1] = true;
        DP[i][j].cold = getCold(DP[i][j].coldArray);
      };
      const useNotCheck = () => {
        DP[i][j].value = valueNotCheck;
        DP[i][j].check = false;
        DP[i][j].cold = DP[i - 1][j].cold;
        DP[i][j].coldArray = Array.from(DP[i - 1][j].coldArray);
      };
      if (valueCheck > valueNotCheck) {
        useCheck();
      } else if (valueCheck < valueNotCheck) {
        useNotCheck();
      } else {
        const arrayCheck = Array.from(DP[i][j - tasks[i - 1].sp].coldArray);
        arrayCheck[i - 1] = true;
        const coldCheck = getCold(arrayCheck);
        const coldNotCheck = DP[i - 1][j].cold;
        if (coldCheck <= coldNotCheck) {
          //因为危险度越大的越省肝，所以尽量check
          useCheck();
        } else {
          useNotCheck();
        }
      }
    }
  }

  // console.log(DP[tasks.length][V])
  let lastI = tasks.length;
  let lastJ = V;

  // console.log("cold=", DP[tasks.length][V].cold);

  const res   = [];
  while (lastI > 0 && lastJ > 0) {
    if (DP[lastI][lastJ].check) {
      if (
        res.length > 0 &&
        res[res.length - 1].danger === tasks[lastI - 1].danger &&
        res[res.length - 1].sp === tasks[lastI - 1].sp
      ) {
        res[res.length - 1].taskCount++;
      } else {
        res.push({ ...tasks[lastI - 1], taskCount: 1 });
      }

      lastJ -= tasks[lastI - 1].sp;
    } else {
      lastI--;
    }
  }
  // res.push({ ...taskMax, taskCount: 1 }) // 最后搞把大的
  // console.log(res)

  const packTotal =
    res.reduce((acc, cur) => acc + cur.packCount * cur.taskCount, 0) +
    taskMax.packCount;
  const coinTotal = packTotal * coinPerPack;
  const taskCountTotal = res.reduce((acc, cur) => acc + cur.taskCount, 0) + 1;
  const lastSP = stage.sp -
    stageSpDone -
    res.reduce((acc, cur) => acc + cur.sp * cur.taskCount, 0);
  // const message: string[] = []
  // // console.log(`${chapter.title} 第 ${stageNo} 关攻略：`)
  // for (let i = 0; i < res.length; i++) {
  //   const isLast = i === res.length - 1
  //   message.push(
  //     `${isLast ? '最后，' : ''}${res[i].taskCount} 把 ${res[i].sp} SP，危险 ${
  //       res[i].danger
  //     }，每把 ${res[i].packCount} 包`
  //   )
  // }

  // message.push(
  //   `总共打了 ${taskCountTotal} 把，获得 ${packTotal} 包，如果没有出 🔑 或者 888 福币的话，公主您 / 少爷您 可以获得 ${coinTotal} 福币。`
  // )
  return {
    res,
    packTotal,
    coinTotal,
    taskCountTotal,
    taskMax,
    lastSP,
  };
};

export default dp;