<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMenuRequest;
use App\Http\Resources\MenuResource;
use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MenuController extends Controller
{
    public function index() {
    $menu = Menu::with('categories')->get();
        return MenuResource::collection($menu);
    }

    public function store(StoreMenuRequest $request) {
        $image = $request->file('image')->store('public/menus');
            $menu =   Menu::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'image' => $image,
            ]);

            if($request->has('category')) {
                $menu->categories()->attach(explode(",", $request->category));
            }
            return new MenuResource($menu);
    }
    // explode(",", $request->users);

    public function show(Menu $menu) {
        return new MenuResource($menu);
    }
     public function update(Request $request, Menu $menu ) {
        $request->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'image' => 'nullable'
        ]);
         $image = $menu->image;
        if($request->hasFile('image')) {
            Storage::delete($menu->image);
            $image = $request->file('image')->store('public/menu');
        }
        $menu->update([
            'name' => $request->name,
            'price' => $request->price,
            'description' => $request->description,
            'image' => $image
        ]);
        if($request->has('category')) {
            $menu->categories()->sync(explode(",", $request->category));
        }
        return new MenuResource($menu);
    }
    public function destroy(Menu $menu) {
        Storage::delete($menu->image);
        $menu->delete();
        return response()->noContent();
    }
}
