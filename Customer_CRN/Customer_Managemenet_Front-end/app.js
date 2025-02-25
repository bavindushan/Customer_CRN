loadCustomer();

function loadCustomer() {
    fetch("http://localhost:8080/customer/get-all")
        .then(res => res.json())
        .then(data => {
            console.log(data)

            let tableRow = `
            <caption>2025 Customers</caption>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Salary</th>
            </tr>
        `;
            let customerTable = document.getElementById("tblCustomers");

            data.forEach(customer => {
                tableRow += `
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.address}</td>
                    <td>${customer.salary}</td>
                </tr>
            `;
            });
            customerTable.innerHTML = tableRow;
        });
}

function addCustomer() {
    let name = document.getElementById("txtName").value;
    let address = document.getElementById("txtAddress").value;
    let salary = document.getElementById("txtSalary").value;

    if (!name || !address || !salary) {
        Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please fill in all fields before submitting!",
        });
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": name,
        "address": address,
        "salary": salary
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/add", requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to add customer.");
            }
            return response.text();
        })
        .then((result) => {
            Swal.fire({
                icon: "success",
                title: "Customer Added",
                text: "Customer has been successfully added!",
            });
            loadCustomer();
            console.log(result);
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to add customer. Please try again.",
            });
            console.error(error);
        });
}

function searchCustomerById() {
    let idField = document.getElementById("txtId");
    let id = idField.value;

    if (!id) {
        Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please enter a Customer ID!",
        });
        return;
    }

    const requestOptions = {
        method: "GET",
        redirect: "follow"
    };

    fetch(`http://localhost:8080/customer/search-by-id/${id}`, requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Customer not found!");
            }
            return response.json();
        })
        .then((customer) => {
            Swal.fire({
                icon: "success",
                title: "Customer Found!",
                html: `
                    <strong>ID:</strong> ${customer.id} <br>
                    <strong>Name:</strong> ${customer.name} <br>
                    <strong>Address:</strong> ${customer.address} <br>
                    <strong>Salary:</strong> ${customer.salary}
                `,
            });

            console.log(customer);
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Customer not found or an error occurred!",
            });
            console.error(error);
        })
        .finally(() => {
            idField.value = "";
        });
}

function updateCustomer() {
    let idField = document.getElementById("txtId");
    let nameField = document.getElementById("txtName");
    let addressField = document.getElementById("txtAddress");
    let salaryField = document.getElementById("txtSalary");

    let id = idField.value;
    let name = nameField.value;
    let address = addressField.value;
    let salary = salaryField.value;

    if (!id || !name || !address || !salary) {
        Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please fill in all fields before submitting!",
        });
        return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id": id,
        "name": name,
        "address": address,
        "salary": salary
    });

    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/customer/update", requestOptions)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to update customer.");
            }
            return response.text();
        })
        .then((result) => {
            Swal.fire({
                icon: "success",
                title: "Customer Updated",
                text: "Customer has been successfully updated!",
            });

            idField.value = "";
            nameField.value = "";
            addressField.value = "";
            salaryField.value = "";

            loadCustomer();

            console.log(result);
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update customer. Please try again.",
            });
            console.error(error);
        });
}

function deleteCustomerById() {
    let idField = document.getElementById("txtId");
    let id = idField.value.trim();

    if (!id) {
        Swal.fire({
            icon: "warning",
            title: "Missing Fields",
            text: "Please enter a Customer ID!",
        });
        return;
    }

    Swal.fire({
        title: "Are you sure?",
        text: "This action will permanently delete the customer!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it"

    }).then((result) => {
        if (result.isConfirmed) {
            
            const requestOptions = {
                method: "DELETE",
                redirect: "follow"
            };

            fetch(`http://localhost:8080/customer/delete/${id}`, requestOptions)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to delete customer.");
                    }
                    return response.text();
                })
                .then((result) => {
                    console.log("Customer Deleted:", result);
                    Swal.fire({
                        icon: "success",
                        title: "Deleted!",
                        text: "Customer has been successfully deleted.",
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to delete the customer. Please try again.",
                    });
                });
        }
    });
}











