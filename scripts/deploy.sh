#!/bin/bash
# ===========================================
# Railway Deploy Script - banndon-finance
# ===========================================
# วิธีใช้: รัน command ทีละขั้นตอนบน Railway shell
# หรือใช้ railway run bash แล้วรัน script นี้

set -e

echo "========================================="
echo "  banndon-finance - Railway Deploy"
echo "========================================="

# Step 1: Run migration
echo ""
echo "[1/3] Running Prisma migrations..."
npx prisma migrate deploy
echo "✅ Migrations applied"

# Step 2: Import data
echo ""
echo "[2/3] Importing production data..."
if [ -f prisma/seed_data.sql ]; then
  # Use DATABASE_URL from Railway env
  psql "$DATABASE_URL" < prisma/seed_data.sql
  echo "✅ Data imported (Users, BankAccounts, BudgetTypes, Disbursements, etc.)"
else
  echo "⚠️  seed_data.sql not found, running seed instead..."
  npx prisma db seed
  echo "✅ Seed completed"
fi

# Step 3: Change passwords
echo ""
echo "[3/3] Setting production passwords..."
npx tsx scripts/change-passwords.ts
echo "✅ Passwords updated"

echo ""
echo "========================================="
echo "  Deploy complete!"
echo "========================================="
echo ""
echo "Login credentials:"
echo "  montira → Jeab271223 (FINANCE_OFFICER)"
echo "  admin   → Saiyot5651 (ADMIN)"
echo ""
