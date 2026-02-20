const API_URL = 'http://localhost:3000';

let stores = [];
let categories = [];
let subcategories = [];
let products = [];
let tags = [];
let currentStore = null;

// Tab switching
function showTab(tabName) {
  document
    .querySelectorAll('.tab-content')
    .forEach((tab) => tab.classList.remove('active'));
  document
    .querySelectorAll('.tab-btn')
    .forEach((btn) => btn.classList.remove('active'));

  document.getElementById(`${tabName}-tab`).classList.add('active');
  event.target.classList.add('active');

  loadData();
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupForms();
});

// Load all data
async function loadData() {
  await Promise.all([
    loadStores(),
    loadCategories(),
    loadSubcategories(),
    loadProducts(),
    loadTags(),
  ]);

  populateDropdowns();
}

// API Calls
async function loadStores() {
  try {
    const response = await fetch(`${API_URL}/stores`);
    stores = await response.json();
    displayStores();
  } catch (error) {
    console.error('Error loading stores:', error);
  }
}

async function loadCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    categories = await response.json();
    displayCategories();
  } catch (error) {
    console.error('Error loading categories:', error);
  }
}

async function loadSubcategories() {
  try {
    const response = await fetch(`${API_URL}/subcategories`);
    subcategories = await response.json();
    displaySubcategories();
  } catch (error) {
    console.error('Error loading subcategories:', error);
  }
}

async function loadProducts() {
  try {
    const response = await fetch(`${API_URL}/products`);
    products = await response.json();
    displayProducts();
  } catch (error) {
    console.error('Error loading products:', error);
  }
}

async function loadTags() {
  try {
    const response = await fetch(`${API_URL}/tags`);
    tags = await response.json();
    displayTags();
  } catch (error) {
    console.error('Error loading tags:', error);
  }
}

// Display functions
function displayStores() {
  const container = document.getElementById('stores-list');
  container.innerHTML = stores
    .map(
      (store) => `
        <div class="item-card" onclick="openStoreModal(${store.id})">
            <h3>${store.name}</h3>
            <p>${store.description}</p>
            <p><strong>Address:</strong> ${store.address}</p>
            <button class="delete-btn" onclick="event.stopPropagation(); deleteStore(${store.id})">Delete</button>
        </div>
    `,
    )
    .join('');
}

function displayCategories() {
  const container = document.getElementById('categories-list');
  container.innerHTML = categories
    .map((category) => {
      const store = stores.find((s) => s.id === category.store_id);
      return `
        <div class="item-card">
            <h3>${category.name}</h3>
            <p>${category.description}</p>
            <p><strong>Store:</strong> ${store ? store.name : 'N/A'}</p>
            <button class="delete-btn" onclick="deleteCategory(${category.id})">Delete</button>
        </div>
    `;
    })
    .join('');
}

function displaySubcategories() {
  const container = document.getElementById('subcategories-list');
  container.innerHTML = subcategories
    .map((subcategory) => {
      const category = categories.find((c) => c.id === subcategory.category_id);
      return `
            <div class="item-card">
                <h3>${subcategory.name}</h3>
                <p>${subcategory.description}</p>
                <p><strong>Category:</strong> ${category ? category.name : 'N/A'}</p>
                <button class="delete-btn" onclick="deleteSubcategory(${subcategory.id})">Delete</button>
            </div>
        `;
    })
    .join('');
}

function displayProducts() {
  const container = document.getElementById('products-list');
  container.innerHTML = products
    .map((product) => {
      const store = stores.find((s) => s.id === product.store_id);
      const productTags = product.tags || [];
      const category = product.category;
      const subcategory = product.subcategory;
      return `
            <div class="item-card">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
                <p class="stock">Stock: ${product.stock_quantity}</p>
                <p><strong>Store:</strong> ${store ? store.name : 'N/A'}</p>
                ${category ? `<p><strong>Category:</strong> ${category.name}</p>` : ''}
                ${subcategory ? `<p><strong>Subcategory:</strong> ${subcategory.name}</p>` : ''}
                ${
                  productTags.length > 0
                    ? `
                    <div class="product-tags">
                        ${productTags.map((tag) => `<span class="tag-badge">${tag.name}</span>`).join('')}
                    </div>
                `
                    : ''
                }
                <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        `;
    })
    .join('');
}

function displayTags() {
  const container = document.getElementById('tags-list');
  container.innerHTML = tags
    .map(
      (tag) => `
        <div class="item-card">
            <h3>${tag.name}</h3>
            <button class="delete-btn" onclick="deleteTag(${tag.id})">Delete</button>
        </div>
    `,
    )
    .join('');
}

