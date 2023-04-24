package com.equipo_7.ProyectoIntegrador.Service;


import com.equipo_7.ProyectoIntegrador.Dto.CategoryDTO;
import com.equipo_7.ProyectoIntegrador.Exception.HttpClientErrorException;
import com.equipo_7.ProyectoIntegrador.Model.Category;
import com.equipo_7.ProyectoIntegrador.Model.Product;
import com.equipo_7.ProyectoIntegrador.Repository.CategoryRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    private CategoryRepository categoryRepository;
    private static final Logger LOGGER = Logger.getLogger(CategoryService.class);

    @Autowired
    public CategoryService(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
    }

    public List<CategoryDTO> listAllCategories(){
        LOGGER.info("Returning all categories");
        List<Category> categoryList = categoryRepository.findAll();
        List<CategoryDTO> categoryDTOList = new ArrayList<>();
        for (Category category : categoryList) {
            categoryDTOList.add(toCategoryDTO(category));
        }
        return categoryDTOList;
    }

    public void deleteCategoryById(Long id){
        LOGGER.info("Deleting category with id: " + id);
        categoryRepository.deleteById(id);
    }

    @Transactional
    public void deleteCategoryByTitle(String title){
        LOGGER.info("Deleting category with title: " + title);
        categoryRepository.deleteCategory(title);
    }

    public CategoryDTO saveCategory(CategoryDTO category) throws HttpClientErrorException {
        Optional<Category> categoryOptional = categoryRepository.searchCategory(category.getTitle());
        if (categoryOptional.isPresent()){
            throw new HttpClientErrorException("Category already exists");
        }
        LOGGER.info("Adding new category to database");
        return toCategoryDTO(categoryRepository.save(toCategory(category)));
    }

    public Optional<CategoryDTO> searchCategoryById(Long id){
        LOGGER.info("Returning category with id: " + id);
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            return Optional.of(toCategoryDTO(category.get()));
        } else {
            return Optional.empty();
        }
    }

    public Optional<CategoryDTO> searchCategoryByTitle(String title){
        LOGGER.info("Returning category with title: " + title);
        Optional<Category> category = categoryRepository.searchCategory(title);
        if (category.isPresent()) {
            return Optional.of(toCategoryDTO(category.get()));
        } else {
            return Optional.empty();
        }
    }

    public void updateCategory(CategoryDTO category){
        LOGGER.info("Updating category with title: " + category.getTitle());
        categoryRepository.save(toCategory(category));
    }

    private CategoryDTO toCategoryDTO(Category category) {
        CategoryDTO categoryDTO = new CategoryDTO(
                category.getId(),
                category.getTitle(),
                category.getDescription(),
                categoryRepository.countProductsByCategory(category),
                category.getImg());
        return categoryDTO;
    }

    private Category toCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setId(categoryDTO.getId());
        category.setImg(categoryDTO.getImg());
        category.setTitle(categoryDTO.getTitle());
        category.setDescription(categoryDTO.getDescription());
        return category;
    }
}