function format1(item) { return { id: item.ma, data: [item.ma, item.ten] } }

export const formarters = {
  spFormat: (item) => ({
    id: item.ma,
    data: [item.ma, item.ten, item.thuonghieu, item.hedieuhanh, item.phienbanHDH, item.xuatxu]
  }),
  thuongHieu: format1,
  xuatXu: format1,
  hdh: format1,
  mauSac: format1,
  rom: format1,
  ram: format1,
}
