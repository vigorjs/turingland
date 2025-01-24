<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Yoeriboven\LaravelLogDb\Models\LogMessage;

class LogController extends Controller
{
    /**
     * Display a listing of logs.
     *
     * @return \Inertia\Response
     */
    public function index()
    {
        // Retrieve paginated log messages from the database
        $logs = LogMessage::paginate(8);

        return Inertia::render('Admin/Log/AdminLogPage', [
            'logs' => $logs,
        ]);
    }

    /**
     * Filter logs by level (e.g., error, info, debug).
     *
     * @param  string  $level
     * @return \Illuminate\Http\JsonResponse
     */
    public function filterByLevel($level)
    {
        $logs = LogMessage::where('level', $level)->get();

        if ($logs->isEmpty()) {
            return response()->json([
                'success' => false,
                'message' => 'No logs found for the given level',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $logs,
        ]);
    }

    /**
     * Delete a specific log by ID.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $log = LogMessage::find($id);

        if (!$log) {
            return response()->json([
                'success' => false,
                'message' => 'Log not found',
            ], 404);
        }

        $log->delete();

        return redirect()->back();
    }
}
