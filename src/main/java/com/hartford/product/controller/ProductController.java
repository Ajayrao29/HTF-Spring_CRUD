package com.hartford.product.controller;

import com.hartford.product.model.ProductModel;
import com.hartford.product.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/pro")
public class ProductController {
    @Autowired
    private ProductService ProductService;

    @PostMapping
    public ProductModel addProduct(@RequestBody ProductModel product) {
        return ProductService.saveProduct(product);
    }

    //Add Bulk Products at a time
    @PostMapping("/bulk")
    public List<ProductModel> addBulkProducts(@RequestBody List<ProductModel> products) {
        return ProductService.saveProducts(products);
    }

    @GetMapping
    public List<ProductModel> getallProducts() {
        return ProductService.getallProducts();

    }

    @GetMapping("/{id}")
    public ProductModel getProductById(@PathVariable int id) {
        return ProductService.getProductById(id);
    }

    @PutMapping("/{id}")
    public ProductModel updateProduct(Integer id, @RequestBody ProductModel product) {
        return ProductService.updateProduct(id, product);
    }
    @PatchMapping("/{id}")
    public ProductModel updateProductQuantityById(@PathVariable Integer id, @RequestBody int quantity){
        return ProductService.updateProductQuantityById(id,quantity);
    }

    @DeleteMapping("/{id}")
    public String deleteProduct(@PathVariable int id) {
        ProductService.getProductById(id);
        return "Product" + " " +  id + " " + "removed!";
    }


}