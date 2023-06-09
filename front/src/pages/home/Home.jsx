import React from 'react'
import Categories from '../../components/category/Categories.container'
import Products from '../../components/products/Products.container'
import Search from '../../components/search'


const Home = () => {
  return (
    <>
      <Search />
      <Categories />
      <Products />
    </>
  )
}

export default Home