import {groupBy} from 'lodash'
const selectCareerMaps={
    al(careerMaps){
      let res=groupBy(careerMaps,'theme')
      let themes=Object.keys(res)
      themes.map(theme=>{
        res[theme]=groupBy(res[theme],'time')
      })
      return res
    },
    gl(careerMaps){
      return this.al(careerMaps.map(item=>({
        ...item,
        mapName:item.mapNameGL || item.mapName,
        theme:item.themeGL || item.theme
      })))
    }
  }
  
  export default selectCareerMaps