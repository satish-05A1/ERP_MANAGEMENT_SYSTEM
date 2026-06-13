const INVENTORY_API =
    "http://localhost:8080/api/inventory";
let editInventoryId = null;
const loggedInUser =
JSON.parse(localStorage.getItem("loggedInUser"));
function saveInventory() {
    const inventory = {
        productId:
            document.getElementById(
                "productId"
            ).value,
        quantity:
            document.getElementById(
                "quantity"
            ).value
    };
    let method = "POST";
    let url = INVENTORY_API;
    if(editInventoryId !== null){
        method = "PUT";
        url =
        `${INVENTORY_API}/${editInventoryId}`;
    }
    fetch(url,{
        method:method,
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(inventory)
    })
    .then(()=>{
        loadInventory();
        clearInventoryForm();
        editInventoryId = null;
        document.getElementById(
            "inventoryBtn"
        ).innerText =
        "Save Inventory";
    });
}
function loadInventory(){
    fetch(INVENTORY_API)
    .then(res => res.json())
    .then(data => {
        let table =
        document.getElementById(
            "inventoryTable"
        );
        table.innerHTML = "";
        data.forEach(inventory => {
            table.innerHTML += `
            <tr>
                <td>
                    ${inventory.inventoryId}
                </td>
                <td>
                    ${inventory.productId}
                </td>
                <td>
                    ${inventory.quantity}
                </td>
                <td>
                    ${inventory.lastUpdated}
                </td>
                <td>
                    ${
loggedInUser &&
loggedInUser.role.toUpperCase() === "ADMIN"
?
`
<button onclick="editInventory(${inventory.inventoryId})">
Edit
</button>
<button onclick="deleteInventory(${inventory.inventoryId})">
Delete
</button>`:`<span>View Only</span>`
}
                </td>
            </tr>
            `;
        });
    });
}
if(
loggedInUser &&
loggedInUser.role.toUpperCase() !== "ADMIN"
){
document.getElementById(
"inventoryForm"
).style.display="none";
}
function editInventory(id){
    fetch(INVENTORY_API)
    .then(res => res.json())
    .then(data => {
        const inventory =
            data.find(
                i => i.inventoryId === id
            );
        document.getElementById(
            "productId"
        ).value =
        inventory.productId;
        document.getElementById(
            "quantity"
        ).value =
        inventory.quantity;
        editInventoryId = id;
        document.getElementById(
            "inventoryBtn"
        ).innerText =
        "Update Inventory";
    });
}
function deleteInventory(id){
    if(confirm(
        "Delete Inventory Record?"
    )){
        fetch(
        `${INVENTORY_API}/${id}`,
        {
            method:"DELETE"
        })
        .then(() => {
            loadInventory();
        });
    }
}
function clearInventoryForm(){
    document.getElementById(
        "productId"
    ).value = "";
    document.getElementById(
        "quantity"
    ).value = "";
}
loadInventory();
