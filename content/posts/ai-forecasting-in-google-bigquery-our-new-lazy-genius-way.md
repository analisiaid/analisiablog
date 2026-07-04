---
title: "AI Forecasting in Google BigQuery:  Our New Lazy Genius Way"
slug: ai-forecasting-in-google-bigquery-our-new-lazy-genius-way
description: Are you tired answering, how's the traffic going to look like in
  the next 30 days?
categories:
  - Analytics
author: Susilawati Habib
date: 2025-07-21T09:22:22Z
cover: https://images.unsplash.com/photo-1712002641088-9d76f9080889?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMTc3M3wwfDF8c2VhcmNofDd8fGFpfGVufDB8fHx8MTc1MzAxMzEwN3ww&ixlib=rb-4.1.0&q=80&w=2000
toc: true
readingTime: true
draft: false
---

Are you tired answering, how's the traffic going to look like in the next 30 days?  
We've got that questions too often, well the common case is marketers often load historical data and do calculation on excel/ sheet.  
But what if that process can work with the help of GBQ with ML? The [AI.FORECAST](<https://cloud.google.com/bigquery/docs/reference/standard-sql/bigqueryml-syntax-ai-forecast>) function was launched early in 2025 using BigQuery ML's built-in [TimesFM model](<https://cloud.google.com/bigquery/docs/timesfm-model>) and we finally had chance to try with our datasets.

If you are naturally marketers \(just like us\) or work with limited data team, it's a truly game changer. AI.FORECAST. It’s a BigQuery function powered by TimesFM model, this lets us do forecasting without having to create, train and manage the model. Just plug in the table, define the time column and the value we want to forecast, and it generates the prediction for us. With confidence intervals that we can define on the SQL query \(by default it is set at 95%.

⚡ **Wait — Zero Training?**  
Exactly. Unlike building our own model for example: ARIMA where we have to manually train, evaluate, and maintain models, AI.FORECAST is pre-trained. We’re using Google’s model straight out of the box — zero setup, zero headaches.

This is a foundation model, like GPT but for time series. You don’t tweak it — you just feed it your historical data and it does the rest.

🤹**But It’s “Only” Univariate**  
Before you get too excited: this only works on one metric at a time.  
It’s univariate — which means it forecasts the future of a single column based purely on its past behavior. If you work with a business that drastically ramping up the budget, this might not be an ideal solution for you.

Well, you’ll need to build your own multivariate model in BigQuery ML using ARIMA\_PLUS, that’s doable — but it’s not a one-liner \(maybe also a right time to change your job title to somewhat data science 👀👀\)

Still, for quick, directional forecasts, AI.FORECAST is a massive leap forward.

## 🧠 The Excel Debate

Dimas and I had a heated debate:

> Isn’t this just the same as doing a linear regression in Excel or Sheets?

In short: **Nope. Not even close.**

Here’s why:

Feature| Excel Linear Regression| AI.FORECAST \(TimesFM\)  
---|---|---  
Detects seasonality| ❌| ✅  
Adapts to trend changes| ❌| ✅  
Scales across multiple series| ❌| ✅  
Returns confidence intervals| ❌| ✅  
Learns from past patterns| ❌| ✅  
Works inside SQL| ❌| ✅  
  
A linear regression is… static.  
`AI.FORECAST` uses **transformers** — like comparing a sundial to a smartwatch.

**🧪 Example: Forecasting Traffic in the next 90 days**

  
`TABLE`
    
    
    SELECT
      *
    FROM
      AI.FORECAST(
        (
          SELECT
            session_date AS timestamp_col,
            COUNT(session_id) AS sessions_count_data_col 
          FROM
            `your table`
          
          GROUP BY
            session_date
          ORDER BY
            session_date
        ),
        data_col => 'sessions_count_data_col',
        timestamp_col => 'timestamp_col',
        horizon => 90
      );

  
That’s it.

**BigQuery handles everything:**

✅ Modeling

✅Validation

✅ Seasonality detection

✅Scaling across thousands of time series

📦 Output You Get

`TABLE`
    
    
    forecast_timestamp Future date
    forecast_value Predicted value (mean of prediction interval)
    prediction_interval_lower_bound Lower bound of the forecast
    prediction_interval_upper_bound Upper bound of the forecast
    confidence_level Confidence level used (by default it is 95%)
    ai_forecast_status Error info (blank = all good)

### 📈 Traffic Forecast – AI vs Actual

Date | Real Value | Forecast Value | Match Rate \(%\) | Confidence Level | Upper Bound  
---|---|---|---|---|---  
2025-07-13 | 1,417 | 1,384 | 97.69% | 95.00% | 1,589  
2025-07-14 | 2,013 | 1,924 | 95.57% | 95.00% | 2,278  
2025-07-15 | 2,066 | 1,975 | 95.59% | 95.00% | 2,350  
2025-07-16 | 2,246 | 1,964 | 87.48% | 95.00% | 2,328  
2025-07-17 | 2,189 | 1,891 | 86.38% | 95.00% | 2,265  
2025-07-18 | 1,965 | 1,770 | 90.07% | 95.00% | 2,090  
  
**🔍 Insight:** Despite being a univariate model, AI.FORECAST holds strong predictive power, staying within _~10%_ of actual values.

## 🔐 One Last Thing — Security

You know what’s even better than pasting it to AI tools?

**Keeping it inside your secure data stack.**  
Unlike ChatGPT or other AI tools, by using this, it keeps your data **in place**. No exporting to third-party models.

* * *

## 🧯 Limitations to Know

Before you go full AI-hype, here are the current boundaries:

  * ❗ Only support univariate 
  * ⌛ Max 512 time points
  * ✅ Needs minimum 3 data points
  * 🔢 Only works with numeric types \(`INT64`, `FLOAT64`, etc.\)
  * 🧠 Powered only by TimesFM



* * *

## 🧩 When \(and When Not\) to Use It

### ✅ Use `AI.FORECAST` when you want to:

  * Predict traffic, bookings, revenue, or occupancy
  * Forecast per region/city/property
  * Avoid building and maintaining ML pipelines
  * Impress your client with real insights, not hand-waving



### 🚫 Don’t use it when:

  * You need multiple variables to influence the forecast
  * Your data is chaotic or sparsely collected
  * You need business logic baked into your forecast
