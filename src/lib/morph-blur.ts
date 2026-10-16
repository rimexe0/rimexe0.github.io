import type { ViewTransitionInstance } from "react";

type PseudoElement = { getAnimations(): Animation[] };

// Is the element this transition morphs into a card (and not a list entry)?
export function morphsIntoCard(instance: ViewTransitionInstance) {
  return !!document.querySelector(`.card-shell[data-vt="${instance.name}"]`);
}

// The card that morphs between pages is drawn from a snapshot, and browsers
// can't blur what's behind a snapshot. So while it moves, a real element with
// the same blur follows the moving box underneath it. When a card turns into
// a list entry (or back), the blur fades out (or in) with the card's
// background.
export function blurBehindMorph(
  instance: ViewTransitionInstance,
  fade: "in" | "out" | "none" = "none",
) {
  const group = (instance as unknown as { group: PseudoElement }).group;
  const [move] = group.getAnimations();
  const effect = move?.effect as KeyframeEffect | undefined;
  if (!move || !effect) return;

  const [from, to] = fade === "in" ? [0, 1] : fade === "out" ? [1, 0] : [1, 1];
  const frames = effect
    .getKeyframes()
    .map(({ offset, easing, transform, width, height }) => ({
      offset,
      easing,
      transform,
      width,
      height,
      opacity: from + (to - from) * (offset ?? 0),
    }));
  const { transformOrigin } = getComputedStyle(
    document.documentElement,
    `::view-transition-group(${instance.name})`,
  );

  const box = document.createElement("div");
  Object.assign(box.style, {
    position: "fixed",
    top: "0",
    left: "0",
    zIndex: "50",
    pointerEvents: "none",
    transformOrigin,
    backdropFilter: "blur(8px)",
  });
  document.body.append(box);

  const follow = box.animate(frames, { ...effect.getTiming(), fill: "both" });
  follow.currentTime = move.currentTime;
  move.finished.catch(() => {}).finally(() => box.remove());
  follow.finished.catch(() => {}).finally(() => box.remove());
}
