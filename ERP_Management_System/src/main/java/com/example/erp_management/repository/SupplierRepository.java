package  com.example.erp_management.repository;

import com.example.erp_management.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
public interface SupplierRepository
        extends JpaRepository<Supplier, Long> {
}
