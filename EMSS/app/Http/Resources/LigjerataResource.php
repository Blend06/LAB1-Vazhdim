<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LigjerataResource extends JsonResource
{
    public static $wrap = false;

    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
                    'id' => $this->id,
                    'path' => $this->path,
                    'Lenda' => $this->Lenda,
                    'Emri' => $this->Emri,
                    'created_at' => $this->created_at->format('Y-m-d H:i:s')
                ];
    }
}