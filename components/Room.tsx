
type Props = {
  room: Room
}

function Room({room}: Props) {
  console.log(room && room)
  return (
    <div className="border border-gray-200 w-[70px] h-[70px]
    flex flex-row items-center justify-center">
      {!!room? room.index : ''}
      {room && room.walls.map((wall, i) => {
        return (
          <>
            {Array(room.xSize).fill(null).map((block, j) => {
              // i - index of wall side 
              // j - index of block in the wall
              // wall - 0/1 - [0 - door] / [1 - wall]
              return (
                <div className="">

                </div>
              )
            })}
          </>
        )
      })}
    </div>
  )
}

export default Room