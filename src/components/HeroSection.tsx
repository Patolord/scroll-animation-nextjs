import Image from "next/image";

export default function HeroSection() {
  return (
    <section>
      <canvas id="hero-canvas"></canvas>

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 transform-3d perspective-[1000px] py-2">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen flex flex-col items-center gap-6 text-center text-(--fg) origin-center will-change-[transform,opacity]">
          <h1 className="w-[50%] mb-2">
            The future of education is here. Join the Teacher Gamer Revolution
            and revolutionize the way you learn.
          </h1>
          <p className="opacity-35">Trusted by</p>
          <div className="flex gap-2 w-[30%]">
            <div className="flex-1">
              <Image
                src="/client-logo-1.png"
                alt="logo1"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <Image
                src="/client-logo-2.png"
                alt="logo2"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <Image
                src="/client-logo-3.png"
                alt="logo3"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <Image
                src="/client-logo-4.png"
                alt="logo4"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
