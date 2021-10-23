import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import ItemCard from '../components/item-card'
import { getItems } from '../lib/items'
import styles from '../styles/Home.module.css'

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
  }

  static async getInitialProps(context) {
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

  render() {
    return (
      <div className={styles.main} >
        {
          this.state.items.map((item, index) => {
            return (<ItemCard key={index} index={index} item={item} quantity={this.state.quantityArray[index]} cardClick={this.itemClicked} />);
          })
        }
      </div>
    );
  }
}

export default Home;