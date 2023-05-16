import React, { useEffect, useState } from 'react'
import { sizeConfig } from '../../utils/config'
import { PlateItem } from '../Plates'

const URL = 'https://jsonplaceholder.typicode.com/posts'
const MAX_ITEMS_COUNT = 100

const PlatesList = ({ container }) => {
  const [items, setItems] = useState([])

  const [itemsCount, setItemsCount] = useState(0)

  const [platesStyles, setPlatesStyles] = useState({})

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const { cols, rows } = calcPlatesGrid(container)

    const styles = {
      gridTemplateColumns: `repeat(${cols}, ${sizeConfig.plateWidth}px)`,
      gridTemplateRows: `repeat(${rows}, ${sizeConfig.plateHeight}px)`,
      padding: `${sizeConfig.plateMargin}px`,
      gap: `${sizeConfig.plateMargin}px`,
    }

    setPlatesStyles(styles)

    setItemsCount(() => {
      if (cols * rows > MAX_ITEMS_COUNT) {
        return MAX_ITEMS_COUNT
      }

      return cols * rows
    })
  }, [container])

  useEffect(() => {
    if (!isLoading) {
      if (itemsCount <= items?.length) {
        return
      } else {
        getItems(items.length, itemsCount)
      }

      if (itemsCount === 0) {
        getItems(0, itemsCount)
      }
    }
  }, [itemsCount, isLoading])

  const calcPlatesGrid = ({ height, width }) => {
    const { plateWidth, plateHeight, plateMargin } = sizeConfig

    const widthWithMargin = width - plateMargin
    const heightWithMargin = height - plateMargin

    const plateWidthWithMargin = plateWidth + plateMargin
    const plateHeightWithMargin = plateHeight + plateMargin

    const cols = parseInt(widthWithMargin / plateWidthWithMargin)
    const rows = parseInt(heightWithMargin / plateHeightWithMargin)

    return { cols, rows }
  }

  const getItems = async (start, end) => {
    setIsLoading(true)
    try {
      const response = await fetch(URL + `?_start=${start}&_end=${end}`)
      const data = await response.json()

      if (start !== 0) {
        setItems((prevState) => [...prevState, ...data])
      } else {
        setItems(data)
      }
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const slicedItems = items.slice(0, itemsCount)

  return (
    <ul className='plates-list' style={{ ...platesStyles }}>
      {slicedItems.map((item) => (
        <li key={item.id} className='plates-list__item'>
          <PlateItem data={item} config={sizeConfig} />
        </li>
      ))}
    </ul>
  )
}

export default PlatesList
