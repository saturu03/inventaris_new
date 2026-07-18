<?php

namespace App\Imports;

use App\Models\Classlevel;
use App\Models\Major;
use App\Models\Student;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class StudentsImport implements ToModel, WithHeadingRow
{
    public function model(array $row)
    {
        $row = array_change_key_case($row, CASE_LOWER);

        $majorAlias = $row['jurusan'] ?? $row['major'] ?? null;
        $classLevel = $row['kelas'] ?? $row['class'] ?? $row['classlevel'] ?? null;

        if (! $majorAlias || ! $classLevel) {
            return null;
        }

        $major = Major::where('alias', $majorAlias)->first();
        $class = Classlevel::where('level', $classLevel)->first();

        if (! $major || ! $class) {
            return null;
        }

        $nis = $row['nis'] ?? null;
        if (! $nis) {
            return null;
        }

        $nis = ltrim((string) $nis, 'dg');

        $name = $row['nama'] ?? $row['name'] ?? null;
        $phone = $row['telepon'] ?? $row['phone'] ?? '';
        $genderRaw = strtolower($row['jenis_kelamin'] ?? $row['jenis kelamin'] ?? $row['gender'] ?? '');
        $address = $row['alamat'] ?? $row['address'] ?? null;

        if (in_array($genderRaw, ['laki-laki', 'l', 'male', 'pria'])) {
            $gender = 'male';
        } elseif (in_array($genderRaw, ['perempuan', 'p', 'female', 'wanita'])) {
            $gender = 'female';
        } else {
            $gender = 'male';
        }

        $existing = Student::where('nis', $nis)->first();

        if ($existing) {
            $existing->update([
                'major_id' => $major->id,
                'class_id' => $class->id,
                'name' => $name ?? $existing->name,
                'phone' => $phone ?: $existing->phone,
                'gender' => $gender,
                'address' => $address ?? $existing->address,
            ]);

            return $existing;
        }

        return new Student([
            'major_id' => $major->id,
            'class_id' => $class->id,
            'name' => $name ?? '-',
            'nis' => $nis,
            'phone' => $phone ?: '-',
            'gender' => $gender,
            'address' => $address,
            'barcode' => Str::random(10),
        ]);
    }
}
