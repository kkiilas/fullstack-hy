import React from 'react'
import Capitals from './Capitals'
import Languages from './Languages'
import Weather from './Weather'

const CountrySummary = ({
  country,
  nonsingularCapital,
  handleNonsingularCapitalClick,
  weather
}) => {
  const weatherLocation =
    country.capital === undefined
      ? country.name.common
      : country.capital.length === 1 || nonsingularCapital === -1
      ? country.capital[0]
      : country.capital[nonsingularCapital]

  return (
    <div>
      <h2>{country.name.common}</h2>
      <Capitals
        capitals={country.capital}
        handleNonsingularCapitalClick={handleNonsingularCapitalClick}
      />
      <div>population {country.population}</div>
      <h3>Languages</h3>
      <Languages languages={Object.values(country.languages)} />
      <img src={country.flags.png} alt="flag" height="85px" width="130" />
      <h3>Weather in {weatherLocation}</h3>
      <Weather
        temperature={weather.temperature}
        weather_icon={weather.weather_icon}
        wind_speed={weather.wind_speed}
        wind_dir={weather.wind_dir}
      />
    </div>
  )
}

export default CountrySummary
