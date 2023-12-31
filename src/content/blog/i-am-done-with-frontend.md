---
title: ผมเบื่อ frontend แล้ว
description: ผมไม่ได้รู้สึกอยากทำ frontend อีกแล้ว
postSlug: i-am-done-with-frontend
ogImage: "@assets/images/frontend-og.png"
pubDatetime: 2023-12-11T16:02:30.490Z
tags:
  - personal
  - career
---

โพสนี้ไม่ได้แปลว่าผมไม่คิดว่าจะทำงาน frontend ต่อนะ แค่ผมรู้สึกว่ามันไม่ใช่ทางของผมอีกแล้ว

## สารบัญ

## เรื่องมันเป็นแบบนี้

ถ้าใครมาส่อง GitHub ของผมดูว่าผมเคยทำงานอะไรมาบ้าง ก็จะเห็นว่างานส่วนใหญ่ของผมแทบจะเป็น frontend เกือบทั้งหมด
ผมทำเรื่องนี้ตั้งแต่สมัยอยู่มัธยมและตอนนี้อยู่มหาวิทยาลัยปีสุดท้ายแล้วก็ยังทำอยู่ ทำไปหลาย ๆ framework ตั้งแต่ React, Vue, Svelte, Solid, Preact เหลือแค่ Angular ที่ไม่ได้ทำ นอกจากนี้ก็ยังมีพวก Alpine.JS ที่ใส่หน้า static website หรือ Hyperscript ที่ทำแบบเดียวกัน แต่เขียนเหมือนภาษาอังกฤษ

