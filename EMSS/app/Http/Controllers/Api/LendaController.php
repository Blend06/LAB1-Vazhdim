<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lenda;
use App\Http\Requests\StoreLendaRequest;
use App\Http\Requests\UpdateLendaRequest;
use App\Http\Resources\LendaResource;

class LendaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $lenda = Lenda::all();
        return LendaResource::collection($lenda);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLendaRequest $request)
    {
        $data = $request->validated();
        $lenda = Lenda::create($data);
        return response(new LendaResource($lenda), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Lenda $lenda)
    {
        return new LendaResource($lenda);    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLendaRequest $request, Lenda $lenda)
    {
        $lenda->update([
            'emri' => $request->emri,
            'viti' => $request->viti,
        ]);
    
        return new LendaResource($lenda);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Lenda $lenda)
    {
        $lenda->delete();

        return response("", 204);
    }

    public function getLendaByViti($viti) {
      
        $lenda  = Lenda::where('viti', $viti)->get();
        return LendaResource::collection($lenda);
     }
}
