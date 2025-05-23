import img from '../assets/stars-rating.jpg';

function LandingPage() {
  return (
    <div style={{ backgroundColor: '#99D4E2' }} className="h-screen bg-custom-blue flex flex-col lg:flex-row-reverse items-center justify-center p-6 lg:px-24 lg:py-16">
      <div className="lg:w-1/2 mt-0 lg:mt-0 flex justify-center lg:justify-end">
        <img
          src={img}
          alt="Stars Rating"
          className="w-full max-w-xs lg:max-w-lg rounded-xl"
        />
      </div>

      <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-700 leading-tight">
          FivePoint -
        </h1>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-indigo-700 leading-tight">
          Honest Ratings, Trusted Stores
        </h1>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 font-mono ">
          Because every point matters,<br></br>welcome to FivePoint.
        </p>

        <div className="mt-8 flex justify-center lg:justify-start gap-4">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-mono hover:bg-blue-700 transition duration-300">
            Login
          </button>
          <button className="bg-gray-600 text-white px-8 py-4 rounded-lg text-xl font-mono hover:bg-gray-700 transition duration-300">
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
