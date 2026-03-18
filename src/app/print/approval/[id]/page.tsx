import { prisma } from "@/lib/db";
import { formatThaiDate, formatCurrency } from "@/lib/utils";
import { redirect } from "next/navigation";
import PrintButton from "../../PrintButton";

export default async function ApprovalPrintPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const disbursementId = parseInt(id, 10);

  if (isNaN(disbursementId)) {
    redirect("/disbursements");
  }

  const disbursement = await prisma.disbursement.findUnique({
    where: { id: disbursementId },
    include: {
      budgetType: true,
      createdBy: true,
    },
  });

  if (!disbursement) {
    redirect("/disbursements");
  }

  const thaiDate = formatThaiDate(disbursement.requestDate);
  const totalFormatted = formatCurrency(disbursement.amount);
  const creatorName = disbursement.createdBy.fullName;
  const creatorPosition = disbursement.createdBy.position;
  const budgetTypeName = disbursement.budgetType.name;

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media print {
              @page {
                size: A4 portrait;
                margin: 20mm 25mm 20mm 25mm;
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
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                margin-top: 20px;
                margin-bottom: 20px;
              }
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
        <div style={{ textAlign: "center", marginBottom: "8pt" }}>
          <h1
            style={{
              fontSize: "20pt",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            บันทึกข้อความ
          </h1>
        </div>

        {/* Header lines */}
        <div style={{ marginBottom: "4pt" }}>
          <strong>ส่วนราชการ</strong>&nbsp;&nbsp;โรงเรียนวัดบ้านดอน
          สังกัดสำนักงานเขตพื้นที่การศึกษาประถมศึกษาระยองเขต 1
        </div>

        <div style={{ marginBottom: "4pt" }}>
          <strong>ที่</strong>&nbsp;&nbsp;
          {disbursement.memoNumber || "________"}&nbsp;&nbsp;&nbsp;&nbsp;
          <strong>วันที่</strong>&nbsp;&nbsp;{thaiDate}
        </div>

        <div style={{ marginBottom: "4pt" }}>
          <strong>เรื่อง</strong>&nbsp;&nbsp;ขออนุมัติเบิกเงินอุดหนุน
        </div>

        <div
          style={{
            marginBottom: "12pt",
            borderBottom: "1px solid black",
            paddingBottom: "8pt",
          }}
        >
          <strong>เรียน</strong>&nbsp;&nbsp;ผู้อำนวยการโรงเรียนวัดบ้านดอน
        </div>

        {/* Body */}
        <div style={{ textIndent: "60pt", marginBottom: "4pt" }}>
          ด้วยข้าพเจ้า {creatorName} ตำแหน่ง {creatorPosition}{" "}
          โรงเรียนวัดบ้านดอน ขอเบิกเงิน
          หมวดเงินอุดหนุน และหมวดเงินเทศบาล ดังรายการต่อไปนี้
        </div>

        {/* Budget type header */}
        <div style={{ marginTop: "12pt", marginBottom: "6pt" }}>
          <strong>{budgetTypeName}</strong>
        </div>

        {/* Item */}
        <div style={{ paddingLeft: "30pt", marginBottom: "6pt" }}>
          - {disbursement.description}&nbsp;&nbsp;เป็นเงิน{" "}
          <strong>{formatCurrency(disbursement.amount)}</strong> บาท
        </div>

        {/* Total */}
        <div
          style={{
            marginTop: "12pt",
            marginBottom: "8pt",
            paddingTop: "6pt",
            borderTop: "1px solid black",
          }}
        >
          <strong>
            รวมจำนวนเงินที่ขอเบิกทั้งสิ้น&nbsp;&nbsp;เป็นเงิน {totalFormatted}{" "}
            บาท
          </strong>
        </div>

        {/* Closing */}
        <div style={{ textIndent: "60pt", marginTop: "16pt" }}>
          จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ
        </div>

        {/* Signature section - requester */}
        <div
          style={{
            marginTop: "40pt",
            textAlign: "right",
            paddingRight: "20pt",
          }}
        >
          <div>
            ลงชื่อ..........................................................
          </div>
          <div style={{ marginTop: "4pt" }}>({creatorName})</div>
          <div>เจ้าหน้าที่การเงิน</div>
        </div>

        {/* Admin opinion section */}
        <div style={{ marginTop: "36pt" }}>
          <div style={{ marginBottom: "8pt" }}>
            <strong>ความเห็นของผู้บริหารโรงเรียน</strong>
          </div>

          <div style={{ marginBottom: "16pt", fontSize: "15pt" }}>
            &nbsp;&nbsp;&nbsp;&nbsp;☐ ทราบ&nbsp;&nbsp;&nbsp;&nbsp;☐ อนุมัติ
          </div>

          {/* Vice principal signatures */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "40pt",
            }}
          >
            <div style={{ textAlign: "center", width: "45%" }}>
              <div>
                ลงชื่อ..........................................................
              </div>
              <div style={{ marginTop: "4pt" }}>
                (.................................................)
              </div>
              <div>รองผู้อำนวยการโรงเรียน</div>
            </div>
            <div style={{ textAlign: "center", width: "45%" }}>
              <div>
                ลงชื่อ..........................................................
              </div>
              <div style={{ marginTop: "4pt" }}>
                (.................................................)
              </div>
              <div>รองผู้อำนวยการโรงเรียน</div>
            </div>
          </div>

          {/* Principal signature */}
          <div style={{ textAlign: "center", marginTop: "40pt" }}>
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
