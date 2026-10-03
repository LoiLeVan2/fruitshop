import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import "./ProductDetail.css";

const ProductDetail = () => {
    const { id } = useParams();
    const { cartItems, addToCart, removeFromCart, url, food_list } = useContext(StoreContext);

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const foundProduct = food_list.find(item => item._id === id);

        if (foundProduct) {
            setProduct(foundProduct);
            setLoading(false);
        } else {
            setError("Product not found");
            setLoading(false);
        }

        window.scrollTo(0, 0);
    }, [id, food_list]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <h2 className="error-message">{error}</h2>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail-content">
                <img src={`${url}/images/${product.image}`} alt={product.name} className="product-image" />
                <div className="product-info">
                    <h2 className="product-name">{product.name}</h2>
                    <p className="product-price">${product.price.toFixed(2)}</p>
                    <p className="product-description">{product.description}</p>
                    <div className="add-to-cart">
                        <div className="product-quantity-controls">
                            {cartItems[product._id] ? (
                                <div className="product-item-counter">
                                    <img
                                        onClick={() => removeFromCart(product._id)}
                                        src={assets.remove_icon_red}
                                        alt="Remove"
                                        className="quantity-btn"
                                    />
                                    <p className="quantity-display">{cartItems[product._id]}</p>
                                    <img
                                        onClick={() => addToCart(product._id)}
                                        src={assets.add_icon_green}
                                        alt="Add"
                                        className="quantity-btn"
                                    />
                                </div>
                            ) : (
                                <button className="add-to-cart-btn" onClick={() => addToCart(product._id)}>
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
