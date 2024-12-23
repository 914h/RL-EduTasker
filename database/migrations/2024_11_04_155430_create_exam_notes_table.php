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
        Schema::create('exam_notes', function (Blueprint $table) {
            $table->id();
            $table->string('name' , 50);
            $table->foreignId('exam_id')->constrained('exams') ->cascadeOnDelete();  
            $table->foreignId('user_id')->constrained('users') ->cascadeOnDelete();  
            $table->text('comment');
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
        Schema::dropIfExists('exam_notes');
    }
};
