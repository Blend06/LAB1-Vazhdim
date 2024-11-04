<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Ligjerata;
use App\Http\Requests\StoreLigjerataRequest;
use App\Http\Requests\UpdateLigjerataRequest;
use App\Http\Resources\LigjerataResource;


class LigjerataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ligjerata = Ligjerata::all();
        return LigjerataResource::collection($ligjerata);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreLigjerataRequest $request)
    {
        $data = $request->validated();
        $ligjerata = Ligjerata::create($data);
        return response(new LigjerataResource($ligjerata), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Ligjerata $ligjerata)
    {
        return new LigjerataResource($ligjerata);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateLigjerataRequest $request, Ligjerata $ligjerata)
    {
        $ligjerata->update([
            'path' => $request->path,
            'Emri' => $request->Emri,
            'Lenda' => $request->Lenda,
        ]);
    
        return new LigjerataResource($ligjerata);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $ligjerata = Ligjerata::find($id);
    
    if (!$ligjerata) {
        return response()->json(['message' => 'Ligjerata not found'], 404);
    }

    $ligjerata->delete();
    return response("", 204);
}


    public function getLigjeratabyLenda($lenda) {
      
        $ligjerata  = Ligjerata::where('Lenda', $lenda)->get();
        return LigjerataResource::collection($ligjerata);
     }
}
