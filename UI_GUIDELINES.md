# UI Guidelines — ระบบการเงิน โรงเรียนวัดบ้านดอน

> เอกสารนี้เป็นแนวทางออกแบบ UI ทั้งหมดของระบบ ต้องปฏิบัติตามอย่างเคร่งครัด

---

## 1. Theme & Color System

### Light Theme — น้ำเงินเข้ม + ขาว + เขียว

```
COLORS = {
  // Primary — น้ำเงินเข้ม (Navy)
  primary:        '#1e3a5f'     // สีหลัก (sidebar, header, ปุ่มหลัก)
  primaryHover:   '#163050'     // Hover state
  primaryLight:   '#e8eef5'     // Background อ่อน (selected row, badge)
  primaryMuted:   '#1e3a5f18'   // 10% opacity

  // Accent — เขียว (Green)
  accent:         '#16a34a'     // ปุ่มรอง, สถานะสำเร็จ, ลิงก์
  accentHover:    '#15803d'     // Hover
  accentLight:    '#f0fdf4'     // Background อ่อน

  // Semantic
  success:        '#16a34a'     // สำเร็จ, อนุมัติ
  warning:        '#f59e0b'     // คำเตือน, รอดำเนินการ
  danger:         '#ef4444'     // ผิดพลาด, ไม่อนุมัติ, ลบ
  info:           '#3b82f6'     // ข้อมูล

  // Background
  bg:             '#ffffff'     // พื้นหลักหน้าจอ
  surface:        '#f8fafc'     // พื้นหลัง card, content area
  surfaceHover:   '#f1f5f9'     // Hover state ของ row/card

  // Sidebar
  sidebar:        '#1e3a5f'     // พื้นหลัง sidebar (น้ำเงินเข้ม)
  sidebarHover:   '#2a4d76'     // Hover เมนู
  sidebarActive:  '#ffffff20'   // Active menu (ขาว 12%)
  sidebarText:    '#ffffff'     // ตัวหนังสือขาวบน sidebar
  sidebarMuted:   '#94b8db'     // ตัวหนังสือรอง sidebar

  // Border
  border:         '#e2e8f0'     // เส้นขอบหลัก
  borderLight:    '#f1f5f9'     // เส้นขอบอ่อน

  // Text
  text:           '#0f172a'     // ตัวหนังสือหลัก (เกือบดำ)
  textSecondary:  '#64748b'     // ตัวหนังสือรอง
  textMuted:      '#94a3b8'     // ตัวหนังสือจาง
}
```

