package com.eproducts.demo.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name="products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long barCode;
    private String name;
    private String description;
    @Column(precision = 10, scale = 2)
    private BigDecimal priceSale;
    @Column(precision = 10, scale = 2)
    private BigDecimal purchasePrice;
    private String imageUrl;
    private Integer stock;
    private String category;
    private LocalDate createdAt;
    private BigDecimal profitPercentage;
    private LocalDate updatedAt;
    private Boolean isActive;

    public Product() {
    }

    public Product(Long id, Long barCode, String name, String description, BigDecimal priceSale, BigDecimal purchasePrice, String imageUrl, Integer stock, String category, LocalDate createdAt, BigDecimal profitPercentage, LocalDate updatedAt, Boolean isActive) {
        this.id = id;
        this.barCode = barCode;
        this.name = name;
        this.description = description;
        this.priceSale = priceSale;
        this.purchasePrice = purchasePrice;
        this.imageUrl = imageUrl;
        this.stock = stock;
        this.category = category;
        this.createdAt = createdAt;
        this.profitPercentage = profitPercentage;
        this.updatedAt = updatedAt;
        this.isActive = isActive;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBarCode() {
        return barCode;
    }

    public void setBarCode(Long barCode) {
        this.barCode = barCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getPriceSale() {
        return priceSale;
    }

    public void setPriceSale(BigDecimal priceSale) {
        this.priceSale = priceSale;
    }

    public BigDecimal getPurchasePrice() {
        return purchasePrice;
    }

    public void setPurchasePrice(BigDecimal purchasePrice) {
        this.purchasePrice = purchasePrice;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public BigDecimal getProfitPercentage() {
        return profitPercentage;
    }

    public void setProfitPercentage(BigDecimal profitPercentage) {
        this.profitPercentage = profitPercentage;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
