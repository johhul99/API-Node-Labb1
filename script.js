async function fetchOrders() {
    try {
        const response = await fetch(`http://localhost:3000/api/orders`);
        if (!response.ok) throw new Error("Nätverksfel, kunde ej hämta data");
        const data = await response.json();
        
        const list = document.getElementById("order-list");
        list.innerHTML = data.map(order => `
            <tr>
                <td>${order.clientFirstName} ${order.clientLastName}</td>
                <td>${order.clientPhoneNumber}</td>
                <td>${order.clientEmail}</td>
                <td>
                    <ul>
                        ${order.hitList.map(hit => `
                            <li>
                                <b>Target:</b> ${hit.orderTarget.firstName} ${hit.orderTarget.lastName}, 
                                ${hit.orderTarget.adress}, ${hit.orderTarget.zipCode} ${hit.orderTarget.city} 
                                <br>
                                <b>Hitmen:</b><ul>${hit.orderHitmen.split(', ').map(hitman => `<li>${hitman}</li>`).join("")}</ul>
                            </li>
                            <br>
                        `).join("")}
                    </ul>
                </td>
                <td>
                    <button class="btn btn-primary fw-bold" onclick="deleteOrder('${order._id}')">
                       <i class="bi bi-archive"></i> Archive
                    </button>
                </td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Kunde inte hämta produkter:", error);
    }
}

async function deleteOrder(id) {
    if (!confirm("Är du säker på att du vill arkivera denna order?")) return;

    try {
        const response = await fetch(`http://localhost:3000/api/order/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) throw new Error("Kunde inte arkivera ordern");

        alert("Order arkiverad!");
        fetchOrders();
    } catch (error) {
        console.error("Fel vid arkivering av order:", error);
    }
}

fetchOrders();