---
title: เขียน Unit Test ใน Python ด้วย unittest และ pytest
description: เขียน Unit Test ทั้งสองแบบใน Python กันเถอะ
postSlug: python-unit-test
pubDatetime: 2024-08-09T14:00:00.000Z
ogImage: "@assets/images/unittest-in-python.png"
tags:
  - python
  - programming
  - testing
---

## สารบัญ

## Unit test คืออะไร

Unit test เป็น test ที่เขียนมาเพื่อทดสอบส่วนเล็ก ๆ ของระบบที่เราเรียกว่า unit ซึ่งอาจจะหมายถึงฟังก์ชั่นตัวหนึ่ง controller อันหนึ่ง หรือ class หนึ่งก็ได้ แล้วแต่คนจะนิยาม

Unit test ที่ดีควรจะ test แค่สิ่งที่ต้องการโดยที่ไม่พึ่งหาสิ่งอื่น ๆ มากเกินไป อย่างเช่นถ้าจะ test ฟังก์ชั่นคำนวณราคาก็ไม่ควรจะต้องมีการล็อกอินหรือต่อ database เป็นต้น

หัวข้อนี้อาจจะต้องมาในโพสต์อื่น ผมจะอธิบายเรื่องการเขียน unit test ใน Python โดยใช้ทั้ง
`unittest` และ `pytest`

## สร้างโค้ดขึ้นมา test

ก่อนที่เราจะมี test เราก็ควรจะมีโค้ด (หรือรู้ว่าจะ test อะไร) ก่อน ใน TDD บางทีก็จะสร้าง test ก่อนโค้ด แต่ผมมองว่ามันจะทำให้ tutorial นี้ยุ่งยาก

ให้ผู้อ่านสร้าง virtualenv สำหรับ python มาใน folder สักอันนึงก่อนที่จะเริ่มทำตาม เพราะว่าเราจะต้องติดตั้ง pytest ที่เป็น library ด้วย pip ครับ

สิ่งที่เราจะทดสอบคือโค้ด fibonacci

```md
fibonacci(0) = 0
fibonacci(1) = 1
fibonacci(n) = fibonacci(n - 1) + fibonacci(n - 2)
```

ถ้าเราเขียนโค้ด Python แบบง่าย ๆ ก็จะได้ตามนี้

```python
def fibonacci(n: int) -> int:
    if n == 0 or n == 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)
```

ฟังก์ชั่นนี้จะมีปัญหาอยู่อย่างหนึ่งแต่ผมจะให้ดูทีหลังนะครับ ให้บันทึกในไฟล์ชื่อ `logic.py`

## เขียน test ด้วย unittest

Python มี library สำหรับการเขียน test แถมมาอยู่แล้วในชื่อ `unittest` ซึ่งเกิดมาก่อนที่ Python จะใช้ underscore ใน PEP8 เสียอีก

เราจะสร้าง `TestCase` เพื่อทดสอบโค้ดของเรา

สร้างไฟล์ `logic_test.py` ขึ้นมาด้วยโค้ดตามนี้

```python
import unittest
from logic import fibonacci


class FibonacciTest(unittest.TestCase):
    def test_fibonacci(self):
        self.assertEqual(0, fibonacci(0))
        self.assertEqual(1, fibonacci(1))
        self.assertEqual(1, fibonacci(2))
        self.assertEqual(2, fibonacci(3))


if __name__ == '__main__':
    unittest.main()
```

การ test ด้วย unittest ก็แค่รันไฟล์ด้วยคำสั่ง `python` หรือจะใช้ `python -m unittest <ชื่อไฟล์>` ก็ได้

## Pytest

ก่อนอื่นเราต้องลง pytest กันก่อน ซึ่งก็ลงง่าย ๆ ด้วย pip

```sh
pip install pytest
```

อย่าลืม activate virtualenv (หรือ venv) ก่อนลงด้วยนะครับ

การเขียน test ใน pytest ก็เขียนโดยใช้คำสั่ง `assert` ง่าย ๆ เลยครับผม

```python
from logic import fibonacci
def test_fibonacci():
    assert fibonacci(0) == 0
    assert fibonacci(1) == 1
    assert fibonacci(2) == 1
    assert fibonacci(3) == 2
```

จะเห็นว่าไม่มีคำสั่งรันใน main นะครับ ให้ใช้ไฟล์ชื่อ `logic_pytest_test.py` นะครับ

เราสามารถรัน test ได้โดยใช้คำสั่ง `pytest` หรือ `python -m pytest` ถ้าเราไม่ใส่ชื่อไฟล์ไป และใช้ `logic_test.py` เขียน test โดยใช้ unittest Pytest จะรันทั้งสองไฟล์เลยครับผม พูดง่าย ๆ คือเราใช้ Pytest รัน test ที่เขียนโดย unittest ก็ได้ครับผม

## ลองเพิ่มเคสดีกว่า

