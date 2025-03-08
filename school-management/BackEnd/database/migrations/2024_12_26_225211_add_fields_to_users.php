<?php

use App\Enums\BloodEnum;
use App\Models\StudentParent;
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
            $table->timestamp('deleted_at')->nullable()->after('remember_token');
            $table->string('blood_type')->default(BloodEnum::A_PLUS)->after('remember_token');
            $table->enum('gendre', ['m', 'f'])->after('remember_token');
            $table->foreignIdFor(StudentParent::class)->nullable()->constrained()->cascadeOnDelete()->after('remember_token');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('gendre');
            $table->dropColumn('blood_type');
            $table->dropForeignIdFor(StudentParent::class);
            $table->dropColumn('deleted_at');
        });
    }
};
