package com.upc.tp_yapay.Services;

import com.upc.tp_yapay.DTO.OrderProductDTO;
import com.upc.tp_yapay.DTO.OrderRequestDTO;
import com.upc.tp_yapay.DTO.OrderResponseDTO;
import com.upc.tp_yapay.Entities.*;
import com.upc.tp_yapay.Repository.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private DetailOrderRepository detailsOrderRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private PaymentTypeRepository paymentTypeRepository;
    @Autowired
    private ProductRepository productRepository;

    private ModelMapper modelMapper = new ModelMapper();

    public Long createOrder(OrderRequestDTO orderRequestDTO) {
        Customer customer = customerRepository.findById(orderRequestDTO.getCustomerId())
                .orElseThrow(() -> new IllegalArgumentException("Cliente no encontrado con ID: " + orderRequestDTO.getCustomerId()));

        PaymentType paymentType = paymentTypeRepository.findById(orderRequestDTO.getPaymentTypeId())
                .orElseThrow(() -> new IllegalArgumentException("Tipo de pago no encontrado con ID: " + orderRequestDTO.getPaymentTypeId()));

        MyOrders order = new MyOrders();
        order.setCustomer(customer);
        order.setPaymentType(paymentType);
        order.setOrderDate(new Date());
        order.setDetailsOrders(new ArrayList<>()); // Initialize the detailsOrders list

        order = orderRepository.save(order);

        return order.getId();
    }

    public OrderResponseDTO addProductToOrder(Long orderId, OrderProductDTO orderProductDTO) {
        MyOrders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Orden no encontrada con ID: " + orderId));

        Products product = productRepository.findById(orderProductDTO.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado con ID: " + orderProductDTO.getProductId()));

        int quantity = orderProductDTO.getQuantity();
        int subtotal = product.getPrice_product() * quantity;

        DetailsOrder detailsOrder = new DetailsOrder();
        detailsOrder.setOrder(order);
        detailsOrder.setProducts(product);
        detailsOrder.setAmount(quantity);
        detailsOrder.setSubtotal(subtotal);

        int totalAmount = order.getDetailsOrders().stream()
                .mapToInt(DetailsOrder::getSubtotal)
                .sum();

        // Añadir el detalle de la orden a la lista
        order.getDetailsOrders().add(detailsOrder);

        // Actualizar la cantidad disponible del producto
        product.setQuantity_product(product.getQuantity_product() - quantity);
        productRepository.save(product);

        // Guardar la orden actualizada en el repositorio
        orderRepository.save(order);

        // Preparar la respuesta de la orden
        OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
        orderResponseDTO.setOrderId(order.getId());
        orderResponseDTO.setTotalAmount(order.getDetailsOrders().stream().mapToInt(DetailsOrder::getSubtotal).sum());
        orderResponseDTO.setDetailsOrders(order.getDetailsOrders().stream()
                .map(details -> new OrderProductDTO(details.getProducts().getId_product(), details.getProducts().getName(), details.getAmount(), details.getSubtotal()))
                .collect(Collectors.toList()));

        return orderResponseDTO;

    }

    public OrderResponseDTO finalizeOrder(Long orderId) {
        MyOrders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Orden no encontrada con ID: " + orderId));

        int totalAmount = order.getDetailsOrders().stream()
                .mapToInt(DetailsOrder::getSubtotal)
                .sum();

        OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
        orderResponseDTO.setOrderId(orderId);
        orderResponseDTO.setTotalAmount(totalAmount);
        orderResponseDTO.setDetailsOrders(order.getDetailsOrders().stream()
                .map(details -> modelMapper.map(details, OrderProductDTO.class))
                .collect(Collectors.toList()));
        orderRepository.save(order);

        return orderResponseDTO;
    }



    public OrderResponseDTO getOrderById(Long orderId) {
        MyOrders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Orden no encontrada con ID: " + orderId));

        OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
        orderResponseDTO.setOrderId(order.getId());
        orderResponseDTO.setTotalAmount(order.getDetailsOrders().stream().mapToInt(DetailsOrder::getSubtotal).sum());

        // Convertir los detalles del pedido a OrderProductDTO y agregar a la respuesta
        List<OrderProductDTO> productDetails = order.getDetailsOrders().stream()
                .map(detailsOrder -> new OrderProductDTO(
                        detailsOrder.getProducts().getId_product(),
                        detailsOrder.getProducts().getName(),
                        detailsOrder.getAmount(),
                        detailsOrder.getSubtotal()
                ))
                .collect(Collectors.toList());

        orderResponseDTO.setDetailsOrders(productDetails);

        return orderResponseDTO;
    }
}
