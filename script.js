// ====================================
// SIDDHUMART - E-COMMERCE WEBSITE
// ====================================

const products = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 1499,
    oldPrice: 2499,
    rating: 4.5,
    reviews: 128,
    badge: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Smart Watch with Fitness Tracker",
    category: "Electronics",
    price: 1999,
    oldPrice: 2999,
    rating: 4.3,
    reviews: 96,
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Premium Running Shoes",
    category: "Fashion",
    price: 1799,
    oldPrice: 2799,
    rating: 4.4,
    reviews: 85,
    badge: "SALE",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Classic Casual Backpack",
    category: "Accessories",
    price: 899,
    oldPrice: 1299,
    rating: 4.2,
    reviews: 67,
    badge: "DEAL",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "Modern Wireless Earbuds",
    category: "Electronics",
    price: 1299,
    oldPrice: 1999,
    rating: 4.4,
    reviews: 142,
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Stylish Sunglasses",
    category: "Accessories",
    price: 599,
    oldPrice: 999,
    rating: 4.1,
    reviews: 54,
    badge: "SALE",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    name: "Comfortable Casual T-Shirt",
    category: "Fashion",
    price: 499,
    oldPrice: 799,
    rating: 4.2,
    reviews: 73,
    badge: "VALUE BUY",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    name: "Minimalist Table Lamp",
    category: "Home",
    price: 799,
    oldPrice: 1199,
    rating: 4.3,
    reviews: 48,
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 9,
    name: "Professional Laptop",
    category: "Electronics",
    price: 45999,
    oldPrice: 52999,
    rating: 4.6,
    reviews: 112,
    badge: "TOP PICK",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    name: "Modern Travel Watch",
    category: "Accessories",
    price: 1099,
    oldPrice: 1699,
    rating: 4.0,
    reviews: 39,
    badge: "DEAL",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 11,
    name: "Comfortable Home Chair",
    category: "Home",
    price: 3499,
    oldPrice: 4499,
    rating: 4.3,
    reviews: 61,
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 12,
    name: "Everyday Sports Shoes",
    category: "Fashion",
    price: 1499,
    oldPrice: 2299,
    rating: 4.2,
    reviews: 88,
    badge: "SALE",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80"
  }
];

// ====================================
// GET HTML ELEMENTS
// ====================================

const searchInput = document.getElementById("searchInput");
const searchCategory = document.getElementById("searchCategory");
const searchBtn = document.getElementById("searchBtn");
const productGrid = document.getElementById("productGrid");
const sectionTitle = document.getElementById("sectionTitle");
const resultCount = document.getElementById("resultCount");
const sortSelect = document.getElementById("sortSelect");
const emptyMessage = document.getElementById("emptyMessage");

const cartDrawer = document.getElementById("cartDrawer");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const subtotalElement = document.getElementById("subtotal");
const deliveryElement = document.getElementById("delivery");
const grandTotalElement = document.getElementById("grandTotal");
const toast = document.getElementById("toast");

// ====================================
// APPLICATION STATE
// ====================================

let selectedCategory = "All";
let searchTerm = "";
let toastTimer;

let cart = [];

try {
  const savedCart = JSON.parse(
    localStorage.getItem("siddhumart-cart") || "[]"
  );

  if (Array.isArray(savedCart)) {
    cart = savedCart.filter(item =>
      products.some(product => product.id === item.id) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0 &&
      item.quantity <= 99
    );
  }
} catch (error) {
  cart = [];
}

function saveCart() {
  try {
    localStorage.setItem("siddhumart-cart", JSON.stringify(cart));
  } catch (error) {
    showToast("Cart could not be saved in this browser.");
  }
}

// ====================================
// FORMAT PRICE IN INDIAN RUPEES
// ====================================

function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(price);
}

// ====================================
// SHOW NOTIFICATION
// ====================================

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

// ====================================
// DISPLAY PRODUCTS
// ====================================

