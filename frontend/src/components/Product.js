import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import '../styles/product.css';
import { renderPrice } from '../utils';

const Product = ({ product }) => {
	// console.log("Product", product);
	return (
		<Card className='mt-3 p-0'>
			<Link to={`/product/${product._id}`}>
				<Card.Img
					loading='lazy'
					className='product-image'
					src={product.image}
					variant='top'
					alt={product.name}
				/>
			</Link>

			<Card.Body>
				<Link
					to={`/product/${product._id}`}
					style={{ color: 'dimgray', textDecoration: 'none' }}>
					<Card.Title className='product-title' as='p'>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<Rating
						value={product.rating}
						text={`${product.numReviews} Review${product.numReviews > 1 ? 's' : ''
							}`}
					/>
				</Card.Text>

				<Card.Text as='h4'>
					{product.price &&
						renderPrice(product.price)
					}
				</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
