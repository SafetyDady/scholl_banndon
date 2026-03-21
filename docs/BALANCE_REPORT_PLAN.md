# แผนพัฒนา: ระบบรายงานเงินคงเหลือ

## สถานะ: รอ Feedback จากครูการเงิน

---

## Phase 1: Master Data — ตั้งค่า Template รายงาน

### 1.1 เพิ่ม Model `BalanceReportTemplate`
```
BalanceReportTemplate:
  - id
  - name: ชื่อรายการ (เช่น "ดอกเบี้ยเงินฝากเงินอุดหนุนทั่วไป")
  - section: หมวด (BUDGET_REVENUE = เงินงบประมาณ/รายได้แผ่นดิน, NON_BUDGET = เงินนอกงบประมาณ)
  - parentId: กลุ่มแม่ (self-reference, เช่น 3.1 อยู่ใต้ 3)
  - column: คอลัมน์ที่ยอดจะลง (CASH = เงินสด, BANK = ฝากธนาคาร, DEPT = ส่วนราชการผู้เบิก)
  - sourceType: ที่มาของยอด (BANK_ACCOUNT / BUDGET_TYPE / MANUAL)
  - sourceBankAccountId: ถ้า sourceType=BANK_ACCOUNT → ผูกบัญชี
  - sourceBudgetTypeId: ถ้า sourceType=BUDGET_TYPE → ผูกประเภทเงิน
  - openingBalance: ยอดตั้งต้นปีงบ (กรอกตอนเริ่มปี)
  - sortOrder: ลำดับ (Drag and Drop)
  - isActive: เปิด/ปิดรายการ
```

### 1.2 สร้างหน้า `/settings/balance-template`
- แสดงรายการ 12+ ข้อ แบบ tree (หมวด → หัวข้อ → รายการย่อย)
- Drag and Drop จัดลำดับ
- เพิ่ม/แก้ไข/ลบ รายการ
- Modal แก้ไข: ชื่อ, หมวด, กลุ่มแม่, คอลัมน์, ที่มายอด, ยอดตั้งต้น
- สิทธิ์: Admin + ครูการเงิน

### 1.3 Seed ข้อมูล 12 รายการจาก Excel จริง
- ใส่ข้อมูลตาม Form ที่ครู custom มา
- ผูกบัญชีธนาคาร / ประเภทเงิน ที่มีใน Master Data

### 1.4 เพิ่มกรรมการเก็บรักษาเงินใน Master Data ข้อมูลโรงเรียน
- เพิ่ม field: committee_1_name, committee_1_position (3 คน)
- แก้หน้า `/settings/school-info`

---

## Phase 2: หน้ารายงานยอดเปลี่ยนแปลง

### 2.1 สร้างหน้า `/balance` (ปรับปรุงจากเดิม)
- แสดงรายการวันที่มีเงินเคลื่อนไหว
- ดึงจาก BankStatement → group by วันที่
- แต่ละวันแสดง: รายการเปลี่ยนแปลง (ถอน/ฝาก จากทุกบัญชี)
- สถานะ: ออกรายงานแล้ว / ยังไม่ออก
- ปุ่ม: ออกรายงาน / ดาวน์โหลด

### 2.2 เพิ่ม Model `BalanceReportIssued`
```
BalanceReportIssued:
  - id
  - reportDate: วันที่รายงาน (= วันที่มีเงินเคลื่อนไหว)
  - fiscalYear
  - issuedAt: วันที่ออกรายงาน
  - issuedById: ใครออก
  - filePath: path ไฟล์ Excel (optional, เก็บไว้ download ซ้ำ)
```

---

## Phase 3: สร้าง Excel รายงานเงินคงเหลือ

### 3.1 API `/api/balance/report/[date]`
- รับวันที่ → ดึงข้อมูลจาก BankStatement + BalanceReportTemplate
- คำนวณยอดแต่ละรายการ:
  - sourceType=BANK_ACCOUNT → ยอดล่าสุดจาก BankStatement ณ วันนั้น
  - sourceType=BUDGET_TYPE → openingBalance ± เงินเข้า/ออก สะสมถึงวันนั้น
  - sourceType=MANUAL → ให้ครูกรอกก่อนออกรายงาน
- แสดง Validate: ยอดสมุดบัญชี vs ยอดคำนวณสะสม
- สร้าง Excel ตาม format สำนักงานเขต

### 3.2 Excel Format
- ใช้ template จาก `Formรายงานเงินคงเหลือ.xlsx` เป็นต้นแบบ
- สีตาม format สำนักงานเขต
- รายการตาม BalanceReportTemplate (ปรับได้)
- หมายเหตุ = แสดงเฉพาะรายการที่เปลี่ยนแปลงวันนั้น
- ลายเซ็น: ดึงจาก Master Data ข้อมูลโรงเรียน
  - เจ้าหน้าที่การเงิน
  - กรรมการ 3 คน
  - รอง ผอ.
  - ผอ.
- BahtText: ไม่จำเป็น (ไม่มีในรายงานนี้)

### 3.3 บันทึกสถานะ
- หลังออก Excel → บันทึกลง BalanceReportIssued
- เปลี่ยนสถานะเป็น "ออกแล้ว"
- เก็บ link ดาวน์โหลด

---

## Phase 4: เพิ่ม Sidebar + ปรับ Navigation

### 4.1 เพิ่มเมนู Sidebar
- "ตั้งค่า" section: เพิ่ม "รายการรายงานคงเหลือ" → `/settings/balance-template`

---

## สิ่งที่รอ Feedback จากครู

```
1. คอลัมน์ "ส่วนราชการผู้เบิก" — ใช้กับรายการไหนบ้าง?
2. รายการที่ผูกบัญชีเดียวกัน — ยอดแยกกันอย่างไร?
   → เสนอ: ผูกกับ "ประเภทเงิน" แทน แล้วคำนวณจากยอดตั้งต้น ± เบิกจ่าย
3. ยอดตั้งต้นปีงบ — ครูมีตัวเลขพร้อมกรอกหรือไม่?
4. กรรมการเก็บรักษาเงิน — 3 คนใช่ไหม? มีเปลี่ยนบ่อยไหม?
```

---

## ลำดับการทำงาน

```
Phase 1 → สร้าง Master Data template + seed ข้อมูล + เพิ่มกรรมการ
Phase 2 → สร้างหน้ารายงานยอดเปลี่ยนแปลง
Phase 3 → สร้าง Excel output
Phase 4 → ปรับ Navigation

→ ให้ครูดู → ปรับแก้ตาม feedback
```
