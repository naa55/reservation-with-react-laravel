<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReservationRequest;
use App\Http\Resources\ReservationResource;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    //
    public function index() {
        $reservation = Reservation::all();
        return ReservationResource::collection($reservation);
    }
    public function show(Reservation $reservation) {
        return new ReservationResource($reservation);
    }
    public function store(ReservationRequest $request) {
        $reservations = Reservation::create($request->validated());
        return new ReservationResource($reservations);
    }

    public function update(ReservationRequest $request, Reservation $reservation) {
        $reservation->update($request->validated());
        return new ReservationResource($reservation);
    }
}
