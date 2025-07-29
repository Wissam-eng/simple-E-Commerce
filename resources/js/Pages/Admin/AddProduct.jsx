import React from 'react';
import { useForm } from '@inertiajs/react';

import AppLayout from '@/Layouts/AppLayout';

export default function AddProduct() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        price: '',
        image: null,  // تغير نوع الصورة لملف
    });

    const onFileChange = (e) => {
        setData('image', e.target.files[0]);
    };

    const submit = (e) => {
        e.preventDefault();

        // ارسال FormData لرفع الملف
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price);
        if (data.image) {
            formData.append('image', data.image);
        }

        post('/admin/products', {
            data: formData,
            forceFormData: true,  // هذا يخبر inertia باستخدام FormData
        });
    };

    return (
        <AppLayout>
            <div className="container mt-5">
                <h2>Add Product</h2>
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <div className="text-danger">{errors.name}</div>}
                    </div>

                    <div className="mb-3">
                        <label>Price</label>
                        <input
                            type="number"
                            className="form-control"
                            value={data.price}
                            onChange={e => setData('price', e.target.value)}
                        />
                        {errors.price && <div className="text-danger">{errors.price}</div>}
                    </div>

                    <div className="mb-3">
                        <label>Image</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={onFileChange}
                        />
                        {errors.image && <div className="text-danger">{errors.image}</div>}
                    </div>

                    <button type="submit" className="btn btn-success" disabled={processing}>Save</button>
                </form>
            </div>
        </AppLayout>
    );
}
