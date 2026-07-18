# LAPORAN PRAKTIK KERJA LAPORANG (PKL)

---

## HALAMAN JUDUL

**SISTEM INFORMASI MANAJEMEN INVENTARIS SEKOLAH**
**(APLIKASI INVENTRA SCHOOL)**

Laporan Praktik Kerja Lapangan

Disusun oleh:

**ALDI WIRANATA**

NIS: root

Program Keahlian: Pengembangan Perangkat Lunak dan Gim (PPLG)

Kelas: XII PPLG

---

**SMK TI DWIGUNA**
**2026**

---

## KATA PENGANTAN

Assalamuala’ikum Warahmatullahi Wabarakatuh,

Puji syukur penulis panjatkan ke hadirat Tuhan Yang Maha Esa karena atas berkat dan rahmat-Nya, laporan Praktik Kerja Lapangan (PKL) ini dapat diselesaikan dengan baik.

Laporan ini disusun sebagai bentuk pertanggungjawaban atas kegiatan Praktik Kerja Lapangan yang telah dilaksanakan di SMK TI Dwiguna. Dalam pelaksanaan PKL, penulis mendapat kesempatan untuk mengembangkan Sistem Informasi Manajemen Inventaris Sekolah yang diberi nama **Inventra School**.

Penulis mengucapkan terima kasih kepada:
1. Kepala Sekolah SMK TI Dwiguna
2. Bu Diena selaku Guru Pembimbing
3. Bu Diena selaku Proktor/Pembimbing di tempat PKL
4. Seluruh staff dan guru SMK TI Dwiguna
5. Keluarga yang selalu mendukung

Semoga laporan ini dapat bermanfaat bagi pembaca.

Wassalamuala’ikum Warahmatullahi Wabarakatuh.

---

## DAFTAR ISI

1. BAB I PENDAHULUAN
   - 1.1 Latar Belakang
   - 1.2 Maksud dan Tujuan
   - 1.3 Manfaat
   - 1.4 Tempat dan Waktu Pelaksanaan
   - 1.5 Sistem Pelaporan

2. BAB II TINJAUAN PUSTAKA
   - 2.1 Pengertian Praktik Kerja Lapangan
   - 2.2 Pengertian Sistem Informasi Manajemen
   - 2.3 Pengertian Inventaris
   - 2.4 Sistem Manajemen Inventaris

3. BAB III METODOLOGI PENELITIAN
   - 3.1 Identifikasi Masalah
   - 3.2 Metode Pengumpulan Data
   - 3.3 Metodologi Pengembangan Sistem
   - 3.4 Spesifikasi Sistem
   - 3.5 Arsitektur Sistem

4. BAB IV HASIL DAN PEMBAHASAN
   - 4.1 Gambaran Umum Aplikasi
   - 4.2 Fitur-Fitur Aplikasi
   - 4.3 Database
   - 4.4 Implementasi Fitur
   - 4.5 Tampilan Aplikasi

5. BAB V PENUTUP
   - 5.1 Kesimpulan
   - 5.2 Saran

DAFTAR PUSTAKA
LAMPIRAN

---

## BAB I PENDAHULUAN

### 1.1 Latar Belakang

Manajemen inventaris sekolah merupakan salah satu aspek penting dalam pengelolaan sarana dan prasarana pendidikan. Inventaris sekolah meliputi berbagai barang seperti komputer, proyektor, meubelair, alat laboratorium, dan peralatan lainnya yang digunakan untuk mendukung kegiatan belajar mengajar.

Dalam pengelolaan inventaris sekolah, sering kali ditemukan berbagai permasalahan, antara lain:

1. **Pencatatan manual** yang rentan terhadap kesalahan dan kehilangan data
2. **Kesulitan melacak** status barang yang dipinjam atau dipindahkan
3. **Keterlambatan pengembalian** barang yang dipinjam tanpa sistem pengingat yang memadai
4. **Kurangnya transparansi** data inventaris bagi pihak sekolah
5. **Proses pelaporan** yang memakan waktu dan tenaga

Berdasarkan permasalahan tersebut, diperlukan sebuah sistem informasi manajemen inventaris yang dapat membantu pengelolaan data inventaris secara digital, efisien, dan akurat.

Sistem **Inventra School** dikembangkan untuk menjawab kebutuhan tersebut dengan menyediakan aplikasi berbasis web yang mudah digunakan, memiliki fitur lengkap, dan dapat diakses dari berbagai perangkat.

### 1.2 Maksud dan Tujuan

**Maksud:**
Melaksanakan kegiatan Praktik Kerja Lapangan untuk memperoleh pengalaman kerja langsung di dunia industri, khususnya dalam pengembangan perangkat lunak (software development).

**Tujuan:**
1. Menerapkan ilmu dan keterampilan yang diperoleh selama pendidikan di sekolah
2. Mengembangkan Sistem Informasi Manajemen Inventaris Sekolah
3. Memperoleh pengalaman kerja yang relevan dengan kompetensi keahlian PPLG
4. Memahami siklus pengembangan perangkat lunak secara menyeluruh
5. Meningkatkan kemampuan problem-solving dan kerja tim

### 1.3 Manfaat

