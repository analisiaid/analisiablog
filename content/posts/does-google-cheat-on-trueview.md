---
title: Does Google Cheat on TrueView? 💔
slug: does-google-cheat-on-trueview
description: Google Has Been Cheating on TrueView Video Campaigns?
categories:
  - News
author: Dimas Aji
date: 2023-07-02T22:30:33Z
toc: true
readingTime: true
draft: false
---

_Hello 👋 Happy Monday\! I hope you have a fantastic start to your week._

_In this newsletter, we are going to cover the following:_

  1. **Latest Brand Control Features in Google Ads**
  2. **Google Has Been Cheating on TrueView Video Campaigns?**
  3. **SEO Sitemaps Akan Ditutup Google 6 Bulan Lagi**
  4. **Looker Studio Updates**
  5. **Lebih Dari 50% Websites Masih Belum Pindah ke GA4**



 _Let's dive in\!_

* * *

### 1️⃣ Latest Brand Control Features in Google Ads

Search Campaign, salah satu tipe campaign di Google Ads yang menyita banyak waktu. Misalnya, harus rutin cek search terms untuk menghindari _bid overlap_ , _irrelevant targeting_ , atau menghindari iklan muncul di kata kunci kompetitor. _Hopefully_ hal itu akan sedikit berkurang dengan 2 fitur baru yang dirilis oleh Google minggu ini, **Brand Restriction** for Search campaign dan **Brand Exclusions** for PMax campaign.

**Brand Restriction** digunakan untuk membatasi targeting di Search Campaign, khususnya untuk iklan yang hanya ingin ditampilkan di _spesifik brands_ dalam kata kunci \(_brands you want to serve ads on_\). Sebagai contoh, Apple ingin mentarget mentarget pengguna di Indonesia yang mencari produk mereka di Google tetapi tidak mau tampil ketika ada netizen yang menggunakan kata kunci kompetitor.

  * **Broad match keywords:** apple, office store apple, apple indonesia
  * **Brand Restrictions:** iphone, imac, iphone se, apple watch, mac pro, mac studio, airpod 



Jadi ketika netizen menggunakan kata kunci _"apple vs samsung"_ , iklan tidak akan muncul.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/07/image.png)[brand restrictions](<brand exclusions>)

**Brand Exclusions** adalah kebalikan dari _brand restriction_ , di mana fitur ini berguna untuk membatasi iklan PMax untuk tampil ketika users menggunakan kata kunci tertentu, kompetitor misalnya.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/07/image-1.png)[brand exclusions](<brand exclusions>)

Jika nama brand tidak ditemukan, advertisers bisa klik tombol **Request a brand** dan Google akan segera _verify_ brand tersebut untuk bisa digunakan.

* * *

### 2️⃣ Google Has Been Cheating on TrueView Video Campaigns?

Pernah jalan [TrueView](<https://web.archive.org/web/20230129225020/https://support.google.com/displayvideo/answer/6274216#zippy=%2Ctrueview-in-stream-and-in-feed-video-ads>) Video campaign di Google? Itu loh, _video ad_ yang hanya bayar ketika pengguna menonton video \(_aren't skipped_\) with _audio-on_ dan tampil di Youtube & Google partners as well \(i.e. kompas.com, detik.com, etc\). 

_Suprisingly_ dari laporan yang dirilis [Adalytics](<https://adalytics.io/blog/invalid-google-video-partner-trueview-ads>) minggu lalu, Google dinilai melakukan kecurangan dari TrueView ads yang pernah dijalankan dengan total pelanggaran 80%. Contohnya, iklan yang ditampilkan kecil, _muted_ ,  _automatically-played videos_ , dan tidak tampil di main content. _In short_ itu tidak sesuai dengan _Google’s standards for monetization_.

**Contohnya...**

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/07/image-3.png)

**73% of Invalid TrueView** 😱

Adalytics menggunakan data dari 1,100 brands \(_including_ _Johnson & Johnson, American Express, Samsung, Sephora, Macy’s, Disney+, _Medicare, the U.S. Army\) dengan total milyaran impressions selama periode 2020-2023.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/07/image-4.png)

