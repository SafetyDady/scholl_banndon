import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  ImageRun,
  TabStopPosition,
  TabStopType,
  BorderStyle,
  convertMillimetersToTwip,
} from 'docx'
import fs from 'fs'
import path from 'path'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSession()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    const approvalId = parseInt(id)
    if (isNaN(approvalId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
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
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }

    // Format Thai date
    const d = new Date(approval.requestDate)
    const thaiDate = d.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    // Load garuda image
    let garudaImage: Buffer | null = null
    try {
      const garudaPath = path.join(process.cwd(), 'public', 'garuda.png')
      garudaImage = fs.readFileSync(garudaPath)
    } catch {
      // garuda not found, skip
    }

    // Build document sections
    const children: Paragraph[] = []

    // ตราครุฑ ชิดซ้าย
    if (garudaImage) {
      children.push(
        new Paragraph({
          alignment: AlignmentType.LEFT,
          spacing: { after: 0 },
          children: [
            new ImageRun({
              data: garudaImage,
              transformation: { width: 60, height: 69 },
              type: 'png',
            }),
          ],
        })
      )
    }

    // "บันทึกข้อความ" กลางหน้า
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: 'บันทึกข้อความ',
            bold: true,
            size: 36, // 18pt
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    // ส่วนราชการ
    children.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: 'ส่วนราชการ',
            bold: true,
            size: 28,
            font: 'TH Sarabun New',
          }),
          new TextRun({
            text: '  โรงเรียนวัดบ้านดอน สังกัดสำนักงานเขตพื้นที่การศึกษาประถมศึกษาระยองเขต 1',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    // ที่ + วันที่
    children.push(
      new Paragraph({
        spacing: { after: 40 },
        tabStops: [{ type: TabStopType.LEFT, position: TabStopPosition.MAX / 2 }],
        children: [
          new TextRun({
            text: 'ที่',
            bold: true,
            size: 28,
            font: 'TH Sarabun New',
          }),
          new TextRun({
            text: `  ${approval.memoNumber || '_______________'}`,
            size: 28,
            font: 'TH Sarabun New',
          }),
          new TextRun({
            text: '\t',
            size: 28,
          }),
          new TextRun({
            text: `วันที่ ${thaiDate}`,
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    // เรื่อง
    children.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: 'เรื่อง',
            bold: true,
            size: 28,
            font: 'TH Sarabun New',
          }),
          new TextRun({
            text: '    ขออนุมัติเบิกเงินอุดหนุน',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    // Horizontal line
    children.push(
      new Paragraph({
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 1, space: 1, color: '000000' },
        },
        spacing: { after: 80 },
        children: [],
      })
    )

    // เรียน
    children.push(
      new Paragraph({
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: 'เรียน',
            bold: true,
            size: 28,
            font: 'TH Sarabun New',
          }),
          new TextRun({
            text: '    ผู้อำนวยการโรงเรียนวัดบ้านดอน',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    // Body text
    children.push(
      new Paragraph({
        spacing: { after: 40 },
        indent: { firstLine: convertMillimetersToTwip(12.5) },
        children: [
          new TextRun({
            text: `ด้วยข้าพเจ้า ${approval.createdBy.fullName} ตำแหน่ง ${approval.createdBy.position}โรงเรียนวัดบ้านดอน ขอเบิกเงิน`,
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    children.push(
      new Paragraph({
        spacing: { after: 80 },
        children: [
          new TextRun({
            text: 'หมวดเงินอุดหนุน และหมวดเงินเทศบาล  ดังรายการต่อไปนี้',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    // Groups + Items
    for (const group of approval.disbursementGroups) {
      // Budget type header - bold, underline
      children.push(
        new Paragraph({
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({
              text: `รหัส `,
              bold: true,
              size: 28,
              font: 'TH Sarabun New',
            }),
            new TextRun({
              text: group.budgetType.name,
              bold: true,
              underline: {},
              size: 28,
              font: 'TH Sarabun New',
            }),
          ],
        })
      )

      // Items
      for (let i = 0; i < group.items.length; i++) {
        const item = group.items[i]
        children.push(
          new Paragraph({
            spacing: { after: 20 },
            tabStops: [
              { type: TabStopType.RIGHT, position: 8500 },
              { type: TabStopType.LEFT, position: 8600 },
            ],
            children: [
              new TextRun({
                text: `${i + 1}. ${item.description}`,
                size: 28,
                font: 'TH Sarabun New',
              }),
              new TextRun({ text: '\t', size: 28 }),
              new TextRun({
                text: `เป็นเงิน    ${formatCurrency(item.amount)}`,
                size: 28,
                font: 'TH Sarabun New',
              }),
              new TextRun({ text: '\t', size: 28 }),
              new TextRun({
                text: 'บาท',
                size: 28,
                font: 'TH Sarabun New',
              }),
            ],
          })
        )
      }

      // Subtotal (if more than 1 item)
      if (group.items.length > 1) {
        children.push(
          new Paragraph({
            spacing: { after: 40 },
            tabStops: [
              { type: TabStopType.RIGHT, position: 8500 },
              { type: TabStopType.LEFT, position: 8600 },
            ],
            children: [
              new TextRun({
                text: 'รวมเงิน',
                bold: true,
                size: 28,
                font: 'TH Sarabun New',
              }),
              new TextRun({ text: '\t', size: 28 }),
              new TextRun({
                text: `เป็นเงิน    ${formatCurrency(group.subtotal)}`,
                size: 28,
                font: 'TH Sarabun New',
              }),
              new TextRun({ text: '\t', size: 28 }),
              new TextRun({
                text: 'บาท',
                size: 28,
                font: 'TH Sarabun New',
              }),
            ],
          })
        )
      }
    }

    // Grand total
    children.push(
      new Paragraph({
        spacing: { before: 80, after: 80 },
        tabStops: [
          { type: TabStopType.RIGHT, position: 8500 },
          { type: TabStopType.LEFT, position: 8600 },
        ],
        children: [
          new TextRun({
            text: 'รวมจำนวนเงินที่ขอเบิกทั้งสิ้น',
            bold: true,
            size: 28,
            font: 'TH Sarabun New',
          }),
          new TextRun({ text: '\t', size: 28 }),
          new TextRun({
            text: `เป็นเงิน    ${formatCurrency(approval.totalAmount)}`,
            bold: true,
            size: 28,
            font: 'TH Sarabun New',
          }),
          new TextRun({ text: '\t', size: 28 }),
          new TextRun({
            text: 'บาท',
            bold: true,
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    // จึงเรียนมา
    children.push(
      new Paragraph({
        spacing: { after: 200 },
        indent: { firstLine: convertMillimetersToTwip(12.5) },
        children: [
          new TextRun({
            text: 'จึงเรียนมาเพื่อโปรดพิจารณาอนุมัติ',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    // Signature - Finance Officer (right aligned)
    children.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { after: 20 },
        children: [
          new TextRun({
            text: 'ลงชื่อ...............................................................',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    children.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { after: 20 },
        children: [
          new TextRun({
            text: `(${approval.createdBy.fullName})`,
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    children.push(
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        spacing: { after: 200 },
        children: [
          new TextRun({
            text: 'เจ้าหน้าที่การเงิน',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    // ความเห็นของผู้บริหาร
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { before: 100, after: 80 },
        children: [
          new TextRun({
            text: 'ความเห็นของผู้บริหารโรงเรียน',
            bold: true,
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    // Vice Principal checkbox + signature (centered)
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: '☐  ทราบ              ☐  อนุมัติ',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [
          new TextRun({
            text: 'ลงชื่อ...............................................................',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [
          new TextRun({
            text: '(นางภควรรณ  มีเจริญ)',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
        children: [
          new TextRun({
            text: 'รองผู้อำนวยการโรงเรียนวัดบ้านดอน',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    // Principal checkbox + signature (centered)
    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 40 },
        children: [
          new TextRun({
            text: '☐  ทราบ              ☐  อนุมัติ',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [
          new TextRun({
            text: 'ลงชื่อ...............................................................',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 20 },
        children: [
          new TextRun({
            text: '(นางสาววิภาพรรณ  อุบล)',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    children.push(
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: 'ผู้อำนวยการโรงเรียนวัดบ้านดอน',
            size: 28,
            font: 'TH Sarabun New',
          }),
        ],
      })
    )

    // Create document
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              size: {
                width: convertMillimetersToTwip(210), // A4
                height: convertMillimetersToTwip(297),
              },
              margin: {
                top: convertMillimetersToTwip(20),
                bottom: convertMillimetersToTwip(20),
                left: convertMillimetersToTwip(25),
                right: convertMillimetersToTwip(25),
              },
            },
          },
          children,
        },
      ],
    })

    // Generate buffer
    const buffer = await Packer.toBuffer(doc)
    const uint8 = new Uint8Array(buffer)

    // Return as downloadable file
    const filename = `บันทึกขออนุมัติ_${approval.memoNumber || approval.id}.docx`
    return new NextResponse(uint8, {
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'Content-Disposition': `attachment; filename*=UTF-8''${encodeURIComponent(filename)}`,
      },
    })
  } catch (error) {
    console.error('Print error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
