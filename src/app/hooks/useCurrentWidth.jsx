import { useState, useEffect } from 'react'

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth

const getHeight = () =>
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight

const useCurrentWidth = () => {
  let [width, setWidth] = useState(getWidth())
  let [height, setHeight] = useState(getHeight())

  useEffect(() => {
    let timeoutId = null
    const resizeListener = () => {
      clearTimeout(timeoutId)

      timeoutId = setTimeout(() => {
        setWidth(getWidth())
        setHeight(getHeight())
      }, 100)
    }
    window.addEventListener('resize', resizeListener)

    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return { width, height }
}

export default useCurrentWidth
