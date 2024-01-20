import React, { useState, useEffect } from "react";
import axios from "axios";
import "../assets/css/Home.css";
import Layout from "../components/Layout";
import Header from "../components/Header";
import editIcon from "../assets/icons/edit.svg";
import trashIcon from "../assets/icons/trash.svg";
import AddProductModal from "../components/AddProductModal";
import EditProductModal from "../components/EditProductModal";

const Home = () => {
    const [productsLoading, setProductsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editData, setEditData] = useState({
        active: true,
        name: '',
        description: '',
        stock: 0,
    });

    const fetchData = async () => {
        try {
            setProductsLoading(true);
            const response = await axios.get(
                `${process.env.REACT_APP_API_URL}/products`
            );

            setProducts(response.data.items);
            setProductsLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const showAddModal = () => setAddModalVisible(true);
    const hideAddModal = () => setAddModalVisible(false);

    const hideEditModal = () => setEditModalVisible(false);

    const handleEdit = (product) => {
        setEditData(product);
        setEditModalVisible(true);
    }

    const handleDelete = async (productId) => {
        try {
            setProductsLoading(true);
            await axios.delete(
                `${process.env.REACT_APP_API_URL}/product/${productId}`
            );

            fetchData();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <Layout>
            <Header onAddAction={showAddModal} />

            <h3>Products</h3>
            <table>
                <thead>
                <tr>
                    <th>Status</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {!productsLoading && products.map((product) => (
                    <tr key={product.productId}>
                        <td className={`tag ${product.active ? "active" : "inactive"}`}>
                            {product.active ? "Active" : "Inactive"}
                        </td>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{product.stock}</td>
                        <td className="table-actions">
                            <img src={editIcon} alt="Edit" title="Edit" onClick={() => handleEdit(product)} />
                            <img src={trashIcon} alt="Delete" title="Delete" onClick={() => handleDelete(product.productId)} />
                        </td>
                    </tr>
                ))}

                {productsLoading && (
                    <tr>
                        <td colSpan="5">Loading...</td>
                    </tr>
                )}

                {!productsLoading && products.length === 0 && (
                    <tr>
                        <td colSpan="5">No products found</td>
                    </tr>
                )}

                </tbody>
            </table>

            <AddProductModal modalVisible={addModalVisible} onHide={hideAddModal} refreshCallback={fetchData}/>
            <EditProductModal modalVisible={editModalVisible} onHide={hideEditModal} productPreData={editData} refreshCallback={fetchData}/>
        </Layout>
    );
};

export default Home;
