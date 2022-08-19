<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'guest', 'status_id'];

    public function status() {
        return $this->belongsTo(Status::class);
    }

    public function reservation() {
        return $this->belongsTo(Reservation::class);
    }
}
