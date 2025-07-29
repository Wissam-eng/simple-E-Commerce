import React from 'react';
import { Link, useForm, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function ProductList({ products }) {
    const { processing } = useForm();

    const addToCart = (id) => {
        router.post('/cart/add', { product_id: id });
    };

    return (
        <AppLayout>
            <h2>Products</h2>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-3 mb-4">
                        <div className="card">
                            {product.image && (
                                <img
                                    src={`/storage/${product.image}`}
                                    className="card-img-top"
                                    alt={product.name}
                                />
                            )}
                            <div className="card-body">
                                <h5>{product.name}</h5>
                                <p>${product.price}</p>
                                <button
                                    onClick={() => addToCart(product.id)}
                                    className="btn btn-primary btn-sm"
                                    disabled={processing}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <Link href="/cart" className="btn btn-success mt-3">Go to Cart</Link>
        </AppLayout>
    );
}