สาเหตุที่ผมเลือกทำ frontend มากกว่าที่จะทำอย่างอื่นเพราะว่ามันเป็นสิ่งที่เอามาโชว์ให้คนอื่นดูได้ง่าย ๆ อย่างเว็บที่คุณอ่านบทความนี้อยู่ ผมก็แค่ deploy ใน [CloudFlare pages](https://pages.dev) ก็เอามาให้คนอื่นดูได้แล้ว แถม tutorial ก็ยังเยอะทำตามได้ง่าย ๆ ตั้งแต่ Counter ยัน Twitter(X) Clone

ในตอนนั้นมันเป็นอะไรที่ผมชอบทำมาก ๆ ผมสนุกกับการเขียน framework ใหม่ ๆ สนุกกับการทำเว็บลอยกระทงออนไลน์ที่ไม่มีใครใช้ ทำเว็บ quiz สุ่มชื่อ มีหลายอย่างจนผมก็จำไม่ค่อยได้

## แล้วเกิดอะไรขึ้น

พอทำมาเรื่อย ๆ ก็รู้สึกว่าเริ่มที่จะตัน อะไรหลาย ๆ อย่างที่เคยทำก็ไม่ได้รู้สึกสนุกอีกแล้ว เหมือนภูเขาน้ำแข็งที่ผมเริ่มจะเห็นด้านที่ไม่ลอยน้ำมากขึ้นเรื่อย ๆ อย่างเช่นเรื่อง Accessiblity ที่ทำให้ผู้พิการสามารถใช้งานเว็บได้ หรือคนปกติที่ชื่นชอบความเร็วสามารถใช้ keyboard ในการ navigate ได้

พอทำมาเรื่อย ๆ มันก็ถึงจุดหนึ่งที่แอพมีแค่ frontend อย่างเดียวไม่ได้แล้ว สักพักก็จะต้องมี backend เข้ามาเกี่ยว เช่น การเก็บ note ไว้ในไฟล์ server การเรียก API แล้วก็ต้องมีเรื่องให้คิดอีกเยอะ อย่างเช่นจะ render บน client หรือ server ดี
ทำระบบยืนยันตัวตนยังไง บางส่วนก็มีตัวช่วยอย่าง Firebase แต่ไม่ใช่ทุกงานจะเหมาะกับ tool นี้

อีกอย่างผมเองไม่ชอบที่จะติดอยู่ในอะไรเดิม ๆ ตลอด งานนี้แทบจะบังคับให้ใช้ JavaScript หรือไม่ก็ TypeScript เลย ต่อให้มีภาษาที่สามารถแปลงเป็น JavaScript เช่น Kotlin, Elm แต่มันก็ไม่ได้พร้อมเท่ากับ JavaScript อยู่ดี WebAssembly มันก็ไม่ได้ดีขนาดนั้น ขนาด Blazor ก็ยังต้องพึ่ง JavaScript บางส่วนอยู่ดี

## แล้วเอายังไงต่อ

ผมก็คิดว่าอยากลองเปลี่ยนมาทำ Backend ดูบ้าง โชคดีที่งานมหาวิทยาลัยจำเป็นต้องมี backend อยู่แล้ว
เลยได้มีโอกาสใช้ Django ที่ห่างหายมานานมาก (เวอร์ชันแรก ๆ ที่ผมใช้ตอน ม.ต้น คือ 1.7) และก็มีเพื่อนดี ๆ ที่ช่วยทำให้งานส่วนนี้ง่ายขึ้น อย่าง [HelloYeew](https://github.com/helloyeew) ที่ทำ template [Ayaka](https://github.com/HelloYeew/ayaka) ที่เป็น template Django
ที่มี configuration ทั้ง SQLite และ Postgres ให้เรียบร้อยแล้ว ช่วยให้งานเสร็จเร็วกว่ากลุ่มอื่นมาก ๆ

นอกจากนี้ผมเลือกฝึกงานในตำแหน่ง Backend Developer ที่บริษัท Agoda ซึ่งทำให้ผมต้องเขียน Scala และใช้งาน Spark มันก็เป็นงานที่ท้าทายมาก ๆ เพราะผมไม่เคยทำงานระบบใหญ่ ๆ ที่ใช้ tool อื่น ๆ เยอะ
อย่าง Spark ก็ไม่ได้เป็นอะไรที่แถมมากับ Play framework รวมถึงทำงานข้าม repo อีกด้วย

ผมเปลี่ยน Project จบที่ผมเรียกได้ว่าเกลียด เปลี่ยนจาก web เป็น game ก็เปิดให้ผมลองเขียน Game ด้วย เอาจริง ๆ มันค่อนข้างเสี่ยงเพราะว่าเป็น field ใหม่ที่ผมไม่เคยลอง แต่ไหน ๆ project จบก็ต้องใช้ความรู้นอกห้องเรียนอยู่แล้วก็ถือว่าเป็นการท้าทายตัวเอง

## แล้วผมจะหยุดทำ frontend ไหม

ไม่ครับ แค่ผมทำเว็บนี้ก็ถือว่าผมทำอยู่นะ มันไม่ได้เป็นเว็บสำเร็จ ผมก็ยังแก้โค้ดบางส่วน ทะเลาะกับ Satori (ตัว generate thumbnail ตอนนี้สระจมครับ sad) ขนาดตอนฝึกงานก็มี React ที่ต้องทำ
ซึ่งงานช้างกว่าที่ผมเคยทำเยอะพอสมควร

ถ้าผมเบื่อ backend หรือ game แล้วก็อาจจะกลับมา frontend มีอะไรให้เล่นเยอะมาก เช่น CSS-in-JS ระบบ state manager แบบใหม่ (อีกแล้ว) หรือ JavaScript framework ที่เรียกได้ว่าออกใหม่ทุกนาทีเลยมั้ง55

## สรุป

สรุปแล้วก็คือผมอยากลองอะไรใหม่ ๆ เนี่ยแหละ ผมกำลังจะจบแล้วต้องหางานทำต่อ ผมก็อยากให้ผมมีตัวเลือกในอนาคตมากกว่าเดิม และไปได้ไกลกว่าเดิม ผมหวังว่าผมจะคิดถูกนะ
