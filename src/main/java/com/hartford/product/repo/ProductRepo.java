package com.hartford.product.repo;

import com.hartford.product.model.ProductModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepo extends JpaRepository<ProductModel, Integer> {
}
