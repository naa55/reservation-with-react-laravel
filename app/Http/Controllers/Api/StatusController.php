<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStatusRequest;
use App\Http\Resources\StatusResource;
use App\Models\Status;

class StatusController extends Controller
{
    //
    public function index()  {
        $status = Status::all();
        return StatusResource::collection($status);
    }

    public function store(StoreStatusRequest $request) {
        $status = Status::create($request->validated());
        return new StatusResource($status);
    }

    public function show(Status $status) {
        return new StatusResource($status);
    }

    public function update(StoreStatusRequest $request, Status $status) {
        $status->update($request->validated());
        return new StatusResource($status);
    }

    public function destroy(Status $status) {
        $status->delete();
        return response()->noContent();
    }
}
