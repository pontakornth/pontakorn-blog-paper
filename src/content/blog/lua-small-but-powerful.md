---
title: ภาษา Lua จิ๋วแต่แจ๋ว
description: Lua ภาษาทรงพลังที่ใช้งานได้หลากหลายรูปแบบ
postSlug: lua-small-but-powerful
ogImage: "@assets/images/lua-small-but-powerful.png"
pubDatetime: 2024-11-10T15:00:00.000Z
tags:
  - lua
  - game development
  - programming
---

## สารบัญ

## Lua คืออะไร

Lua เป็นภาษาโปรแกรมมิ่งตัวมีขนาดเล็กกระทัดรัด เล็กขนาดที่ว่า[มีคำสงวนแค่ 21 คำเอง](https://www.lua.org/manual/5.1/manual.html#2.1) และเขียนเป็น library ของภาษา C

ถามว่าทำไมมันถึงเล็ก ก็เป็นเพราะว่า Lua ถูกออกแบบมาให้เป็นภาษาเอาไว้เสริมส่วนอื่น ๆ ของโปรแกรม (extension programming language) โดยที่ตัวมันเองก็จะทำอะไรไม่ได้มากนักถ้าไม่มีโปรแกรมอื่นไปใช้งานร่วมกัน ตัวภาษาเองก็สามารถรองรับการเขียนแบบ OOP เขียนเชิงฟังก์ชั่น หรือแม้กระทั่งเขียนโปรแกรมที่ขับเคลื่อนด้วยข้อมูล (data-driven) (ไม่เคยเขียนแนวนี้)

## Syntax ของภาษา Lua

### ตัวแปรและชนิดตัวแปร

ใน Lua ตัวแปรกทุกตัวจะถูกมองว่าเป็น global variable โดย default ([เอาจริงพูดแบบนี้อาจจะไม่ถูกต้องมากนักในเชิงเทคนิค](https://www.reddit.com/r/lua/comments/12zog2n/comment/jht4a9t/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)) และก็ค่าตัวแปรสามารถเปลี่ยนได้เรื่อย ๆ

```lua
-- Global variable
player_name = "Sherlock Holmes"

-- Local variable
local player_name = "Dr. John Watson"
```

### Control flow ที่เรียบง่าย

Lua ไม่มีฟีเจอร์หลาย ๆ อย่างที่ภาษาอื่นเขามีกันอย่างเช่น pattern matching แต่ก็จะมี control-flow พื้นฐานอย่าง conditions กับ loop

```lua
-- Block use `end` keyword
if player_hp == 0 then
  print("The player is dead")
end

-- elseif
if boss_hp >= 50 then
  use_normal_attack()
elseif boss_hp >= 25 then
  use_strong_attack()
end

-- While
while player_is_alive do
  play()
end

-- For
-- `i` is local in this code.
-- start, stop, optional step (default step = 1)
for i = 1, 10, 1 do
  print(i)
end
```

### Data structure ก็มีแค่ table อย่างเดียว

ใช่แล้วครับ Data structure ใน Lua มีแค่ `table` ที่เราจะใช้เป็น array ก็ได้ dictionary ก็ได้
หรือใช้เป็นแบบ object หรือ class ก็ยังได้ ผมเองไม่ได้เขียน Lua มามากพอนอกจากเขียน Love2D และ config NeoVim (I use VSCode btw.)

ข้อควรระวังอย่างหนึ่งในการใช้ table เป็น array ใน Lua คือ index ของ Lua จะเริ่มที่หนึ่งตามธรรมชาติของคนทั่วไป

```lua
-- These are all tables
my_array = { 1, 2, 3, 4, 5 }
my_dictionary = {
  detective = "Sherlock Holmes",
  assisstant = "Dr. John Watson",
  villain = "James Moriarty",
  support = {
    "Shinichi Kudo",
    "Heiji Hattori
  }
}

-- Yes, it is possible to define method.
-- self is used just like python
function my_dictionary.print(self)
  print("One truth prevails")
  print("by")
  print(self.detective)
end

my_dictionary:print()

-- shortcut
function my_dictionary:print_evil()
  print(self.villain)
end
```

## Lua กับ Game Development

Lua เป็นหนึ่งในภาษาที่คนมักจะใช้นำมาใช้พัฒนาเกมหรือเป็นส่วนหนึ่งของเกม

Love2D เป็น game framework ในภาษา Lua ที่ใช้งาน LuaJIT ที่เป็นคอมไพล์เลอร์แบบ Just-in-time มาใช้คอมไพล์ Lua ให้มีประสิทธิภาพมากขึ้น เกมที่ใช้ Love2D ที่ผมรู้จักจะเป็น [Mari0](https://stabyourself.net/mari0/) และ [Balatro](https://store.steampowered.com/app/2379780/Balatro/)

Garry's Mod เป็นเกม sandbox ที่ใช้ Lua ในการเขียนสคริปต์สิ่งต่าง ๆ ทำให้เราสามารถมีเกมย่อย ๆ อย่าง prophunt หรือทำอะไรแปลก ๆ ใน Garry's Mod ได้

อีกเกมหนึ่งที่ใช้ Lua เหมือนกันก็คือ Roblox แต่เจ้านี้ใช้ Lua กันโหดมากจนถึงสร้าง [Luau](https://luau.org/) ที่เป็น Lua ฉบับที่กำหนดชนิดตัวแปรได้ หรือแม้กระทั่งสร้าง port ของ React ขึ้นมาใน Lua โดยใช้ชื่อ [Roact](https://roblox.github.io/roact/)

## แหล่งข้อมูล

- https://www.lua.org/
- https://luajit.org/
