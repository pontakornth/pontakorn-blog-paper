---
title: ทำความรู้จักกับ Deno
description: มารู้จักกับ Deno ที่เพิ่งจะออก version 2.0 กันดีกว่า
postSlug: introduction-to-deno
ogImage: "@assets/images/introduction-to-deno.png"
pubDatetime: 2024-10-14T15:00:00.000Z
tags:
  - javascript
  - programming
  - deno
  - node
---

## สารบัญ

## Deno คืออะไร

Deno เป็น JavaScript runtime อีกตัวหนึ่งที่จะทำให้สามารถรันโค้ด JavaScript ในฝั่งหลังบ้านได้คล้าย ๆ กับ NodeJS และก็ยังมี[ผู้สร้างคนเดียวกัน](https://stackoverflow.blog/2024/03/19/why-the-creator-of-node-js-r-created-a-new-javascript-runtime/)อีกด้วย

Deno เขียนขึ้นด้วยภาษา​ Rust และใช้ JavaScript Engine V8 แบบเดียวกับที่ใช้ใน Chromium และ browers อื่น ๆ ที่มีต้นแบบเดียวกัน

Deno มีจุดเด่นหลายอย่างไม่ว่าจะเป็น security, tools ที่ครบครัน หรือเรื่อง performance

ผมจะขอพูดถึง features ต่าง ๆ ยกเว้นเรื่อง performance ที่ผมมองว่าควรไปวัดกันเองก่อนใช้งานดีกว่าครับ

## Security by default

สิ่งหนึ่งที่ Deno ต่างจาก NodeJS คือ โค้ดของ Deno จะมีขอบเขตการทำงานที่จำกัดยกเว้นเสียแต่ผู้ใช้จะอนุญาตให้เข้าถึงส่วนต่าง ๆ

```typescript
console.log(process.env.PORT);
```

ถ้าเป็น NodeJS โค้ดด้านบนจะสามารถรันได้เลย แต่ถ้าเป็น Deno จะติดเรื่องขอ permission ในการเข้าถึง Environment ก่อน ถ้าไม่อยากโดนถามก็ใส่ `--allow-env` ไปในคำสั่ง

```sh
deno run --allow-env main.ts
```

ก็จะสามารถรันโค้ดด้านบนได้ปกติ เอ๊ะ สังเกตรึเปล่าว่ามีอะไรแปลก ๆ

## Tools ต่างเพียบพร้อม + รองรับ TypeScript

เวลาที่เราอยากจะให้โค้ดของเราออกมาดีตอนใช้ NodeJS เราก็คงต้องลงเครื่องมือต่าง ๆ เช่น ESLint, Prettier, Vitest, Jest หรืออื่น ๆ ที่นึกออก แต่ Deno จะมีเครื่องมือต่าง ๆ มาให้พร้อมอยู่แล้ว

นอกจากนี้ตัว Deno ก็รองรับ TypeScript โดยที่ไม่ต้องมีไฟล์ config เพราะมีค่า default ของ Deno มาแล้ว

โค้ด Deno สามารถรันได้โดยไม่มี config อะไร (นอกจาก permission ใส่ใน CLI) แต่ว่าการมี config จะทำให้ชีวิตดีขึ้น เช่น Deno extension ใน VSCode จะ detect อัตโนมัติและไม่ปนกับงานที่ใช้ Node, สามารถใส่คำสั่งพร้อม permission ได้เลย

## JSR (JavaScript Registry)

เพราะว่าผมไม่พูดเรื่อง performance ขอแถมหน่อยล่ะกัน ตอนนี้ Deno 2.0 มี compatibility กับ Node มากขึ้นทำให้ migrate projects ได้สะดวกขึ้น และก็จะมี JSR มาเสริมกับ npm

JSR เป็น registry มีเป็น superset ของ npm (มีของเพิ่มเติมจาก npm และมีของที่ npm มีอยู่แล้ว) ที่ไม่ได้มาแทนที่แต่จะเสริมการใช้งานร่วมกัน

ข้อดีของ JSR คือรองรับ TypeScript และ ESModule (`import` ใน JavaScript ที่ไม่ใช้ `require` อันนั้นคือ CommonJS) ทำให้การ publish package สะดวกขึ้น นอกจากนี้ runtime อื่น ๆ เช่น NodeJS, Bun, Cloudflare Workers ก็สามารถใช้ JSR ได้ทั้งนั้น

## ที่มาข้อมูล

- https://deno.com/
- https://jsr.io/
