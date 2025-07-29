<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Facades\Storage;


class ProductController extends Controller
{
    // عرض المنتجات (للأدمن والمستخدمين)
    public function index()
    {
        $products = Product::all();
        return Inertia::render('Shop/ProductList', [
            'products' => $products
        ]);
    }

    // عرض صفحة إنشاء منتج (للأدمن فقط)
    public function create()
    {
        return Inertia::render('Admin/AddProduct');
    }

    // حفظ منتج جديد
    public function store(Request $request)
    {
        $request->validate([
            'name'  => 'required|string|max:255',
            'price' => 'required|numeric',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // تحقق من نوع الصورة وحجمها
        ]);

        $data = $request->only('name', 'price');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public'); // يخزن الصورة في storage/app/public/products
            $data['image'] = $path;
        }

        Product::create($data);

        return redirect()->route('products.index')->with('success', 'Product created!');
    }


    // عرض المنتجات في لوحة التحكم
    public function adminIndex()
    {

        $products = Product::all();
        return Inertia::render('Admin/ProductList', [
            'products' => $products
        ]);
    }

    public function destroy(Product $product)
    {
        // إذا الصورة مخزنة داخل storage، يمكن حذفها هنا أيضاً
        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('admin.products')->with('success', 'Product deleted successfully.');
    }
}
