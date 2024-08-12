<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateTableStudentNullableFields extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('table_student', function (Blueprint $table) {
            $table->integer('Viti')->nullable()->default(null)->change();
            $table->double('Mesatarja')->nullable()->default(null)->change();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('table_student', function (Blueprint $table) {
            $table->integer('Viti')->nullable(false)->default(0)->change();
            $table->double('Mesatarja')->nullable(false)->default(0)->change();
        });
    }
}
