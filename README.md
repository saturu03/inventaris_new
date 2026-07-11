# Inventra School - Sistem Inventaris Sekolah

Aplikasi manajemen inventaris barang berbasis web untuk sekolah. Dibangun dengan Laravel 12 + Inertia.js v2 + React 19.

## Fitur

- **Manajemen Barang** — CRUD barang dengan foto, kode barcode QR, kategori, lokasi, kondisi, dan status ketersediaan
- **Manajemen Peminjaman** — Catat peminjaman dan pengembalian barang, cetak surat keterlambatan PDF
- **Manajemen Titipan Barang** — Barang titipan siswa dengan status pengambilan
- **Manajemen Siswa** — CRUD data siswa, foto, barcode QR, import/export Excel
- **Manajemen Kelas & Jurusan** — Master data kelas dan jurusan
- **Manajemen Lokasi & Kategori** — Master data lokasi penyimpanan dan kategori barang
- **Manajemen User** — Role proktor dan staff, manajemen wali kelas
- **Cek Barang (Publik)** — Halaman publik untuk siswa melihat status barang, filter lokasi, kategori, dan status ketersediaan
- **Notifikasi** — Notifikasi peminjaman terlambat
- **Autentikasi** — Login, register, verifikasi email, two-factor authentication (2FA)
- **QR Code & Barcode** — Generate QR code untuk setiap barang dan siswa

## Teknologi

### Backend
- **PHP 8.4** / **Laravel 12** — Framework utama
- **Laravel Fortify** — Headless authentication backend (login, register, 2FA, verifikasi email)
- **Laravel Inertia** — Server-side routing ke SPA React
- **Laravel Wayfinder** — Generate typed route functions untuk frontend
- **Laravel Tinker** — REPL untuk debugging
- **barryvdh/laravel-dompdf** — Generate PDF (surat keterlambatan)
- **chillerlan/php-qrcode** — Generate QR code
- **maatwebsite/excel** — Import/export Excel siswa
- **Laravel Pint** — Code formatter PSR-12
- **Laravel Sail** — Docker development environment
- **Pest** — Testing framework

### Frontend
- **React 19** + **TypeScript** — UI framework
- **Inertia.js React v2** — Client-side SPA routing
- **Tailwind CSS v4** — Utility-first styling
- **@shadcn/ui (Radix UI)** — Komponen UI (dialog, select, dropdown, toggle, dll)
- **Headless UI** — Transition components
- **Lucide React** — Icons
- **Vite** — Build tool
- **ESLint / Prettier** — Code quality
- **@yudiel/react-qr-scanner** — QR scanner

### Database
- **MySQL** / **SQLite** — Database engine
- **Eloquent ORM** — Database querying

## Alur Aplikasi

### Publik (Tanpa Login)
```
Beranda → Cek Barang (items/status)
  ├─ Pilih filter status (Semua / Tersedia / Dipinjam)
  ├─ Cari barang (search by name)
  ├─ Pilih tab lokasi
  │    └─ Lihat barang per kategori
  │         └─ Klik foto → lightbox zoom
  └─ Staff Login
```

### Staff / Proktor (Setelah Login)
```
Dashboard
├─ Manajemen Barang
│    ├─ Lihat daftar barang
│    ├─ Tambah/Edit/Hapus barang (dengan upload foto)
│    ├─ Download QR Code barang
│    └─ Cek barang publik
├─ Manajemen Peminjaman
│    ├─ Catat peminjaman
│    ├─ Pengembalian barang
│    ├─ Cetak PDF surat keterlambatan
│    └─ Riwayat peminjaman
├─ Manajemen Titipan Barang
│    ├─ Catat titipan
│    ├─ Pengambilan barang titipan
│    └─ Riwayat titipan
├─ Manajemen Siswa
│    ├─ CRUD data siswa + foto
│    ├─ Upload foto
│    ├─ Import/Export Excel
│    └─ Download QR Code siswa
├─ Master Data
│    ├─ Lokasi, Kategori, Kelas, Jurusan
│    └─ Wali Kelas (khusus Proktor)
├─ Manajemen User (khusus Proktor)
│    └─ CRUD staff/proktor
└─ Notifikasi
     └─ Peminjaman terlambat
```

## Instalasi

### Prasyarat
- PHP 8.4+
- Composer
- Node.js 20+
- MySQL atau SQLite
- Git

### Langkah Instalasi

```bash
# 1. Clone repository
git clone <repository-url> inventaris
cd inventaris

# 2. Copy environment file
cp .env.example .env
# Sesuaikan konfigurasi database di .env

# 3. Install dependencies PHP
composer install

# 4. Generate application key
php artisan key:generate

# 5. Install dependencies frontend
npm install

# 6. Build assets
npm run build

# 7. Jalankan migrasi database
php artisan migrate

# 8. (Opsional) Seed data awal
php artisan db:seed

# 9. Buat storage link
php artisan storage:link
```

### Menjalankan Aplikasi

```bash
# Development (server + queue + vite)
composer run dev

# Atau manual:
php artisan serve     # Terminal 1
npm run dev           # Terminal 2
php artisan queue:listen --tries=1  # Terminal 3
```

### Default Akun

| Role | Email | Password |
|------|-------|----------|
| Proktor | proktor@inventra.test | password |
| Staff | staff@inventra.test | password |

## Testing

```bash
# Jalankan semua test
php artisan test --compact

# Filter test tertentu
php artisan test --compact --filter=NamaTest
```

## Code Style

```bash
# Format kode PHP
vendor/bin/pint --format agent

# Format kode frontend
npm run format

# Lint frontend
npm run lint
```
