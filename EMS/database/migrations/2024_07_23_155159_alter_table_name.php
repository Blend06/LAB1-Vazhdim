<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('table_student', function (Blueprint $table) {
            //
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('table_student', function (Blueprint $table) {
            $table->id();
            $table->string('Emri');
            $table->string('Mbiemri');
            $table->string('Email')->unique();
            $table->string('password');
            $table->integer('Viti')->nullable();
            $table->double('Mesatarja')->nullable();
            $table->string('Roli');
            $table->rememberToken();
            $table->timestamps();
        });
    }
};
