const KEY_LOCAL = "arrSinhVien";
let arrNhanVien = getDataNhanVienLocal();
renderNhanVien();

//lấy thông tin từ  form
function layDuLieuTuForm(form) {
  let formData = new FormData(form);
  let nhanVien = Object.fromEntries(formData);
  return nhanVien;
}
// save thông tin localstorage
function saveDataNhanVienLocal() {
  let dataString = JSON.stringify(arrNhanVien);
  localStorage.setItem(KEY_LOCAL, dataString);
}

//lấy thông tin localstorage
function getDataNhanVienLocal() {
  let dataLocal = localStorage.getItem(KEY_LOCAL); // chuỗi json
  return dataLocal ? JSON.parse(dataLocal) : [];
}

// Validate tài khoản
function validateTaiKhoan(tk) {
  if (!tk) {
    document.querySelector("#tbTKNV").innerHTML =
      "Tài khoản không được để trống";
    document.querySelector("#tbTKNV").style.display = "block";
    return false;
  }
  if (!/^\d{4,6}$/.test(tk)) {
    document.querySelector("#tbTKNV").innerHTML = "Tài khoản phải từ 4-6 ký số";
    document.querySelector("#tbTKNV").style.display = "block";
    return false;
  }
  document.querySelector("#tbTKNV").style.display = "none";
  return true;
}

// Validate tên nhân viên
function validateTen(name) {
  if (!name) {
    document.querySelector("#tbTen").innerHTML = "Tên không được để trống";
    document.querySelector("#tbTen").style.display = "block";
    return false;
  }
  if (!/^[a-zA-ZÀ-ỹ\s]+$/.test(name)) {
    document.querySelector("#tbTen").innerHTML = "Tên phải là chữ cái";
    document.querySelector("#tbTen").style.display = "block";
    return false;
  }
  document.querySelector("#tbTen").style.display = "none";
  return true;
}

// Validate email
function validateEmail(email) {
  if (!email) {
    document.querySelector("#tbEmail").innerHTML = "Email không được để trống";
    document.querySelector("#tbEmail").style.display = "block";
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.querySelector("#tbEmail").innerHTML = "Email không đúng định dạng";
    document.querySelector("#tbEmail").style.display = "block";
    return false;
  }
  document.querySelector("#tbEmail").style.display = "none";
  return true;
}

// Validate mật khẩu
function validateMatKhau(password) {
  if (!password) {
    document.querySelector("#tbMatKhau").innerHTML =
      "Mật khẩu không được để trống";
    document.querySelector("#tbMatKhau").style.display = "block";
    return false;
  }
  if (
    !/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/.test(
      password
    )
  ) {
    document.querySelector("#tbMatKhau").innerHTML =
      "Mật khẩu từ 6-10 ký tự, chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt";
    document.querySelector("#tbMatKhau").style.display = "block";
    return false;
  }
  document.querySelector("#tbMatKhau").style.display = "none";
  return true;
}

// Validate ngày làm
function validateNgayLam(ngaylam) {
  if (!ngaylam) {
    document.querySelector("#tbNgay").innerHTML =
      "Ngày làm không được để trống";
    document.querySelector("#tbNgay").style.display = "block";
    return false;
  }
  if (!/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/.test(ngaylam)) {
    document.querySelector("#tbNgay").innerHTML =
      "Ngày làm phải theo định dạng mm/dd/yyyy";
    document.querySelector("#tbNgay").style.display = "block";
    return false;
  }
  document.querySelector("#tbNgay").style.display = "none";
  return true;
}

// Validate lương cơ bản
function validateLuongCB(luongCB) {
  if (!luongCB) {
    document.querySelector("#tbLuongCB").innerHTML =
      "Lương cơ bản không được để trống";
    document.querySelector("#tbLuongCB").style.display = "block";
    return false;
  }
  if (luongCB < 1000000 || luongCB > 20000000) {
    document.querySelector("#tbLuongCB").innerHTML =
      "Lương cơ bản từ 1.000.000 - 20.000.000";
    document.querySelector("#tbLuongCB").style.display = "block";
    return false;
  }
  document.querySelector("#tbLuongCB").style.display = "none";
  return true;
}

// Validate chức vụ
function validateChucVu(chucvu) {
  if (!chucvu || chucvu === "0") {
    document.querySelector("#tbChucVu").innerHTML = "Vui lòng chọn chức vụ";
    document.querySelector("#tbChucVu").style.display = "block";
    return false;
  }
  document.querySelector("#tbChucVu").style.display = "none";
  return true;
}

