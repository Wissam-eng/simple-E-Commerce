import React from "react";
import { Link, usePage } from "@inertiajs/react";

export default function AppLayout({ children }) {
    const { auth } = usePage().props;




    const isAdmin = auth?.user?.role === 'admin';  // عدل حسب دور المستخدم الفعلي
    console.log(auth.user);

    console.log(isAdmin);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <Link className="navbar-brand" href="/">E-Commerce</Link>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse show" id="navbarNav">
                    {/* <div className="collapse navbar-collapse" id="navbarNav"> */}


                        <ul className="navbar-nav ms-auto">
                            {/* روابط عامة للجميع */}

                            <li className="nav-item">
                                <Link className="nav-link" href="/">Products</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" href="/cart">Cart</Link>
                            </li>

                            {/* روابط خاصة بالأدمن فقط */}
                            {isAdmin && (
                                <li className="nav-item">
                                    <Link className="nav-link" href="/admin/products"> Product list</Link>
                                </li>
                            )}


                            {isAdmin && (
                                <li className="nav-item">
                                    <Link className="nav-link" href="/admin/products/create">Add Product</Link>
                                </li>
                            )}

                            {/* خيارات تسجيل الدخول والخروج */}
                            {auth?.user ? (
                                <li className="nav-item">
                                    <Link
                                        className="nav-link"
                                        method="post"
                                        href={route('logout')}
                                        as="button"
                                    >
                                        Logout
                                    </Link>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <Link className="nav-link" href={route('login')}>Login</Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="container mt-4">
                {children}
            </main>
        </>
    );
}
