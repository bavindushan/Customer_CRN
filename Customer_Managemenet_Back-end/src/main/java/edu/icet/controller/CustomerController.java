package edu.icet.controller;

import edu.icet.dto.Customer;
import edu.icet.service.CustomerServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/customer")
@RequiredArgsConstructor
@CrossOrigin
public class CustomerController {

    final CustomerServices service;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public void addCustomer(@RequestBody Customer customer){
        service.addCustomer(customer);
    }

    @GetMapping("/get-all")
    public List<Customer> getAll(){
        return service.getAll();
    }

    @DeleteMapping("/delete/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void deleteCustomer(@PathVariable Integer id){
        service.deleteCustomer(id);
    }

    @PutMapping("/update")
    public void updateCustomer(@RequestBody Customer customer){
        service.updateCustomer(customer);
    }

    @GetMapping("/search-by-id/{id}")
    public Customer searchByIdearchById(@PathVariable Integer id){
        return service.searchById(id);
    }

    @GetMapping("/search-by-name/{name}")
    public List<Customer> searchByName(@PathVariable String name){
        return service.findByName(name);
    }

    @GetMapping("/search-by-address/{address}")
    public List<Customer> searchByAddress(@PathVariable String address){
        return service.findByAddress(address);
    }
}
