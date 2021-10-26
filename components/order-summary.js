import styles from '../styles/order-summary.module.css';

export default function OrderSummary({ cart, totalPrice }) {
    const currency = cart.length > 0 ? cart[0].currency : ' ';
    const totalItems = cart.length;

    return (
        <div className={styles.container}>
            <p>
                Items in cart: <strong>{ totalItems }</strong><br/>
                Total amount: <strong>{ totalPrice } { currency }</strong>
            </p>
        </div>
    );
}