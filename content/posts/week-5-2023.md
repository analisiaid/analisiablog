---
title: Migrasi ke GA4 ⌛
slug: week-5-2023
date: "2023-02-05T22:00:56Z"
draft: false
readingTime: true
toc: true
author: analisia id
---

Good Morning\!

Don't forget to sip your coffee before we dive into weekly marketing recap 🧵 

* * *

### Jangan Lupa Pindah ke Google Analytics 4 Sebelum Bulan Maret ⌛

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-12.png)

Buat yang belum tau nih, Google Analytics 3 \(_a.k.a.[Universal Analytics](<https://support.google.com/analytics/answer/2790010?hl=en>)_\) akan ditutup oleh Google di tanggal 1 Juli 2023. Maka dari itu, Google minta kita untuk segera migrasi ke versi terbaru yaitu [Google Analytics 4](<https://support.google.com/analytics/answer/10089681?hl=en>) \(re: GA4\) sebelum bulan Maret 2023, atau Google Analytics akan melakukan migrasi secara sepihak untuk kita 👀

**Nih _Pro Tips_ Ketika Migrasi ke GA4**

  1. Karena di versi baru tidak ada fitur _views,_**buat 2 property** GA4. 1 untuk _production site_ \(customers\), dan 1 untuk _staging site_\(developers\).
  2. Ubah [_data_ _retention_](<https://support.google.com/analytics/answer/7667196?hl=en>) dari 2 bulan ke **14 bulan**.
  3. Jangan lupa sambungkan ke **Google Ads, Google Search Console** , & **BigQuery**.
  4. Aktifkan fitur **Google Signal** untuk melihat user insight \(_i.e. demographic report_\).
  5. Aktifkan fitur _[Enhanced Measurement](<https://support.google.com/analytics/answer/9216061?hl=en>)_ untuk mendapatkan data yang lebih banyak.
  6. Ikuti panduan baru untuk _[UTM Parameters](<https://support.google.com/analytics/answer/9756891?hl=en>)_ khusus GA4 .
  7. Kalau punya _internal sites_ , jangan lupa daftarkan ke _[Referral Exclusion](<https://support.google.com/analytics/answer/10327750?hl=en>)_.



* * *

### Jumlah podcast baru turun -80% di tahun 2022 🎙️

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image.png)source: [listennotes](<https://www.listennotes.com/podcast-stats/#growth>)

Saat pandemi 2 tahun terakhir, terpantau banyak podcast baru bermunculan. Namun ada yang berbeda di tahun lalu, tidak hanya jumlah podcasts yang turun, jumlah _new episode_ juga mengalami penurunan sebanyak -12%.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-1.png)

Sementara itu, Indonesia masih duduk di posisi ke-4 untuk jumlah Podcasts terbanyak.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-2.png)

Kamu masih suka dengerin Podcast? Saya sih masih yaa, _at least_ 1x seminggu.

* * *

### Di Mana Tempat "Nongkrong" Favorit Gen-Z?

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-3.png)source: [morning consult](<https://morningconsult.com/2022/12/12/gen-z-social-media-usage/>)

Yes, **Youtube**\!

Gen Z yang jadi lebih sering masuk target marketers \(ya katanya bakal jadi the next consumers\). 88% Gen Z \(di US\) menghabiskan waktunya di platfrom YouTube, 76% menghabiskan waktu di Instagram, kemudian TikTok sebanyak 68%.

Menariknya, >50% Gen-Z menghabiskan =>4 jam per hari di media sosial.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-4.png)source: [morning consult](<https://morningconsult.com/2022/12/12/gen-z-social-media-usage/>)

* * *

### Berapa Banyak Bot Yang Masuk ke Google Analytics Kamu? Banyak Loh\!

Dari salah satu sesi di event [SUPERWEEK 2023](<https://superweek.hu/>) minggu lalu, ada _insight_ menarik di mana hampir 30% dari kunjungan website terdeteksi berasal dari robot \(a.k.a Bot\) 😱

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-5.png)source: [James](<https://mobile.twitter.com/JayCohh/status/1620754383813369858>)

Parahnya lagi, kunjungan dari Bot ini naik sebanyak +40% dalam 6 tahun terakhir. 😰

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-6.png)

**TL;DR** penting banget buat pakai Bot Management Tools Clouldflare, Akamai, dan lain sebagainya. 

As someone has said, "Bad data leads to bad decision". Setuju?

* * *

### Keep an eye on your Google Display Network campaign

Google akan mengurangi kontrol targeting di _display ad_ yang berjalan di [Display Network](<https://support.google.com/google-ads/answer/2404190?hl=en-GB>).

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-10.png)source: [LinkedIn](<https://www.linkedin.com/feed/update/urn:li:activity:7027010526643712001/>)

**Before:** iklan akan ditampilkan ketika SEMUA targeting \(_keyword, placement, topic\)_ terpenuhi.

**After:** iklan akan ditampilkan ketika SALAH SATU targeting \(_keyword, placement, topic_\) terpenuhi.

[Google](<https://support.google.com/google-ads/answer/1704368?utm_source=awfe&amp;utm_medium=email&amp;utm_campaign=20239302>) explains:

> "... to help you reach more potential customers, your ads will now show on content that matches any of the topics, placements, or display and video keywords you target. For example, an ad targeting a topic and a placement will be eligible for impressions which match either."

* * *

### Instagram Melakukan Uji Coba Fitur _Lead Form_ di Akun Bisnis

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-7.png)source: [SocialMediaToday](<https://www.socialmediatoday.com/news/Instagram-Adds-Lead-Forms-on-Business-Profiles/641387/>)

Instagram terpantau sedang menguji coba \(re: Beta\) fitur _Lead Form_ sebagai CTA \(_Call to Action_\) di profil bisnis/kreator. Melalui fitur ini, bisnis/kreator bisa mendapatkan _insight_ dari followers seperti nama, nomor telepon, email, alamat, serta informasi tambahan dari _Questionnaire_ / daftar pertanyaan yang kita buat.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-8.png)source: [SocialMediaToday](<https://www.socialmediatoday.com/news/Instagram-Adds-Lead-Forms-on-Business-Profiles/641387/>)

* * *

### ’Artifact’, Sosial Media Baru Milik Pendiri Instagram

Pendiri Instagram Kevin Systrom dan Mike Krieger meluncurkan aplikasi sosial baru, di mana fokus awalnya akan lebih pada konten secara khusus, bukan pada elemen sosial. 

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-11.png)source: [SocialMediaToday](<https://www.socialmediatoday.com/news/Instagram-Founders-Launch-New-Social-App/641660/>)

Jika tertarik untuk mencoba, kamu bisa antri mendaftar [di sini](<https://artifact.news/>).

* * *

### Belanja di Snapchat Pakai Fitur Augmented Reality 😳

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/ezgif-4-66fd72384b.gif)source: [BuzzFeed](<https://www.buzzfeednews.com/article/stefficao/snapchat-ar-shopping-feature>)
