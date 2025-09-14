<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // For now, allow all authenticated users to access admin panel
        // In production, you would check for admin role/permission
        if (!auth()->check()) {
            return redirect()->route('login');
        }

        // Optional: Check if user has admin role
        // if (!auth()->user()->hasRole('admin')) {
        //     abort(403, 'Unauthorized access to admin panel');
        // }

        return $next($request);
    }
}