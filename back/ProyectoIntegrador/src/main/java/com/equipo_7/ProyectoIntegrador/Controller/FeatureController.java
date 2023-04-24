package com.equipo_7.ProyectoIntegrador.Controller;

import com.equipo_7.ProyectoIntegrador.Exception.BadRequestException;
import com.equipo_7.ProyectoIntegrador.Exception.HttpClientErrorException;
import com.equipo_7.ProyectoIntegrador.Exception.ResourceNotFoundException;
import com.equipo_7.ProyectoIntegrador.Model.Feature;
import com.equipo_7.ProyectoIntegrador.Service.FeatureService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@RestController
@RequestMapping("/feature")
@Api(tags = "feature", description = "Acceso a las características de los productos")
public class FeatureController {
    private FeatureService featureService;
    @Autowired
    public FeatureController(FeatureService featureService) {
        this.featureService = featureService;
    }

    @GetMapping
    public ResponseEntity<List<Feature>> listFeatures(){
        return ResponseEntity.ok(featureService.listAllFeatures());
    }

    @PostMapping
    public ResponseEntity<Feature> saveFeature(@RequestBody Feature feature) throws HttpClientErrorException {
        return ResponseEntity.ok(featureService.saveFeature(feature));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Feature> searchFeature(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<Feature> featureOptional = featureService.searchFeatureById(id);
        if (featureOptional.isPresent()){
            return ResponseEntity.ok(featureOptional.get());
        }
        else{
            throw  new ResourceNotFoundException("Feature with id " + id + " not found");
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFeature(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<Feature> featureOptional = featureService.searchFeatureById(id);
        if(featureOptional.isPresent()){
            featureService.deleteFeatureById(id);
            return ResponseEntity.ok("Feature " + featureOptional.get().getTitle() + " has been eliminated");
        }
        else {
            throw new ResourceNotFoundException("Feature with id " + id + " not found");
        }
    }

    @PutMapping
    public ResponseEntity<String> updateFeature(@RequestBody Feature feature) throws BadRequestException {
        Optional<Feature> featureOptional = featureService.searchFeatureById(feature.getId());
        if(featureOptional.isPresent()){
            featureService.updateFeature(feature);
            return ResponseEntity.ok("Feature " + feature.getTitle() + " has been updated");
        }
        else{
            throw new BadRequestException("Feature " + feature.getTitle() + " not found");
        }
    }
}
