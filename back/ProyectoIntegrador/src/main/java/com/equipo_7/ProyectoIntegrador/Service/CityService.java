package com.equipo_7.ProyectoIntegrador.Service;

import com.equipo_7.ProyectoIntegrador.Exception.HttpClientErrorException;
import com.equipo_7.ProyectoIntegrador.Model.City;
import com.equipo_7.ProyectoIntegrador.Repository.CityRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;
import java.util.Optional;

@Service
public class CityService {
    private CityRepository cityRepository;
    private static final Logger LOGGER = Logger.getLogger(CityService.class);

    @Autowired
    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<City> listAllCities(){
        LOGGER.info("Returning all cities");
        return cityRepository.findAll();

    }

    public void deleteCityById(Long id){
        LOGGER.info("Deleting city with id: " + id);
        cityRepository.deleteById(id);
    }


    public City saveCity(City city) throws HttpClientErrorException {
        Optional<City> cityOptional = cityRepository.searchCity(city.getCityName());
        if (cityOptional.isPresent()){
            throw new HttpClientErrorException("City already exists");
        }
        LOGGER.info("Adding new city to database");
        return cityRepository.save(city);
    }

    public Optional<City> searchCityById(Long id){
        LOGGER.info("Returning city with id: " + id);
        return cityRepository.findById(id);
    }

    public void updateCity(City city){
        LOGGER.info("Updating city with title: " + city.getCityName());
        cityRepository.save(city);
    }
}
