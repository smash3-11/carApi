export function createBlock(arr, place, title) {

    let limit = 4

    function getBtnText() {
        return arr.length - limit > 12 ? "Показать ещё 12" : `Показать ещё ${arr.length - limit}`
    }
    let container = document.createElement('div')
    let title_view = document.createElement('h2')
    let box = document.createElement('div')
    let paginate = document.createElement('div')
    let left = document.createElement('div')
    let show_more_btn = document.createElement('button')

    container.classList.add('c')
    title_view.classList.add('title')
    box.classList.add('box1')
    paginate.classList.add('paginate')
    left.classList.add('left')
    show_more_btn.classList.add('show_more')

    title_view.innerHTML = title
    show_more_btn.innerHTML = getBtnText()

    container.append(title_view, box, paginate)
    paginate.append(left)
    left.append(show_more_btn)

    place.append(container)

    reload(arr.slice(0,limit), box)

    show_more_btn.onclick = () => {
        if(show_more_btn.innerText === 'скрыть') {
            limit = 4
            reload(arr.slice(0,limit), box)
            show_more_btn.innerHTML = getBtnText()
            return
        }

        if((arr.length - limit) > 12 ) {
            reload(arr.slice(0,limit + 12), box)
            limit += 12
            show_more_btn.innerHTML = getBtnText()
        } else {
            reload(arr, box)
            show_more_btn.innerHTML = "скрыть"
        }
    }
}

function reload(arr, box) {
    box.innerHTML = ""

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