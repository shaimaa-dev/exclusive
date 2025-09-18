import React from 'react'

const HeaderSections = ({name}) => {
  return (
    <div className='flex items-center gap-3'>
        <div className="w-4 h-8 rounded-md bg-buttoncolor"></div>
        <h2 className='text-buttoncolor text-lg '>{name}</h2>
    </div>
  )
}

export default HeaderSections