// Populate dropdowns
function populateDropdowns() {
  // Category store dropdown
  const categoryStoreSelect = document.getElementById('category-store');
  if (categoryStoreSelect) {
    categoryStoreSelect.innerHTML =
      '<option value="">Select Store</option>' +
      stores
        .map((store) => `<option value="${store.id}">${store.name}</option>`)
        .join('');
  }

  // Subcategory category dropdown
  const categorySelect = document.getElementById('subcategory-category');
  categorySelect.innerHTML =
    '<option value="">Select Category</option>' +
    categories
      .map((cat) => `<option value="${cat.id}">${cat.name}</option>`)
      .join('');

  // Product store dropdown
  const storeSelect = document.getElementById('product-store');
  storeSelect.innerHTML =
    '<option value="">Select Store</option>' +
    stores
      .map((store) => `<option value="${store.id}">${store.name}</option>`)
      .join('');

  // Product category dropdown (filtered by selected store)
  updateProductCategoryDropdown();

  // Product tags checkboxes
  const tagsContainer = document.getElementById('product-tags-checkboxes');
  if (tagsContainer) {
    tagsContainer.innerHTML = tags
      .map(
        (tag) => `
        <div class="filter-item">
          <input type="checkbox" id="product-tag-${tag.id}" value="${tag.id}">
          <label for="product-tag-${tag.id}">${tag.name}</label>
        </div>
      `,
      )
      .join('');
  }
}

// Update product category dropdown based on selected store
function updateProductCategoryDropdown(storeId = null) {
  const categorySelect = document.getElementById('product-category');
  if (!categorySelect) return;

  let filteredCategories = categories;
  if (storeId) {
    filteredCategories = categories.filter((cat) => cat.store_id == storeId);
  }

  categorySelect.innerHTML =
    '<option value="">Select Category (Optional)</option>' +
    filteredCategories
      .map((cat) => `<option value="${cat.id}">${cat.name}</option>`)
      .join('');

  // Reset subcategory dropdown
  updateProductSubcategoryDropdown();
}

// Update product subcategory dropdown based on selected category
function updateProductSubcategoryDropdown(categoryId = null) {
  const subcategorySelect = document.getElementById('product-subcategory');
  if (!subcategorySelect) return;

  let filteredSubcategories = subcategories;
  if (categoryId) {
    filteredSubcategories = subcategories.filter(
      (sub) => sub.category_id == categoryId,
    );
  }

  subcategorySelect.innerHTML =
    '<option value="">Select Subcategory (Optional)</option>' +
    filteredSubcategories
      .map((sub) => `<option value="${sub.id}">${sub.name}</option>`)
      .join('');
}

