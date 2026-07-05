---
title: Gak Keluar di GA4 😤
slug: gak-keluar-di-ga4
description: Influencer Marketing Spending Is 3.5x Faster Than Ad Spending?
  Total Revenue Gak Keluar di Google Analytics?
categories:
  - News
author: Dimas Aji
date: 2023-09-10T22:30:40Z
toc: true
readingTime: true
draft: false
---

_Good morning, friends\! May your day be as bright as the rising sun 🌞_

 _How was your weekend? We can't tell you much this week, but here are 3 news to start your Monday_

  1.  _**Influencer Marketing Spending Is 3.5x Faster Than Ad Spending**_
  2.  _**Total Revenue Gak Keluar di Google Analytics?**_
  3. _**Looker Studio Release \(September 7, 2023\)**_



_Easy peasy\!?_

* * *

### 1️⃣ **Influencer Marketing Spending Is 3.5x Faster Than Ad Spending**

Dari studi yang dilakukan oleh [eMarketer bulan Juli 2023](<https://www.socialmediatoday.com/news/new-report-finds-investment-influencer-marketing-rising-faster/692931/>), didapati pertumbuhan Influencer Marketing Spending 3.5x lebih cepat dari Regular Ad Spending. Hal ini terjadi hampir di semua platform Sosial Media, FB, Instagram, TikTok, Youtube, dan Snapchat.  


![](https://lh6.googleusercontent.com/mCHUVMg53fthdVT_3p3IdOfkHLddnJU_fBM9uzMTCbE6DOe7X-LQyp52UNUUwFCU48RyNwKbwgbdymFf94n8K0wsBKAEw5ZQZccKBQedgZVVLSvmMPvyrtI88iPs8U2a299Q8TQaZBODAKVcFbOMNPc)

  


How so? Kami melihat ada beberapa faktor yang mempengaruhi brands untuk spending lebih banyak ke Influencer Marketing.

Pertama, **The Rise of Creative-led platform**. Ditengah bertumbuhnya pengguna TikTok, Reels, & Youtube Shorts, tidak semua Brands bisa langsung masuk ke platform tersebut tanpa memiliki creative team yang handal, _especially_ dalam membuat video content. Pengguaan Influencer Marketing menjadi _shortcut_ untuk mengatasi hal tersebut, pay for content & exposure.

Kedua, [3 dari 4 Gen Z](<https://newsroom.tiktok.com/en-au/tiktokmademebuyit-shows-the-power-of-tiktok>) membeli sebuah produk setelah melihat video di TokTok. Tidak hanya itu, [74% of Gen Z](<https://searchengineland.com/gen-z-tiktok-google-search-survey-431345>) memilih menggunakan TikTok dibandingkan Google Search sebagai mesin mencari mereka. Masih inget dong, [Rafi Ahmad](<https://www.cnnindonesia.com/ekonomi/20230819120416-625-987893/tak-sampai-10-menit-sesi-shopee-live-erigo-dan-raffi-ahmad-raih-rp5-m>) melakukan Live Shopping di Shopee dan dalam 10 menit terjual 5 milliar rupiah.

* * *

### 2️⃣ Total Revenue Gak Keluar di Google Analytics?  


![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/09/image-3.png)missing revenue in GA4 report

Google merilis tulisan baru di blog mereka terkait _troubleshooting_ angka _revenue_ yang tidak muncul di Google Analytics report.

Tips 1: Cek parameters yang wajib dikirim

  * The 'currency' parameter \(event-level\)
  * The 'transaction\_id' parameter \(event-level\)
  * The 'value' parameter \(event-level\)
  * The 'items' parameter \(event-level\)
  * The 'item\_id' or 'item\_name' parameter \(item-level\)



Tips 2: Gunakan format number untuk 'value' parameter

  * Bukan string
  * Tidak ada huruf besar \(lowercase\)
  * Tidak mengandung currency symbol



Tips 3: Pastikan 'currency' parameter

  * Dalam format string
  * Tidak mengandung huruf besar \(lowercase\)
  * Terpasang di event-level
  * Pakai tanda petik \(i.e. 'USD'\)



Baca lebih lengkap [di sini](<https://support.google.com/analytics/answer/13800978?utm_source=analytics_twitter&utm_medium=social&utm_campaign=fixmissingrevenuedata_090723#zippy=%2Ccheck-that-you-configured-the-value-parameter-correctly%2Ccheck-that-you-configured-the-currency-parameter-correctly>)

* * *

### 3️⃣ Looker Studio Release \(September 7, 2023\)

Ada [yang baru](<https://support.google.com/looker-studio/answer/11521624?hl=en#sep-7-2023>) di Looker Studio

  1. Delete reports and data sources in bulk
  2. Move reports and data sources in bulk \(Pro Version\)
  3. Access to underlying data of each chart \(Pro Version\)
