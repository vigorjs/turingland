<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use App\Models\Setting;

class AdminSettingController extends Controller
{
    public function updateLogo(Request $request)
    {

        $request->validate([
            'logo' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('logo')) {
            $file = $request->file('logo');

            // Simpan file di storage
            $path = $file->store('logos', 'public');

            // Simpan path ke database
            Setting::updateOrCreate(
                ['key' => 'logo'], // Cari berdasarkan key
                ['value' => $path] // Simpan path file
            );

            return response()->json(['message' => 'Logo berhasil diunggah.', 'path' => $path]);
        }

        return response()->json(['message' => 'Tidak ada file yang diterima.'], 400);
    }
}
