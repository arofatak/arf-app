
function convertTanggal($date) {
    var tgl = Date.parse($date)
    // var hari
    var hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jum&#39;at', 'Sabtu'];
    var bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    //Value Date
    var tanggal = new tgl.getDate();
    var _hari = new tgl.getDay();
    var _bulan = new tgl.getMonth();
    var _tahun = new tgl.getFullYear();
    
    var hari = hari[_hari];
    var bulan = bulan[_bulan];
    // kondisi tahun
    var tahun = (_tahun < 1000) ? _tahun + 1900 : _tahun;
    
    $date = hari.concat(', ', bulan, ' ', tahun);
    return $date;
}