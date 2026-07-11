<?php

namespace App\Imports;

use App\Models\Student;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class StudentsImport implements ToModel, WithHeadingRow
{
    /**
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function model(array $row)
    {
        return new Student([
            'major_id' => $row['major_id'],
            'class_id' => $row['class_id'],
            'name' => $row['name'],
            'nis' => $row['nis'],
            'phone' => $row['phone'],
            'gender' => $row['gender'],
            'address' => $row['address'] ?? null,
            'barcode' => Str::random(10),
            'photo' => $row['photo'] ?? null,
        ]);
    }
}