ถ้าเราลองใส่ `fibonacci(40)` ลงไปก็จะเห็นว่าโค้ดจะช้าลงเล็กน้อย เป็นเพราะว่าฟังก์ชั่นนี้เป็นฟังก์ชั่นที่เรียกตัวเองไปเรื่อย ๆ ทำให้ stack เพิ่มขึ้นเรื่อย ๆ แถมเราต้องมาคำนวณใหม่ทุกครั้งอีกด้วย

ผมใช้ค่า `fibonacci(40)` จากเว็บ http://www.fullbooks.com/The-first-1001-Fibonacci-Numbers.html นะครับ

เพิ่มโค้ดในไฟล์ test แต่ละอันตามนี้นะครับ

```python
# unittest
self.assertEqual(102334155, fibonacci(40))

# pytest
assert fibonacci(40) == 102334155
```

ถ้ารันทั้งสองกรณีด้วยคำสั่ง `pytest` ผมได้เวลาประมาณ 45 วินาทีครับ ซึ่งก็ถือว่าค่อนข้างช้า ถ้ารันแยกกัน แต่ละเคสก็ใช้เวลาประมาณ 21 - 22 วินาที

## เพิ่ม Memoization กันเถอะ

Memoization (ไม่ใช่ memorization) เป็นเทคนิคที่เราสามารถเพิ่มความเร็วในการคำนวณที่ช้าได้โดยใช้ cache

หลักการก็คือถ้ามีผลลัพธ์ใน cache ก็แค่ใช้ cache แต่ถ้าไม่มีก็คำนวณเอา การจะทำแบบนี้ได้ฟังก์ชั่นคำนวณจะต้องเป็น pure function ที่ใส่ค่าอะไรลงไปก็ได้ออกมาเหมือนเดิมทุกครั้ง และไม่มีผลข้างเคียงอย่างอื่น (side effect) อย่างเช่นพิมพ์ข้อความลง console หรือเรียกฐานข้อมูล

## เปลี่ยนโค้ดกันเถอะ

เนื่องจากเรามีโค้ดเก่ากับ test ที่เรียกฟังก์ชั่น `fibonacci` อยู่เราก็จะเปลี่ยนชื่อฟังก์ชั่นเก่าให้เป็นอันใหม่ และให้ฟังก์ชั่นใหม่ชื่อ `fibonacci`

โค้ดก็จะเป็นตามนี้

```python
def fibonacci_old(n: int) -> int:
    if n == 0 or n == 1:
        return n
    else:
        return fibonacci(n - 1) + fibonacci(n - 2)

__fibo_cache = {
    0: 0,
    1: 1
}

def fibonacci(n: int) -> int:
    if n in __fibo_cache:
        return __fibo_cache[n]
    else:
        __fibo_cache[n] = fibonacci(n - 1) + fibonacci(n - 2)
        return __fibo_cache[n]
```

ผมใส่ underscore สองอันหน้า `fibo_cache` เพื่อให้คนอื่นรู้ว่ามันเป็น `private` เพราะว่าใน Python จะไม่มี private จริง ๆ ทำให้ถ้าจะแก้ผล fibonacci ก็สามารถทำได้

เมื่อแก้โค้ดเสร็จแล้วก็สามารถรัน `pytest` หรือโค้ดที่ใช้ test แต่ละไฟล์ได้เลยเพื่อดูว่าฟังก์ชั่นใหม่ทำงานถูกต้องรึเปล่า

ผมรันดูแล้วรวมทั้งสอง test จะใช้เวลาไม่ถึงวินาทีเลยครับ

## โค้ดมันไม่ต่างอะไรมากนิ

ใช่ครับ ผมยกตัวอย่างง่าย ๆ พอผมพอนึกออกมา ในความจริงแล้วโค้ดของเราอาจจะยุ่งยากซับซ้อนมากกว่านี้ ทำให้เวลาแก้อะไรก็มีโอกาสเกิดข้อผิดพลาดขึ้นได้ ยิ่งถ้าเราต้องการจัดระเบียบโค้ดใหม่โดยให้มันยังทำงานเหมือนเดิม ยิ่งต้องรู้ว่ามันยังทำงานได้เหมือนเดิมอยู่อีกด้วย

ถ้าเราไม่มี test อะไรเลย เราก็อาจจะต้องทดสอบทุกอย่างแบบ manual ซึ่งก็มีโอกาสที่มันจะช้าและเสียเวลามาก ๆ อาจจะลืมเคสบางเคสไปได้อีกด้วย

## สรุป

การเขียน test ใน Python ก็สามารถเขียนได้อย่างน้อยก็สองวิธีที่ผมรู้ได้แก่
unittest และ pytest รวมถึงอาจจะมี library อื่น ๆ ที่ผมไม่ได้กล่าวถึงอีก

ไม่ว่าจะใช้อะไรก็ตาม การมี test ก็สามารถช่วยให้เรามั่นใจมากขึ้นว่าโค้ดที่เราเขียนไปสามารถทำงานได้ตรงตามที่ต้องการ และลดการทดสองแบบ manual ที่ใช้เวลามากนั่นเอง
