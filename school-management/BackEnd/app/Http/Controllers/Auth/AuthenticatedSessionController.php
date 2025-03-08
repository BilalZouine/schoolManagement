<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $user = Auth::user();
        if (!$user) {
            $guards = array_keys(config("auth.guards"));
            foreach ($guards as $guard) {
                $correntGuard = Auth::guard($guard);
                if ($correntGuard->check()) {
                    $user = $correntGuard->user();
                    break;
                }
            }
        }
        ;

        $request->session()->regenerate();

        return response()->json([
            'user'=>$user,
            'token'=>$user->createToken('api',[$user->getRoleAttribute()])->plainTextToken,
        ]);
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): Response
    {
        
        $user = Auth::user();
        if (!$user) {
            $guards = array_keys(config("auth.guards"));
            foreach ($guards as $guard) {
                $correntGuard = Auth::guard($guard);
                if ($correntGuard->check()) {
                    $user = $correntGuard->user();
                    break;
                }
            }
        }
        $user->tokens()->delete();

        Auth::guard('admin')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return response()->noContent();
    }
}
