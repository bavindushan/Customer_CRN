package edu.icet.service;

import edu.icet.dto.Customer;

import java.util.List;

public interface CustomerServices {
    void addCustomer(Customer customer);

    List<Customer> getAll();

    void deleteCustomer(Integer id);

    void updateCustomer(Customer customer);

    Customer searchById(Integer id);

    List<Customer> findByName(String name);

    List<Customer> findByAddress(String address);
}