**Bagi Penulis:**
1. Memperoleh pengalaman kerja nyata dalam pengembangan aplikasi
2. Meningkatkan keterampilan teknis pemrograman
3. Memahami kebutuhan pengguna dalam pengembangan sistem
4. Mempersiapkan diri untuk terjun ke dunia kerja

**Bagi Sekolah:**
1. Memiliki sistem inventaris yang terdigitalisasi
2. Mempermudah pengelolaan data inventaris
3. Meningkatkan efisiensi pengelolaan barang

**Bagi Pihak Lain:**
1. Menjadi referensi bagi siswa yang akan melaksanakan PKL
2. Menambah khazanah pengetahuan di bidang pengembangan perangkat lunak

### 1.4 Tempat dan Waktu Pelaksanaan

- **Tempat:** SMK TI Dwiguna
- **Waktu:** Senin sampai Sabtu
- **Guru Pembimbing Sekolah:** Bu Diena
- **Proktor/Pembimbing di Tempat PKL:** Bu Diena

### 1.5 Sistem Pelaporan

Laporan PKL ini disusun secara sistematis dan terstruktur yang terdiri dari 5 bab, yaitu:
1. **Bab I:** Pendahuluan (latar belakang, tujuan, manfaat)
2. **Bab II:** Tinjauan Pustaka (teori yang relevan)
3. **Bab III:** Metodologi Penelitian (cara pengumpulan data dan pengembangan)
4. **Bab IV:** Hasil dan Pembahasan (fitur dan implementasi aplikasi)
5. **Bab V:** Penutup (kesimpulan dan saran)

---

## BAB II TINJAUAN PUSTAKA

### 2.1 Pengertian Praktik Kerja Lapangan

Praktik Kerja Lapangan (PKL) adalah kegiatan pendidikan yang merupakan bagian dari kurikulum program keahlian, yang dilaksanakan di dunia kerja (industri/perusahaan/instansi) dalam jangka waktu tertentu untuk memperoleh pengalaman kerja dan keterampilan profesional.

PKL bertujuan untuk:
1. Membekali siswa dengan pengalaman kerja nyata
2. Menghubungkan teori yang dipelajari di sekolah dengan praktik di lapangan
3. Mengembangkan sikap profesional dan keterampilan kerja
4. Mempersiapkan siswa untuk terjun ke dunia kerja

### 2.2 Pengertian Sistem Informasi Manajemen

Sistem Informasi Manajemen (SIM) adalah suatu sistem informasi yang dirancang untuk menyediakan informasi yang diperlukan oleh manajer dalam pengambilan keputusan. SIM terdiri dari komponen manusia, perangkat keras (hardware), perangkat lunak (software), prosedur, dan data.

Dalam konteks inventaris sekolah, SIM berfungsi untuk:
1. Mengelola data barang inventaris
2. Melacak perpindahan dan penggunaan barang
3. Menghasilkan laporan secara otomatis
4. Memberikan notifikasi terkait status barang

### 2.3 Pengertian Inventaris

Inventaris adalah daftar barang yang dimiliki oleh suatu organisasi atau lembaga, beserta keterangan jumlah, harga, dan kondisi barang. Inventaris sekolah meliputi semua barang yang digunakan untuk keperluan operasional sekolah.

Jenis inventaris sekolah antara lain:
1. **Peralatan TIK:** Komputer, laptop, printer, proyektor
2. **Meubelair:** Meja, kursi, lemari, rak buku
3. **Alat Laboratorium:** Peralatan praktikum
4. **Peralatan Olahraga:** Bola, raket, papan pantul
5. **Peralatan Pendukung:** AC,kipas angin, lampu

### 2.4 Sistem Manajemen Inventaris

Sistem Manajemen Inventaris adalah sistem yang digunakan untuk mengelola dan melacak semua aset fisik yang dimiliki oleh organisasi. Sistem ini mencakup proses pencatatan, pelacakan, pemeliharaan, dan pelaporan status inventaris.

Fitur utama sistem manajemen inventaris meliputi:
1. **Pencatatan Barang:** Penginputan data barang baru
2. **Pelacakan Status:** Memantau status barang (tersedia/dipinjam/rusak)
3. **Manajemen Peminjaman:** Proses peminjaman dan pengembalian
4. **Laporan:** Pembuatan laporan inventaris
5. **Notifikasi:** Pengingat otomatis untuk pengembalian

---

## BAB III METODOLOGI PENELITIAN

### 3.1 Identifikasi Masalah

Berdasarkan observasi di SMK TI Dwiguna, ditemukan beberapa permasalahan dalam pengelolaan inventaris:

1. Pencatatan inventaris masih dilakukan secara manual menggunakan buku atau spreadsheet
2. Proses peminjaman barang memerlukan waktu lama karena pencatatan manual
3. Sulit melacak barang yang sedang dipinjam
4. Tidak ada sistem pengingat untuk pengembalian barang yang terlambat
5. Pembuatan laporan inventaris memerlukan waktu dan tenaga ekstra
6. Data inventaris tidak terpusat dan rentan hilang

### 3.2 Metode Pengumpulan Data

