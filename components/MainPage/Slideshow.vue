<template>
    <div class="slideshow"
         @mousedown="startDrag" @mouseup="endDrag" @mousemove="drag" @mouseleave="endDrag"
         @touchstart="startDrag" @touchend="endDrag" @touchmove="drag">
      <div class="slides-container" :style="slidesContainerStyle">
        <div 
          class="slide" 
          v-for="(slide, index) in slides" 
          :key="index" 
          :class="{ active: currentIndex === index }"
        >
          <img :src="slide.image" :alt="slide.title" />
          <div class="title">{{ slide.title }}</div>
        </div>
      </div>
      <div class="dots">
        <span 
          v-for="(slide, index) in slides" 
          :key="index" 
          :class="['dot', { active: currentIndex === index }]" 
          @click="goToSlide(index)">
        </span>
      </div>
    </div>
  </template>
  
<script setup>
  import { ref, onMounted, onBeforeUnmount, computed } from 'vue';

  const slides = ref([
    { image: 'version.webp', title: 'Version' },
    { image: 'bianca.png', title: 'Chars' },
    { image: 'liv.png', title: 'Chars' },
    { image: 'banner.png', title: 'Banner' },
    { image: 'lamia.webp', title: 'Coating etc' }
  ]);

  const currentIndex = ref(0);
  let interval = null;
  let startX = null;
  let dragDistance = 0;
  let isDragging = false;
  let isMouseDown = false;
  
  const slidesContainer = document.querySelector('.slides-container');

  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length;
  };

  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
  };

  const goToSlide = (index) => {
    currentIndex.value = index;
  };

  const startDrag = (event) => {
    startX = event.clientX || event.touches[0].clientX;
    dragDistance = 0;
    isMouseDown = true;
    clearInterval(interval);
  };

  const drag = (event) => {
    if (!isMouseDown || startX === null) return;

    const currentX = event.clientX || event.touches[0].clientX;
    dragDistance = currentX - startX;

    if (Math.abs(dragDistance) > 5) {
      isDragging = true;
    }

    if (isDragging && slidesContainer) {
      slidesContainer.style.transition = 'none';
      const offset = (dragDistance / window.innerWidth) * 100;
      slidesContainer.style.transform = `translateX(${-(currentIndex.value * 100) + offset}%)`;
    }
  };

  const endDrag = () => {
    if (!isMouseDown) return;

    if (Math.abs(dragDistance) > window.innerWidth * 0.1) {
      dragDistance > 0 ? prevSlide() : nextSlide();
    }

    dragDistance = 0;
    startX = null;
    isMouseDown = false;
    isDragging = false;

    if (slidesContainer) {
      slidesContainer.style.transition = 'transform 0.3s ease';
      slidesContainer.style.transform = `translateX(-${currentIndex.value * 100}%)`;
    }

    interval = setInterval(nextSlide, 10000);
  };

  onMounted(() => {
    interval = setInterval(nextSlide, 10000);
  });

  onBeforeUnmount(() => {
    clearInterval(interval);
  });

  const slidesContainerStyle = computed(() => {
    return {
      transform: `translateX(-${currentIndex.value * 100}%)`,
      transition: 'transform 1s ease-in-out'
    };
  });
</script>

  
  <style scoped>
  .slideshow {
    width: 100%;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  
  .slides-container {
    display: flex;
    width: 100%;
    pointer-events: none;
    user-select: none;
  }
  
  .slide {
    min-width: 100%;
    position: relative;
  }
  
  .slide img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    pointer-events: none;
    user-select: none;
  }
  
  .title {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 24px;
    color: white;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
  }
  
  .dots {
    position: absolute;
    bottom: 20px;
    right: 10px;
    display: flex;
  }
  
  .dot {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .dot.active {
    background-color: white;
  }
  </style>
  