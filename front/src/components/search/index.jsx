import React, { useState } from 'react';
import { InputSearchContainer, SearchButton, SearchContainer, SearchHeading} from './SearchStyles';
import SelectDays from './SelectDays';
import SelectCity from './SelectCity';
import { useNavigate } from 'react-router-dom';

const Search = () => {

    const navigate = useNavigate()

    const [selectedRange, setSelectedRange] = useState([]);

    const handleSelectedRange = (day) => {
        if (selectedRange.length === 0) {
            setSelectedRange([day]);
        } else if (selectedRange.length === 1) {
            const [start] = selectedRange;
            const end = day;
            setSelectedRange([start, end].sort((a,b)=> a.getTime() - b.getTime()));
        } else {
            setSelectedRange([day]);
        }
    };

    const [selectedLocation, setSelectedLocation] = useState({
        cityName: '',
        countryName: '',
    })

    const handleSelectedCity = (cityName, countryName) => {
        setSelectedLocation(() => ({ cityName, countryName }));
    }

    function handleSearch() {
        const cityParams = selectedLocation.cityName ? `city=${selectedLocation.cityName}` : ""
        const startDateParam = selectedRange[0] ? `startDate=${selectedRange[0].toLocaleDateString('fr-CA')}` : ""
        const finishDateParams = selectedRange[1] ? `finishDate=${selectedRange[1].toLocaleDateString('fr-CA')}` : ""
        const params = []
        cityParams != "" && params.push(cityParams)
        startDateParam != "" && params.push(startDateParam)
        finishDateParams != "" && params.push(finishDateParams)

        const endpoint = `/product/filter?${params.join("&")}`
        
        if (params.length > 0) {
            navigate(endpoint)
        }
    }

  return (
    <SearchContainer>
      <SearchHeading color='white' >¡Ofertas en alquiler de vehículos!</SearchHeading>
      <InputSearchContainer>
        <SelectCity selectedLocation={selectedLocation} handleSelected={handleSelectedCity}/>
        <SelectDays selectedRange={selectedRange} handleSelected={handleSelectedRange} />
        <SearchButton onClick={() => handleSearch()}>Buscar</SearchButton>
      </InputSearchContainer >
    </SearchContainer>

  )
}

export default Search