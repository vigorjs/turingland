<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Yoeriboven\LaravelLogDb\Models\LogMessage;

class LogsExport implements FromCollection
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return LogMessage::all();
    }
}
