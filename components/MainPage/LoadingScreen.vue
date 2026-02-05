<template>
    <div class="loading-container" v-if="isLoading">
      <svg class="letters" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 700 100">
        <text
          class="letter"
          v-for="(item, index) in letters"
          :key="index"
          :x="item.x"
          :y="item.y"
          :font-size="item.fontSize"
          stroke-width="2"
          :stroke-dasharray="getStrokeDashArray(item.letter)"
          :stroke-dashoffset="getStrokeDashOffset(item.letter)"
          :class="{ filled: isFilled }"
        >
          {{ item.letter }}
        </text>
      </svg>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  
  const letters = ref([
    { letter: "V", x: 90, y: 50 },
    { letter: "I", x: 170, y: 50 },
    { letter: "S", x: 240, y: 50 },
    { letter: "H", x: 330, y: 50 },
    { letter: "U", x: 410, y: 50 },
    { letter: "R", x: 490, y: 50 },
    { letter: "O", x: 570, y: 50 }
  ])
  
  const isFilled = ref(false)
  const isLoading = ref(true)
  
  onMounted(() => {
    setTimeout(() => {
      isFilled.value = true
    }, 8000)
  })
  
  function getStrokeDashArray(letter) {
    const lengthMap = {
      'V': 170,
      'I': 80,
      'S': 200,
      'H': 200,
      'U': 180,
      'R': 170,
      'O': 160
    }
    return lengthMap[letter] || 100
  }
  
  function getStrokeDashOffset(letter) {
    const length = getStrokeDashArray(letter)
    return length
  }
  </script>
  
  <style scoped>
  .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #111;
      position: relative;
      overflow: hidden;
      animation: fadeOut 1s 8s forwards;
    }
    
    .letters {
      height: 100px;
      width: 100vw;
      stroke: rgb(255, 255, 255);
      stroke-width: 2;
      font-size: 50px;
    }
    
    .letter {
      animation: drawLetter 3s forwards;
      opacity: 0;
      transition: fill 1s ease-in-out; 
    }
    
    .letter.filled {
      fill: rgba(255, 255, 255, 1);
    }
    
    .letter:nth-child(1) {
      animation-delay: 0.5s;
    }
    .letter:nth-child(2) {
      animation-delay: 1s;
    }
    .letter:nth-child(3) {
      animation-delay: 1.5s;
    }
    .letter:nth-child(4) {
      animation-delay: 2s;
    }
    .letter:nth-child(5) {
      animation-delay: 2.5s;
    }
    .letter:nth-child(6) {
      animation-delay: 3s;
    }
    .letter:nth-child(7) {
      animation-delay: 3.5s;
    }
    
    @keyframes drawLetter {
      0% {
        stroke-dashoffset: 150;
        opacity: 0;
      }
      100% {
        stroke-dashoffset: 0;
        opacity: 1;
      }
    }
    
    @keyframes fadeOut {
      0% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        background-color: #111;
      }
    }
  </style>
  