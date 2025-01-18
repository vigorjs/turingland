<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class PasswordController extends Controller
{
    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
{
    // Validation logic
    $validated = $request->validate([
        'current_password' => [
            'nullable',
            function ($attribute, $value, $fail) use ($request) {
                // Hanya lakukan validasi current_password jika password ada di database
                if ($request->user()->password && !Hash::check($value, $request->user()->password)) {
                    $fail('The current password is incorrect.');
                }
            },
        ],
        'password' => ['required', Password::defaults(), 'confirmed'],
    ]);

    $user = $request->user();
    data_forget($user, 'role');

    // Jika ada password baru, update password pengguna
    if ($validated['password']) {
        $user->update([
            'password' => Hash::make($validated['password']),
        ]);
    }

    return back();
}

}
