package com.example.erp_management.controller;

import com.example.erp_management.entity.Inventory;
import com.example.erp_management.service.InventoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/inventory")
@CrossOrigin("*")
public class InventoryController {
    @Autowired
    private InventoryService service;
    @PostMapping
    public Inventory createInventory(
            @RequestBody Inventory inventory){
        return service.saveInventory(inventory);
    }
    @GetMapping
    public List<Inventory> getInventory(){
        return service.getAllInventory();
    }
    @GetMapping("/count")
public long getInventoryCount() {
    return service.getInventoryCount();
}
    @PutMapping("/{id}")
    public Inventory updateInventory(
            @PathVariable Long id,
            @RequestBody Inventory inventory){
        inventory.setInventoryId(id);
        return service.saveInventory(inventory);
    }
    @DeleteMapping("/{id}")
    public String deleteInventory(@PathVariable Long id){
        service.deleteInventory(id);
        return "Inventory Deleted";
    }
}