// Form handlers
function setupForms() {
  document
    .getElementById('store-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById('store-name').value,
        address: document.getElementById('store-address').value,
        description: document.getElementById('store-description').value,
      };

      try {
        await fetch(`${API_URL}/stores`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        e.target.reset();
        loadStores();
      } catch (error) {
        console.error('Error creating store:', error);
      }
    });

  document
    .getElementById('category-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      const storeValue = document.getElementById('category-store').value;
      const data = {
        name: document.getElementById('category-name').value,
        description: document.getElementById('category-description').value,
      };

      // Only add store_id if a store is selected
      if (storeValue) {
        data.store_id = parseInt(storeValue);
      }

      try {
        await fetch(`${API_URL}/categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        e.target.reset();
        loadCategories();
      } catch (error) {
        console.error('Error creating category:', error);
      }
    });

  document
    .getElementById('subcategory-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: document.getElementById('subcategory-name').value,
        description: document.getElementById('subcategory-description').value,
        category_id: parseInt(
          document.getElementById('subcategory-category').value,
        ),
      };

      try {
        await fetch(`${API_URL}/subcategories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        e.target.reset();
        loadSubcategories();
      } catch (error) {
        console.error('Error creating subcategory:', error);
      }
    });

  document
    .getElementById('product-form')
    .addEventListener('submit', async (e) => {
      e.preventDefault();

      // Get selected tag IDs
      const selectedTags = Array.from(
        document.querySelectorAll(
          '#product-tags-checkboxes input[type="checkbox"]:checked',
        ),
      ).map((checkbox) => parseInt(checkbox.value));

      const categoryValue = document.getElementById('product-category').value;
      const subcategoryValue = document.getElementById(
        'product-subcategory',
      ).value;

      const data = {
        name: document.getElementById('product-name').value,
        description: document.getElementById('product-description').value,
        price: parseFloat(document.getElementById('product-price').value),
        stock_quantity: parseInt(
          document.getElementById('product-stock').value,
        ),
        store_id: parseInt(document.getElementById('product-store').value),
        display_image: document.getElementById('product-image').value || null,
        tag_ids: selectedTags,
      };

      // Add category and subcategory if selected
      if (categoryValue) {
        data.category_id = parseInt(categoryValue);
      }
      if (subcategoryValue) {
        data.subcategory_id = parseInt(subcategoryValue);
      }

      try {
        await fetch(`${API_URL}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });
        e.target.reset();
        // Uncheck all tag checkboxes
        document
          .querySelectorAll('#product-tags-checkboxes input[type="checkbox"]')
          .forEach((cb) => (cb.checked = false));
        loadProducts();
      } catch (error) {
        console.error('Error creating product:', error);
      }
    });

  // Add event listeners for cascading dropdowns
  document.getElementById('product-store').addEventListener('change', (e) => {
    const storeId = e.target.value;
    updateProductCategoryDropdown(storeId);
  });

  document
    .getElementById('product-category')
    .addEventListener('change', (e) => {
      const categoryId = e.target.value;
      updateProductSubcategoryDropdown(categoryId);
    });

  document.getElementById('tag-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById('tag-name').value,
    };

    try {
      await fetch(`${API_URL}/tags`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      e.target.reset();
      loadTags();
    } catch (error) {
      console.error('Error creating tag:', error);
    }
  });
}

// Delete functions
async function deleteStore(id) {
  if (confirm('Are you sure you want to delete this store?')) {
    try {
      await fetch(`${API_URL}/stores/${id}`, { method: 'DELETE' });
      loadStores();
    } catch (error) {
      console.error('Error deleting store:', error);
    }
  }
}

async function deleteCategory(id) {
  if (confirm('Are you sure you want to delete this category?')) {
    try {
      await fetch(`${API_URL}/categories/${id}`, { method: 'DELETE' });
      loadCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  }
}

async function deleteSubcategory(id) {
  if (confirm('Are you sure you want to delete this subcategory?')) {
    try {
      await fetch(`${API_URL}/subcategories/${id}`, { method: 'DELETE' });
      loadSubcategories();
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  }
}

async function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await fetch(`${API_URL}/products/${id}`, { method: 'DELETE' });
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }
}

async function deleteTag(id) {
  if (confirm('Are you sure you want to delete this tag?')) {
    try {
      await fetch(`${API_URL}/tags/${id}`, { method: 'DELETE' });
      loadTags();
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  }
}

// Store modal
async function openStoreModal(storeId) {
  currentStore = stores.find((s) => s.id === storeId);
  if (!currentStore) return;

  document.getElementById('modal-store-name').textContent = currentStore.name;

  // Load store products with tags, categories, and subcategories
  try {
    const response = await fetch(`${API_URL}/stores/${storeId}`);
    const storeData = await response.json();
    const storeProducts = storeData.products || [];

    // Get all unique tags, categories, and subcategories from store products
    const allTags = new Set();
    const allCategories = new Set();
    const allSubcategories = new Set();

    storeProducts.forEach((product) => {
      if (product.tags) {
        product.tags.forEach((tag) => allTags.add(JSON.stringify(tag)));
      }
      if (product.category) {
        allCategories.add(JSON.stringify(product.category));
      }
      if (product.subcategory) {
        allSubcategories.add(JSON.stringify(product.subcategory));
      }
    });

    // Build categories hierarchy display
    const categoriesMap = new Map();
    Array.from(allCategories).forEach((catStr) => {
      const category = JSON.parse(catStr);
      if (!categoriesMap.has(category.id)) {
        categoriesMap.set(category.id, {
          ...category,
          subcategories: [],
        });
      }
    });

    Array.from(allSubcategories).forEach((subStr) => {
      const subcategory = JSON.parse(subStr);
      if (categoriesMap.has(subcategory.category_id)) {
        categoriesMap
          .get(subcategory.category_id)
          .subcategories.push(subcategory);
      }
    });

    // Display categories with subcategories
    const categoriesDisplay = document.getElementById('categories-display');
    if (categoriesMap.size > 0) {
      let categoriesHTML = '<h3>Categories</h3><div class="categories-tree">';
      categoriesMap.forEach((category) => {
        categoriesHTML += `
          <div class="category-item">
            <div class="category-name">${category.name}</div>
            ${
              category.subcategories.length > 0
                ? `
              <ul class="subcategories-list">
                ${category.subcategories.map((sub) => `<li>${sub.name}</li>`).join('')}
              </ul>
            `
                : ''
            }
          </div>
        `;
      });
      categoriesHTML += '</div>';
      categoriesDisplay.innerHTML = categoriesHTML;
    } else {
      categoriesDisplay.innerHTML = '';
    }

    // Build filters HTML
    let filtersHTML = '';

    // Categories filter
    if (allCategories.size > 0) {
      filtersHTML += '<h4>Categories</h4>';
      filtersHTML += Array.from(allCategories)
        .map((catStr) => {
          const category = JSON.parse(catStr);
          return `
            <div class="filter-item">
              <input type="checkbox" id="category-${category.id}" onchange="filterProducts()">
              <label for="category-${category.id}">${category.name}</label>
            </div>
          `;
        })
        .join('');
    }

    // Subcategories filter
    if (allSubcategories.size > 0) {
      filtersHTML += '<h4>Subcategories</h4>';
      filtersHTML += Array.from(allSubcategories)
        .map((subStr) => {
          const subcategory = JSON.parse(subStr);
          return `
            <div class="filter-item">
              <input type="checkbox" id="subcategory-${subcategory.id}" onchange="filterProducts()">
              <label for="subcategory-${subcategory.id}">${subcategory.name}</label>
            </div>
          `;
        })
        .join('');
    }

    // Tags filter
    if (allTags.size > 0) {
      filtersHTML += '<h4>Tags</h4>';
      filtersHTML += Array.from(allTags)
        .map((tagStr) => {
          const tag = JSON.parse(tagStr);
          return `
            <div class="filter-item">
              <input type="checkbox" id="tag-${tag.id}" onchange="filterProducts()">
              <label for="tag-${tag.id}">${tag.name}</label>
            </div>
          `;
        })
        .join('');
    }

    // Display filters
    const tagFilters = document.getElementById('tag-filters');
    if (filtersHTML) {
      tagFilters.innerHTML = filtersHTML;
    } else {
      tagFilters.innerHTML = '<p>No filters available</p>';
    }

    // Store products globally for filtering
    window.currentStoreProducts = storeProducts;

    // Display products
    displayStoreProducts(storeProducts);

    document.getElementById('store-modal').style.display = 'block';
  } catch (error) {
    console.error('Error loading store details:', error);
  }
}

function displayStoreProducts(productsToShow) {
  const container = document.getElementById('store-products');

  if (productsToShow.length === 0) {
    container.innerHTML = '<div class="no-products">No products found</div>';
    return;
  }

  container.innerHTML = productsToShow
    .map((product) => {
      const productTags = product.tags || [];
      return `
            <div class="product-card">
                <h4>${product.name}</h4>
                <p>${product.description}</p>
                <div class="product-details">
                    <span class="price">$${product.price}</span>
                    <span class="stock">Stock: ${product.stock_quantity}</span>
                </div>
                ${
                  productTags.length > 0
                    ? `
                    <div class="product-tags">
                        ${productTags.map((tag) => `<span class="tag-badge">${tag.name}</span>`).join('')}
                    </div>
                `
                    : ''
                }
            </div>
        `;
    })
    .join('');
}

function filterProducts() {
  if (!window.currentStoreProducts) return;

  // Get selected category IDs
  const selectedCategories = Array.from(
    document.querySelectorAll('#tag-filters input[id^="category-"]:checked'),
  ).map((checkbox) => parseInt(checkbox.id.replace('category-', '')));

  // Get selected subcategory IDs
  const selectedSubcategories = Array.from(
    document.querySelectorAll('#tag-filters input[id^="subcategory-"]:checked'),
  ).map((checkbox) => parseInt(checkbox.id.replace('subcategory-', '')));

  // Get selected tag IDs
  const selectedTags = Array.from(
    document.querySelectorAll('#tag-filters input[id^="tag-"]:checked'),
  ).map((checkbox) => parseInt(checkbox.id.replace('tag-', '')));

  // Filter products
  let filteredProducts = window.currentStoreProducts;

  // Apply filters (OR logic within each type, AND logic between types)
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      return (
        product.category && selectedCategories.includes(product.category.id)
      );
    });
  }

  if (selectedSubcategories.length > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      return (
        product.subcategory &&
        selectedSubcategories.includes(product.subcategory.id)
      );
    });
  }

  if (selectedTags.length > 0) {
    filteredProducts = filteredProducts.filter((product) => {
      if (!product.tags || product.tags.length === 0) return false;
      return product.tags.some((tag) => selectedTags.includes(tag.id));
    });
  }

  displayStoreProducts(filteredProducts);
}

function closeStoreModal() {
  document.getElementById('store-modal').style.display = 'none';
  currentStore = null;
  window.currentStoreProducts = null;
}

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById('store-modal');
  if (event.target === modal) {
    closeStoreModal();
  }
};
