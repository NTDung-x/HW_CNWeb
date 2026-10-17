/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

const oTimKiem = document.getElementById("o-tim-kiem");
const listTin = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const tinTieuDe = document.getElementById("tin-tieu-de");
const tinNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// Hàm cập nhật bộ đếm F1 và lọc tin F2 + F3
function capNhatLocVaBoDem() {
	const tuKhoa = oTimKiem.value.trim().toLowerCase();
	const danhSachLi = Array.from(listTin.querySelectorAll("li"));
	let soTinHien = 0;

	danhSachLi.forEach(li => {
		const h3 = li.querySelector("h3");
		const p = li.querySelector("p");
		const noiDungGop = ((h3 ? h3.textContent : "") + " " + (p ? p.textContent : "")).toLowerCase();

		if (tuKhoa === "" || noiDungGop.includes(tuKhoa)) {
			li.classList.remove("an");
			soTinHien++;
		} else {
			li.classList.add("an");
		}
	});

	// F1: Cập nhật bộ đếm
	boDem.textContent = `Đang hiển thị ${soTinHien}/${danhSachLi.length} tin`;

	// F3: Xử lý thông báo không tìm thấy
	if (soTinHien === 0) {
		khongThay.classList.remove("an");
		khongThay.textContent = `Không tìm thấy tin nào cho "${oTimKiem.value}"`;
	} else {
		khongThay.classList.add("an");
	}
}

capNhatLocVaBoDem();

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
oTimKiem.addEventListener("keyup", () => {
	capNhatLocVaBoDem();
});

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
listTin.addEventListener("click", (e) => {
	if (e.target && e.target.classList.contains("more")) {
		const nut = e.target;
		const li = nut.closest("li");
		const p = li ? li.querySelector("p") : null;

		if (p) {
			if (p.classList.contains("day-du")) {
				p.classList.remove("day-du");
				nut.textContent = "Read more >>";
			} else {
				p.classList.add("day-du");
				nut.textContent = "Thu gọn <<";
			}
		}
	}
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
nutDang.addEventListener("click", () => {
	const tieuDe = tinTieuDe.value;
	const noiDung = tinNoiDung.value;

	if (tieuDe.trim() === "" || noiDung.trim() === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const liMoi = document.createElement("li");

	const spanTime = document.createElement("span");
	spanTime.className = "time";
	spanTime.textContent = homNay();

	const h3 = document.createElement("h3");
	h3.textContent = tieuDe; 

	const p = document.createElement("p");
	p.textContent = noiDung;

	const btnMore = document.createElement("button");
	btnMore.type = "button";
	btnMore.className = "more";
	btnMore.textContent = "Read more >>";

	liMoi.append(spanTime, h3, p, btnMore);

	listTin.prepend(liMoi);

	tinTieuDe.value = "";
	tinNoiDung.value = "";
	baoLoi.textContent = "";

	capNhatLocVaBoDem();
});