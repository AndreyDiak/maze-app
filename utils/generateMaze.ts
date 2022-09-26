
class Room {
  // every room need to have at least 2 doors...
  public walls: number[] = []; // { 1 = wall, 0 = door}
  public xSize: number;
  public ySize: number;
  public index: number;

  constructor(xSize: number, ySize: number, walls: number[], index:number) {
    this.xSize = xSize,
    this.ySize = ySize,
    this.walls = walls,
    this.index = index;
  }
  
  print() {
    console.log(`Room ${this.index} ${this.xSize}x${this.ySize}`);
    console.log('walls: ' + this.walls);
    console.log('======')
  }

}

class Maze {
  public rooms: RoomList = [];
  public mazeSize: number;

  constructor(count: number) {
    this.mazeSize = count;

    let rooms: RoomList = Array(this.mazeSize).fill(Array(this.mazeSize).fill( null ));
    
    let i = Math.floor(Math.random() * this.mazeSize);
    let j = Math.floor(Math.random() * this.mazeSize);

    let prevDoorIndex = 0;
    
    for(let k = 0; k < this.mazeSize ** 2; k++) { // переписать в один цикл и просто добавить отдельные индексы...
      const availableCells = isCellAvailable(i, j, this.mazeSize, rooms); // [0,0,3] [1,1,2]

      if(!availableCells.length) {
        // если больше некуда ставить комнаты то мы просто выходим из цикла
        // НУЖНО ДОБАВИТЬ ПОСЛЕДНЮЮ КОМНАТУ!!!

        rooms = this.generateRoom(0, prevDoorIndex, i, j, k, rooms, true);

        console.log('Всего создано ' + (k+1) + ' комнат')
        this.rooms = rooms;

        for(let i = 0;i < this.mazeSize; i++) {
          let str = ''
          for(let j = 0; j < this.mazeSize; j++) {
            str += this.rooms[i][j] === null ? 'null ' : this.rooms[i][j]?.index + '    '
          }
          console.log(str);
          str = ''
        }
        
        return this;
      } else {
          // получаем номера стенок где можно создать дверь...
          const availableSidesToDoors = availableCells.map(cell => cell[2]); // [3, 2]
          // выбираем из доступных стенок одну и записываем её индекс
          const newDoorIndex = availableSidesToDoors[ Math.floor(Math.random() * availableSidesToDoors.length) ]; // [3]
          // сохраняем координаты для новой компнаты
          const newCoordinates = availableCells.filter(cell => cell[2] === newDoorIndex)[0];
          
          rooms = this.generateRoom(newDoorIndex, prevDoorIndex, i, j, k, rooms, false);
          
          // обновляем координаты для новой комнаты
          i = newCoordinates[0];
          j = newCoordinates[1];
        }
          // мы получаем на выходе массив [i, j, roomIndex]
          // 0 и 1 индексы показывают индексы комнаты на поле...
          // 2 элемент показывает индекс для создания новой двери в данную комнату...
        }

        // проверка есть ли куда делать выход из комнаты
        // если выхода нет то комната является финальной

        // ++0 - получаем размер поля NxN, который задан пользователем
            // начинаем генерацию комнат с поля [0][0]...
        // ++1 - узнаем остались ли еще ячейки для создания комнат
            // ++a - находим все соседние ячейки текущей ячейки комнаты
            // ++б - проверяем есть ли в ячейке комната
            // ++в - генерируем массив возможных ячейк для новой комнаты 
                // если все ячейки вокруг заняты, то заканчиваем создание лабиринта...
        // 2 - ++генерируем дверь на одной из стенок основываясь на данных из пункта 1(в)
        // 3 - ++создаем новую комнату
        // 4 - ++добавляем комнуту в лабиринт
        // 5 - ++обновляем индексы
        // 6 - ++переходим к пункту 1
        // 7 - рефакторинг багов
  }
  
  generateRoom(newDoorIndex: number, prevDoorIndex: number, i: number, j: number, k: number,  rooms: RoomList, isLastRoom: boolean) {
    let walls = [1, 1, 1, 1];
    if(!isLastRoom) {
      walls[newDoorIndex] = 0;
    }

    if(i !== 0 || j !== 0) {
      walls[prevDoorIndex] = 0;
    } 
    // обновляем индекс предыдущей комнаты
    if(!isLastRoom) {
      prevDoorIndex = newDoorIndex + 2 > 3 
        ? 4 - (newDoorIndex + 2) 
        : newDoorIndex + 2;
    }
    // создаем новую комнату и добавляем ее в лабиринт
    rooms = rooms.map((line, I) => line.map((row, J) => {
      if( I === i && J === j) {
        return new Room(3, 3, walls, k);
      }
      return rooms[I][J];
    }))
    return rooms;
  }

}

const isCellAvailable = (i: number, j: number, length: number, maze: RoomList) => {
  let cells = [];
  if (i - 1 >= 0)
    cells.push([i - 1, j, 0])
  if (i + 1 <= length - 1) 
    cells.push([i + 1, j, 2]);
  if (j - 1 >= 0) 
    cells.push([i, j - 1, 3]);
  if (j + 1 <= length - 1) 
    cells.push([i, j + 1, 1]);
  
  const availableCells = [];
  
  if(!!cells.length) {
    for (let i = 0; i < cells.length; i++) {
      if(maze[ cells[ i ][ 0 ] ][ cells[ i ][ 1 ] ] === null) {
        availableCells.push(cells[i]);
      }
    }
  }
  return availableCells;
}

// const isCellHaveARoom = (cells: number[], maze: Room[][]) => !!maze[cells[0]][cells[1]];

export const createNewMaze = (count: number) => {
  return new Maze(count);
}


