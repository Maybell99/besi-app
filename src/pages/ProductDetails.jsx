import { useParams } from 'react-router-dom';
import products from '../data/products';

function ProductDetails() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      {/* Add more product details as needed */}
    </div>
  );
}

export default ProductDetails; 