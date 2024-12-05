---
title: ทดสอบโปรแกรมง่ายกว่าเดิมด้วย Testcontainers
description: ใช้ Testcontainers เพื่อสร้าง container สำหรับ test
postSlug: easier-testing-with-testcontainers
ogImage: "@assets/images/easier-test-with-testcontainers.png"
pubDatetime: 2024-12-05T09:00:00.000Z
tags:
  - testing
  - docker
  - programming
---

## สารบัญ

## บทบาทของ Container ในการพัฒนาโปรแกรม

ตอนนี้ก็ปี 2024 จะเข้าปี 2025 แล้ว การที่เราจะต้องมานั่งลงระบบต่าง ๆ บนเครื่องตัวเองก็ค่อนข้างจะเสียเวลาพอสมควร ยิ่งโปรแกรมที่มีความซับซ้อนหนัก ๆ
ชนิดที่ต้องใช้ Database, Cache, หรือ Message Queue หลาย ๆ ตัวก็คงลำบาก
แถมถ้าจะต้องพัฒนาของหลายอย่างในเครื่อง ๆ ก็คง setup ลำบาก เสียเวลาที่จะใช้ไปกับการเขียนโปรแกรมมาเพื่อ setup ระบบแทน

แต่ปัจจุบันเรามีสิ่งที่เรียกว่า container ที่สามารถอัพระบบต่าง ๆ ลงมารันได้โดยที่เราไม่จำเป็นจะต้องติดตั้งหรือ config อะไรที่ซับซ้อน
อย่างเช่น Postgres สำหรับ development ก็ set แค่ username, password และ database ที่ต้องใช้เท่านั้น ก็สามารถรันได้เลยโดยใช้ Docker หรือโปรแกรม container ตัวอื่น ๆ อย่าง Podman

## Environment สำหรับการทดสอบที่ดี

ปกติแล้วเราก็จะมี development environment ที่ไว้ให้โปรแกรมเมอร์ได้ใช้งานกัน เช่น ลองสร้าง
order สินค้าที่มีลักษณะแปลก ๆ ดูว่าจะเกิดอะไรขึ้น ซึ่งก็จะทำให้โปรแกรมเมอร์รู้ว่าจะเกิดอะไรขึ้นได้บ้างกับโปรแกรมที่ตัวเองพัฒนาอยู่

ซึ่งการทดสอบโปรแกรมแบบนี้มันก็จะดีอยู่ในระดับหนึ่ง แต่ว่าถ้าจะดีกว่านั่นก็ควรเป็นการทดสอบแบบอัตโนมัติ พูดง่าย ๆ ก็คือเราอาจจะแค่รันไฟล์บางอย่าง มันก็จะทดสอบที่เราต้องการได้เอง

ถ้าจะให้ดี environment สำหรับการทดสอบควรจะแยกออกจาก development และก็ควรจะหายไปตอนทดสอบเสร็จ (หรือไม่ก็เก็บไว้เพื่อดูย้อนหลังเฉย ๆ) สมมติว่าเราจะทดสอบการสร้าง user ก็คงไม่ค่อยดีถ้าเราจะมี user สำหรับทดสอบเต็มไปหมด หรือถ้าจะทดสอบว่าร้านที่ไม่มีสินค้าจะแสดงถูกต้องไหม ก็คงไม่ดีถ้าเราจะมีร้านเปล่า ๆ เต็มไปหมด

## Docker กับ test environment

Docker เป็นอะไรที่เราสร้างและก็ลบได้ง่าย ๆ ทำให้เหมาะกับการสร้าง test environment พอสมควร

ถึงอย่างนั้น การใช้ Docker ทั่ว ๆ ไปเพื่อการ test ก็มีข้อจำกัด

- ถ้าเรารัน docker หนึ่งครั้งแต่ใช้หลาย test ก็มีโอกาสที่ผลลัพธ์ของ test บางตัวส่งผลต่อ test อีกตัว
- ถ้าเรารัน docker ตามจำนวน test ก็จะใช้เวลามากขึ้น
- เราไม่สามารถรัน docker หลาย ๆ ตัวพร้อมกันได้ในกรณีที่ต้องการจะใช้ port เดียวกัน ซึ่งทำให้ต้องไป config อีก

พอเจอปัญหาพวกนี้ ทำให้เกิด Testcontainers ขึ้นมา

## Testcontainers

Testcontainers เป็นชื่อของ library ที่จะช่วยสร้าง Docker container มาเพื่อทำการ test โดยเฉพาะ
ผู้ใช้งานไม่จำเป็นต้องเขียน docker file แต่จะเรียกใช้โค้ดของ Testcontainers ซึ่งจะสร้าง container อีก

```typescript
const redis = await new GenericContainer("redis:5.0.3-alpine")
  .withExposedPorts(6379)
  .withWaitStrategy(Wait.forLogMessage("Ready to accept connections"))
  .start();
```

โค้ดด้านบนเป็นโค้ด TypeScript ที่เอาไว้สร้าง Testcontainers ของ Redis และเปิด Port 6379 จากตัว container
แล้วให้รอข้อความ `Ready to accept connections` ขึ้นถึงจะนำมาใช้ได้

Testcontainers จะสร้าง container ตามโค้ดที่เราเขียนไว้และเปิด port ตามที่เราต้องการ แต่ว่า port 6379 จากข้างใน container
จะเป็น port อะไรก็ตามที่ว่างอยู่ตอนที่สร้าง container ซึ่ง Testcontainers จะจัดการส่วนนี้ให้

แน่นอนว่าถ้า port มันมาจากสิ่งที่ Testcontainers สร้างให้ เราก็สามารถดึงข้อมูลจากโค้ดที่เราเขียนได้เลย

```typescript
const redisPort = redis.getMappedPort(6379);
```

## Modules ที่หลากหลาย

ส่วนใหญ่แล้ว Docker image ที่เราใช้มักจะเป็นอะไรที่ใช้กันทั่วไปอยู่แล้ว เช่น Postgres หรือ Redis
Testcontainers มักจะมี module เฉพาะสำหรับของพวกนี้อยู่แล้ว ทำให้เราสามารถใช้งานของพวกนี้ได้ง่ายกว่าเดิม

```typescript
async function connectTo(container: StartedRedisContainer) {
  const client = createClient({
    url: container.getConnectionUrl(),
  });
  await client.connect();
  expect(client.isOpen).toBeTruthy();
  return client;
}
```

อันนี้เป็นโค้ดตัวอย่างที่ผมดึงมาจาก [documentation](https://node.testcontainers.org/modules/redis/) ของ Redis
module สำหรับ Testcontainers จะเห็นว่าเราไม่จำเป็นต้อง setup username, password, หรือ port เลย แต่เราใช้โค้ดสร้าง connection string ออกมา

## ข้อควรระวัง

การใช้ Testcontainers จะมีข้อควรระวังอย่างหนึ่งคือการ setup environment ที่เกิดขึ้นหลังจากนั้น เช่น migrate database
ที่จะต้องทำในโค้ดที่เราจะ test ดังนั้นถ้าต้องการจะใช้ Testcontainers ก็ควรดูด้วยว่าเราจะสามารถ setup ของต่าง ๆ ด้วยโค้ดหรือ script ได้ไหม

## ที่มาข้อมูล

https://testcontainers.com/
