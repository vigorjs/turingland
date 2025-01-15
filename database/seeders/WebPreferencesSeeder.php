<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use App\Services\WebPreferences\WebPreferencesService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class WebPreferencesSeeder extends Seeder
{
    protected WebPreferencesService $webPreferencesService;

    public function __construct(WebPreferencesService $webPreferencesService)
    {
        $this->webPreferencesService = $webPreferencesService;
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $webPreferences = [
            [
                'key' => 'logo_url',
                'file' => 'assets/turinglandlogo.png',
            ],
            [
                'key' => 'logo_dark_url',
                'file' => 'assets/turinglandlogodark.png',
            ],
            [
                'key' => 'hero_url',
                'file' => 'assets/hero-banner.webp',
            ],
            [
                'key' => 'img_login_url',
                'file' => 'assets/login-image.png',
            ],
            [
                'key' => 'img_register_url',
                'file' => 'assets/login-image.png',
            ],
        ];

        foreach ($webPreferences as $preference) {
            try {
                $filePath = public_path($preference['file']);

                if (file_exists($filePath)) {
                    $fileName = basename($preference['file']);
                    $targetPath = 'web-preferences/' . $fileName;

                    // Copy file to storage/public if needed
                    Storage::disk('public')->put($targetPath, file_get_contents($filePath));

                    // Panggil service untuk menyimpan atau memperbarui preference
                    $this->webPreferencesService->updateWebPreference(
                        new Request([
                            'key' => $preference['key'],
                            'value' => $targetPath,
                        ])
                    );

                    Log::info("Web preference seeded successfully", [
                        'key' => $preference['key'],
                        'file' => $targetPath,
                    ]);
                } else {
                    Log::warning("File not found for web preference", [
                        'key' => $preference['key'],
                        'file' => $filePath,
                    ]);
                }
            } catch (\Exception $e) {
                Log::error("Error seeding web preference", [
                    'key' => $preference['key'],
                    'file' => $preference['file'],
                    'error' => $e->getMessage(),
                ]);
            }
        }
    }
}
