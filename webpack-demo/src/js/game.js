let gameitem = document.getElementsByClassName("game");

let compare = {}

let clickNum = 0

let keys = []

function gameStart() {

    for (let i = 0; i < gameitem.length; i++) {
        gameitem[i].addEventListener("click", () => {
            gameitem[i].style.backgroundColor = gameitem[i].getAttribute("data-color")

            compare[i] = gameitem[i].getAttribute("data-color")

            clickNum++;

            if (clickNum == 2) {
                keys = Object.keys(compare)
                let first = gameitem[keys[0]]
                let second = gameitem[keys[1]]

                if (compare[keys[0]] == compare[keys[1]]) {
                    // first.parentNode.removeChild(first)
                    // second.parentNode.removeChild(second)
                    first.style.opacity = 0
                    second.style.opacity = 0

                    clickNum = 0
                    compare = {}
                } else {
                    setTimeout(() => {
                        first.style.backgroundColor = "transparent"
                        second.style.backgroundColor = "transparent"
                        clickNum = 0
                        compare = {}
                    }, 500)

                }
            }
        })
    }
}

gameStart()


let obj = {
    name:"monkey",
    age:19
}

// entries 对象转换为 键值对列表
console.log(Object.entries(obj))

console.log(Object.keys(obj))


// fromEntries  键值对列表转换为 对象
let arr = [["name","king"],["age","999"]]
console.log(Object.fromEntries(arr));
