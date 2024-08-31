---
title: การใส่ type hint ในภาษา Python
description: ทำไมเราถึงมี type ใน Python ด้วยล่ะ
postSlug: type-hint-in-python
pubDatetime: 2024-08-31T10:00:00.000Z
tags:
  - python
---

## สารบัญ

## ว่าด้วย Python

ภาษา Python เป็นภาษา dynamic type หมายความว่า type จะถูกเช็คตอนที่รันโปรแกรม
ไม่ใช่ตอนที่คอมไพล์โค้ด และไม่จำเป็นตอนกำหนด type ให้กับตัวแปร

```python
variable = 3
variable = "This"
```

จะเห็นว่าตัวแปร variable สามารถเปลี่ยนจาก `int` เป็น `str` ได้โดยที่เราแค่เปลี่ยนค่าเท่านั้น

## แล้วหมายความว่ายังไงล่ะ

ถ้าตัวแปรสามารถเป็นชนิดอะไรก็ได้ ก็หมายความว่าเราไม่มีทางรู้เลยว่าตัวแปรมันเป็น type อะไรจนกระทั่งเราอ่านค่ามัน

```python
# Simplified..
class Movie:
    def __init__(self, movie_id, name, file):
        self.movie_id = movie_id
        self.name = name
        self.file = file
```

โค้ดนี้ก็ดูเหมือนว่าจะไม่มีปัญหาอะไร แต่ถ้าดูดี ๆ แล้วจะเห็นว่ามีจุดที่อาจจะเข้าใจไม่ตรงกันได้หลายจุด

- `movie_id` จะเป็น `int` ตาม primary key ที่เพิ่มจำนวนก็ได้ หรืออาจจะเป็น `str` ในกรณีที่ใช้ ID คล้าย ๆ กับใน YouTube ก็ได้ หรืออาจจะเป็น UUID ตาม library ที่ generate มาก็ได้
- `file` อาจจะหมายถึงชื่อไฟล์ในระบบ หรือตัวไฟล์ที่เป็น binary ไปเลยก็ได้

ปัญหาพวกนี้สามารถแก้โดยการใช้ comment หรือ docstring ได้ แต่ก็จะมีอีกเรื่องนึงที่ comment แก้ไม่ได้

## Autocomplete

สมมติว่าเรามีตัวแปรชื่อว่า `file` อยู่ในโปรแกรม เรายังไม่รู้ว่า `file` นี่ หมายถึงอะไร อาจจะเป็นชื่อไฟล์, binary ที่โหลดเข้ามา, เนื้อหาที่โหลดเข้ามาเป็น string, ไฟล์ CSV ใน library, หรืออื่น ๆ อีกเพียบ คราวนี้ถ้าสมมติว่าโค้ดเรามันยาว และก็มีการส่งตัวแปร `file` ไปหลาย ๆ ฟังก์ชั่น ก็จะยิิ่งตามยากไปอีก

Python เป็นภาษา dynamic type ดังนั้น IDE ก็คงไม่รู้เหมือนกันว่า `file` มันเป็นอะไร และมี method อะไรบ้าง ถ้าจะเสนอ autocomplete ให้ก็คงไม่ได้ อย่างมากก็อาจจะได้แค่ method ทั่วไปที่มีกันทุกชนิด (แต่ผมก็ยังไม่เห็น autocomplete แบบนี้เลยนะ)

ถ้าเราอยากให้ IDE สามารถ autocomplete ได้ เราก็ควรจะบอกว่าตัวแปรนี้ "ควร" เป็นชนิดอะไร IDE จะได้เสนอ autocomplete ได้ถูก

## การใส่ type ใน Python

แม้ว่า Python จะเป็นภาษา dynamic typing แต่เราก็สามารถเพิ่ม type ให้กับตัวแปรได้โดยการใส่ type hint ให้กับตัวแปร

```python
class Movie:
    def __init__(self, movie_id: int, name: str, file: str):
        self.movie_id = movie_id
        self.name = name
        self.file = file
```

หลังจากนี้เราก็จะรู้ว่า `movie_id` เป็น `int` `name` กับ `file` เป็น `str` (อาจจะเป็นชื่อไฟล์หรือ path ก็ได้) ดังนั้น IDE ก็จะสามารถเสนอ autocomplete ได้สบาย ๆ เลย

## Type hint ไม่ได้ทำให้ Python เป็น static type

การใส่ type ใน Python ไม่ได้ทำให้โปรแกรม error แต่อย่างใด เนื่องจาก Python interpreter ก็ไม่ได้เช็ค type ตัวแปร แค่จะเอาไว้บอก dev กับ IDE เท่านั้น

หมายความว่าเราก็ยังเขียนโค้ดแบบนี้ได้

```python
def is_odd(n: int) -> bool:
    return n % 2 != 0

is_odd('hello')
```

แต่อย่าทำ อย่าทำ นอกจากทำให้ IDE แดงแล้วจะทำให้ dev ด้วยกันมีปัญหาอีกด้วย
