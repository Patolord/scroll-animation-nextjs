"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const container = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLDivElement>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const videoFramesRef = useRef({ frame: 0 });

  const [imagesLoaded, setImagesLoaded] = useState(false);

  const frameCount = 189;

  const setCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    context.scale(pixelRatio, pixelRatio);
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    const img = imagesRef.current[videoFramesRef.current.frame];
    if (img?.complete && img.naturalWidth > 0) {
      const imageAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      let drawWidth: number, drawHeight: number, drawX: number, drawY: number;

      if (imageAspect > canvasAspect) {
        drawHeight = canvasHeight;
        drawWidth = drawHeight * imageAspect;
        drawX = (canvasWidth - drawWidth) / 2;
        drawY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = drawWidth / imageAspect;
        drawX = 0;
        drawY = (canvasHeight - drawHeight) / 2;
      }

      context.drawImage(img, drawX, drawY, drawWidth, drawHeight);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    contextRef.current = context;
    setCanvasSize();

    let imagesToLoad = frameCount;
    const images: HTMLImageElement[] = [];

    const onLoad = () => {
      imagesToLoad--;
      if (imagesToLoad === 0) {
        imagesRef.current = images;
        render();
        setImagesLoaded(true);
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.onload = onLoad;
      img.onerror = onLoad;
      img.src = `/frames/frame_${(i + 1).toString().padStart(3, "0")}.jpg`;
      images.push(img);
    }

    const handleResize = () => {
      setCanvasSize();
      render();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [render, setCanvasSize]);

  useGSAP(
    () => {
      if (!imagesLoaded || !container.current) return;

      const nav = document.querySelector("nav");
      const header = headerRef.current;
      const heroImg = heroImgRef.current;

      ScrollTrigger.create({
        trigger: container.current,
        start: "top top",
        end: `+=${window.innerHeight * 7}px`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          const animationProgress = Math.min(progress / 0.9, 1);
          const targetFrame = Math.round(animationProgress * (frameCount - 1));
          videoFramesRef.current.frame = targetFrame;
          render();

          if (nav) {
            if (progress <= 0.1) {
              const navProgress = progress / 0.1;
              const opacity = 1 - navProgress;
              gsap.set(nav, { opacity });
            } else {
              gsap.set(nav, { opacity: 0 });
            }
          }

          if (header) {
            if (progress <= 0.25) {
              const zProgress = progress / 0.25;
              const translateZ = zProgress * -500;

              let opacity = 1;
              if (progress >= 0.2) {
                const fadeProgress = Math.min(
                  (progress - 0.2) / (0.25 - 0.2),
                  1,
                );
                opacity = 1 - fadeProgress;
              }

              gsap.set(header, {
                transform: `translate(-50%, -50%) translateZ(${translateZ}px)`,
                opacity,
              });
            } else {
              gsap.set(header, { opacity: 0 });
            }
          }

          if (heroImg) {
            if (progress < 0.6) {
              gsap.set(heroImg, {
                transform: "translateZ(1000px)",
                opacity: 0,
              });
            } else if (progress >= 0.6 && progress <= 0.9) {
              const imgProgress = (progress - 0.6) / (0.9 - 0.6);
              const translateZ = 1000 - imgProgress * 1000;

              let opacity = 0;
              if (progress <= 0.8) {
                const opacityProgress = (progress - 0.6) / (0.8 - 0.6);
                opacity = opacityProgress;
              } else {
                opacity = 1;
              }

              gsap.set(heroImg, {
                transform: `translateZ(${translateZ}px)`,
                opacity,
              });
            } else {
              gsap.set(heroImg, {
                transform: "translateZ(0px)",
                opacity: 1,
              });
            }
          }
        },
      });
    },
    { dependencies: [imagesLoaded, render], scope: container },
  );

  return (
    <section
      ref={container}
      className="hero relative w-full h-screen overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />

      <div
        ref={headerRef}
        className="header absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen flex flex-col items-center gap-6 text-center origin-center will-change-[transform,opacity]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <h1 className="w-[50%] mb-2 text-4xl font-bold">
          The future of education is here. Join the Teacher Gamer Revolution and
          revolutionize the way you learn.
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

      <div
        ref={heroImgRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      >
        <div
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
  );
}
