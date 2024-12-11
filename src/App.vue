<template>
  <div id="app">
    <!-- Navigation Header -->
    <header class="header">
      <div class="header-container">
        <!-- Logo -->
        <div class="logo">
          <i class="fas fa-newspaper"></i>
          <span>NEWS</span>
        </div>

        <!-- Main Navigation -->
        <nav class="nav-menu">
          <router-link to="/" class="nav-link">
            <i class="fas fa-home"></i>
            <span>Trang chủ</span>
          </router-link>
          <router-link to="/category/1" class="nav-link">
            <i class="fas fa-th-large"></i>
            <span>Danh mục</span>
          </router-link>
          <router-link to="/contact" class="nav-link">
            <i class="fas fa-envelope"></i>
            <span>Liên hệ</span>
          </router-link>
        </nav>

        <!-- Search Button -->
        <button class="search-btn">
          <i class="fas fa-search"></i>
        </button>
      </div>
    </header>

    <!-- Main Content with Transition -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

/* Reset & Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f5f7fa;
  min-height: 100vh;
}

/* Header Styles */
.header {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  padding: 0.8rem 0;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo Styles */
.logo {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #2563eb;
}

.logo i {
  font-size: 1.8rem;
  background: linear-gradient(45deg, #2563eb, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Navigation Menu */
.nav-menu {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: #64748b;
  font-weight: 500;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link i {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.nav-link:hover {
  color: #2563eb;
  background: rgba(37, 99, 235, 0.08);
}

.nav-link:hover i {
  transform: translateY(-2px);
}

.nav-link.router-link-exact-active {
  color: #2563eb;
  background: rgba(37, 99, 235, 0.12);
}

.nav-link.router-link-exact-active::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: linear-gradient(45deg, #2563eb, #3b82f6);
  border-radius: 2px;
}

/* Search Button */
.search-btn {
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 1.2rem;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.search-btn:hover {
  color: #2563eb;
  background: rgba(37, 99, 235, 0.08);
  transform: scale(1.05);
}

/* Main Content */
.main-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1.5rem;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-container {
    padding: 0 1rem;
  }

  .logo span {
    display: none;
  }

  .nav-link span {
    display: none;
  }

  .nav-link {
    padding: 0.5rem;
  }

  .nav-link i {
    font-size: 1.3rem;
  }

  .nav-menu {
    gap: 0.8rem;
  }
}

/* Hover Effects */
@media (hover: hover) {
  .nav-link:hover {
    transform: translateY(-2px);
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  #app {
    background: #0f172a;
  }

  .header {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  }

  .nav-link {
    color: #94a3b8;
  }

  .nav-link:hover,
  .nav-link.router-link-exact-active {
    color: #60a5fa;
    background: rgba(96, 165, 250, 0.1);
  }

  .search-btn {
    color: #94a3b8;
  }

  .search-btn:hover {
    color: #60a5fa;
    background: rgba(96, 165, 250, 0.1);
  }
}
</style>