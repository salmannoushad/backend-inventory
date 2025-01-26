# Barcode-Driven Inventory System - Backend

## Overview

This repository contains the backend for a responsive inventory management system where users can scan product barcodes, retrieve product details from an external API, and manage their inventory via a Kanban board. The system is built using Node.js and MongoDB for the backend, offering essential API functionality for product management.

## Core Features

1. **Barcode Scanning:**
   - Endpoint to fetch product details based on scanned barcodes from an external API:
     - API URL: `https://products-test-aci.onrender.com/product/[your_barcode]`
   - Saves product details into MongoDB with the initial category as 'Uncategorized'.

2. **Kanban Board Support:**
   - Categories are dynamically created and updated in the database.

3. **API Backend (Node.js):**
   - **Add products** to the database.
   - **Retrieve all products** or filter by category.
   - **Update product categories** based on user interactions from the frontend.
   - **Analytics Dashboard** based on category, recent product add and total count.
   - **Search functionality** search by category or name.
   - **Database**: MongoDB for data storage.

## Technologies

- **Node.js** for the backend server.
- **MongoDB** for data storage.
- **Express** for handling API routes.
- **Axios** for external API calls (barcode lookup).
- **Mongoose** for MongoDB schema management.

## Installation

Follow the steps below to set up the backend locally.

### 1. Clone the Repository
```bash
git clone https://github.com/salmannoushad/backend-inventory.git
cd backend-inventory
```

# Installation
1. Prerequisites
Ensure you have the following installed:
- node: v18.20.4
- mongodb

2. Environment Variables
Create a .env file in the root directory with the following variables:

    ```bash
    MONGO_URI=mongodb://192.168.122.20:27017/barcode
    ```

2. Install dependencies:
    ```
    npm install
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. The server will be available at http://localhost:5000

## API Endpoints

### 1. GET `/product/:barcode`
**Description**: Fetches product details based on the barcode from the external API and adds it to the database.

**Parameters**:
- `barcode` (string): The barcode of the product.

**Response**:
```json
{
  "message": "Product added successfully",
  "product": {
    "barcode": "1234567890142",
    "name": "Hand Sanitizer 50ml",
    "details": "Hand Sanitizer 50ml",
    "category": "Uncategorized",
    "_id": "67967de46a5942884bf12c50",
    "createdAt": "2025-01-26T18:24:36.171Z",
    "updatedAt": "2025-01-26T18:24:36.171Z",
    "__v": 0
   }
}
```
### 2. GET `/`
**Description**: Retrieves all products or filters products by category.

**Parameters**:
- `barcode` (string): Filter products by category.

**Response**:
```json
[
  {
    "id": "string",
    "barcode": "string",
    "name": "string",
    "description": "string",
    "category": "Uncategorized"
  },
]
```

### 3. PUT `/:id`
**Description**: Updates the category of an existing product by ID.

**Parameters**:
- `id` (string): The ID of the product.

**Request body**:
```json
{
  "category": "new category"
}
```
**Response**:
```json
{
  "message": "Product category updated successfully",
  "product": {
    "id": "string",
    "barcode": "string",
    "name": "string",
    "description": "string",
    "category": "new category"
  }
}
```

### 4. GET `/analytics`
**Description**: Fetches analytics data such as the number of products in each category or other relevant stats.

**Response**:
```json
{
  "totalProducts": 100,
  "categories": {
    "Uncategorized": 30,
    "Electronics": 25,
    "Clothing": 45
  }
}
```

### 5. GET `/search`
**Description**: Searches for products by name or category.

**Parameters**:
- `name` (string): Search products by name.
- `category` (string): Search products by category.

**Response**:
```json
[
  {
    "id": "string",
    "barcode": "string",
    "name": "string",
    "description": "string",
    "category": "Uncategorized"
  },
  ...
]
```

# Docker Configuration
1. Create a Dockerfile in the root directory with the following content:

    ```bash
    FROM node:18-alpine

    WORKDIR /app

    COPY package.json .

    RUN npm install

    COPY . .

    EXPOSE 5000

    CMD ["npm", "start"]
    ```
2. To build and run the Docker container:

    ```bash
    docker build -t backend-service .
    docker run -p 5000:5000 --env-file .env backend-service
    ```
    
Feel free to contribute or open issues for improvements! Happy coding! 🎉
