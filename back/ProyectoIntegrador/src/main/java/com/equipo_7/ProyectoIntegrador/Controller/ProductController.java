package com.equipo_7.ProyectoIntegrador.Controller;

import com.equipo_7.ProyectoIntegrador.Dto.ProductDTO;
import com.equipo_7.ProyectoIntegrador.Exception.BadRequestException;
import com.equipo_7.ProyectoIntegrador.Exception.ResourceNotFoundException;
import com.equipo_7.ProyectoIntegrador.Model.*;
import com.equipo_7.ProyectoIntegrador.Repository.ProductRepository;
import com.equipo_7.ProyectoIntegrador.Service.ProductService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@CrossOrigin("*")
@RestController
@RequestMapping("/product")
@Api(tags = "product", description = "Acceso a los productos")
public class ProductController {
    private ProductService productService;


    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> listProducts(){
        return ResponseEntity.ok(productService.listAllProducts());
    }

    @PostMapping
    public ResponseEntity<ProductDTO> saveProduct(@RequestBody ProductDTO productDTO){
        return ResponseEntity.ok(productService.saveProduct(productDTO));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> searchProduct(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<ProductDTO> productDTOOptional = productService.searchProductById(id);
        if (productDTOOptional.isPresent()){
            return ResponseEntity.ok(productDTOOptional.get());
        }
        else{
            throw  new ResourceNotFoundException("Product with id " + id + " not found");
        }
    }

    @GetMapping("/ids")
    public ResponseEntity<List<ProductDTO>> searchProduct(@RequestParam(name = "ids") List<Long> id){
        List<ProductDTO> productDTOList = productService.searchProductsByIds(id);
        return ResponseEntity.ok(productDTOList);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<ProductDTO> productDTOOptional = productService.searchProductById(id);
        if(productDTOOptional.isPresent()){
            productService.deleteProductById(id);
            return ResponseEntity.ok("Product " + productDTOOptional.get().getTitle() + " has been eliminated");
        }
        else {
            throw new ResourceNotFoundException("Product with id " + id + " not found");
        }
    }

    @PutMapping
    public ResponseEntity<String> updateProduct(@RequestBody ProductDTO productDTO) throws BadRequestException {
        Optional<ProductDTO> productDTOOptional = productService.searchProductById(productDTO.getId());
        if(productDTOOptional.isPresent()){
            productService.updateProduct(productDTO);
            return ResponseEntity.ok("Product " + productDTO.getTitle() + " has been updated");
        }
        else{
            throw new BadRequestException("Product " + productDTO.getTitle() + " not found");
        }
    }

    @GetMapping("/random")
    public ResponseEntity<List<ProductDTO>> list8Random(){
        return ResponseEntity.ok(productService.list8Random());
    }


    @GetMapping("/filter")
    public ResponseEntity<Set<ProductDTO>> filterProduct(@RequestParam(name = "city", required = false) String city, @RequestParam(name = "category", required = false) String category, @RequestParam(required = false) List<Long> featureIds, @RequestParam(required = false, name = "startDate") String startDate, @RequestParam(required = false, name = "finishDate") String finishDate){
        Product product = new Product();
        if (category != null) {
            Category category1 = new Category();
            category1.setTitle(category);
            product.setCategory(category1);
        }
        if (city != null) {
            City city1 = new City();
            city1.setCityName(city);
            product.setCity(city1);
        }
        if (featureIds != null && !featureIds.isEmpty()) {
            List<Feature> features = new ArrayList<>();
            for (Long featureId : featureIds) {
                Feature feature = new Feature();
                feature.setId(featureId);
                features.add(feature);
            }
            product.setFeatures(features);
        }
        if(finishDate != null && startDate != null) {
            LocalDate startReservationDate = LocalDate.parse(startDate);
            LocalDate endReservationDate = LocalDate.parse(finishDate);
            return ResponseEntity.ok(productService.filter(product, startReservationDate, endReservationDate));
        }else {
            return ResponseEntity.ok(productService.filter(product));
        }
    }

}
