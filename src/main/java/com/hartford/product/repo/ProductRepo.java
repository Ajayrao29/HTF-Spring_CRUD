package com.hartford.product.repo;

import com.hartford.product.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepo extends JpaRepository<ProductModel, Integer> {
    List<ProductModel> findAllByOrderByPriceAsc();
    List<ProductModel> findAllByOrderByPriceDesc();
}
