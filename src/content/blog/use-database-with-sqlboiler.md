---
title: ใช้ SQLBoiler กับ Go
description: Database-first ORM ของ Go
postSlug: use-database-with-sqlboiler
pubDatetime: 2024-07-05T12:00:00.000Z
tags:
  - web development
  - go
  - sql
  - database
---

## สารบัญ

## ORM คืออะไร

ORM หรือ Object-relational mapping เป็นการเชื่อมโค้ดของโปรแกรมให้สามารถเข้ากับฐานข้อมูลได้
ปกติแล้ว class หรือ struct ของโปรแกรมจะไม่ได้มีเกี่ยวข้องอะไรกับฐานข้อมูลอยู่แล้ว
สมมติว่ามีโค้ดสำหรับข้อมูลของโพสต์ดังนี้

```go
type Post struct {
    Id int
    Title string
    Content string
}
```

และมีโพสต์ในฐานข้อมูลตามนี้

```sql
CREATE TABLE posts (
    id serial not null primary key,
    title varchar(255) not null,
    content text not null
)
```

ถ้าเราไม่ได้ใช้ ORM เราก็จำเป็นต้องเชื่อมข้อมูลเอง

```go

func FindPost(id int) (*Post, error) {
    // Pretend there is only one row
    row, err := db.Query("SELECT id, title, content FROM posts WHERE id = ?", id)
    if err != nil {
        return nil, err
    }
    var p Post
    err = row.Scan(&p.Id, &p.Title, &p.Content)
    if err != nil {
        return nil, err
    }
    return &p, nil
}
```

ถ้ามี ORM เราก็ไม่จำเป็นต้องเชื่อม struct กับ row ในฐานข้อมูลด้วยตัวเอง

## SQLBoiler คืออะไร

SQLBoiler เป็น ORM ของภาษา Go ที่สร้าง model ตาม database กำหนดไว้
ซึ่งจะต่างจาก Gorm ที่ยึดโค้ดมาก่อน และ SQLBoiler จะไม่จัดการเรื่องการสร้าง schema
โดยปล่อยให้ tools อื่น ๆ อย่างเช่น [sql-migrate](https://github.com/rubenv/sql-migrate) จัดการเรื่อง
migration แทน

ผู้อ่านสามารถศึกษา SQLBoiler ได้จาก https://github.com/volatiletech/sqlboiler

## โค้ดที่ใช้ SQLBoiler

SQLBoiler จะ generate โค้ดตาม schema ที่กำหนดไว้ใน database ดังนั้นแต่ละคนจะมีโค้ดส่วนข้อมูลต่างกัน
แต่ก็จะมีส่วน method ที่ยังเรียกเหมือนกันอยู่

อย่างเช่นโค้ดตัวอย่างข้างบนก็จะเปลี่ยนเป็นแบบนี้แทน

```go
func FindPost(ctx context.Context, id int) (*models.Post, error) {
    return models.Posts(qm.Where("id = ?", 1)).One(ctx, db)
}
```

โค้ดดูอ่านง่ายกว่าเดิมเยอะเลย จะเห็นว่ามี parameter `ctx` เพิ่มขึ้นมา เพราะว่า SQLBoiler จะต้องใส่ context เข้าไปครับ นอกจากนี้ SQLBoiler จะ generate ค่าคงที่สำหรับชื่อ columns ที่สามารถใช้แทน string ได้ครับ ลดโอกาสผิดพลาดได้อีกด้วย
