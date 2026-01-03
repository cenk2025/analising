# 📊 FinanceIQ - Premium Financial Dashboard

Modern, güvenli ve kullanıcı dostu bir finansal analiz platformu. Next.js 15, TypeScript, Supabase ve Recharts kullanılarak geliştirilmiştir.

## ✨ Özellikler

### 🔐 Güvenlik
- **Supabase Authentication**: Güvenli kullanıcı kimlik doğrulama
- **Protected Routes**: Middleware ile korunan dashboard sayfaları
- **Session Management**: Otomatik oturum yönetimi
- **Secure Logout**: Güvenli çıkış işlemi

### 📈 Dashboard Özellikleri
1. **Genel Bakış**
   - Toplam Gelir, EBITDA, Net Kar, EPS metrikleri
   - 5 yıllık gelir trendi grafiği
   - EBITDA gelişim grafiği
   - Yönetici özeti

2. **Finansal Metrikler**
   - ROCE (Return on Capital Employed)
   - Borç/Özkaynak oranı
   - Net Kar (PAT) trend grafiği
   - Hisse Başı Kazanç (EPS) trend grafiği

3. **Segment Analizi**
   - İş birimi bazlı performans
   - Gelir, büyüme oranı ve kar marjı metrikleri
   - Consulting Services, Cloud Infrastructure, Data Analytics segmentleri

4. **AI İçgörüler**
   - Stratejik odak alanları
   - Risk analizi
   - Fırsat değerlendirmesi
   - Dijital dönüşüm önerileri

### 🎨 Tasarım
- **Premium Dark Theme**: Modern ve profesyonel koyu tema
- **Responsive Design**: Tüm cihazlarda mükemmel görünüm
- **Smooth Animations**: Akıcı geçişler ve animasyonlar
- **Glassmorphism Effects**: Modern cam efektleri
- **Gradient Accents**: Canlı renk geçişleri
- **Interactive Charts**: Recharts ile etkileşimli grafikler

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Bağımlılıkları yükleyin:**
```bash
npm install
```

2. **Supabase Yapılandırması:**
   - Proje zaten yapılandırılmış durumda
   - Credentials: `lib/supabase.ts` dosyasında

3. **Geliştirme sunucusunu başlatın:**
```bash
npm run dev
```

4. **Tarayıcıda açın:**
   - URL: http://localhost:3000
   - Otomatik olarak login sayfasına yönlendirileceksiniz

## 👤 Test Kullanıcısı

```
Email: test@financeiq.com
Password: test123
```

## 📁 Proje Yapısı

```
financial-dashboard/
├── app/
│   ├── login/              # Login sayfası
│   ├── dashboard/          # Dashboard sayfası (protected)
│   ├── globals.css         # Global stiller
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Ana sayfa (redirect)
├── components/
│   ├── Sidebar.tsx         # Navigasyon sidebar
│   ├── Overview.tsx        # Genel bakış sekmesi
│   ├── Metrics.tsx         # Finansal metrikler sekmesi
│   ├── Segments.tsx        # Segment analizi sekmesi
│   └── AIInsights.tsx      # AI içgörüler sekmesi
├── lib/
│   └── supabase.ts         # Supabase client
├── middleware.ts           # Route protection
└── README.md
```

## 🛠️ Teknolojiler

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Charts**: Recharts
- **Styling**: CSS Modules + Global CSS
- **Icons**: Lucide React

## 🔒 Güvenlik Özellikleri

1. **Middleware Protection**: Dashboard sayfaları middleware ile korunur
2. **Session Validation**: Her istekte session kontrolü
3. **Automatic Redirect**: Yetkisiz erişimlerde otomatik yönlendirme
4. **Secure Logout**: Tam session temizleme

## 📊 Dashboard Metrikleri

### Finansal Veriler
- **Toplam Gelir**: $85.0M
- **EBITDA**: $24.0M
- **Net Kar**: $16.2M (+20%)
- **EPS**: $8.10 (+20%)
- **ROCE**: 26.3%
- **Borç/Özkaynak**: 0.22

### Segment Performansı
1. **Consulting Services**: $35M gelir, %18 büyüme, %28 kar marjı
2. **Cloud Infrastructure**: $30M gelir, %25 büyüme, %32 kar marjı
3. **Data Analytics**: $20M gelir, %15 büyüme, %24 kar marjı

## 🎯 Kullanım

1. **Login**: Test kullanıcısı ile giriş yapın
2. **Dashboard**: Otomatik olarak genel bakış sekmesine yönlendirilirsiniz
3. **Navigasyon**: Sol sidebar'dan farklı sekmelere geçiş yapın
4. **Logout**: Sidebar'ın altındaki "Çıkış Yap" butonuna tıklayın

## 🧪 Test Edildi

✅ Login işlevi
✅ Dashboard erişimi
✅ Tüm sekmeler (4/4)
✅ Grafik görselleştirmeleri
✅ Logout işlevi
✅ Route protection
✅ Responsive tasarım

## 📝 Notlar

- Dashboard verileri statik mock data kullanır
- Gerçek bir üretim ortamında, bu veriler bir API'den çekilmelidir
- Supabase credentials production'da environment variables olarak saklanmalıdır

## 🚀 Production Deployment

1. **Environment Variables Oluşturun:**
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

2. **Build:**
```bash
npm run build
```

3. **Start:**
```bash
npm start
```

## 📄 Lisans

Bu proje demo amaçlı oluşturulmuştur.

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

**Geliştirici**: AI-Powered Development
**Versiyon**: 1.0.0
**Son Güncelleme**: 3 Ocak 2025
