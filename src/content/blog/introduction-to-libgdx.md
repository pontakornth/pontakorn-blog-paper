---
title: libGDX เกมเฟรมเวิร์คภาษา Java ที่อยู่มานานแสนนาน
description: มารู้จักกับ LibGDX
postSlug: introduction-to-libgdx
ogImage: "@assets/images/introduction-to-libgdx.png"
pubDatetime: 2025-01-27T17:00:00.000Z
tags:
  - game development
  - java
  - kotlin
  - programming
---

## สารบัญ

## ว่าด้วยสถานการณ์การเขียนเกมของผม

ผมอาจจะไม่ได้อัปเดตสถานะอะไรเกี่ยวกับการเขียนเกมของผมมากนัก แต่อยากให้รู้ว่าผมเองก็มีความสนใจในเรื่อง game development อย่างมากแต่ก็มีงานประจำที่ไม่ใช่การเขียนเกมอยู่แล้วบวกกับอยากใช้เวลาทำอย่างอื่น
เลยอาจจะไม่ได้มายุ่งเรื่องนี้มากเท่าเมื่อก่อนนะครับ

แล้วก็ผมไม่ได้ทำเรื่องนี้เป็นอาชีพ อย่าคาดหวังอะไรกับผมเลยครับ

## Game Framework คืออะไร และต่างกับ Game Engine อย่างไร

หลาย ๆ คนอาจจะคุ้นชินกับคำว่า game engine ซึ่งเป็นซอฟต์แวร์ที่ไว้สำหรับทำเกมอย่างเช่น Unity, Godot, หรือ Unreal Engine ซอฟต์แวร์พวกนี้จะมีเครื่องมือต่าง ๆ เช่น visual editor, animation state machine มีไลบรารี่ต่าง ๆ ใช้ใช้งานรวมถึงการวางโครงสร้างสิ่งต่าง ๆ ภายในเกม เช่น Godot จะมองของเป็น Node กับ Scene ที่เป็นลำดับขั้น

game framework ก็เป็นเครื่องมือพัฒนาเกมคล้าย ๆ กับ game engine แต่ว่า game framework
จะเป็นการรวมไลบรารี่ที่มีประโยชน์และวางโครงสร้างให้ในระดับพื้นฐานเท่านั้น และก็จะไม่มี editor ในตัว จะต้องใช้โปรแกรม editor ข้างนอก เช่น [Tiled](https://www.mapeditor.org/) หรือเขียนโค้ดเอาเอง (แต่บาง framework มีตัว import ให้) และก็จะต้องวางโครงสร้างหลาย ๆ เอาเองอย่างเช่น วิธีการ render sprite, ระบบ collision (บางตัวแถม physics engine มาให้)

## libGDX (ใช้ l ตัวเล็ก)

เป็น game framework ที่เขียนโดยใช้ภาษา Java โดย libGDX ถูกเขียนมาตั้งแต่สมัย 2009 โดยคุณ Mario Zechner กลายเป็น opensource ในปี 2010 และยังคงพัฒนาต่อมาจนถึงปัจจุบัน

libGDX จะจัดการในส่วนของ game loop, การทำงานแบบ cross platform, และให้ฟีเจอร์พื้นฐานอย่างเช่น กราฟฟิคและเสียง การรับ input ต่าง ๆ เป็นต้น​โดยนักพัฒนาเกมจะต้องรวมของที่มีอยู่ใน libGDX ด้วยตัวเอง

เพราะว่า framework นี้ใช้ Java ในการพัฒนา ดังนั้นในเชิงเทคนิคแล้วก็สามารถเขียนด้วยภาษาอื่น ๆ อย่างเช่น Kotlin, Scala, หรือภาษาอื่น ๆ ที่ใช้ JVM แต่อาจจะไม่ได้ support มากเท่ากับ Java (Kotlin มี support จาก community เรียกว่า [libKTX](https://libktx.github.io/) ซึ่งจะทำให้ใช้ประโยชน์จาก Kotlin ได้ดีขึ้นด้วย API ที่เข้ากับ Kotlin มากกว่า)

## เกมที่พัฒนาด้วย libGDX

จากหน้าเว็บ [showcase](https://libgdx.com/showcase/) แล้วก็จะมีเกมอย่าง Slay the Spire ภาคแรก Mindustry (ใช้ Arc fork ที่ลบ features บางอย่างออกและปรับให้เหมาะกับเกมนี้โดยเฉพาะ) ที่จะเป็นเกมใน Steam ส่วนเกมมือถือก็จะมี Disney Heroes: Battle Mode, Shattered Pixel Dungeon (เกมโปรดคนเขียนแถม open source ด้วย)

## สอนทำเกม?

ตอนนี้การสอนเกมแม้จะเบื้องต้นก็ค่อนข้างเกิน scope ของโพสต์นี้พอสมควร เอาเป็นว่าศึกษาจากแหล่งอ้างอิงเองแล้วกันนะครับ

## แหล่งอ้างอิง

- https://libgdx.com/ เว็บ libGDX
- https://libktx.github.io/ โครงการ libKTX
