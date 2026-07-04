---
title: "Did Apple Remove UTM? 🥷"
slug: did-apple-remove-utm
date: "2023-06-11T22:30:59Z"
draft: false
readingTime: true
toc: true
author: analisia id
---

_Good morning\!_

_We hope you had a restful weekend. Wishing you a fantastic Monday ahead and a productive week._

_In this newsletter, we are going to cover the following:_

  1. _**New Apple's Link Tracking Protection \(LTP\)**_
  2. _**\[New Study\] Nearly 90% of Consumers No Longer Trust Influencers**_
  3.  _**Creative Is The New Targeting**_
  4.  _**New Dimensions & Metrics in GA4 Audience Builder**_
  5.  _**Updated Google Ads Trademarks Policy**_



* * *

### 1️⃣ Apple's Link Tracking Protection \(LTP\)

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/06/image-2.png)Link Tracking Protection \(LTP\)

Minggu lalu Apple sukses menggelar event tahunan mereka, [World Wide Developer’s Conference \(WWDC\)](<https://developer.apple.com/wwdc23/>). WWDC digunakan oleh Apple untuk mengumumkan produk & teknologi tebaru mereka, satu hal yang menarik perhatian _marketers_ adalah teknologi [Link Tracking Protection \(LTP\)](<https://www.apple.com/newsroom/2023/06/apple-announces-powerful-new-privacy-and-security-features/>).

**What Is Link Tracking Protection \(LTP\)?**

Fitur terbaru di iOS17 di mana _any web links_ yang diklik oleh pengguna di dalam aplikasi Mail, Messages, & Safari \(private mode\) akan dihapus sebagian jika ditemukan informasi terkait _user identity_ di dalamnya.

**Contoh:**

Before LTP: `https://example.com/marketing?click_id=YmVhODI1MmzMNGU&campaign_id=23`

After LTP: `https://example.com/marketing?campaign_id=23`

As explained in their [press release](<https://www.apple.com/newsroom/2023/06/apple-announces-powerful-new-privacy-and-security-features/>):

> Link Tracking Protection in Messages, Mail, and Safari Private Browsing. Some websites add extra information to their URLs in order to track users across other websites. Now this information will be removed from the links users share in Messages and Mail, and the links will still work as expected. This information will also be removed from links in Safari Private Browsing.

**What's The Impact?**

_First_ , marketing attribution akan semakin susah dilakukan mengingat _big players_ seperti Google & Meta masih menggunakan clicks\_id \(_[gclid](<https://support.google.com/google-ads/answer/9744275?hl=en-GB#:~:text=Google%20Click%20ID%20\(GCLID\)%20is,on%20the%20auto%2Dtagging%20setting.>) & [fbclid](<https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/fbp-and-fbc/>)_\) disetiap klik iklan yang dilakukan oleh pengguna.

_Second_ , menurut kami dampak di Indonesia tidak akan terlalu besar mengingat Apple users masih sedikit \([9.2% in 2022](<https://www.statista.com/statistics/1258390/indonesia-apple-share-in-mobile-phone-market/>)\), dan pengguna iMessage App hanya sebanya 16% secara global, sedangkan Mail App sebanyak 59% secara global.

**What Should We Do?**

Apple telah menyedikan solusi yang lebih user's privacy-focused, yaitu [Private Click Measurement \(PCM\)](<https://webkit.org/blog/11529/introducing-private-click-measurement-pcm/>). _We better start a discussion with engineering team about this new solution_.

* * *

### 2️⃣ Hampir 90% Konsumen Tidak Lagi Percaya Influencer

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/06/image-4.png)

Study Terbaru yang dilakukan oleh [Entribe](<https://www.entribe.com/resource/the-state-of-ugc-2023>) terhadap 1,046 konsumen umur 18 tahun atau lebih di US, ditemukan kecenderungan konsumen untuk membeli produk dari brand yang dipromosikan oleh _real customer, and _not influencer__.

_Insights_ menarik dari studi ini:

  * 81% responden setuju jika penggunaan influencer oleh brand tidak memberikan dampak atau bahkan malah memberikan dampak negatif.
  * 86% responden secara rutin melihat konten dari influencer di timeline social media mereka, tapi 51% dari mereka memilih untuk melewatinya \(_scroll past_\).
  * 90% responden lebih menyukai konten dari _real customers_\(UGC\), di mana angka ini naik sebanyak +5% tahun 2022.
  * 62% responden tidak pernah membeli produk yang dipromosikan oleh _celebrity_.



Menariknya, temuan ini sejalan dengan studi yang di lakukan oleh [Amplify & Harris Interactive](<__GHOST_URL__/ig-shadowbanning/>) di mana 98% konsumen bilang _real-life constomer reviews \(UGC\)_ memiliki dampak paling besar ke purchase decision dibandingkan _influencer/celebrity endorsements, or direct brand ads_.

_Do you trust product reviews from influencers?_

* * *

### 3️⃣ Creative Is The New Targeting

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/06/image-3.png)

Di acara [Meta Performance Marketing Summit](<https://metaperformancemarketingsummitvirtualevent.splashthat.com/>) minggu lalu, Meta melakukan pembaruan informasi untuk [Meta Performance 5](<https://www.facebook.com/business/news/unlock-businesss-potential-with-the-new-performance-5>) – _best practices_ yang bisa langsung diaplikasikan oleh _marketers_ dalam menjalankan iklan di platform Meta.

Pembaruan kali ini dilakukan sejalan dengan bertumbuhnya _Reels, AI dan New Ad Format_ \(misalnya [Lead Generation Ads](<__GHOST_URL__/promotional-ads/>)\) di platform mereka.

**1\. Simplify Campaign Structure**

Tujuan dari simplifikasi ini adalah untuk memberikan data point \(_re: conversion action\)_ sebanyak mungkin ke Meta's AI untuk bekerja lebih baik.

> By consolidating their initial setup of 69 ad sets down to 15 they saw 41% more purchases at a 1.2x higher return on ad spend - [Lele Sadoughi x Meta, 2023](<https://www.facebook.com/business/success/lele-sadoughi>)

**2\. Use Automation Tools**

Marketers bisa mengaktifkan fitur [Advantage+](<https://en-gb.facebook.com/business/help/1362234537597370>) untuk melakukan optimisasi audience, ad placement, & ads secara otomatis.

**3\. Differentiate Creative By Audience**

"Creative is the new targeting" adalah sebuah definisi yang pas untuk tips nomor 3 ini. Dengan semakin dibatasinya proses _ad tracking_ \(_re: GDPR, Apple's ATT, 3rd party cookies, etc_\) dan semakin berkembangnya algoritma Meta dalam mengidentifikasi & memberikan rekomendasi konten di platform mereka, tips ini menjadi sangat masuk akal.

Mata [said](<https://www.facebook.com/business/news/unlock-businesss-potential-with-the-new-performance-5>):

> Marketers can use creative as a new approach to targeting with distinct messages that resonate with different customer needs or interests.

**4\. Implement Conversion API**

Dengan melakukan implementasi[ Conversion API \(CAPI\)](<https://developers.facebook.com/docs/marketing-api/conversions-api/>), _conversion data_ tidak akan dikirim melalui Pixel, melainkan dikirim secara langsung melalui _server-to-server connection_ di mana memiliki akurasi data yang lebih baik.

**5\. Try Different Measurement Techniques**

Untuk lebih memahami performansi iklan, jalankan solusi pengukuran ikan yang lain seperti [Conversion Lift Study](<https://en-gb.facebook.com/business/m/one-sheeters/conversion-lift>), [A/B Testing](<https://en-gb.facebook.com/business/help/1738164643098669?id=445653312788501>), dan [Marketing Mix Modeling](<https://towardsdatascience.com/market-mix-modeling-mmm-101-3d094df976f9>).

* * *

### 4️⃣ Enam Dimensi & Metrik di \#GA4 Audience Builder

 _Please welcome 6 metrics & dimensions in \#GA4 Audience Builder:_

**Dimensions**

  * Country
  * Manual term \(UTM Term\)
  * Mobile device info
  * Minute
  * New vs Returning



**Metrics**

  * Session duration



Dengan pembaruan ini, semakin banyak variasi untuk audience segment yang bisa dibuat di Google Analytics.

* * *

### 5️⃣ Perubahan Aturan Komplain Trademark di Google Ads

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/06/image-1.png)

Kami yakin kalian juga menerima email di atas minggu lalu. _In case_ kalian belum sempat baca, email di atas terkait perubahan aturan dalam komplain trademark di Google Ads, aturan sebelumnya advertisers bisa memohon Google untuk melarang pengiklan lain untuk mentarget brand name / trandemark yang kita miliki secara legal. Aturan baru, komplain hanya bisa dilakukan ke spesifik advertisers and/or ads.
