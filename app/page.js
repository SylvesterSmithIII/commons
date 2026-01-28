

export default function Home() {
  return (
    <div className="m-4 lg:m-8 font-inter text-[#2f1e1b]" >
{/* 
      <div className=" flex justify-between text-lg font-semibold mb-4">
        <h6>THE COMMONS</h6>
        <h6>LEARNING HUB</h6>
        <h6>YOUR STARTING POINT FOR SUCCESS</h6>
      </div> */}

      <div className="flex flex-col justify-center items-center font-bold text-8xl lg:text-9xl">
        <h1 >LEARN.</h1>
        <h1>CREATE.</h1>
        <h1>BUILD.</h1>
      </div>

      <div className="w-full lg:block hidden">
        <img
          src="/large-hero.svg"
          alt="line"
          className="w-full h-auto"
        />
      </div>

      <div className="w-full lg:hidden">
        <img
          src="/small-hero.svg"
          alt="line"
          className="w-full h-auto"
        />
      </div>

      

    </div>
  );
}
