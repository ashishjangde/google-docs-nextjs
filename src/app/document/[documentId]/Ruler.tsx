import React from 'react'
import { FaCaretDown } from 'react-icons/fa';
const markers = Array.from({length: 83}, (_, index) => index);

export default function Ruler({ paddingLeft, paddingRight }: { paddingLeft: number, paddingRight: number }) {
  return (
    <div className='h-6 border-b border-gray-300 flex items-end relative select-none print:hidden'>
      <div 
        id='ruler-container' 
        className='max-w-[816px] w-full mx-auto'
      >
        <Marker
          position={paddingLeft}
          isLeft={true}
          onMouseDown={() => {}}
          onDoubleClick={() => {}}
         />
        <Marker
          position={paddingRight}
          isLeft={false}
          onMouseDown={() => {}}
          onDoubleClick={() => {}}
         />
        <div className='relative h-full'>
          <div className='w-full'>
            {markers.map((marker) => {
              const position = (marker * (816 - paddingLeft - paddingRight)) / 82 + paddingLeft;
              return (
                <div
                  key={marker}
                  className='absolute bottom-0'
                  style={{left: `${position}px`}}
                >
                  {marker % 10 === 0 && (
                    <>
                    <div className='absolute bottom-0 w-[1px] h-2 bg-neutral-500'/>
                    <span className='absolute bottom-2 text-[10px] text-neutral-500 transform -translate-x-1/2'>
                      {marker / 10 + 1}
                    </span>
                    </>
                  )}
                  { marker % 5 === 0 && marker % 10 !== 0 && (
                    <div className='absolute bottom-0 w-[1px] h-1.5 bg-neutral-500' />
                  )}
                  {marker % 5 !== 0 && (
                    <div className='absolute bottom-0 w-[1px] h-1 bg-neutral-500' />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

interface MarkerProps {
  position: number;
  isLeft?: boolean;
  onMouseDown: () => void;
  onDoubleClick: () => void;
}

function Marker({
  position,
  isLeft,
  onDoubleClick,
  onMouseDown,
}: MarkerProps) {
  return (
    <div
    className='absolute top-0 h-full w-4 cursor-ew-resize z-[5] group'
    style={{[isLeft ? 'left' : 'right']: `${position}px`}}
    onMouseDown={onMouseDown}
    onDoubleClick={onDoubleClick}
    >
      <FaCaretDown className='absolute left-1/2 top-0 h-full fill-blue-600 transform -translate-x-1/2'/>
    </div>
  )
}
