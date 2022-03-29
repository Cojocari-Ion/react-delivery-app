import React, { useEffect } from 'react';
import './Cart.css'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addToCart, clearCart, removeFromCart } from '../../store/slice/CartSlice';
import { Container, Row, Col } from 'react-bootstrap';
import Card from '../../assets/cart/card.png';
import Apple from '../../assets/cart/apple.png';
import Paypal from '../../assets/cart/paypal.png';



const Cart = () => {

  const paymentMethods = [
    
    {
      id: 1,
      title: 'Card or debit card',
      image: Card
    }

    //{
    //  id: 2,
    //  title: 'Apple pay',
    //  image: Apple
    //},
    //
    //{
    //  id: 3,
    //  title: 'Paypal',
    //  image: Paypal
    //}
  ]

  const [total, setTotal] = useState();

  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);

  useEffect(() => { 

    const getPrices = () => {
      cart.cartProducts.map((item) => {
        console.log(item)
      })
    }

    getPrices();

  }, [cart])


  
  return (
    <div className='right-side cart-page'>
      <Container >
        <Row className="justify-content-md-center">
          <Col className='sides left' lg="7">
              <h1 className='fs-1'>
                  Cart
              </h1>
            
              <span className='fs-3' >All items:</span>
                {cart.cartProducts.map((item) => (
                <article className={item.cartProducts.doc.data.value.mapValue.fields.name.stringValue}>
                  <div className='image-container'>
                    <img width='140px' src={item.cartProducts.doc.data.value.mapValue.fields.image.stringValue} alt={item.cartProducts.doc.data.value.mapValue.fields.name.stringValue} />

                  </div>

                  <div className='info'>
                    
                    <div className="top">
                      <h3 className='fs-4'>
                        {item.cartProducts.doc.data.value.mapValue.fields.name.stringValue}
                      </h3>

                      <button onClick={() => {dispatch(removeFromCart({ cartItemName:  item.cartProducts.doc.data.value.mapValue.fields.name.stringValue }))}} >
                        remove from cart
                      </button>
                    </div>

                    <div className="bottom">
                      <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      </p>

                      <span className='fs-2 price'>
                      ${item.cartProducts.doc.data.value.mapValue.fields.price.integerValue}{item.cartProducts.doc.data.value.mapValue.fields.price.doubleValue}
                      </span>

                    </div>

                  </div>
                </article>
              ))}

              <br />
              {cart.cartProducts.length > 0 ? (
              <button className='fs-3 clear-cart' onClick={() => {dispatch(clearCart())}} >
                Clear cart
              </button>) : (
                <span className='fs-1 no-items'>
                    There are no any items :(
                </span>
              )}
            
          </Col>

          <Col className='sides right' lg='5'>
                <div className="payment-container">
                  <div className="payment-header">
                    <span className='fs-2'>Your order:</span>

                    <div className="subtotal">
                      <span className='fs-5'>Subtotal:</span>
                      <span className='fs-5'>${total}</span>
                    </div>
                    
                    <div className="delivery">
                      <span className='fs-5'>Delivery:</span>
                      <span className='fs-5'>$8.20</span>
                    </div>

                  </div>                 

                  <div className="payment">
                    <div className="total">
                      <span className='fs-2'>Total:</span>
                      <span className='fs-2'>$68.50</span>

                    </div>
                    <div className="payment-method">
                      <span className='fs-2'>Payment:</span>

                      <div className="method-list">

                        {paymentMethods.map((method) => (
                          <div className='method'>

                            <div className="left-side">
                              <input type="checkbox" />
                              <span className='fs-5'>{method.title}</span>
                            </div>

                            <img height='30px' src={method.image} alt={method.name} />

                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                  
                  <form>
                    <div className="form-top">

                      <label className='fs-5' htmlFor="adress">Your adress:</label>
                      <br />
                      <input type="text" id="adress" name="adress"/> 
                      <br />

                      <label className='fs-5' htmlFor="card-number">Card number:</label>
                      <br />
                      <input type="text" id="adress" name="adress" placeholder='xxxx-xxxx-xxxx-xxxx'/> 
                      
                    </div>

                    <div className='card-bot'>
                      <div className="expiration">
                        <label className='fs-5' htmlFor="date">Expiration date:</label>
                        <br />
                        <input placeholder='xx/xx' type="text" id="date" name="date"/> 
                        <br />

                      </div>

                      <div className="code">

                        <label className='fs-5' htmlFor="code">CVV code:</label>
                        <br />
                        <input type="text" id="adress" name="adress"/> 
                        <br />
                      </div>
                      
                    </div>

                    <button className='fs-1 submit-button' type='submit'>order</button>

                  </form>

                </div>
          </Col>
          
        </Row>
      </Container>

      

    </div>
  )
}

export default Cart