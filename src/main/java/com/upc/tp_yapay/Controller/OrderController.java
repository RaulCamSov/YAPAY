package com.upc.tp_yapay.Controller;

import com.upc.tp_yapay.DTO.DTOProducts;
import com.upc.tp_yapay.DTO.OrderProductDTO;
import com.upc.tp_yapay.DTO.OrderRequestDTO;
import com.upc.tp_yapay.DTO.OrderResponseDTO;
import com.upc.tp_yapay.Services.OrderService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @PostMapping("/orders/create")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<OrderResponseDTO> createOrder(@RequestBody OrderRequestDTO orderRequestDTO) {
        try {
            Long orderId = orderService.createOrder(orderRequestDTO);
            OrderResponseDTO orderResponseDTO = orderService.finalizeOrder(orderId);
            return new ResponseEntity<>(orderResponseDTO, HttpStatus.CREATED);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(new OrderResponseDTO(), HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/orders/{orderId}/addProduct")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<OrderResponseDTO> addProductToOrder(@PathVariable Long orderId, @RequestBody OrderProductDTO orderProductDTO) {
        try {
            OrderResponseDTO orderResponseDTO = orderService.addProductToOrder(orderId, orderProductDTO);
            return new ResponseEntity<>(orderResponseDTO, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/orders/{orderId}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<OrderResponseDTO> getOrderDetails(@PathVariable Long orderId) {
        try {
            OrderResponseDTO orderResponseDTO = orderService.finalizeOrder(orderId);
            return new ResponseEntity<>(orderResponseDTO, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/orders/get/{orderId}")
    @PreAuthorize("hasAuthority('CUSTOMER')")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long orderId) {
        try {
            OrderResponseDTO orderResponseDTO = orderService.getOrderById(orderId);
            return new ResponseEntity<>(orderResponseDTO, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}