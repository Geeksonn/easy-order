import React from 'react';

import { listItems } from '@lib/items/items';
import { createOrder } from '@lib/orders/orders';
import { listEditions } from '@lib/editions/editions';

import ItemCard from '@components/itemCard';
import OrderSummary from '@components/order-summary';
import { Button } from 'geekson-ui';

import css from '@styles/order.module.css';

const Order = () => {
    const [cart, setCart] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [activeEdition, setActiveEdition] = React.useState();

    React.useEffect(() => {
        getItems();
    }, [JSON.stringify(items)]);

    const getEditions = async() => {
        const editions = await listEditions();
        if (editions.error) {
            // TODO Toast
            console.error(editions.error);
        } else {
            return editions;
        }
    }

    const getItems = async() => {
        const editions = await getEditions();
        const activeEdition = editions.find((ed) => ed.active === true);
        setActiveEdition(activeEdition);

        const items = await listItems({ edition: activeEdition.name });
        if (items.error) {
            // TODO Toast or somethign
            console.error(items.error);
        }
        else {
            setItems(items);
        }
    }

    const itemClicked = (item) => {
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
        setCart([]);
    };

    const order = () => {
        if (cart.length === 0) {
            console.log('Nothing to order');
        } else {
            const order = {
                totalPrice: cart.map((it) => it.price).reduce((prev, curr) => prev + curr, 0),
                currency: cart[0].currency,
                items: cart,
                date: new Date(),
                edition: activeEdition.name
            };

            createOrder(order);
        }

        resetCart();
    };

    return (
        <div>
            <div className={css.itemsWrapper}>
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
            <div className={css.summary}>
                <Button label='Annuler' accent='red' className='mr-4' clickHandler={resetCart} />
                <OrderSummary
                    cart={cart}
                    totalPrice={cart.map((it) => it.price).reduce((prev, curr) => prev + curr, 0)}
                />
                <Button label='Commander' accent='green' className='ml-4' clickHandler={order} />
            </div>
        </div>
    );
};

export default Order;
