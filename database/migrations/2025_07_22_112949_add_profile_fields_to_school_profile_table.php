<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('school_profiles', function (Blueprint $table) {
            $table->string('image')->nullable();
            $table->string('address')->nullable();
        });
    }

    public function down()
    {
        Schema::table('school_profiles', function (Blueprint $table) {
            $table->dropColumn(['image', 'address']);
        });
    }
};
