---
title: Object Pool คืออะไร
description: Object Pool และทำไมต้องมีสิ่งนี้
postSlug: what-is-an-object-pool
ogImage: "@assets/images/what-is-an-object-pool/example-screenshot.png"
pubDatetime: 2023-12-15T14:30:00.000Z
tags:
  - design pattern
  - game development
---

ช่วงนี้ผมกำลังเตรียมเปลี่ยน project ไปทำเกมเลยนึกได้ว่าเคยเรียนเรื่องนี้ คิดว่าน่าจะเป็นโพสแรกที่ดีสำหรับการเปิดตัวบล็อกอันใหม่

## สารบัญ

## สร้าง ลบ สร้าง ลบ

เวลาทำเกมก็มักจะมีบางอย่างที่อาจจะต้องสร้างจำนวนมาก ๆ หรือต้องสร้าง ๆ ลบ ๆ บ่อย ๆ
สมมติว่าผมกำลังทำเกมยิง 2D ง่าย ๆ ที่คนเล่นบังคับยานอวกาศให้ยิงกระสุน

![Space Shooter Game example](@assets/images/what-is-an-object-pool/example-screenshot.png)

<span class="text-sm">ตัวอย่าง Screenshot เกม Game Shooter จาก [Kenney.nl](https://opengameart.org/content/space-shooter-redux)</span>

</div>

เวลาเรายิงกระสุนครั้งนึง มันก็มักจะมี object ของตัวกระสุนโผล่มาในแต่ละครั้ง ถ้าเรายิง 300 นัด
ก็มี 300 objects ถ้าเรามีกระสุนเยอะมาก ๆ เกมของเราก็จะเริ่มใช้ความจำเพิ่มขึ้นเรื่อย ๆ

นอกจากนี้เราก็ไม่อยากให้กระสุนที่ยิงไปสุดขอบจักรวาลอยู่ในเกมเพราะมันไม่มีประโยชน์ กระสุนที่ยิงจนเกินเขตไปแล้วจะไม่ไปชนอะไรอยู่แล้ว เราจะเก็บมันไว้ทำไม วิธีแก้ง่าย ๆ ก็คือลบ object กระสุนที่พ้นเขตไป เท่านี้กระสุนที่ไร้ประโยชน์ก็ไม่ทำให้เกมเรากิน memory แล้ว

แต่มันก็ไม่จบแค่นั้น การสร้าง object อันนึงก็ไม่ใช่ว่าจะได้มาฟรี ๆ อย่างน้อยก็ต้องหาที่อยู่ใน
RAM ให้กับมัน แถมการลบก็ต้องไปบอกว่า memory ตรงนั้นใช้ได้แล้วนะ ถ้าเราทำบ่อย ๆ ก็เหมือนกับว่าเรา
check in และ check out โรงแรมกันวันละสิบ ๆ กว่ารอบ และเขียนว่าแขกคนนี้เข้าพัก แขกคนนี้ออกตลอดเวลาแบบไม่พักไม่เว้นกันเลย CPU ควรจะได้ทำอะไรที่มีประโยชน์มากกว่านี้

## Reuse สิครับรออะไร

ถ้าเกิดว่าเราจะมี object เยอะ ๆ แล้วจากนั้นก็สร้างมันเตรียมไว้ในกล่อง พอจะใช้ก็หยิบมา ใช้เสร็จเก็บคืน นี่คือไอเดียของ Object Pool

## Object Pool ใช้ที่ไหนได้บ้าง

Object Pool เป็น design pattern ที่ค่อนข้างพบได้บ่อยในวิดีโอเกม อย่างเช่นการสร้างกระสุนที่ผมกล่าวไว้ก่อนหน้า เพราะว่ามีโอกาสที่ได้ใช้บ่อย

นอกจากนี้ก็จะพบในพวก Thread pool ที่ใช้สำหรับการเอา thread ที่มีอยู่แล้วมาประมวลผลงาน หรือ connection pool ที่เอาไว้เก็บ connection ของ database

## ตัวอย่าง

อันนี้เป็นตัวอย่าง Object Pool ในภาษา Python ผมเอาโค้ดจาก ChatGPT มาปรับแต่งให้ถูกต้องมากขึ้นเล็กน้อย

```python
class ObjectPool:
    def __init__(self, max_objects):
        self.max_objects = max_objects
        self.pool = []
        # Object pool instantiate objects
        for _ in range(max_objects):
            self.create_object()
        self.in_use = set()

    def create_object(self):
        if len(self.pool) < self.max_objects:
            obj = len(self.pool) + 1  # For demonstration, create simple numbered objects
            self.pool.append(obj)
            return obj
        else:
            return None

    def acquire_object(self):
        if self.pool:
            obj = self.pool.pop()
            self.in_use.add(obj)
            return obj
        else:
            return None

    def release_object(self, obj):
        if obj in self.in_use:
            self.in_use.remove(obj)

            self.pool.append(obj)
```

`in_use` มีไว้ track ว่า object ตัวไหนถูกใช้งานอยู่บ้าง การสร้าง Object Pool จะมีการสร้าง objects เตรียมไว้แล้วตามจำนวนที่ต้องการ

## Object Pool จริง ๆ

Object Pool เป็นอะไรที่ค่อนข้างทั่วไปทำให้มี library หลาย ๆ ตัวมี object pool ไว้ใช้งาน การ implement ตัว object pool เองอาจจะไม่ค่อยดีนักเพราะอาจจะมี case บางอย่างที่เราไม่ได้นึกถึง เช่น การทำให้ object pool thread safe เป็นต้น ถ้าเป็นไปได้ การใช้ Object Pool ที่มากับ library ของสิ่งที่เราจะทำเช่น `ObjectPool` ของ Unity อาจจะเหมาะสมกว่า
