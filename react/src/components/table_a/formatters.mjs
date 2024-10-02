function format1(item) {
  return { id: item.ma, data: [item.ma, item.ten] }
}

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
  cauHinh: (item, i) => ({
    id: item.ma,
    data: [i + 1, item.ram, item.rom, item.mausac, item.gianhap, item.giaxuat]
  })
}
