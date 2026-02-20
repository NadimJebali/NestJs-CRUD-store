# Online Shop Dashboard

A simple web dashboard to manage your online shop backend.

## Features

- **Create and manage stores** - Add new stores with name, address, and description
- **Create and manage categories** - Organize your products into categories
- **Create and manage subcategories** - Further organize with subcategories
- **Create and manage products** - Add products with price, stock, and images
- **Create and manage tags** - Tag products for better organization
- **Filter products by tags** - Click on a store to see its products and filter by tags

## How to Use

1. **Start your backend server:**

   ```bash
   npm run start:dev
   ```

2. **Open the dashboard in your browser:**

   ```
   http://localhost:3000
   ```

3. **Create your data:**
   - Start by creating stores
   - Create categories and subcategories
   - Create tags
   - Create products and assign them to stores
   - Click on a store to see its products
   - Use the checkboxes on the left to filter products by tags

## API Endpoints

The dashboard connects to these endpoints:

- `GET/POST /stores` - Manage stores
- `GET/POST /categories` - Manage categories
- `GET/POST /subcategories` - Manage subcategories
- `GET/POST /products` - Manage products
- `GET/POST /tags` - Manage tags

## Notes

- CORS is enabled for local development
- The dashboard uses the API running on `http://localhost:3000`
- All data is persisted in your MySQL database
- Delete buttons are available for all items
