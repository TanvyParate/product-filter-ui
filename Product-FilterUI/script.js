// product data
const productsData = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 89,
    rating: 4.3,
    image: "./images/img1.jpg"
  },
  {
    id: 2,
    name: "Casual T-Shirt",
    category: "Fashion",
    price: 25,
    rating: 4.0,
    image: "./images/img2.jpg"
  },
  {
    id: 3,
    name: "Modern Book Shelf",
    category: "Furniture",
    price: 120,
    rating: 4.5,
    image: "./images/img3.jpg"
  },
  {
    id: 4,
    name: "JavaScript Guide",
    category: "Books",
    price: 35,
    rating: 4.8,
    image: "./images/img4.jpg"
  },
  {
    id: 5,
    name: "Smartphone",
    category: "Electronics",
    price: 399,
    rating: 4.6,
    image: "./images/img5.jpg"
  },
  {
    id: 6,
    name: "Running Shoes",
    category: "Fashion",
    price: 75,
    rating: 4.2,
    image: "./images/img6.jpg"
  },
  {
    id: 7,
    name: "Office Chair",
    category: "Furniture",
    price: 210,
    rating: 4.4,
    image: "./images/img7.jpg"
  },
  {
    id: 8,
    name: "Men's Jeans",
    category: "Fashion",
    price: 50,
    rating: 4.1,
    image: "./images/img8.jpg"
  },
  {
    id: 9,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 45,
    rating: 4.0,
    image: "./images/img9.jpg"
  },
  {
    id: 10,
    name: "Self-Help Book",
    category: "Books",
    price: 20,
    rating: 4.3,
    image: "./images/img10.jpg"
  },
  {
    id: 11,
    name: "Wooden Coffee Table",
    category: "Furniture",
    price: 180,
    rating: 4.6,
    image: "./images/img11.jpg"
  },
  {
    id: 12,
    name: "Noise Cancelling Earbuds",
    category: "Electronics",
    price: 129,
    rating: 4.4,
    image: "./images/img12.jpg"
  },
  {
    id: 13,
    name: "Leather Handbag",
    category: "Fashion",
    price: 95,
    rating: 4.5,
    image: "./images/img13.jpg"
  },
  {
    id: 14,
    name: "Novel",
    category: "Books",
    price: 15,
    rating: 4.7,
    image: "./images/img14.jpg"
  },
  {
    id: 15,
    name: "Standing Desk",
    category: "Furniture",
    price: 250,
    rating: 4.8,
    image: "./images/img15.jpg"
  },
  {
    id: 16,
    name: "Fitness Tracker",
    category: "Electronics",
    price: 69,
    rating: 4.2,
    image: "./images/img16.jpg"
  },
  {
    id: 17,
    name: "Formal Blazer",
    category: "Fashion",
    price: 110,
    rating: 4.3,
    image: "./images/img17.jpg"
  },
  {
    id: 18,
    name: "Cookbook Collection",
    category: "Books",
    price: 42,
    rating: 4.6,
    image: "./images/img18.jpg"
  }
];

const productsContainer = document.getElementById("products");
const searchInput = document.getElementById("search");
const categoryInputs = document.querySelectorAll(".category");
const priceInputs = document.querySelectorAll(".price");
const sortSelect = document.getElementById("sort");
const resetBtn = document.getElementById("reset");
const noResultsText = document.getElementById("no-results");

let filteredProducts = [...productsData];

// Render products to the DOM
function renderProducts(products) {
  productsContainer.innerHTML = "";
  if (products.length === 0) {
    noResultsText.classList.remove("hidden");
    return;
  }
  noResultsText.classList.add("hidden");

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h4>${product.name}</h4>
        <p class="price">$${product.price}</p>
        <p class="rating">⭐ ${product.rating}</p>
      </div>
    `;
    productsContainer.appendChild(card);
  });
}

// Filter functions
function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const selectedCategories = Array.from(categoryInputs)
    .filter(input => input.checked)
    .map(input => input.value);

  const selectedPriceRange = Array.from(priceInputs).find(input => input.checked)?.value;

  filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchValue);
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    
    let matchesPrice = true;
    if (selectedPriceRange && selectedPriceRange !== "all") {
      const [min, max] = selectedPriceRange.split("-").map(Number);
      matchesPrice = product.price >= min && product.price <= max;
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  applySort();
}

// Sorting
function applySort() {
  const sortValue = sortSelect.value;
  let sorted = [...filteredProducts];

  if (sortValue === "price-asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sortValue === "price-desc") {
    sorted.sort((a, b) => b.price - a.price);
  } else if (sortValue === "rating-desc") {
    sorted.sort((a, b) => b.rating - a.rating);
  }

  renderProducts(sorted);
}

// Event listeners
searchInput.addEventListener("input", applyFilters);
categoryInputs.forEach(input => input.addEventListener("change", applyFilters));
priceInputs.forEach(input => input.addEventListener("change", applyFilters));
sortSelect.addEventListener("change", applySort);

resetBtn.addEventListener("click", () => {
  searchInput.value = "";
  categoryInputs.forEach(input => input.checked = false);
  priceInputs.forEach(input => {
    input.checked = input.value === "all";
  });
  sortSelect.value = "default";
  filteredProducts = [...productsData];
  renderProducts(filteredProducts);
});

// Initial render
renderProducts(productsData);
