<?php

use App\Http\Controllers\StudentParentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum,teacher,admin'])->get('/user', function (Request $request) {
    return $request->user();
});
require __DIR__ . '/auth.php';



Route::apiResources([
    'parents' => [StudentParentController::class, "store"]
]);
 