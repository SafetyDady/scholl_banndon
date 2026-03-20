'use client'

import { cn } from '@/lib/utils'
import { WORKFLOW_STEPS } from '@/lib/constants'
import { Check, Slash } from 'lucide-react'
import type { WorkflowActionInfo } from '@/types'

interface WorkflowTrackerProps {
  currentStep: number
  status: string
  workflowActions?: WorkflowActionInfo[]
}

export function WorkflowTracker({ currentStep, status, workflowActions = [] }: WorkflowTrackerProps) {
  const isRejected = status === 'REJECTED'

  // Build set of skipped step numbers
  const skippedSteps = new Set<number>()
  for (const wa of workflowActions) {
    if (wa.action === 'SKIP') {
      skippedSteps.add(wa.stepNumber)
    }
  }

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-[640px] items-start justify-between px-2 py-4">
        {WORKFLOW_STEPS.map((step, index) => {
          const isSkipped = skippedSteps.has(step.number)
          const isAllDone = status === 'COMPLETED'
          const isCompleted = (step.number < currentStep || (step.number === currentStep && isAllDone)) && !isSkipped
          const isCurrent = step.number === currentStep && !isAllDone
          const isFuture = step.number > currentStep
          const showRejected = step.number === currentStep && isRejected

          return (
            <div key={step.number} className="flex flex-1 items-start">
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={cn(
                    'relative flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all',
                    isSkipped && 'bg-gray-200 text-gray-400',
                    isCompleted && 'bg-[#16a34a] text-white',
                    isCurrent && !isRejected && 'bg-[#1e3a5f] text-white',
                    showRejected && 'bg-red-500 text-white',
                    isFuture && 'bg-gray-200 text-gray-400'
                  )}
                >
                  {isSkipped && <Slash size={14} />}
                  {isCompleted && <Check size={16} />}
                  {showRejected && (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  )}
                  {isCurrent && !isRejected && (
                    <>
                      <span className="absolute inset-0 animate-ping rounded-full bg-[#1e3a5f] opacity-20" />
                      <span className="relative z-10 text-xs">{step.number}</span>
                    </>
                  )}
                  {isFuture && <span className="text-xs">{step.number}</span>}
                </div>

                {/* Step name */}
                <span
                  className={cn(
                    'mt-2 max-w-[80px] text-center text-xs leading-tight',
                    isSkipped && 'text-gray-400 line-through',
                    isCompleted && 'font-medium text-[#16a34a]',
                    isCurrent && !isRejected && 'font-medium text-[#1e3a5f]',
                    showRejected && 'font-medium text-red-600',
                    isFuture && 'text-gray-400'
                  )}
                >
                  {step.name}
                </span>
              </div>

              {/* Connector line */}
              {index < WORKFLOW_STEPS.length - 1 && (
                <div className="mt-4 flex flex-1 items-center px-1">
                  <div
                    className={cn(
                      'h-0.5 w-full',
                      (isCompleted || isSkipped) ? 'bg-[#16a34a]' : 'bg-gray-200'
                    )}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