function renderProducts() {
  let filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch = (
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );

    return matchesCategory && matchesSearch;
  });

  const sortMode = sortSelect.value;

  if (sortMode === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortMode === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortMode === "name") {
    filteredProducts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  sectionTitle.textContent =
    selectedCategory === "All"
      ? "Explore Products"
      : selectedCategory + " Products";

  resultCount.textContent =
    `${filteredProducts.length} products available`;

  productGrid.innerHTML = "";

  emptyMessage.hidden = filteredProducts.length !== 0;
  productGrid.hidden = filteredProducts.length === 0;

  filteredProducts.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";

    // Use DOM properties and textContent for product data.
    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image-wrap";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";

    image.onerror = () => {
      image.onerror = null;
      image.src =
        "https://placehold.co/600x400/f0f2f6/202b3c?text=Product";
    };

    const badge = document.createElement("span");
    badge.className = "product-badge";
    badge.textContent = product.badge;

    imageWrap.append(image, badge);

    const info = document.createElement("div");
    info.className = "product-info";

    const category = document.createElement("p");
    category.className = "product-category";
    category.textContent = product.category;

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = product.name;

    const rating = document.createElement("div");
    rating.className = "product-rating";
    rating.textContent = "★".repeat(Math.round(product.rating)) + " ";

    const ratingCount = document.createElement("span");
    ratingCount.className = "rating-count";
    ratingCount.textContent =
      `${product.rating}/5 (${product.reviews})`;
    rating.append(ratingCount);

    const priceRow = document.createElement("div");
    priceRow.className = "product-price-row";

    const price = document.createElement("span");
    price.className = "product-price";
    price.textContent = formatPrice(product.price);

    const oldPrice = document.createElement("span");
    oldPrice.className = "product-old-price";
    oldPrice.textContent = formatPrice(product.oldPrice);

    priceRow.append(price, oldPrice);

    const addButton = document.createElement("button");
    addButton.className = "add-button";
    addButton.textContent = "🛒 Add to Cart";
    addButton.addEventListener("click", () => {
      addToCart(product.id);
    });

    info.append(category, name, rating, priceRow, addButton);
    card.append(imageWrap, info);
    productGrid.append(card);
  });
}

// ====================================
// SEARCH AND CATEGORY FILTERS
// ====================================

function performSearch() {
  searchTerm = searchInput.value.trim().toLowerCase();
  selectedCategory = searchCategory.value;
  updateCategoryButtons();
  renderProducts();
}

searchBtn.addEventListener("click", performSearch);

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim().toLowerCase();
  searchCategory.value = selectedCategory;
  renderProducts();
});

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    performSearch();
  }
});

searchCategory.addEventListener("change", () => {
  selectedCategory = searchCategory.value;
  updateCategoryButtons();
  renderProducts();
});

sortSelect.addEventListener("change", renderProducts);

function setCategory(category) {
  selectedCategory = category;
  searchCategory.value = category;
  searchInput.value = "";
  searchTerm = "";
  updateCategoryButtons();
  renderProducts();
}

function updateCategoryButtons() {
  document.querySelectorAll("[data-category]").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.category === selectedCategory
    );
  });
}

document.querySelectorAll("[data-category]").forEach(button => {
  button.addEventListener("click", () => {
    setCategory(button.dataset.category);
    document.getElementById("productsSection").scrollIntoView({
      behavior: "smooth"
    });
  });
});

document.getElementById("allProducts").addEventListener("click", () => {
  setCategory("All");
});

document.getElementById("shopNow").addEventListener("click", () => {
  document.getElementById("productsSection").scrollIntoView({
    behavior: "smooth"
  });
});

document.getElementById("resetSearch").addEventListener("click", () => {
  sortSelect.value = "featured";
  setCategory("All");
});

// ====================================
// ADD ITEMS TO CART
// ====================================

function addToCart(productId) {
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    if (existingItem.quantity >= 99) {
      showToast("Maximum quantity is 99.");
      return;
    }

    existingItem.quantity += 1;
  } else {
    cart.push({
      id: productId,
      quantity: 1
    });
  }

  saveCart();
  renderCart();
  showToast("✅ Product added to your cart!");
}

// ====================================
// UPDATE QUANTITY OR REMOVE ITEM
// ====================================

