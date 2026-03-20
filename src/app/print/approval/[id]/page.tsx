import { prisma } from '@/lib/db'
import { formatThaiDate, formatCurrency } from '@/lib/utils'
import { redirect } from 'next/navigation'
import PrintButton from '../../PrintButton'

export default async function ApprovalPrintPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const approvalId = parseInt(id, 10)

  if (isNaN(approvalId)) {
    redirect('/disbursements')
  }

  const approval = await prisma.approvalRequest.findUnique({
    where: { id: approvalId },
    include: {
      createdBy: true,
      disbursementGroups: {
        include: {
          budgetType: true,
          items: { orderBy: { sortOrder: 'asc' } },
        },
        orderBy: { sortOrder: 'asc' },
      },
    },
  })

  if (!approval) {
    redirect('/disbursements')
  }

  const thaiDate = formatThaiDate(approval.requestDate)
  const creatorName = approval.createdBy.fullName
  const creatorPosition = approval.createdBy.position

  // Calculate grand total from all groups
  const grandTotal = approval.disbursementGroups.reduce(
    (sum, group) =>
      sum +
      group.items.reduce((itemSum, item) => itemSum + item.amount, 0),
    0
  )

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              @page {
                size: A4 portrait;
                margin: 20mm 25mm;
              }
              .no-print {
                display: none !important;
              }
              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
            }
            .doc-page {
              font-family: 'Sarabun', 'TH Sarabun New', sans-serif;
              font-size: 16pt;
              line-height: 1.5;
              max-width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              padding: 20mm 25mm;
              background: white;
              color: black;
            }
            @media screen {
              .doc-page {
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                margin-top: 20px;
                margin-bottom: 20px;
              }
            }
            .amount-line {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              padding-left: 30pt;
            }
            .amount-line .desc {
              flex: 1;
            }
            .amount-line .money {
              text-align: right;
              white-space: nowrap;
              min-width: 120pt;
            }
            .subtotal-line {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              padding-left: 30pt;
              border-top: 1px solid #999;
              margin-top: 4pt;
              padding-top: 4pt;
            }
            .grand-total-line {
              display: flex;
              justify-content: space-between;
              align-items: baseline;
              border-top: 2px solid black;
              margin-top: 8pt;
              padding-top: 6pt;
              font-weight: bold;
            }
            .signature-block {
              text-align: center;
              width: 45%;
            }
            .signature-block .sig-line {
              margin-bottom: 4pt;
            }
          `,
        }}
      />

      <PrintButton />

      <div className="doc-page">
        {/* Garuda emblem */}
        <div style={{ textAlign: 'center', marginBottom: '8pt' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/garuda.png"
            alt="ตราครุฑ"
            style={{ height: '60px', display: 'inline-block' }}
          />
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '8pt' }}>
          <h1
            style={{
              fontSize: '20pt',
              fontWeight: 'bold',
              margin: 0,
            }}
          >
            บันทึกข้อความ
          </h1>
        </div>

        {/* Header fields */}
        <div style={{ marginBottom: '4pt' }}>
          <strong>ส่วนราชการ</strong>&nbsp;&nbsp;โรงเรียนวัดบ้านดอน
          สังกัดสำนักงานเขตพื้นที่การศึกษาประถมศึกษาระยอง เขต 1
        </div>

        <div
          style={{
            marginBottom: '4pt',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <strong>ที่</strong>&nbsp;&nbsp;
            {approval.memoNumber || '________'}
          </div>
          <div>
            <strong>วันที่</strong>&nbsp;&nbsp;{thaiDate}
          </div>
        </div>

        <div style={{ marginBottom: '4pt' }}>
          <strong>เรื่อง</strong>&nbsp;&nbsp;ขออนุมัติเบิกเงิน
        </div>

        <div
          style={{
            marginBottom: '12pt',
            borderBottom: '1px solid black',
            paddingBottom: '8pt',
          }}
        >
          <strong>เรียน</strong>&nbsp;&nbsp;ผู้อำนวยการโรงเรียนวัดบ้านดอน
        </div>

        {/* Body paragraph */}
        <div style={{ textIndent: '60pt', marginBottom: '8pt' }}>
          ด้วยข้าพเจ้า {creatorName} ตำแหน่ง {creatorPosition}{' '}
          โรงเรียนวัดบ้านดอน ขอเบิกเงิน
          หมวดเงินอุดหนุน และหมวดเงินเทศบาล ดังรายการต่อไปนี้
        </div>

        {/* Groups with items */}
        {approval.disbursementGroups.map((group) => {
          const groupTotal = group.items.reduce(
            (sum, item) => sum + item.amount,
            0
          )
          return (
            <div key={group.id} style={{ marginTop: '12pt', marginBottom: '8pt' }}>
              {/* Budget type header - bold, underline like yellow highlight */}
              <div
                style={{
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  marginBottom: '6pt',
                }}
              >
                รหัส {group.budgetType.name}
              </div>

              {/* Items */}
              {group.items.map((item, idx) => (
                <div key={item.id} className="amount-line">
                  <span className="desc">
                    {idx + 1}. {item.description}
                  </span>
                  <span className="money">
                    เป็นเงิน&nbsp;&nbsp;{formatCurrency(item.amount)}&nbsp;&nbsp;บาท
                  </span>
                </div>
              ))}

              {/* Subtotal */}
              <div className="subtotal-line">
                <span className="desc">รวมเงิน</span>
                <span className="money">
                  เป็นเงิน&nbsp;&nbsp;{formatCurrency(groupTotal)}&nbsp;&nbsp;บาท
                </span>
              </div>
            </div>
          )
        })}

        {/* Grand total */}
        <div className="grand-total-line">
          <span style={{ flex: 1 }}>รวมจำนวนเงินที่ขอเบิกทั้งสิ้น</span>
          <span
            style={{
              textAlign: 'right',
              whiteSpace: 'nowrap',
              minWidth: '120pt',
            }}
          >
            เป็นเงิน&nbsp;&nbsp;{formatCurrency(grandTotal)}&nbsp;&nbsp;บาท
          </span>
        </div>

        {/* Closing */}
        <div style={{ textIndent: '60pt', marginTop: '20pt' }}>
          จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ
        </div>

        {/* Signature - requester */}
        <div
          style={{
            marginTop: '40pt',
            textAlign: 'right',
            paddingRight: '20pt',
          }}
        >
          <div>ลงชื่อ..........................................................</div>
          <div style={{ marginTop: '4pt' }}>({creatorName})</div>
          <div>เจ้าหน้าที่การเงิน</div>
        </div>

        {/* Admin opinion section */}
        <div style={{ marginTop: '36pt' }}>
          <div style={{ marginBottom: '8pt' }}>
            <strong>ความเห็นของผู้บริหารโรงเรียน</strong>
          </div>

          <div style={{ marginBottom: '16pt', fontSize: '15pt' }}>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{ marginRight: '16pt' }}>&#9744; ทราบ</span>
            <span>&#9744; อนุมัติ</span>
          </div>

          {/* Vice principal + Principal signatures */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '40pt',
            }}
          >
            <div className="signature-block">
              <div className="sig-line">
                ลงชื่อ..........................................................
              </div>
              <div style={{ marginTop: '4pt' }}>
                (นางภควรรณ มีเจริญ)
              </div>
              <div>รองผู้อำนวยการโรงเรียนวัดบ้านดอน</div>
            </div>
            <div className="signature-block">
              <div className="sig-line">
                ลงชื่อ..........................................................
              </div>
              <div style={{ marginTop: '4pt' }}>
                (นางสาววิภาพรรณ อุบล)
              </div>
              <div>ผู้อำนวยการโรงเรียนวัดบ้านดอน</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
