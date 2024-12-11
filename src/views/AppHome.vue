<template>
  <!-- External Resources -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  
  <div class="news-portal">
    <!-- Header Section -->
    <header class="header">
      <!-- Top Header -->
      <div class="header-top">
        <div class="container">
          <div class="date-weather">
            <span>{{ currentDate }}</span>
            <span class="weather">{{ weather }}</span>
          </div>
          <div class="social-links">
            <a href="https://www.facebook.com/" target="_blank"><i class="fab fa-facebook"></i></a>
            <a href="https://twitter.com/intent/tweet" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="https://www.youtube.com/" target="_blank"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>

      <!-- Main Header -->
      <div class="main-header container">
        <div class="logo">
          <h1>NEWS PORTAL</h1>
        </div>
        <nav class="main-nav">
          <ul>
            <li v-for="category in categories" :key="category.id">
              <a href="#" 
                 @click="filterByCategory(category.id)"
                 :style="{ color: category.color }"
                 :data-description="category.description">
                <i :class="category.icon"></i>
                {{ category.name }}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container">
      <!-- Breaking News Banner -->
      <div class="breaking-news">
        <span class="breaking-label">TIN MỚI NHẤT</span>
        <div class="breaking-content">
          <marquee>
            <span v-for="(news, index) in breakingNews" :key="index">
              {{ news.title }} |
            </span>
          </marquee>
        </div>
      </div>

      <!-- Featured News Section -->
      <div class="featured-section">
        <!-- Main Story -->
        <div class="main-story" @click="showNewsDetail(mainNews)">
          <img :src="mainNews.imageUrl" :alt="mainNews.title">
          <div class="story-overlay">
            <span class="category">{{ mainNews.category }}</span>
            <h2>{{ mainNews.title }}</h2>
            <p>{{ mainNews.description }}</p>
          </div>
        </div>
        
        <!-- Top Stories -->
        <div class="top-stories">
          <h3>TIN NỔI BẬT</h3>
          <div class="story-grid">
            <div v-for="(story, index) in topStories" 
                 :key="index" 
                 class="story-item"
                 @click="showNewsDetail(story)">
              <img :src="story.imageUrl" :alt="story.title">
              <div class="story-content">
                <span class="category-tag">{{ story.category }}</span>
                <h4>{{ story.title }}</h4>
                <span class="time">{{ story.date }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- News Categories Grid -->
      <div class="news-grid">
        <div v-for="(category, index) in newsCategories" 
             :key="index" 
             class="category-section">
          <h3>{{ category.name }}</h3>
          <div class="category-news">
            <div v-for="(news, newsIndex) in filterNewsByCategory(category.name)" 
                 :key="newsIndex"
                 class="news-card"
                 @click="showNewsDetail(news)">
              <img :src="news.imageUrl" :alt="news.title">
              <div class="news-content">
                <h4>{{ news.title }}</h4>
                <p>{{ news.description }}</p>
                <div class="meta">
                  <span><i class="far fa-clock"></i> {{ news.date }}</span>
                  <span><i class="fas fa-map-marker-alt"></i> {{ news.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- News Detail Modal -->
    <div v-if="selectedNews" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <article class="news-detail">
          <h2>{{ selectedNews.title }}</h2>
          <div class="meta-info">
            <span><i class="far fa-calendar"></i> {{ selectedNews.date }}</span>
            <span><i class="fas fa-map-marker-alt"></i> {{ selectedNews.location }}</span>
            <span><i class="fas fa-folder"></i> {{ selectedNews.category }}</span>
          </div>
          <img :src="selectedNews.imageUrl" :alt="selectedNews.title">
          <p class="description">{{ selectedNews.description }}</p>
          <div class="content" v-if="selectedNews.content" v-html="selectedNews.content"></div>
          <div class="source-link" v-if="selectedNews.link">
            <a :href="selectedNews.link" target="_blank" class="read-more">
              Đọc thêm <i class="fas fa-external-link-alt"></i>
            </a>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default {
  name: 'AppHome',
  
  data() {
    return {
      // UI State
      selectedNews: null,
      currentCategory: null,
      weather: '25°C Hà Nội',

      // Navigation Categories
      categories: [
        { 
          id: 1, 
          name: 'Thời sự',
          icon: 'fas fa-newspaper',
          color: '#e74c3c',
          hover: '#c0392b',
          description: 'Tin tức thời sự nóng hổi'
        },
        { 
          id: 2, 
          name: 'Thế giới',
          icon: 'fas fa-globe-asia',
          color: '#3498db',
          hover: '#2980b9',
          description: 'Tin tức quốc tế'
        },
        { 
          id: 3, 
          name: 'Kinh doanh',
          icon: 'fas fa-chart-line',
          color: '#2ecc71',
          hover: '#27ae60',
          description: 'Thông tin kinh tế, tài chính'
        },
        { 
          id: 4, 
          name: 'Giải trí',
          icon: 'fas fa-film',
          color: '#9b59b6',
          hover: '#8e44ad',
          description: 'Tin tức giải trí, showbiz'
        },
        { 
          id: 5, 
          name: 'Thể thao',
          icon: 'fas fa-futbol',
          color: '#f1c40f',
          hover: '#f39c12',
          description: 'Tin tức thể thao'
        },
        { 
          id: 6, 
          name: 'Công nghệ',
          icon: 'fas fa-microchip',
          color: '#1abc9c',
          hover: '#16a085',
          description: 'Tin tức công nghệ'
        }
      ],

      // Breaking News Ticker
      breakingNews: [
        { 
          title: 'OpenAI sa thải CEO Sam Altman, Microsoft giảm 1.6% cổ phiếu',
          category: 'Công nghệ'
        },
        { 
          title: 'Taylor Swift lập kỷ lục doanh thu tour diễn 1 tỷ USD',
          category: 'Giải trí'
        },
        { 
          title: 'Giá vàng trong nước tăng vọt lên 74 triệu đồng',
          category: 'Kinh doanh'
        }
      ],

      // Featured Main News
      mainNews: {
        title: 'Mỹ vừa bỏ phiếu phủ quyết nghị quyết ngừng bắn ở Gaza',
        description: 'Theo báo Times of Israel, toàn bộ 15 nước thành viên HĐBA hôm nay (20/11) đã tham gia bỏ phiếu thông qua nghị quyết do 10 quốc gia không thường trực bảo trợ. Dù đã nhận được 14 phiếu thuận, nhưng Mỹ là nước thành viên thường trực, có quyền phủ quyết lại bỏ phiếu chống nên văn bản trên rốt cuộc đã không được HĐBA phê chuẩn.',
        category: 'Thời sự',
        imageUrl: 'https://static-images.vnncdn.net/vps_images_publish/000001/000003/2024/11/20/hop-hdba-lhq-times-of-israel-118559.jpg',
        date: '2024-11-20',
        location: 'New York'
      },

      // News List by Categories
      newsList: [
        // Thời sự
        {
          id: 1,
          title: 'Nga di tản dân cư khi chiến sự đang nóng lên',
          description: 'Theo các báo cáo, hoạt động di tản đang được tiến hành ở Nga sau khi Ukraine tấn công các kho vũ khí trong nước...',
          category: 'Thời sự',
          categoryId: 1,
          imageUrl: 'https://congluan-cdn.congluan.vn/files/content/2024/11/20/chien-ssu-1-1904.jpg',
          date: '2024-11-20',
          location: 'Nga'
        },
        // Thế giới
        {
          id: 2,
          title: 'Trùm bất động sản được ông Trump chọn làm "người dập lửa" Trung Đông',
          description: 'Dù không có kinh nghiệm ngoại giao, tỷ phú Steve Witkoff được ông Trump chọn làm đặc phái viên Trung Đông...',
          category: 'Thế giới',
          categoryId: 2,
          imageUrl: 'https://i2-vnexpress.vnecdn.net/2024/11/19/ap24279775311406-e173145010249-2642-2568-1731994478.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=KDI6JqkyL0Qq58WEJDROXA',
          date: '2024-11-20',
          location: 'Mỹ'
        },
        // Công nghệ
        {
          id: 3,
          title: 'OpenAI sa thải CEO Sam Altman, nhà đầu tư lo ngại',
          description: 'Hội đồng quản trị OpenAI bất ngờ sa thải CEO Sam Altman, người được coi là nhân vật quan trọng trong việc phát triển ChatGPT...',
          category: 'Công nghệ',
          categoryId: 6,
          imageUrl: 'https://vcdn1-sohoa.vnecdn.net/2023/11/18/DC7DRYCXDVITNISSCF3GZUIQFM-6837-1700326677.png?w=460&h=0&q=100&dpr=2&fit=crop&s=nIfSNxSfdNfXsY7Fq6k74Q',
          date: '2024-11-20',
          location: 'San Francisco'
        },
        // Giải trí
        {
          id: 4,
          title: 'Taylor Swift lập kỷ lục doanh thu tour diễn 1 tỷ USD',
          description: 'Ca sĩ Taylor Swift trở thành nghệ sĩ đầu tiên trong lịch sử đạt doanh thu tour diễn hơn 1 tỷ USD với "Eras Tour"...',
          category: 'Giải trí',
          categoryId: 4,
          imageUrl: 'https://vcdn1-kinhdoanh.vnecdn.net/2024/12/10/taylor-swift-2024-vancouver-er-9209-9335-1733801130.png?w=460&h=0&q=100&dpr=2&fit=crop&s=BIostJFJFfOVoU613qlDbQ',
          date: '2024-11-20',
          location: 'Los Angeles'
        },
        // Thể thao
        {
          id: 5,
          title: 'Ronaldo ghi bàn thứ 50 trong năm 2023',
          description: 'Cristiano Ronaldo đạt cột mốc 50 bàn trong năm dương lịch 2023 sau khi ghi bàn giúp Bồ Đào Nha thắng Iceland 2-0...',
          category: 'Thể thao',
          categoryId: 5,
          imageUrl: 'https://media.vov.vn/sites/default/files/styles/large/public/2023-12/ronaldo.jpg',
          date: '2024-11-20',
          location: 'Lisbon'
        }
      ]
    };
  },

  computed: {
    // Format current date in Vietnamese
    currentDate() {
      return format(new Date(), 'EEEE, dd MMMM yyyy', { locale: vi });
    },

    // Get top stories for featured section
    topStories() {
      if (this.currentCategory) {
        return this.newsList
          .filter(news => news.categoryId === this.currentCategory)
          .slice(0, 4);
      }
      return this.newsList.slice(0, 4);
    },

    // Group news by categories
    newsCategories() {
      const categories = [...new Set(this.newsList.map(news => news.category))];
      return categories.map(category => ({
        name: category,
        news: this.newsList.filter(news => news.category === category)
      }));
    }
  },

  methods: {
    // Show news detail modal
    showNewsDetail(news) {
      this.selectedNews = news;
      document.body.style.overflow = 'hidden';
    },

    // Close news detail modal
    closeModal() {
      this.selectedNews = null;
      document.body.style.overflow = 'auto';
    },

    // Filter news by category
    filterByCategory(categoryId) {
      this.currentCategory = categoryId;
    },

    // Get news list filtered by category
    filterNewsByCategory(category) {
      return this.newsList.filter(news => news.category === category);
    }
  }
};
</script>

<style scoped>
/* Base Styles */
.news-portal {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Header Styles */
.header {
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.header-top {
  background: linear-gradient(to right, #2c3e50, #3498db);
  color: #fff;
  padding: 8px 0;
  font-size: 14px;
}

.date-weather {
  display: flex;
  gap: 20px;
  align-items: center;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-links a {
  color: #fff;
  transition: all 0.3s ease;
}

.social-links a:hover {
  transform: translateY(-2px);
  color: #f1c40f;
}

.main-header {
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(45deg, #e74c3c, #3498db);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Navigation Styles */
.main-nav ul {
  display: flex;
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.main-nav li a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 15px;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
}

.main-nav li a:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.main-nav li a::after {
  content: attr(data-description);
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.main-nav li a:hover::after {
  opacity: 1;
  visibility: visible;
  bottom: -25px;
}

/* Breaking News Styles */
.breaking-news {
  background: #fff;
  padding: 15px;
  margin: 20px 0;
  border-radius: 8px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.breaking-label {
  background: linear-gradient(45deg, #e74c3c, #c0392b);
  color: white;
  padding: 8px 15px;
  border-radius: 4px;
  margin-right: 15px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.breaking-content {
  flex: 1;
}

/* Featured Section Styles */
.featured-section {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 25px;
  margin: 30px 0;
}

.main-story {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.main-story:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.main-story img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.main-story:hover img {
  transform: scale(1.05);
}

.story-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
  color: white;
}

.story-overlay h2 {
  font-size: 24px;
  margin: 10px 0;
  line-height: 1.4;
}

.story-overlay .category {
  background: #e74c3c;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* News Grid Styles */
.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin: 30px 0;
}

.category-section h3 {
  font-size: 20px;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #e74c3c;
  color: #2c3e50;
}

.news-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.news-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.news-card:hover img {
  transform: scale(1.05);
}

.news-content {
  padding: 20px;
}

.news-content h4 {
  font-size: 18px;
  margin: 0 0 10px;
  line-height: 1.4;
  color: #2c3e50;
}

.news-content p {
  color: #666;
  font-size: 14px;
  margin-bottom: 15px;
}

.meta {
  display: flex;
  gap: 15px;
  font-size: 12px;
  color: #888;
}

.meta span {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 12px;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.close {
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  transition: all 0.3s ease;
}

.close:hover {
  color: #e74c3c;
  transform: rotate(90deg);
}

.news-detail {
  padding: 20px 0;
}

.news-detail h2 {
  font-size: 24px;
  color: #2c3e50;
  margin-bottom: 15px;
}

.meta-info {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  color: #666;
  font-size: 14px;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  margin-top: 20px;
  transition: all 0.3s ease;
}

.read-more:hover {
  background: #2980b9;
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .featured-section {
    grid-template-columns: 1fr;
  }
  
  .news-grid {
    grid-template-columns: 1fr;
  }
  
  .main-nav ul {
    flex-wrap: wrap;
    justify-content: center;
  }

  .main-story img {
    height: 300px;
  }

  .header-top {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }

  .social-links {
    justify-content: center;
  }

  .modal-content {
    margin: 15px;
    padding: 20px;
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.modal {
  animation: fadeIn 0.3s ease;
}

/* Custom Scrollbar */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>