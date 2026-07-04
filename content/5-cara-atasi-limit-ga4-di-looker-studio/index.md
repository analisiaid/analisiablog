---
title: 5 Cara Atasi Limit GA4 di Looker Studio
slug: 5-cara-atasi-limit-ga4-di-looker-studio
date: "2023-03-10T13:13:34Z"
draft: false
readingTime: true
toc: true
author: analisia id
featured: true
---

### 🤔 Limit Apa?

Buat kita yang punya dashboard di [Looker Studio](<https://lookerstudio.google.com/navigation/reporting>) \(_formerly: Google Data Studio_\) menggunakan data [dari Google Analytics 4](<https://support.google.com/looker-studio/answer/6370352?hl=en#zippy=%2Cin-this-article>), Google mulai membatasi berapa kali kita boleh meminta data, _in general_ ada 2 hal yang diberikan limit.

  * Berapa kali kita boleh __request__ data per hari.
  * Berapa kali users dapat mengakses secara __realtime__.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/03/image-28.png)[ga4 api data quota](<https://developers.google.com/analytics/devguides/reporting/data/v1/quotas>)

Sebagai ilustrasi, _dashboard_ dengan total _6 charts_ sedang kamu \(& bos kamu\) akses diwaktu yang bersamaan, jadi kalau ditotal 6 x 2 = 12 \(melebihi limit 10\). Akibatknya kamu akan mendapati error dengan keterangan **"Exhausted concurrent requests quota"** 😵‍💫.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/03/image-9.png)

### 👀 Cek Sisa Kuota

Buka Looker Studio > Edit Chart > Pilih Google Analytics token usage.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/03/image-10.png)cek token ga4 di lookers studio

**Report**

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/03/image-11.png) laporan penggunaan token ga4 di looker studio

### 😤 Siapa Yang Terdampak?

  * Kita yang ambil data langsung dari Google Analytics 4 ke Looker Studio.
  * Universal Analytics \(UA\) tidak terdampak dengan pembatasan kuota ini.
  * Pengguna Google Analytics 360 \(_premium_\) harusnya aman karena memiliki kuota 10x lebih banyak.



### 💡 Solusi Apa Aja?

**1\. Exploration**

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/03/image-12.png) exploration in ga4

[Exploration](<https://support.google.com/analytics/answer/7579450?hl=en#zippy=%2Cin-this-article>) adalah fitur di dalam Google Analytics 4 yang memiliki fungsi mirip Looker Studio dan tidak pematasan kuota. Tentu ini tidak _se-powerful_ Looker Studio, misalnya tanggal tidak bisa lebih dari 90 hari, dashboard hanya bisa diubah oleh _owner_ , _[data cardinality](<https://support.google.com/analytics/answer/12226705?hl=en>)_ , atau pilihan chart yang cukup terbatas.

**2\. EXTRACT**

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/03/image-16.png) extract in looker studio

[EXTRACT](<https://support.google.com/looker-studio/answer/9019969?hl=en>) adalah fitur di dalam Looker Studio yang berfungsi mengambil & menyimpan sebagian data dari Google Analytics 4 sebelum akhirnya kita visualisasikan di Looker Studio, sehingga tidak langsung menggunakan data dari GA4 API.

Kekurangan fitur ini adalah maksimal data yang bisa _di-extract_ adalah 100MB & bersifat statis, yang artinya untuk mendapatkan data baru kita harus lakukan proses extract ulang / terjadwal agar data di dashboard diperbarui.

**3\. Google Sheet**

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/03/image-15.png) get ga4 data from google sheet to looker studio

Tidak ada batasan kuota untuk menggunakan data dari Google Sheet di Looker Studio. Gunakan tools seperti [Google Analytics Add-ons](<https://workspace.google.com/marketplace/app/google_analytics/477988381226>) yang bisa dipakai secara gratis untuk menarik data dari Google Analytics 4 ke Google Sheet. 

> Jika ingin data diperbarui secara otomatis tiap jam / hari / minggu, gunakan Add-ons bebayar seperti Supermetrics \([coba gratis 14 hari di sini](<https://affiliate.supermetrics.com/5881.html>)\)

**4\. Google BigQuery**

 _Most-advanced solution yet affordable_ untuk menghindari kuota limit di Looker Studio, yaitu dengan menggunakan data Google Analytics 4 yang telah tersimpan di [Google BigQuery Data Warehouse](<https://support.google.com/analytics/answer/9358801?hl=en>).

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/03/image-14.png)get GA4 data from BigQuery to Looker Studio

**Pros**

  * Tidak ada biaya untuk [export RAW Data](<https://support.google.com/analytics/answer/9358801?hl=en>) dari Google Analytics 4 ke BigQuery.
  * Koneksi BigQuery & Looker Studio tidak dibatasi kuota token.
  * Biaya BigQuery relatif terjangkau. Biaya simpan $0.02 / GB dan biaya per SQL Query $5/TB.



**Cons**

  * Maksimal export 1 juta events per hari. Jadi jika user kamu sudah 500,000 per hari, kemungkinan besar kamu harus upgrade ke GA360 \(premium\).
  * Punya data analyst atau bisa SQL programming.



**5\. Beli Lisensi GA360**

Solusi mudah tapi _high-cost_ 🤑, yaitu dengan membeli lisensi [Analytics 360](<https://marketingplatform.google.com/about/analytics-360/>) dari Google di mana kita akan mendapatkan kuota & space lebih banyak.

Harga untuk GA360 tidak tetap, melainkan bergantung pada volume data. Jika total events di Google Analtyics 4 mencapai 25 juta per bulan, maka biaya untuk lisensi per tahun kurang lebih Rp 773,000,000.

Punya solusi lain? [Let us know](<https://twitter.com/analisia_id>)\!
