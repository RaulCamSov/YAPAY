package com.upc.tp_yapay.Repository;

import com.upc.tp_yapay.Entities.DetailsOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DetailOrderRepository extends JpaRepository<DetailsOrder,Long> {
    List<DetailsOrder> findAllByOrderId(Long orderId);
}
