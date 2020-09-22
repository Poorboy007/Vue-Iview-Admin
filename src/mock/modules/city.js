import Mock from 'mockjs'
export const city = req => {
  let citys = []
  for (let i = 0; i < 10; i++) {
    let obj = {
      id: i + 1,
      city: Mock.Random.city(),
      color: Mock.Random.color()
    }
    citys.push(obj)
  }
  return { cityList: citys }
}
export const cityInfo = req => {
  const info = JSON.parse(req.body)
  return {
    img: Mock.Random.image('200x100', '#4A7BF7', info.name)
  }
}
