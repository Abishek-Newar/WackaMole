import { useEffect, useState } from "react";
import dead from "./../assets/dead.png"

const Wackamole = () => {
    const box:number = 9;
    const [score,setScore] = useState<number>(0);
    const [position,setPositon] = useState<number>(0);
    const [seconds,setSeconds] = useState<number>(15);
    const [game,setGame] = useState<boolean>(false);


    useEffect(()=>{
        const Intern = setInterval(()=>{
            setSeconds(seconds - 1);
        },1000);

        if(seconds <= 0){
            setGame(true);
        }
        return ()=>{
            clearInterval(Intern)
        }
    })
    useEffect(() => {
        const interval = setInterval(() => {
          const newRandomNumber:number = Math.floor(Math.random() * 9); // Generate a random number between 0 and 99
          setPositon(newRandomNumber);
        }, 1000); // Update every 1000 milliseconds (1 second)
    
        return () => {
          clearInterval(interval); // Clean up the interval when the component unmounts
        };
      }, []);
      function Score(id:number){
        if(id == position){
            setScore(score + 1);
        }
      }


      if(game){
        return <div className="flex flex-col gap-9 bg-stone-200 items-center justify-center h-screen select-none">
            <img src={dead} alt="" className="w-32 h-32" />
            <h1 className="lg:text-9xl text-6xl italic  text-red-600 font-extrabold ">Game Over</h1>
            <button className=" py-3 px-6 rounded-lg bg-green-500 hover:bg-green-700 transition-all ease-in-out duration-500 text-white text-xl font-bold" onClick={()=>{
                setGame(false);
                setScore(0);
                setSeconds(15);
            }}>Restart</button>
        </div>
      }
  return (
    <div className="w-screen h-screen flex flex-col bg-stone-400  items-center justify-center">
        <h1 className="mb-4 text-3xl font-extrabold text-white">Wack A Mole</h1>
        <div className="flex flex-col w-96  items-center justify-center h-96 border-8 rounded-md border-white ">
        <div className="flex w-72 px-3 py-1 justify-between">
            <h1>Score: {score}</h1>
            <h1>Time: {seconds}</h1>
        </div>
        <div className=" w-48 h-48 grid border-2 border-white rounded-lg grid-cols-3  ">
        {
            [...Array(box)].map((_,index)=>(
                <div>
                    {
                        position === index ?
                        <div key={index} onClick={()=>Score(index)} className={`w-full h-[3.9rem] cursor-pointer rounded-lg   border bg-sky-500 flex items-center justify-center`}>
                            <div className="text-4xl">🐨</div>
                        </div>
                        :
                        <div key={index} onClick={()=>Score(index)} className={`w-full h-[3.9rem] cursor-not-allowed rounded-lg border bg-red-500 `}></div>
                    }
                </div>
            ))
        }
    </div>
        </div>
    </div>
  )
}

export default Wackamole