"use client";

import gsap from "gsap";
import ScrollSmoother from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "./ui/button";

//
export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const smoother = ScrollSmoother.create({
      smooth: 1,
      effects: true,
      normalizeScroll: true,
    });
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed w-screen px-8 py-6 flex items-center gap-8 will-change-opacity z-2"
      >
        <div className="flex flex-1 items-center gap-12">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="flex flex-1 justify-center items-center">
          <Link
            href="/"
            className="normal-case font-host-grotesk text-2xl flex items-center gap-2"
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={32}
              height={32}
              className="w-8"
            />
            Teacher Gamer Revolution
          </Link>
        </div>
        <div className="flex flex-1 gap-6 justify-end">
          <Button>
            <Link href="/training">Training</Link>
          </Button>
          <Button variant="secondary">
            <Link href="/buy-books">Buy Books</Link>
          </Button>
        </div>
      </nav>
      <section className="relative w-screen h-svw overflow-hidden">
        <canvas ref={canvasRef} className="object-cover w-full h-full" />

        {/* hero content */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 px-0 py-2 perspective-[1000px] transform-3d">
          {/* hero header */}
          <div
            ref={headerRef}
            className="absolute top-1/2 left-1/2 flex w-screen origin-center -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 text-center text-foreground will-change-[transform,opacity]"
          >
            <h1 className="font-host-grotesk mb-2 w-[50%] text-5xl leading-[1.1] font-normal lg:w-[calc(100%-4rem)]">
              The future of education is here. Join the Teacher Gamer Revolution
              and revolutionize the way you learn.
            </h1>
            <p className="text-sm font-medium uppercase opacity-35">
              Trusted by
            </p>
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

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          <div
            ref={heroImgRef}
            className="relative w-full h-full opacity-0 will-change-[transform,opacity]"
            style={{ transform: "translateZ(1000px)" }}
          >
            <Image
              src="/dashboard.png"
              alt="Dashboard"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>
    </>
  );
}
