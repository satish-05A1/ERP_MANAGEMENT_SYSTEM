package com.example.erp_management.controller;

import com.example.erp_management.entity.User;
import com.example.erp_management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;
    // Create User
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
    @PostMapping("/login")
public ResponseEntity<?> login(
        @RequestBody User user){
    if(user.getEmail() == null || user.getEmail().isEmpty() || 
       user.getPassword() == null || user.getPassword().isEmpty()){
        return ResponseEntity.badRequest().body("Email and password are required");
    }
    User dbUser = userService.login(user.getEmail().trim().toLowerCase());
    if(dbUser != null &&
       dbUser.getPassword().equals(user.getPassword())){
        return ResponseEntity.ok(dbUser);
    }
    return ResponseEntity
            .badRequest()
            .body("Invalid Credentials");
}
    // Get All Users
    @GetMapping
    public List<User> getUsers() {
        return userService.getAllUsers();
    }
    // Update User
@PutMapping("/{id}")
public User updateUser(@PathVariable Long id, @RequestBody User user) {
    user.setUserId(id);
    return userService.saveUser(user);
}
@GetMapping("/count")
public long getUserCount() {
    return userService.getUserCount();
}
// Delete User
@DeleteMapping("/{id}")
public String deleteUser(@PathVariable Long id) {
    userService.deleteUser(id);
    return "Deleted successfully";
}
}
