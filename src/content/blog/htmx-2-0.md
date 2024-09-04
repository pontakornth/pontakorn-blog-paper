---
title: HTMX ออกเวอร์ชั่น 2.0 แล้ว
description: ในที่สุด HTMX ก็ออกเวอร์ชั่น 2.0 แบบเสถียร
postSlug: htmx-2-0
pubDatetime: 2024-06-18T07:00:00.000Z
tags:
  - web development
  - htmx
---

## สารบัญ

## HTMX คืออะไร

HTMX เป็น JavaScript framework (ผมมองว่าเป็น framework นะ) ตัวหนึ่งที่ใช้หลักการ
hypermedia ในการทำเว็บแทนที่จะ render หน้าเว็บตัว JavaScript ฝั่ง client

การทำเว็บด้วย HTMX จะคล้าย ๆ กับทำเว็บสมัยก่อนที่จะส่ง HTML ที่ render มากจากฝั่ง
server แต่ว่า HTMX สามารถเลือก HTML บางส่วน ส่ง request อื่น ๆ ที่ไม่ใช่ POST กับ GET
หรือแม้กระทั่งอัพเดตเพจแบบเรียลไทม์ก็ทำได้

## มีอะไรใหม่บ้าง

- Extensions อย่างเช่นส่วนที่ต่อ WebSocket ได้ย้ายไป[ที่อื่น](https://extensions.htmx.org/) แล้ว รวมถึงส่วนที่โหลดมาใช้งานก็ไป URL อันอื่นเหมือนกัน (URL เดิมจะใช้ให้คนที่ยังไม่อัพเดตเท่านั้น)
- การต่อกับ [Server Sent Event](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events) และ WebSocket ย้ายไปใน extension แล้ว
- `DELETE` จะใช้ request parameter แทน request body ตามใน [spec](https://www.rfc-editor.org/rfc/rfc7231#section-4.3.5)
- มีไฟล์สำหรับ UMD, AMD, และ ESM ใน folder `dist`
- `hx-on` จะแก้เปลี่ยน `hx-on:event-name`
- ใช้ smooth scrolling เป็นค่า default
- จะส่ง request ออกข้างนอกโดเมน (เช่น example.com จะส่งเข้า example2.com) ไม่ได้แล้ว ยกเว้นจะไปตั้งค่าใน `htmx.config.selfRequestsOnly` ให้เป็น `false`
- นอกจากนี้จะมีการรองรับ Web Component ที่ดีกว่าเดิม
- เว็บ htmx.org รองรับ dark mode

## ที่มา

https://htmx.org/posts/2024-06-17-htmx-2-0-0-is-released/
