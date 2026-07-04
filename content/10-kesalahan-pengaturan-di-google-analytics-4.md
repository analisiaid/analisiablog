---
title: 10 Kesalahan Pengaturan di Google Analytics 4
slug: 10-kesalahan-pengaturan-di-google-analytics-4
date: "2025-02-16T10:53:08Z"
draft: false
readingTime: true
toc: true
author: analisia id
cover: "https://images.unsplash.com/photo-1613347761513-0f37baebfd20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDJ8fGdvb2dsZSUyMGFuYWx5dGljc3xlbnwwfHx8fDE3Mzk3MDE5NDF8MA&ixlib=rb-4.0.3&q=80&w=2000"
---

### 1️⃣ Menggunakan Events Dari Universal Analytics

![](https://lh6.googleusercontent.com/DCg8CvjowctNiTr-KUsfG1yLjzIr60E0ikCFdkYawMRG7m45mDFY0Lsm30JnbuldXPdRQyOFckz3lQDWmuHUJAnBtSbwuArbuuwVJRw8ymsJXwEsG2LPaA2IdB8x9VSu1pZQ3p1Uxd4SDVF49hzQ6Tc)

Dengan mengaktifkan fitur ini, beberapa yang sudah kita setting di Universal Analytics \(UA\) seperti event hits, timing, exceptions akan disalin ke property Google Analytics 4 \(GA4\). Tujuannya bagus, yaitu untuk menyelamatkan informasi dari Google Analytics lama \(UA\) ke GA4. Sayangnya hal ini akan menimbulkan masalah di masa mendatang ketika tracking code dari Google Analytics lama \(analytics.js\) berhenti beroperasi di tahun 2023.

[Google Said](<https://support.google.com/analytics/answer/11150547?hl=en>):

> This feature does not support Custom Dimensions and Metrics, Enhanced Ecommerce data, or User-ID. If you rely on these capabilities in your Universal Analytics property, we recommend updating your instrumentation in gtag.js or Google Tag Manager to log the necessary Google Analytics 4 fields.

> While this setting lets you easily capture these three hit types as events, our recommended best practice is to __update your code__ to capture that behavior using the Google Analytics 4 data model.  
> 

### 2️⃣ Lupa Registrasi Referral

![](https://lh4.googleusercontent.com/rkBp1Ca3hWhY0AN2uKQh_UU3FKA9_dHCkQ8NtRZFPPW690SgEqK_Shq2doSVRg3FQdN5ginSH7gSpH6zS4Eh-DoQabrcosQyTr9ap04KARrvHMUwu8IXyP5EOnPmHxaCfX6vp_wuJRtIY0eW84xoK4c)

 _Classic mistake\!_ Dengan tidak melakukan [referral setting](<https://support.google.com/analytics/answer/10327750?hl=en>) di Google Analytics 4 akan muncul beberapa masalah seperti jumlah conversions yang menurun dari beberapa marketing channels lain karena session terputus.

### 3️⃣ Data Retention = 2 Bulan

![](https://lh3.googleusercontent.com/Eg6osm3JfJ4JA54h7rGQ0azSikxHw49q3DhS4OubhVOV4URVw7jIqs99rpUStNH5b4GyG5Jzw1mlCOA8D8GYBGIUd2RCnvsFJ7IcLLn3Pj-w0rOf5j2g80xQXVgRNoUbxEJVHJNJgsC5Rez7vF9UkoU)

Dengan menggunakan [data retention = 2 months](<https://support.google.com/analytics/answer/7667196?hl=en>), Google akan menghapus data user dari Google Analytics 4 ketika user tersebut tidak melakukan interaksi dengan website / app selama 2 bulan terakhir. Akibatnya, ini akan menjadi masalah ketika melakukan proses reporting dengan _time range_ yang cukup panjang, misalnya _year on year comparison_.

> Solusi: pilih retention setting 14 bulan \(maximum\)

### 

### 4️⃣ Memindahkan Remarketing Audience dari Universal Analytics \(UA\)

[Audience](<https://support.google.com/analytics/answer/9267572?hl=en#zippy=%2Cin-this-article>) di Google Analytics 4 tidak tersedia secara otomatis & terkadang kita lupa membuat Audience yang dipakai untuk aktivitas marketing, misalnya _similar audience, remarketing, customer exclusion_ , etc.

> Solusi: buat audience baru setelah GA4 aktif

### 5️⃣ Lupa Tandai Event Sebagai _Conversion_

![](https://lh5.googleusercontent.com/Mm3BLmqIxNYhTYea_KgZgCbidTGNNH_ZkVA3fVe5jxemLaM561gxm3EEprBBr05U80DECxy082f1k4Sr28q9hA_0YqwI48AXuKXxv0qSHU5heS7UTewGqLqZWoFzZ6OvaRM8FsydUkr80ypwXDBM4e8)

### 6️⃣ Tidak Registrasi Custom Dimension

![](https://lh5.googleusercontent.com/iwKKByVaSxb8d9PxglxtDJlgNPJDt5FvsJLcM-EH6BsOlIZ1ZZd1m2ttHW1eDugT_WALPPLn6pM4Rw4fjmXp6sYIWqnDgTcoBESfLxrkiw9HML8AIpG5dK07-Wt0JqbpLuQZLOWbwmif6X_9JLUaLNQ)

Perlu diingat, custom dimensions & metrics yang kita pasang tidak akan muncul di menu Reporting & Explorer jika tidak dilakukan registrasi di menu Admin.

Contohnya:
    
    
    <script>
     window.dataLayer = window.dataLayer || [];
     window.dataLayer.push({
     'event': 'beli_bootcamp',
     'bootcamp': 'bootcamp digital marketing,
     'value': 350000
     });
    </script>
    

Informasi `bootcamp` tidak akan bisa diakses di menu Reporting & Explorer, kecuali kita lakukan registrasi di menu Admin.

> Solusi: registrasi custom dimensions / metrics melalui Admin > custom definitions

### 7️⃣ Enhanced Measurement

![](https://lh6.googleusercontent.com/WhLenq0qpT2ixj4GlY-ST8Fsnclci_tRiupLZxTxbEmTldJPVeI9AW4Av7SXWghGRKpseTsjkb9vRZXYjsfmH-0t_CwpI8nbNpJ1lpgaDMAjmg-RzZ_Z_pfltLhNVOtCaP1e8SVZZ5vWiX9c2nvUKAw)

Dengan mengkatifkan fitur [Enhanced Measurement](<https://support.google.com/analytics/answer/9216061?hl=en>), kita akan mendapatkan data tambahan secara otomatis tanpa melakukan tagging setup, misalnya:

  * scroll
  * outbound clicks
  * video engagement
  * file download
  * etc



> Solusi: aktifkan fitur ini melalui Admin > Data Stream > Enhanced mesurement

### 8️⃣ Google Signal Tidak Aktif

![](https://lh5.googleusercontent.com/BJqi-UxEKoEmpSR-JPqfD4g7daXqSgjSc9id3ErZiBF43GnXAeukh7oJYuqA95NDgZkFXTqYMmXLadiLbvQCGPtTMVRIZ1xtdnK4dBqoCJLxBAKTNCuDbGyFaIcNkKAhIJl3LpHXB1I_COyfy3PR0n0)

Fitur [Google Signal](<https://support.google.com/analytics/answer/9445345?hl=en#zippy=%2Cin-this-article%2Cadvertising-reporting-features>) di Google Analytics 4 dipakai oleh Google untuk membaca informasi Google Account dari visitor website / app, yang akhirnya kita akan bisa melakukan hal-hal berikut;

  * Cross-platform reporting
  * Remarketing campaign
  * Demographic & interest reporting



> Solusi: aktifkan User Signal di menu admin > data setting > data collection

### 9️⃣ Penyesuaian UTM Untuk Default Channel Grouping

Google Analytics 4 \(GA4\) memiliki Default Channel Grouping yang berbeda \(memiliki lebih banyak kategori, [contohnya](<https://take.ms/ptCtt>)\) dengan Universal Analytics \(GA3\). Akibatnya, jika penggunaan utm\_source / utm\_medium tidak sesuai dengan [panduan yang diberikan oleh Google](<https://support.google.com/analytics/answer/9756891?hl=en>), maka kunjungan dari users akan diberi label _Unassgined_ di Google Analytics.

![](https://digitalpress.fra1.cdn.digitaloceanspaces.com/32x2gs0/2023/03/image-29.png)

> Solusi: cek kembali penggunaan UTM di seluruh marketing channel & pastikan sesuai dengan [Google's UTM Guidelines](<https://support.google.com/analytics/answer/9756891?hl=en>)

### Lupa Mengaktifkan Fitur Google Ads, BigQuery, Search Console Integrations

![](https://lh6.googleusercontent.com/Zxn99eZWV-VpG02mPBKceUNGRptChzetZphW2M_0BcCr5j33KG1665F_6qNYtp4aXtrtB0BB4luE9VGpIL0av-GPZF4Xqdki1dE5GK0z4pHJCrwAl-aIsnc2Ppy5jMPj0QTIr--mEYADVtHEnD309Bs)
