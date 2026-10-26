import React from "react";

const images = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900",
    alt: "Wedding couple",
    rotate: "-rotate-2",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=900",
    alt: "Wedding celebration",
    rotate: "rotate-2",
  },
  {
    src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=900",
    alt: "Bride wedding portrait",
    rotate: "-rotate-1",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=900",
    alt: "Wedding ceremony",
    rotate: "rotate-2",
  },
  {
    src: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?q=80&w=900",
    alt: "Wedding couple moment",
    rotate: "-rotate-2",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?q=80&w=900",
    alt: "Wedding photography",
    rotate: "rotate-1",
  },
  {
    src: "https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?q=80&w=900",
    alt: "Wedding couple moment",
    rotate: "-rotate-2",
  },
  {
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?q=80&w=900",
    alt: "Wedding photography",
    rotate: "rotate-1",
  },
];

export default function WeddingTemplate() {
  return (
    <section className="min-h-screen w-full bg-black p-2 sm:p-4 md:p-6 font-sans">

      {/* MAIN CONTAINER */}
      <div className="mx-auto w-full  overflow-hidden  bg-black shadow-2xl">

        <div className="grid min-h-[660px] grid-cols-2 lg:grid-cols-12">


          {/* ===================================================== */}
          {/* LEFT SIDE */}
          {/* ===================================================== */}

          <div className="relative lg:col-span-9 overflow-hidden px-6 py-10 sm:px-10 md:px-14 lg:px-16">

            {/* Subtle background glow */}
            <div className="pointer-events-none absolute -left-32 -top-32 h-[350px] w-[350px] rounded-full bg-white/[0.025] blur-3xl" />

          


            {/* ================= IMAGE COLLAGE ================= */}

            <div className="relative z-10 mx-auto mt-10 max-w-[850px]">

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">

                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`
                      group
                      relative
                      aspect-[4/5]
                      overflow-hidden
                      rounded-[14px]
                      bg-white
                      p-1.5
                      shadow-xl
                      ${image.rotate}
                      transition-all
                      duration-500
                      ease-out
                      hover:z-30
                      hover:rotate-0
                      hover:scale-[1.05]
                      hover:shadow-[0_20px_50px_rgba(255,255,255,0.12)]
                    `}
                  >

                    {/* Image */}
                    <div className="relative h-full w-full overflow-hidden rounded-[10px]">

                      <img
                        src={image.src}
                        alt={image.alt}
                        className="
                          h-full
                          w-full
                          object-cover
                          grayscale-[15%]
                          transition-all
                          duration-700
                          ease-out
                          group-hover:scale-110
                          group-hover:grayscale-0
                        "
                      />

                      {/* Hover overlay */}
                      <div
                        className="
                          absolute
                          inset-0
                          bg-black/0
                          transition-all
                          duration-500
                          group-hover:bg-black/15
                        "
                      />

                      {/* Image number */}
                      <div
                        className="
                          absolute
                          bottom-3
                          left-3
                          flex
                          h-7
                          w-7
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-white/40
                          bg-black/30
                          text-[9px]
                          text-white
                          opacity-0
                          backdrop-blur-md
                          transition-all
                          duration-500
                          group-hover:opacity-100
                        "
                      >
                        0{index + 1}
                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>


           
          </div>


          {/* ===================================================== */}
          {/* RIGHT SIDE */}
          {/* ===================================================== */}

          <div
            className="
              relative
              min-h-[600px]
              overflow-hidden
              border-t
              border-white
              bg-black
              lg:col-span-3
              lg:min-h-0
              lg:border-l
              lg:border-t-0
            "
          >

            {/* Vertical decorative line */}

            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/[0.07]" />


            {/* Top Label */}



            {/* Vertical Title */}

            <div className="absolute inset-0 flex items-center justify-center">

              <div className="group relative flex h-[470px] items-center justify-center">

                <h2
                  className="
                    select-none
                    rotate-90
                    whitespace-nowrap
                    font-serif
                    text-[25px]
                    font-medium
                    uppercase
                    tracking-[0.32em]
                    text-white
                    transition-all
                    duration-700
                    group-hover:tracking-[0.42em]
                    group-hover:text-stone-300
                    sm:text-[40px]
                    md:text-[42px]
                  "
                >
                  wedding Planner
                </h2>

              </div>

            </div>
          </div>

        </div>

      </div>

    </section>
  );
}