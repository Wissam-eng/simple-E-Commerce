import React from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Swal from 'sweetalert2';

export default function Cart({ cartItems }) {

    const deleteItem = (id) => {
        Swal.fire({
            title: 'هل أنت متأكد؟',
            text: "لن تتمكن من التراجع عن هذا!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'نعم، احذفه!',
            cancelButtonText: 'إلغاء'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(`/cart/${id}/delete`);
                Swal.fire(
                    'تم الحذف!',
                    'تم حذف المنتج من السلة.',
                    'success'
                )
            }
        })
    };

    return (
        <AppLayout>
            <div className="container mt-5">
                <h2>Cart</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Image</th> {/* عمود الصورة */}
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map(item => (
                            <tr key={item.id}>
                                <td>{item.product?.name}</td>
                                <td>
                                    {item.product?.image ? (
                                        <img
                                            src={`/storage/${item.product.image}`}
                                            alt={item.product.name}
                                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        'No image'
                                    )}
                                </td>
                                <td>{item.quantity}</td>
                                <td>${item.product?.price}</td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => deleteItem(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AppLayout>
    );
}
