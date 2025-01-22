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
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->foreignId('developer_id')->constrained()->onDelete('cascade');
            $table->foreignId('area_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // sebagai agent
            $table->integer('bathroom_count');
            $table->integer('bedroom_count');
            $table->integer('carport_count');
            $table->decimal('land_area', 10, 2); // LT
            $table->decimal('building_area', 10, 2); // LB
            $table->decimal('price', 15, 2);
            $table->enum('type', ['sale', 'rent']);
            $table->enum('status', ['active', 'sold', 'rented', 'inactive'])->default('active');
            $table->text('address');
            $table->string('certificate_type')->nullable();
            $table->year('year_built')->nullable();
            $table->tinyInteger('is_featured')->default(0);
            $table->date('when_sold')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
