<template>
    <div id="site">
      <LoadingScreen v-if="isLoading" />
      <div v-if="!isLoading" class="content">
        <component :is="sideMenuComponent" />
        <div class="main-content">
          <Header />
          <div class="wrapper">
            <NuxtPage />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, markRaw } from 'vue';
  import LoadingScreen from '../components/MainPage/LoadingScreen.vue';
  import Header from '../components/Header.vue';
  import SideMenuMobile from '../components/SideMenuMobile.vue';
  import SideMenuDesktop from '../components/SideMenuDesktop.vue';
  import Footer from '~/components/Footer.vue';
  
  const isLoading = ref(true);
  
  const sideMenuComponent = ref(markRaw(SideMenuMobile));
  
  const updateSideMenu = () => {
    if (window.innerWidth >= 1200) {
      sideMenuComponent.value = markRaw(SideMenuDesktop);
    } else {
      sideMenuComponent.value = markRaw(SideMenuMobile);
    }
  };
  
  onMounted(() => {
    setTimeout(() => {
      isLoading.value = false;
    }, 9000);
  
    updateSideMenu();
  
    window.addEventListener('resize', updateSideMenu);
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateSideMenu);
  });
  </script>
  
  <style scoped>
  #site {
    display: flex;
    height: 100vh;
    width: 100vw;
  }
  
  .content {
    display: flex;
    width: 100%;
    height: 100%;
  }
  
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    overflow-y: auto;
    background-color: #1a0a2a;
    background-image: 
      linear-gradient(to right, rgba(255, 255, 255, 0.050) 1px, transparent 1px), 
      linear-gradient(to bottom, rgba(255, 255, 255, 0.050) 1px, transparent 1px);
    background-size: 100px 20px;
  }
  
  .main-content::-webkit-scrollbar {
    width: 0px;
  }
  
  .wrapper {
    width: 90%;
    max-width: 1300px;
    height: 100%;
    display: flex;
    margin-top: 20px;
    gap: 20px;
  }
  </style>
  