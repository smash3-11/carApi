import {
	getData
} from "./http.js"
import {
	createBlock
} from "./ui.js"

let boxes = document.querySelectorAll('.box1')
let mainCont = document.querySelector('.container')

let youngers = []
let olders = []
let others = []

getData("/cars")
	.then(data => {
		for (let item of data.cars) {
			let y = new Date().getFullYear() - item.car_model_year

			if (y < 13) {
				youngers.push(item)
			} else if (y < 23) {
				olders.push(item)
			} else {
				others.push(item)
			}
		}

		createBlock(youngers, mainCont, "Less than 13 years")
		createBlock(olders, mainCont, "Less than 23 years")
		createBlock(others, mainCont, "Others")
	})