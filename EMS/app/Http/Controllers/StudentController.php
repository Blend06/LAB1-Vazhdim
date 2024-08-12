<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::all();
        return response()->json($students);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'Emri' => 'required|string|max:255',
            'Mbiemri' => 'required|string|max:255',
            'Email' => 'required|email|unique:table_student,email',
            'password' => 'required|string|min:8',
            'Roli' => 'required|string|max:255',
            'Viti' => 'nullable|integer',
        'Mesatarja' => 'nullable|numeric',
        ]);

        $student = Student::create($validatedData);
        return response()->json($student, 201);
    }

    public function show($id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }
        return response()->json($student);
    }

    public function update(Request $request, $id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $validatedData = $request->validate([
            'Eame' => 'sometimes|string|max:255',
            'Mbiemri' => 'sometimes|string|max:255',
            'Email' => 'sometimes|email|unique:table_student,email,' . $id,
            'password' => 'sometimes|string|min:8',
            'Roli' => 'sometimes|string|max:255',
            'Viti' => 'nullable|integer',
        'Mesatarja' => 'nullable|numeric',
        ]);

        $student->update($validatedData);
        return response()->json($student);
    }

    public function destroy($id)
    {
        $student = Student::find($id);
        if (!$student) {
            return response()->json(['message' => 'Student not found'], 404);
        }

        $student->delete();
        return response()->json(['message' => 'Student deleted']);
    }
}
