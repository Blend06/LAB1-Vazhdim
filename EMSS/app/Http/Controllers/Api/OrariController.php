<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrariResource;
use App\Models\Orari;
use App\Http\Requests\StoreOrariRequest;
use App\Http\Requests\UpdateOrariRequest;
use Illuminate\Http\Request;


class OrariController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orari = Orari::all();
        return OrariResource::collection($orari);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreOrariRequest $request)
    {
        $data = $request->validated();
        $orari = Orari::create($data);
        return response(new OrariResource($orari), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Orari $orari)
    {
        return new OrariResource($orari);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrariRequest $request, Orari $orari)
    {
        $orari->update([
            'ora' => $request->ora,
            'dita'=> $request->dita,
            'lenda'=>$request->lenda,
            'viti' => $request->viti,
        ]);
    
        return new OrariResource($orari);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Orari $orari)
    {
        $orari->delete();

        return response("", 204);
    }

    public function getOrariByViti($viti) {
      
       $orari  = Orari::where('viti', $viti)->get();
       return new OrariResource($orari);
    }
}
