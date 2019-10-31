// 把信息存到localStorage
function saveLocal(keyname, info) {
    localStorage.setItem(keyname, JSON.stringify(info))
}

// 从localStorage读取信息
function loadLocal(keyname) {
    const infoJSON = localStorage.getItem(keyname)

    try {
        return infoJSON ? JSON.parse(infoJSON) : null
    } catch (e) {
        return null
    }
}

// 删除localStorage里的信息
function removeLocal(keyname) {
    localStorage.removeItem(keyname)
}


export const local = {
    saveLocal,
    loadLocal,
    removeLocal
}