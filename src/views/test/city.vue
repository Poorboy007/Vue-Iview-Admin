<template>
  <div>
    <Button @click="clickMe">获取城市</Button>
    <ul class="city_container">
      <li v-for="item in cityList" :key="item.id" class="city_item" @click="getCityInfo(item.city)">
        <a href="javascript:void(0)" :style="{color: item.color}">
          {{ item.city }}
        </a>
      </li>
    </ul>
    <img :src="img" alt="">
  </div>
</template>
<script>
export default {
  name: 'Test',
  components: {

  },
  data() {
    return {
      cityList: [],
      img: ''
    }
  },
  methods: {
    clickMe() {
      // 这里请求的地址要和mock中定义的请求地址一致
      this.$axios.get('/api/mock/city').then(res => {
        if (res.data) {
          this.cityList = res.data.cityList
        }
      })
    },
    getCityInfo(name) {
      this.$axios.post('/api/mock/cityInfo', {
        name: name
      }).then(res => {
        if (res.data) {
          this.img = res.data.img
        }
      })
    }
  }

}
</script>
<style scoped>
.city_item {
  list-style: none;
  border: 1px solid #ccc;
  width: auto;
  height: 50px;
  width: 100px;
  line-height: 50px;
  padding: 0 5px;
  border-bottom: none;
}
.city_item:last-child {
  border-bottom: 1px solid #ccc;
}
</style>
