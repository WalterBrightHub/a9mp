<template>
  <div class="analysis-list">
    <div class="analysis-base">
      <div class="total-car-and-brand">

        <div class="analysis-total-car">
          <div class="analysis-title">车辆总数</div>
          <div class="analysis-content">{{data.length}}</div>
        </div>
        <div class="analysis-total-brand">
          <div class="analysis-title">品牌总数</div>
          <div class="analysis-content">{{countBrand}}</div>
        </div>
      </div>
      <div class="analysis-car-class">
        <div class="analysis-car-class-item class-d" :style="'flex:'+countCarClass.D">

          <div class="analysis-car-class-content">{{countCarClass.D}}</div>
          <div class="analysis-car-class-title">D</div>
        </div>
        <div class="analysis-car-class-item class-c" :style="'flex-grow:'+countCarClass.C">

          <div class="analysis-car-class-content">{{countCarClass.C}}</div>
          <div class="analysis-car-class-title">C</div>
        </div>
        <div class="analysis-car-class-item class-b" :style="'flex-grow:'+countCarClass.B">

          <div class="analysis-car-class-content">{{countCarClass.B}}</div>
          <div class="analysis-car-class-title">B</div>
        </div>
        <div class="analysis-car-class-item class-a" :style="'flex-grow:'+countCarClass.A">

          <div class="analysis-car-class-content">{{countCarClass.A}}</div>
          <div class="analysis-car-class-title">A</div>
        </div>
        <div class="analysis-car-class-item class-s" :style="'flex-grow:'+countCarClass.S">

          <div class="analysis-car-class-content">{{countCarClass.S}}</div>
          <div class="analysis-car-class-title">S</div>
        </div>
      </div>
      <div class="analysis-star">
        <div class="analysis-star-item star-3" :style="'flex-grow:'+countStar[3]">
          <div class="analysis-star-content">{{countStar[3]}}</div>
          <div class="analysis-star-title">3星</div>
        </div>
        <div class="analysis-star-item star-4" :style="'flex-grow:'+countStar[4]">
          <div class="analysis-star-content">{{countStar[4]}}</div>
          <div class="analysis-star-title">4星</div>
        </div>
        <div class="analysis-star-item star-5" :style="'flex-grow:'+countStar[5]">
          <div class="analysis-star-content">{{countStar[5]}}</div>
          <div class="analysis-star-title">5星</div>
        </div>
        <div class="analysis-star-item star-6" :style="'flex-grow:'+countStar[6]">
          <div class="analysis-star-content">{{countStar[6]}}</div>
          <div class="analysis-star-title">6星</div>
        </div>
      </div>

    </div>
    <div class="analysis-attr">
      <div class="analysis-attr-item">
        <div class="analysis-attr-title">蓝喷</div>
        <div class="analysis-attr-content">{{countBlueSpeed}}</div>
        <div class="analysis-attr-bar" :style="styleBlueSpeed"></div>
      </div>
      <div class="analysis-attr-item">
        <div class="analysis-attr-title">钥匙</div>
        <div class="analysis-attr-content">{{countKeyCar}}</div>
        <div class="analysis-attr-bar" :style="styleKeyCar"></div>
      </div>
      <div class="analysis-attr-item">
        <div class="analysis-attr-title">贴纸</div>
        <div class="analysis-attr-content">{{countDecals}}</div>
        <div class="analysis-attr-bar" :style="styleDecals"></div>
      </div>
      <div class="analysis-attr-item">
        <div class="analysis-attr-title">独占贴纸</div>
        <div class="analysis-attr-content">{{countDecalsExclusive}}</div>
        <div class="analysis-attr-bar" :style="styleDecalsExclusive"></div>
      </div>
      <div class="analysis-attr-item">
        <div class="analysis-attr-title">外观套件</div>
        <div class="analysis-attr-content">{{countBodyParts}}</div>
        <div class="analysis-attr-bar" :style="styleBodyParts"></div>
      </div>
      <div class="analysis-attr-item">
        <div class="analysis-attr-title">敞篷</div>
        <div class="analysis-attr-content">{{countOpenCar}}</div>
        <div class="analysis-attr-bar" :style="styleOpenCar"></div>
      </div>
      <div class="analysis-attr-item">
        <div class="analysis-attr-title">氮气特效</div>
        <div class="analysis-attr-content">{{countNitroVisuals}}</div>
        <div class="analysis-attr-bar" :style="styleNitroVisuals"></div>
      </div>
      <div class="analysis-attr-item">
        <div class="analysis-attr-title">商店金卡</div>
        <div class="analysis-attr-content">{{countStoreEpicPart}}</div>
        <div class="analysis-attr-bar" :style="styleStoreEpicPart"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
  } from 'vuex'
  import _ from 'lodash'
  export default {
    props: ['data'],
    data() {
      return {

      };
    },
    computed: {
      ...mapState(['theme']),
      countBrand() {
        return _(this.data).map(item => item.brand).uniq().value().length
      },
      countCarClass() {
        return _(this.data).countBy('carClass')
      },
      countStar() {

        return _(this.data).countBy('star')
      },
      countBlueSpeed() {
        return _(this.data).filter(car => car.blueSpeed > 0).value().length
      },
      styleBlueSpeed() {
        return this.barStyle(this.countBlueSpeed)
      },
      countKeyCar() {
        return _(this.data).filter(car => car.keyCar === 1).value().length
      },
      styleKeyCar() {
        return this.barStyle(this.countKeyCar)
      },
      countDecals() {
        return _(this.data).filter(car => car.decals === 1).value().length
      },
      styleDecals() {
        return this.barStyle(this.countDecals)
      },
      countDecalsExclusive() {
        return _(this.data).filter(car => car.decalsExclusive !== '').value().length
      },
      styleDecalsExclusive() {
        return this.barStyle(this.countDecalsExclusive)
      },
      countBodyParts() {
        return _(this.data).filter(car => car.bodyParts === 1).value().length
      },
      styleBodyParts() {
        return this.barStyle(this.countBodyParts)
      },
      countOpenCar() {
        return _(this.data).filter(car => car.openCar !== '').value().length
      },
      styleOpenCar() {
        return this.barStyle(this.countOpenCar)
      },
      countNitroVisuals() {
        return _(this.data).filter(car => car.nitroVisuals === 1).value().length
      },
      styleNitroVisuals() {
        return this.barStyle(this.countNitroVisuals)
      },
      countStoreEpicPart() {
        return _(this.data).filter(car => car.storeEpicPart === 1).value().length
      },
      styleStoreEpicPart() {
        return this.barStyle(this.countStoreEpicPart)
      },
    },
    methods: {
      barStyle(count) {
        let percent = (count) * 100 / (this.data.length || 20)
        let [fullColor, emptyColor] = this.theme === 'light' ? ['#ff0054', '#ffe7ed'] : ['#ff0054', '#4a222f']
        return `background: linear-gradient(to right,${fullColor} ${percent}%,${emptyColor} ${percent}%);`
      }
    }
  }
