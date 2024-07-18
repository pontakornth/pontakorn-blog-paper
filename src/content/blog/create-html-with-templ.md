---
title: สร้าง HTML ด้วย Templ
description: Templ เป็น library สำหรับสร้าง HTML ด้วยภาษา Go
postSlug: create-html-with-templ
pubDatetime: 2024-07-18T08:00:00.000Z
tags:
  - web development
  - go
  - html
---

## สารบัญ

## HTML Template

การสร้างเว็บไม่ว่าจะเขียนด้วยภาษาอะไรก็ต้องมี HTML มาเกี่ยวข้องเสมอ เพราะว่า
HTML เป็นภาษาที่ใช้กำหนดโครงสร้างหน้าเว็บ บอกว่าอะไรคืออะไร จากนั้นเราก็จะมี CSS
มากำหนดรูปแบบ HTML และ JavaScript สำหรับกำหนดพฤติกรรมสิ่งต่าง ๆ ภายในเว็บ

ถ้าเราใช้แค่สามอย่างนี้ เว็บเราก็จะแสดงผลได้อย่างเดียว หรืออย่างมากก็แค่ประมวลผลในฝั่ง
user แต่ว่าจะไม่สามารถคุยกับ Database หรือทำงานที่เกี่ยวข้องกับ server ได้เลย

ยิ่งเราอยากให้เว็บมีการประมวล เราก็อยากแสดงผลสิ่งที่เราต้องการออกมา เช่น แสดงผลรายชื่อสินค้า
ชื่อผู้ใช้ แล้วมันก็จะต้องออกมาเป็น HTML การทำแบบง่าย ๆ ก็คือเอา string มาต่อกันเป็น HTML แต่มันก็ลำบากแถม[ช่องโหว่เพียบอีกด้วย](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)

เครื่องมือตัวแรก ๆ ที่ผมจำได้ก็จะมี PHP ที่เป็นภาษาออกแบบมาเพื่อ render หน้า HTML โดยเฉพาะ
ชื่อของ PHP ตอนนี้จะย่อมาจาก PHP: HyperText Processor (เมื่อก่อนย่อมาจาก Personal Home Page)

```php
<?php
echo "Hello World!";
?>
```

ซึ่งมันก็ทำให้การ render HTML ง่ายขึ้น ถึงโค้ดข้างบนก็จะมีช่องโหว่ถ้าเราเปลี่ยน `"Hello, World"` เป็นข้อมูลจาก user นะ

การทำ Template HTML ก็เป็นที่นิยมในหลายภาษา เช่น Python มี Jinja2, Mako, Django Template หรือ Ruby ก็มี erb

## HTML Template ในภาษา Go

ความจริงแล้ว HTML Template จะอยู่ใน standard library ของภาษา Go โดยใช้ชื่อว่า `html/template` ซึ่งเป็น `text/template` ที่เพิ่ม feature ด้านความปลอดภัยสำหรับแสดงผล HTML

```html
<h1>{{ . }}</h1>
```

โค้ดด้านบนคือตัวอย่าง HTML template ที่ simple ที่สุด ในภาษา Go สิ่งที่เราส่งเข้าไปเพื่อ
render HTML เรียกว่า pipeline `.` คือตัว pipeline ที่ส่งเข้าไป

```go
package main
import "html/template"
import "os"

func main() {
    const tpl = `
    <h1>{{ . }}</h1>
    `
    t, err := template.New("web").Parse(tpl)
    if err != nil {
        panic(err)
    }
    err = t.Execute(os.Stdout, "Hello, World")
    if err != nil {
        panic(err)
    }
}
```

โค้ดด้านบนเป็นโค้ดสำหรับการใช้ HTML template ใน string pipeline คือ `"Hello, World"` ส่วนชื่อ
template คือ `web`

โดยทั่วไปแล้วเราจะเก็บ template เป็นไฟล์ HTML (บางที่อาจจะเปลี่ยนนามสกุลไฟล์เป็นอย่างอื่น) และจะไม่ใช้
template ตรง ๆ ในโค้ดถ้าเรามี web framework อย่าง Gin หรือ Echo

template ที่แถมมาใน standard library เป็น template ที่ minimal มาก ๆ ทำให้ไม่มี features
หลายอย่างที่ template engine ตัวอื่นมีกัน เช่น inherit template แต่ก็ถือว่าดีแล้วสำหรับการใช้งานเบื้องต้น

## Templ

Templ เป็น library สำหรับการทำ template โดยสร้างภาษา Templ ที่ก็มาจาก Go อีกทีหนึ่ง
จุดเด่นอย่างหนึ่งของ Templ คือการใส่ type ใส่ template ทำให้ error ที่จะเกิดขึ้นจะเกิดในช่วง
compile time แทนที่จะเกิดตอนรันโค้ดไปแล้ว และ Templ จะมองว่า template เป็น function
ตัวหนึ่ง การมองแบบนี้ทำให้เขียนโค้ดง่ายขึ้นมาก คล้าย ๆ กับ React

```templ
package templates
templ Hello(name string) {
    <p>Hello, { name }</p>
}
```

โค้ดด้านบนจะเป็นโค้ด template ที่จะ render `p` ให้มีข้อความ `Hello, ` แล้วตามด้วยชื่อ

```go
package main
import (
    "insert-your-go-module-here/templates"
    "context"
    "os"
)

func main() {
    component := Hello("World")
    component.Render(context.Background(), os.Stdout)

}
```

นี่คือโค้ดสำหรับการ render Template ออกไปที่ standard output ตรงนี้ผมได้มาจากเว็บ documentation ครับ

## แหล่งที่มาข้อมูล

- https://templ.guide/ - Official documentation ของ Templ
