export const resetObjToPrimitiveType = (obj) => {
    if(obj?.constructor === Object) {
        Object.keys(obj).forEach(item => {
            obj[item] = ''
        })
    }else {
        obj = ''
    }
}
