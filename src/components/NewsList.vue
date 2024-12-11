<template>
    <div class="news-list">
      <div v-for="item in news" :key="item.title" 
         class="news-item" 
         @click="$emit('news-click', item)">
      <!-- existing content -->
    </div>
      <h3>Latest News</h3>
      <ul>
        <li v-for="(item, index) in news" :key="index" class="news-item">
          <img :src="item.imageUrl" alt="News Image" />
          <div>
            <h4>{{ item.title }}</h4>
            <p>{{ item.location }} - {{ item.date }}</p>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['news'],
  };
  </script>
  
  <style scoped>
  .news-list {
    /* Style cho danh sách tin tức bên phải */
  }
  .news-item {
    display: flex;
    margin-bottom: 15px;
  }
  .news-item img {
    width: 80px;
    height: 80px;
    margin-right: 10px;
  }
  </style>
  