<?php

namespace App\Http\Controllers;

use App\Exports\StudentExport;
use App\Helpers\QRCodeHelper;
use App\Imports\StudentsImport;
use App\Models\Classlevel;
use App\Models\Major;
use App\Models\Student;
use chillerlan\QRCode\Output\QRGdImagePNG;
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use PhpOffice\PhpSpreadsheet\Exception;
use ZipArchive;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $query = Student::with(['major', 'class'])->select('id', 'major_id', 'class_id', 'name');

        if ($request->filled('major_id')) {
            $query->where('major_id', $request->major_id);
        }

        if ($request->filled('class_id')) {
            $query->where('class_id', $request->class_id);
        }

        $query->when($request->filled('search'), fn ($q) => $q->where(function ($q) use ($request) {
            $q->where('name', 'like', '%'.$request->search.'%')
                ->orWhere('nis', 'like', '%'.$request->search.'%');
        }));

        $students = $query->get();

        $majors = Major::all();
        $classes = Classlevel::all();

        $classOptions = [];
        foreach ($majors as $major) {
            foreach ($classes as $class) {
                $classOptions[] = [
                    'label' => "{$major->alias} - Kelas {$class->level}",
                    'major_id' => $major->id,
                    'class_id' => $class->id,
                ];
            }
        }

        $filters = $request->only(['major_id', 'class_id', 'search']);

        return Inertia::render('Students/Index', compact('students', 'classOptions', 'filters'));
    }

    public function create()
    {
        $majors = Major::all(); // mengambil semua data major
        $classes = Classlevel::all(); // mengambil semua data class

        return Inertia::render('Students/Create', compact('majors', 'classes')); // Menampilkan halaman tambah data dan mengirim ke view
    }

    public function store(Request $request)
    {
        $request->validate([
            'major_id' => 'required|exists:majors,id', // Validasi major_id harus ada dan sesuai dengan id di tabel majors
            'class_id' => 'required|exists:classes,id', // Validasi class_id harus ada dan sesuai dengan id di tabel classlevels
            'name' => 'required|string|max:255', // Validasi name harus diisi, berupa string, dan maksimal 255 karakter
            'nis' => 'required|max:255', // Validasi nis harus diisi, berupa string, maksimal 255 karakter, dan unik di tabel students
            'gender' => 'required|in:male,female', // Validasi gender harus diisi dan nilainya harus salah satu dari 'male' atau 'female'
            'address' => 'nullable|string', // Validasi address boleh kosong atau berupa string
            'phone' => 'required|string|max:255', // Validasi phone harus diisi, berupa string, dan maksimal 255 karakter
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048', // Validasi photo boleh kosong, harus berupa gambar dengan format tertentu, dan maksimal ukuran 2MB
        ]);

        do {
            $barcode = Str::random(8);
        } while (Student::where('barcode', $barcode)->exists());

        Student::create([
            'major_id' => $request->major_id,
            'class_id' => $request->class_id,
            'name' => $request->name,
            'nis' => $request->nis,
            'gender' => $request->gender,
            'address' => $request->address,
            'barcode' => $barcode,
            'phone' => $request->phone,
            'photo' => $request->photo,
        ]);

        return redirect()->route('students.index')->with('success', 'Student created successfully.'); // Redirect ke halaman index dengan pesan sukses
    }

    public function edit(Student $student)
    {
        $majors = Major::all(); // Mengambil semua jurusan
        $classes = Classlevel::all(); // Mengambil semua kelas

        return Inertia::render('Students/Edit', compact('student', 'majors', 'classes')); // Menampilkan halaman ubah data dan mengirim ke view
    }

    public function update(Request $request, Student $student)
    {
        $request->validate([
            'major_id' => 'required|exists:majors,id',
            'class_id' => 'required|exists:classes,id',
            'name' => 'required|string|max:255',
            'nis' => 'required|max:255|unique:students,nis,'.$student->id,
            'gender' => 'required|in:male,female',
            'address' => 'nullable|string',
            'phone' => 'required|string|max:255',
            'photo' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        $student->update([
            'major_id' => $request->major_id,
            'class_id' => $request->class_id,
            'name' => $request->name,
            'nis' => $request->nis,
            'gender' => $request->gender,
            'address' => $request->address,
            'phone' => $request->phone,
        ]);

        return redirect()->route('students.index')->with('success', 'Student updated successfully.');
    }

    public function destroy(Student $student)
    {
        $student->delete();
    }

    /**
     * @throws Exception
     * @throws \PhpOffice\PhpSpreadsheet\Writer\Exception
     */
    public function export()
    {
        return Excel::download(new StudentExport, 'students.xlsx'); // Menggunakan kelas StudentExport untuk mengekspor data siswa ke file Excel dengan nama students.xlsx
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv|max:5120',
        ]);

        Excel::import(new StudentsImport, $request->file('file'));

        return redirect()
            ->route('students.index')
            ->with('success', 'Students imported successfully.');
    }

    public function findByBarcode(string $barcode)
    {
        $student = Student::with(['major', 'class'])->where('barcode', $barcode)->first();

        if (! $student) {
            return response()->json(['error' => 'Student not found'], 404);
        }

        return response()->json($student);
    }

    public function generateBarcodeperStudent(Student $student)
    {
        $options = new QROptions;
        $options->outputInterface = QRGdImagePNG::class;
        $options->scale = 10;
        $options->outputBase64 = false;

        $qrcode = new QRCode($options);
        $png = $qrcode->render($student->barcode);
        $png = QRCodeHelper::renderWithLabel($png, $student->name);

        return response($png, 200, [
            'Content-Type' => 'image/png',
            'Content-Disposition' => 'inline; filename="'.$student->name.'-qrcode.png"',
        ]);
    }

    public function generateBarcode()
    {
        set_time_limit(0);
        $students = Student::all();
        $zip = new ZipArchive;
        $zipFileName = storage_path('app/public/student-qrcodes.zip');

        if (file_exists($zipFileName)) {
            unlink($zipFileName);
        }

        $zip->open($zipFileName, ZipArchive::CREATE);

        $options = new QROptions;
        $options->outputInterface = QRGdImagePNG::class;
        $options->scale = 8;
        $options->outputBase64 = false;

        foreach ($students as $student) {
            $qrcode = new QRCode($options);
            $pngData = $qrcode->render($student->barcode);
            $pngData = QRCodeHelper::renderWithLabel($pngData, $student->name);
            $zip->addFromString($student->name.'-'.$student->nis.'.png', $pngData);
        }

        $zip->close();

        return response()->download($zipFileName, 'student-qrcodes.zip')->deleteFileAfterSend(true);
    }
}
