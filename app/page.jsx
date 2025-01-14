
import { Button } from "@/components/ui/button";
import { Oswald, Roboto } from "next/font/google";

import MotionWrapperDelay from "./_components/MotionStuff/MotionWrapperDelay";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FeatureCard from './_components/HomePage/FeatureCard'
import Questions from './_components/HomePage/Questions'



const oswald = Oswald({ subsets: ["latin"] });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });



export default function Home() {
  return (
    <div className="">
      {/* <Header /> */}
      <div className="">
        {/* Hero Section */}
        <section className="container mx-auto py-10 sm:py-20 text-center px-4">
          <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={{
              hidden: { opacity: 0, x: -100 },
              visible: { opacity: 1, x: 0 },
            }}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold gradient-title pb-6 flex flex-col items-center">
              Your Place to Re Design. <br /> Your House Beings Here...
              <span className="flex flex-col items-center justify-center gap-2 sm:gap-4 w-full mt-4">
                <span className="text-2xl sm:text-6xl">with</span>
                <MotionWrapperDelay
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.9, delay: 0.8 }}
                  variants={{
                    hidden: { opacity: 0, y: -100 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Image
                    src={"/logo3.png"}
                    alt="logo"
                    width={1000}
                    height={400}
                    className="h-32 sm:h-48 md:h-64 w-auto object-contain horizontal-rotate my-2"
                  />
                </MotionWrapperDelay>
                <span className="text-2xl sm:text-6xl -mt-2 mb-6">Design AI</span>
              </span>
            </h1>
          </MotionWrapperDelay>

          <p className="text-base sm:text-xl text-gray-300 mb-6 sm:mb-10 max-w-3xl mx-auto">
            Upload your rooms and choose a style and totally revamp your house with the help of Creation and Design and AI Technology
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/sign-in" className="w-full sm:w-auto">
              <Button variant="sex2" size="lg" className="w-full sm:w-auto mr-2">
                Get Started <ChevronRight size={18} className="ml-1" />
              </Button>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <Button variant="sex" size="lg" className="w-full sm:w-auto">
                Learn More <ChevronRight size={18} className="ml-1" />
              </Button>
            </Link>
          </div>
        </section>


        {/* Before and after */}

        <div className="mt-10 flex flex-col items-center space-y-6 md:flex-row md:space-x-6 md:space-y-0 md:justify-center mb-10">
          {/* Before Image */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-xl text-white mb-2">Before</h3>
            <Image
              className="hover:scale-105 transition-all rounded-lg border-2 border-indigo-500"
              src="/before.jpg" alt="Before" width={500} height={500} />
          </div>

          {/* After Image */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-xl text-white mb-2">After</h3>
            <Image
              className="hover:scale-105 transition-all rounded-lg border-2 border-indigo-500"
              src="/after.jpg" alt="After" width={500} height={500} />
          </div>
        </div>
        {/* Feature Bands Cards */}

        <FeatureCard />

        {/* Questions */}
        <Questions />

      </div>




      {/* <Button variant="sex" className={oswald.className}>Click Me</Button>
      <Button className={roboto.className}>Click Me</Button> */}
    </div>
  );
}
