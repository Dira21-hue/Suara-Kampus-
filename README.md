# Suara Kampus - Halaman Buat Pengaduan

Implementasi halaman **Buat Pengaduan** dari wireframe Suara Kampus (Tugas 1, mata kuliah Pemrograman Frontend). Halaman ini memungkinkan mahasiswa mengajukan keluhan akademik (kendala absensi atau koreksi nilai) dan melihat nomor tiket setelah mengirim. Data bersifat simulasi dan tidak terhubung ke sistem kampus.

## Struktur Proyek
```
suara-kampus/
├── index.html   # struktur HTML semantik
├── styles.css   # tampilan, custom property, responsif
├── script.js    # interaktivitas (toggle menu, tab, validasi, konfirmasi)
└── README.md
```

## Komponen Utama
1. Header dan navigasi (toggle menu di ponsel, `aria-expanded`)
2. Tab kategori (Kendala absensi / Koreksi nilai)
3. Formulir pengaduan dengan validasi
4. Panel informasi "Sebelum mengirim"
5. Kartu konfirmasi tiket

## Cara Menjalankan
Buka `index.html` di browser, atau jalankan server lokal:
```
python3 -m http.server 8000
```
lalu buka `http://localhost:8000`.

## Catatan Teknis
- Warna dan spacing dipusatkan lewat custom property di `styles.css` (skala spacing 8 px).
- Validasi memakai Constraint Validation API; pesan galat dihubungkan dengan `aria-describedby`.
- Teks pengguna ditampilkan dengan `textContent` agar aman dari XSS.
- Gaya fokus keyboard memakai `:focus-visible`.
