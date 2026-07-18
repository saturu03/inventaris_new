# Flowchart Sistem Inventra School

## 1. Flowchart Autentikasi

```mermaid
flowchart TD
    A[Mulai] --> B[Buka Aplikasi]
    B --> C{Sudah Login?}
    C -->|Ya| D[Dashboard]
    C -->|No| E[Halaman Login]
    E --> F{Pilih Aksi}
    F -->|Login| G[Input Email & Password]
    F -->|Lupa Password| H[Input Email Reset]
    F -->|Register| I[Input Data Register]

    G --> J{Validasi}
    J -->|Gagal| G
    J -->|Berhasil| K{Email Verified?}
    K -->|Ya| L{2FA Aktif?}
    K -->|No| M[Kirim Email Verifikasi]
    M --> N[Verifikasi Email]
    N --> K

    L -->|Ya| O[Input Kode 2FA]
    L -->|No| D
    O --> P{Kode Valid?}
    P -->|Ya| D
    P -->|No| O

    H --> Q[Kirim Email Reset]
    Q --> R[Klik Link Reset]
    R --> S[Input Password Baru]
    S --> T[Password Diubah]
    T --> E

    I --> U[Validasi Data]
    U -->|Gagal| I
    U -->|Berhasil| V[Akun Dibuat]
    V --> E

    D --> W[Logout]
    W --> E
```

## 2. Flowchart Manajemen Barang

```mermaid
flowchart TD
    A[Mulai] --> B[Halaman Barang]
    B --> C{Pilih Aksi}

    C -->|Tambah| D[Form Tambah Barang]
    D --> E[Input: Nama, Kategori, Lokasi, Kondisi, Spesifikasi, Foto]
    E --> F[Generate Barcode UUID]
    F --> G{Validasi}
    G -->|Gagal| E
    G -->|Berhasil| H[Simpan ke Database]
    H --> I[Status: Tersedia]
    I --> B

    C -->|Edit| J[Pilih Barang]
    J --> K[Form Edit Barang]
    K --> L[Update Data]
    L --> M{Validasi}
    M -->|Gagal| L
    M -->|Berhasil| N[Simpan Perubahan]
    N --> B

    C -->|Hapus| O[Pilih Barang]
    O --> P[Konfirmasi Hapus]
    P -->|Batal| B
    P -->|Hapus| Q[Hapus dari Database]
    Q --> B

    C -->|QR Code| R[Pilih Barang]
    R --> S[Generate QR Code PNG]
    S --> T[Download QR Code]
    T --> B

    C -->|Bulk QR| U[Download Semua QR]
    U --> V[Generate ZIP]
    V --> W[Download ZIP]
    W --> B

    C -->|Cari Barcode| X[Input/Scan Barcode]
    X --> Y[Cari di Database]
    Y --> Z{Temu?}
    Z -->|Ya| AA[Tampilkan Detail Barang]
    Z -->|No| AB[Notifikasi Tidak Ditemukan]
    AA --> B
    AB --> B
```

## 3. Flowchart Manajemen Siswa

```mermaid
flowchart TD
    A[Mulai] --> B[Halaman Siswa]
    B --> C{Pilih Aksi}

    C -->|Tambah| D[Form Tambah Siswa]
    D --> E[Input: Nama, NIS, Jurusan, Kelas, Gender, Alamat, Telepon]
    E --> F[Generate Barcode Random 8 Karakter]
    F --> G{Validasi}
    G -->|Gagal| E
    G -->|Berhasil| H[Simpan ke Database]
    H --> B

    C -->|Import Excel| I[Pilih File Excel]
    I --> J{Validasi File?}
    J -->|Gagal| K[Tampilkan Error]
    K --> I
    J -->|Berhasil| L[Parse Kolom Excel]
    L --> M[Deteksi Jurusan & Kelas]
    M --> N{NIS Sudah Ada?}
    N -->|Ya| O[Update Data]
    N -->|No| P[Buat Data Baru]
    O --> Q[Import Selesai]
    P --> Q
    Q --> B

    C -->|Export Excel| R[Generate File Excel]
    R --> S[Download File Excel]
    S --> B

    C -->|QR Code| T[Pilih Siswa]
    T --> U[Generate QR Code]
    U --> V[Download QR Code]
    V --> B

    C -->|Cari Barcode| W[Input/Scan Barcode]
    W --> X[Cari di Database]
    X --> Y{Temu?}
    Y -->|Ya| Z[Tampilkan Detail Siswa]
    Y -->|No| AA[Notifikasi Tidak Ditemukan]
    Z --> B
    AA --> B
```

