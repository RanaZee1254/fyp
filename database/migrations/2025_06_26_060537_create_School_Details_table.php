<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void
    {
        Schema::create('schools', function (Blueprint $table) {
            $table->id()->unique();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('email')->default('school@example.com');
            $table->string('School_name')->nullable();
            $table->string('School_contact')->default('12345678');
            $table->string('Fee_structure')->default('12345');
            $table->string('reg_no')->default('sch-1234-123');
            $table->string('affiliation')->nullable();
            $table->string('level')->nullable();
            $table->string('address')->nullable();
            $table->string('image')->nullable();
            $table->timestamps();
        });
    }
    public function down(): void
    {
        Schema::dropIfExists('schools');
    }
};
