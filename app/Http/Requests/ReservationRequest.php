<?php

namespace App\Http\Requests;

use App\Rules\FirstOverlap;
use Illuminate\Foundation\Http\FormRequest;

class ReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'first_name' =>'required',
            'last_name' => 'required',
            'email' => 'required',
            'tel_number' => 'required',
            'res_date' => 'required',
            // 'res_date' => 'required',
            'table_id' => 'required',
            'guest_number' => 'required'

        ];
    }
    public function attributes() {
        return [
            'table_id' => 'table',
            'tel_number' => 'phone number',
            'res_date' => 'reservation date',
            'guest_number' => 'number of guests'
        ];
    }
}