function changeQuantity(productId, amount) {
  const item = cart.find(item => item.id === productId);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    cart = cart.filter(item => item.id !== productId);
  } else if (item.quantity > 99) {
    item.quantity = 99;
    showToast("Maximum quantity is 99.");
  }

  saveCart();
  renderCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  renderCart();
  showToast("Product removed from cart.");
}

// ====================================
// DISPLAY SHOPPING CART AND BILL
// ====================================

function renderCart() {
  cartItems.innerHTML = "";

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  cartCount.textContent = totalItems;

  let subtotal = 0;

  if (cart.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-cart";

    const emoji = document.createElement("div");
    emoji.textContent = "🛒";

    const title = document.createElement("h3");
    title.textContent = "Your cart is empty";

    const message = document.createElement("p");
    message.textContent = "Add products to start shopping.";

    empty.append(emoji, title, message);
    cartItems.append(empty);
  }

  cart.forEach(item => {
    const product = products.find(p => p.id === item.id);

    if (!product) return;

    subtotal += product.price * item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;

    image.onerror = () => {
      image.onerror = null;
      image.src =
        "https://placehold.co/200x200/f0f2f6/202b3c?text=Product";
    };

    const details = document.createElement("div");

    const name = document.createElement("h3");
    name.textContent = product.name;

    const price = document.createElement("div");
    price.className = "cart-item-price";
    price.textContent = formatPrice(product.price * item.quantity);

    const controls = document.createElement("div");
    controls.className = "cart-item-controls";

    const minus = document.createElement("button");
    minus.className = "quantity-button";
    minus.textContent = "−";
    minus.setAttribute("aria-label", "Decrease quantity");
    minus.addEventListener("click", () => {
      changeQuantity(product.id, -1);
    });

    const quantity = document.createElement("span");
    quantity.textContent = item.quantity;
    quantity.setAttribute("aria-label", "Quantity");

    const plus = document.createElement("button");
    plus.className = "quantity-button";
    plus.textContent = "+";
    plus.setAttribute("aria-label", "Increase quantity");
    plus.addEventListener("click", () => {
      changeQuantity(product.id, 1);
    });

    const remove = document.createElement("button");
    remove.className = "remove-button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      removeFromCart(product.id);
    });

    controls.append(minus, quantity, plus, remove);
    details.append(name, price, controls);
    row.append(image, details);
    cartItems.append(row);
  });

  const delivery = subtotal === 0 || subtotal >= 999 ? 0 : 49;
  const total = subtotal + delivery;

  subtotalElement.textContent = formatPrice(subtotal);
  deliveryElement.textContent =
    delivery === 0 && subtotal > 0
      ? "FREE"
      : formatPrice(delivery);
  grandTotalElement.textContent = formatPrice(total);
}

// ====================================
// OPEN AND CLOSE CART
// ====================================

function openCart() {
  cartDrawer.classList.add("open");
  overlay.classList.add("show");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.getElementById("closeCart").focus();
}

function closeCart() {
  cartDrawer.classList.remove("open");
  overlay.classList.remove("show");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  document.getElementById("openCart").focus();
}

document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
overlay.addEventListener("click", closeCart);

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && cartDrawer.classList.contains("open")) {
    closeCart();
  }
});

// ====================================
// DEMO CHECKOUT
// ====================================

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (cart.length === 0) {
    showToast("Your cart is empty. Add a product first.");
    return;
  }

  const itemCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id);
    return sum + (product ? product.price * item.quantity : 0);
  }, 0);

  const delivery = subtotal >= 999 ? 0 : 49;
  const total = subtotal + delivery;

  alert(
    "Welcome to SiddhuMart Demo Checkout!\n\n" +
    "Items: " + itemCount + "\n" +
    "Subtotal: " + formatPrice(subtotal) + "\n" +
    "Delivery: " + (delivery === 0 ? "FREE" : formatPrice(delivery)) + "\n" +
    "Total: " + formatPrice(total) + "\n\n" +
    "This is a demo. No payment or real order will be created."
  );
});

// ====================================
// INITIALIZE WEBSITE
// ====================================

document.getElementById("currentYear").textContent =
  new Date().getFullYear();

renderProducts();
renderCart();