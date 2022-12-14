import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Room from '../components/Room';
import { createNewMaze } from '../utils/generateMaze';

const Home: NextPage = () => {

  const [count, setCount] = useState<number>(0)
  const [maze, setMaze] = useState<Maze>()
  const generateMaze = () => {
    const maze = createNewMaze(count);
    setMaze(maze);
  }
  
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="p-2 border-b border-gray-400 text-center">
        <p className="mb-2">Введите размер поля...</p>
        <p className="text-gray-700 text-sm text-italic mb-2">
          Минимально: {' '}
          <span className="text-red-500 font-bold">2</span>,
          Максимально: {' '}
          <span className="text-red-500 font-bold">10</span>
        </p>
        <div className="">
          <input
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value) || 0)}
            type="text"
            className='border border-red-400 rounded-md outline-red-500'
            placeholder='Enter the Maze size...'
          />
        </div>
        <div className="mt-2">
          {count > 1 && count < 11 && (
            <div>
              <button className="bg-gray-500 text-white 
              rounded-sm px-3 py-1 cursor-pointer hover:bg-gray-700"
                onClick={generateMaze}
              >
                Сгенерировать
              </button>
            </div>
          )}
        </div>
      </div>
      {!!maze?.rooms.length && (
        <div className='flex justify-center items-center h-full py-16'>
          <div className="">
            {maze.rooms.map((line, i) => {
            return (
              <div className='flex flex-row'>
                {line.map((room, j) => <Room room={room as Room}/>)}
              </div>
            )
          })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
