import React from 'react';
import './menuPage.css';
import { useState, useEffect } from 'react';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import pizza from '../../assets/menu-buttons/pizza.png';
import burger from '../../assets/menu-buttons/burger.png';
import shake from '../../assets/menu-buttons/shake.png';
import all from '../../assets/menu-buttons/all.png';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { setProducts } from '../../store/slice/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from './pagination/Pagination';
import { map } from '@firebase/util';
import { addToCart, clearCart } from '../../store/slice/CartSlice';

import { Toast } from 'react-bootstrap';



const MenuPage = () => {

  const buttons = [
    {
      id: 0,
      title: 'pizza',
      filterName: 'pizza',
      image: pizza,

    },
    {
      id: 1,
      title: 'burgers',
      filterName: 'burger',
      image: burger,

    },
    {
      id: 2,
      title: 'shake',
      filterName: 'shake',
      image: shake,

    },
    {
      id: 3,
      title: 'all',
      filterName: ' ',
      image: all,
    
    },
  ]

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(6);
  const [filter, setFilter] = useState(' ');
  const [nameFilter, setNameFilter] = useState(' ');
  const [show, setShow] = useState(false);


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  
  const [productsArray, setProductsArray] = useState();

  const userCollectionRef = collection(db, 'products');

  const selectProducts = useSelector(state => state.products.products);
  const cart = useSelector(state => state.cart)

  const dispatch = useDispatch();

  const submitInput = (e) => {
    e.preventDefault();
    setNameFilter(e.target.value);
  }

  useEffect(() => {

    const getProducts = async () => {
      const data = await getDocs(userCollectionRef)

      dispatch(setProducts({
        products: data._snapshot.docChanges
      }));

      console.log(selectProducts);
    };

    getProducts();

  }, []);

  const currentPosts = selectProducts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className='right-side menu-page'>
      
        <div className="toast-container">
          <Toast onClose={() => setShow(false)} show={show} delay={1500} autohide>
              <span>
                added to cart
              </span>
          </Toast>

        </div>

        <div className='header'>

            <h1 className='fs-1'>Menu</h1>

            <form className="input-container">
                
                <SearchOutlinedIcon />

                <input placeholder='search product' onChange={submitInput} type="text"/>

            </form>
        </div>

        <div className="filter-buttons">
          {buttons.map((button) => (
            <button onClick={() => {setFilter(button.filterName); console.log(filter)}} key={button.id} className={`filter-button fs-4 button-${button.title}`}>
              {button.title}
              <img className={`image ${button.title}-image`} src={button.image} alt={button.image} width='50px' />
            </button>
          ))}
        </div>

        <div className='product-grid'>

        <div className='grid'>
              {currentPosts.filter(item => item.doc.data.value.mapValue.fields.category.stringValue.includes(filter) && item.doc.data.value.mapValue.fields.name.stringValue.includes(nameFilter)).map((filtered) => (
                <div className='item'>

                  <img  src={filtered.doc.data.value.mapValue.fields.image.stringValue} alt="alt" />

                  <h3 className='fs-4' >
                    {filtered.doc.data.value.mapValue.fields.name.stringValue}

                  </h3>

                  <p>
                    Lorem ipsum dolor sit amet consectetur.
                  </p>

                  <div className='price-and-cart-button'>
                    <span className='price fs-2'>${filtered.doc.data.value.mapValue.fields.price.integerValue}{filtered.doc.data.value.mapValue.fields.price.doubleValue}</span>
                    <button onClick={() => {dispatch(addToCart({ cartProducts: filtered })); setShow(true)}} >add to cart</button>
                  </div>

                </div>

              ))}
            </div>

          {/*
            <div className='grid'>
              {currentPosts.map((item) => (
                <div className='item'>

                  <img  src={item.doc.data.value.mapValue.fields.image.stringValue} alt="alt" />

                  <h3 className='fs-4' >
                    {item.doc.data.value.mapValue.fields.name.stringValue}

                  </h3>

                  <p>
                    Lorem ipsum dolor sit amet consectetur.
                  </p>

                  <div className='price-and-cart-button'>
                    <span className='price fs-2'>${item.doc.data.value.mapValue.fields.price.integerValue}{item.doc.data.value.mapValue.fields.price.doubleValue}</span>
                    <button>add to cart</button>
                  </div>
                </div>
              ))}
            </div>
          */}

            <Pagination
            postsPerPage={postsPerPage}
            totalPosts={currentPosts.length}
            paginate={paginate} />

        </div>
    </div>
  )
}

export default MenuPage