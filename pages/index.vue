<template>
          <div class="first-layer">
            <Slideshow />
            <MainPageEventList />
          </div>
          <div class="second-layer">
            <Rateup70 />
            <Rateup100 />
            <MainPageIntroSection />
          </div>
</template>

<script setup>
import Slideshow from '../components/MainPage/Slideshow.vue';
import MainPageEventList from '~/components/MainPage/EventList.vue';
import Rateup70 from '~/components/MainPage/Rateup70.vue';
import Rateup100 from '~/components/MainPage/Rateup100.vue';
</script>

<style scoped>
.first-layer {
  display: flex;
  flex-direction: column;
  width: 70%;
  gap: 20px;
}

.second-layer {
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 20px;
}
</style>
