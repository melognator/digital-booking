package com.equipo_7.ProyectoIntegrador.Controller;


import com.equipo_7.ProyectoIntegrador.Exception.BadRequestException;
import com.equipo_7.ProyectoIntegrador.Exception.HttpClientErrorException;
import com.equipo_7.ProyectoIntegrador.Exception.ResourceNotFoundException;
import com.equipo_7.ProyectoIntegrador.Dto.CategoryDTO;
import com.equipo_7.ProyectoIntegrador.Service.CategoryService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@CrossOrigin("*")
@RestController
@RequestMapping("/category")
@Api(tags = "category", description = "Acceso a las categorías")
public class CategoryController {
    private CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService){
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> listCategories(){
        return ResponseEntity.ok(categoryService.listAllCategories());
    }

    @PostMapping
    public ResponseEntity<CategoryDTO> saveCategory(@RequestBody CategoryDTO category) throws HttpClientErrorException {
        return ResponseEntity.ok(categoryService.saveCategory(category));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDTO> searchCategory(@PathVariable Long id) throws ResourceNotFoundException {
        Optional<CategoryDTO> categoryOptional = categoryService.searchCategoryById(id);
        if (categoryOptional.isPresent()){
            return ResponseEntity.ok(categoryOptional.get());
        }
        else{
            throw  new ResourceNotFoundException("Category with id " + id + " not found");
        }
    }

    @GetMapping("/title/{title}")
    public ResponseEntity<CategoryDTO> searchCategoryByTitle(@PathVariable String title) throws ResourceNotFoundException {
        Optional<CategoryDTO> categoryOptional = categoryService.searchCategoryByTitle(title);
        if (categoryOptional.isPresent()){
            return ResponseEntity.ok(categoryOptional.get());
        }
        else{
            throw  new ResourceNotFoundException("Category with title " + title + " not found");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) throws ResourceNotFoundException{
        Optional<CategoryDTO> categoryOptional = categoryService.searchCategoryById(id);
        if(categoryOptional.isPresent()){
            categoryService.deleteCategoryById(id);
            return ResponseEntity.ok("The category " + categoryOptional.get().getTitle() + " has been eliminated");
        }
        else {
            throw new ResourceNotFoundException("Category with id " + id + " not found");
        }
    }

    @DeleteMapping("/title/{title}")
    public ResponseEntity<String> deleteCategoryByTitle(@PathVariable String title) throws ResourceNotFoundException{
        Optional<CategoryDTO> categoryOptional = categoryService.searchCategoryByTitle(title);
        if(categoryOptional.isPresent()){
            categoryService.deleteCategoryByTitle(title);
            return ResponseEntity.ok("The category " + categoryOptional.get().getTitle() + " has been eliminated");
        }
        else {
            throw new ResourceNotFoundException("Category with title " + title + " not found");
        }
    }

    @PutMapping
    public ResponseEntity<String> updateCategory(@RequestBody CategoryDTO category) throws BadRequestException {
        Optional<CategoryDTO> categoryOptional = categoryService.searchCategoryById(category.getId());
        if(categoryOptional.isPresent()){
            categoryService.updateCategory(category);
            return ResponseEntity.ok("Category " + category.getTitle() + " has been updated");
        }
        else{
            throw new BadRequestException("Category " + category.getTitle() + " not found");
        }
    }
}