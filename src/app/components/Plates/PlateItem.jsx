import React, { useEffect, useRef } from 'react'

const PlateItem = ({ data, config }) => {
  const { width, height } = config

  const titleRef = useRef()

  useEffect(() => {
    const $title = titleRef.current
    const $text = $title.querySelector('p')

    if ($title.clientHeight < $text.clientHeight) {
      let splittedInnerText = $text.innerText.split(' ')

      while ($title.clientHeight < $text.clientHeight) {
        splittedInnerText = splittedInnerText.slice(0, -1)
        $text.innerText = splittedInnerText.join(' ')
      }

      splittedInnerText = splittedInnerText.slice(0, -1)
      $text.innerText = splittedInnerText.join(' ') + ' ...'

      $text.setAttribute('title', data.title)
    }
  }, [])

  return (
    <div
      className='plate'
      style={{ width: width + 'px', height: height + 'px' }}
    >
      <h2 className='plate__title' ref={titleRef}>
        <p>{data.title}</p>
      </h2>
    </div>
  )
}

export default PlateItem
