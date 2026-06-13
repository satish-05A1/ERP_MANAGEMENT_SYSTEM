package com.example.erp_management.repository;

import com.example.erp_management.entity.Inventory;
import org.springframework.data.jpa.repository.JpaRepository;
public interface InventoryRepository
        extends JpaRepository<Inventory, Long> {
}

