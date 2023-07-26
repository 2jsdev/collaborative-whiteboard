import React from 'react'
import { useSelector } from 'react-redux'
import { selectCursors } from '../slices/cursorSlice'
import cursorIcon from '../../../assets/selection.svg'

 const CursorOverlay: React.FC = () => {
  const cursors = useSelector(selectCursors)

  return (
    <>
      {cursors.map((cursor) => (
        <img
          key={cursor.userId}
          src={cursorIcon}
          className='cursor'
          style={{
            position: 'absolute',
            left: cursor.x,
            top: cursor.y,
            width: '30px',
            height: '30px',
          }}
        />
      ))}
    </>
  )
}

export default CursorOverlay