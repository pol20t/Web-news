<template>
  
  <div class="category-page">
    <!-- Category Header -->
    <div class="category-header" :style="{ backgroundColor: currentCategory?.color + '15' }">
      <div class="container">
        <div class="category-info">
          <i :class="currentCategory?.icon" :style="{ color: currentCategory?.color }"></i>
          <h1>{{ currentCategory?.name }}</h1>
          <p>{{ currentCategory?.description }}</p>
        </div>
        <div class="category-stats">
          <div class="stat-item">
            <span class="number">{{ categoryNews.length }}</span>
            <span class="label">Bài viết</span>
          </div>
          <div class="stat-item">
            <span class="number">{{ todayNews }}</span>
            <span class="label">Hôm nay</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Category Navigation -->
    <div class="category-nav">
      <div class="container">
        <div class="nav-wrapper">
          <div class="categories-list">
            <a v-for="cat in categories" 
               :key="cat.id"
               @click="selectCategory(cat.id)"
               :class="{ active: selectedCategoryId === cat.id }"
               :style="{ '--hover-color': cat.color }"
            >
              <i :class="cat.icon"></i>
              {{ cat.name }}
            </a>
          </div>
          <div class="view-options">
            <button @click="viewMode = 'grid'" :class="{ active: viewMode === 'grid' }">
              <i class="fas fa-th-large"></i>
            </button>
            <button @click="viewMode = 'list'" :class="{ active: viewMode === 'list' }">
              <i class="fas fa-list"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- News Content -->
    <div class="container">
      <div class="content-wrapper">
        <!-- Filters Sidebar -->
        <aside class="filters">
          <div class="filter-section">
            <h3>Lọc theo thời gian</h3>
            <div class="filter-options">
              <label><input type="radio" v-model="timeFilter" value="all"> Tất cả</label>
              <label><input type="radio" v-model="timeFilter" value="today"> Hôm nay</label>
              <label><input type="radio" v-model="timeFilter" value="week"> Tuần này</label>
              <label><input type="radio" v-model="timeFilter" value="month"> Tháng này</label>
            </div>
          </div>
          <div class="filter-section">
            <h3>Sắp xếp</h3>
            <div class="filter-options">
              <label><input type="radio" v-model="sortBy" value="newest"> Mới nhất</label>
              <label><input type="radio" v-model="sortBy" value="popular"> Phổ biến nhất</label>
            </div>
          </div>
        </aside>

        <!-- News Grid/List -->
        <div :class="['news-container', viewMode]">
          <div v-for="news in paginatedNews" 
               :key="news.id" 
               class="news-item"
               @click="showNewsDetail(news)">
            <div class="news-image">
              <img :src="news.imageUrl" :alt="news.title">
              <span class="category-tag" :style="{ backgroundColor: currentCategory?.color }">
                {{ news.category }}
              </span>
            </div>
            <div class="news-content">
              <h3>{{ news.title }}</h3>
              <p class="description">{{ news.description }}</p>
              <div class="news-meta">
                <span><i class="far fa-clock"></i> {{ formatDate(news.date) }}</span>
                <span><i class="far fa-eye"></i> {{ news.views }}</span>
                <span><i class="far fa-comment"></i> {{ news.comments }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination">
        <button 
          v-for="page in totalPages" 
          :key="page"
          @click="currentPage = page"
          :class="{ active: currentPage === page }"
        >
          {{ page }}
        </button>
      </div>
    </div>

    <!-- News Detail Modal -->
    <div v-if="selectedNews" class="modal" @click.self="selectedNews = null">
      <div class="modal-content">
        <button class="close-button" @click="selectedNews = null">
          <i class="fas fa-times"></i>
        </button>
        <div class="modal-header">
          <span class="category-tag" :style="{ backgroundColor: currentCategory?.color }">
            {{ selectedNews.category }}
          </span>
          <h2>{{ selectedNews.title }}</h2>
          <div class="news-meta">
            <span><i class="far fa-clock"></i> {{ formatDate(selectedNews.date) }}</span>
            <span><i class="far fa-user"></i> {{ selectedNews.author }}</span>
            <span><i class="far fa-eye"></i> {{ selectedNews.views }}</span>
          </div>
        </div>
        <div class="modal-body">
          <img :src="selectedNews.imageUrl" :alt="selectedNews.title">
          <p class="description">{{ selectedNews.description }}</p>
          <div class="content" v-html="selectedNews.content"></div>
        </div>
        <div class="modal-footer">
          <div class="share-buttons">
            <button><i class="fab fa-facebook"></i></button>
            <button><i class="fab fa-twitter"></i></button>
            <button><i class="fab fa-linkedin"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default {
  name: 'CategoryPage',
  data() {
    return {
      selectedCategoryId: 1,
      viewMode: 'grid',
      timeFilter: 'all',
      sortBy: 'newest',
      currentPage: 1,
      itemsPerPage: 12,
      selectedNews: null,
      categories: [
        { 
          id: 1, 
          name: 'Thời sự',
          icon: 'fas fa-newspaper',
          color: '#e74c3c',
          hover: '#c0392b',
          description: 'Cập nhật tin tức thời sự nóng hổi trong ngày'
        },
        { 
          id: 2, 
          name: 'Thế giới',
          icon: 'fas fa-globe-asia',
          color: '#3498db',
          hover: '#2980b9',
          description: 'Tin tức quốc tế mới nhất'
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
        }
      ],
      news: [
        {
          id: 1,
          categoryId: 1,
          title: 'Hàng loạt đại sứ quán tại Kiev đóng cửa, Ukraine cáo buộc Nga "chiến tranh tâm lý"',
          description: 'Chỉ vài tiếng đồng hồ sau khi Mỹ tuyên bố đóng cửa đại sứ quán tại Kiev do lo ngại nguy cơ xảy ra không kích, đến lượt Italy, Tây Ban Nha và Hy Lạp cũng có quyết định tương tự.',
          content: 'Tờ Guardian (Anh) ngày 20/11, trích dẫn đài truyền hình nhà nước Suspilne của Ukraine, đưa tin rằng có thông tin tình báo nghi ngờ Kiev chuẩn bị phải đối mặt với cuộc tấn công kết hợp bởi thiết bị bay không người lái và tên lửa.Cùng ngày, Cục Lãnh sự thuộc Bộ Ngoại giao Mỹ thông báo rằng đại sứ quán Mỹ tại Kiev nhận được "thông tin cụ thể" về nguy cơ xảy ra không kích và do đó sẽ đóng cửa. Trong một tuyên bố chính thức, Đại sứ quán Mỹ tại Kiev nhấn mạnh: “Vì lý do thận trọng, Đại sứ quán sẽ đóng cửa và nhân viên được hướng dẫn trú ẩn tại chỗ. Đại sứ quán khuyến cáo công dân Mỹ chuẩn bị trú ẩn ngay lập tức trong trường hợp có cảnh báo trên không”.Công dân Mỹ cũng nhận khuyến cáo nên theo dõi phương tiện truyền thông địa phương để cập nhật thông tin và làm theo chỉ dẫn của các quan chức Ukraine cũng như lực lượng cứu hộ ban đầu trong trường hợp khẩn cấp.Sau đó, đại sứ quán của Italy, Tây Ban Nha và Hy Lạp cũng có quyết định tạm đóng cửa tương tự. Đại sứ quán Anh tại Kiev vẫn mở cửa bình thường, trong khi đại sứ quán Đức chỉ hoạt động giới hạn.',
          imageUrl: 'https://cdnmedia.baotintuc.vn/Upload/yTwlGtgJTRZkeJAfcpWR4g/files/2024/11/11Q/201124-dai-su-tay-ban-nha.jpg',
          date: '2024-03-20',
          author: 'Trần Văn Dũng',
          views: 3389,
          comments: 526,
          category: 'Thời sự'
        },
        {
          id: 2,
          categoryId: 1,
          title: 'Nga chiếm được Ilyinka, gây thêm áp lực lên phòng tuyến Ukraine',
          description: 'Ngày 20/11, Bộ Quốc phòng Nga thông báo về việc lực lượng Trung đoàn tác chiến đặc biệt đã giành quyền kiểm soát khu định cư Ilyinka tại tỉnh Donetsk của Ukraine.',
          content: 'Chiến thắng này được coi là một bước tiến chiến lược, củng cố thêm vị trí của Nga tại khu vực miền đông Ukraine trong bối cảnh xung đột tiếp tục leo thang. Theo phía Nga, các hoạt động tấn công chủ động của lực lượng Tập đoàn quân Trung ương đã dẫn đến kết quả quan trọng này, nhấn mạnh sự kiên quyết của Moskva trong việc đạt được các mục tiêu quân sự. Cùng thời điểm, các lực lượng không quân, tên lửa và pháo binh của Nga đã thực hiện hàng loạt cuộc tấn công quy mô lớn vào các mục tiêu trọng yếu tại Ukraine. Các cơ sở như sân bay quân sự, kho chứa thiết bị bay không người lái (UAV) và các cơ sở năng lượng hỗ trợ, tổ hợp công nghiệp quân sự của Ukraine đều bị nhắm đến. Nga khẳng định những cuộc không kích này nhằm làm suy yếu năng lực chiến đấu và khả năng hậu cần của đối phương, đồng thời tạo lợi thế trên chiến trường. Trong báo cáo chi tiết, Bộ Quốc phòng Nga cho biết hệ thống phòng không của họ đã bắn hạ 141 UAV, 4 quả bom dẫn đường Hammer và một tên lửa HIMARS, nhấn mạnh khả năng phòng thủ hiệu quả trước các đợt tấn công công nghệ cao từ Ukraine. Những nỗ lực này không chỉ nhằm bảo vệ vị trí chiến lược của Nga mà còn gia tăng sức ép lên lực lượng phòng thủ của Kiev. Tình hình tại các khu vực khác cũng cho thấy sự áp đảo từ phía Nga. Nhóm tác chiến Sever, hoạt động tại Kharkov, đã đẩy lùi một cuộc phản công của Ukraine và gây thiệt hại lớn cho Lữ đoàn tấn công đường không số 95 và Lữ đoàn cơ giới số 22. Ở khu vực miền đông, nhóm Zapad báo cáo thành công trong việc cải thiện vị trí chiến thuật và tiêu diệt nhiều binh sĩ Ukraine cùng nhiều thiết bị quân sự do phương Tây cung cấp. Tương tự, nhóm Vostok và nhóm Dnepr cũng thực hiện các cuộc tấn công có mục tiêu, làm suy yếu khả năng phản công của lực lượng Ukraine tại các khu vực Zaporizhia và Kherson.',
          imageUrl: 'https://cdnmedia.baotintuc.vn/Upload/cl7DTRhHBJYRLNmZYSjctQ/files/Nga-2011.jpg',
          date: '2024-03-20',
          author: 'Trần Văn Dũng',
          views: 9836,
          comments: 1259,
          category: 'Thời sự'
        },
        {
          id: 3,
          categoryId: 2,
          title: 'Nga cáo buộc Mỹ tìm cách kéo dài cuộc chiến tại Ukraine',
          description: 'Ngày 20/11, Nga đã cáo buộc Mỹ tìm cách kéo dài cuộc chiến ở Ukraine thông qua việc tăng cường cung cấp vũ khí cho Kiev trước thời điểm Tổng thống đắc Trump nhậm chức.',
          content: 'Nga đã cáo buộc Mỹ tìm cách kéo dài cuộc chiến ở Ukraine thông qua việc tăng cường cung cấp vũ khí cho Kiev trước thời điểm Tổng thống đắc Trump nhậm chức. Nga cũng cho rằng Mỹ đang cố gắng tạo ra một "thế lực đối lập" để có thể đối phó với Moskva trong bối cảnh xung đột với Ukraine.Tuy nhiên, ông Peskov cũng nhấn mạnh sự kém hiệu quả của chúng khi cho rằng loại vũ khí này có thời gian sử dụng không quá lâu vì sẽ giảm hiệu quả dần theo thời gian. Trước đó vào ngày 19/11, theo một nguồn tin trong nội bộ quan chức Mỹ, nước này sẽ sớm cung cấp cho Ukraine các loại mìn chống bộ binh để củng cố khả năng phòng thủ trước sức tấn công của phía Nga. Đây là bước đi tiếp theo của chính quyền Tổng thống Biden trong một nỗ lực tiếp tục tăng cường cung cấp khí tài quân sự cho Ukraine, nhất là sau khi ông Trump giành chiến thắng trong cuộc bầu cử vừa qua. Trong chiến dịch tranh cử, ông Trump nhiều lần chỉ trích sự ủng hộ của Mỹ đối với Ukraine và tuyên bố ông có thể đảm bảo lệnh ngừng bắn trong vòng vài giờ sau khi chính thức nhậm chức tổng thống Mỹ. Điều này đã khiến chính quyền Biden gia tăng các gói viện trợ vũ khí cho phía Ukraine. Trong khi đó với chính quyền Ukraine, trong bài trả lời phỏng vấn của hãng Fox News, Tổng thống Zelensky cho biết nước này “sẽ thua” trong cuộc chiến với Liên bang Nga nếu Mỹ cắt viện trợ quân sự. Ông nói: “Nếu họ cắt viện trợ, tôi nghĩ chúng tôi sẽ thua… Chúng tôi sẽ chiến đấu. Chúng tôi có khả năng sản xuất, nhưng không đủ để giành chiến thắng. Và tôi nghĩ, điều đó cũng không đủ để sống sót”. Trước đó với động thái “bật đèn xanh” của Mỹ, phía Ukraine được cho là đã sử dụng tên lửa tầm xa ATACMS để tấn công vào lãnh thổ Nga. Theo tờ Kyiv Post ngày 20/11, nhiều hãng truyền thông Mỹ dẫn nguồn tin ẩn danh cho biết các quan chức Mỹ xác nhận Ukraine đã sử dụng tên lửa chiến thuật lục quân (ATACMS) tầm xa do Mỹ cung cấp để tấn công các mục tiêu trong lãnh thổ Liên bang Nga vào ngày 19/11.',
          imageUrl: 'https://cdnmedia.baotintuc.vn/Upload/QyT9wJmU1noXJSi1NqCRyg/files/2024/11/2011-my-nga.jpeg',
          date: '2024-03-20',
          author: 'Trần Văn Dũng',
          views: 23453,
          comments: 6744,
          category: 'Thế giới'
        },
        {
          id: 3,
          categoryId: 3,
          title: 'Vinhomes và VinFast là Thương hiệu – sản phẩm Quốc gia Việt Nam',
          description: 'Mới đây, Vinhomes và VinFast thuộc Tập đoàn Vingroup đã được vinh danh là thương hiệu – sản phẩm quốc gia Việt Nam trong lĩnh vực phát triển bất động sản và sản xuất ô tô - xe máy điện.',
          content: 'Đây là sự ghi nhận ý nghĩa, khẳng định năng lực và tầm ảnh hưởng của VinFast, Vinhomes trong hành trình thúc đẩy kiến tạo tương lai xanh, nâng cao chất lượng cuộc sống, góp phần gia tăng uy tín và giá trị thương hiệu quốc gia trên trường quốc tế. Chương trình Thương hiệu Quốc gia Việt Nam do Thủ tướng Chính phủ phê duyệt nhằm tôn vinh những thương hiệu sản phẩm và doanh nghiệp tiêu biểu, xứng tầm đại diện cho nền sản xuất và dịch vụ chất lượng cao, có năng lực cạnh tranh mạnh mẽ của Việt Nam trên trường quốc tế. Chủ đề năm 2024 của chương trình Thương hiệu Quốc gia là “Vươn mình tiến vào kỷ nguyên xanh” với thông điệp rõ nét về sự phát triển phải hướng tới bền vững và thân thiện với môi trường. Trong đó, Vinhomes và VinFast đã được ghi nhận là thương hiệu và sản phẩm tiêu biểu nhất trong lĩnh vực tham gia có đóng góp tích cực cho quá trình di chuyển xanh và chuyển đổi xanh lan tỏa mạnh mẽ, hướng tới mục tiêu Net Zero vào năm 2050. Để được vinh danh, chuỗi sản phẩm – dịch vụ của VinFast và Vinhomes phải vượt qua kỳ xét chọn bởi các chuyên gia uy tín từ các tổ chức tài chính, xếp hạng độc lập, cùng đại diện các Bộ, Ban, Ngành trung ương, dựa trên bộ tiêu chí đánh giá toàn diện, minh bạch của cơ quan Nhà nước.',
          imageUrl: 'https://cdnthumb.baotintuc.vn/ha_w/600/https@@$$media.baotintuc.vn/Upload/XjfgEPYM30O8z6jY3MHxSw/files/2024/11/0611/A1.jpg',
          date: '2024-03-20',
          author: 'Trần Văn Dũng',
          views: 5312,
          comments: 611,
          category: 'Kinh doanh'
        },
        {
          id: 3,
          categoryId: 4,
          title: 'Màn khởi đầu không thật sự bùng nổ của mùa lễ hội cuối năm',
          description: 'Mùa điện ảnh lễ hội năm nay bắt đầu với màn ra mắt của “Red One” - bộ phim hành động hài mới nhất từ Amazon và MGM.',
          content: 'Với sự góp mặt của hai ngôi sao lớn là Dwayne “The Rock” Johnson và Chris Evans, tác phẩm đã dẫn đầu doanh thu phòng vé Bắc Mỹ cuối tuần qua, thu về 34,1 triệu USD. Tuy nhiên, so với kinh phí khổng lồ 250 triệu USD, đây không phải con số đủ để đảm bảo lợi nhuận. Trong phim, Dwayne Johnson hóa thân thành vệ sĩ của ông già Noel, cùng với một hacker (Chris Evans) dấn thân vào cuộc truy tìm ông già Noel bị bắt cóc vào đêm Giáng sinh. Dù có cốt truyện hài hước và dàn sao sáng giá, nhưng bộ phim vẫn gặp khó khăn trong việc chinh phục giới phê bình, chỉ đạt 33% số đánh giá tích cực trên chuyên trang tổng hợp ý kiến Rotten Tomatoes. Ở chiều ngược lại, khán giả lại tỏ ra thích thú với “Red One” và chấm điểm A- cho bộ phim này trên CinemaScore. “Red One” được kỳ vọng mở màn cho một chuỗi series hành động hài mùa Giáng sinh, nhưng doanh thu hiện tại vẫn bị coi là "mềm" so với mục tiêu. Ở thị trường quốc tế, bộ phim đã thu về 50 triệu USD sau hai tuần phát hành tại 75 quốc gia và vùng lãnh thổ, nâng tổng doanh thu toàn cầu lên mức 84,1 triệu USD. Chuyên gia David A. Gross của công ty Franchise Entertainment Research nhận định: “Đây không phải là một thất bại, nhưng cũng chưa đủ để đánh giá là thành công”. Mặc dù vậy, “Red One” vốn được phát triển để phát hành trực tiếp trên nền tảng trực tuyến Amazon Prime Video. Do đó, êkíp làm phim vẫn hy vọng có thể tạo sức hút dài hạn trên nền tảng kỹ thuật số với hơn 250 triệu người dùng toàn cầu. Các tác phẩm khác tại phòng vé cuối tuần qua ở Bắc Mỹ cũng ghi nhận những kết quả khả quan. Bộ phim hành động - kinh dị “Venom: The Last Dance” của Sony đứng thứ hai với 7,4 triệu USD, nâng tổng doanh thu toàn cầu lên 436,1 triệu USD. Đứng thứ ba là “The Best Christmas Pageant Ever” của Lionsgate với 5,4 triệu USD - một thành công lớn so với kinh phí khiêm tốn 10 triệu USD.',
          imageUrl: 'https://cdnthumb.baotintuc.vn/ha_w/600/https@@$$media.baotintuc.vn/Upload/3qVxwVtNEPp6Wp9kkF77g/files/2024/11/18/red-one-a.jpg',
          date: '2024-03-20',
          author: 'Trần Văn Dũng',
          views: 9453,
          comments: 3744,
          category: 'Giải trí'
        }
      ]
    };
  },
  computed: {
    currentCategory() {
      return this.categories.find(cat => cat.id === this.selectedCategoryId) || null;
    },
    categoryNews() {
      return this.news.filter(item => item.categoryId === this.selectedCategoryId) || [];
    },
    todayNews() {
      const today = new Date().toISOString().split('T')[0];
      return this.categoryNews.filter(item => item.date === today).length;
    },
    filteredNews() {
      if (!this.categoryNews) return [];
      
      let filtered = [...this.categoryNews];
      const today = new Date();

      // Lọc theo thời gian
      if (this.timeFilter !== 'all') {
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

        filtered = filtered.filter(item => {
          const newsDate = new Date(item.date);
          switch (this.timeFilter) {
            case 'today':
              return newsDate.toDateString() === today.toDateString();
            case 'week':
              return newsDate >= weekAgo;
            case 'month':
              return newsDate >= monthAgo;
            default:
              return true;
          }
        });
      }

      // Sắp xếp
      filtered.sort((a, b) => {
        if (this.sortBy === 'newest') {
          return new Date(b.date) - new Date(a.date);
        }
        return b.views - a.views;
      });

      return filtered;
    },
    totalPages() {
      return Math.ceil((this.filteredNews?.length || 0) / this.itemsPerPage);
    },
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredNews.slice(start, end);
    }
  },
  methods: {
    selectCategory(categoryId) {
      this.selectedCategoryId = categoryId;
      this.currentPage = 1;
    },
    formatDate(date) {
      return format(new Date(date), 'dd MMMM yyyy', { locale: vi });
    },
    showNewsDetail(news) {
      this.selectedNews = news;
    }
  },
  created() {
    // Lấy category ID từ route nếu có
    const categoryId = parseInt(this.$route.params.id);
    if (categoryId && this.categories.some(cat => cat.id === categoryId)) {
      this.selectedCategoryId = categoryId;
    }
  }
};
</script>

