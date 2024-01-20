import React, {useEffect, useState} from 'react';
import closeIcon from '../assets/icons/x.svg';
import axios from 'axios';

const AddProductModal = ({ modalVisible, onHide, productPreData, refreshCallback }) => {
    const [productData, setProductData] = useState(productPreData);
    const [updateLoading, setUpdateLoading] = useState(false);

    const handleUpdateProduct = async () => {
        try {
            if (!productData.productId) {
                alert('Error while loading product data');
                return;
            }

            if (!productData.name || !productData.description) {
                alert('Please enter all product details');
                return;
            }

            setUpdateLoading(true);

            await axios.put(
                `${process.env.REACT_APP_API_URL}/product/${productData.productId}`,
                productData
            );

            setUpdateLoading(false);

            refreshCallback();
            onHide();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    useEffect(() => {
        setProductData(productPreData);
    }, [productPreData]);

    return  modalVisible && (
        <div>
            <div className="modal">
                <div className="modal-content">

                    <div className="modal-header">
                        <h3>Edit Product</h3>
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

                    <button className="button-primary" onClick={handleUpdateProduct} disabled={updateLoading}>
                        {updateLoading ? 'Loading...' : 'Update Product'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductModal;