</script>

<style lang="scss">
  .analysis-list {

    padding: 20rpx;

    @include pad-devices {
      padding: toPadPx(20);
    }
  }

  .total-car-and-brand {
    display: flex;
  }

  .analysis-total-car,
  .analysis-total-brand {
    background-color: var(--card-bg-color);
    flex: 1;
    display: flex;
    align-items: baseline;
    padding: 20rpx;
    border-radius: 10rpx;

    @include pad-devices {
      border-radius: toPadPx(10);
      padding: toPadPx(20);
    }
  }

  .analysis-total-brand {
    margin-left: 20rpx;

    @include pad-devices {
      margin-left: toPadPx(20);
    }
  }

  .analysis-content {
    font-size: 72rpx;
    color: var(--text-title-color);
    color: var(--theme-color);
    font-weight: bold;
    margin-left: auto;

    @include pad-devices {
      font-size: toPadPx(72);
    }
  }

  .analysis-car-class,
  .analysis-star {
    display: flex;
    margin-top: 30rpx;

    @include pad-devices {
      margin-top: toPadPx(30);
    }
  }

  .analysis-car-class-item,
  .analysis-star-item {
    display: flex;
    flex-shrink: 0;
    flex-basis: auto;
    flex-direction: column;
    padding: 20rpx;
    align-items: center;
    background-color: #fff;

    @include pad-devices {
      padding: toPadPx(20);
    }

  }

  .analysis-car-class-item:first-child,
  .analysis-star-item:first-child {

    border-radius: 10rpx 0 0 10rpx;

    @include pad-devices {
      border-radius: toPadPx(10) 0 0 toPadPx(10);
    }
  }

  .analysis-car-class-item:last-child,
  .analysis-star-item:last-child {

    border-radius: 0 10rpx 10rpx 0;

    @include pad-devices {
      border-radius: 0 toPadPx(10) toPadPx(10) 0;
    }
  }

  .class-d {

    background-color: #cc8a68;
    color: #e8dbd3;
  }

  .class-c {
    background-color: #99b2d0;
    color: #dfe6ec;
  }

  .class-b {
    background-color: #eacc52;
    color: #f5f2e3;
  }

  .class-a {
    background-color: #8c68ee;
    color: #f6eefb;
  }

  .class-s,
  .star-6 {
    background-color: #363636;
    color: #e9e1b0;
  }

  .star-3 {
    background-color: #63c0ff;
    color: #e0f2ff;
  }

  .star-4 {
    background-color: #da6dff;
    color: #f7deff;
  }

  .star-5 {
    background-color: #f6cf4a;
    color: #fff8e1;
  }

  .analysis-car-class-content,
  .analysis-star-content {
    font-size: 48rpx;
    font-weight: bold;

    @include pad-devices {
      font-size: toPadPx(48);
    }

    // text-shadow: 1px 1px 2px rgba($color: #000000, $alpha: 0.38);
  }

  .analysis-attr {
    background-color: var(--card-bg-color);
    // padding: 20rpx;
    border-radius: 10rpx;
    margin-top: 30rpx;

      display: grid;
      grid-template-columns: 1fr 1fr;
    @include pad-devices {
      border-radius: toPadPx(10);
      margin-top: toPadPx(30);
    }
  }

  .analysis-attr-item {
    padding: 20rpx 16rpx;
    display: grid;
    grid-template-columns: 1fr 1fr;

    @include pad-devices {
      padding: toPadPx(20) toPadPx(16);
    }
  }



  .analysis-attr-content {
    justify-self: end;
  }

  .analysis-attr-bar {
    height: 10rpx;
    margin-top: 8rpx;
    border-radius: 4rpx;
    grid-column-start: span 2;

    @include pad-devices {
      height: toPadPx(10);
      margin-top: toPadPx(8);
      border-radius: toPadPx(4);
    }
  }
</style>
