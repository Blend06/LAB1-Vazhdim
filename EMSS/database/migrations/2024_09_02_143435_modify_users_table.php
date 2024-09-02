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
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('name', 'Emri');
            $table->string('Mbiemri')->nullable();
            $table->string('Roli')->nullable()->default('Student');
            $table->string('Specializimi')->nullable()->default(null);
            $table->integer('Viti')->nullable()->default(null);
            $table->double('Mesatarja')->nullable()->default(null);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->renameColumn('Emri', 'name');
            $table->dropColumn('Mbiemri');
            $table->dropColumn('Roli');
            $table->dropColumn('Specializimi');
            $table->dropColumn('Viti');
            $table->dropColumn('Mesatarja');
        });
    }
};
