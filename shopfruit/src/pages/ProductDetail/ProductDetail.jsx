// ProductDetail.jsx
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { assets, food_list } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);
    const product = food_list.find((item) => item._id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!product) {
        return <h2 className="error-message">Product not found</h2>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-content">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-description">{product.description}</p>
                    <div className="add-to-cart">
                        <div className="product-quantity-controls">
                            {cartItems[id] ? (
                                <div className='product-item-counter'>
                                    <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" className='quantity-btn' />
                                    <p className='quantity-display'>{cartItems[id]}</p>
                                    <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" className='quantity-btn' />
                                </div>
                            ) : (
                                <button className="add-to-cart-btn" onClick={() => addToCart(id)}>
                                    Add to Cart
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;