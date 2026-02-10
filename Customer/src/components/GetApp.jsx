import React from "react";
import img from "../assets/img/order.png";

const GetApp = () => {
  return (
    <section className=" dark:bg-black py-10 transition-colors duration-300">
      <div className=" bg-orange-100 dark:bg-[#1F1D2B] py-16 px-6 lg:px-20 rounded-3xl mx-4 lg:mx-16">
        <div className="grid md:grid-cols-2 items-center gap-10">
          {/* Left Text */}
          <div>
            <h4 className="text-orange-500 font-semibold uppercase mb-2">
              Our Application
            </h4>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simple Way To Order Your Food
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Discover food wherever and whenever and get your food delivered
              quickly.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get the app on Google Play"
                className="inline-flex items-center bg-black text-white font-medium px-5 py-3 rounded-full shadow hover:opacity-90 transition"
              >
                {/* Simple Play store icon */}
                <svg className="w-5 h-5 mr-3" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M325.3 234.3L104.6 27.6C95.1 19.8 82.5 19.6 73 27.6 31.3 58.8 8 111.6 8 167.4v177.2C8 383 31.3 435.8 73 467 82.6 475 95.2 474.8 104.6 467l220.7-206.7-103.1-26z" fill="#3DDC84"/>
                  <path d="M433.6 239.4L362.7 199.1 222 325.3 325.3 377.1C336.8 382.3 349.9 382.5 361.9 378.1 403.6 346.9 426.9 294.1 426.9 238.3 426.9 234.9 426.7 231.5 426.3 228.1 419.3 231.8 433.6 239.4 433.6 239.4z" fill="#FFD400"/>
                </svg>
                Get it on Play Store 
              </a>

              <a
                href="https://www.microsoft.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get the app on Microsoft Store"
                className="inline-flex items-center bg-white text-black border font-medium px-5 py-3 rounded-full shadow hover:opacity-90 transition"
              >
                {/* Simple Microsoft store icon */}
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect x="1" y="3" width="10" height="8" fill="#F25022"/>
                  <rect x="13" y="3" width="10" height="8" fill="#7FBA00"/>
                  <rect x="1" y="13" width="10" height="8" fill="#00A4EF"/>
                  <rect x="13" y="13" width="10" height="8" fill="#FFB900"/>
                </svg>
                Microsoft Store
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <img
              src={img}
              alt="App Preview"
              loading="lazy"
              className="w-[280px] md:w-[320px] drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetApp;