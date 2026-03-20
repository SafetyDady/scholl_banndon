import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
  try {
    const session = await getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get all PaymentRecords with tax > 0
    const records = await prisma.paymentRecord.findMany({
      where: {
        taxWithheld: { gt: 0 },
      },
      include: {
        contractor: true,
        disbursementItem: {
          select: {
            description: true,
            disbursementGroup: {
              select: {
                approvalRequest: {
                  select: {
                    id: true,
                    memoNumber: true,
                    sequenceNumber: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: { paymentDate: 'desc' },
    })

    const data = records.map((r) => ({
      id: r.id,
      paymentDate: r.paymentDate.toISOString(),
      payeeName: r.payeeName,
      amount: r.amount,
      taxPercent: r.taxPercent,
      taxWithheld: r.taxWithheld,
      netAmount: r.netAmount,
      taxCertificateNo: r.taxCertificateNo,
      taxCertificateDate: r.taxCertificateDate?.toISOString() || null,
      description: r.disbursementItem.description,
      approvalRequestId: r.disbursementItem.disbursementGroup.approvalRequest.id,
      memoNumber: r.disbursementItem.disbursementGroup.approvalRequest.memoNumber,
      contractorTaxId: r.contractor?.taxId || null,
      contractorAddress: r.contractor?.address || null,
    }))

    return NextResponse.json(data)
  } catch (error) {
    console.error('Tax GET error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
