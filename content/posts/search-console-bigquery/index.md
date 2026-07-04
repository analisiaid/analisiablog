---
title: Search Console ❤️ BigQuery
slug: search-console-bigquery
date: "2023-02-26T22:30:09Z"
draft: false
readingTime: true
toc: true
author: analisia id
---

Good morning 👋

And here we are again... uda mau ganti bulan, budget Ramadhan aman?

* * *

### 1️⃣ Google Search Console ❤️ BigQuery 

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-33.png)[search console data in bigquery](<https://mobile.twitter.com/googlesearchc/status/1628010024847933441/photo/1>)

Mungkin ini salah satu kado terindah dari Google untuk temen-temen **SEO Expert** , yaitu akses ke _RAW Data_ dari Google Search Console \(_re: SEO Dashboard_\) di database \([BigQuery](<https://cloud.google.com/bigquery/docs/introduction#:~:text=BigQuery%20is%20a%20fully%20managed,geospatial%20analysis%2C%20and%20business%20intelligence.>)\).

Why so? Coz it makes their job a lot easier\!

  * **Cost savings –** tidak perlu lagi membayar _third parties_ untuk mendapatkan akses ke _RAW Data_.
  * **Easy to use** – tidak perlu lagi belajar Google Search Console API.
  * **Reporting** – lebih cepat dengan konektivitas ke Looker Studio.
  * **Scalability** – SQL lebih _powerful_ dari _spreadsheet_ dalam mengakses data yang besar.
  * **Rich Data** – data seperti _device, country, rich result_ tersedia with _no row limits_. \([see attached image](<https://pbs.twimg.com/media/FpgCxc9aAAENneE?format=jpg&name=4096x4096>)\)
  * And [more...](<https://developers.google.com/search/blog/2023/02/bulk-data-export>)



**Cara Aktivasi Fitur Bulk Data Export**

  1. Buka **Search Console** dashboard: https://search.google.com/search-console?resource\_id=\{isi dengan URL website kamu, misalnya _https://www.tokopedia.com/_\}
  2. Masuk menu **Settings**

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-29.png)

3\. **Selesai**\!

**Cara Aktivasi Fitur Bulk Data Export**

  1. Buka **Search Console** dashboard: https://search.google.com/search-console?resource\_id=\{isi dengan URL website kamu, misalnya _https://www.tokopedia.com/_\}
  2. Masuk menu **Settings**

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-29.png)

3\. **Selesai**\!

Eits... tapi tetap harus hati-hati, karena BigQuery tidak 100% gratis\! Meskipun biaya _data warehouse_ relatif sangat murah – biaya simpan $0.02 / GB dan biaya per SQL Query $5/TB.

Sebagai ilustrasi \(_re: dari salah satu client dengan 600K organic visits per month_\), biaya untuk penyimpanan per bulan tidak kurang dari Rp335. Murah bukan? Asal jangan sering-sering jalan _heavy SQL Query_ aja.

* * *

### 2️⃣ Pembaruan Google PMax Campaign

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/analisia-google-performance-max.gif)[PMax updates](<https://blog.google/products/ads-commerce/performance-max-new-features/?trk=public_post_comment-text>)

Uda nyobain Google PMax? Kita udah nyobain dan memang hasilnya max banget buat campaign kita. Cuma karena produk baru, tentunya ada aja keterbatasannya. Nah minggu ini Google ada rilis beberapa update, yang sepertinya bakal berguna banget [PMax updates](<https://blog.google/products/ads-commerce/performance-max-new-features/?trk=public_post_comment-text>):

  * **Campaign-level brand exclusions**



Gak mau target _existing customers_? Fitur ini bisa memblokir iklan untuk tidak tampil di Google Search & Shopping ketika user mencari menggunakan nama brand \(_re: your brand keywords_\). 

  * **Page feed**



Layaknya [Google Shopping](<https://support.google.com/merchants/answer/7439058?hl=en-GB>) ads, _advertisisers_ bisa menentukan halaman website yang boleh dipakai & ditampilkan oleh Google iklan PMax.

  * **Experiments**



_Fancy for A/B Testing? Experiments feature is now available on PMax._

  * **Asset group-level reporting**
  * **Budget pacing insights**



Fitur ini membantu menjawab pertanyaan dari _clients_ seperti; "Kalau budget kita naikan 2x, berapa penjualan yang akan kita dapat?", atau "Butuh budget berapa untuk bulan depan?".

* * *

### 3️⃣ Top Products on TikTok Ads

Top Products, fitur baru di TikTok Creative Center untuk membantu brands melihat tren dari bermacam _products ad_ di platform TikTok.

> Wah produk "Serum & Essences" lagi trending di TikTok Indonesia nih.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-40.png)[tiktok creative center](<https://ads.tiktok.com/business/creativecenter/top-products/pc/en>)

Tidak hanya itu, kita bisa melihat _product performance_ dengan lebih mendalam.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-37.png)[tiktok creative center](<https://ads.tiktok.com/business/creativecenter/top-products/pc/en>)

Fitur ini membantu _advertisers_ untuk mengevalusi apakah performa iklan mereka \(_re: CTR, CVR, CPA, View Rate, etc_\) sudah bagus atau belum dengan membandingkan dengan _benchmark_.

> Coba gratis di sini: <https://ads.tiktok.com/business/creativecenter/top-products/pc/en>

* * *

### 4️⃣ Jualan di marketplace ❌ Jualan di group instagram ✅

Meta sedang menguji fitur baru untuk mengajak _business users_ menampilkan produk di Instagram's group chat.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-34.png)[sachin on twitter](<https://twitter.com/ItsSachinShah/status/1628069716253360129>)

Dari bocoran yang beredar, kita cukup memberikan informasi nama produk, harga, deskripsi & foto untuk mulai menggunakan fitur ini.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-35.png)[sachin on twitter](<https://twitter.com/ItsSachinShah/status/1628069716253360129>)

Sepertinya akan cocok banget untuk dipakai di group ibu-ibu arisan / pengajian. hehe

* * *

### 5️⃣ \#ChatGPT + Iklan

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-39.png)[ChatGPT monthly visits](<https://mobile.twitter.com/dimasku/status/1629046875507593216/photo/1>)

Dengan suksesnya produk \#ChatGPT, New Bing Browser, & Bing Chatbot, Miscrosoft berencana untuk menampilkan iklan di dalam [Bing Chatbot](<https://www.bing.com/new?form=MY028Z&OCID=MY028Z>) app.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/image-38.png)

[Microsoft Says](<https://www.socialmediatoday.com/news/microsoft-discusses-coming-ads-in-bing-chatbot-experience/643086/>)

> Bing chatbot ads will also be bigger and more prominent than regular search ads, which could provide more opportunity to reach users in the discovery phase.

_We're so excited\!_

* * *

### 6️⃣ Meta Verified Rp412,160 per Bulan

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/analisia-meta-verified-1.jpeg)

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/analisia-meta-verified-2.jpeg)

[fausto on twitter](<https://mobile.twitter.com/FaustoChou/status/1629168380136816642/photo/2>)

Akhirnya [Meta Verified](<https://about.meta.com/technologies/meta-verified>) mulai diluncurkan untuk pengguna di Australia dan Selandia Baru. Pengguna perlu membeli paket terpisah untuk Instagram dan Facebook. Jadi jika Kamu ingin membeli Meta Verified untuk kedua platform, Kamu harus mengeluarkan biaya Rp412,160 per bulan.

* * *

### Google trying to convince businesses to start using \#GA4

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/02/ezgif.com-video-to-gif--3-.gif)
