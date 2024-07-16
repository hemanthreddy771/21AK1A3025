import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import Pagination from '../components/Pagination';
import { Grid, Typography } from '@mui/material';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const data = await getProducts(filters.company, filters.category, 10, filters.minPrice, filters.maxPrice);
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, [filters, page]);

  return (
    <div>
      <Typography variant="h4" gutterBottom>Product List</Typography>
      <ProductFilter filters={filters} setFilters={setFilters} fetchProducts={fetchProducts} />
      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
      <Pagination page={page} count={10} onChange={(e, value) => setPage(value)} />
    </div>
  );
};

export default AllProducts;
