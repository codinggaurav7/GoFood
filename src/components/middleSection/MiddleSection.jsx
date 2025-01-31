import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Card from '../card/Card'
import Loading from '../utils/Loading'
import ErrorComponent from '../utils/Error'
const fetchMeals = async ({ queryKey }) => {
  const category = queryKey[1]
  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

function MiddleSection() {
  const [activeButton, setActiveButton] = useState('Breakfast')

  const { data: fetchedContent, error, isLoading } = useQuery({
    queryKey: ['meals', activeButton],
    queryFn: fetchMeals,
    keepPreviousData: true,
  })

  const buttonClasses = (category) =>
    `rounded-full px-4 py-2 font-medium ${
      activeButton === category
        ? 'bg-green-900 text-white'
        : 'bg-gray-200 text-gray-700'
    }`

  return (
    <div className="flex flex-col text-center gap-4 py-8 px-2">
      <h2 className="font-sans text-green-700 font-bold">Shop by category</h2>
      <h1 className="font-lg font-sans text-green-900 font-bold">
        Top Category Of Organic Food
      </h1>
      <div className="buttons flex flex-row flex-wrap justify-center gap-4">
        <button
          onClick={() => setActiveButton('Breakfast')}
          className={buttonClasses('Breakfast')}
        >
          FRUITS AND VEGETABLES
        </button>
        <button
          onClick={() => setActiveButton('Dessert')}
          className={buttonClasses('Dessert')}
        >
          BAKERY
        </button>
        <button
          onClick={() => setActiveButton('Chicken')}
          className={buttonClasses('Chicken')}
        >
          MEAT AND SEAFOOD
        </button>
        <button
          onClick={() => setActiveButton('Vegetarian')}
          className={buttonClasses('Vegetarian')}
        >
         BEVERAGE
        </button>
        <button
          onClick={() => setActiveButton('Miscellaneous')}
          className={buttonClasses('Miscellaneous')}
        >
          BISCUITS AND SNACKS
        </button>
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <ErrorComponent message={error.message} />
      ) : (
        <div className="card-container grid grid-cols-1 lg:grid-cols-2">
          {fetchedContent &&
            fetchedContent.meals &&
            fetchedContent.meals.map((item) => (
              <Card
                key={item.idMeal}
                heading={item.strMeal}
                img={item.strMealThumb}
              />
            ))}
        </div>
      )}
    </div>
  )
}

export default MiddleSection

