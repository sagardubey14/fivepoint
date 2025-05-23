import img from '../assets/stars-rating.jpg';

function LandingPage() {
  return (
    <div className="h-screen bg-blue-300 flex flex-col lg:flex-row-reverse items-center justify-center p-6 lg:px-24 lg:py-16">
      <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center lg:justify-end">
        <img
          src={img}
          alt="Stars Rating"
          className="w-full max-w-xs lg:max-w-lg rounded-xl shadow-lg"
        />
      </div>

      <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
        <h1 className="text-5xl font-bold text-indigo-700 leading-tight">
          FivePoint – Honest Ratings, Trusted Stores
        </h1>

        <p className="text-lg text-gray-800 font-mono">
          FivePoint is a user-centric platform that connects people with the stores they love—and helps them make better choices through honest, five-point ratings. Whether you're a regular shopper, a store owner, or a system admin, FivePoint gives each role the tools to engage, evaluate, and grow.
        </p>
        <p className="text-lg font-bold text-gray-800 font-mono">
          Because every point matters—welcome to FivePoint.
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
