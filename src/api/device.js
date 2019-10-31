import axios from '../function/axioshttp'


/**
* 获取该用户所有设备
* @param item 分页/排序/查询信息
*/
async function index(item) {
  const url = '/api/v1/devices/index'
  const result = await axios.post(url, item);
  return result
}

/**
* 添加设备
* @param item 设备信息
*/
async function create(item) {
  const url = '/api/v1/devices/create'
  const result = await axios.post(url, item);
  return result
}

/**
* 更新设备
* @param item 设备信息和设备ID
*/
async function update(item) {
  const url = '/api/v1/devices/update'
  const result = await axios.post(url, item)
  return result
}

/**
* 查询设备
* @param item 设备ID
*/
async function retrieve(item) {
  const url = '/api/v1/devices/retrieve'
  const result = await axios.post(url, { id: item });
  return result
}

/**
* 删除设备
* @param item 设备ID
*/
async function del(item) {
  const url = '/api/v1/devices/del'
  const result = await axios.post(url, { id: item });
  return result
}

export const deviceService = {
  index,
  create,
  retrieve,
  update,
  del
}