# Deploy to Railway — banndon-finance

## Prerequisites
- Railway CLI installed (`npm i -g @railway/cli`)
- GitHub repo: https://github.com/SafetyDady/scholl_banndon.git

---

## Step 1: Create Railway Project

```bash
railway login
railway init    # ตั้งชื่อ: banndon-finance
```

## Step 2: Add PostgreSQL

```bash
railway add --plugin postgresql
```

Railway จะสร้าง `DATABASE_URL` ให้อัตโนมัติ

## Step 3: Set Environment Variables

```bash
railway variables set SESSION_SECRET=$(openssl rand -hex 32)
```

## Step 4: Deploy

ตัวเลือก A — Deploy จาก GitHub:
- Railway Dashboard → New Service → GitHub → เลือก repo
- ระบบจะ build Dockerfile อัตโนมัติ

ตัวเลือก B — Deploy จาก CLI:
```bash
railway up
```

## Step 5: Run Migration (หลัง deploy สำเร็จ)

```bash
railway run npx prisma migrate deploy
```

## Step 6: Import Data

```bash
# Import ข้อมูลจริงจาก seed_data.sql
railway run bash -c 'psql "$DATABASE_URL" < prisma/seed_data.sql'
```

ข้อมูลที่ import:
| Table | Records |
|-------|---------|
| User | 5 |
| BankAccount | 6 |
| BudgetType | 13 |
| ApprovalRequest | 19 |
| DisbursementGroup | 40 |
| DisbursementItem | 96 |
| BankStatement | 63 |
| SchoolInfo | 17 |
| WorkflowSetting | 2 |
| Contractor | 7 |
| BalanceReportTemplate | 26 |
| Permission | 22 |
| RolePermission | 57 |
| WorkflowAction | 42 |
| PaymentRecord | 3 |
| BalanceReportIssued | 3 |

## Step 7: Change Production Passwords

```bash
railway run npx tsx scripts/change-passwords.ts
```

ผลลัพธ์:
- `montira` → `Jeab271223` (FINANCE_OFFICER)
- `admin` → `Saiyot5651` (ADMIN)

## Step 8: Create Domain

Railway Dashboard → Settings → Domains → Generate Domain
จะได้ URL: `https://banndon-finance-xxxxx.railway.app`

---

## Environment Variables Summary

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Railway auto-generates |
| `SESSION_SECRET` | Random hex string |
| `PORT` | Railway manages automatically |

## Important Notes

- ❌ ห้าม `prisma migrate reset` บน production
- ✅ ใช้ `prisma migrate deploy` เท่านั้น
- ❌ ห้ามลบข้อมูลโดยไม่ backup ก่อน
- Railway จัดการ PORT เอง ไม่ต้องตั้ง
- Dockerfile ใช้ `output: "standalone"` mode

## Backup Production Data

```bash
railway run bash -c 'pg_dump "$DATABASE_URL" --data-only --inserts > /tmp/backup.sql && cat /tmp/backup.sql' > backup_prod.sql
```
