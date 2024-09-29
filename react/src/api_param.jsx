export const apiRoute = {
  thuongHieu: "/api/thuong-hieu/",
  // xuatXu: "/api/xuat-xu/",
  // hdh: "/api/he-dieu-hanh/",
  // ram: "/api/ram/",
  // rom: "/api/rom/",
  // mauSac: "/api/mau-sac/"
}

export const tableRoute = {
  // { ma, ten, trangthai }
  thuongHieu(item) { return { id: item.ma, data: [item.ma, item.ten] } }


}