

const StatsComponent = () =>{
const Stats = [
    {
        count:"5k",label:"Active Students",

    },
    {
        count:"10k+",label:"Mentors"
    },
    {
        count:"200+",label:"Courses",
    },
    {
        count:"50+",label:"Awards"
    }



]
    return (
        <div className=" flex gap-20 justify-between text-white text-2xl">
              {
                Stats.map((stat,index)=>(
                    <div key={index}> 
                       <h1>{stat.count}</h1>
                       <h2>{stat.label} </h2>
                    </div>
                ))
              }
        </div>
    )
}

export default StatsComponent;



