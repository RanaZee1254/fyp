<?php
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration {
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            if (!Schema::hasColumn('users', 'role')) {
                $table->string('role');
            }

            if (!Schema::hasColumn('users', 'Contact_Number')) {
                $table->string('Contact_Number')->nullable();
            }

            if (!Schema::hasColumn('users', 'image')) {
                $table->string('image')->nullable();
            }

            if (!Schema::hasColumn('users', 'address')) {
                $table->string('address')->nullable();
            }
        });
    }

    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            // $table->dropColumn(['role', 'Contact_Number', 'image', 'address']);
        });
    }
};