### Contrast Ratios (WCAG 2.1 AA Compliant)
- text (#0f172a) on bg (#ffffff): 17.4:1 ✅ AAA
- textSecondary (#64748b) on bg: 5.4:1 ✅ AA
- sidebarText (#ffffff) on sidebar (#1e3a5f): 9.8:1 ✅ AAA

---

## 2. Typography

### Font Family
- **หลัก**: `'Sarabun', sans-serif` (ภาษาไทย + อังกฤษ)
- **ตัวเลข/รหัส**: `'IBM Plex Mono', monospace` (จำนวนเงิน, เลขที่เอกสาร, ลำดับ)

### Font Weights
- 300: Light (ข้อความรอง เล็กๆ)
- 400: Regular (ข้อความทั่วไป)
- 500: Medium (Label, ข้อความรอง เน้น)
- 600: SemiBold (หัวข้อ, ชื่อหน้า)
- 700: Bold (ตัวเลขสำคัญ, ค่าใน StatCard)

### Font Sizes
| ขนาด | ใช้สำหรับ |
|-------|----------|
| 24px | ตัวเลขใหญ่ใน StatCard |
| 18-20px | หัวข้อหน้า (PageHeader title) |
| 14-15px | ข้อความปกติ, Tab labels |
| 13px | ข้อความรอง, labels |
| 12px | หัวตาราง, badge, caption |
| 11px | ข้อความเล็กมาก, muted |

---

## 3. Icon System

### ใช้ Lucide React เท่านั้น

```bash
npm install lucide-react
```

```jsx
import { LayoutDashboard, FileText, DollarSign } from 'lucide-react'

// ขนาดมาตรฐาน
<Icon size={18} />    // เมนู sidebar
<Icon size={16} />    // ปุ่ม, inline
<Icon size={20} />    // StatCard icon
<Icon size={24} />    // หัวข้อใหญ่
```

### กฎเด็ดขาด
- ❌ **ห้ามใช้ Emoji** ทุกที่ (ไม่ว่า sidebar, ปุ่ม, หรือที่ใดก็ตาม)
- ❌ **ห้ามใช้ @ant-design/icons**
- ❌ **ห้ามใช้ SVG inline** ที่ไม่ใช่จาก Lucide
- ✅ ใช้ `lucide-react` เท่านั้น

### Icon Mapping สำหรับเมนู
| เมนู | Icon |
|------|------|
| หน้าหลัก | `LayoutDashboard` |
| รายการเบิกจ่าย | `FileText` |
| รายการรออนุมัติ | `ClipboardCheck` |
| รายงานเงินคงเหลือ | `Wallet` |
| หักภาษี ณ ที่จ่าย | `Receipt` |
| ตั้งค่า | `Settings` |
| ออกจากระบบ | `LogOut` |

---

## 4. Component Library

### ใช้ Tailwind CSS + shadcn/ui

```bash
npx shadcn@latest init
```

### Shared Components (ต้องมี)

#### 4.1 PageHeader
ทุกหน้าต้องใช้ PageHeader เป็นส่วนหัว

```jsx
<PageHeader
  title="รายการเบิกจ่าย"
  subtitle="จัดการรายการเบิกจ่ายทั้งหมด"
  actions={<Button>สร้างรายการใหม่</Button>}
/>
```

- title: 20px, font-weight 600, text color primary
- subtitle: 13px, textSecondary
- actions: ชิดขวา

#### 4.2 StatusBadge
แสดงสถานะทุกที่ต้องใช้ StatusBadge

```jsx
<StatusBadge status="APPROVED" />
<StatusBadge status="PENDING_APPROVAL" />
```

| Status | สีพื้น | สีตัวหนังสือ | Label |
|--------|--------|-------------|-------|
| DRAFT | gray-100 | gray-700 | ร่าง |
| PENDING_APPROVAL | amber-50 | amber-700 | รออนุมัติ |
| APPROVED | blue-50 | blue-700 | อนุมัติแล้ว |
| WITHDRAWN | indigo-50 | indigo-700 | เบิกเงินแล้ว |
| PAID | purple-50 | purple-700 | จ่ายเงินแล้ว |
| TAX_ISSUED | pink-50 | pink-700 | ออกใบ 50 ทวิแล้ว |
| BALANCE_REPORTED | teal-50 | teal-700 | รายงานยอดแล้ว |
| COMPLETED | green-50 | green-700 | เสร็จสิ้น |
| REJECTED | red-50 | red-700 | ไม่อนุมัติ |

- border-radius: 6px
- font-size: 12px, font-weight: 600
- padding: 2px 10px

#### 4.3 StatCard
Dashboard summary card

```jsx
<StatCard
  title="ยอดเบิกจ่ายทั้งหมด"
  value="1,748,834.18"
  suffix="บาท"
  icon={<DollarSign />}
  color="primary"
  trend={{ value: '+12%', positive: true }}
/>
```

- Left border: 3px สี primary/accent/warning/danger
- Background: white, shadow-sm, rounded-xl
- Icon: มุมบนขวา, background สีอ่อน
- Value: font-mono, 24px, font-weight 700
- Hover: shadow-md transition

#### 4.4 WorkflowTracker
แสดง 7 ขั้นตอนของ workflow

```
 (1)-----(2)-----(3)-----(4)-----(5)-----(6)-----(7)
  ✓       ✓       ●       ○       ○       ○       ○
ยื่นเรื่อง  อนุมัติ  เบิกเงิน  จ่ายเงิน  50 ทวิ  คงเหลือ  สรุปภาษี
```

- ✓ สำเร็จ: วงกลมเขียว + checkmark ขาว
- ● กำลังดำเนินการ: วงกลมน้ำเงินเข้ม + pulse animation
- ○ ยังไม่ถึง: วงกลมเทา
- ✗ ไม่อนุมัติ: วงกลมแดง + X
- เส้นเชื่อม: เขียว (ผ่านแล้ว) / เทา (ยังไม่ถึง)

---

## 5. Sidebar Navigation

### Desktop (≥ 1024px)
- **แบบย่อ/ขยาย** เหมือน SSS Corp ERP
- ย่อ: width 64px (แสดงแค่ icon)
- ขยาย: width 240px (icon + ชื่อเมนู)
- Toggle button: ด้านล่าง sidebar
- พื้นหลัง: `#1e3a5f` (น้ำเงินเข้ม)
- ตัวหนังสือ: ขาว
- Active menu: พื้นขาว 12% opacity + เส้นซ้าย 3px ขาว
- Hover: พื้น `#2a4d76`

### Mobile (< 1024px)
- Hamburger button ที่ Topbar
- Drawer slide จากซ้าย (width 280px)
- Overlay สีดำ 50% opacity
- ปิดด้วย X button หรือกดนอก drawer

### Header ใน Sidebar
- Logo/ชื่อโรงเรียน ด้านบน
- แบบย่อ: แสดงแค่ "บด" (ตัวย่อ)
- แบบขยาย: "ร.ร.วัดบ้านดอน"

---

## 6. Login System

### 6.1 Desktop Login (PC/Laptop)
- Login ด้วย **Username + Password** เท่านั้น
- ไม่มีปุ่ม LINE Login บน Desktop
- พื้นหลัง: gradient น้ำเงินเข้ม
- Card ขาว: ชื่อระบบ + logo โรงเรียน + form

### 6.2 Mobile Login (มือถือ)
- แสดงทั้ง 2 แบบ:
  - Username + Password (เหมือน Desktop)
  - **ปุ่ม "เข้าสู่ระบบด้วย LINE"** (สีเขียว LINE #06c755)
- LINE Login ใช้ LINE LIFF SDK
- หลัง login LINE → ผูกกับ user ในระบบ (Admin ต้อง link LINE ID กับ user ก่อน)

### 6.3 Mobile Experience (ผ่าน LINE)
- สามารถ **ดูข้อมูล** ทุกอย่างตาม role
- สามารถ **อนุมัติ/ไม่อนุมัติ** (สำหรับ รอง ผอ. / ผอ.)
- **ไม่สามารถ** สร้าง/แก้ไขรายการเบิกจ่าย (ต้องทำบน Desktop)
- Bottom Navigation bar สำหรับ mobile (แทน sidebar)

---

## 7. Role & Permission System

### 7.1 Roles พื้นฐาน (5 roles)

| Role | Code | คำอธิบาย |
|------|------|---------|
| ครู | TEACHER | ดูข้อมูลที่เกี่ยวข้อง, ติดตามสถานะรายการที่ตนเองเกี่ยวข้อง |
| ครูการเงิน | FINANCE_OFFICER | กรอกข้อมูล, สร้างรายการ, ดำเนินการ workflow |
| รองผู้อำนวยการ | VICE_PRINCIPAL | ตรวจสอบ, อนุมัติ/ไม่อนุมัติ |
| ผู้อำนวยการ | PRINCIPAL | อนุมัติ/ไม่อนุมัติ, ดูรายงานทุกอย่าง |
| ผู้ดูแลระบบ | ADMIN | จัดการผู้ใช้, กำหนดสิทธิ์, ตั้งค่าระบบ |

### 7.2 Permission Matrix (ค่า default)

| ความสามารถ | TEACHER | FINANCE_OFFICER | VICE_PRINCIPAL | PRINCIPAL | ADMIN |
|-----------|:-:|:-:|:-:|:-:|:-:|
| ดู Dashboard | ✅ | ✅ | ✅ | ✅ | ✅ |
| ดูรายการเบิกจ่าย | ✅ (เฉพาะที่เกี่ยวข้อง) | ✅ | ✅ | ✅ | ✅ |
| สร้างรายการเบิกจ่าย | ❌ | ✅ | ❌ | ❌ | ✅ |
| แก้ไข/ลบ รายการ (DRAFT) | ❌ | ✅ | ❌ | ❌ | ✅ |
| ส่งขออนุมัติ | ❌ | ✅ | ❌ | ❌ | ✅ |
| อนุมัติ/ไม่อนุมัติ | ❌ | ❌ | ✅ | ✅ | ✅ |
| ดำเนินการ step 3-7 | ❌ | ✅ | ❌ | ❌ | ✅ |
| ดูรายงานเงินคงเหลือ | ❌ | ✅ | ✅ | ✅ | ✅ |
| ดูหักภาษี | ❌ | ✅ | ✅ | ✅ | ✅ |
| พิมพ์เอกสาร | ❌ | ✅ | ✅ | ✅ | ✅ |
| จัดการผู้ใช้ | ❌ | ❌ | ❌ | ❌ | ✅ |
| กำหนดสิทธิ์ custom | ❌ | ❌ | ❌ | ❌ | ✅ |
| ตั้งค่าระบบ | ❌ | ❌ | ❌ | ❌ | ✅ |
| เข้าผ่าน LINE (มือถือ) | ✅ | ✅ | ✅ | ✅ | ❌ |

### 7.3 Custom Permission (Admin ปรับได้)
Admin สามารถปรับ permission ของแต่ละ role ได้:

```
Permission Groups:
├── disbursement (รายการเบิกจ่าย)
│   ├── view      — ดูรายการ
│   ├── create    — สร้างรายการ
│   ├── edit      — แก้ไข
│   ├── delete    — ลบ
│   └── workflow  — ดำเนินการ workflow
├── approval (การอนุมัติ)
│   ├── view      — ดูรายการรออนุมัติ
│   └── approve   — อนุมัติ/ไม่อนุมัติ
├── balance (รายงานเงินคงเหลือ)
│   ├── view      — ดูรายงาน
│   └── manage    — สร้าง/แก้ไขรายงาน
├── tax (ภาษี)
│   ├── view      — ดูข้อมูลภาษี
│   └── manage    — จัดการภาษี
├── report (รายงาน)
│   └── view      — ดูรายงาน Dashboard
├── print (พิมพ์เอกสาร)
│   └── print     — พิมพ์เอกสาร
└── admin (ผู้ดูแลระบบ)
    ├── users     — จัดการผู้ใช้
    ├── roles     — จัดการสิทธิ์
    └── settings  — ตั้งค่าระบบ
```

---

## 8. Layout Structure

### 8.1 Fixed Header (Topbar)

Header อยู่ด้านบนสุด **fixed ตลอด** ไม่เลื่อนตาม scroll

```
┌─────────────────────────────────────────────────────────────┐
│  Logo  │  การเงิน  │  นักเรียน  │  ...     │  User  │ Out │
│  บด    │ ─────────  │            │          │  ชื่อ   │     │
└─────────────────────────────────────────────────────────────┘
          ▲ Tab Modules (เพิ่มได้ภายหลัง)
```

**โครงสร้าง Header:**
- **ซ้ายสุด**: Logo โรงเรียน + ชื่อย่อ "บด" (หรือ "ร.ร.วัดบ้านดอน" ถ้ามีที่)
- **กลาง**: **Tab Modules** — แต่ละ tab คือโมดูลของระบบ
  - Tab ที่ active มีเส้นล่างสี primary (underline 3px)
  - เมื่อกด tab → sidebar เปลี่ยนเมนูตามโมดูลนั้น
- **ขวาสุด**: ชื่อผู้ใช้ + role + ปุ่ม Logout

### Tab Modules (เพิ่มได้ภายหลัง)

| Tab | Icon (Lucide) | เมนู Sidebar | สถานะ |
|-----|---------------|-------------|--------|
| การเงิน | `Banknote` | หน้าหลัก, เบิกจ่าย, อนุมัติ, คงเหลือ, ภาษี | ✅ ทำตอนนี้ |
| นักเรียน | `GraduationCap` | (ยังไม่กำหนด) | 🔜 อนาคต |
| บุคลากร | `Users` | (ยังไม่กำหนด) | 🔜 อนาคต |
| ตั้งค่า | `Settings` | ผู้ใช้, สิทธิ์, ระบบ | ✅ ทำตอนนี้ |

> การเพิ่ม tab ใหม่: เพียงเพิ่ม entry ใน config array
> sidebar จะ render เมนูตาม tab ที่ active โดยอัตโนมัติ

### 8.2 Desktop Layout (≥ 1024px)

```
┌─────────────────────────────────────────────────────────────┐
│ Logo │ การเงิน │ นักเรียน │ ...        │ ชื่อผู้ใช้ │ Out │ ← Fixed Header (h-14)
├────────┬────────────────────────────────────────────────────┤
│        │                                                    │
│ Side   │     Main Content Area                              │
│ bar    │     (bg: #f8fafc)                                  │
│        │                                                    │
│ 64px   │     - PageHeader                                   │
│  or    │     - เนื้อหาหน้า                                   │
│ 240px  │                                                    │
│        │                                                    │
│ ย่อ/ขยาย│                                                    │
├────────┴────────────────────────────────────────────────────┤
```

- Header: fixed top, z-index 50, h-14 (56px), bg white, shadow-sm
- Sidebar: fixed left, top ต่อจาก header (top-14), z-index 40
- Content: margin-left ตาม sidebar (64px หรือ 240px), padding-top 56px

### 8.3 Mobile Layout (< 1024px)

```
┌─────────────────────────┐
│ ☰ │ การเงิน ▼ │ User   │ ← Fixed Header
├─────────────────────────┤
│                         │
│  Main Content           │
│  (full width)           │
│                         │
│                         │
├─────────────────────────┤
│ BottomNav               │
│  หน้าหลัก  รายการ  อนุมัติ  โปรไฟล์ │ ← Fixed Bottom
└─────────────────────────┘
```

- Header: hamburger (sidebar) + Module dropdown + user avatar
- Module tab เปลี่ยนเป็น **dropdown select** บนมือถือ (ประหยัดที่)
- Sidebar: drawer slide จากซ้าย (กด hamburger)
- Bottom Nav: 4 items (icon + label), fixed bottom, h-14

Bottom Navigation items (เปลี่ยนตาม Module ที่ active):
- **โมดูลการเงิน**: หน้าหลัก / รายการ / อนุมัติ (ถ้ามีสิทธิ์) / โปรไฟล์
- **โมดูลอื่น**: ปรับตามโมดูล

---

## 9. Table Design

### มาตรฐานตาราง
- Header: พื้น `#f8fafc`, ตัวหนังสือ `#64748b`, font-size 12px, uppercase
- Row: พื้นขาว, hover `#f1f5f9`
- Border: `#e2e8f0` (เส้นอ่อน)
- Striped: alternate row `#fafbfc` (optional)
- ตัวเลขเงิน: font-mono, ชิดขวา
- Status: ใช้ StatusBadge

### Mobile Table
- แปลงเป็น Card view บนมือถือ (< 768px)
- แต่ละ row เป็น 1 card
- แสดงข้อมูลสำคัญ 3-4 fields

---

## 10. Form Design

### มาตรฐานฟอร์ม
- Label: 13px, font-weight 500, textSecondary, อยู่ข้างบน input
- Input: border `#e2e8f0`, rounded-lg, padding 10px 14px
- Focus: border `#1e3a5f` (primary), ring-2 `#1e3a5f20`
- Error: border `#ef4444`, ข้อความ error สีแดงด้านล่าง
- Required: แสดง * สีแดง หลัง label
- Disabled: background `#f8fafc`, text `#94a3b8`

### ปุ่ม
- **Primary**: bg `#1e3a5f`, text ขาว, rounded-lg (สำหรับ action หลัก)
- **Secondary**: bg `#16a34a`, text ขาว (สำหรับ action รอง เช่น อนุมัติ)
- **Outline**: border `#e2e8f0`, text `#1e3a5f` (สำหรับ action ทั่วไป)
- **Danger**: bg `#ef4444`, text ขาว (ลบ, ไม่อนุมัติ)
- **Ghost**: ไม่มี border, text primary (link-style)
- ทุกปุ่ม: min-height 40px, padding 8px 20px

---

## 11. Print Document Design

### มาตรฐานเอกสารพิมพ์
- Font: Sarabun (เหมือนเอกสารราชการ)
- Size: A4 portrait
- Margin: 15mm ทุกด้าน
- ซ่อน sidebar, topbar, ปุ่มทั้งหมด ตอน print
- แสดงเฉพาะเนื้อหาเอกสาร

---

## 12. Hard Rules — กฎเด็ดขาด

1. ❌ **ห้ามใช้ Emoji** ในทุกที่ ใช้ Lucide icon แทน
2. ❌ **ห้าม Hardcode สี** ใช้จาก COLORS constant หรือ Tailwind config เท่านั้น
3. ✅ **ใช้ StatusBadge** สำหรับแสดงสถานะทุกที่
4. ✅ **ใช้ PageHeader** เป็นส่วนหัวทุกหน้า
5. ✅ **ใช้ font-mono** สำหรับตัวเลข (จำนวนเงิน, เลขที่เอกสาร)
6. ✅ **Tooltip ภาษาไทย** บนทุกปุ่ม action ที่เป็น icon-only
7. ✅ **Confirmation dialog** ก่อนทำ action ที่ย้อนกลับไม่ได้ (ลบ, ไม่อนุมัติ)
8. ✅ **Loading skeleton** ขณะโหลดข้อมูล (ไม่ใช่แค่ spinner)
9. ✅ **Empty state** แสดงข้อความเมื่อไม่มีข้อมูล
10. ✅ **ภาษาไทย** สำหรับ label/ข้อความทั้งหมด (ข้อมูลเช่น code อาจเป็นอังกฤษ)
