<?php

use App\Models\Teacher;
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
        Schema::create('exams', function (Blueprint $table) {
            $table->id();
            $table->string('name', 50);
            $table->enum('type', ['cc1','cc2']);
            $table->foreignId('teacher_id')->constrained('teachers') ->cascadeOnDelete();  
            $table->foreignId('module_id')->constrained('modules') ->cascadeOnDelete();  
            $table->foreignId('classe_id')->constrained('classes') ->cascadeOnDelete();  
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
        Schema::dropIfExists('exams');
    }
};
