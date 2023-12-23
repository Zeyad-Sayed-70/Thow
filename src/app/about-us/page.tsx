import { roboto_condensed } from "@/ui/Fonts";
import Image from "next/image";
import React from "react";

export default function page() {
  return (
    <main className={`bg-black py-12 relative text-white-v overflow-hidden`}>
      <div
        style={{
          backgroundImage: 'url("/assets/half-moon.png")',
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          filter: "brightness(.7)",
        }}
        className="absolute w-[800px] h-[800px] opacity-.5 -left-72 top-12"
      ></div>
      <div
        style={{
          boxShadow: "0 0 1000px 100px #fff",
        }}
        className="h-[250px] rounded-full shadow-lg opacity-10 animate-pulse absolute top-[300px]"
      ></div>
      <div className="px-2 md:pl-28 lg:pl-80 flex flex-col gap-y-12 text-xl pt-36 md:pr-12 text-center md:text-start relative">
        <p className="!leading-[4rem] text-4xl md:text-5xl">
          We believe that good design is powerful, hard work is essenitail, and
          expoloring the unknown is important.
        </p>
      </div>
      <div className="container px-12 ml-auto relative">
        <hr className="border-gray-300 mt-40" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-24">
          <div className="capitalize">
            <h4 className="mb-6 font-bold text-2xl">Who’s Us?</h4>
            <p
              className={`text-gray-400 text-xl ${roboto_condensed.className}`}
            >
              At The House of Wisdom, our passion for education fuels our
              mission to redefine the way knowledge is acquired. Established
              with a commitment to innovation and inclusivity, we strive to
              create a virtual space where learners of all backgrounds can
              embark on a transformative educational journey.
              <br />
              <br />
              Our team is comprised of dedicated educators, industry experts,
              and technology enthusiasts, united by the belief that everyone
              deserves access to quality learning experiences.
            </p>
          </div>
          <div className="relative">
            <div
              style={{
                boxShadow: "0 0 300px 200px #35585a",
              }}
              className="w-0 h-0 rounded-full shadow-lg opacity-30 animate-pulse absolute -right-32 top-52"
            ></div>
            <Image
              alt="photo"
              src={"/assets/earth.png"}
              width={400}
              height={400}
              className="object-cover select-none pointer-events-none block mx-auto"
            />
          </div>
        </div>
        <hr className="border-gray-200" />
        <div className="flex flex-col gap-12 py-24">
          <div className="">
            <h4 className="mb-6 font-bold text-2xl border-b-2 w-fit pb-3 border-gray-500">
              Our Vision?
            </h4>
            <p
              className={`text-gray-400 text-xl ${roboto_condensed.className}`}
            >
              In envisioning the future, The House of Wisdom aspires to be a
              global hub of learning excellence, breaking down barriers to
              education and empowering individuals to thrive in an ever-evolving
              world.
              <br />
              <br />
              We aim to cultivate a community of lifelong learners who are not
              just consumers of knowledge but contributors to its creation. Our
              vision is to inspire curiosity, foster creativity, and instill a
              love for learning that transcends traditional boundaries.
              <br />
              <br />
              Join us as we pave the way for a future where education knows no
              limits. Together, let's build a world where wisdom is shared, and
              knowledge is a transformative force for all.
            </p>
          </div>
        </div>

        {/* Sun Light */}

        <div className="py-24 grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-y-16 md:gap-0 relative">
          <div
            style={{
              boxShadow: "0 0 300px 150px #ffc107",
            }}
            className="h-[250px] rounded-full shadow-lg opacity-30 animate-pulse absolute -left-60 top-40"
          ></div>
          <Image
            alt="photo"
            src={"/assets/sun.png"}
            width={800}
            height={800}
            className="object-cover select-none pointer-events-none block mx-auto absolute -left-[800px] 0top-[80px] opacity-50"
          />
          <div className=" relative">
            <q
              className={`text-white-v text-3xl ${roboto_condensed.className}`}
            >
              Passion is the genesis of genius.
            </q>
            <span className="text-gray-500 mt-4 block">
              ― Galileo Galilei (The Father of Astronomy).
            </span>
          </div>
          <div>
            <Image
              alt="photo"
              src={"/assets/Galileo_Galilei.jpg"}
              width={300}
              height={400}
              className="object-cover select-none pointer-events-none block mx-auto"
            />
          </div>
        </div>
        <hr className="border-gray-200" />
        <div className="py-24 relative">
          <h4 className="mb-6 font-bold text-2xl border-b-2 w-fit mx-auto pb-3 border-gray-500">
            Our Educational Approach
          </h4>
          {/* Back-Bone Line */}
          <span
            style={{ height: "calc(100% - 300px)" }}
            className="absolute w-1 bg-primary-dark left-[50%] top-48 rounded"
          ></span>
          <div className="mx-auto w-fit relative mt-12">
            <h5 className="mb-6 font-bold text-xl w-fit p-3 rounded-md mx-auto text-center bg-primary">
              Well Explanation
            </h5>
            <p
              className={`bg-black-v p-4 rounded-md w-[300px] md:w-[500px] lg:w-[600px] md:mr-52 text-lg ${roboto_condensed.className}`}
            >
              Immerse yourself in courses crafted with precision and care. Our
              well-explained content ensures that every concept is presented
              clearly, making complex topics accessible to learners at all
              levels.
            </p>
          </div>
          <div className="mx-auto w-fit relative mt-24">
            <h5 className="mb-6 font-bold text-xl w-fit p-3 rounded-md mx-auto text-center bg-primary">
              Dive In Details
            </h5>
            <p
              className={`bg-black-v p-4 rounded-md w-[300px] md:w-[500px] lg:w-[600px] md:-mr-52 text-lg ${roboto_condensed.className}`}
            >
              We believe in the power of in-depth exploration. Dive into the
              details with comprehensive lessons that encourage a deep
              understanding of subjects, fostering critical thinking and
              analytical skills.
            </p>
          </div>
          <div className="mx-auto w-fit relative mt-24">
            <h5 className="mb-6 font-bold text-xl w-fit p-3 rounded-md mx-auto text-center bg-primary">
              Ai Assestance
            </h5>
            <p
              className={`bg-black-v p-4 rounded-md w-[300px] md:w-[500px] lg:w-[600px] md:mr-52 text-lg ${roboto_condensed.className}`}
            >
              Harness the power of artificial intelligence to enhance your
              learning journey. Our AI assistance is designed to provide
              personalized recommendations, adaptive learning paths, and instant
              feedback, ensuring a tailored and effective learning experience.{" "}
            </p>
          </div>
          <div className="mx-auto w-fit relative mt-24">
            <h5 className="mb-6 font-bold text-xl w-fit p-3 rounded-md mx-auto text-center bg-primary">
              Interactivety Learning Experience
            </h5>
            <p
              className={`bg-black-v p-4 rounded-md w-[300px] md:w-[500px] lg:w-[600px] md:-mr-52 text-lg ${roboto_condensed.className}`}
            >
              Learning is not a passive process. Our platform promotes an
              interactive learning experience, where you actively engage with
              the material through simulations, discussions, and hands-on
              activities, making education a dynamic and engaging journey.
            </p>
          </div>
          <div className="mx-auto w-fit relative mt-24">
            <h5 className="mb-6 font-bold text-xl w-fit p-3 rounded-md mx-auto text-center bg-primary">
              Exams And Quizes
            </h5>
            <p
              className={`bg-black-v p-4 rounded-md w-[300px] md:w-[500px] lg:w-[600px] md:mr-52 text-lg ${roboto_condensed.className}`}
            >
              Test your knowledge and track your progress with our thoughtfully
              crafted exams and quizzes. Regular assessments help reinforce
              learning, identify areas for improvement, and celebrate your
              achievements along the way.{" "}
            </p>
          </div>
          <div className="mx-auto w-fit relative mt-24">
            <h5 className="mb-6 font-bold text-xl w-fit p-3 rounded-md mx-auto text-center bg-primary">
              Collaboration: Study with Others
            </h5>
            <p
              className={`bg-black-v p-4 rounded-md w-[300px] md:w-[500px] lg:w-[600px] md:-mr-52 text-lg ${roboto_condensed.className}`}
            >
              Learning is often most effective when shared. Collaborate with
              fellow learners, engage in group discussions, and participate in
              collaborative projects. Our platform encourages a sense of
              community, providing opportunities to share insights and learn
              from one another.{" "}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
