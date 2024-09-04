---
title: รู้จักกับภาษา Gleam
description: อธิบายยภาษา Gleam แบบง่าย ๆ
postSlug: introduction-to-gleam
ogImage: "@assets/images/introduction-to-gleam.png"
pubDatetime: 2024-09-04T10:00:00.000Z
tags:
  - gleam
  - concurrency
  - programming
---

## สารบัญ

## ภาษาใหม่

ภาษา Gleam เป็นภาษาใหม่ที่เพิ่งเวอร์ชั่นเสถียรเมื่อ[วันที่ 4 มีนาคม 2024](https://gleam.run/news/gleam-version-1/) ตอนที่ผู้เขียนกำลังเขียนบล็อกนี้อยู่ก็เวอร์ชั่น 1.4.1 ครับผม

## สร้างมาทำไมกันล่ะ

ภาษา Gleam มีจุดประสงค์ที่จะทำให้สามารถเขียนได้ง่ายและเรียนรู้ได้ง่าย มีวิธีการทำอะไรบางอย่างแบบเดียว
([คล้าย ๆ กับ Python เลย](https://peps.python.org/pep-0020/)) พูดง่าย ๆ คือ optimize มาเพื่อการอ่านโค้ดโดยเฉพาะ แน่นอนว่าเราก็คงจะอ่านโค้ดมากกว่าเขียนอยู่แล้ว

Gleam เป็นภาษาที่ใช้ระบบ static type หมายความว่าชนิดของตัวแปรจะรู้ตอนที่คอมไพล์ออกมา ระบบ type ของ Gleam ได้แรงบันดาลใจมาจากภาษา Elm, OCaml หรือ Rust ดังนั้นคอมไพล์เลอร์จะช่วยเราในการเขียนได้มาก ๆ ทำให้จัดระเบียบโค้ดได้สบาย

นี่คือตัวอย่างโค้ดภาษา Gleam จากเว็บของ Gleam ครับ

```gleam
import gleam/json
import gleam/result.{try}
import my_app/person
import wisp.{type Request, type Response}

pub fn handle_request(req: Request, ctx: Context) -> Response {
  use json <- wisp.require_json(req)

  let result = {
    use data <- try(person.decode(json))
    use row <- try(person.insert(ctx.db, data))
    Ok(person.to_json(row))
  }

  case result {
    Ok(json) -> wisp.json_response(json, 201)
    Error(_) -> wisp.unprocessable_entity()
  }
}
```

## รองรับ Concurrency

Gleam สามารถคอมไพล์ได้สองแบบ Erlang กับ JavaScript ในหัวข้อนี้ผมจะพูดถึง Erlang ก่อน

Erlang เป็นภาษาที่รันบน VM ที่ชื่อว่า BEAM (Erlang virtual machine) มีความโดดเด่นเรื่อง concurrency อย่างมาก
โดยใช้ระบบที่เรียกว่า OTP (ไม่ใช่ password) เป็นชุด library ของ Erlang ที่ใช้ในการจัดการ concurrency

ผมจะไม่อธิบายละเอียดว่ามันทำงานนยังไงนะครับ แต่ Erlang กับ BEAM ก็เป็นที่นิยมในวงการ telecommunication รวมถึงงานที่ต้องการ concurrency สูงอย่างเช่น WhatsApp

แต่ Erlang ก็เป็นภาษาที่ syntax แตกต่างกับภาษาอื่นพอสมควร ก็เลยจะมีภาษาที่รันบน VM ตัวเดียวกันแต่ syntax ง่ายกว่าอย่าง Elixir หรือ Gleam เกิดขึ้นมา

ดังนั้นหมายความว่า Gleam ที่ใช้รันไทม์ของ Erlang ก็จะสามารถเขียนงานที่ต้องใช้ concurrency สูงโดยใช้ syntax ที่เข้าใจง่ายนั่นเอง

## เรียนและติดตั้ง Gleam

เพราะว่า Gleam สามารถคอมไพล์เป็น JavaScript ได้ ดังนั้นเราไม่จำเป็นต้องติดตั้ง Gleam บนเครื่องของเราก่อนเรียนแม้แต่น้อย แต่สามารถเข้าไปเรียบใน [Language Tour](https://tour.gleam.run/) ได้เลย แต่จะไม่สามารถใช้งาน feature ที่ต้องพึ่งพา BEAM อย่าง OTP ได้

วิธีการติดตั้งสามารถหาอ่านได้จาก [https://gleam.run](https://gleam.run) ได้เลยครับ

## ที่มาข้อมูล

- https://gleam.run/
- https://gleam.run/news/gleam-version-1/
- https://www.youtube.com/watch?v=D88S_RdagP8
- https://www.youtube.com/watch?v=8rCgnKHUUVA