## 4. Flowchart Peminjaman Barang

```mermaid
flowchart TD
    A[Mulai] --> B[Form Peminjaman]
    B --> C[Scan/Input Barcode Barang]
    C --> D{Barang Ditemukan?}
    D -->|No| C
    D -->|Ya| E{Status Barang?}
    E -->|Tidak Tersedia| F[Error: Barang Sedang Dipinjam]
    F --> C
    E -->|Tersedia| G[Input Data Peminjam]

    G --> H[Input: Nama, Role, Jaminan]
    H --> I{Role Peminjam?}
    I -->|Siswa| J[Auto Deadline: Jam 17:00 Hari Ini]
    I -->|Non-Siswa| K[Input Estimasi Pengembalian]
    K --> L{Ada Estimasi?}
    L -->|Ya| M[Gunakan Input User]
    L -->|No| N[Default: 3 Hari]

    J --> O{Cek Jam Server}
    M --> O
    N --> O
    O --> P{Jam < 18:00?}
    P -->|No| Q[Error: Peminjaman Ditutup]
    Q --> B
    P -->|Ya| R[Simpan Peminjaman]
    R --> S[Update Status Barang: Tidak Tersedia]
    S --> T[Peminjaman Berhasil]
    T --> B
```

## 5. Flowchart Pengembalian Barang

```mermaid
flowchart TD
    A[Mulai] --> B[Halaman Peminjaman]
    B --> C[Pilih Peminjaman Aktif]
    C --> D[Klik Tombol Kembalikan]
    D --> E[Konfirmasi Pengembalian]
    E -->|Batal| B
    E -->|Ya, Kembalikan| F[Set Tanggal Kembali: Now]
    F --> G[Set User In: User Aktif]
    G --> H[Update Status Barang: Tersedia]
    H --> I[Pengembalian Berhasil]
    I --> B
```

## 6. Flowchart Surat Panggilan

```mermaid
flowchart TD
    A[Mulai] --> B[Klik Surat Panggilan]
    B --> C[Ambil Data Pinjaman]
    C --> D[Filter: Returned IS NULL]
    D --> E[Filter: Estimated Return Date < Now]
    E --> F{Ada Data?}
    F -->|No| G[Tampilkan: Tidak Ada Barang Terlambat]
    F -->|Ya| H[Grouping by Major + Class]
    H --> I[Match Homeroom Teacher]
    I --> J{Ada Wali Kelas?}
    J -->|Ya| K[Render Info Wali Kelas]
    J -->|No| L[Render Warning: Data Wali Kelas Kosong]
    K --> M[Render PDF per Jurusan + Kelas]
    L --> M
    M --> N[Generate PDF dengan DomPDF]
    N --> O[Download: surat-panggilan-overdue.pdf]
    G --> P[Selesai]
    O --> P
```

## 7. Flowchart Setoran Barang

```mermaid
flowchart TD
    A[Mulai] --> B[Halaman Setoran]
    B --> C{Pilih Aksi}

    C -->|Tambah Setoran| D[Form Setoran]
    D --> E[Input: Nama Penitip, Tanggal Setor]
    E --> F[Tambah Item Setoran]
    F --> G[Input: Nama Barang, Jumlah, Catatan]
    G --> H{Tambah Lagi?}
    H -->|Ya| F
    H -->|Tidak| I[Simpan Setoran]
    I --> J[Status: Dititip]
    J --> B

    C -->|Pengambilan| K[Pilih Setoran]
    K --> L[Klik Ambil]
    L --> M[Konfirmasi Pengambilan]
    M -->|Batal| B
    M -->|Ya| N[Set Tanggal Ambil: Now]
    N --> O[Status: Diambil]
    O --> B

    C -->|Edit| P[Pilih Setoran]
    P --> Q[Form Edit]
    Q --> R[Update Data]
    R --> B

    C -->|Hapus| S[Pilih Setoran]
    S --> T[Konfirmasi Hapus]
    T -->|Batal| B
    T -->|Hapus| U[Hapus dari Database]
    U --> B
```

