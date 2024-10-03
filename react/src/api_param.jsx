const url = "https://zd52ipcrb1.execute-api.ap-southeast-1.amazonaws.com/data"
// const dev = import.meta.env.MODE
export const apiRoute = {
  url,
  thuongHieu: url + "/thuoc-tinh?table=thuonghieu",
  xuatXu: url + "/thuoc-tinh?table=xuatxu",
  hdh: url + "/thuoc-tinh?table=hedieuhanh",
  mauSac: url + "/thuoc-tinh?table=mausac",
  ram: url + "/thuoc-tinh?table=ram",
  rom: url + "/thuoc-tinh?table=rom",
  thuocTinh: url + "/thuoc-tinh",
  sp: url + "/san-pham",
  cauHinh: url + "/cau-hinh",
}
