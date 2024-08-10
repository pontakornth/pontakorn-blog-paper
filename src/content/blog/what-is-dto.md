---
title: DTO คืออะไร
description: มาดูกันว่า DTO มันคืออะไรกันดีกว่า
postSlug: what-is-dto
pubDatetime: 2024-08-10T16:00:00.000Z
tags:
  - design pattern
  - security
---

## สารบัญ

ผมเจอกับสิ่งที่เรียกว่า DTO ตอนช่วงเรียน Software Security ที่เขียน Spring Boot
เป็นหลัก และก็มาเจออีกทีตอนที่ลองศึกษา ASP.NET Core เห็นว่าเป็น design pattern
ที่น่าสนใจเลยอยากให้ผู้อ่านรู้จัก

## DTO คืออะไรกันแน่

ชื่อเต็มของ DTO คือ Data Transfer Object พูดง่าย ๆ ก็คือเป็น object ที่ใช้ในการส่ง
data นั่นเอง

ตัวอย่าง DTO ในภาษา C# จะเป็นลักษณะนี้

```csharp
public class TodoDTO
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
}
```

`TodoItemDTO` เป็น DTO สำหรับ `TodoItem` โดยตัว `TodoItem` จริง ๆ อาจจะมี
field อื่น ๆ เพิ่มเข้ามาด้วย

```csharp
public class TodoItem
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
    // This thing is hidden from DTO.
    public string? Secret { get; set; }
}
```

## ทำแบบนั้นเพื่ออะไรกันล่ะ

การที่มี DTO สามารถทำให้การส่งข้อมูลภายในส่วนต่าง ๆ ยึดตาม DTO โดยไม่ต้องสนใจเรื่องรายละเอียดอื่น ๆ เช่น
Database แถมยังลดรายละเอียดที่ไม่จำเป็นทำให้ใช้ข้อมูลในการส่งน้อยลงด้วย

สมมติว่าเรามีโพสต์ใน `models` ตามนี้

```csharp
public class Post
{
    public string Title { get; set; }
    public string Body { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public bool IsLocked { get; set; } = false;
}
```

ถ้าเราต้องการจะสร้างโพสต์ขึ้นมาอันนึง เราก็แค่ต้องการรู้ชื่อเรื่องกับเนื้อหาก็พอ
เราก็จะได้ DTO ตามนี้

```csharp
public class CreatePostDTO
{
    public string Title { get; set; }
    public string Body { get; set; }
}
```

## Over-posting Attack

เหตุผลอีกอย่างที่ควรใช้ DTO คือ Over-posting attack

การโจมตีแบบนี้เกิดขึ้นได้เมื่อเราเชื่อม request กับ model ที่ใช้ใน database
ทำให้คนร้ายสามารถเพิ่ม field แปลกปลอมเข้ามาใน request ได้ ถ้ารู้ (หรือเดา)
model ของเราถูก

สมมติว่าเรามี model ง่าย ๆ ชื่อ `Novel` และเว็บนิยายที่เราจะลงจะมีการติดดาว
สำหรับนิยายที่ดีมาก ๆ

```csharp
public class Novel
{
    public string Title { get; set; }
    // Other fields here
    public bool Starred { get; set; }
}
```

คนร้ายก็แค่ลงนิยายเพิ่ม แต่แอบเพิ่ม field `Starred` เข้ามาใน request

```json
{
  "Title": "Generic Mage vs Isekai Demon Volume 1",
  // Other fields here
  "Starred": true
}
```

ถ้าเรา bind model กับ request body ตรง ๆ ก็เสร็จโจร คนร้ายก็ทำให้นิยายของตัวเองติดดาวอย่างง่ายดาย

แต่ถ้าเราจำกัดแค่ข้อมูลที่จำเป็นสำหรับการสร้างนิยายหนึ่งเรื่อง คนร้ายก็ไม่สามารถใช้การโจมตีนี้ได้
หนึ่งในวิธีที่ทำได้คือการใช้ DTO นั่นเอง

```csharp
public class CreateNovelDTO {
    public string Title { get; set; }
    // We don't care about validation in this post.
    public string Rating { get; set; }
    public bool AllowComment { get; set; }
    // Other fields required to create a novel..
}
```

## ที่มาข้อมูล

- https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-8.0&tabs=visual-studio-code เป็น tutorial ASP.NET Core ที่อธิบายเรื่อง DTO ไว้ด้วย
- https://stackoverflow.com/questions/1051182/what-is-a-data-transfer-object-dto คำถามใน Stackoverflow
- https://andrewlock.net/preventing-mass-assignment-or-over-posting-in-asp-net-core/ เว็บนี้เป็นที่มาของตัวอย่างการ Over-posting และอธิบายวิธีป้องกันด้วยวิธีอื่นนอกจาก DTO
