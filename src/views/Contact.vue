<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <div class="section-connect-office">
    <div class="container">
      <h2 class="title-section">Kết nối với Nhân Hoà</h2>
      
      <!-- Grid hiển thị các văn phòng -->
      <div class="offices-grid">
        <div v-for="office in offices" 
             :key="office.id" 
             class="office-card"
             @click="showOfficeDetail(office)">
          <div class="office-preview">
            <div class="office-icon">
              <i class="fas fa-building"></i>
            </div>
            <h3>{{ office.name }}</h3>
            <p class="address-preview">{{ office.address }}</p>
            <button class="view-details">Xem chi tiết</button>
          </div>
        </div>
      </div>

      <!-- Modal chi tiết văn phòng -->
      <div v-if="selectedOffice" class="office-modal" @click.self="selectedOffice = null">
        <div class="modal-content">
          <div class="modal-header">
            <h2>{{ selectedOffice.name }}</h2>
            <button class="close-btn" @click="selectedOffice = null">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="modal-body">
            <div class="office-info">
              <div class="info-item">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Địa chỉ</h4>
                  <p>{{ selectedOffice.address }}</p>
                </div>
              </div>
              
              <div class="info-item">
                <i class="fas fa-phone-alt"></i>
                <div>
                  <h4>Điện thoại</h4>
                  <p>{{ selectedOffice.phone }}</p>
                </div>
              </div>
              
              <div class="info-item">
                <i class="fas fa-envelope"></i>
                <div>
                  <h4>Email</h4>
                  <p>{{ selectedOffice.email }}</p>
                </div>
              </div>
              
              <div class="info-item">
                <i class="fas fa-headset"></i>
                <div>
                  <h4>Hotline</h4>
                  <p>{{ selectedOffice.hotline }}</p>
                </div>
              </div>
            </div>

            <div class="office-map">
              <iframe
                :src="selectedOffice.mapUrl"
                width="100%"
                height="300"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OfficeContact',
  data() {
    return {
      selectedOffice: null,
      offices: [
        {
          id: 'ha_noi',
          name: 'Văn phòng Hà Nội',
          address: 'Tầng 4 - Toà nhà 97 - 99 Láng Hạ, Quận Đống Đa, Thành Phố Hà Nội',
          phone: '1900 6680 - (024) 7308 6680',
          email: 'sales@nhanhoa.com',
          hotline: '091 140 8966',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.4855345793837!2d105.80789661476343!3d21.016909093773244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab5c3c047f25%3A0x7b5a5a42fe985b91!2zOTcgTMOhbmcgSOG6oSwgTMOhbmcgSOG6oSwgxJDhu5FuZyDEkGEsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1647916428345!5m2!1svi!2s'
        },
        {
          id: 'hcm',
          name: 'Văn phòng TP. HCM',
          address: '927/1 CMT8, Phường 7, Quận Tân Bình, Thành phố Hồ Chí Minh',
          phone: '1900 6680 - (028) 7308 6680',
          email: 'hcmsales@nhanhoa.com',
          hotline: '091 140 8966',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2598386064633!2d106.65089731476345!3d10.786923792314444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752ed2392c44df%3A0xd2ecb62e0d050fe9!2zOTI3LzEgQ-G6p20gVGjDoG5oIDgsIFBoxrDhu51uZyA3LCBUw6JuIELDrG5oLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1647916538345!5m2!1svi!2s'
        },
        {
          id: 'vinh',
          name: 'Văn phòng Vinh',
          address: 'Tầng 2 Tòa nhà Sài Gòn Sky, ngõ 26 Nguyễn Thái Học, phường Đội Cung, TP. Vinh, Nghệ An',
          phone: '1900 6680 - (024) 7308 6680 - nhánh 6',
          email: 'contact@nhanhoa.com',
          hotline: '091 140 8966',
          mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3780.1098109644584!2d105.69058731476345!3d18.679012987325444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3139ce6f8a87d547%3A0x5d1e7c3a6a8c8f0a!2zMjYgTmd1eeG7hW4gVGjDoWkgSOG7jWMsIMSQ4buZaSBDdW5nLCBUaMOgbmggcGjhu5EgVmluaCwgTmdo4buHIEFuLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1647916638345!5m2!1svi!2s'
        }
      ]
    }
  },
  methods: {
    showOfficeDetail(office) {
      this.selectedOffice = office;
    }
  }
}
</script>

<style scoped>
.section-connect-office {
  padding: 80px 0;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.title-section {
  text-align: center;
  margin-bottom: 50px;
  color: #2d3436;
  font-size: 32px;
  font-weight: 700;
}

.offices-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.office-card {
  background: white;
  border-radius: 10px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.office-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

.office-icon {
  width: 60px;
  height: 60px;
  background: #007bff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.office-icon i {
  color: white;
  font-size: 24px;
}

.office-preview h3 {
  color: #2d3436;
  margin-bottom: 15px;
  font-size: 20px;
}

.address-preview {
  color: #636e72;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.view-details {
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.view-details:hover {
  background: #0056b3;
}

/* Modal Styles */
.office-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 10px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h2 {
  margin: 0;
  color: #2d3436;
}

.close-btn {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #636e72;
}

.modal-body {
  padding: 30px;
}

.office-info {
  margin-bottom: 30px;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.info-item i {
  width: 40px;
  height: 40px;
  background: #f8f9fa;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007bff;
  margin-right: 15px;
}

.info-item h4 {
  margin: 0 0 5px 0;
  color: #2d3436;
  font-size: 16px;
}

.info-item p {
  margin: 0;
  color: #636e72;
  line-height: 1.6;
}

.office-map {
  border-radius: 10px;
  overflow: hidden;
}

/* Responsive Design */
@media (max-width: 768px) {
  .section-connect-office {
    padding: 40px 0;
  }

  .title-section {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .offices-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    width: 95%;
  }
}
</style>