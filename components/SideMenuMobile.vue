<template>
  <!-- Lazy to do it better -->
  <nav class="bottom-nav">
    <div class="left-icons">
      <a href="/home">🏠</a>
      <a href="/settings">⚙️</a>
    </div>
    <div class="right-arrow">
      <button @click="toggleSideMenu">➡️</button>
    </div>
  </nav>
  <div :class="{'side-menu': true, 'menu-open': isMenuVisible}">
    <div class="menu-content">
      <h2>Menu</h2>
      <p>Opcje bocznego menu.</p>
      <button @click="toggleSideMenu">Zamknij</button>
    </div>
  </div>
  <div v-if="isMenuVisible" class="overlay"></div>
</template>

<script>
export default {
  data() {
    return {
      isMenuVisible: false,
    };
  },
  methods: {
    toggleSideMenu() {
      this.isMenuVisible = !this.isMenuVisible;
    },
  },
};
</script>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #22222257;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  color: white;
  z-index: 1000;
}

.left-icons a,
.right-arrow button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  margin: 0 10px;
  text-decoration: none;
}

.right-arrow button {
  font-size: 30px;
}

.side-menu {
  position: fixed;
  top: 0;
  left: -250px;
  width: 250px;
  height: 100%;
  background: #333;
  color: white;
  padding: 20px;
  box-shadow: 3px 0 10px rgba(0, 0, 0, 0.5);
  z-index: 1100;
  transition: left 0.3s ease;
}

.side-menu.menu-open {
  left: 0;
}

.menu-content {
  margin-top: 30px;
}

.menu-content button {
  margin-top: 20px;
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  backdrop-filter: blur(5px);
}
</style>