1. **Observasi Langsung:** Mengamati langsung proses pengelolaan inventaris di sekolah
2. **Wawancara:** Melakukan wawancara dengan staff yang mengelola inventaris
3. **Studi Literatur:** Membaca referensi dan dokumentasi teknis
4. **Analisis Kebutuhan:** Mengidentifikasi kebutuhan pengguna dan fitur sistem

### 3.3 Metodologi Pengembangan Sistem

Pengembangan sistem Inventra School menggunakan pendekatan iteratif dengan teknologi modern:

**Backend Development:**
- Framework: Laravel 12
- Bahasa Pemrograman: PHP 8.4
- Database: SQLite
- Autentikasi: Laravel Fortify
- PDF Generation: DomPDF

**Frontend Development:**
- Framework: React 19
- SPA Bridge: Inertia.js v2
- CSS Framework: Tailwind CSS v4
- TypeScript: Untuk type safety
- Build Tool: Vite 7

**Development Process:**
1. Analisis kebutuhan dan perancangan database
2. Pengembangan fitur backend (model, controller, routes)
3. Pengembangan tampilan frontend (React components)
4. Integrasi frontend dan backend dengan Inertia.js
5. Testing dan debugging
6. Deploy dan dokumentasi

### 3.4 Spesifikasi Sistem

**Perangkat Keras yang Digunakan:**
- Komputer/Laptop dengan spesifikasi minimal:
  - Processor: Intel Core i3 atau setara
  - RAM: 4 GB minimum
  - Storage: 256 GB SSD
  - Koneksi internet stabil

**Perangkat Lunak yang Digunakan:**
- Sistem Operasi: Windows 10/11
- Code Editor: Visual Studio Code
- Browser: Google Chrome / Mozilla Firefox
- PHP Runtime: PHP 8.4
- Node.js: v18+
- Composer (PHP Package Manager)
- npm (Node Package Manager)

### 3.5 Arsitektur Sistem

Sistem Inventra School menggunakan arsitektur **Monolith dengan SPA Frontend**:

```
┌─────────────────────────────────────────────────┐
│                    USER                         │
│              (Browser/Client)                   │
└─────────────────────┬───────────────────────────┘
                      │ HTTP Request
                      ▼
┌─────────────────────────────────────────────────┐
│              LARAVEL 12 BACKEND                 │
│  ┌─────────────────────────────────────────┐   │
│  │  Routes (web.php)                       │   │
│  └─────────────────┬───────────────────────┘   │
│                    │                            │
│  ┌─────────────────▼───────────────────────┐   │
│  │  Controllers (Item, Loan, Student, etc) │   │
│  └─────────────────┬───────────────────────┘   │
│                    │                            │
│  ┌─────────────────▼───────────────────────┐   │
│  │  Models (Eloquent ORM)                  │   │
│  └─────────────────┬───────────────────────┘   │
│                    │                            │
│  ┌─────────────────▼───────────────────────┐   │
│  │  Database (SQLite)                      │   │
│  └─────────────────────────────────────────┘   │
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │  Inertia.js Server-Side Rendering       │   │
│  └─────────────────┬───────────────────────┘   │
└────────────────────┼───────────────────────────┘
                     │ JSON Response
                     ▼
┌─────────────────────────────────────────────────┐
│           REACT 19 FRONTEND (SPA)              │
│  ┌─────────────────────────────────────────┐   │
│  │  Pages (resources/js/pages/)            │   │
│  │  Components (resources/js/components/)  │   │
│  │  Tailwind CSS v4 Styling               │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

**Diagram Alur Data:**

```
┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
│ Peminjam │───▶│  Peminjaman│───▶│   Barang  │───▶│ Status   │
│  (User)  │    │  (Loan)  │    │  (Item)  │    │ Barang   │
└──────────┘    └──────────┘    └──────────┘    └──────────┘
                     │
                     ▼
              ┌──────────┐
              │ Pengembalian│
              │ (Return) │
              └──────────┘
