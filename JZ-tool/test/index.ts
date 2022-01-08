// 工具类的单元测试
const { expect } = require("chai")  
const { 
    dateFormat,
    dateStringFormat,
    hasOwn,
    toNumber,
    remove,
    throttle,
    debounce,
    formatSize,
    padZero,
    deepAssign,
    deepClone,
    getUuid
} = require('../lib/kstool.min.js')

function isRepeat(arr) {
    var hash = {}
    for (var i in arr) {
        if (hash[arr[i]]){
            return true
        }
        hash[arr[i]] = true
    }
    return false
}

describe("时间、日期格式化",function(){
    it("测试dateFormat",()=>{
        expect(dateFormat('YY-mm-dd', new Date())).to.equal('2020-12-21')
    })
    it("测试dateStringFormat",()=>{
        expect(dateStringFormat('YY-mm-dd HH:MM', '2017-11-30T10:41:44.651Z'))
        .to.equal('2017-11-30 10:41')
    })
})

describe("常用函数",function(){
    const fnObject = {
        id: 2,
        name: 'test',
        child: [{ cid: '125566' }, { cid: '5655' }],
    }
    it("测试hasOwn",()=>{
        expect(hasOwn(fnObject, 'id')).to.equal(true)
        expect(hasOwn(fnObject, 'cc')).to.equal(false)
        expect(hasOwn(fnObject, 'cid')).to.equal(false)
    })

    it("测试toNumber",()=>{
        expect(toNumber('3.15')).to.equal(3.15)
        expect(toNumber(3)).to.equal(3)
        expect(toNumber('3Ab')).to.equal(3.0)
        expect(toNumber('3Ab')).to.equal(parseInt('3'))
    })

    it("测试remove",()=>{
        const arr = [{ cid: '125566' }, { cid: '5655' }]
        remove(arr, { cid: '5655' }) // 对象无法remove
        const arr2 = ['125566', '5655']
        remove(arr2, '5655')
        console.log(arr)
        console.log(arr2)
    })

    it("测试throttle and debounce formatSize",()=>{
        let count = 0
        const resize = throttle(() => {
            console.log('datetime = ', new Date().getTime())
        }, 1000)
        const debounceClick = debounce(() => {
            console.log('debounceClick = ', new Date().getTime())
        }, 1000)
        let iHandle = setInterval(()=>{
            if (++count < 50) {
                console.log('iHandle = ', count)
                resize()
                debounceClick()
            }
            if (count > 10){
                console.log(count)
                resize()
                debounceClick()
                clearInterval(iHandle)
            }
        }, 300)
        expect(formatSize('333333')).to.equal('325.52KB')
    })

    
    it("测试padZero",()=>{
        expect(padZero(4, 3)).to.equal('004')
    })

    it("测试deepAssign",()=>{
        const to = {
            id: 1,
            name: '121',
            child: [
                { grade: 1 }
            ]
        }
        let from = {
            id: 2,
            school: '惠州市第三小学'
        }
        expect(deepAssign(to, from).id).to.equal(2)
        const dTo = to
        expect(deepClone(dTo).id).to.equal(2)
        expect(deepClone(dTo).school).to.equal('惠州市第三小学')
    })
    
    it("测试getUuid",()=>{
        const uArray = []
        uArray.push('asdsdjdjdj12389238923923')
        // 随机生成50w看是否会重复
        for(let i=0; i < 500000; i++) {
            uArray.push(getUuid())
        }
        const isOk = isRepeat(uArray)
        console.log(isOk, uArray[10000])
        // uArray.push('asdsdjdjdj12389238923923')
        expect(isOk).to.equal(false)
    })
})

const arr = [
    {a: 1, name: 'adad'},
    {a: 2, name: 'key', t: [{ c: 'aasfs'}]},
]
const arrClone = deepClone(arr)
console.log(JSON.stringify(arrClone))