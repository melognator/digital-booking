package com.equipo_7.ProyectoIntegrador.Service;

import com.equipo_7.ProyectoIntegrador.Exception.HttpClientErrorException;
import com.equipo_7.ProyectoIntegrador.Model.Feature;
import com.equipo_7.ProyectoIntegrador.Repository.FeatureRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeatureService {
    private FeatureRepository featureRepository;
    private static final Logger LOGGER = Logger.getLogger(FeatureService.class);

    @Autowired
    public FeatureService(FeatureRepository featureRepository) {
        this.featureRepository = featureRepository;
    }

    public List<Feature> listAllFeatures(){
        LOGGER.info("Returning all feature");
        return featureRepository.findAll();

    }

    public void deleteFeatureById(Long id){
        LOGGER.info("Deleting feature with id: " + id);
        featureRepository.deleteById(id);
    }

    public Feature saveFeature(Feature feature) throws HttpClientErrorException {
        Optional<Feature> featureOptional = featureRepository.searchFeature(feature.getTitle());
        if (featureOptional.isPresent()){
            throw new HttpClientErrorException("Feature already exists");
        }
        LOGGER.info("Adding new feature to database");
        return featureRepository.save(feature);
    }

    public Optional<Feature> searchFeatureById(Long id){
        LOGGER.info("Returning feature with id: " + id);
        return featureRepository.findById(id);
    }


    public void updateFeature(Feature feature){
        LOGGER.info("Updating feature with name: " + feature.getTitle());
        featureRepository.save(feature);
    }
}
