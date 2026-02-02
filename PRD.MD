# 📄 Product Requirements Document (PRD)

## 1. Ürün Tanımı

**Ürün Adı:** OrderSphere
**Ürün Türü:** Çok Kanallı Sipariş, Üretim ve Operasyon Yönetim Platformu
**Hedef Kullanıcılar:**

* E-ticaret satıcıları
* Üreticiler / tedarikçiler
* Operasyon yöneticileri
* Teknik entegrasyon ekipleri

OrderSphere; farklı e-ticaret kanallarından gelen siparişleri tek bir merkezde toplayan, bu siparişleri üretim ve operasyon süreçlerine akıllı şekilde yönlendiren, durum takibi ve analiz imkânı sunan modüler bir yazılım platformudur.

---

## 2. Problem Tanımı

Küçük ve orta ölçekli e-ticaret operasyonlarında aşağıdaki problemler yaygındır:

* Siparişler farklı platformlardan gelir ve standart bir formata sahip değildir
* Üretim, kargo ve operasyon süreçleri manuel takip edilir
* Sipariş durumları senkronize değildir
* Gecikmeler ve darboğazlar ölçülemez
* Entegrasyonlar kırılgandır ve hata takibi zayıftır

OrderSphere, bu problemleri tek bir operasyonel çatı altında çözmeyi hedefler.

---

## 3. Hedefler

* Çok kanallı sipariş entegrasyonu sağlamak
* Siparişleri otomatik ve kurallı şekilde yönlendirmek
* Operasyonel görünürlük ve kontrol sağlamak
* Backend ağırlıklı, ölçeklenebilir bir mimari kurmak
* Junior–mid seviye geliştiriciler için gerçek dünya senaryosu sunmak

---

## 4. Başarı Kriterleri (KPIs)

* Entegrasyon başına başarılı sipariş işleme oranı > %99
* Sipariş yaşam döngüsünün eksiksiz izlenebilmesi
* Ortalama API response süresi < 300ms
* Webhook hata oranı < %1

---

## 5. Kapsam Dışı

* Gerçek ödeme sistemleri entegrasyonu
* Gerçek kargo firmalarıyla canlı entegrasyon
* Mobil uygulama

---

## 6. Kullanıcı Rolleri

### 6.1 Satıcı

* Siparişleri görüntüler
* Sipariş durumlarını takip eder
* Entegrasyon ayarlarını yönetir

### 6.2 Üretici

* Atanan siparişleri görür
* Üretim durumunu günceller

### 6.3 Operasyon Yöneticisi

* Tüm sipariş akışını izler
* Gecikmeleri ve performansı analiz eder

---

## 7. Temel Özellikler

### 7.1 Kimlik Doğrulama ve Yetkilendirme

* JWT tabanlı authentication
* Rol bazlı authorization (RBAC)
* Token refresh mekanizması

---

### 7.2 Entegrasyon Motoru

**Amaç:** Farklı e-ticaret kaynaklarından gelen siparişleri normalize etmek

* REST API ile manuel sipariş alımı
* Webhook tabanlı sipariş alımı
* Adapter pattern ile kaynak bazlı parser

---

### 7.3 Sipariş Yönetimi

* Sipariş oluşturma
* Sipariş detayları
* Durum bazlı sipariş takibi

Durumlar:

* CREATED
* VALIDATED
* IN_PRODUCTION
* READY_FOR_SHIPMENT
* SHIPPED
* DELIVERED

---

### 7.4 Akıllı Sipariş Yönlendirme

* Kural tabanlı yönlendirme
* Üretici kapasitesine göre atama
* Ürün tipine göre yönlendirme

---

### 7.5 Operasyonel Analitik

* Ortalama üretim süresi
* Geciken sipariş sayısı
* Üretici bazlı performans

---

### 7.6 Hata ve Performans İzleme

* Başarısız webhook loglama
* Retry mekanizması
* API response time ölçümü

---

## 8. Frontend Gereksinimleri

* Next.js ile SSR destekli yapı
* Tailwind CSS ile responsive tasarım
* Dashboard ekranı
* Sipariş liste ve detay sayfaları

---

## 9. Backend Gereksinimleri

* NestJS framework
* Modüler mimari
* DTO & ValidationPipe
* Exception handling

---

## 10. Veritabanı Tasarımı

* PostgreSQL
* Prisma ORM
* İlişkisel veri modeli
* Enum bazlı state yönetimi

---

## 11. API Tasarımı

* RESTful endpointler
* Versiyonlama (/api/v1)
* Swagger dokümantasyonu

---

## 12. Güvenlik Gereksinimleri

* Input validation
* Rate limiting
* Rol bazlı erişim kontrolü

---

## 13. Docker & Deployment

* Dockerfile (backend & frontend)
* Docker Compose
* Ortam değişkenleri yönetimi

---

## 14. Test Stratejisi

* Unit testler
* Service bazlı testler
* State transition testleri

---

## 15. Logging & Monitoring

* Request/response logları
* Error logları
* Operasyonel loglar

---

## 16. Ölçeklenebilirlik

* Modüler servis yapısı
* Entegrasyon bazlı genişleme
* Yeni üretici ve kanal ekleme kolaylığı

---

## 17. Teknik Borç Yönetimi

* Kod standartları
* Refactor planları
* Dokümantasyon disiplini

---

## 18. Riskler

* Entegrasyon payload farklılıkları
* Webhook güvenliği
* Veri tutarlılığı

---

## 19. Gelecek Geliştirmeler

* AI tabanlı sipariş yönlendirme
* Gerçek zamanlı bildirimler
* KPI dashboard genişletme

---

## 20. Sonuç

OrderSphere, modern backend ve frontend teknolojilerini bir araya getirerek gerçek dünya e-ticaret operasyon problemlerini çözen, ölçeklenebilir ve genişletilebilir bir platform sunar. Proje; TypeScript, NestJS, Next.js, PostgreSQL, Prisma ve Docker gibi teknolojileri uçtan uca kullanarak geliştiricinin üretim seviyesinde deneyim kazanmasını hedefler.

---

## 21. Kullanılacak Teknolojiler
TypeScript, NestJS framework, Next.js, React, Tailwind CSS, PostgreSQL, PrismaOSM, RESTful API, Docker, Docker Compose gibi konteyner teknolojileri, Git, Github
## 22. Özellikler/Gereksinimler
Backend servislerinde yeni özelliklerin geliştirilmesi, Kullanıcı deneyimini iyileştirecek panel geliştirmelerinin yapılması, E-ticaret platformlarının API ve Webhook entegrasyon süreçlerinde görev alınması, Kod kalitesinin korunması ve test süreçlerine katkı sağlanması, Sistemdeki hataların tespiti ve performans iyileştirmeleri için çözüm üretilmesi.
