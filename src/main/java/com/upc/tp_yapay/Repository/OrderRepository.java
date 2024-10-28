package com.upc.tp_yapay.Repository;

import com.upc.tp_yapay.Entities.MyOrders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<MyOrders, Long> {

}
