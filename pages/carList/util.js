
//比较版本号 2.2.2>1.2.2
const compareVersion=(v1,v2)=>{
  const v1s=v1.split('.').map(Number)
  const v2s=v2.split('.').map(Number)
  for(let i=0;i<v1s.length;i++){
    if(v1s[i]!==v2s[i]){
      return v1s[i]<v2s[i]?1:-1
    }
  }
  return 1
}
export {
  compareVersion
}
