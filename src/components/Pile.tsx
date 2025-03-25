'use client'

import React, { useEffect, useRef, useState } from 'react'
import PileContext from '@/contexts/PileContext'

export const PileGroup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-between w-full space-x-2">
      {children}
    </div>
  )
}

export const Pile = ({
  pile,
  children,
}: {
  pile: any
  children: React.ReactNode
}) => {
  const parentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    if (parentRef.current) {
      setHeight(parentRef.current.offsetHeight)
      setWidth(parentRef.current.offsetWidth)
    }
  }, [])

  return (
    <PileContext.Provider value={{ ...pile, width, height }}>
      <div ref={parentRef} className="relative w-full h-full">
        {children}
      </div>
    </PileContext.Provider>
  )
}
