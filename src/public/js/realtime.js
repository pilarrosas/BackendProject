const socketClient = io()
socketClient.on("productos", (products) => {
    updateProd(products)
})

function updateProd(product) {
    let div = document.getElementById("prod-list")
    let productos = ""
    product.forEach(product => {
        productos += `
<div class="wrapper">
        <div class="user-card">
            <div class="user-card-img">
              <img src="${product.thumbnail}" alt="">
            </div>
            <div class="user-card-info">
              <h2> ${product.title} </h2>
              <p><span> ${product.description} </span></p>
              <p><span> ${product.category} </span> </p>
              <p><span> ${product.code} </span> </p>
              <p><span>Price: uSd ${product.price} </span></p>
              <button class="batc">Add to Cart</button>
            </div>
        </div>
    </div>
      
        `
    });
    div.innerHTML = productos
}

let form = document.getElementById("form")
form.addEventListener("submit", (env) => {
    env.preventDefault()

    let title = form.elements.title.value
    let description = form.elements.description.value
    let stock = form.elements.stock.value
    let thumbnail = form.elements.thumbnail.value
    let category = form.elements.category.value
    let price = form.elements.price.value
    let code = form.elements.code.value

    socketClient.emit("addProduct", {
        title,
        description,
        stock,
        thumbnail,
        category,
        price,
        code
    })
    form.reset()

})

document.getElementById("delete-btn").addEventListener("click", function () {
    const deleteIdIn = document.getElementById("id-product");
    const delID = parseInt(deleteIdIn.value);
    socketClient.emit("deleteProduct", delID);
    deleteIdIn.value = "";
  });
socketClient.on("productUpdated", (obj) => {
  updateProductList(obj);
});