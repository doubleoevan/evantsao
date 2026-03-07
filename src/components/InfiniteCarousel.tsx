import type { ReactNode } from "react";

export default function InfiniteCarousel({
  children,
  duration = 50000,
  direction = "normal",
}: {
  children: ReactNode;
  duration?: number;
  direction?: "normal" | "reverse";
}) {
  return (
    <div className="group relative overflow-x-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className="
          flex w-max min-w-full items-center gap-4
          [animation-play-state:running]
          group-hover:[animation-play-state:paused]
        "
        style={{
          animationName: "infinite-carousel-scroll",
          animationDuration: `${duration}ms`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: direction,
        }}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
