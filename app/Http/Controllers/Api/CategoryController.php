<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index(Request $request) {
        $orderColumn = $request->input('order_column', 'id');
        $orderDirection = $request->input('order_direction', 'desc');
        if(!in_array($orderColumn, ['id'])) {
            $orderColumn = 'id';
        }
        if(!in_array($orderDirection, ['asc', 'desc'])) {
            $orderDirection = 'desc';
        }

        $filterable = ['id', 'name', 'description'];
        $filterableValues = array_filter($request->only($filterable));


        $category = Category::when(count($filterableValues), function($query) use ($filterableValues) {
            foreach($filterableValues as $column => $value) {
                $query->where($column, 'like', '%' . $value . '%');
            }
        })->when($request->filled('global'), function($query) use ($filterable, $request) {
            foreach($filterable as $column) {
                if($column == $filterable[0]) {
                    $query->where($column, 'like', '%' . $request->global . '%');
                } else {
                    $query->orWhere($column, 'like', '%' . $request->global . '%');
                }
            }
        })->
        orderBy($orderColumn, $orderDirection)->paginate(4);
        return CategoryResource::collection($category);
       // return CategoryResource::collection(Category::paginate(2));
    }

    public function store(StoreCategoryRequest $request) {
        if($request->hasFile('thumbnail')) {
            $filename =  $request->file('thumbnail')->store('/public/category');

        $post = Category::create([
            'name' =>  $request->name,
            'description' => $request->description,
            'thumbnail' => $filename
        ]);
        }
        return new CategoryResource($post);
    }
    public function show(Category $category) {
        return new CategoryResource($category);
    }
    public function update(Request $request, Category $category ) {

        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'thumbnail' => 'nullable'
        ]);
        $image = $category->thumbnail;
        if($request->hasFile('thumbnail')) {
            Storage::delete($category->thumbnail);
            $image = $request->file('thumbnail')->store('public/category');
        }
        $category->update([
            'name' => $request->name,
            'description' => $request->description,
            'thumbnail' => $image
        ]);
        return new CategoryResource($category);
    }
    // public function update(StoreCategoryRequest $request, Category $category) {
    //     if(!empty($request->files) && $request->hasFile('thumbnail')) {
    //         Storage::delete('/public/'. $category->thumbnail);
    //         $filename =  $request->file('thumbnail')->store('/public/category');
    //     }
    //     $post = $category->update([
    //             'name' =>  $request->name,
    //             'description' => $request->description,
    //             'thumbnail' => substr($filename, 7)
    //         ]);
    //     return new CategoryResource($post);
    // }

    public function destroy(Category $category) {
            Storage::delete($category->thumbnail);
            $category->delete();
            return response()->noContent();
    }
}
