---
title: เมื่อ DX เจอกับ Performance จนเกิดเป็น Elysia
description: Elysia เป็น framework ที่ทำให้ DX กับ performance ไปด้วยกันได้
postSlug: introduction-to-elysia
ogImage: "@assets/images/introduction-to-elysia.png"
pubDatetime: 2024-10-27T16:00:00.000Z
featured: true
tags:
  - elysia
  - javascript
  - typescript
  - programming
---

## สารบัญ

## Bun รันไทม์ JavaScript ตัวใหม่

ก่อนที่ผมจะพูดถึง Elysia ก็คงต้องพูดถึง Bun ก่อนครับ

Bun เป็น JavaScript runtime แบบเดียวกับ NodeJS และ Deno ที่สร้างมาเพื่อให้มี performance ดีมาก ๆ
สิ่งที่ Bun แตกต่างจาก NodeJS และ Deno คือการเลือกใช้ JavaScript Engine เป็น JavaScript Core แบบเดียวที่ใช้ใน Safari web browser ที่สร้างมาโดยคำนึงถึง performance โดยเฉพาะ

นอกจากนี้ Bun ยังพัฒนาด้วยภาษา Zig ที่เป็นภาษา low level พอ ๆ กับ C (Zig คอมไพล์ C ได้ด้วยนะ) แน่นอนว่ามีส่วนทำให้ Bun มี performance ที่สูงมาก ๆ แต่ก็ต้องแลกด้วยความเสถียรบางส่วน (ตอนผมเขียนโพสนี้ Bun 1.0 แล้วแต่ Zig ยัง 0.13.0 อยู่เลยครับ)

## รันไทม์ใหม่ เฟรมเวิร์คใหม่

สิ่งที่ Bun ต่างจาก Deno อีกอย่างหนึ่งคือ Bun ถูกออกแบบมาให้สามารถใช้แทน NodeJS ได้เลย พูดง่าย ๆ คือ เราสามารถใช้ `express` ได้ตามปกติเลย

แต่ว่าเราจะทำแบบนั้นไปทำไมล่ะถ้าเรามีสิ่งที่ออกแบบมาสำหรับ Bun โดยเฉพาะ

## Elysia.js

Elysia.js เป็น framework ที่พัฒนาโดย [SaltyAom](https://github.com/saltyaom) เพื่อมาแก้ปัญหาเรื่องประสิทธิภาพของเว็บของเขา

ฟีเจอร์หลัก ๆ ของ Elysia จะเป็นเรื่องของ performance และ developer experience (DX) ที่ดี

## Performance

จากเว็บของ [Elysia](https://elysiajs.com) Elysia มีรันได้เร็วกว่า Express ถึง 21 เท่าและเร็วกว่า Fastify ถึง 6 เท่า โดยรองรับได้ถึง 2,454,631 request/second โดย benchmark อันนี้เป็น [TechEmpower Benchmark รอบที่ 22 วันที่ 17 ตุลาคม 2023](https://www.techempower.com/benchmarks/#hw=ph&test=plaintext&section=data-r22)

ซึ่งก็ถือว่าเร็วมาก ๆ สำหรับงานที่ใช้ JavaScript พอ framework มันรันได้เร็วเราก็อาจจะเห็นส่วนอื่น ๆ ที่ทำให้เว็บช้าอย่างเช่น Database

## Developer Experience หรือ DX

Developer Experience เป็นสิ่งที่คล้าย ๆ กับ User Experience ต่างกันที่เราจะโฟกัสที่นักพัฒนาตามชื่อของมันเลย

Elysia เขียนด้วยภาษา TypeScript ที่สามารถทำให้โค้ด JavaScript มี types ตามที่เรากำหนดได้ ซึ่งป้องกันข้อผิดพลาดให้เกิดขึ้นในระหว่างพัฒนาแทนที่จะไปบึ้มใน production

### ประโยชน์ของ Type

สมมติว่าเรามี object ตัวหนึ่งที่มี property ชื่อว่า `favorites` โดย `favorites` จะเก็บ `Post` ที่ผู้ใช้ชอบ

ต่อมาเราก็มีนักพัฒนาคนหนึ่งที่เป็นผู้ดีจากอังกฤษมา เขาสะกด `favorites` เป็น `favourites` ตามความเคยชิน และเข้าใจผิดว่า property นี้เก็บผู้ใช้คนอื่นที่ชื่นชอบเพราะว่าโค้ดเละเทะเป็นสปาเกตตี้

JavaScript ที่เป็นภาษา dynamic type มันก็จะปล่อยไปจนถึงช่วงหนึ่งที่โค้ดรันและ `favourites` มีค่าเป็น `undefined` ตู้ม เกิดเป็นซีเรียลรสช็อกโกแลตบน production

### การบังคับ Type ใน Elysia

Elysia สามารถบังคับ type ได้หลาย ๆ ส่วนไม่ว่าจะเป็น request body, path parmeters, request query หรือแม้กระทั่ง cookie ก็สามารถบังคับ type ได้ ส่วนหนึ่งก็ต้องยกความดีให้กับ TypeBox ที่เป็น library สำหรับสร้าง JSON Schema ที่มี type ด้วย

นอกจากนี้ Elysia จะเขียนโดยการ chain method ต่อกันไปเรื่อย ๆ ทำให้สามารถสร้าง type ที่ซับซ้อนได้โดยที่เราไม่ต้องเขียน TypeScript แบบลงมนต์ดำคาถามหามู

```typescript
import { Elysia } from "elysia";

new Elysia()
  .state("build", 1)
  // Store is strictly typed
  .get("/", ({ store: { build } }) => build)
  .listen(3000);
```

ตัวอย่างด้านบนผมดึงมาจาก [documentation](https://elysiajs.com/essential/structure.html#method-chaining) จะเห็นได้ว่า handler ที่อยู่ด้านล่างสามารถใช้ `build` ที่เขียนไว้ด้านบนได้เลยโดยที่เราไม่ต้องสร้าง type เองเลย

นอกจากนี้แล้ว Elysia ยังมี plugin หลาย ๆ อย่างให้เราใช้ เช่น [Swagger](https://elysiajs.com/plugins/swagger.html), [JWT](https://elysiajs.com/plugins/jwt.html)

## Eden

Elysia จะมี [Eden](https://elysiajs.com/eden/overview.html) ที่จะทำให้การแชร์ type ระหว่าง client และ server สามารถเกิดขึ้นได้โดยที่เราไม่ต้อง generate โค้ดเลย แค่ import type จาก server ก็พอแล้ว

## ส่งท้าย

ผมสร้าง [Todo list API](https://github.com/pontakornth/elysia-task) โดยใช้ Elysia กับ Drizzle และก็เห็นว่าน่านำมาใช้กับงานส่วนตัวที่น่าจะเกิดขึ้นในอนาคตครับผม