Tentu Google membantah tuduhan ini, mereka [bilang](<https://www.wsj.com/articles/google-violated-its-standards-in-ad-deals-research-finds-3e24e041>):

> It makes many claims that are inaccurate and doesn’t reflect how we keep advertisers safe. As part of our brand safety efforts, we regularly remove ads from partner sites that violate our policies and we’ll take any appropriate actions once the full report is shared with us.

**What We've Learned?**

_We think it's safe to start using[placement exclusion](<https://support.google.com/google-ads/answer/2454012?hl=en-GB>) feature to avoid invalid TrueView from non-google family apps such as mobile apps & web pages._

* * *

### 3️⃣ SEO Sitemaps Akan Ditutup Google 6 Bulan Lagi

Hari Senin kemarin Google mengumumkan rencana [penutupan fitur Sitemaps](<https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping>) _ping endpoint_ 6 bulan lagi.

**Sitemaps ping endpoint?**

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/06/image-20.png)

Singkatnya Sitemaps endpoint adalah URL \(.xml\) yang berisi informasi daftar halaman \(seperti _url, title, etc_\) di website kita. Oleh SEO Expert, Sitemaps ini dipakai untuk berkomunikasi dengan Google Search Engine jika ada penambahan atau perubahan di halaman website kita. Sitemaps bisa diunggah melalui akun [Search Console](<https://search.google.com/search-console/about>) atau [robots.txt](<https://developers.google.com/search/docs/crawling-indexing/robots/intro#:~:text=A%20robots.txt%20file%20tells,or%20password%2Dprotect%20the%20page.>)

Google bilang makin ke sini informasi yang diberikan di sitemaps kurang akurat & cenderung banyak _spam_.

> Our internal studies—and also other search engines such as Bing—tell us that at this point these unauthenticated sitemap submissions are not very useful. In fact, in the case of Google Search, the vast majority of the submissions lead to spam. To wit, we're deprecating our support for sitemaps ping and the endpoint will stop functioning in 6 months.

_Most importantly, this changes will not cause problems for Google Search \(re: SEO\). Lastly, we don't need to bother our IT team to build sitemaps.txt :\)_

* * *

### 4️⃣ Looker Studio Updates

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/07/image-2.png)[mehdi on twitter](<https://twitter.com/wissi_analytics/status/1674659708982943745/photo/1>)

**What's New?**

  * **Chart spacing:** atur jarak antar bar or group of bars.
  * **Bar label position** : atur posisi label dalam bars, apakah mau di atas, luar, bawah, atau _auto_.
  * **Bar border color:** atur warna border pada bars.
  * **Stacked bar label:** atur tipe metrics & posisi yang ingin ditampilkan.



> [Learn more](<https://support.google.com/looker-studio/answer/11521624?hl=en#jun-29-2023>)

* * *

### 5️⃣ Lebih Dari 50% Websites Masih Belum Pindah ke GA4

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/06/image-21.png)builtwith.com

Minggu lalu mungkin jadi salah satu minggu yang cukup _hectic_ untuk para brands & business, karena tanggal 1 Juli 2023 adalah deadline yang diberikan oleh Google untuk pindah dari Universal Analytics ke Google Analytics 4 😱

Data dari BuiltWith terlihat lebih dari setengah website website yang menggunakan Universal Analytics masih belum berpindah ke GA4. Angka ini mirip dengan hasil survey yang dilakukan oleh ex Googler di Twitter.

> Are you ready for the switch to GA4?  
>   
> \(Please only answer if you are using Universal Analytics and considering what's next\)
> 
> — Krista Seiden \(@kristaseiden\) [June 23, 2023](<https://twitter.com/kristaseiden/status/1672317148646215680?ref_src=twsrc%5Etfw>)

Anyway, kalian sudah pindah ke GA4?
