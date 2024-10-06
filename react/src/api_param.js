const url = "https://pi7g97bfph.execute-api.ap-southeast-1.amazonaws.com/api"

export const apiRoute = {
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

const headers = { "Content-Type": "application/json", }
export const thuocTinhAPI = {
  async selectOne() {
    return []
  },
  async selectAll(table) {
    return fetch(apiRoute[table])
      .then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
  async insert(table, body = {}) {
    return fetch(apiRoute[table], { method: "PUT", headers, body: JSON.stringify(body) })
      .then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
  async update(table, body = {}) {
    return fetch(apiRoute[table], { method: "POST", headers, body: JSON.stringify(body) })
      .then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
  async delete(table, body = {}) {
    return fetch(apiRoute[table], { method: "DELETE", headers, body: JSON.stringify(body) })
      .then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
}


export const sanphamAPI = {
  async selectOne({ ma }) {
    return fetch(`${apiRoute.sp}?ma=${ma}`, { method: "GET", headers })
      .then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
  async selectAll() {
    return fetch(apiRoute.sp).then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
  async insert({ ma, ten, xuatXu, cpu, pin, manHinh, camTruoc, camSau, hdh, pbHDH, tgBH, thuongHieu, hinhAnh }) {
    return fetch(apiRoute.sp, {
      method: "PUT",
      headers,
      body: JSON.stringify({ ma, ten, xuatXu, cpu, pin, manHinh, camTruoc, camSau, hdh, pbHDH, tgBH, thuongHieu, hinhAnh })
    }).then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
  async update({ ma, ten, xuatXu, cpu, pin, manHinh, camTruoc, camSau, hdh, pbHDH, tgBH, thuongHieu, hinhAnh }) {
    return fetch(apiRoute.sp, {
      method: "POST",
      headers,
      body: JSON.stringify({ ma, ten, xuatXu, cpu, pin, manHinh, camTruoc, camSau, hdh, pbHDH, tgBH, thuongHieu, hinhAnh })
    }).then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
  async delete({ ma }) {
    return fetch(apiRoute.sp, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ ma })
    }).then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
}


export const cauHinhAPI = {
  async selectOne({ maSP, ma }) {
    return fetch(`${apiRoute.cauHinh}?maSP=${maSP}&ma=${ma}`)
      .then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
  async selectAll({ maSP }) {
    return fetch(`${apiRoute.cauHinh}?maSP=${maSP}`)
      .then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
  async insert({ ma, maSP, rom, ram, mauSac, giaNhap, giaXuat }) {
    return fetch(apiRoute.cauHinh, {
      method: "PUT",
      headers,
      body: JSON.stringify({ ma, maSP, rom, ram, mauSac, giaNhap, giaXuat })
    }).then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
  async update({ ma, maSP, rom, ram, mauSac, giaNhap, giaXuat }) {
    return fetch(apiRoute.cauHinh, {
      method: "POST",
      headers,
      body: JSON.stringify({ ma, maSP, rom, ram, mauSac, giaNhap, giaXuat })
    }).then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
  async delete({ ma }) {
    return fetch(apiRoute.cauHinh, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ ma })
    }).then(a => a.json()).catch(a => ({ body: [], message: "Fail" }))
  },
}