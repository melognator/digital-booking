package com.equipo_7.ProyectoIntegrador.Controller;

import com.equipo_7.ProyectoIntegrador.Exception.BadRequestException;
import com.equipo_7.ProyectoIntegrador.Exception.HttpClientErrorException;
import com.equipo_7.ProyectoIntegrador.Exception.ResourceNotFoundException;
import com.equipo_7.ProyectoIntegrador.Model.City;
import com.equipo_7.ProyectoIntegrador.Service.CityService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/city")
@Api(tags = "city", description = "Acceso a las ciudades")
public class CityController {
    private CityService cityService;

    @Autowired
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public ResponseEntity<List<City>> listCities(){
        return ResponseEntity.ok(cityService.listAllCities());
    }

    @PostMapping
    public ResponseEntity<City> saveCharacteristic(@RequestBody City city) throws HttpClientErrorException {
        return ResponseEntity.ok(cityService.saveCity(city));
    }

    @GetMapping("/{id}")
    public ResponseEntity<City> searchCity(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<City> cityOptional = cityService.searchCityById(id);
        if (cityOptional.isPresent()){
            return ResponseEntity.ok(cityOptional.get());
        }
        else{
            throw  new ResourceNotFoundException("City with id " + id + " not found");
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCity(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<City> cityOptional = cityService.searchCityById(id);
        if(cityOptional.isPresent()){
            cityService.deleteCityById(id);
            return ResponseEntity.ok("City " + cityOptional.get().getCityName() + " has been eliminated");
        }
        else {
            throw new ResourceNotFoundException("City with id " + id + " not found");
        }
    }

    @PutMapping
    public ResponseEntity<String> updateCity(@RequestBody City city) throws BadRequestException {
        Optional<City> cityOptional = cityService.searchCityById(city.getId());
        if(cityOptional.isPresent()){
            cityService.updateCity(city);
            return ResponseEntity.ok("City " + city.getCityName() + " has been updated");
        }
        else{
            throw new BadRequestException("City " + city.getCityName() + " not found");
        }
    }
}
