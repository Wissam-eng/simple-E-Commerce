import React from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Swal from 'sweetalert2';

export default function ProductList({ products }) {

    // دالة حذف المنتج مع تأكيد بواسطة SweetAlert
    const handleDelete = (id) => {
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
                router.delete(`/admin/products/${id}`, {
                    onSuccess: () => {
                        Swal.fire(
                            'تم الحذف!',
                            'تم حذف المنتج بنجاح.',
                            'success'
                        );
                    }
                });
            }
        });
    };

    return (
        <AppLayout>
            <div className="container mt-5">
                <h2>Admin - Products</h2>
                <Link href="/admin/products/create" className="btn btn-primary mb-3">Add Product</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>
                                    {product.image ? (
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt={product.name}
                                            style={{ width: '80px', height: 'auto' }}
                                        />
                                    ) : (
                                        'No Image'
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(product.id)}
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
