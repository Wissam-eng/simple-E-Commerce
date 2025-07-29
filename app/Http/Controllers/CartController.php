<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CartController extends Controller
{
    // عرض السلة
    public function index(Request $request)
    {
        $sessionId = $request->session()->getId();
        $query = Cart::with('product');

        if (Auth::check()) {
            $query->where('user_id', Auth::id());
        } else {
            $query->where('session_id', $sessionId);
        }

        $cartItems = $query->get();

        return Inertia::render('Shop/Cart', [
            'cartItems' => $cartItems
        ]);
    }

    // إضافة منتج للسلة
    public function store(Request $request)
    {

        // dd($request->all());

        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $sessionId = $request->session()->getId();
        $cartData = [
            'product_id' => $request->product_id,
        ];

        if (Auth::check()) {
            $cartData['user_id'] = Auth::id();
        } else {
            $cartData['session_id'] = $sessionId;
        }

        $cart = Cart::firstOrNew($cartData);
        $cart->quantity += 1;
        $cart->save();

        return back()->with('success', 'Product added to cart!');
    }

    public function destroy($id)
    {
        // ابحث عن عنصر السلة حسب $id وحذفه
        $cartItem = Cart::findOrFail($id);
        $cartItem->delete();

        // إعادة التوجيه مع رسالة نجاح (أو رد JSON إذا أردت)
        return redirect()->back()->with('success', 'Item removed from cart.');
    }
}
