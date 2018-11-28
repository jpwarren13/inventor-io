/**
 *
 * ShoppingCart
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  Button,
  Table,
  Container,
  Header,
  Divider,
  Segment,
  Input,
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import NavBar from 'containers/NavBar/Loadable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectOrderList } from './selectors';
import { deleteItem, placeOrder, handleInput, mountOrder } from './actions';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class ShoppingCart extends React.Component {
  componentDidMount() {
    if (!this.props.orderList || !this.props.orderList.length) {
      this.props.mountOrderList();
    }
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>ShoppingCart</title>
          <meta name="description" content="Description of ShoppingCart" />
        </Helmet>
        <NavBar />

        <Container>
          <Header as="h1">Shopping Cart</Header>
          <Table>
            <Table.Header>
              <Table.Row>
                {['ndbno', 'Item', 'Quantity', 'Orders', 'Price', 'Delete'].map(
                  key => (
                    <Table.HeaderCell>{key}</Table.HeaderCell>
                  ),
                )}
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.props.orderList ? (
                this.props.orderList.map((obj, i) => (
                  <Table.Row>
                    {[
                      'ndbno',
                      'Item',
                      'Quantity',
                      'Orders',
                      'Price',
                      'Delete',
                    ].map(key => {
                      if (key === 'Orders') {
                        return (
                          <Table.Cell>
                            <Input
                              defaultValue={obj.Orders}
                              onChange={this.props.handleChange}
                            />
                          </Table.Cell>
                        );
                      }
                      if (key === 'Delete') {
                        return (
                          <Table.Cell>
                            <Button
                              value={i}
                              icon="trash alternate outline"
                              onClick={this.props.handleDelete}
                            />
                          </Table.Cell>
                        );
                      }

                      return <Table.Cell>{obj[key]}</Table.Cell>;
                    })}
                  </Table.Row>
                ))
              ) : (
                <Table.Row />
              )}
            </Table.Body>
          </Table>

          <Divider />
          <Segment textAlign="right" size="huge">
            Total:
            {' $'}
            {/* eslint-disable */}
            {this.props.orderList
              ? this.props.orderList.reduce(
                  (prev, curr) => prev + curr.Price,
                  0,
                )
              : '0'}
            {/* eslint-enable */}
          </Segment>
          <Button floated="right" onClick={this.props.handleCheckOut}>
            Checkout
          </Button>
        </Container>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  // functions
  handleDelete: PropTypes.func,
  handleCheckOut: PropTypes.func,
  handleChange: PropTypes.func,
  mountOrderList: PropTypes.func,
  // states
  orderList: PropTypes.any,
};

const mapStateToProps = createStructuredSelector({
  orderList: makeSelectOrderList(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleDelete: e => {
      e.preventDefault();
      return dispatch(deleteItem(e.currentTarget.value));
    },
    handleCheckOut: e => {
      e.preventDefault();
      return dispatch(placeOrder());
    },
    handleChange: e => {
      e.preventDefault();
      return dispatch(handleInput());
    },
    mountOrderList: () => dispatch(mountOrder()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'shoppingCart', reducer });
const withSaga = injectSaga({ key: 'shoppingCart', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ShoppingCart);
