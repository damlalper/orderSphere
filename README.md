# 🚀 OrderSphere

**OrderSphere**, çok kanallı e-ticaret operasyonlarını, üretim süreçlerini ve sevkiyat yönetimini tek bir platformda birleştiren modern bir **Sipariş Yönetim Sistemi (OMS)** çözümüdür.

![Dashboard Preview](https://via.placeholder.com/1200x600?text=OrderSphere+Dashboard)

## 🌟 Öne Çıkan Özellikler

OrderSphere, sadece siparişleri listelemekle kalmaz, onları akıllıca yönetir:

-   **🧠 Akıllı Sipariş Yönlendirme (Smart Routing):** Gelen siparişleri, üreticilerin doluluk oranına ve kapasitesine göre otomatik olarak en uygun üreticiye atar.
-   **🔄 Entegrasyon Motoru (Integration Engine):** Shopify, WooCommerce ve özel API'lardan gelen siparişleri `Adapter Pattern` ile normalize eder.
-   **🛡️ Operasyonel State Machine:** Siparişlerin hatalı durum geçişlerini (örn: `Created` -> `Delivered`) engelleyen, loglayan ve yöneten katı validasyon mekanizması.
-   **📊 Gerçek Zamanlı Analitik:** Gelir tabloları, bekleyen siparişler ve üretim süreleri gibi kritik KPI'ları anlık sunar.
-   **📝 Webhook Logging:** Başarısız entegrasyon isteklerini veritabanında saklayarak hata ayıklamayı kolaylaştırır.
-   **🎨 Premium UI/UX:** Next.js 14, Tailwind CSS ve Recharts ile geliştirilmiş, kullanıcı dostu ve responsive arayüz.

## 🛠️ Teknoloji Yığını

Proje, endüstri standardı modern teknolojilerle geliştirilmiştir:

### Backend
-   **Framework:** [NestJS](https://nestjs.com/) (Modular Architecture)
-   **Dil:** TypeScript
-   **Veritabanı:** PostgreSQL
-   **ORM:** [Prisma](https://www.prisma.io/)
-   **Auth:** JWT & Passport.js
-   **API:** RESTful

### Frontend
-   **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
-   **Styling:** Tailwind CSS, `clsx`, `cva`
-   **Charts:** Recharts
-   **Icons:** Lucide React

### DevOps & Infrastructure
-   **Containerization:** Docker & Docker Compose
-   **Database Admin:** Adminer

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin.

### Gereksinimler
-   Node.js (v18+)
-   Docker Desktop

### 1. Projeyi Klonlayın
```bash
git clone https://github.com/damlalper/orderSphere.git
cd orderSphere
```

### 2. Altyapıyı Başlatın (PostgreSQL & Adminer)
Veritabanını Docker üzerinde ayağa kaldırın:
```bash
docker-compose up -d
```
*Port 5433 (PostgreSQL) ve 8080 (Adminer) kullanılacaktır.*

### 3. Backend Kurulumu
Yeni bir terminal açın ve backend bağımlılıklarını yükleyin, veritabanını oluşturun:
```bash
cd backend
npm install
npx prisma migrate dev  # Veritabanı tablolarını oluşturur
npm run start:dev       # Sunucuyu başlatır (Port: 3001)
```

### 4. Frontend Kurulumu
Ayrı bir terminalde frontend'i başlatın:
```bash
cd frontend
npm install
npm run dev             # Arayüzü başlatır (Port: 3000)
```

### 5. İlk Kullanım (Admin Girişi)
Sisteme giriş yapmak için hazır bir kullanıcı oluşturun:
```bash
# Ana dizinde (orderSphere/)
node seed.js
```
Konsolda verilen **Email** ve **Şifre** ile `http://localhost:3000` adresinden giriş yapabilirsiniz.

## 📂 Proje Yapısı

```
orderSphere/
├── backend/                # NestJS API
│   ├── src/
│   │   ├── auth/           # Kimlik doğrulama
│   │   ├── orders/         # Sipariş yönetimi & Routing logic
│   │   ├── integrations/   # Webhook adaptörleri & Loglama
│   │   └── prisma/         # DB Bağlantısı
│   └── prisma/schema.prisma # Veritabanı şeması
├── frontend/               # Next.js Arayüzü
│   ├── app/                # Sayfalar (Dashboard, Orders, Settings)
│   ├── components/         # Reusable UI Bileşenleri (Badge, Card...)
│   └── lib/                # API ve Yardımcı Fonksiyonlar
├── docker-compose.yml      # Docker konfigürasyonu
└── verify.js               # Sistem test scripti
```

## 🧪 Test ve Doğrulama

Sistemin çalışırlığını test etmek için kök dizindeki scripti kullanabilirsiniz:
```bash
node verify.js
```
Bu script:
1.  Kullanıcı kaydı yapar.
2.  Sipariş oluşturur.
3.  Hatalı statü geçişlerini dener (Validation kontrolü).
4.  Webhook loglamayı test eder.

---

**Geliştirici:** Damla Alper