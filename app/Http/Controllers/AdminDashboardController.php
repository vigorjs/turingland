<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Developer;
use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Yoeriboven\LaravelLogDb\Models\LogMessage;

class AdminDashboardController extends Controller
{
    public function index(Request $request)
    {
        $totalUser = User::role('customer')->count();
        $totalDeveloper = Developer::count();
        $totalAgent = User::role('agent')->count();
        $totalProperty = Property::count();
        $latestDevelopers = Developer::orderBy('created_at', 'desc')
            ->take(5)
            ->get();


        // Get start and end date for the current year
        $startDate = now()->startOfYear();
        $endDate = now()->endOfYear();

        // Generate array of all months in the year
        $months = [];
        $currentDate = $startDate->copy();
        while ($currentDate <= $endDate) {
            $months[$currentDate->format('Y-m')] = [
                'month' => $currentDate->format('F'),
                'created' => 0,
                'sold' => 0
            ];
            $currentDate->addMonth();
        }

        // Get created properties data
        $createdData = Property::selectRaw('
            to_char(created_at, \'YYYY-MM\') as month_key,
            COUNT(*) as total_created
        ')
            ->whereYear('created_at', date('Y'))
            ->groupBy('month_key')
            ->get();

        // Get sold properties data
        $soldData = Property::selectRaw('
            to_char(when_sold, \'YYYY-MM\') as month_key,
            COUNT(*) as total_sold
        ')
            ->whereYear('when_sold', date('Y'))
            ->whereNotNull('when_sold')
            ->groupBy('month_key')
            ->get();

        // Merge created data
        foreach ($createdData as $data) {
            if (isset($months[$data->month_key])) {
                $months[$data->month_key]['created'] = $data->total_created;
            }
        }

        // Merge sold data
        foreach ($soldData as $data) {
            if (isset($months[$data->month_key])) {
                $months[$data->month_key]['sold'] = $data->total_sold;
            }
        }

        // Get property count by category
        $categoryData = Category::withCount('properties')
            ->orderBy('properties_count', 'desc')
            ->get()
            ->map(function ($category) {
                return [
                    'name' => $category->name,
                    'total' => $category->properties_count
                ];
            });

        // Get property count by type (sale/rent)
        $propertyTypeData = Property::selectRaw('type, COUNT(*) as total')
            ->groupBy('type')
            ->get()
            ->map(function ($item) {
                return [
                    'name' => ucfirst($item->type),
                    'total' => $item->total
                ];
            });

        $latestAgents = User::role('agent')->orderBy('created_at', 'desc')->take(5)->get();

        // In your controller, when passing logs
        $logs = LogMessage::all()->map(function ($log) {
            // Ensure context is a string if it's an array
            $log->context = is_array($log->context)
                ? json_encode($log->context)
                : $log->context;
            return $log;
        });

        // dd($logs[0]->context);



        return Inertia::render("Admin/Dashboards/AdminDashboardPage", [
            'totalUser' => $totalUser,
            'totalDeveloper' => $totalDeveloper,
            'totalAgent' => $totalAgent,
            'totalProperty' => $totalProperty,
            'latestDevelopers' => $latestDevelopers,
            'latestAgents' => $latestAgents,
            'propertyData' => array_values($months),
            'categoryData' => $categoryData,
            'propertyTypeData' => $propertyTypeData,
            'logs' => $logs
        ]);
    }
}
