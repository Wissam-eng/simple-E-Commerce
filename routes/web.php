<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// المنتجات (للجميع)
Route::get('/', [ProductController::class, 'index'])->name('products.index');

// السلة (للجميع)
Route::get('/cart', [CartController::class, 'index'])->name('cart.index');
Route::post('/cart/add', [CartController::class, 'store'])->name('cart.store');

// لوحة التحكم (للأدمن فقط)
Route::middleware(['auth', 'admin'])->group(function () {
    Route::get('/admin/products', [ProductController::class, 'adminIndex'])->name('admin.products');
    Route::get('/admin/products/create', [ProductController::class, 'create'])->name('admin.products.create');
    Route::post('/admin/products', [ProductController::class, 'store'])->name('admin.products.store');
});

require __DIR__ . '/auth.php';



Route::middleware(['auth', 'admin'])->group(function () {
    // مسار حذف المنتج
    Route::delete('/admin/products/{product}', [ProductController::class, 'destroy'])->name('admin.products.destroy');
});


Route::get('/dashboard', [ProductController::class, 'adminIndex'])->name('admin.products');

Route::delete('/cart/{id}/delete', [CartController::class, 'destroy'])->name('cart.destroy');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
