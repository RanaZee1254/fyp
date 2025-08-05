<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up()
    {
        Schema::table('shop_profiles', function (Blueprint $table) {
            // if (!Schema::hasColumn('shop_profiles', 'role')) {
                // $table->string('role')->nullable();
            // }
            if (!Schema::hasColumn('shop_profiles', 'name')) {
                $table->string('name')->nullable();
            }
            if (!Schema::hasColumn('shop_profiles', 'contact_number')) {
                $table->string('contact_number')->nullable();
            }
            if (!Schema::hasColumn('shop_profiles', 'email')) {
                $table->string('email')->nullable();
            }
            if (!Schema::hasColumn('shop_profiles', 'image')) {
                $table->string('image')->nullable();
            }

            if (!Schema::hasColumn('shop_profiles', 'address')) {
                $table->string('address')->nullable();
            }
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['contact_number', 'image', 'address','email', 'name']);
        });
    }
};

