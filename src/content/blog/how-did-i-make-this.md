---
title: ผมทำเว็บนี้ยังไง
description: "ใช้ Astro กับ theme ที่ได้มาครับ"
postSlug: how-did-i-make-this
ogImage: "@assets/images/AstroPaper-v3.png"
pubDatetime: 2023-12-12T04:05:50.281Z
tags:
  - astro
  - blog
---

## สารบัญ

## ผมใช้อะไรทำเว็บนี้

ถ้าพูดง่าย ๆ ก็คือผมไปโหลด Astro theme ที่ถูกใจมาทำครับ ผมเคยลองจะทำธีมเองแล้วพบว่ามันยากและเสียเวลาเกินไปกว่าที่ผมจะได้ทำอย่างอื่น

ธีมที่ใช้คือ [Astro Paper](https://github.com/satnaing/astro-paper) เพราะว่ามันดู
minimal และเข้ากับสไตล์ตัวผมอย่างดี

## แก้อะไรไหม

ผมแก้สีของธีมนี้นิดหน่อย โดยแก้ Light theme ให้เป็น Leaf Blue และ Dark theme เป็น Pikky Dark
สามารถดูตัวอย่างได้ที่ [https://astro-paper.pages.dev/posts/predefined-color-schemes/](https://astro-paper.pages.dev/posts/predefined-color-schemes/) ครับ

แล้วก็มีแก้ theme ของ Shiki ให้เป็น vitesse-dark รวมถึงเพิ่มของที่ custom เองอย่างตัว webring

เรื่อง font ผมแก้ให้ใช้ IBM Plex Sans Thai สำหรับหัวเรื่องกับ IBM Plex Sans Thai Looped สำหรับตัวเนื้อความ font ภาษาอังกฤษผมใช้ IBM Plex Mono ตาม default ของ theme ครับ

ส่วนที่เหลือจะเป็นการแก้ให้รองรับภาษาไทย อย่างตัว `remark-toc` กับ `remark-collapse` ก็มีการแก้ regex เพิ่มคำว่า สารบัญ เข้าไป ตอนนี้เว็บของผมจะยังไม่รองรับการเปลี่ยนภาษา แต่อาจจะทำเพิ่มถ้ามีเวลาในอนาคต

## Deploy ยังไง

ผมใช้ [CloudFlare Pages](https://pages.dev) deploy และโดเมนก็ใช้ของ CloudFlare เหมือนกันครับ
ผมเพิ่งรู้ว่า Build system แบบ 2 รองรับ pnpm แล้วเลยใช้ pnpm แทน npm ไปเลยครับ

## เจอปัญหาอะไรไหม

ดูเหมือนว่า [Satori](https://github.com/vercel/satori) (ตัว generate รูปสำหรับแชร์ลงโซเชียล) จะไม่รองรับภาษาไทย ไม่ใช่ว่ามันเขียนภาษาไทยไม่ได้นะ แต่แค่มีปัญหาสระจม ที่สำคัญการ import font ก็ต้อง import เป็น `Buffer` หรือ `ArrayBuffer` ซึ่งผมไม่เข้าใจว่าทำไมต้องทำแบบนี้

เรื่อง import มีปัญหาเพราะว่าตอน build มันดึงจาก `import.meta.url` แล้วไฟล์มันอยู่คนละที่ แต่ตอน dev ไม่มีปัญหาอะไรเลย

## แก้ยังไง

เรื่องสระจนปัญญาจริง ๆ นึกไม่ออกแล้ว ส่วนเรื่องดึง font ผมใช้ [jsDelivr + GitHub](https://www.jsdelivr.com/?docs=gh) เพื่อเป็น CDN
ให้ font เป็นการชั่วคราว (เสียงพี่แท็ค) ผมมองว่ามันไม่ควรเป็นแบบนี้เพราะว่าจะทำให้ผมต้อง commit font ไปก่อนที่จะ commit โค้ดจริง ๆ แถมแก้ชื่อโฟลเดอร์ชื่อไฟล์ลำบากด้วย

## แล้วรู้สึกเป็นไงบ้าง

สำหรับผมแล้วการย้ายเว็บใหม่ก็ไม่ใช่เรื่องยากอะไร ยิ่งเรามี tools สะดวก ๆ ก็ยิ่งลดเวลาไปอีก รอบนี้ผมก็ไม่ได้ทำ theme เองเหมือนเดิมเลยประหยัดสมองไปได้มากเลย คิดว่าผมน่าจะลงโพสได้ถี่กว่าเดิมเพราะไม่ต้องมาห่วงเรื่องเว็บแล้วล่ะครับ
