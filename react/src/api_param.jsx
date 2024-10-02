export const apiRoute = {
  url: "https://zd52ipcrb1.execute-api.ap-southeast-1.amazonaws.com/data",
  thuongHieu: "/api/thuoc-tinh?table=thuonghieu",
  xuatXu: "/api/thuoc-tinh?table=xuatxu",
  hdh: "/api/thuoc-tinh?table=hedieuhanh",
  mauSac: "/api/thuoc-tinh?table=mausac",
  ram: "/api/thuoc-tinh?table=ram",
  rom: "/api/thuoc-tinh?table=rom",
  thuocTinh: "/api/thuoc-tinh",
  sp: "/api/san-pham",
  cauHinh: "/api/cau-hinh",
}

export const apiMethod = {
  get: "GET",
  put: "PUT",
  post: "POST",
  delete: "DELETE",
}

export const apiFuncs = {
  getThuocTinh: () => fetch(apiRoute.thuocTinh).then(a => a.json()),
  getSanPham: () => fetch(apiRoute.sp).then(a => a.json())
}