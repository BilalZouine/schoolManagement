<?php

use App\Http\Controllers\StudentParentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::put('/student-parents/{studentParent}', [StudentParentController::class, 'update']);
Route::delete('/student-parents/{studentParent}', [StudentParentController::class, 'destroy']);


// Route::get('/', function () {
//     return ['Laravel' => app()->version()];
// });

