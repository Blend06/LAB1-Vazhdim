<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfesoriResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'Emri' => $this->Emri,
            'Mbiemri' => $this->Mbiemri,
            'email' => $this->email,
            'password' => $this->password,
            'Roli'=> $this->Roli,
            'Viti' => $this->Viti,
            'Specializimi' => $this->Specializimi,
            'Mesatarja' => $this->Mesatarja,
            'created_at' => $this->created_at->format('Y-m-d H:i:s')
        ];
    }
}
