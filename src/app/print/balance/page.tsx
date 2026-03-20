import { prisma } from '@/lib/db'
import { formatThaiDate, formatCurrency, getCurrentFiscalYear } from '@/lib/utils'
import PrintButton from '../PrintButton'

export default async function BalancePrintPage({
  searchParams,
}: {
  searchParams: Promise<{ fiscalYear?: string }>
}) {
  const { fiscalYear: fiscalYearParam } = await searchParams
  const fiscalYear = fiscalYearParam
    ? parseInt(fiscalYearParam, 10)
    : getCurrentFiscalYear()

  const balanceReport = await prisma.balanceReport.findFirst({
    where: { fiscalYear },
    orderBy: { reportDate: 'desc' },
    include: {
      entries: {
        include: {
          budgetType: {
            include: {
              parent: true,
            },
          },
        },
        orderBy: {
          budgetType: { sortOrder: 'asc' },
        },
      },
    },
  })

  const entries = balanceReport?.entries ?? []
  const reportDate = balanceReport
    ? formatThaiDate(balanceReport.reportDate)
    : formatThaiDate(new Date())

  const totalCash = entries.reduce((sum, e) => sum + e.cash, 0)
  const totalBankDeposit = entries.reduce((sum, e) => sum + e.bankDeposit, 0)
  const totalAccumulated = entries.reduce((sum, e) => sum + e.accumulated, 0)
  const totalAll = entries.reduce((sum, e) => sum + e.total, 0)

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              @page {
                size: A4 portrait;
                margin: 15mm 18mm;
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
              font-size: 14pt;
              line-height: 1.4;
              max-width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              padding: 15mm 18mm;
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
            .balance-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 10pt;
              font-size: 13pt;
            }
            .balance-table th,
            .balance-table td {
              border: 1px solid black;
              padding: 3pt 5pt;
              text-align: center;
            }
            .balance-table th {
              background-color: #f0f0f0;
              font-weight: bold;
              font-size: 12pt;
            }
            .balance-table td.text-left {
              text-align: left;
              padding-left: 8pt;
            }
            .balance-table td.text-right {
              text-align: right;
              padding-right: 6pt;
            }
            .balance-table tfoot td {
              font-weight: bold;
              background-color: #f9f9f9;
            }
            .sig-row {
              display: flex;
              justify-content: space-between;
              margin-top: 6pt;
            }
            .sig-item {
              text-align: center;
              width: 22%;
            }
            .sig-item-half {
              text-align: center;
              width: 45%;
            }
            .note-text {
              font-size: 11pt;
              color: #333;
              margin-top: 10pt;
            }
          `,
        }}
      />

      <PrintButton />

      <div className="doc-page">
        {/* Garuda emblem */}
        <div style={{ textAlign: 'center', marginBottom: '6pt' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/garuda.png"
            alt="ตราครุฑ"
            style={{ height: '60px', display: 'inline-block' }}
          />
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '2pt' }}>
          <h1
            style={{
              fontSize: '18pt',
              fontWeight: 'bold',
              margin: 0,
            }}
          >
            รายงานสรุปประเภทเงินคงเหลือ
          </h1>
        </div>

        <div
          style={{
            textAlign: 'center',
            marginBottom: '2pt',
            fontSize: '15pt',
          }}
        >
          โรงเรียนวัดบ้านดอน สพป.รย.1
        </div>

        <div
          style={{
            textAlign: 'center',
            marginBottom: '10pt',
            fontSize: '14pt',
          }}
        >
          ณ วันที่ {reportDate}
        </div>

        {/* Table */}
        <table className="balance-table">
          <thead>
            <tr>
              <th style={{ width: '30%' }}>ประเภทเงินคงเหลือ</th>
              <th style={{ width: '14%' }}>เงินสด</th>
              <th style={{ width: '16%' }}>จำนวนเงินฝากธนาคาร</th>
              <th style={{ width: '16%' }}>จำนวนเงินสะสม</th>
              <th style={{ width: '14%' }}>รวม</th>
              <th style={{ width: '10%' }}>หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map((entry) => (
                <tr key={entry.id}>
                  <td className="text-left">
                    {entry.budgetType.parent
                      ? `  ${entry.budgetType.name}`
                      : entry.budgetType.name}
                  </td>
                  <td className="text-right">
                    {formatCurrency(entry.cash)}
                  </td>
                  <td className="text-right">
                    {formatCurrency(entry.bankDeposit)}
                  </td>
                  <td className="text-right">
                    {formatCurrency(entry.accumulated)}
                  </td>
                  <td className="text-right">
                    {formatCurrency(entry.total)}
                  </td>
                  <td className="text-left" style={{ fontSize: '11pt' }}>
                    {entry.remark ?? ''}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ padding: '16pt', color: '#666' }}>
                  ไม่มีข้อมูลสำหรับปีงบประมาณ {fiscalYear}
                </td>
              </tr>
            )}
          </tbody>
          {entries.length > 0 && (
            <tfoot>
              <tr>
                <td className="text-left">รวมทั้งสิ้น</td>
                <td className="text-right">{formatCurrency(totalCash)}</td>
                <td className="text-right">
                  {formatCurrency(totalBankDeposit)}
                </td>
                <td className="text-right">
                  {formatCurrency(totalAccumulated)}
                </td>
                <td className="text-right">{formatCurrency(totalAll)}</td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>

        {/* Reporter signature */}
        <div style={{ marginTop: '30pt' }}>
          <div style={{ textAlign: 'center' }}>
            <div>
              ลงชื่อ..........................................................
              ผู้รายงาน
            </div>
            <div style={{ marginTop: '4pt' }}>(นางมณฑิรา สายยศ)</div>
            <div>เจ้าหน้าที่การเงิน</div>
          </div>
        </div>

        {/* Committee section */}
        <div style={{ marginTop: '24pt', fontSize: '13pt' }}>
          <div style={{ marginBottom: '6pt' }}>
            คณะกรรมการเก็บรักษาเงินได้ตรวจนับเงินสดคงเหลือประจำวันฯ
          </div>

          <div className="sig-row">
            <div className="sig-item">
              <div>ลงชื่อ..........................</div>
              <div style={{ marginTop: '2pt' }}>กรรมการ</div>
            </div>
            <div className="sig-item">
              <div>ลงชื่อ..........................</div>
              <div style={{ marginTop: '2pt' }}>กรรมการ</div>
            </div>
            <div className="sig-item">
              <div>ลงชื่อ..........................</div>
              <div style={{ marginTop: '2pt' }}>กรรมการ</div>
            </div>
            <div className="sig-item">
              <div>ลงชื่อ..........................</div>
              <div style={{ marginTop: '2pt' }}>กรรมการ</div>
            </div>
          </div>
        </div>

        {/* Vice principal + Principal signatures */}
        <div className="sig-row" style={{ marginTop: '24pt' }}>
          <div className="sig-item-half">
            <div>
              ลงชื่อ..........................................................
            </div>
            <div style={{ marginTop: '4pt' }}>
              (นางภควรรณ มีเจริญ)
            </div>
            <div>รองผู้อำนวยการโรงเรียนวัดบ้านดอน</div>
          </div>
          <div className="sig-item-half">
            <div>
              ลงชื่อ..........................................................
            </div>
            <div style={{ marginTop: '4pt' }}>
              (นางสาววิภาพรรณ อุบล)
            </div>
            <div>ผู้อำนวยการโรงเรียนวัดบ้านดอน</div>
          </div>
        </div>

        {/* Note */}
        <div className="note-text">
          หมายเหตุ วันที่ไม่มีการเคลื่อนไหวของเงิน ไม่ต้องทำรายงานเงินคงเหลือประจำวัน
        </div>
      </div>
    </>
  )
}
