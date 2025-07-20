import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import Newslater from "../components/Newslater";
const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            className="w-full max-w-[550px] h-auto object-cover rounded-lg shadow-lg"
            src={assets.about_img}
            alt="About VogueVault"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 dark:text-white">
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Where Fashion Meets Legacy</h3>
            <p className="leading-relaxed">
              At VogueVault, we believe clothing is more than fabric—it's a statement, a memory, and a gateway to confidence. Born from a passion for curating timeless trends and empowering individuality, we've built a digital sanctuary for those who see fashion as an art form.
            </p>
            
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-8">Why VogueVault?</h3>
            <ul className="space-y-4 list-disc pl-5">
              <li>
                <span className="font-medium">The Vault of Trends:</span> Just like a vault safeguards treasures, we meticulously curate collections that blend iconic styles with cutting-edge designs. Every piece is handpicked to ensure it's worthy of your wardrobe.
              </li>
              <li>
                <span className="font-medium">For the Modern Visionary:</span> Whether you're chasing runway-inspired looks or crafting a signature aesthetic, we're here to elevate your style narrative.
              </li>
              <li>
                <span className="font-medium">Quality Over Quantity:</span> We partner with ethical brands and artisans who share our commitment to craftsmanship, sustainability, and inclusivity.
              </li>
            </ul>
          </div>
          <b className="text-gray-800 dark:text-white">Our Mission</b>
          <p>
          At VogueVault, we exist to redefine fashion as a force for empowerment and innovation. We curate timeless, trend-forward clothing that transcends seasons, blending runway inspiration with everyday versatility. Our commitment goes beyond style: we partner with ethical brands and artisans to champion sustainability, inclusivity, and fair practices, ensuring every piece tells a story of craftsmanship and conscience. We believe luxury should be accessible, not exclusive—which is why we break down barriers to premium fashion, offering curated collections that celebrate individuality without compromising the planet. At the heart of VogueVault is a simple promise: to help you unlock confidence, one intentional outfit at a time.
          </p>
        </div>
      </div>
      <div className="text-xl  py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row gap-5 md:gap-8 text-sm mb-20">
  {/* Quality Assurance Card */}
  <div className="flex-1 border border-gray-100 dark:border-gray-800 rounded-xl px-6 md:px-8 py-8 sm:py-12 flex flex-col gap-4 hover:shadow-lg transition-all">
    <b className="text-lg font-semibold text-gray-900 dark:text-white">
      ✨ Quality Assurance: Style Meets Substance
    </b>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
      Every garment at VogueVault undergoes a rigorous curation process. We partner with ethical designers and artisans 
      who prioritize premium fabrics, timeless craftsmanship, and sustainable practices. From stitching to finishing, 
      each piece is meticulously inspected to ensure it meets our standards of durability, comfort, and trend-forward 
      elegance. When you shop with us, you're not just buying clothing—you're investing in artistry.
    </p>
  </div>

  {/* Convenience Card */}
  <div className="flex-1 border border-gray-100 dark:border-gray-800 rounded-xl px-6 md:px-8 py-8 sm:py-12 flex flex-col gap-4 hover:shadow-lg transition-all">
    <b className="text-lg font-semibold text-gray-900 dark:text-white">
      🛍️ Convenience: Seamless Shopping, Delivered
    </b>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
      We believe great style shouldn't come with hassle. Our intuitive platform offers personalized recommendations, 
      lightning-fast global shipping, and hassle-free returns. Whether you're browsing on your phone during a commute 
      or styling a last-minute event look, VogueVault makes it effortless to discover, purchase, and love your 
      wardrobe—24/7, from anywhere in the world.
    </p>
  </div>

  {/* Customer Service Card */}
  <div className="flex-1 border border-gray-100 dark:border-gray-800 rounded-xl px-6 md:px-8 py-8 sm:py-12 flex flex-col gap-4 hover:shadow-lg transition-all">
    <b className="text-lg font-semibold text-gray-900 dark:text-white">
      💬 Exceptional Service: Your Style, Our Priority
    </b>
    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
      Our team isn't just here to sell—we're here to style. Need advice on sizing? Curating a capsule wardrobe? 
      Reach out to our fashion-savvy support squad via live chat, email, or phone for real-time assistance. 
      With a 24-hour response guarantee and no-questions-asked happiness policy, we're committed to making 
      your VogueVault experience as flawless as your outfit.
    </p>
  </div>
</div>
      <Newslater />
    </div>
  );
};

export default About;
