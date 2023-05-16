import React, { useEffect, useRef, useState } from 'react'
import LeftSide from './LeftSide'
import RightSide from './RightSide'
import useCurrentWidth from '../hooks/useCurrentWidth'
import { sizes } from '../utils/config'
import { PlatesList } from './Plates'

const Main = () => {
  let { width: windowWidth, height: windowHeight } = useCurrentWidth()

  const mainContent = useRef()

  const [isRendered, setIsRendered] = useState(false)

  const containerWidth = windowWidth - sizes.sidesWidth
  const containerHeight = windowHeight - sizes.headerFooterHeight

  const container = {
    width:
      containerWidth < sizes.minContainerWidth
        ? sizes.minContainerWidth
        : containerWidth,
    height:
      containerHeight < sizes.minContainerHeight
        ? sizes.minContainerHeight
        : containerHeight,
  }

  useEffect(() => {
    setIsRendered(true)
  }, [])

  return (
    <main className='main'>
      <div className='main__item'>
        <LeftSide />
      </div>
      <div className='main__item main-content' ref={mainContent}>
        {isRendered && <PlatesList container={container} />}
      </div>
      <div className='main__item'>
        <RightSide />
      </div>
    </main>
  )
}

export default Main
