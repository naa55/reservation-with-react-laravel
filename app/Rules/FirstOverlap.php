<?php

namespace App\Rules;

use App\Models\Reservation;
use Illuminate\Contracts\Validation\Rule;

class FirstOverlap implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        // return Reservation::where('res_date', '=', $value)->where('guest_number', '=', $value)->count() == 0;
        return Reservation::where('res_date', '=', $value)->where('guest_number', '=', $value)->count() == 1;
        // return Reservation::orderBy('res_date')->get()->filter(function($val) use ($value) {
        //     return $val->res_date == $value;
        // });
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'This seat on this date has been taken try another seat from 1-4';
    }
}