## 8. Flowchart Sistem Notifikasi

```mermaid
flowchart TD
    A[Scheduler: Jam 08:00] --> B[Jalankan loans:check-overdue]
    A --> C[Jalankan deposits:check-pickups]

    B --> D[Cari Pinjaman Terlambat]
    D --> E[Filter: Returned IS NULL]
    E --> F[Filter: Estimated Return Date < Now]
    F --> G{Ada Terlambat?}
    G -->|Ya| H[Kirim LoanOverdueNotification]
    H --> I[Simpan ke Database Notifications]
    I --> J[Tampilkan di Bell Icon]
    G -->|Tidak| K[Selesai]

    C --> L[Cari Setoran H-1]
    L --> M[Filter: Estimated Pickup Date = Besok]
    M --> N{Ada Setoran?}
    N -->|Ya| O[Kirim DepositPickupReminder]
    O --> P[Simpan ke Database Notifications]
    P --> Q[Tampilkan di Bell Icon]
    N -->|Tidak| R[Selesai]

    J --> S[User Buka Bell Icon]
    S --> T{Pilih Aksi}
    T -->|Tandai Dibaca| U[Update is_read: true]
    T -->|Tandai Semua Dibaca| V[Update Semua is_read: true]
    T -->|Lihat Semua| W[Buka Halaman Notifications]
    U --> X[Selesai]
    V --> X
    W --> X
```

## 9. Flowchart Login & Role Akses

```mermaid
flowchart TD
    A[User Login] --> B[Cek Role]

    B -->|Staff| C[Staff Dashboard]
    C --> D[Barang - Full Access]
    C --> E[Siswa - Full Access]
    C --> F[Peminjaman - Full Access]
    C --> G[Setoran - Full Access]
    C --> H[Data Master - Limited]
    C --> I[Pengguna - No Access]

    B -->|Proktor| J[Proktor Dashboard]
    J --> K[Barang - Full Access]
    J --> L[Siswa - Full Access]
    J --> M[Peminjaman - Full Access]
    J --> N[Setoran - Full Access]
    J --> O[Kategori - Full Access]
    J --> P[Jurusan - Full Access]
    J --> Q[Lokasi - Full Access]
    J --> R[Pengguna - Full Access]
    J --> S[Wali Kelas - Full Access]
    J --> T[Kelas - Full Access]
```

## 10. Flowchart Import Excel Siswa

```mermaid
flowchart TD
    A[Mulai] --> B[Klik Import Excel]
    B --> C[Pilih File Excel]
    C --> D{Validasi Format?}
    D -->|Gagal| E[Tampilkan Error]
    E --> C
    D -->|Berhasil| F[Parse File]
    F --> G[Deteksi Kolom]
    G --> H{Kolom Ditemukan?}
    H -->|Ya| I[Mapping Data]
    H -->|No| J[Error: Kolom Tidak Sesuai]
    J --> C

    I --> K[Loop per Baris]
    K --> L{NIS Sudah Ada?}
    L -->|Ya| M[Update Data Siswa]
    L -->|No| N[Buat Siswa Baru]
    M --> O[Generate Barcode]
    N --> O
    O --> P[Simpan ke Database]
    P --> Q{Baris Terakhir?}
    Q -->|Ya| R[Import Selesai]
    Q -->|No| K
    R --> S[Tampilkan Ringkasan]
    S --> T[Total: X Dibuat, Y Diupdate]
    T --> B
```
