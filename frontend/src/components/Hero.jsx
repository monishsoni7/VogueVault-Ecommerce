import React from "react";
import { assets } from "../assets/assets";

// const Hero = () => {
//   return (
//     <div className="flex flex-col sm:flex-row border border-gray-500">
//       {/* hero left side  */}
//       <div className="w-ful sm:w-1/2 flex items-center justify-center
//          py-10 sm:py-0" >
//         <div className="text-[#414141]">
//           <div className="flex items-center gap-2">
//             <p className="w-8 mdw-11 h-[2px] bg-[#414141]"></p>
//             <p className="font-medium text-sm md:text-base ">OUR BESTSELLERS</p>
//           </div>
//           <h1 className="text-3xl sm:py-3 lg:text-5xl leading-relaxed">
//             Latest Arrivals
//           </h1>
//           <div className="flex items-center gap-2">
//             <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
//             <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
//           </div>
//         </div>
//       </div>
//       {/* hero right side  */}
//       <img src={assets.hero_img} className="w-full sm:w-1/2 " alt="" />
//       <div></div>
//     </div>
//   );
// };

// export default Hero;
// Remove border, add gradient overlay, and improve CTA
const Hero = () => {
  return (
    <div className="relative flex flex-col sm:flex-row bg-gray-100 dark:bg-gray-800 h-[80vh]">
      {/* Text Section */}
      <div className="w-full sm:w-1/2 flex items-center justify-center p-8 z-10">
        <div className="text-gray-800 dark:text-gray-100 space-y-4 max-w-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-[2px] bg-rose-500"/>
            <p className="font-medium tracking-widest text-sm">NEW SUMMER COLLECTION</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-light leading-tight">
            Elevate Your <span className="font-serif italic">Style</span>
          </h1>
          <button className="bg-rose-500 text-white px-8 py-3 rounded-full 
            hover:bg-rose-600 transition-all duration-300">
            SHOP NOW
          </button>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full sm:w-1/2 h-full overflow-hidden">
        <img src={assets.hero_img} 
          className="w-full h-full object-cover object-center"
          alt="Fashion Model" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent"/>
      </div>
    </div>
  );
};
export default Hero;