import React, { Component } from 'react';

import { getProductsByCatId } from '../../helpers/api'
import ProductSmallCard from './cards/product-small-card';
import Layout from './LayoutPage';
import './ProductsListPage.css';

export default class ProductsList extends Component {

  state = {
    products: [],
    lastLocation: '',
  }

  shouldComponentUpdate() {
    return true;
  }

  componentDidUpdate() {
    if (this.state.lastLocation !== this.props.location.pathname) {
      this.setState({ lastLocation: this.props.location.pathname });
      this.fetchProducts();
    }
  }

  async componentDidMount() {
    this.fetchProducts();
    this.setState({ lastLocation: this.props.location.pathname });
  }

  fetchProducts = async () => {
    const products = await getProductsByCatId(this.props.match.params.id);
    this.setState({ products: products.data || [] });
  }


  displayProducts = () => {
    return this.state.products.map((product) => {
      return (
        <div 
          className="col s6 m6 l3"
          key={product.id}
        >
          <ProductSmallCard {...product} />
        </div>
        )
    })
  }

  render() {

    const { categoryName } = this.props.location.state || '';

    if (!this.state.products) return <div>loading</div>
    return (
      <Layout>
        <h2 className="current-category-name">
          {categoryName || ''}
        </h2>
        <div className="row">
          {this.displayProducts()}
        </div>
      </Layout>
    );
  }
}



