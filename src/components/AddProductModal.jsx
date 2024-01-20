import React, { useState } from 'react';
import closeIcon from '../assets/icons/x.svg';
import axios from 'axios';

const AddProductModal = ({ modalVisible, onHide, refreshCallback }) => {
    const [productData, setProductData] = useState({
        active: true,
        name: '',
        description: '',
        stock: 0,
    });
    const [addLoading, setAddLoading] = useState(false);

    const handleAddProduct = async () => {
        try {
            if (!productData.name || !productData.description) {
                alert('Please enter all product details');
                return;
            }

            setAddLoading(true);

            await axios.post(
                `${process.env.REACT_APP_API_URL}/product/new`,
                productData
            );

            setAddLoading(false);

            setProductData(
                {
                    active: true,
                    name: '',
                    description: '',
                    stock: 0,
                }
            );

            refreshCallback();
            onHide();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return  modalVisible && (
        <div>
            <div className="modal">
                <div className="modal-content">

                    <div className="modal-header">
                        <h3>Add Product</h3>
                        <img src={closeIcon} alt="Close" className="close" onClick={onHide} />
                    </div>

                    <div className="form-group">
                        <label>Active:</label>
                        <input
                            type="checkbox"
                            checked={productData.active}
                            onChange={(e) => setProductData({...productData, active: e.target.checked})}
                        />
                    </div>

                    <label>Name:</label>
                    <input
                        type="text"
                        value={productData.name}
                        onChange={(e) => setProductData({...productData, name: e.target.value})}
                    />

                    <label>Description:</label>
                    <textarea
                        value={productData.description}
                        onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                    />

                    <label>Stock:</label>
                    <input
                        type="number"
                        value={productData.stock}
                        onChange={(e) => setProductData({ ...productData, stock: parseInt(e.target.value) })}
                    />

                    <button className="button-primary" onClick={handleAddProduct} disabled={addLoading}>
                        {addLoading ? 'Loading...' : 'Add Product'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