```

---

## BAB IV HASIL DAN PEMBAHASAN

### 4.1 Gambaran Umum Aplikasi

**Inventra School** adalah Sistem Informasi Manajemen Inventaris Sekolah yang dikembangkan menggunakan teknologi web modern. Aplikasi ini dirancang untuk membantu pengelolaan inventaris sekolah secara digital, mulai dari pencatatan barang, manajemen peminjaman, hingga pembuatan laporan.

**Nama Aplikasi:** Inventra School
**URL:** http://inventaris_new.test
**Platform:** Web Application (Responsive)

**Teknologi yang Digunakan:**

| Komponen | Teknologi | Versi |
|----------|-----------|-------|
| Backend | Laravel | 12.0 |
| Bahasa Backend | PHP | 8.4 |
| Database | SQLite | - |
| Autentikasi | Laravel Fortify | 1.30 |
| Frontend | React | 19.2 |
| SPA Bridge | Inertia.js | 2.3 |
| CSS Framework | Tailwind CSS | 4.0 |
| Build Tool | Vite | 7.0 |
| PDF Generation | DomPDF | - |
| QR Code | chillerlan/php-qrcode | - |
| Excel Import/Export | maatwebsite/excel | 3.1 |

### 4.2 Fitur-Fitur Aplikasi

Aplikasi Inventra School memiliki fitur-fitur lengkap yang terbagi menjadi beberapa modul:

#### A. Fitur Publik (Tanpa Login)

1. **Halaman Selamat Datang (Welcome Page)**
   - Tampilan landing page yang menarik
   - Link ke halaman publik barang

2. **Tampilan Barang Publik**
   - Grid cards barang yang dikelompokkan berdasarkan kategori
   - Filter berdasarkan lokasi dan status
   - Foto barang dengan lightbox (tampilan penuh)
   - Responsive untuk mobile dan desktop

#### B. Fitur Dashboard

**Dashboard** menyajikan ringkasan data inventaris secara real-time:

- **Statistik Utama:**
  - Total Barang
  - Barang Tersedia
  - Barang Dipinjam
  - Peminjaman Aktif
  - Peminjaman Terlambat
  - Setoran Aktif
  - Total Siswa

- **Tabel Peminjaman Terakhir:**
  - 5 peminjaman terbaru dengan status badge
  - Badge warna: Hijau (dikembalikan), Kuning (dipinjam), Merah (terlambat)

- **Ringkasan Cepat:**
  - Panel samping dengan metrik kunci
  - Shortcut ke halaman terkait

#### C. Modul Manajemen Barang (Item Management)

Fitur lengkap pengelolaan barang inventaris:

- **CRUD Barang:**
  - Tambah barang baru dengan data: nama, kategori, lokasi, kondisi, spesifikasi, foto
  - Edit data barang
  - Hapus barang dengan konfirmasi
  - Status: tersedia / tidak tersedia
  - Kondisi: berfungsi / rusak ringan / rusak berat

- **Barcode & QR Code:**
  - Barcode UUID otomatis dibuat saat barang baru
  - QR Code per barang (format PNG)
  - Download QR Code individual atau bulk (ZIP)
  - Pencarian barang berdasarkan barcode

- **Filter & Pencarian:**
  - Filter berdasarkan lokasi (tab)
  - Filter berdasarkan status (tersedia/tidak tersedia)
  - Pencarian teks (nama barang)
  - Grouping berdasarkan kategori

#### D. Modul Manajemen Siswa (Student Management)

Pengelolaan data siswa secara lengkap:

- **CRUD Siswa:**
  - Data siswa: nama, NIS, jenis kelamin, alamat, telepon, foto
  - Barcode siswa (8 karakter random, unik)
  - Jurusan (Major) dan Kelas (Classlevel)

- **Import/Export Excel:**
  - Import dari file Excel (.xlsx, .xls, .csv)
  - Kolom fleksibel (mendukung nama kolom Indonesia/Inggris)
  - Deteksi jurusan berdasarkan alias
  - Upsert (update jika NIS sudah ada)
  - Export ke Excel dengan styling header
  - Auto-generate barcode untuk data baru

- **QR Code:**
  - QR Code per siswa
  - Download bulk QR Code (ZIP)
  - Pencarian siswa berdasarkan barcode

#### E. Modul Manajemen Peminjaman (Loan Management)

Sistem peminjaman yang robust dan fleksibel:

- **Proses Peminjaman:**
  - Multi-entry: Satu form untuk beberapa peminjaman sekaligus
  - Role peminjam: siswa, guru, staf, eksternal, pekerja, custom
  - Jaminan: Kartu Pelajar atau lainnya
  - Auto-hitung batas waktu pengembalian:
    - Siswa: Deadline jam 17:00 hari yang sama
    - Non-siswa: Default 3 hari atau custom

- **Aturan Bisnis:**
  - Peminjaman ditolak setelah jam 18:00
  - Validasi ketersediaan barang sebelum dipinjam
  - Status barang otomatis berubah saat dipinjam/dikembalikan
  - Pengecekan ketersediaan secara real-time

- **Proses Pengembalian:**
  - Tanggal pengembalian tercatat otomatis
  - User yang memproses pengembalian tercatat
  - Status barang kembali "tersedia"

- **Filter & Gruping:**
  - Filter: Semua / Dipinjam / Dikembalikan
  - Gruping: Hari / Minggu / Bulan / Tahun

- **Laporan PDF:**
  - Laporan peminjaman lengkap (borrowed + returned)
  - Grouping per periode
  - Badge warna untuk status

- **Surat Panggilan (Overdue Letter):**
  - Surat resmi untuk wali kelas
  - Grouping berdasarkan jurusan + kelas
  - Data wali kelas (nama + WhatsApp)
  - Tabel siswa dengan detail peminjaman
  - Hari keterlambatan (dibulatkan ke atas)
  - Tanda tangan proktor
  - Per halaman per jurusan+kelas

#### F. Modul Manajemen Setoran (Deposit Management)

Sistem pengelolaan barang titipan/setoran:

- **CRUD Setoran:**
  - Data penitip: nama, telepon
  - Tanggal setor dan estimasi pengambilan
  - Multiple items per setoran (nama barang, jumlah, catatan)
  - Status: dititip / diambil

- **Proses Pengambilan:**
  - Tandai sebagai "diambil" dengan timestamp
  - Filter status: semua / dititip / diambil

#### G. Modul Data Master

1. **Kategori (Categories):** Nama kategori barang
2. **Lokasi (Locations):** Lokasi penyimpanan barang
3. **Jurusan (Majors):** Nama lengkap + alias jurusan
4. **Kelas (Classlevels):** Level kelas (10, 11, 12)
5. **Wali Kelas (Homeroom Teachers):** Nama, telepon, jurusan, kelas

#### H. Modul Manajemen Pengguna (User Management)

Hanya dapat diakses oleh Proktor:

- CRUD pengguna sistem
- Role: proktor / staff
- Manajemen password
- Verifikasi email

#### I. Sistem Notifikasi

- **Notifikasi Pinjaman Terlambat:**
  - Terkirim otomatis ke semua proktor/staff
  - Data: nama peminjam, tanggal jatuh tempo, hari keterlambatan

- **Pengingat Pengambilan Setoran:**
  - Terkirim ke user yang membuat setoran
  - Aktif H-1 dari estimasi pengambilan

- **Tampilan Notifikasi:**
  - Bell icon dengan counter unread
  - Dropdown notifikasi terbaru
  - Halaman notifikasi lengkap
  - Tandai sudah dibaca / Tandai semua sudah dibaca

#### J. Fitur Tambahan

1. **Dark Mode:** Tema gelap/terang/sistem via cookie
2. **Bilingual:** Toggle Bahasa Indonesia/Inggris (387 kunci terjemahan)
3. **QR Scanner:** Pemindai barcode via kamera, upload gambar, atau input manual
4. **Search Input:** Pencarian debounce 300ms untuk performa optimal
5. **Sidebar Collapsible:** State sidebar tersimpan di cookie
6. **Two-Factor Authentication:** Keamanan akun tambahan
7. **Scheduled Tasks:** Pengecekan otomatis setiap jam 08:00

### 4.3 Database

Sistem menggunakan **SQLite** sebagai database dengan 12 tabel utama:

#### Diagram Database (Entity Relationship)

```
┌──────────────┐       ┌──────────────┐
│  categories  │       │  locations   │
│──────────────│       │──────────────│
│ id           │       │ id           │
│ name         │       │ name         │
│ created_at   │       │ created_at   │
│ updated_at   │       │ updated_at   │
└──────┬───────┘       └──────┬───────┘
       │ 1                    │ 1
       │ *                    │ *
