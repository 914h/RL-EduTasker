<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('devoirs', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('Description');
            $table->string('file_path');
            $table->foreignID('teacher_id')->constrained('teachers')->cascadeOnDelete();
            $table->foreignID('class_id')->constrained('classes')->cascadeOnDelete();
            $table->foreignID('module_id')->constrained('modules')->cascadeOnDelete();  
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('devoirs');
    }
};
