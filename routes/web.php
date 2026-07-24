<?php

use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClasslevelController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\HomeroomTeacherController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\MajorController;
use App\Http\Controllers\NotificationsController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [ItemController::class, 'publicIndex'])->name('home');

Route::get('/welcome', function () {
    return inertia('welcome', [
        'canRegister' => \Laravel\Fortify\Features::enabled(\Laravel\Fortify\Features::registration()),
    ]);
})->name('welcome');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Route untuk mengelola siswa
    Route::get('/students', [StudentController::class, 'index'])->name('students.index');
    Route::get('/students/create', [StudentController::class, 'create'])->name('students.create');
    Route::post('/students', [StudentController::class, 'store'])->name('students.store');
    Route::delete('/students/all', [StudentController::class, 'destroyAll'])->name('students.destroy-all');
    Route::get('/students/{student:id}/edit', [StudentController::class, 'edit'])->name('students.edit');
    Route::get('/students/{student:id}', [StudentController::class, 'show'])->name('students.show');
    Route::put('/students/{student:id}/', [StudentController::class, 'update'])->name('students.update');
    Route::delete('/students/{student:id}/', [StudentController::class, 'destroy'])->name('students.destroy');
    Route::get('/students/download', [StudentController::class, 'export'])->name('students.download');
    Route::post('/students/upload', [StudentController::class, 'import'])->name('students.upload');
    Route::get('/students/{student:id}/barcode', [StudentController::class, 'generateBarcodeperStudent'])->name('students.barcode');
    Route::get('/students/barcode', [StudentController::class, 'generateBarcode'])->name('students.barcode.all');
    Route::get('/students/by-barcode/{barcode}', [StudentController::class, 'findByBarcode'])->name('students.by-barcode');

    // Route untuk mengelola lokasi
    Route::get('/locations', [LocationController::class, 'index'])->name('locations.index');
    Route::get('/locations/create', [LocationController::class, 'create'])->name('locations.create');
    Route::post('/locations', [LocationController::class, 'store'])->name('locations.store');
    Route::get('/locations/{location:id}/edit', [LocationController::class, 'edit'])->name('locations.edit');
    Route::put('/locations/{location:id}/', [LocationController::class, 'update'])->name('locations.update');
    Route::delete('/locations/{location:id}/', [LocationController::class, 'destroy'])->name('locations.destroy');

    // Route untuk mengelola kategori
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');
    Route::get('/categories/create', [CategoryController::class, 'create'])->name('categories.create');
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
    Route::get('/categories/{category:id}/edit', [CategoryController::class, 'edit'])->name('categories.edit');
    Route::put('/categories/{category:id}/', [CategoryController::class, 'update'])->name('categories.update');
    Route::delete('/categories/{category:id}/', [CategoryController::class, 'destroy'])->name('categories.destroy');

    // Route untuk mengelola kelas
    Route::get('/classlevels', [ClasslevelController::class, 'index'])->name('classlevels.index');
    Route::get('/classlevels/create', [ClasslevelController::class, 'create'])->name('classlevels.create');
    Route::post('/classlevels', [ClasslevelController::class, 'store'])->name('classlevels.store');
    Route::get('/classlevels/{classlevel:id}/edit', [ClasslevelController::class, 'edit'])->name('classlevels.edit');
    Route::put('/classlevels/{classlevel:id}/', [ClasslevelController::class, 'update'])->name('classlevels.update');
    Route::delete('/classlevels/{classlevel:id}/', [ClasslevelController::class, 'destroy'])->name('classlevels.destroy');

    // Route untuk mengelola jurusan
    Route::get('/majors', [MajorController::class, 'index'])->name('majors.index');
    Route::get('/majors/create', [MajorController::class, 'create'])->name('majors.create');
    Route::post('/majors', [MajorController::class, 'store'])->name('majors.store');
    Route::get('/majors/{major:id}/edit', [MajorController::class, 'edit'])->name('majors.edit');
    Route::put('/majors/{major:id}/', [MajorController::class, 'update'])->name('majors.update');
    Route::delete('/majors/{major:id}/', [MajorController::class, 'destroy'])->name('majors.destroy');

    // Route untuk mengelola user (khusus proktor)
    Route::middleware('can:proktor')->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::get('/users/{user:id}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{user:id}/', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user:id}/', [UserController::class, 'destroy'])->name('users.destroy');

        // Route untuk mengelola wali kelas
        Route::get('/homeroom-teachers', [HomeroomTeacherController::class, 'index'])->name('homeroom-teachers.index');
        Route::get('/homeroom-teachers/create', [HomeroomTeacherController::class, 'create'])->name('homeroom-teachers.create');
        Route::post('/homeroom-teachers', [HomeroomTeacherController::class, 'store'])->name('homeroom-teachers.store');
        Route::get('/homeroom-teachers/{homeroomTeacher:id}/edit', [HomeroomTeacherController::class, 'edit'])->name('homeroom-teachers.edit');
        Route::put('/homeroom-teachers/{homeroomTeacher:id}/', [HomeroomTeacherController::class, 'update'])->name('homeroom-teachers.update');
        Route::delete('/homeroom-teachers/{homeroomTeacher:id}/', [HomeroomTeacherController::class, 'destroy'])->name('homeroom-teachers.destroy');

        // Route untuk persetujuan peminjaman barang terbatas
        Route::get('/loans/approvals', [ApprovalController::class, 'index'])->name('approvals.index');
        Route::put('/loans/{loan:id}/approve', [ApprovalController::class, 'approve'])->name('approvals.approve');
        Route::put('/loans/{loan:id}/reject', [ApprovalController::class, 'reject'])->name('approvals.reject');
    });

    // Route untuk mengelola barang
    Route::get('/items', [ItemController::class, 'index'])->name('items.index');
    Route::get('/items/create', [ItemController::class, 'create'])->name('items.create');
    Route::post('/items', [ItemController::class, 'store'])->name('items.store');
    Route::get('/items/{item:id}/edit', [ItemController::class, 'edit'])->name('items.edit');
    Route::put('/items/{item:id}/', [ItemController::class, 'update'])->name('items.update');
    Route::delete('/items/{item:id}/', [ItemController::class, 'destroy'])->name('items.destroy');
    Route::get('/items/{item:id}/barcode', [ItemController::class, 'generateBarcodePerItem'])->name('items.barcode');
    Route::get('/items/barcode', [ItemController::class, 'generateBarcode'])->name('items.barcode.all');
    Route::get('/items/by-barcode/{barcode}', [ItemController::class, 'findByBarcode'])->name('items.by-barcode');

    // Route untuk mengelola peminjaman
    Route::get('/loans', [LoanController::class, 'index'])->name('loans.index');
    Route::get('/loans/returned', [LoanController::class, 'returned'])->name('loans.returned');
    Route::get('/loans/create', [LoanController::class, 'create'])->name('loans.create');
    Route::post('/loans', [LoanController::class, 'store'])->name('loans.store');
    Route::get('/loans/{loan:id}/edit', [LoanController::class, 'edit'])->name('loans.edit');
    Route::put('/loans/{loan:id}/', [LoanController::class, 'update'])->name('loans.update');
    Route::delete('/loans/{loan:id}/', [LoanController::class, 'destroy'])->name('loans.destroy');
    Route::put('/loans/{loan:id}/return', [LoanController::class, 'return'])->name('loans.return');
    Route::get('/loans/pdf', [LoanController::class, 'exportPdf'])->name('loans.pdf');
    Route::get('/loans/overdue-letter', [LoanController::class, 'overdueLetter'])->name('loans.overdue-letter');

    // Route untuk notifikasi
    Route::get('/notifications', [NotificationsController::class, 'index'])->name('notifications.index');
    Route::post('/notifications/{id}/mark-as-read', [NotificationsController::class, 'markAsRead'])->name('notifications.mark-as-read');
    Route::post('/notifications/mark-all-read', [NotificationsController::class, 'markAllAsRead'])->name('notifications.mark-all-read');
    Route::delete('/notifications/{id}', [NotificationsController::class, 'destroy'])->name('notifications.destroy');

    // Route untuk mengelola titipan barang
    Route::get('/deposits', [DepositController::class, 'index'])->name('deposits.index');
    Route::get('/deposits/create', [DepositController::class, 'create'])->name('deposits.create');
    Route::post('/deposits', [DepositController::class, 'store'])->name('deposits.store');
    Route::get('/deposits/{deposit:id}/edit', [DepositController::class, 'edit'])->name('deposits.edit');
    Route::put('/deposits/{deposit:id}/', [DepositController::class, 'update'])->name('deposits.update');
    Route::delete('/deposits/{deposit:id}/', [DepositController::class, 'destroy'])->name('deposits.destroy');
    Route::put('/deposits/{deposit:id}/pickup', [DepositController::class, 'pickup'])->name('deposits.pickup');
});

require __DIR__.'/settings.php';
