<template>
    <div class="header">
      <div class="logo">
        Vishuro
      </div>
      <div class="right-buttons">
        <div class="settings-dropdown" @click="toggleDropdown">
          <button class="button settings-button">⚙️</button>
          <div v-if="dropdownVisible" class="dropdown-content" @click.stop>
            <p class="theme-label">Theme</p>
            <div class="switch-container">
              <button class="button theme-button" @click="setTheme('classic')" :class="{ active: theme === 'classic' }">
                <span class="switch-label">Classic</span>
                <div class="switch">
                  <input type="radio" name="theme" :checked="theme === 'classic'" @change="setTheme('classic')" />
                  <div class="slider"></div>
                </div>
              </button>
              <button class="button theme-button" @click="setTheme('seasonal')" :class="{ active: theme === 'seasonal' }">
                <span class="switch-label">Seasonal</span>
                <div class="switch">
                  <input type="radio" name="theme" :checked="theme === 'seasonal'" @change="setTheme('seasonal')" />
                  <div class="slider"></div>
                </div>
              </button>
            </div>  
            <div v-if="theme === 'seasonal'" class="seasonal-options">
              <button class="button seasonal-button" @click="setSeasonalTheme('light')" :class="{ active: seasonalTheme === 'light' }">Light</button>
              <button class="button seasonal-button" @click="setSeasonalTheme('dark')" :class="{ active: seasonalTheme === 'dark' }">Dark</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from "vue";
  
  const theme = ref('classic');
  const seasonalTheme = ref('light');
  const dropdownVisible = ref(false);
  
  function setTheme(newTheme) {
    theme.value = newTheme;
    updateSeasonClasses();
  }
  
  function setSeasonalTheme(newSeasonalTheme) {
    seasonalTheme.value = newSeasonalTheme;
    updateSeasonClasses();
  }
  
  function updateSeasonClasses() {
    document.body.classList.remove("classic-theme", "seasonal-theme", "light-theme", "dark-theme", "spring-theme", "summer-theme", "autumn-theme", "winter-theme");
  
    if (theme.value === 'classic') {
      document.body.classList.add('classic-theme');
    } else {
      document.body.classList.add('seasonal-theme', `${seasonalTheme.value}-theme`);
      document.body.classList.add(`${getSeasonFromDate()}-theme`);
    }
  }
  
  function getSeasonFromDate() {
    const currentMonth = new Date().getMonth() + 1;
    if (currentMonth >= 3 && currentMonth <= 5) {
      return "spring";  
    } else if (currentMonth >= 6 && currentMonth <= 8) {
      return "summer";  
    } else if (currentMonth >= 9 && currentMonth <= 11) {
      return "autumn";  
    } else {
      return "winter";  
    }
  }
  
  function toggleDropdown() {
    dropdownVisible.value = !dropdownVisible.value;
  }
  
  function handleClickOutside(event) {
    const dropdown = document.querySelector('.settings-dropdown');
    if (dropdown && !dropdown.contains(event.target)) {
      dropdownVisible.value = false;
    }
  }
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    updateSeasonClasses();
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
  });
  </script>
  
  
  <style scoped>
.header {
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  background-color: #44195ede;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 10;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

  
  .logo {
    font-size: 24px;
    color: white;
    font-weight: bold;
  }
  
  .right-buttons {
    display: flex;
    gap: 10px;
  }
  
  .button {
    background-color: transparent;
    border: 1px solid #ccc;
    color: white;
    padding: 6px 12px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .button:hover {
    background-color: #444;
    transform: scale(1.05);
  }
  
  .settings-dropdown {
    position: relative;
  }
  
  .settings-button {
    background: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
  }
  
  .dropdown-content {
    position: absolute;
    background-color: #333;
    min-width: 200px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    display: block;
    padding: 10px;
    right: 0;
    border-radius: 5px;
  }
  
  .theme-label {
    font-size: 14px;
    font-weight: bold;
    color: #ccc;
    margin-bottom: 15px;
    text-transform: uppercase;
  }
  
  .switch-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .theme-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
    background-color: transparent;
    border: 1px solid #444;
    border-radius: 4px;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .theme-button:hover {
    background-color: #444;
  }
  
  .switch-label {
    font-size: 14px;
    font-weight: bold;
  }
  
  .switch {
    --width: 3em;
    --height: 1.6em;
    --toggle-size: calc(var(--height) - 0.3em);
    --toggle-offset: 0.2em;
    --background-off: #5a5a5a;
    --background-on: #a400b3;
    --toggle-off: #ffffff;
    --toggle-on: #ffffff;
    --shadow-off: 0 2px 5px rgba(0, 0, 0, 0.2);
    --shadow-on: 0 0 8px rgba(59, 130, 246, 0.5);
  
    position: relative;
    display: inline-block;
    width: var(--width);
    height: var(--height);
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background-color: var(--background-off);
    transition: 0.4s cubic-bezier(0.44, 0.09, 0.21, 0.97);
    border-radius: var(--height);
    overflow: hidden;
  }
  
  .slider::before {
    position: absolute;
    content: "";
    height: var(--toggle-size);
    width: var(--toggle-size);
    left: var(--toggle-offset);
    bottom: var(--toggle-offset);
    background-color: var(--toggle-off);
    transition: 0.4s cubic-bezier(0.44, 0.09, 0.21, 0.97);
    border-radius: 50%;
    box-shadow: var(--shadow-off);
  }
  
  .switch input:checked + .slider {
    background-color: var(--background-on);
  }
  
  .switch input:checked + .slider::before {
    transform: translateX(calc(var(--width) - var(--height)));
    background-color: var(--toggle-on);
    box-shadow: var(--shadow-on);
  }
  
  body.spring-theme {
    background-color: #e0f7fa;
  }
  
  body.summer-theme {
    background-color: #ffeb3b;
  }
  
  body.autumn-theme {
    background-color: #ff7043;
  }
  
  body.winter-theme {
    background-color: #81d4fa;
  }
  
  body.light-theme {
    background-color: #f0f0f0;
  }
  
  body.dark-theme {
    background-color: #333;
    color: white;
  }
  
  .seasonal-options {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
  }
  
  .seasonal-button {
    background-color: transparent;
    border: 1px solid #444;
    color: white;
    padding: 6px 10px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.3s, transform 0.3s;
  }
  
  .seasonal-button.active {
    background-color: #444;
  }
  </style>
  