"use client";

import { Container, Icons, Wrapper } from "@/components";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LampContainer } from "@/components/ui/lamp";
import Marquee from "@/components/ui/marquee";
import SectionBadge from "@/components/ui/section-badge";
import { features, perks, pricingCards, reviews } from "@/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, ChevronRight, UserIcon, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const HomePage = () => {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [waitListCount, setWaitListCount] = useState(33);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // State for countdown timer
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const savedTargetDate = localStorage.getItem("targetDate");
    let targetDate: Date;

    if (savedTargetDate) {
      targetDate = new Date(savedTargetDate);
    } else {
      targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + 10); // 10 days from now
      localStorage.setItem("targetDate", targetDate.toISOString());
    }

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference > 0) {
        const newDays = Math.floor(difference / (1000 * 60 * 60 * 24));
        const newHours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const newMinutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const newSeconds = Math.floor((difference % (1000 * 60)) / 1000);

        setDays(newDays);
        setHours(newHours);
        setMinutes(newMinutes);
        setSeconds(newSeconds);
      } else {
        // Countdown has ended
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      }
    };

    const intervalId = setInterval(updateCountdown, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Email submitted successfully, Thank you :)");
        setEmail("");
      } else {
        console.error("Error submitting email");
      }
    } catch (error) {
      console.error("Error:", error);
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8">
      {/* hero */}
      <Wrapper>
        <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10 h-[150vh]" />

        <Container>
          <div className="flex flex-col items-center justify-center py-20 h-full">
            <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
              <span>
                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
              </span>
              <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
              <span className="h-full w-full blur-md absolute bottom-0 inset-x-0 bg-gradient-to-tr from-primary/40"></span>
              <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center justify-center gap-1.5">
                <Image
                  src="/icons/sparkles-dark.svg"
                  alt="✨"
                  width={24}
                  height={24}
                  className="w-4 h-4"
                />
                Introducing Pitcher AI
                <ChevronRight className="w-4 h-4" />
              </span>
            </button>
            <div className="flex flex-col items-center mt-8 max-w-4xl w-11/12 md:w-full">
              <h1 className=" max-w-3xl text-6xl md:text-6xl lg:textxl md:!leading-snug font-semibold text-center bg-clip-text bg-gradient-to-b from-gray-50 to-gray-50 text-transparent">
                Turning Reviews into{" "}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  Winning Pitches
                </span>
              </h1>
              <p className=" max-w-xl text-base  md:text-lg text-foreground/80 mt-6 text-center">
                Pitcher AI converts product reviews into impactful social media
                pitches using AI.
              </p>
              <div className="flex flex-col items-center justify-center mt-8 md:mt-12 w-full">
                {/* <div className={buttonVariants({ size: "sm", className: "hidden md:flex" })} style={{ marginBottom: '1rem' }}>People Joined {waitListCount}</div> */}
                <div className="flex items-center justify-center w-full max-w-lg rounded-full border-t border-foreground/30 backdrop-blur-lg px-2 py-2 md:py-2 gap-2 md:gap-8 shadow-3xl shadow-background/40 cursor-pointer select-none bg-white/20 md:bg-white/20">
                  {/* Form for waitlist */}

                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col md:flex-row items-center gap-2 px-4 w-full"
                  >
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full md:w-64 lg:w-80 px-4 py-2 rounded-full bg-black text-sm md:text-base text-foreground shadow-inner focus:outline-none"
                      required
                      value={email}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                    />
                    <Button
                      size="sm"
                      type="submit"
                      className="mt-2 md:mt-0 md:ml-2 rounded-full border border-foreground/20 active:animate-pulse"
                      onClick={() => setWaitListCount(waitListCount + 1)}
                      disabled={isSubmitting} // Disable button when submitting
                    >
                      {isSubmitting ? "Submitting..." : "Join Waitlist"}{" "}
                      {/* Show "Submitting..." when submitting */}
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </form>

                  {/* Form for waitlist */}
                </div>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 ">
                Building in Progress stay tuned...
              </h2>
            </div>
          </div>
        </Container>
      </Wrapper>

      {/* About */}
      <div id="about">
        <Wrapper className="flex flex-col items-center justify-center py-12 relative">
          <Container>
            <div className=" mx-auto text-start md:text-center">
              <SectionBadge title="About" />

              <p className="text-bold text-muted-foreground mt-6 max-w-4xl  mx-auto">
                At PitcherAI, we are dedicated to revolutionizing the way
                influencers and marketers create content. By leveraging
                cutting-edge AI technology, we transform customer reviews and
                product insights into powerful, tailored pitches that resonate
                with diverse audiences. Each piece of content is meticulously
                reviewed by 100 AI agents, ensuring your pitch is optimized for
                maximum impact and engagement.
              </p>
            </div>
          </Container>
        </Wrapper>
      </div>
      {/* video */}
      {/* video */}
      {/* <div className="relative flex items-center justify-center py-10 md:py-20 w-full px-4 md:px-0">
        <div className="absolute top-1/2 left-1/2 -z-10 gradient w-4/5 -translate-x-1/2 h-4/5 -translate-y-1/2 inset-0 blur-[10rem]"></div>
        <div className="flex flex-row items-center justify-center w-full max-w-[700px] -m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
          <div className="flex flex-col items-center w-full">
            {videoLoaded && (
              <video
                src="/assets/video.mp4"
                autoPlay
                loop
                muted
                playsInline
                onLoadedData={() => setVideoLoaded(true)}
                className="rounded-md lg:rounded-xl bg-foreground/10 shadow-2xl ring-1 ring-border w-full h-auto aspect-video"
              />
            )}
            {!videoLoaded && (
              <div className="w-full aspect-video bg-foreground/10 rounded-md lg:rounded-xl flex items-center justify-center">
                Loading video...
              </div>
            )}
            <BorderBeam size={250} duration={12} delay={9} />
          </div>
        </div>
      </div> */}
      {/* how it works */}
      <div id="process">
        <Wrapper className="flex flex-col items-center justify-center py-12 relative">
          <Container>
            <div className="max-w-md mx-auto text-start md:text-center">
              <SectionBadge title="Process" />
              <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
                Three steps to build your <br />
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                  perfect pitches
                </span>
              </h2>
              <p className="text-muted-foreground mt-6">
                Turn your vision into reality in just 3 simple steps
              </p>
            </div>
          </Container>
          <Container>
            <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full divide-x-0 md:divide-x divide-y md:divide-y-0 divide-gray-900 first:border-l-2 lg:first:border-none first:border-gray-900">
                {perks.map((perk) => (
                  <div
                    key={perk.title}
                    className="flex flex-col items-start px-4 md:px-6 lg:px-8 lg:py-6 py-4"
                  >
                    <div className="flex items-center justify-center">
                      <perk.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-lg font-medium mt-4">{perk.title}</h3>
                    <p className="text-muted-foreground mt-2 text-start lg:text-start">
                      {perk.info}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Wrapper>

        {/* features */}
        <div id="feature">
          <Wrapper className="flex flex-col items-center justify-center py-12 relative">
            <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-primary rounded-full blur-[10rem] -z-10"></div>
            <div className="hidden md:block absolute bottom-0 -left-1/3 w-72 h-72 bg-indigo-600 rounded-full blur-[10rem] -z-10"></div>
            <Container>
              <div className="max-w-md mx-auto text-start md:text-center">
                <SectionBadge title="Features" />
                <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
                  Discover our powerful <br />
                  <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                    features
                  </span>
                </h2>
                <p className="text-muted-foreground mt-6">
                  Pitcher AI offers a range of features to help you create
                  pitches from review
                </p>
              </div>
            </Container>
            <Container>
              <div className="flex items-center justify-center mx-auto mt-8">
                <Icons.feature className="w-auto h-80" />
              </div>
            </Container>
            <Container>
              <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8">
                  {features.map((feature) => (
                    <div
                      key={feature.title}
                      className="flex flex-col items-start lg:items-start px-0 md:px-0"
                    >
                      <div className="flex items-center justify-center">
                        <feature.icon className="w-8 h-8" />
                      </div>
                      <h3 className="text-lg font-medium mt-4">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground mt-2 text-start lg:text-start">
                        {feature.info}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </Wrapper>
        </div>
      </div>

      {/* pricing */}
      {/* <Wrapper className="flex flex-col items-center justify-center py-12 relative">
        <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-blue-500 rounded-full blur-[10rem] -z-10"></div>
        <Container>
          <div className="max-w-md mx-auto text-start md:text-center">
            <SectionBadge title="Pricing" />
            <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
              Unlock the right plan for your business
            </h2>
            <p className="text-muted-foreground mt-6">
              Choose the best plan for your business and start building your
              dream website today
            </p>
          </div>
        </Container>
        <Container className="flex items-center justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 py-10 md:py-20 flex-wrap max-w-4xl">
            {pricingCards.map((card) => (
              <Card
                key={card.title}
                className={cn(
                  "flex flex-col w-full border-neutral-700",
                  card.title === "Unlimited Saas" && "border-2 border-primary"
                )}
              >
                <CardHeader className="border-b border-border">
                  <span>{card.title}</span>
                  <CardTitle
                    className={cn(
                      card.title !== "Unlimited Saas" && "text-muted-foreground"
                    )}
                  >
                    {card.price}
                  </CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-3">
                  {card.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Zap className="w-4 h-4 fill-primary text-primary" />
                      <p>{feature}</p>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="mt-auto">
                  <Link
                    href="#"
                    className={cn(
                      "w-full text-center text-primary-foreground bg-primary p-2 rounded-md text-sm font-medium",
                      card.title !== "Unlimited Saas" &&
                        "!bg-foreground !text-background"
                    )}
                  >
                    {card.buttonText}
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </Wrapper> */}

      {/* testimonials */}
      {/* <Wrapper className="flex flex-col items-center justify-center py-12 relative">
        <div className="hidden md:block absolute -top-1/4 -left-1/3 w-72 h-72 bg-indigo-500 rounded-full blur-[10rem] -z-10"></div>
        <Container>
          <div className="max-w-md mx-auto text-start md:text-center">
            <SectionBadge title="Our Customers" />
            <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
              What people are saying
            </h2>
            <p className="text-muted-foreground mt-6">
              See how Astra empowers businesses of all sizes. Here&apos;s what
              real people are saying on Twitter
            </p>
          </div>
        </Container>
        <Container>
          <div className="py-10 md:py-20 w-full">
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10">
              <Marquee pauseOnHover className="[--duration:20s] select-none">
                {firstRow.map((review) => (
                  <figure
                    key={review.name}
                    className={cn(
                      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                      "border-zinc-50/[.1] bg-background over:bg-zinc-50/[.15]"
                    )}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <UserIcon className="w-6 h-6" />
                      <div className="flex flex-col">
                        <figcaption className="text-sm font-medium">
                          {review.name}
                        </figcaption>
                        <p className="text-xs font-medium text-muted-foreground">
                          {review.username}
                        </p>
                      </div>
                    </div>
                    <blockquote className="mt-2 text-sm">
                      {review.body}
                    </blockquote>
                  </figure>
                ))}
              </Marquee>
              <Marquee
                reverse
                pauseOnHover
                className="[--duration:20s] select-none"
              >
                {secondRow.map((review) => (
                  <figure
                    key={review.name}
                    className={cn(
                      "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                      "border-zinc-50/[.1] bg-background over:bg-zinc-50/[.15]"
                    )}
                  >
                    <div className="flex flex-row items-center gap-2">
                      <UserIcon className="w-6 h-6" />
                      <div className="flex flex-col">
                        <figcaption className="text-sm font-medium">
                          {review.name}
                        </figcaption>
                        <p className="text-xs font-medium text-muted-foreground">
                          {review.username}
                        </p>
                      </div>
                    </div>
                    <blockquote className="mt-2 text-sm">
                      {review.body}
                    </blockquote>
                  </figure>
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
            </div>
          </div>
        </Container>
      </Wrapper> */}
    </section>
  );
};

export default HomePage;
