import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const Pricing = () => {
  const [Isyear, setIsyear] = useState(false);

  const packages = [
    {
      name: "start",
      month_p: 9,
      year_p: 90,
      desp: "Lorem ipsum dolor sit amet consectetur adipisicing elit : Praesentiulaborum officia fugiat, dolorem aspernatur necessitatibus quos,",
    },
    {
      name: "Advance",
      month_p: 20,
      year_p: 199,
      desp: "Lorem ipsum dolor sit amet consectetur adipisicing elit : Praesentiulaborum officia fugiat, dolorem aspernatur necessitatibus quos,",
    },
    {
      name: "Premium",
      month_p: 50,
      year_p: 399,
      desp: "Lorem ipsum dolor sit amet consectetur adipisicing elit : Praesentiulaborum officia fugiat, dolorem aspernatur necessitatibus quos,",
    },
  ];
  return (
    <div
      className="md:px-14 p-4 max-w-s mx-auto py-0"
      id="pricing"
    >
      <div className="text-center">
        <h2 className="md:text-5xl text-3xl font-extralight text-primary mb-2">
          Here are all our plans
        </h2>
        <p className=" text-teritary md:w-1/3 mx-auto px-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          laborum officia fugiat,
        </p>

        <div>
          <label
            htmlFor="toggle"
            className="inline-flex items-center cursor-pointer"
          >
            <span className=" mr-8 text-2xl font-semibold ">Monthly</span>
            <div className="w-14 h-6 bg-gray-300 rounded-full  transition duration-200 ease-in-out">
              <div
                className={`w-6 h-6 rounded-full transti duration-200 ease-in-out ${
                  Isyear ? "bg-primary ml-8" : "bg-gray-500 "
                }`}
              ></div>
            </div>
            <span className="ml-8 text-2xl font-semibold">Yearly</span>
          </label>
          <input
            type="checkbox"
            id="toggle"
            className="hidden"
            checked={Isyear}
            onChange={() => {
              setIsyear(!Isyear);
            }}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-20 md:w-11/12 mx-auto mb-10 group ">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="border py-10 md:px-6 px-4 rounded-lg shadow-3xl  group-hover:blur-sm hover:!blur-none items-center cursor-pointer group-hover:scale-[0.85] hover:!scale-100"
          >
            <h3 className="text-3xl font-bold text-center text-primary">
              {pkg.name}
            </h3>
            <p className="text-teritary text-center my-5">{pkg.desp}</p>
            <p className="mt-5 text-center text-secondary text-4xl font-bold">
              {Isyear ? `$${pkg.year_p}` : `$${pkg.month_p}`}{" "}
              <span className="text-base text-teritary font-medium">
                {Isyear ? "year" : "monthly"}
              </span>
            </p>

            <ul className=" text-center my-5 text-teritary">
              <li> this is amr for this this</li>
              <li> this is amr for this this</li>
              <li> this is amr for this this</li>
              <li> this is amr for this this</li>
            </ul>
            <button className="btnprimary lg:ml-[65px] md:ml-[70px] sm:ml-[75px] ml-[95px]">
              Buy This
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
