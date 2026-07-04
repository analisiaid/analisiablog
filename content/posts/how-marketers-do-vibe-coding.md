---
title: How Marketers Do Vibe Coding
slug: how-marketers-do-vibe-coding
description: Can we build a functioning web application using AI agents while
  maintaining good product, analytics, and security practices?
categories:
  - Guides
author: analisia id
date: 2026-06-21T18:30:11Z
cover: /images/uploads/CleanShot-2026-06-21-at-19.17.49@2x.png
toc: true
readingTime: true
draft: false
---

At Analisia, we've spent our weekends building a vibe-coded web application. This wasn't meant to be a startup idea or a business venture. It was simply a learning exercise.

We wanted to answer a question:

> _Can we build a functioning web application using AI agents while maintaining good product, analytics, and security practices?_

The result is now live: tikum.cc tikum is a slang form of titik kumpul or meeting point in Indonesian \(best experienced on mobile\).

![](__GHOST_URL__/content/images/2026/06/CleanShot-2026-06-21-at-19.16.01.gif)

What it does:  
🚴 Browse cycling and running routes  
📍 Upload your own routes in GPX format  
🤝 Meet other users and join collective activities  
As part of this project, we found ourselves wearing multiple hats: product owner, designer, engineer, analyst, marketer, tester, and customer support.

Here are some of the things we've learned so far.

## 1\. Building the product was easier than deciding what to build

AI can generate screens, write code, create APIs, and fix bugs.  
The harder part was defining the product itself. **What problem** are we solving? What should the user experience look like? What data should we collect? How do we prioritise features?  
The quality of the output was heavily influenced by the quality of our requirements \(i.e. PRD\).

## 2\. AI reduces the need to switch between programming languages

Traditionally, building a web application means jumping between different programming languages, frameworks, databases, deployment tools, and documentation. With AI, we spend more time communicating **in human language**. That doesn't mean technical knowledge is no longer important. It just means the bottleneck shifts from writing syntax to clearly explaining what you want. Try to name someone who can happily handle front-end and back-end, though we know geniuses are there, in reality those are two different roles.

## 3\. Good documentation became even more important

One thing that surprised us was how valuable a good **PRD \(Product Requirements Document\)** became. The clearer the requirements, the better the output. Hmmm think vague requests your stakeholders often give you, the good news is AI can't process it lol. When requirements were vague, the AI filled in the gaps with assumptions. Sometimes those assumptions were great. Sometimes they created extra work.

## 4\. Analytics implementation was surprisingly straightforward

As analysts, this was probably our favourite part. Implementing behavioural tracking and data layers was much easier than we expected. Instead of relying on engineering resources, **prompts helped** us establish our measurement foundations quickly. We still prefer owning our analytics stack through:

> GA4 → BigQuery → Reporting Layer

But the implementation process itself became much faster.  
We can go into more than hours debate on sampling, aggregated, and hallucination issues.

![](__GHOST_URL__/content/images/2026/06/image-2.png)GA4 dashboad

## 5\. Marketing is still harder than development

This is our marketers brain work the most, “magically”. Building the application was only half the challenge. **Getting people** to actually use it is another story. Since this is a family project, we have exactly £0 marketing budget, so we've been experimenting with different social channels. Interestingly, Threads has been the strongest performer so far, outperforming both Instagram and X in driving traffic to the website.

![](__GHOST_URL__/content/images/2026/06/image-1.png)Lighthouse performance

## 6\. Our computer degree background helped more than we expected

A lot of students ask us whether technical degrees are still relevant. After this project, we'd say yes. Not because we spent our time writing code manually, but because understanding architecture, security, GitHub workflows, databases, APIs, Cloudflare, Supabase, and deployment processes helped us make better decisions. AI helped us move faster. Technical understanding helped us **avoid making expensive mistakes**.

And before anyone asks... If anything, this project reinforced why we enjoy marketing, engineering, and analytics. Don't get us wrong, we genuinely enjoyed the engineering side of the project. There's something incredibly satisfying about taking an idea and turning it into a working product.

But marketing keeps us closer to the business outcome. It sits closer to revenue, growth, customers, and ultimately whether a product succeeds or fails. That's what makes it such a valuable function. Marketing is also one of the few disciplines that sits at the intersection of technology, data, business, and human behaviour. You need to understand how systems work, how people make decisions, and how to connect the two.

In 2026, understanding technology is no longer optional for marketers. Whether it's AI, analytics, data infrastructure, measurement, automation, or product development, technology has become part of the day-to-day toolkit. Building this project didn't make us want to leave marketing. It reinforced our belief that the most effective marketers of the future will be those who understand both people and technology and can use that combination to drive business growth.

Next up on our list, is to add blog as part of our SEO, AI Search, GEO experimentation, if the blog is build programmatically but within a fully vibe coded environment. How should we name it lol
