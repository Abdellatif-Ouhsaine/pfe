<?php


namespace App\Http\Controllers;
use App\Models\Menu;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class MenusController extends Controller
{
    public function index($userId)
    {
        $restaurant = Restaurant::where('user_id', $userId)->first();
    
        if (!$restaurant) {
            return response()->json(['message' => 'Restaurant non trouvé pour cet utilisateur'], 404);
        }
    
        $menus = $restaurant->menuItems; // récupère les menus liés au restaurant
    
        return response()->json($menus);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'category' => 'required|string',
            'discount' => 'nullable|integer',
            'image' => 'nullable|image|max:2048',
            'restaurant_id' => 'required|exists:restaurants,id',
            'type' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('menu_images', 'public');
        }

        return Menu::create($data);
    }

    public function show($id)
    {
        return Menu::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $menu = Menu::findOrFail($id);

        $data = $request->validate([
            'name' => 'string',
            'description' => 'nullable|string',
            'price' => 'numeric',
            'category' => 'string',
            'discount' => 'nullable|integer',
            'image' => 'nullable|image|max:2048',
            'type' => 'nullable|string|max:255',
        ]);

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('menu_images', 'public');
        }

        $menu->update($data);

        return $menu;
    }

    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);
        $menu->delete();

        return response()->json(['message' => 'Plat supprimé avec succès']);
    }
}
