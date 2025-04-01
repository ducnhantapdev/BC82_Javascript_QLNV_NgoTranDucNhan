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
      break;
    case 2:
      tongluong = lcb * 2;
      break;
    case 3:
      tongluong = lcb * 1;
      break;
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

//Tim Chuc vu
function handleTimChucVu(cv) {
  let tencv = null;
  switch (cv) {
    case 1:
      tencv = "Sếp";
      break;
    case 2:
      tencv = "Trưởng phòng";
      break;
    case 3:
      tencv = "Nhân viên";
      break;
    default:
      break;
  }
  return tencv;
}

function renderNhanVien(arr = arrNhanVien) {
  let content = "";
  for (let nhanVien of arr) {
    let { tk, name, email, ngaylam, luongCB, chucvu, gioLam } = nhanVien;
    // Chuyển đổi luongCB thành số
    luongCB = parseFloat(luongCB);
    chucvu = parseFloat(chucvu);
    let tongluong = handleTinhLuongTheoChucVu(chucvu, luongCB);
    let cv = handleTimChucVu(chucvu);

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
        <td>${cv}</td>
        <td>${tongluong}</td>
        <td>${loaiNhanVien}</td>
        <td class="d-flex col-12 ">
          <button
              class="btn btn-primary mr-2"
              id="btnSua"
              data-toggle="modal"
              data-target="#myModal"
              onclick="handleUpdateNhanVien('${email}')"
          >
                    Sửa
          </button>
        <button class="btn btn-danger btnXoa" onclick="handleDeleteNhanVien('${email}')">Xoá</button>
        
        </td>
    </tr>
    `;
  }

  document.querySelector("#tableDanhSach").innerHTML = content;
}
let emailUpdate = null;
function handleUpdateNhanVien(email) {
  // Lưu email của nhân viên cần sửa
  emailUpdate = email;

  // Tìm nhân viên trong mảng
  let nhanvienindex = arrNhanVien.findIndex((item) => item.email === email);

  if (nhanvienindex !== -1) {
    let nhanVien = arrNhanVien[nhanvienindex];

    // Hiển thị thông tin lên form
    document.querySelector("#tknv").value = nhanVien.tk;
    document.querySelector("#name").value = nhanVien.name;
    document.querySelector("#email").value = nhanVien.email;
    document.querySelector("#password").value = nhanVien.password;
    document.querySelector("#datepicker").value = nhanVien.ngaylam;
    document.querySelector("#luongCB").value = nhanVien.luongCB;
    document.querySelector("#chucvu").value = nhanVien.chucvu;
    document.querySelector("#gioLam").value = nhanVien.gioLam;

    // Ẩn nút thêm, hiện nút cập nhật
    document.querySelector("#btnThemNV").style.display = "none";
    document.querySelector("#btnCapNhat").style.display = "block";
  }
}

document.querySelector("#btnCapNhat").onclick = function () {
  // Kiểm tra xem có email cần cập nhật không
  if (!emailUpdate) {
    alert("Vui lòng chọn nhân viên cần cập nhật!");
    return;
  }

  // Lấy thông tin từ form
  let form = document.querySelector("#formNhanVien");
  let nhanvien = layDuLieuTuForm(form);

  // Tìm vị trí nhân viên cần cập nhật
  let nhanvienindex = arrNhanVien.findIndex(
    (item) => item.email === emailUpdate
  );

  if (nhanvienindex !== -1) {
    // Cập nhật thông tin
    arrNhanVien[nhanvienindex] = nhanvien;

    // Lưu vào localStorage
    saveDataNhanVienLocal();

    // Render lại bảng
    renderNhanVien();

    // Reset form và ẩn modal
    form.reset();
    $("#myModal").modal("hide");

    // Reset lại trạng thái nút
    document.querySelector("#btnThemNV").style.display = "block";
    document.querySelector("#btnCapNhat").style.display = "none";

    // Reset emailUpdate
    emailUpdate = null;

    alert("Cập nhật thông tin thành công!");
  }
};

let emailDelete = null;
function handleDeleteNhanVien(email) {
  let nhanVienCanXoa = arrNhanVien.findIndex((item) => item.email === email);
  if (nhanVienCanXoa != -1) {
    arrNhanVien.splice(nhanVienCanXoa, 1);
    saveDataNhanVienLocal();
    renderNhanVien();
  }
}
