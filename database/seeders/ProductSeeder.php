<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            ['name' => 'Laptop', 'price' => 1500, 'image' => 'laptop.jpg'],
            ['name' => 'Phone', 'price' => 800, 'image' => 'phone.jpg'],
            ['name' => 'Headphones', 'price' => 150, 'image' => 'headphones.jpg'],
            ['name' => 'Keyboard', 'price' => 100, 'image' => 'keyboard.jpg'],
            ['name' => 'Mouse', 'price' => 50, 'image' => 'mouse.jpg'],
        ];

        foreach ($products as $product) {
            Product::updateOrCreate(['name' => $product['name']], $product);
        }
    }
}
