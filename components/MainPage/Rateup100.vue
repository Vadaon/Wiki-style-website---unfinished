<template>
    <section class="rateup70">
      <div v-if="showRateup1">
        <div class="images-container">
          <img src="/lucia.png" alt="RateUp 1" class="rateup-image">
          <img src="/lucia.png" alt="RateUp 2" class="rateup-image">
          <img src="/brs.png" alt="RateUp 3" class="rateup-image">
        </div>
        <div class="timer">
          <p>Event duration: {{ formattedStartTime1 }} - {{ formattedEndTime1 }}</p>
          <p>Time left: {{ timeLeft1 }}</p>
        </div>
      </div>
      <div v-if="showRateup2">
        <div class="images-container">
          <img src="/brs.png" alt="RateUp 4" class="rateup-image">
          <img src="/brs.png" alt="RateUp 5" class="rateup-image">
          <img src="/brs.png" alt="RateUp 6" class="rateup-image">
        </div>
        <div class="timer">
          <p>Event duration: {{ formattedStartTime2 }} - {{ formattedEndTime2 }}</p>
          <p>Time left: {{ timeLeft2 }}</p>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        startTime1: new Date('2025-02-18T00:00:00').getTime(),
        endTime1: new Date('2025-02-19T16:59:59').getTime(),
        startTime2: new Date('2025-02-19T17:00:00').getTime(),
        endTime2: new Date('2025-02-19T18:25:00').getTime(),
        timerInterval1: null,
        timerInterval2: null,
        timeLeft1: '',
        timeLeft2: '',
        showRateup1: true,
        showRateup2: false,
      };
    },
    computed: {
      formattedStartTime1() {
        return new Date(this.startTime1).toLocaleString();
      },
      formattedEndTime1() {
        return new Date(this.endTime1).toLocaleString();
      },
      formattedStartTime2() {
        return new Date(this.startTime2).toLocaleString();
      },
      formattedEndTime2() {
        return new Date(this.endTime2).toLocaleString();
      },
    },
    methods: {
      updateTime1() {
        const now = new Date().getTime();
        const distance1 = this.endTime1 - now;
        const distance2 = this.endTime2 - now;
  
        if (now < this.startTime1) {
          this.timeLeft1 = 'Event hasn\'t started';
        } else if (distance1 < 0) {
          this.timeLeft1 = 'Event has ended';
          this.showRateup1 = false;
          this.showRateup2 = true;
          clearInterval(this.timerInterval1);
        } else {
          const hours = Math.floor((distance1 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance1 % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance1 % (1000 * 60)) / 1000);
          this.timeLeft1 = `${hours}h ${minutes}m ${seconds}s`;
        }
  
        if (now < this.startTime2) {
          this.timeLeft2 = 'Event hasn\'t started';
        } else if (distance2 < 0) {
          this.timeLeft2 = 'Event has ended';
          clearInterval(this.timerInterval2);
        } else {
          const hours = Math.floor((distance2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance2 % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance2 % (1000 * 60)) / 1000);
          this.timeLeft2 = `${hours}h ${minutes}m ${seconds}s`;
        }
      },
    },
    mounted() {
      this.updateTime1();
      this.timerInterval1 = setInterval(this.updateTime1, 1000);
      this.timerInterval2 = setInterval(this.updateTime1, 1000);
    },
    beforeDestroy() {
      clearInterval(this.timerInterval1);
      clearInterval(this.timerInterval2);
    },
  };
  </script>
  
  <style scoped>
  .rateup70 {
    width: 100%;
    background: linear-gradient(135deg, #4c1b53, #892d8b, #4c1b53);
  }
  
  .images-container {
    display: flex;
    justify-content: center;
    gap: 7px;
  }
  
  .rateup-image {
  width: 30%;
  height: 200px;
  object-fit: cover;
  clip-path: polygon(0 10%, 100% 0, 100% 90%, 0% 100%);
}
  
  .timer p {
    font-size: 1.2rem;
    font-weight: 500;
    color: #f3f3f3;
  }
  </style>
  