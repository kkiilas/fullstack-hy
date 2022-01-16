import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [showCountries, setShowCountries] = useState(true)
  const [nonsingularCapital, setNonsingularCapital] = useState(-1)
  const [weather, setWeather] = useState({
    temperature: 0,
    weather_icon: '',
    wind_speed: 0,
    wind_dir: ''
  })

  const api_key = process.env.REACT_APP_API_KEY

  const getWeather = (weatherLocation) => {
    const params = {
      access_key: api_key,
      query: weatherLocation,
      units: 'm'
    }
    axios
      .get('http://api.weatherstack.com/current', { params })
      .then(response => {
        const apiResponse = response.data.current
        const newWeather = {
          temperature: apiResponse.temperature,
          weather_icon: apiResponse.weather_icons[0],
          wind_speed: apiResponse.wind_speed,
          wind_dir: apiResponse.wind_dir
        }
        setWeather(newWeather)
      })
  }

  const getWeatherLocation = (country) => country.capital === undefined
    ? `${country.latlng[0]},${country.latlng[1]}`
    : country.capital.length === 1 || nonsingularCapital < 0
      ? country.capital[0]
      : country.capital[nonsingularCapital]

  const handleFilterChange = (event) => {
    setShowCountries(true)
    setFilter(event.target.value)
    const filteredCountries = countries
      .filter(({ name }) =>
        name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      const weatherLocation = getWeatherLocation(country)
      getWeather(weatherLocation)
    }
  }

  const handleShowClick = (event) => {
    setShowCountries(false)
    setFilter(event.target.value)
    const country = countries.find(({ name }) => name.common === event.target.value)
    const location = getWeatherLocation(country)
    getWeather(location)
  }

  const handleNonsingularCapitalClick = (event) => {
    const i = event.target.value
    const country = countries
      .find(country => country.capital !== undefined && country.capital.length > 1
        && country.name.common.toLowerCase().includes(filter.toLowerCase()))
    getWeather(country.capital[i])
    setNonsingularCapital(i)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <Countries
        countries={countries}
        filter={filter}
        showCountries={showCountries}
        nonsingularCapital={nonsingularCapital}
        handleShowClick={handleShowClick}
        handleNonsingularCapitalClick={handleNonsingularCapitalClick}
        weather={weather}
      />
    </div>
  )
}

export default App