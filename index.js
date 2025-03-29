const KEY_LOCAL = "arrSinhVien";
let arrNhanVien = getDataNhanVienLocal();
renderNhanVien();

//lay thong tin tu form
function layDuLieuTuForm(form) {
  let formData = new FormData(form);
  let nhanVien = Object.fromEntries(formData);
  return nhanVien;
}
// save thong tin localstorage
function saveDataNhanVienLocal() {
  let dataString = JSON.stringify(arrNhanVien);
  localStorage.setItem(KEY_LOCAL, dataString);
}

//lay thong tin localstorage
function getDataNhanVienLocal() {
  let dataLocal = localStorage.getItem(KEY_LOCAL); // chuỗi json
  return dataLocal ? JSON.parse(dataLocal) : [];
}

//them nhan vien
document.querySelector("#formNhanVien").onsubmit = function (e) {
  e.preventDefault();
  let nhanVien = layDuLieuTuForm(e.target);
  arrNhanVien.push(nhanVien);
  saveDataNhanVienLocal();
  renderNhanVien();

  e.target.reset();
};

//tim chuc vu
function handleTinhLuongTheoChucVu(cv, lcb) {
  let tongluong = 0;
  switch (cv) {
    case 1:
      tongluong = lcb * 3;
    case 2:
      tongluong = lcb * 2;
    case 3:
      tongluong = lcb * 1;
    default:
      break;
  }
  return tongluong;
}

//xep loai nhan vien
function handleXepLoaiNhanVien(timeWork) {
  if (timeWork >= 192) {
    return 1;
  } else if (timeWork >= 176) {
    return 2;
  } else if (timeWork >= 160) {
    return 3;
  } else {
    return 4;
  }
}

function renderNhanVien(arr = arrNhanVien) {
  let content = "";
  for (let nhanVien of arr) {
    let { tk, name, email, ngaylam, luongCB, chucvu, gioLam } = nhanVien;
    let tongluong = handleTinhLuongTheoChucVu(chucvu, luongCB);
    console.log(tongluong);
    let loaiNhanVien = null;
    if (handleXepLoaiNhanVien(gioLam) === 1) {
      loaiNhanVien = "Xuất sắc";
    } else if (handleXepLoaiNhanVien(gioLam) === 2) {
      loaiNhanVien = "Giỏi";
    } else if (handleXepLoaiNhanVien(gioLam) === 3) {
      loaiNhanVien = "Khá";
    } else {
      loaiNhanVien = "Trung Bình";
    }
    content += `
    <tr>
        <td>${tk}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${ngaylam}</td>
        <td>${chucvu}</td>
        <td>${tongluong}</td>
        <td>${loaiNhanVien}</td>
    </tr>
    `;
  }

  document.querySelector("#tableDanhSach").innerHTML = content;
}

function handleAddNhanVien() {}
function handleUpdateNhanVien() {}
function handleDeleteNhanVien() {}
function handleSearchNhanVien() {}
