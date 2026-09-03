"use client";
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRef } from "react";

const FIRST_LAYER_WIDTH = 140;
const SECOND_LAYER_WIDTH = 130;
const LAYER_HEIGHT = 140;
const EXTRA_TRACK_ITEMS = 2;
const LOGO_MIN_SIZE = 100;
const LOGO_MAX_SIZE = 150;
const LOGO_SIZE_RATIO = 0.14;
const LOGO_HORIZONTAL_MARGIN_RATIO = 0.12;
const LOGO_VERTICAL_MARGIN_RATIO = 0.9;
const SCROLL_DURATION = 4000;

type BackgroundMetrics = {
  logoSize: number;
  marginLeft: number;
  marginBottom: number;
  pitch: number;
  logoCount: number;
};

function getBackgroundMetrics(width: number, height: number): BackgroundMetrics {
  const shortEdge = Math.min(width, height);
  const logoSize = Math.min(
    LOGO_MAX_SIZE,
    Math.max(LOGO_MIN_SIZE, Math.round(shortEdge * LOGO_SIZE_RATIO))
  );
  const marginLeft = Math.round(logoSize * LOGO_HORIZONTAL_MARGIN_RATIO);
  const marginBottom = Math.round(logoSize * LOGO_VERTICAL_MARGIN_RATIO);
  const pitch = logoSize + marginLeft;
  const rowHeight = logoSize + marginBottom;
  const columns =
    Math.ceil((width * (FIRST_LAYER_WIDTH / 100)) / pitch) +
    EXTRA_TRACK_ITEMS;
  const rows =
    Math.ceil((height * (LAYER_HEIGHT / 100)) / rowHeight) + EXTRA_TRACK_ITEMS;

  return {
    logoSize,
    marginLeft,
    marginBottom,
    pitch,
    logoCount: columns * rows,
  };
}

function BackgroundLogo({
  logoSize,
  marginLeft,
  marginBottom,
}: {
  logoSize: number;
  marginLeft: number;
  marginBottom: number;
}) {
  return (
    <div aria-hidden="true">
      <Image
        src="/logo.png"
        width={logoSize}
        height={logoSize}
        alt=""
        loading="eager"
        style={{ marginBottom, marginLeft }}
      />
    </div>
  );
}

export default function Background() {
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(0);
  const [metrics, setMetrics] = React.useState<BackgroundMetrics | null>(null);
  const pauseTimer = useRef<number | undefined>(undefined);
  const leftScroll = useMotionValue(0);
  const rightScroll = useMotionValue(-112);
  const wrapDistance = useRef(112);
  const scrollRate = useRef(1);
  const targetScrollRate = useRef(1);

  useEffect(() => {
    let frame: number | undefined;

    const updateMetrics = () => {
      const nextMetrics = getBackgroundMetrics(
        window.innerWidth,
        window.innerHeight
      );

      setMetrics((currentMetrics) => {
        if (
          currentMetrics?.logoSize === nextMetrics.logoSize &&
          currentMetrics.marginLeft === nextMetrics.marginLeft &&
          currentMetrics.marginBottom === nextMetrics.marginBottom &&
          currentMetrics.logoCount === nextMetrics.logoCount
        ) {
          return currentMetrics;
        }

        return nextMetrics;
      });
    };

    const scheduleMetricsUpdate = () => {
      if (frame !== undefined) {
        return;
      }

      frame = requestAnimationFrame(() => {
        frame = undefined;
        updateMetrics();
      });
    };

    const viewport = window.visualViewport;
    scheduleMetricsUpdate();
    window.addEventListener("resize", scheduleMetricsUpdate);
    viewport?.addEventListener("resize", scheduleMetricsUpdate);

    return () => {
      if (frame !== undefined) {
        cancelAnimationFrame(frame);
      }
      window.removeEventListener("resize", scheduleMetricsUpdate);
      viewport?.removeEventListener("resize", scheduleMetricsUpdate);
    };
  }, []);

  useEffect(() => {
    if (!metrics) {
      return;
    }

    const previousPitch = wrapDistance.current;
    const leftProgress = leftScroll.get() / previousPitch;
    const rightProgress = rightScroll.get() / previousPitch;

    wrapDistance.current = metrics.pitch;
    leftScroll.set(leftProgress * metrics.pitch);
    rightScroll.set(rightProgress * metrics.pitch);
  }, [leftScroll, metrics, rightScroll]);

  const imgRow = React.useMemo(() => {
    if (!metrics) {
      return null;
    }

    return Array.from({ length: metrics.logoCount }, (_, index) => (
      <BackgroundLogo
        key={index}
        logoSize={metrics.logoSize}
        marginLeft={metrics.marginLeft}
        marginBottom={metrics.marginBottom}
      />
    ));
  }, [metrics]);

  useEffect(() => {
    const update = (event: MouseEvent) => {
      setX((event.clientX - window.innerWidth / 2) / 50);
      setY((event.clientY - window.innerHeight / 2) / 50);
    };

    window.addEventListener("mousemove", update);
    return () => {
      window.removeEventListener("mousemove", update);
    };
  }, []);

  useAnimationFrame((_time, delta) => {
    const easingDuration = targetScrollRate.current === 0 ? 180 : 220;
    const easingFactor = 1 - Math.exp((-5 * delta) / easingDuration);
    const nextRate =
      scrollRate.current +
      (targetScrollRate.current - scrollRate.current) * easingFactor;

    scrollRate.current =
      Math.abs(targetScrollRate.current - nextRate) < 0.005
        ? targetScrollRate.current
        : nextRate;

    const distance =
      (wrapDistance.current / SCROLL_DURATION) * scrollRate.current * delta;
    const wrapOffset = (value: number) => {
      const remainder = value % wrapDistance.current;
      return remainder > 0 ? remainder - wrapDistance.current : remainder;
    };

    leftScroll.set(wrapOffset(leftScroll.get() - distance));
    rightScroll.set(wrapOffset(rightScroll.get() + distance));
  });

  return (
    <div aria-hidden="true">
      <div className="opacity-[0.50] absolute" id="noise"></div>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0"
          style={{ transform: "translate(-17.5%, -15.5556%) rotate(-12deg)" }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute mix-blend-multiply"
            style={{
              width: `${FIRST_LAYER_WIDTH}%`,
              height: `${LAYER_HEIGHT}%`,
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <motion.div
              className="w-full flex flex-wrap"
              style={{ x: leftScroll }}
            >
              {imgRow}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute"
            style={{
              width: `${SECOND_LAYER_WIDTH}%`,
              height: `${LAYER_HEIGHT}%`,
              transform: `translate(${-x}px, ${-y + 100}px)`,
            }}
          >
            <motion.div
              className="w-full flex flex-wrap"
              style={{ x: rightScroll }}
            >
              {imgRow}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
