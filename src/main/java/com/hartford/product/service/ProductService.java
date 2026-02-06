package com.hartford.product.service;

import com.hartford.product.model.ProductModel;
import com.hartford.product.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    @Autowired
    private ProductRepo productRepo;
    public ProductModel saveProduct(ProductModel product){
        return productRepo.save(product);
    }

    public List<ProductModel>getallProducts(){
        return productRepo.findAll();
    }

    public ProductModel getProductById(int id) {
        return productRepo.findById(id).orElse(null);
    }
    public ProductModel updateProduct(int id, ProductModel productDetails) {
        ProductModel product = productRepo.findById(id).orElse(null);
        product.setName(productDetails.getName());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setQuantity(productDetails.getQuantity());
        return productRepo.save(product);
    }
}