<style scoped>
.category-page {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Category Header */
.category-header {
  padding: 40px 0;
  margin-bottom: 30px;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.category-info i {
  font-size: 2.5em;
}

.category-info h1 {
  margin: 0;
  font-size: 2em;
}

.category-stats {
  display: flex;
  gap: 30px;
  margin-top: 20px;
}

.stat-item {
  text-align: center;
}

.stat-item .number {
  font-size: 1.5em;
  font-weight: bold;
  display: block;
}

/* Category Navigation */
.category-nav {
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 30px;
}

.nav-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.categories-list {
  display: flex;
  gap: 20px;
}

.categories-list a {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.categories-list a:hover {
  background-color: var(--hover-color);
  color: white;
}

.categories-list a.active {
  background-color: var(--hover-color);
  color: white;
}

/* Content Layout */
.content-wrapper {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 30px;
}

/* Filters */
.filters {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.filter-section {
  margin-bottom: 20px;
}

.filter-section h3 {
  margin-bottom: 10px;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* News Grid */
.news-container.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.news-container.list .news-item {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.news-item {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.news-item:hover {
  transform: translateY(-5px);
}

.news-image {
  position: relative;
}

.news-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.category-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  border-radius: 4px;
  color: white;
  font-size: 0.8em;
}

.news-content {
  padding: 15px;
}

.news-content h3 {
  margin: 0 0 10px 0;
}

.news-meta {
  display: flex;
  gap: 15px;
  color: #666;
  font-size: 0.9em;
  margin-top: 10px;
}

/* Modal */
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
}

.modal-content {
  background: white;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: 8px;
  position: relative;
}

.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.modal-body {
  padding: 20px;
}

.modal-body img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
}

.modal-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
}

.share-buttons {
  display: flex;
  gap: 10px;
}

.share-buttons button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #f8f9fa;
  cursor: pointer;
  transition: background 0.3s ease;
}

.share-buttons button:hover {
  background: #e9ecef;
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
  padding: 20px 0;
}

.pagination button {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination button.active {
  background: var(--hover-color);
  color: white;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }

  .news-container.list .news-item {
    grid-template-columns: 1fr;
  }

  .categories-list {
    overflow-x: auto;
    padding-bottom: 10px;
  }
}
</style>