┌──────▼───────────────────────▼───────┐
│                items                  │
│──────────────────────────────────────│
│ id                                   │
│ name                                 │
│ category_id (FK)                     │
│ location_id (FK)                     │
│ status (available/inavailable)       │
│ condition (functional/slightly_      │
│            damaged/broken)           │
│ spec (text)                          │
│ barcode (UUID, unique)               │
│ photo                                │
│ created_at                           │
│ updated_at                           │
└──────────────────┬───────────────────┘
                   │ 1
                   │ *
┌──────────────────▼───────────────────┐
│                loans                  │
│──────────────────────────────────────│
│ id                                   │
│ item_id (FK)                         │
│ user_out_id (FK) - petugas keluar    │
│ user_in_id (FK) - petugas masuk      │
│ student_id (FK, nullable)            │
│ borrower_name                        │
│ borrower_role                        │
│ collateral_type                      │
│ borrower_date                        │
│ estimated_return_date                │
│ returned                             │
│ created_at                           │
│ updated_at                           │
└──────────────────────────────────────┘

┌──────────────┐       ┌──────────────┐
│    majors    │       │   classes    │
│──────────────│       │──────────────│
│ id           │       │ id           │
│ full_name    │       │ level        │
│ alias        │       │ (10/11/12)   │
│ created_at   │       │ created_at   │
│ updated_at   │       │ updated_at   │
└──────┬───────┘       └──────┬───────┘
       │ 1                    │ 1
       │ *                    │ *
┌──────▼───────────────────────▼───────┐
│              students                 │
│──────────────────────────────────────│
│ id                                   │
│ major_id (FK)                        │
│ class_id (FK)                        │
│ name                                 │
│ nis (unique)                         │
│ gender (male/female)                 │
│ address                              │
│ barcode (unique)                     │
│ phone                                │
│ photo                                │
│ created_at                           │
│ updated_at                           │
└──────────────────────────────────────┘

┌──────────────┐       ┌──────────────┐
│   deposits   │       │deposit_items │
│──────────────│       │──────────────│
│ id           │       │ id           │
│ user_id (FK) │◄──────│ deposit_id   │
│ depositor_   │  1:*  │ item_name    │
│   name       │       │ quantity     │
│ depositor_   │       │ notes        │
│   phone      │       │ created_at   │
│ deposit_date │       │ updated_at   │
│ estimated_   │       └──────────────┘
│   pickup_date│
│ pickup_date  │
│ status       │
│ notes        │
│ created_at   │
│ updated_at   │
└──────────────┘

┌──────────────────┐
│homeroom_teachers │
│──────────────────│
│ id               │
│ name             │
│ major_id (FK)    │
│ class_id (FK)    │
│ phone            │
│ created_at       │
│ updated_at       │
└──────────────────┘

