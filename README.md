# AWS Amplify

This repository contains a set of API requests for managing products in an AWS Amplify project. The API supports basic CRUD (Create, Read, Update, Delete) operations for products.

## Table of Contents
- [Add Product](#add-product)
- [Get Product](#get-product)
- [Update Product](#update-product)
- [Delete Product](#delete-product)
- [Get All Products](#get-all-products)

## Add Product

### Request
- **Method**: POST
- **Endpoint**: `https://{{api_url}}/product/:productId`
- **Path Variable**:
    - `productId`: `new-product-id-2`
- **Body**:

```json
{
"active": true,
"name": "Name of product",
"description": "Lorem ipsum dolor sit amet",
"stock": 19
}
```

## Get Product

### Request
- **Method**: GET
- **Endpoint**: `https://{{api_url}}/product/:productId`
- **Path Variable**:
- `productId`: `new-product-id-1`

## Update Product

### Request
- **Method**: PUT
- **Endpoint**: `https://{{api_url}}/product/:productId`
- **Path Variable**:
- `productId`: `new-product-id-1`
- **Body**:

```json
{
"active": false,
"name": "Name of product 2",
"description": "Lorem ipsum dolor sit amet neene",
"stock": 15
}
```

## Delete Product

### Request
- **Method**: DELETE
- **Endpoint**: `https://{{api_url}}/product/:productId`
- **Path Variable**:
- `productId`: `new-product-id-1`

## Get All Products

### Request
- **Method**: GET
- **Endpoint**: `https://{{api_url}}/products`
