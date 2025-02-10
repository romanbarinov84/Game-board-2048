// create width and high for board//
const GRID_SIZE = 4 // размер сетки (количество строк и столбцов).
const CELL_SIZE = 20 //размер каждой клетки (по сути, ее ширина и высота).
const CELL_GAP = 2 //промежуток между клетками, то есть отступ между ними.



// CSS переменные для управления размерами сетки и клеток

//Конструктор класса Grid
export default class Grid{
    #cells //благодаря такому подхолу вне конструктора мы несможем поменять значение
    constructor(gridElement){  // gridElement это id= game-board
        gridElement.style.setProperty("--grid-size",`${GRID_SIZE}`)// задаем количество строк и столбцов в сетке
        gridElement.style.setProperty("--cell-size",`${CELL_SIZE}vmin`)// размер ячейек 
        gridElement.style.setProperty("--grid-gap",`${CELL_GAP}vmin`)// размер отступов между ячейками
        this.cells = createCellElements(gridElement).map((cellElement, index )=> {
            return new Cell(cellElement,index % GRID_SIZE, Math.floor(index / GRID_SIZE))
        })
         
       
        
    }
}

// задаем класс для ячейки
class Cell{
    #cellElement // при попытке обратится к этим полям из вне приведет к ошибке
    #x
    #y
    constructor(cellElement, x, y){
        this.#cellElement = cellElement
        this.#x = x
        this.#y = y
    }
}


  // Создаем элементы в game-board
  function createCellElements(gridElement){
    const cells = []// создаем пустой массив для ячеек
    for(let i = 0; i < GRID_SIZE * GRID_SIZE; i++){
        const cell = document.createElement("div") // создаем новый div для каждой ячейки
        cell.classList.add("cell")// добавляем класс "cell" для стилей
        cells.push(cell)// добавляем ячейку в массив
        gridElement.append(cell)// добавляем ячейку в gridElement (на страницу)
    }
    return cells  // возвращаем массив всех ячеек
  }