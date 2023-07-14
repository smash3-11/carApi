// https://myfakeapi.com/api/cars/

const BASE_URL = 'https://myfakeapi.com/api'

let box1 = document.querySelector('.box1')
let box2 = document.querySelector('.box2')
let box3 = document.querySelector('.box3')
let boxAll = document.querySelector('.box_all')

let hadeBtn = document.querySelectorAll('.btn_hate')
let showBtn = document.querySelectorAll('.show_more')


const getData = async (path) => {
  try {
    const res = await fetch(BASE_URL + path)
    const data = await res.json()
    console.log(data)
    console.log(data.cars)
    return data
  } catch (error) {
    console.log(error)
    return []
  }
}

getData("/cars")
  .then(data => reload(data.cars))

function reload(arr) {
  box1.innerHTML = ""
  box2.innerHTML = ""
  box3.innerHTML = ""
  boxAll.innerHTML = ""

  const currentYear = new Date().getFullYear()
  const initialCount = 4 // Изначальное количество машин
  const additionalCount = 12 // Количество машин для показа по кнопке "Показать ещё"

  const last2YearsCars = arr.filter(item => currentYear - item.car_model_year <= 15)
  const last5YearsCars = arr.filter(item => currentYear - item.car_model_year <= 17)
  const last10YearsCars = arr.filter(item => currentYear - item.car_model_year <= 20)

  populateBox(last2YearsCars.slice(0, initialCount), box1)
  populateBox(last5YearsCars.slice(0, initialCount), box2)
  populateBox(last10YearsCars.slice(0, initialCount), box3)
  populateBox(arr.slice(0, initialCount), boxAll)


box1.onclick =() => {
	showMoreCars(arr, box1, additionalCount)
  }
  
  box2.onclick =() => {
	showMoreCars(arr, box2, additionalCount)
  }
  
  box3.onclick =() => {
	showMoreCars(arr, box3, additionalCount)
  }
  
  boxAll.onclick =() => {
	showMoreCars(arr, boxAll, additionalCount)
  }

}

function populateBox(arr, box) {
  for (let item of arr) {
    let div = document.createElement("div")
    let h3 = document.createElement("h3")
    let p_v = document.createElement("p")
    let p_y = document.createElement("p")
    let span_v = document.createElement("span")
    let span_y = document.createElement("span")
    let btn = document.createElement("button")
    let a = document.createElement("a")

    div.classList.add("item")
    btn.classList.add("btn_more")

    h3.innerHTML = ` ${item.car_model} - ${item.car}`
    p_v.innerHTML = item.car_vin
    span_v.innerHTML = "Vin: "
    p_y.innerHTML = item.car_model_year
    span_y.innerHTML = "Year: "
    a.innerHTML = "Подробнее"

    box.append(div)
    div.append(h3, p_v, p_y, btn)
    p_v.prepend(span_v)
    p_y.prepend(span_y)
    btn.append(a)
  }
}

function showMoreCars(arr, box, count) {
  const visibleCars = box.querySelectorAll('.item').length
  const carsToAdd = arr.slice(visibleCars, visibleCars + count)

  populateBox(carsToAdd, box)
}

function hideCars(box, count) {
  const carsToHide = box.querySelectorAll('.item')

  for (let i = carsToHide.length - 1; i >= count; i--) {
    carsToHide[i].remove()
  }
}

