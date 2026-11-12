/* Suara Kampus - halaman Buat Pengaduan
   Fitur: toggle menu, tab kategori, validasi form, hitung karakter, konfirmasi tiket. */

// ---------- Elemen yang dipakai ----------
const tombolMenu = document.querySelector("#menu-btn");
const menuUtama = document.querySelector("#menu-utama");
const tombolKategori = document.querySelectorAll("[data-kategori]");
const form = document.querySelector("#form-pengaduan");
const kronologi = document.querySelector("#kronologi");
const hitungKarakter = document.querySelector("#kronologi-hitung");
const bagianForm = document.querySelector("#bagian-form");
const kartuKonfirmasi = document.querySelector("#konfirmasi");

let nomorTerakhir = 24;          // tiket contoh sebelumnya: SK-024
let kategoriAktif = "absensi";   // kategori yang sedang dipilih

// ---------- Toggle menu (aria-expanded diperbarui sesuai keadaan) ----------
tombolMenu.addEventListener("click", () => {
  const terbuka = tombolMenu.getAttribute("aria-expanded") === "true";
  tombolMenu.setAttribute("aria-expanded", String(!terbuka));
  menuUtama.classList.toggle("nav--terbuka", !terbuka);
});

// ---------- Tab kategori (membaca data-kategori lewat dataset) ----------
tombolKategori.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    kategoriAktif = tombol.dataset.kategori;
    tombolKategori.forEach((t) => {
      const aktif = t === tombol;
      t.setAttribute("aria-pressed", String(aktif));
      t.classList.toggle("tombol--utama", aktif);
      t.classList.toggle("tombol--sekunder", !aktif);
    });
    // Placeholder menyesuaikan kategori
    document.querySelector("#judul").placeholder =
      kategoriAktif === "absensi" ? "Kehadiran belum tercatat" : "Nilai UTS tidak sesuai";
  });
});

// ---------- Hitung karakter kronologi ----------
kronologi.addEventListener("input", () => {
  hitungKarakter.textContent = kronologi.value.length + " karakter (min. 20)";
});

// ---------- Validasi ----------
// Mengembalikan teks galat untuk satu kolom, atau "" bila valid.
function pesanGalat(input) {
  if (input.validity.valueMissing) return "Kolom ini wajib diisi.";
  if (input.validity.typeMismatch) return "Format email tidak valid. Contoh: nama@kampus.ac.id";
  if (input.validity.tooShort) return "Isi minimal 20 karakter agar petugas memahami kejadiannya.";
  return "";
}

// Menampilkan atau menghapus pesan galat pada kolom
function perbaruiGalat(input) {
  const elemenGalat = document.querySelector("#" + input.id + "-error");
  const pesan = pesanGalat(input);
  // textContent (bukan innerHTML) agar aman dari XSS
  elemenGalat.textContent = pesan;
  input.setAttribute("aria-invalid", String(pesan !== ""));
  return pesan === "";
}

// Validasi ulang saat pengguna meninggalkan kolom
form.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("blur", () => perbaruiGalat(input));
});

// ---------- Kirim form ----------
form.addEventListener("submit", (event) => {
  event.preventDefault(); // cegah kirim dan muat ulang halaman

  const kolom = Array.from(form.querySelectorAll("input, textarea"));
  const hasil = kolom.map(perbaruiGalat);

  if (hasil.includes(false)) {
    // Fokus ke kolom pertama yang salah
    kolom[hasil.indexOf(false)].focus();
    return;
  }

  nomorTerakhir += 1;
  tampilkanKonfirmasi("SK-" + String(nomorTerakhir).padStart(3, "0"));
});

function tampilkanKonfirmasi(nomor) {
  const nama = kategoriAktif === "absensi" ? "Kendala absensi" : "Koreksi nilai";
  document.querySelector("#nomor-tiket").textContent = nomor;
  document.querySelector("#ringkasan-tiket").textContent =
    nama + " • " + form.matkul.value + " • " + form.judul.value;

  bagianForm.hidden = true;
  kartuKonfirmasi.hidden = false;
  kartuKonfirmasi.querySelector("h2").tabIndex = -1;
  kartuKonfirmasi.querySelector("h2").focus(); // pindahkan fokus agar pembaca layar tahu
}

// ---------- Buat pengaduan baru ----------
document.querySelector("#buat-lagi").addEventListener("click", () => {
  form.reset();
  hitungKarakter.textContent = "0 karakter (min. 20)";
  form.querySelectorAll("[aria-invalid]").forEach((i) => i.removeAttribute("aria-invalid"));
  kartuKonfirmasi.hidden = true;
  bagianForm.hidden = false;
  document.querySelector("#matkul").focus();
});
