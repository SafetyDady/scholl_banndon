import { prisma } from "@/lib/db";
import { formatThaiDate, formatCurrency, getCurrentFiscalYear } from "@/lib/utils";
import PrintButton from "../PrintButton";

export default async function BalancePrintPage({
  searchParams,
}: {
  searchParams: Promise<{ fiscalYear?: string }>;
}) {
  const { fiscalYear: fiscalYearParam } = await searchParams;
  const fiscalYear = fiscalYearParam
    ? parseInt(fiscalYearParam, 10)
    : getCurrentFiscalYear();

  // Get the latest balance report for this fiscal year
  const balanceReport = await prisma.balanceReport.findFirst({
    where: { fiscalYear },
    orderBy: { reportDate: "desc" },
    include: {
      entries: {
        include: {
          budgetType: true,
        },
        orderBy: {
          budgetType: { sortOrder: "asc" },
        },
      },
    },
  });

  const entries = balanceReport?.entries ?? [];
  const reportDate = balanceReport
    ? formatThaiDate(balanceReport.reportDate)
    : formatThaiDate(new Date());

  // Calculate totals
  const totalBroughtForward = entries.reduce(
    (sum, e) => sum + e.broughtForward,
    0
  );
  const totalReceived = entries.reduce((sum, e) => sum + e.received, 0);
  const totalDisbursed = entries.reduce((sum, e) => sum + e.disbursed, 0);
  const totalBalance = entries.reduce((sum, e) => sum + e.balance, 0);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              @page {
                size: A4 portrait;
                margin: 15mm 20mm 15mm 20mm;
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
              font-family: 'TH Sarabun New', 'Sarabun', 'Noto Sans Thai', sans-serif;
              font-size: 14pt;
              line-height: 1.4;
              max-width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              padding: 15mm 20mm;
              background: white;
              color: black;
            }
            @media screen {
              .doc-page {
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
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
              padding: 4pt 6pt;
              text-align: center;
            }
            .balance-table th {
              background-color: #f0f0f0;
              font-weight: bold;
            }
            .balance-table td.text-left {
              text-align: left;
            }
            .balance-table td.text-right {
              text-align: right;
            }
            .balance-table tfoot td {
              font-weight: bold;
              background-color: #f9f9f9;
            }
          `,
        }}
      />

      {/* Print button */}
      <div className="no-print" style={{ textAlign: "center", padding: "16px" }}>
        <PrintButton />
      </div>

      <div className="doc-page">
        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "4pt" }}>
          <h1
            style={{
              fontSize: "18pt",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            รายงานสรุปประเภทเงินคงเหลือ
          </h1>
        </div>

        <div style={{ textAlign: "center", marginBottom: "4pt", fontSize: "15pt" }}>
          โรงเรียนวัดบ้านดอน สพป.รย.1
        </div>

        <div style={{ textAlign: "center", marginBottom: "12pt", fontSize: "14pt" }}>
          ประจำปีงบประมาณ {fiscalYear} &nbsp;&nbsp; ณ วันที่ {reportDate}
        </div>

        {/* Table */}
        <table className="balance-table">
          <thead>
            <tr>
              <th style={{ width: "8%" }}>ลำดับ</th>
              <th style={{ width: "28%" }}>ประเภทเงิน</th>
              <th style={{ width: "16%" }}>ยอดยกมา</th>
              <th style={{ width: "16%" }}>รับ</th>
              <th style={{ width: "16%" }}>จ่าย</th>
              <th style={{ width: "16%" }}>คงเหลือ</th>
            </tr>
          </thead>
          <tbody>
            {entries.length > 0 ? (
              entries.map((entry, index) => (
                <tr key={entry.id}>
                  <td>{index + 1}</td>
                  <td className="text-left">{entry.budgetType.name}</td>
                  <td className="text-right">
                    {formatCurrency(entry.broughtForward)}
                  </td>
                  <td className="text-right">
                    {formatCurrency(entry.received)}
                  </td>
                  <td className="text-right">
                    {formatCurrency(entry.disbursed)}
                  </td>
                  <td className="text-right">
                    {formatCurrency(entry.balance)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ padding: "16pt", color: "#666" }}>
                  ไม่มีข้อมูลสำหรับปีงบประมาณ {fiscalYear}
                </td>
              </tr>
            )}
          </tbody>
          {entries.length > 0 && (
            <tfoot>
              <tr>
                <td colSpan={2} className="text-left">
                  รวมทั้งสิ้น
                </td>
                <td className="text-right">
                  {formatCurrency(totalBroughtForward)}
                </td>
                <td className="text-right">
                  {formatCurrency(totalReceived)}
                </td>
                <td className="text-right">
                  {formatCurrency(totalDisbursed)}
                </td>
                <td className="text-right">
                  {formatCurrency(totalBalance)}
                </td>
              </tr>
            </tfoot>
          )}
        </table>

        {/* Signature section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "50pt",
          }}
        >
          <div style={{ textAlign: "center", width: "45%" }}>
            <div>
              ลงชื่อ..........................................................
            </div>
            <div style={{ marginTop: "4pt" }}>
              (.................................................)
            </div>
            <div>เจ้าหน้าที่การเงิน</div>
          </div>
          <div style={{ textAlign: "center", width: "45%" }}>
            <div>
              ลงชื่อ..........................................................
            </div>
            <div style={{ marginTop: "4pt" }}>
              (.................................................)
            </div>
            <div>ผู้อำนวยการโรงเรียนวัดบ้านดอน</div>
          </div>
        </div>
      </div>
    </>
  );
}
