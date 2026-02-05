<template>
  <div class="sidebar" :class="{collapsed: isCollapsed}">
    <div class="logo-section">
      <img src="/logoapp.png" alt="Logo" class="logo" />
      <div class="site-title">
        <h1>vishuro.xyz</h1>
        <h2>Guild</h2>
      </div>
    </div>
    <div class="list">
    <div class="category">
      <h3>PGR STUFF</h3> 
      <ul>
        <li>
            <a href="/players"><img src="/logo.png" alt="Players" class="icon" /> 
              <span class="text">Characters</span>
            </a>
        </li>
        <li>
            <a href="/players"><img src="/logo.png" alt="Players" class="icon" /> 
              <span class="text">Patch List</span>
            </a>
        </li>
        <li>
            <a href="/Timeline"><img src="/logo.png" alt="Players" class="icon" /> 
              <span class="text">Timeline</span>
            </a>
        </li>
      </ul>
    </div>

    <div class="category">
      <h3>Tools</h3>
      <ul>
        <li>
            <a href="/players"><img src="/logo.png" alt="Players" class="icon" /> 
              <span class="text">Calculator</span>
            </a>
        </li>
        <li>
            <a href="/players"><img src="/logo.png" alt="Players" class="icon" /> 
              <span class="text">Team Planner</span>
            </a>
        </li>
        <li>
            <a href="/players"><img src="/public/calendar-regular-24.png" alt="Players" class="icon" /> 
              <span class="text">Calendar</span>
            </a>
        </li>
        <li>
            <a href="/players"><img src="/public/calendar-regular-24.png" alt="Players" class="icon" /> 
              <span class="text">Story Creator</span>
            </a>
        </li>
      </ul>
    </div>

    <div class="category">
      <h3>Guild</h3>
      <ul>
        <li>
            <a href="/players"><img src="/logo.png" alt="Players" class="icon" /> 
              <span class="text">Members</span>
            </a>
        </li>
        <li>
            <a href="/players"><img src="/logo.png" alt="Players" class="icon" /> 
              <span class="text">Simulated Siege</span>
            </a>
        </li>
      </ul>
    </div>

    <div class="category">
      <h3>Others</h3>
      <ul>
        <li>
            <a href="/players"><img src="/logo.png" alt="Players" class="icon" /> 
              <span class="text">R&D Simulator</span>
            </a>
        </li>
        <li>
            <a href="/players"><img src="/logo.png" alt="Players" class="icon" /> 
              <span class="text">Weekly Quiz</span>
            </a>
        </li>
      </ul>
    </div>
    </div>
    <div class="bot">
      <Bot />
    </div>


    <button class="toggle-btn" @click="toggleMenu">
      <span class="arrow"></span>
    </button>



  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false
    };
  },
  methods: {
    toggleMenu() {
      this.isCollapsed = !this.isCollapsed;
    }
  }
};
</script>

<style scoped>
.sidebar {
  width: 300px;
  height: 100vh;
  background: linear-gradient(140deg, #44195e, #2a103c);
  will-change: transform, opacity, max-height;
  padding: 15px;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.5);
  transition: 0.3s ease;
  border-right: 1px solid #271f2b;
  position: relative;
  z-index: 10;

}

.list {
  overflow-y: auto;
}

.list::-webkit-scrollbar {
  width: 0px;
}

.logo-section {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.logo {
  width: 40px;
  height: 40px;
  background-color: rgb(108, 35, 150);
  padding: 5px;
  border-radius: 10px;
  margin-right: 15px;
  transform: rotate(0deg);
  transition: transform 0.3s ease-in-out;
}

.site-title {
  opacity: 1;
  max-height: 100px;
  overflow: hidden;
  transition: opacity 0.3s ease, max-height 0.3s ease;
}

.site-title h1 {
  font-size: 18px;
  font-weight: bold;
}

.site-title h2 {
  font-size: 14px;
  color: rgb(187, 187, 187);
}

.category {
  margin-bottom: 15px;
  transition: opacity 0.3s ease;
}

.category h3 {
  font-size: 14px;
  margin-bottom: 5px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #fff;
  opacity: 1;
  max-height: 100px;
  overflow: hidden;
  transform: translateY(0);
  transition: opacity 0.3s ease, max-height 0.3s ease, transform 0.3s ease;
}

.category ul {
  list-style: none;
  transition: all 0.3s ease;
}

.category li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.category li a {
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  font-size: 16px;
  border-radius: 5px;
  width: 100%;

}

.category li a .icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
  transition: transform 0.3s ease;
}

.category li a .text {
  white-space: nowrap;
  opacity: 1;
  max-height: 100px;
  overflow: hidden;
  transition: opacity 0.3s ease, max-height 0.3s ease;
}

.category li a:hover {
  background: rgba(156, 51, 194, 0.3);
}

.sidebar.collapsed {
  width: 60px; 
  padding: 10px;
}

.sidebar.collapsed .logo-section {
  margin-bottom: 20px
}

.sidebar.collapsed .logo {
  background-color: rgb(156, 47, 151);
  transform: rotate(-360deg);

}

.sidebar.collapsed .site-title {
  opacity: 0;
  max-height: 0;  
}

.sidebar.collapsed .category h3 {
  opacity: 0;
  max-height: 0;
}

.sidebar.collapsed .category li {
  transform: translateY(0);
}

.sidebar.collapsed .category li a .text {
  opacity: 0;
  max-height: 0;

}

.bot {
  position: relative;
  transition: opacity 0.3s ease, transform 0.3s ease;
  opacity: 1;
  transform: translateX(0);
}

.sidebar.collapsed .bot {
  opacity: 0;
  transform: translateX(-20px);
  pointer-events: none;
}


.toggle-btn {
  background-color: rgba(120, 38, 150, 0.37);
  padding: 12px;
  width: 100%;
  margin-top: auto;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
  border: none;
}

.toggle-btn:hover {
  background-color: rgba(120, 38, 150, 0.5);
}

.arrow {
  width: 12px;
  height: 12px;
  border-left: 2px solid white;
  border-bottom: 2px solid white;
  transform: rotate(45deg);
  transition: transform 0.3s ease, margin 0.3s ease;
}

.sidebar.collapsed .toggle-btn .arrow {
  transform: rotate(-135deg);
  margin-left: -5px;
}
</style>