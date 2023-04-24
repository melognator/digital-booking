package com.equipo_7.ProyectoIntegrador;

import com.equipo_7.ProyectoIntegrador.Dto.CategoryDTO;
import com.equipo_7.ProyectoIntegrador.Exception.HttpClientErrorException;
import com.equipo_7.ProyectoIntegrador.Service.CategoryService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Optional;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest
public class CategoryServiceTest {
    @Autowired
    private CategoryService categoryService;

    @Test
    @Order(1)
    public void saveCategory() throws HttpClientErrorException {
        CategoryDTO categoryToSave = new CategoryDTO(null,"titulo","descripcion",null, null);

        CategoryDTO categorySaved = categoryService.saveCategory(categoryToSave);
        Assertions.assertEquals(1L, categorySaved.getId());
    }

    @Test
    @Order(2)
    public void searchCategory(){
        List<CategoryDTO> categories = categoryService.listAllCategories();

        Assertions.assertEquals(1, categories.size());
    }

    @Test
    @Order(3)
    public void searchById(){
        Optional<CategoryDTO> categoryOptional = categoryService.searchCategoryById(1L);

        Assertions.assertNotNull(categoryOptional);
    }

    @Test
    @Order(4)
    public void updateCategory(){
        Optional<CategoryDTO> categoryToUpdate = categoryService.searchCategoryById(1L);
        categoryToUpdate.get().setTitle("Otra cosa");
        categoryService.updateCategory(categoryToUpdate.get());
        Optional<CategoryDTO> categoryUpdated = categoryService.searchCategoryById(1L);
        Assertions.assertEquals("Otra cosa",categoryUpdated.get().getTitle());
    }

    @Test
    @Order(5)
    public void deleteCategory(){
        categoryService.deleteCategoryById(1L);
        Optional<CategoryDTO> category = categoryService.searchCategoryById(1L);

        Assertions.assertFalse(category.isPresent());
    }

}
