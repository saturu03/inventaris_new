<?php

namespace App\Exports;

use App\Models\Student;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class StudentExport implements FromCollection, ShouldAutoSize, WithHeadings, WithStyles
{
    /**
     * @return \Illuminate\Support\Collection
     */
    public function collection()
    {
        $raw = Student::with(['major:id,alias', 'class:id,level'])
            ->get(['id', 'major_id', 'class_id', 'name', 'nis', 'phone']);

        return collect($raw->map(fn ($s) => [
            $s->id,
            $s->major->alias,
            $s->class->level,
            $s->name,
            'dg'.$s->nis,
            $s->phone,
        ]));
    }

    public function headings(): array
    {
        return [
            'ID',
            'Jurusan',
            'Kelas',
            'Nama',
            'NIS',
            'Telepon',
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => [  // baris ke-1 = header
                'font' => [
                    'bold' => true,
                    'size' => 12,
                    'color' => ['argb' => 'FFFFFFFF'], // putih
                ],
                'fill' => [
                    'fillType' => 'solid',
                    'startColor' => ['argb' => 'FF4F81BD'], // biru
                ],
                'alignment' => [
                    'horizontal' => 'center',
                ],
            ],
        ];
    }
}