┌──────────────┐       ┌──────────────┐
│    users     │       │   schools    │
│──────────────│       │──────────────│
│ id           │       │ id           │
│ name         │       │ school_name  │
│ email        │       │ school_      │
│ password     │       │   address    │
│ role         │       │ created_at   │
│ email_       │       │ updated_at   │
│   verified_at│       └──────────────┘
│ two_factor_  │
│   secret     │
│ two_factor_  │
│   recovery_  │
│   codes      │
│ created_at   │
│ updated_at   │
└──────────────┘
```

#### Detail Tabel:

| No | Tabel | Keterangan | Jumlah Kolom |
|----|-------|------------|--------------|
| 1 | users | Pengguna sistem | 9 |
| 2 | items | Data barang inventaris | 10 |
| 3 | students | Data siswa | 10 |
| 4 | loans | Data peminjaman | 12 |
| 5 | categories | Kategori barang | 3 |
| 6 | locations | Lokasi penyimpanan | 3 |
| 7 | majors | Jurusan | 4 |
| 8 | classes | Kelas | 3 |
| 9 | deposits | Data setoran | 9 |
| 10 | deposit_items | Item setoran | 6 |
| 11 | homeroom_teachers | Wali kelas | 6 |
| 12 | schools | Data sekolah | 4 |

### 4.4 Implementasi Fitur

#### A. Implementasi Autentikasi

Sistem menggunakan **Laravel Fortify** untuk autentikasi dengan fitur:
- Login dengan email dan password
- Reset password via email
- Verifikasi email
- Two-Factor Authentication (2FA)
- Konfirmasi password untuk aksi sensitif

**Implementasi di Backend:**
```php
// routes/web.php
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');
    // ... routes lainnya
});
```

**Implementasi di Frontend:**
```tsx
// resources/js/layouts/auth-layout.tsx
// Layout untuk halaman autentikasi
```

#### B. Implementasi Sistem Role

Dua role pengguna dengan hak akses berbeda:

| Fitur | Proktor | Staff |
|-------|---------|-------|
| Dashboard | ✓ | ✓ |
| Manajemen Barang | ✓ | ✓ |
| Manajemen Siswa | ✓ | ✓ |
| Manajemen Peminjaman | ✓ | ✓ |
| Manajemen Setoran | ✓ | ✓ |
| Manajemen Kategori | ✓ | ✗ |
| Manajemen Jurusan | ✓ | ✗ |
| Manajemen Lokasi | ✓ | ✗ |
| Manajemen Pengguna | ✓ | ✗ |
| Manajemen Wali Kelas | ✓ | ✗ |
| Kelas | ✓ | ✓ |

**Implementasi:**
```php
// app/Models/User.php
public function isProktor(): bool
{
    return $this->role === 'proktor';
}
```

```tsx
// Sidebar conditional rendering
{auth.user?.role === 'proktor' && (
    // Menu items untuk proktor saja
)}
```

#### C. Implementasi Sistem Peminjaman

**Alur Proses Peminjaman:**

```
┌─────────────┐
│ Pilih Barang │
│  (Barcode)  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ Input Data  │
│  Peminjam   │
└──────┬──────┘
       │
       ▼
┌─────────────┐    Tidak    ┌──────────┐
│ Cek Jam     │───────────▶│  Tolak   │
│ < 18:00 ?   │            └──────────┘
└──────┬──────┘
       │ Ya
       ▼
┌─────────────┐    Tidak    ┌──────────┐
│ Cek Status  │───────────▶│  Tolak   │
│  Barang ?   │            └──────────┘
└──────┬──────┘
       │ Ya (Tersedia)
       ▼
┌─────────────┐
│Simpan Loan  │
│Update Item  │
│  Status     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Selesai   │
└─────────────┘
```

**Kode Penting:**
```php
// app/Http/Controllers/LoanController.php
public function store(LoanRequest $request): RedirectResponse
{
    // Validasi jam peminjaman
    if (now()->hour >= 18) {
        return back()->withErrors(['error' => 'Peminjaman ditutup setelah jam 18:00']);
    }

    // Validasi ketersediaan barang
    $item = Item::findOrFail($request->item_id);
    if ($item->status !== 'available') {
        return back()->withErrors(['error' => 'Barang tidak tersedia']);
    }

    // Hitung estimasi pengembalian
    if ($request->borrower_role === 'student') {
        $estimatedReturn = now()->setTime(17, 0); // Deadline jam 17:00
    } else {
        $estimatedReturn = now()->addDays(3); // Default 3 hari
    }

    // Simpan peminjaman
    $loan = Loan::create([...]);

    // Update status barang
    $item->update(['status' => 'inavailable']);

    return redirect()->route('loans.index');
}
```

#### D. Implementasi Surat Panggilan

**Alur Pembuatan Surat Panggilan:**

```
┌─────────────────┐
│Ambil Data Loan  │
│(returned IS NULL│
│ estimated_date  │
│ < now())        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│Group by Major   │
│+ ClassLevel     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│Match Homeroom   │
│Teacher          │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│Render PDF       │
│(Blade Template) │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│Download PDF     │
└─────────────────┘
```

**Template Surat:**
```blade
<!-- resources/views/pdfs/overdue-letter.blade.php -->
<div class="header">
    <div class="school-name">INVENTRA SCHOOL</div>
    <h1>SURAT PANGGILAN</h1>
    <h2>Pengembalian Barang Inventaris</h2>
