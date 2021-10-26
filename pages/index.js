import React from 'react';
import Button from '../components/button';
import ItemCard from '../components/item-card';
import OrderSummary from '../components/order-summary';
import { getItems } from '../lib/items';
import { addOrder } from '../lib/orders';
import styles from '../styles/Home.module.css';

class Home extends React.Component {
  constructor(props) {
    super(props);
    let quantityArray = [];
    this.props.props.items.forEach(item => quantityArray.push(0));

    this.state = {
      items: this.props.props.items,
      quantityArray: quantityArray,
      totalPrice: 0,
      cart: new Array()
    };

    this.itemClicked = this.itemClicked.bind(this);
    this.order = this.order.bind(this);
    this.resetCart = this.resetCart.bind(this);
  }

  static async getInitialProps() {
    const items = await getItems();

    return {
      props: {
        items
      }
    };
  }

  itemClicked(index, item) {
    let { totalPrice, quantityArray, cart } = this.state;

    this.setState({
      totalPrice: totalPrice + item.price,
      quantityArray: quantityArray.map((qty, ind) => {
        return ind === index ? ++qty : qty;
      }),
      cart: [...cart, item]
    });
  }

  order() {
    const { cart, totalPrice } = this.state;

    if (cart.length > 0) {
      const order = {
        totalPrice: totalPrice,
        currency: cart[0].currency,
        items: cart
      }

      addOrder(order);
    }
    else {
      console.log('Nothing to order.');
    }

    this.resetCart();
  }

  resetCart() {
    this.setState({
      cart: [],
      totalPrice: 0,
      quantityArray: this.state.quantityArray.map(item => { return 0 })
    });
  }

  render() {
    return (
      <div>
        <div className={styles.main} >
          {
            this.state.items.map((item, index) => {
              return (<ItemCard key={index} index={index} item={item} quantity={this.state.quantityArray[index]} cardClick={this.itemClicked} />);
            })
          }
        </div>
        <div className={styles.main}>
          <Button severity='error' text='Annuler' onClick={this.resetCart} />
          <OrderSummary cart={this.state.cart} totalPrice={this.state.totalPrice} />
          <Button severity='success' text='Commander' onClick={this.order} />
        </div>
      </div>
    );
  }
}

export default Home;