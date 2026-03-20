'use client'

import { Printer } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function PrintButton() {
  return (
    <div className="no-print fixed top-4 right-4 z-50 print:hidden">
      <Button
        onClick={() => window.print()}
        className="bg-[#1e3a5f] hover:bg-[#163050] text-white gap-2 shadow-md"
      >
        <Printer size={16} />
        พิมพ์
      </Button>
    </div>
  )
}