// Validate giờ làm
function validateGioLam(gioLam) {
  if (!gioLam) {
    document.querySelector("#tbGiolam").innerHTML =
      "Giờ làm không được để trống";
    document.querySelector("#tbGiolam").style.display = "block";
    return false;
  }
  if (gioLam < 80 || gioLam > 200) {
    document.querySelector("#tbGiolam").innerHTML = "Giờ làm từ 80 - 200 giờ";
    document.querySelector("#tbGiolam").style.display = "block";
    return false;
  }
  document.querySelector("#tbGiolam").style.display = "none";
  return true;
}

// Validate
function validateForm() {
  let tk = document.querySelector("#tknv").value;
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;
  let ngaylam = document.querySelector("#datepicker").value;
  let luongCB = parseFloat(document.querySelector("#luongCB").value);
  let chucvu = document.querySelector("#chucvu").value;
  let gioLam = parseFloat(document.querySelector("#gioLam").value);

  let isValid = true;
  isValid = validateTaiKhoan(tk) && isValid;
  isValid = validateTen(name) && isValid;
  isValid = validateEmail(email) && isValid;
  isValid = validateMatKhau(password) && isValid;
  isValid = validateNgayLam(ngaylam) && isValid;
  isValid = validateLuongCB(luongCB) && isValid;
  isValid = validateChucVu(chucvu) && isValid;
  isValid = validateGioLam(gioLam) && isValid;

  return isValid;
}

//thêm nhân viên
document.querySelector("#formNhanVien").onsubmit = function (e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  let nhanVien = layDuLieuTuForm(e.target);
  arrNhanVien.push(nhanVien);
  saveDataNhanVienLocal();
  renderNhanVien();

  e.target.reset();
  $("#myModal").modal("hide");
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
        <td id="loaiNhanVien">${loaiNhanVien}</td>
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
  if (!emailUpdate) {
    alert("Vui lòng chọn nhân viên cần cập nhật!");
    return;
  }

  if (!validateForm()) {
    return;
  }

  let form = document.querySelector("#formNhanVien");
  let nhanvien = layDuLieuTuForm(form);

  let nhanvienindex = arrNhanVien.findIndex(
    (item) => item.email === emailUpdate
  );

  if (nhanvienindex !== -1) {
    arrNhanVien[nhanvienindex] = nhanvien;
    saveDataNhanVienLocal();
    renderNhanVien();

    form.reset();
    $("#myModal").modal("hide");

    document.querySelector("#btnThemNV").style.display = "block";
    document.querySelector("#btnCapNhat").style.display = "none";

    emailUpdate = null;

    alert("Cập nhật thông tin thành công!");
  }
};

//Xoá nhân viên
let emailDelete = null;
function handleDeleteNhanVien(email) {
  let nhanVienCanXoa = arrNhanVien.findIndex((item) => item.email === email);
  if (nhanVienCanXoa != -1) {
    arrNhanVien.splice(nhanVienCanXoa, 1);
    saveDataNhanVienLocal();
    renderNhanVien();
  }
}
//Tìm kiếm
// Tìm kiếm nhân viên theo loại
function searchByLoaiNhanVien() {
  let loaiValue = document
    .querySelector("#searchName")
    .value.replace(/\s+/g, "") // xoá khoảng trắng giữa các ký tự nếu có
    .trim()
    .toLowerCase();
  console.log("loaiValue", loaiValue);
  const normalizedLoaiValue = removeVietnameseTones(loaiValue.toLowerCase()); // Loại bỏ dấu từ loại tìm kiếm
  console.log("normalizedLoaiValue", normalizedLoaiValue);
  const filteredNhanVien = arrNhanVien.filter((nhanVien) => {
    let loai = handleXepLoaiNhanVien(nhanVien.gioLam); // Lấy loại nhân viên
    let loaiString =
      loai === 1
        ? "xuấtsắc"
        : loai === 2
        ? "giỏi"
        : loai === 3
        ? "khá"
        : "trung bình";
    loaiString = removeVietnameseTones(loaiString.trim().toLowerCase());

    return loaiString.toLowerCase().includes(normalizedLoaiValue);
  });
  renderNhanVien(filteredNhanVien);
}

// Gọi hàm tìm kiếm khi người dùng chọn loại nhân viên
document
  .querySelector("#searchName")
  .addEventListener("change", searchByLoaiNhanVien);
