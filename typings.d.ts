interface Room {
  walls: number[] // { 1 = wall, 0 = door}
  xSize: number;
  ySize: number;
  index: number;
  print: () => void
}

interface Maze {
  rooms: RoomList
  mazeSize: number
}

type RoomList = (Room | null)[][]