</div>

<p>Kepada Yth. Wali Kelas <strong>{{ $label }}</strong>,</p>
<p>Kami memberitahukan bahwa siswa-siswa di bawah ini dari jurusan
   <strong>{{ $section['major'] }}</strong> kelas
   <strong>{{ $section['classLevel'] }}</strong> masih memiliki
   barang inventaris yang belum dikembalikan.</p>

<table>
    <thead>
        <tr>
            <th>No</th>
            <th>Nama Siswa</th>
            <th>NIS</th>
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
            <td>{{ $loan->item->name }}</td>
            <td>{{ \Carbon\Carbon::parse($loan->borrower_date)->format('d M Y') }}</td>
            <td>{{ (int) ceil(now()->diffInDays($loan->estimated_return_date)) }} hari</td>
        </tr>
        @endforeach
    </tbody>
</table>
```

#### E. Implementasi Sistem Notifikasi

**Jenis Notifikasi:**

1. **LoanOverdueNotification:**
```php
// app/Notifications/LoanOverdueNotification.php
public function toDatabase(object $notifiable): array
{
    return [
        'loan_id' => $this->loan->id,
        'title' => 'Peminjaman Terlambat',
        'message' => "Peminjaman atas nama {$this->loan->borrower_name}
                      sudah melewati batas waktu pengembalian.",
        'borrower_name' => $this->loan->borrower_name,
        'estimated_return_date' => $this->loan->estimated_return_date?->format('d M Y'),
        'days_overdue' => (int) ceil(now()->diffInDays($this->loan->estimated_return_date)),
    ];
}
```

2. **DepositPickupReminder:**
```php
// Mengirim pengingat H-1 dari estimasi pengambilan
```

**Scheduled Task:**
```php
// routes/console.php
Schedule::command('loans:check-overdue')->dailyAt('08:00');
Schedule::command('deposits:check-pickups')->dailyAt('08:00');
```

#### F. Implementasi QR Code

**Generasi QR Code:**
```php
// Menggunakan chillerlan/php-qrcode
use chillerlan\QRCode\QRCode;
use chillerlan\QRCode\QROptions;

$options = new QROptions([
    'outputType' => QRCode::OUTPUT_IMAGE_PNG,
    'eccLevel' => QRCode::ECC_L,
]);

