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
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
}