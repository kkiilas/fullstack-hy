import React from 'react'
import Country from './Country'
import CountrySummary from './CountrySummary'

const Countries = ({
  countries,
  filter,
  showCountries,
  nonsingularCapital,
  handleShowClick,
  handleNonsingularCapitalClick,
  weather
}) => {
  const filteredCountries = showCountries
    ? countries.filter(({ name }) =>
        name.common.toLowerCase().includes(filter.toLowerCase())
      )
    : countries.filter(({ name }) => name.common === filter)

  const countriesToShow =
    filter === '' || filteredCountries.length === 0 ? (
      ''
    ) : filteredCountries.length > 10 ? (
      'Too many matches, specify another filter'
    ) : filteredCountries.length > 1 ? (
      filteredCountries
        .sort((country1, country2) =>
          country1.name.common.localeCompare(country2.name.common)
        )
        .map((country, i) => (
          <Country
            key={i}
            name={country.name.common}
            handleShowClick={handleShowClick}
          />
        ))
    ) : (
      <CountrySummary
        country={filteredCountries[0]}
        nonsingularCapital={nonsingularCapital}
        handleNonsingularCapitalClick={handleNonsingularCapitalClick}
        weather={weather}
      />
    )

  return <div>{countriesToShow}</div>
}

export default Countries
