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

    @GetMapping
    public List<ProductModel> getallProducts() {
        return ProductService.getallProducts();

    }

    @GetMapping("/{id}")
    public ProductModel getProductById(@PathVariable int id) {
        return ProductService.getProductById(id);
    }
    @PutMapping
    public ProductModel updateProduct(@RequestBody ProductModel product) {
        return ProductService.createProduct(product);
    }
}