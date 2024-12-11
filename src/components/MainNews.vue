<template>
    <div class="main-news" @click="$emit('click')">
      <img :src="newsItem.imageUrl" alt="Main News Image" />
      <div class="main-news-content">
        <h2>{{ newsItem.title }}</h2>
        <p>{{ newsItem.description }}</p>
        <span>{{ newsItem.category }} - {{ newsItem.date }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['newsItem'],
  };
  </script>
    
  <style scoped>
  .main-news {
    /* Style cho tin tức chính */
  }
  .main-news img {
    width: 100%;
    height: auto;
  }
  .main-news-content {
    padding: 20px;
  }
  </style>
  