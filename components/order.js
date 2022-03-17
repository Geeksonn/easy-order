import React, { useContext, useEffect, useState } from 'react';
import Button from '../components/button';
import ItemCard from '../components/item-card';
import OrderSummary from '../components/order-summary';
import authContext from '../contexts/token';
import { addOrder } from '../lib/orders';
import styles from '../styles/order.module.css';

const Order = ({ items }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [cart, setCart] = useState([]);
    const { token } = useContext(authContext);

    const itemClicked = (index, item) => {
        setTotalPrice(totalPrice + item.price);
        setCart([...cart, item]);
    };

    const getQuantity = (item) => {
        let quantity = 0;

        cart.forEach((itm) => {
            if (itm._id === item._id) {
                quantity++;
            }
        });

        return quantity;
    };

    const resetCart = () => {
        setTotalPrice(0);
        setCart([]);
    };

    const order = () => {
        if (cart.length === 0) {
            console.log('Nothing to order');
        } else {
            const order = {
                totalPrice: totalPrice,
                currency: cart[0].currency,
                items: cart,
            };

            addOrder(token, order);
        }

        resetCart();
    };

    return (
        <div>
            <div className={styles.itemsWrapper}>
                {items.map((item, index) => {
                    return (
                        <ItemCard
                            key={index}
                            index={index}
                            item={item}
                            quantity={getQuantity(item)}
                            cardClick={itemClicked}
                        />
                    );
                })}
            </div>
            <div className={styles.summary}>
                <Button severity='error' text='Annuler' onClick={resetCart} />
                <OrderSummary cart={cart} totalPrice={totalPrice} />
                <Button severity='success' text='Commander' onClick={order} />
            </div>
        </div>
    );
};

export default Order;
