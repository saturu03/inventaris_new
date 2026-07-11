<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Surat Panggilan Pengembalian Barang</title>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        .page-break { page-break-after: always; }
        .header { text-align: center; margin-bottom: 24px; }
        .header h1 { font-size: 16px; margin-bottom: 4px; text-transform: uppercase; }
        .header h2 { font-size: 14px; margin: 0; font-weight: normal; }
        .header p { font-size: 11px; color: #6b7280; margin-top: 4px; }
        .school-name { font-size: 18px; font-weight: bold; margin-bottom: 2px; }
        .letter-body { margin-bottom: 20px; }
        .letter-body p { line-height: 1.6; }
        table { width: 100%; border-collapse: collapse; margin: 12px 0; }
        th, td { border: 1px solid #374151; padding: 6px 8px; text-align: left; font-size: 10px; }
        th { background: #e5e7eb; font-weight: 600; }
        .teacher-info { background: #f0f9ff; border: 1px solid #bae6fd; border-radius: 4px; padding: 10px 14px; margin: 12px 0; }
        .teacher-info h3 { margin: 0 0 6px 0; font-size: 13px; }
        .teacher-info p { margin: 2px 0; font-size: 11px; }
        .footer { margin-top: 32px; }
        .footer .signature { margin-top: 48px; text-align: right; }
        .footer .signature p { margin: 2px 0; font-size: 11px; }
        .footer .signature .name { font-weight: bold; margin-top: 48px; }
    </style>
</head>
<body>
    @forelse($sections as $major => $section)
        <div class="page-break">
            <div class="header">
                <div class="school-name">INVENTRA SCHOOL</div>
                <h1>SURAT PANGGILAN</h1>
                <h2>Pengembalian Barang Inventaris</h2>
                <p>Tanggal Cetak: {{ $date }}</p>
            </div>

            <div class="letter-body">
                <p>Yang terhormat Bapak/Ibu Wali Kelas,</p>
                <p>Bersama ini kami sampaikan daftar siswa dari jurusan <strong>{{ $major }}</strong> yang masih memiliki tanggungan barang inventaris yang belum dikembalikan. Mohon bantuan Bapak/Ibu untuk menyampaikan kepada siswa yang bersangkutan agar segera mengembalikan barang yang dipinjam.</p>
            </div>

            @if($section['homeroomTeacher'])
                <div class="teacher-info">
                    <h3>Wali Kelas {{ $major }}</h3>
                    <p>Nama: {{ $section['homeroomTeacher']['name'] }}</p>
                    <p>No. WhatsApp: {{ $section['homeroomTeacher']['phone'] }}</p>
                </div>
            @else
                <div class="teacher-info" style="background: #fef3c7; border-color: #fcd34d;">
                    <p style="color: #92400e;"><em>Data wali kelas untuk jurusan {{ $major }} belum diisi.</em></p>
                </div>
            @endif

            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nama Siswa</th>
                        <th>NIS</th>
                        <th>Kelas</th>
                        <th>Barang</th>
                        <th>Tanggal Pinjam</th>
                        <th>Hari Terlambat</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($section['loans'] as $i => $loan)
                    <tr>
                        <td>{{ $i + 1 }}</td>
                        <td>{{ $loan->student?->name ?? $loan->borrower_name }}</td>
                        <td>{{ $loan->student?->nis ?? '-' }}</td>
                        <td>{{ $loan->student ? trim($loan->student->class?->level . ' ' . preg_replace('/\d+$/', '', $loan->student->major?->alias ?? '') . ' ' . preg_replace('/^[A-Za-z]+/', '', $loan->student->major?->alias ?? '')) : '-' }}</td>
                        <td>{{ $loan->item->name }}</td>
                        <td>{{ \Carbon\Carbon::parse($loan->borrower_date)->format('d M Y') }}</td>
                        <td>{{ \Carbon\Carbon::parse($loan->borrower_date)->diffInDays(now()) }} hari</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>

            <div class="footer">
                <p>Demikian surat panggilan ini dibuat, atas perhatian dan kerjasamanya kami ucapkan terima kasih.</p>
                <div class="signature">
                    <p>Proktor,</p>
                    <p class="name">{{ $userName ?? '__________' }}</p>
                </div>
            </div>
        </div>
    @empty
        <div class="header">
            <div class="school-name">INVENTRA SCHOOL</div>
            <h1>SURAT PANGGILAN</h1>
            <h2>Pengembalian Barang Inventaris</h2>
            <p>Tanggal Cetak: {{ $date }}</p>
        </div>
        <p style="text-align: center; margin-top: 60px; color: #6b7280; font-size: 14px;">
            Tidak ada barang yang terlambat dikembalikan.
        </p>
    @endforelse
</body>
</html>
