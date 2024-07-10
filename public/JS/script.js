// Fetch and display products
function getProducts() {
    return fetch('http://localhost:3000/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(products => {
            let productsList = document.getElementById('products');
            productsList.innerHTML = '';
            products.forEach(product => {
                let productItem = document.createElement('li');
                productItem.className = 'list-group-item';
                productItem.innerHTML = `
                    <div class="row">
                        <div class="col-md-5">
                            <img src="${product.thumbnail}" alt="${product.title}" class="img-thumbnail">
                        </div>
                        <div class="col-md-8">
                            <h5>${product.title}</h5>
                            <p>${product.description}</p>
                            <p>Price: $${product.price}</p>
                            <p>Rating: ${product.rating}</p>
                        </div>
                        <div class="col">
                            <button class="btn btn-primary" onclick="addsaveforlater(${product.id})">Add to Save for Later</button>
                        </div>
                    </div>
                `;
                productsList.appendChild(productItem);
            });
            return products;
        })
        .catch(error => console.error('Error fetching products:', error));
}

// Fetch and display save for later items
function getsaveforlater() {
    return fetch('http://localhost:3000/saveforlater')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(saveforlater => {
            let saveforlaterList = document.getElementById('saveforlaterList');
            saveforlaterList.innerHTML = '';
            saveforlater.forEach(item => {
                let itemElement = document.createElement('li');
                itemElement.className = 'list-group-item';
                itemElement.innerHTML = `
                    <div class="row">
                         <div class="col-md-5">
                            <img src="${item.thumbnail}" alt="${item.title}" class="img-thumbnail">
                        </div>
                        <div class="col-md-8">
                            <h5>${item.title}</h5>
                            <p>${item.description}</p>
                            <p>Price: $${item.price}</p>
                            <p>Rating: ${item.rating}</p>
                        </div>
                        <div class="col">
                            <button class="btn btn-danger" onclick="Deletesaveforlater(${item.id}) ">Remove</button>
                        </div>
                    </div>
                `;
                saveforlaterList.appendChild(itemElement);
            });
            return saveforlater;
        })
        .catch(error => console.error('Error fetching save for later items:', error));
}

// Add item to save for later
function addsaveforlater(id) {
    fetch(`http://localhost:3000/products/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(product => {
            return fetch('http://localhost:3000/saveforlater', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(product)
            });
        })
        .then(() => getsaveforlater())
        .catch(error => console.error('Error adding item to save for later:', error));
}

// Delete item from save for later
function Deletesaveforlater(id) {
    fetch(`http://localhost:3000/saveforlater/${id}`, {
        method: 'DELETE'
    })
        .then(() => getsaveforlater())
        .catch(error => console.error('Error deleting item from save for later:', error));
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    getProducts();
    getsaveforlater();
});
