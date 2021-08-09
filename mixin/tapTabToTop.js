const tapTabToTop={
  
  firstTapTab: false,
  onHide() {
  	this.firstTapTab = true
  },
  onTabItemTap() {
    // console.log('on tab item tap')
  	if (this.firstTapTab) {
  		this.firstTapTab = false
  	} else {
  		uni.pageScrollTo({
  			scrollTop: 0
  		})
  	}
  },
}

export default tapTabToTop