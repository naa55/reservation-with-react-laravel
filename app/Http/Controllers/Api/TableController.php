<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTableRequest;
use App\Http\Resources\StatusResource;
use App\Http\Resources\TableResource;
use App\Models\Table;
use Illuminate\Http\Request;

class TableController extends Controller
{
    //
    public function index() {
        $table = Table::with("status")->get();
        return  TableResource::collection($table);

    }

    public function store(StoreTableRequest $request) {
        $table = Table::create($request->validated());
        return new TableResource($table);
    }

    public function show(Table $table) {
        return new TableResource($table);
    }
    public function update(StoreTableRequest $request, Table $table) {
        $table->update($request->validated());
        return new TableResource($table);
    }
}
