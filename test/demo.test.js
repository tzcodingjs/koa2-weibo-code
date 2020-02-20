
/**
 * @description 测试用例（测试函数）
 */

function sum (a, b){
    return a + b
}

 test('test demo 1', () => {
     const res = sum(10, 20)
     expect(res).toBe(30)
 })