$qrcode = new QRCode($options);
$image = $qrcode->render($data);
```

**Scanner QR (Frontend):**
```tsx
// resources/js/components/yudiel-scanner.tsx
// Menggunakan @yudiel/react-qr-scanner
// Mode: Kamera, Upload Gambar, Input Manual
```

### 4.5 Tampilan Aplikasi

#### A. Tampilan Dashboard

Dashboard menampilkan ringkasan data inventaris dengan kartu statistik berwarna:
- Kartu biru: Total Barang
- Kartu hijau: Barang Tersedia
- Kartu kuning: Barang Dipinjam
- Kartu merah: Peminjaman Terlambat

#### B. Tampilan Manajemen Barang

- Grid cards responsif (2-6 kolom)
- Filter lokasi dalam bentuk tab
- Dropdown filter status
- Search input dengan debounce
- QR Code per barang

#### C. Tampilan Manajemen Peminjaman

- Tabel dengan gruping periode
- Badge status berwarna
- Tombol aksi (kembalikan, PDF)
- Filter all/borrowed/returned

#### D. Tampilan Surat Panggilan

- Kop sekolah "INVENTRA SCHOOL"
- Judul "SURAT PANGGILAN"
- Alamat ke Wali Kelas
- Info kontak Wali Kelas
- Tabel data siswa
- Tanda tangan Proktor
- Page break per jurusan+kelas

#### E. Tampilan Mobile

- Sidebar collapsible
- Responsive grid
- Touch-friendly buttons
- Optimized for mobile screens

---

## BAB V PENUTUP

### 5.1 Kesimpulan

Berdasarkan kegiatan Praktik Kerja Lapangan yang telah dilaksanakan di SMK TI Dwiguna, dapat disimpulkan bahwa:

1. **Sistem Inventra School** telah berhasil dikembangkan sebagai solusi digital untuk pengelolaan inventaris sekolah. Sistem ini memiliki fitur lengkap yang mencakup:
   - Manajemen barang inventaris
   - Manajemen data siswa
   - Sistem peminjaman dan pengembalian
   - Sistem setoran barang
   - Laporan dan surat panggilan
   - Notifikasi otomatis
   - QR Code dan barcode

2. **Teknologi yang digunakan** (Laravel 12, React 19, Inertia.js, Tailwind CSS) merupakan teknologi modern yang relevan dengan kebutuhan industri saat ini.

3. **Fitur unggulan** sistem meliputi:
   - Multi-entry peminjaman
   - Role-based access control
   - Import/Export Excel
   - PDF generation
   - Dark mode dan bilingual
   - QR Code scanning
   - Scheduled tasks untuk notifikasi

4. **Implementasi PKL** memberikan pengalaman berharga dalam:
   - Analisis kebutuhan pengguna
   - Perancangan database
   - Pengembangan full-stack (backend + frontend)
   - Testing dan debugging
   - Deployment aplikasi

### 5.2 Saran

Berdasarkan pengalaman selama PKL, berikut adalah saran untuk pengembangan lebih lanjut:

1. **Fitur yang perlu ditambahkan:**
   - Modul laporan inventaris tahunan
   - Grafik dan analitik penggunaan barang
   - Sistem peminjaman antar sekolah
   - Integrasi dengan sistem informasi akademik

2. **Peningkatan keamanan:**
   - Rate limiting untuk API
   - Input sanitization yang lebih ketat
   - Audit log untuk semua aksi

3. **Optimasi performa:**
   - Caching untuk data master
   - Pagination untuk data besar
   - Lazy loading untuk gambar

4. **Untuk siswa yang akan PKL:**
   - Pelajari teknologi yang relevan (PHP, React, database)
   - Pahami kebutuhan pengguna sebelum mengembangkan
   - Dokumentasikan kode dengan baik
   - Lakukan testing secara berkala
   - Komunikasi aktif dengan pembimbing

---

## DAFTAR PUSTAKA

1. Laravel. (2024). Laravel Documentation. https://laravel.com/docs/12.x

2. Inertia.js. (2024). Inertia.js Documentation. https://inertiajs.com/

3. React. (2024). React Documentation. https://react.dev/

4. Tailwind CSS. (2024). Tailwind CSS Documentation. https://tailwindcss.com/docs

5. Laravel Fortify. (2024). Laravel Fortify Documentation. https://laravel.com/docs/12.x/fortify

6. Laravel Wayfinder. (2024). Laravel Wayfinder Documentation. https://laravel.com/docs/12.x/wayfinder

7. Laravel DomPDF. (2024). Laravel DomPDF Documentation. https://github.com/barryvdh/laravel-dompdf

8. Laravel Excel. (2024). Laravel Excel Documentation. https://docs.laravel-excel.com/

9. QR Code PHP. (2024). chillerlan/php-qrcode Documentation. https://github.com/chillerlan/php-qrcode

10. Pest PHP. (2024). Pest PHP Documentation. https://pestphp.com/

---

## LAMPIRAN

### Lampiran 1: Struktur Direktori Aplikasi

```
inventaris_new/
├── app/
│   ├── Actions/Fortify/     (Autentikasi)
│   ├── Console/Commands/    (Scheduled Tasks)
│   ├── Http/Controllers/    (Controller)
│   ├── Models/              (Model Eloquent)
│   ├── Notifications/       (Notifikasi)
│   └── Policies/            (Authorization)
├── database/
│   ├── factories/           (Data Testing)
│   ├── migrations/          (Database Schema)
│   └── seeders/             (Data Awal)
├── resources/
│   ├── js/
│   │   ├── components/      (Component React)
│   │   ├── layouts/         (Layout)
│   │   ├── pages/           (Halaman)
│   │   ├── routes/          (Wayfinder Routes)
│   │   └── types/           (TypeScript Types)
│   └── views/
│       └── pdfs/            (Template PDF)
├── routes/
│   ├── web.php              (Web Routes)
│   └── console.php          (Scheduled Tasks)
└── tests/                   (Unit & Feature Tests)
```

### Lampiran 2: Route List

| Method | URI | Controller | Nama Route |
|--------|-----|------------|------------|
| GET | / | ItemController@publicIndex | home |
| GET | /dashboard | DashboardController@index | dashboard |
| GET | /items | ItemController@index | items.index |
| POST | /items | ItemController@store | items.store |
| GET | /students | StudentController@index | students.index |
| POST | /students/import | StudentController@upload | students.upload |
| GET | /loans | LoanController@index | loans.index |
| POST | /loans | LoanController@store | loans.store |
| POST | /loans/{loan}/return | LoanController@return | loans.return |
| GET | /loans/pdf | LoanController@pdf | loans.pdf |
| GET | /loans/overdue-letter | LoanController@overdueLetter | loans.overdue-letter |
| GET | /deposits | DepositController@index | deposits.index |
| POST | /deposits | DepositController@store | deposits.store |

### Lampiran 3: Model Relationship Diagram

```
User (1) ──── (*) Loan (as user_out)
User (1) ──── (*) Loan (as user_in)
User (1) ──── (*) Deposit

Item (1) ──── (*) Loan
Student (1) ── (*) Loan
Category (1) ─ (*) Item
Location (1) ─ (*) Item

Major (1) ──── (*) Student
Classlevel (1) (*) Student
Major (1) ──── (*) HomeroomTeacher
Classlevel (1) (*) HomeroomTeacher

Deposit (1) ── (*) DepositItem
```

---

**TEMPAT TANDA TANGAN**

Mengetahui,

Guru Pembimbing
SMK TI Dwiguna

__________________________
Bu Diena

Proktor/Pembimbing
di Tempat PKL

__________________________
Bu Diena

Disusun oleh,

__________________________
Aldi Wiranata
NIS: root
Kelas: XII PPLG
