<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotaResource;
use App\Models\Nota;
use App\Http\Requests\StoreNotaRequest;
use App\Http\Requests\UpdateNotaRequest;
use Illuminate\Http\Request;


class NotaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $nota = Nota::all();
        return NotaResource::collection($nota);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreNotaRequest $request)
    {
        $data = $request->validated();
        $nota = Nota::create($data);
        return response(new NotaResource($nota), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
{
    \Log::info('ID received:', ['id' => $id]);
    $nota = Nota::find($id);

    if (!$nota) {
        return response()->json(['message' => 'Nota not found'], 404);
    }

    return new NotaResource($nota);
}


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateNotaRequest $request, Nota $nota)
    {
        $nota->update([
            'user_id'=> $request->user_id,
            'Lenda'=>$request->Lenda,
            'Nota'=> $request->Nota
        ]);
    
        return new NotaResource($nota);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
{
    $nota = Nota::find($id);
    if ($nota) {
        $nota->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
    return response()->json(['message' => 'Nota not found'], 404);
}

    public function getNotaByUser($user_id){
        $nota  = Nota::where('user_id', $user_id)->get();   
        return  NotaResource::collection($nota);
    }

    public function getAverageNotaByUser($user_id)
{
    $nota = Nota::where('user_id', $user_id)->pluck('Nota');

    if ($nota->isEmpty()) {
        return response()->json([
            'user_id' => $user_id,
            'average_nota' => 0 
        ]);
    }

    $average = $nota->average();

    return response()->json([
        'user_id' => $user_id,
        'average_nota' => round($average, 2) // Rounded to 2 decimal places
    ]);
}

public function getNotaByLenda($lenda)
{
    $notas = Nota::where('Lenda', $lenda)->get(); // Fetch full objects
    return NotaResource::collection($notas);
}
}