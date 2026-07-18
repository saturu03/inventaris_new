# ERD (Entity Relationship Diagram)

## Diagram ERD Lengkap

```mermaid
erDiagram
    users {
        int id PK
        string name
        string email UK
        string password
        string role
        timestamp email_verified_at
        string two_factor_secret
        text two_factor_recovery_codes
        timestamp created_at
        timestamp updated_at
    }

    categories {
        int id PK
        string name
        timestamp created_at
        timestamp updated_at
    }

    locations {
        int id PK
        string name
        timestamp created_at
        timestamp updated_at
    }

    majors {
        int id PK
        string full_name
        string alias
        timestamp created_at
        timestamp updated_at
    }

    classes {
        int id PK
        enum level
        timestamp created_at
        timestamp updated_at
    }

    items {
        int id PK
        string name
        int category_id FK
        int location_id FK
        enum status
        enum condition
        text spec
        string barcode UK
        string photo
        timestamp created_at
        timestamp updated_at
    }

    students {
        int id PK
        int major_id FK
        int class_id FK
        string name
        string nis UK
        enum gender
        text address
        string barcode UK
        string phone
        string photo
        timestamp created_at
        timestamp updated_at
    }

    loans {
        int id PK
        int item_id FK
        int user_out_id FK
        int user_in_id FK
        int student_id FK
        string borrower_name
        string borrower_role
        string collateral_type
        datetime borrower_date
        datetime estimated_return_date
        datetime returned
        timestamp created_at
        timestamp updated_at
    }

    deposits {
        int id PK
        int user_id FK
        string depositor_name
        string depositor_phone
        datetime deposit_date
        datetime estimated_pickup_date
        datetime pickup_date
        string status
        text notes
        timestamp created_at
        timestamp updated_at
    }

    deposit_items {
        int id PK
        int deposit_id FK
        string item_name
        int quantity
        text notes
        timestamp created_at
        timestamp updated_at
    }

    homeroom_teachers {
        int id PK
        string name
        int major_id FK
        int class_id FK
        string phone
        timestamp created_at
        timestamp updated_at
    }

    schools {
        int id PK
        string school_name
        string school_address
        timestamp created_at
        timestamp updated_at
    }

    users ||--o{ loans : "memproses pinjam (user_out)"
    users ||--o{ loans : "memproses kembali (user_in)"
    users ||--o{ deposits : "membuat setoran"

    categories ||--o{ items : "memiliki"
    locations ||--o{ items : "menyimpan"

    items ||--o{ loans : "dipinjam"

    majors ||--o{ students : "memiliki"
    classes ||--o{ students : "masuk"

    students ||--o{ loans : "meminjam"

    majors ||--o{ homeroom_teachers : "wali kelas"
    classes ||--o{ homeroom_teachers : "wali kelas"

    deposits ||--o{ deposit_items : "memiliki item"
```

## Hubungan Antar Tabel

| Tabel Asal | Relasi | Tabel Tujuan | Keterangan |
|------------|--------|--------------|------------|
| users | 1:* | loans | User memproses peminjaman (user_out) |
| users | 1:* | loans | User memproses pengembalian (user_in) |
| users | 1:* | deposits | User membuat setoran |
| categories | 1:* | items | Satu kategori memiliki banyak barang |
| locations | 1:* | items | Satu lokasi menyimpan banyak barang |
| items | 1:* | loans | Satu barang dipinjam banyak kali |
| majors | 1:* | students | Satu jurusan memiliki banyak siswa |
| classes | 1:* | students | Satu kelas memiliki banyak siswa |
| students | 1:* | loans | Satu siswa meminjam banyak kali |
| majors | 1:* | homeroom_teachers | Satu jurusan punya wali kelas |
| classes | 1:* | homeroom_teachers | Satu kelas punya wali kelas |
| deposits | 1:* | deposit_items | Satu setoran punya banyak item |
