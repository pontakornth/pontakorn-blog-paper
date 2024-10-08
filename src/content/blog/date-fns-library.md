---
title: จัดการวันเวลาง่ายขึ้นด้วย date-fns
description: date-fns เป็นหนึ่งในไลบรารี่สำหรับจัดการ datetime ใน JavaScript
postSlug: date-fns-library
ogImage: "@assets/images/date-fns.png"
pubDatetime: 2024-09-06T15:00:00.000Z
tags:
  - javascript
  - datetime
  - programming
---

## สารบัญ

## Moment(.js) ที่เราเคยรักกัน

โอเค ผมไม่มีมุกอื่นที่ดีกว่านี้ล่ะ

เวลาเราทำโปรแกรมที่ advance ขึ้นมาหน่อยเราก็คงจะต้องยุ่งกับวันเวลาอยู่แล้ว ยิ่งถ้าเราจำเป็นต้องทำโปรแกรมให้รองรับหลายประเทศหลายภูมิภาค มันก็จะทำให้การยุ่งเกี่ยวกับเวลาค่อนข้างสำคัญ

การจัดการวันเวลาในภาษา JavaScript ก็ไม่ใช่ว่ามันจะดีเท่าไหร่ ลองเดาดูว่าโค้ดข้างล่างนี่จะเป็นเวลาอะไร

```typescript
const deadline = new Date("01/12/2000");
```

ถ้าตอบว่าวันที่ 1 ธันวาคม 2000 **คุณตอบผิด** เพราะว่า JavaScript ยึดฟอร์แมตตามแบบอเมริกา (เดือน/วัน/ปี) ทำให้ `deadline` กลายเป็นวันที่ 12 มกราคม 2000 **ซึ่งต่างกันหลายเดือนมากเลยนะครับ**

สมมติว่าเราอยากจะรู้ว่าเวลาตอนนี้เลยเดดไลน์ไปกี่วันแล้ว เราจะทำอะไรได้บ้าง เราก็เอามาลบกันแล้วก็คำนวณอีกที

```typescript
const current = new Date("01/13/2000");
const diffInMilliseconds = current - deadline;
// 1 day = 24 hours
// 1 hour = 3600 seconds
// 1 seconds = 1 milliseconds
const diffInDays = diffInMilliseconds / 1000 / 3600 / 24;
```

ถ้าเราทำครั้งสองครั้งมันก็คงไม่มีปัญหาเท่าไหร่ แต่ลองนึกดูว่าถ้าเราต้องมานั่งคำนวณวันเวลาหลาย ๆ รอบ บวกลบวันเวลา เปลี่ยนเวลาบางส่วน ถ้าใช้ JavaScript อย่างเดียวคงยุ่งยากแน่

```typescript
// True now
const now = new Date();
const t = new Date(now.valueOf());
t.setDate(t.getDate() + 1);
// JavaScript object is a reference type.
// This prevents accidental mutation.
const tomorrow = new Date(t.valueOf());
```

เพราะเรื่องนี้ทำให้มีคนทำ Moment.js ขึ้นมาเพื่อทำให้การทำงานกับวันเวลาง่ายขึ้น

## บวม

Moment.js ออกแบบมาด้วยแนวคิด OOP ซึ่งหมายความว่าการจัดการวันเวลาจะอยู่ใน object และไลบรารี่ตัวนี้ก็เขียนมาตั้งแต่สมัยพระเจ้าเหาที่ 1 ดังนั้นก็ไม่ต้องแปลกใจว่าทำไม library มันถึงใหญ่

ที่สำคัญเรื่องวันเวลาเป็นเรื่องสำคัญตอนที่เราทำแอพให้รองรับหลาย ๆ ประเทศหรือหลาย ๆ ภาษา ทำให้ Moment.js ต้องรวมการอะไรหลาย ๆ อย่างเข้าไปในไลบรารี่ ทำให้ขนาดค่อนข้างใหญ่ ยิ่งถ้าเรามี frontend ที่มี JavaScript เยอะ ๆ ยิ่งจะทำให้ผู้ใช้ต้องโหลด JavaScript เข้าไปเยอะ ๆ ซึ่งอาจจะทำให้แอพช้าได้

## date-fns

เพราะปัญหาที่ Moment.js มี ทำให้ผู้พัฒนามองว่ามันเป็น legacy project ไปแล้ว พูดง่าย ๆ ก็คือจะไม่มี feature ใหม่หรือการเปลี่ยนแปลงที่มีผลกับผู้ใช้มาก ๆ จะมีการแก้ก็ต่อเมื่อมีการเปลี่ยนเรื่องเวลาตามกฎหมายหรือแก้ปัญหาความปลอดภัย

date-fns เป็นหนึ่งในไลบรารี่ที่ผู้พัฒนาแนะนำให้มาใช้แทน Moment.js ไลบรารี่ตัวนี้จะทำงานกับ `Date` ที่มีอยู่ใน JavaScript อยู่แล้ว ทำให้สามารถใช้งานร่วมกับไลบรารี่ตัวอื่น ๆ ที่อาจจะไม่สามารถรองรับ custom object ได้

## ฟังก์ชั่นและฟังก์ชั่น

date-fns ออกแบบมาให้เป็นไลบรารี่ที่รวบรวมฟังก์ชั่นที่ทำงานกับ `Date` ทำให้สามารถ import เฉพาะสิ่งที่ต้องการใช้งานได้โดยที่ไม่ต้องเอาของที่ไม่ได้ใช้งานมาด้วย

การที่สามารถหยิบเฉพาะของที่จำเป็นทำให้ date-fns สามารถใช้งานร่วมกับสิ่งที่เรียกว่า tree-shaking ที่จะคัดโค้ดเฉพาะส่วนที่เราใช้งานออกมา ขนาด JavaScript ตอนที่ build ออกมาก็จะเล็กกว่าโค้ดที่ไม่สามารถใช้เทคนิคนี้ได้

```typescript
import { format, formatDistance, formatRelative, subDays } from "date-fns";

format(new Date(), "'Today is a' eeee");
//=> "Today is a Sunday"

formatDistance(subDays(new Date(), 3), new Date(), { addSuffix: true });
//=> "3 days ago"

formatRelative(subDays(new Date(), 3), new Date());
//=> "last Friday at 7:26 p.m."
```

นี่เป็นโค้ดตัวอย่างที่ผมดึงมาจาก https://date-fns.org/ จะเห็นว่าการใช้งานก็เหมือนใช้ฟังก์ชั่น utility ต่าง ๆ เลยครับ
