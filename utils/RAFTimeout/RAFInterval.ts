import type { RAFTimerHandler, RAFTimer } from "./types"

export const requestInterval = (
  fn: RAFTimerHandler,
  delay: number,
): RAFTimer => {
  let start: number
  const timer: RAFTimer = Object.create(null) // * we need to use an object to ref the ready-to-act raq
  const loop = (timestamp: number) => {
    if (start === undefined) start = timestamp
    const elapsed = timestamp - start
    if (elapsed >= delay) {
      fn()
      start += delay
    }
    timer.id = requestAnimationFrame(loop)
  }
  timer.id = requestAnimationFrame(loop)
  return timer
}

export const clearRequestInterval = (timer: RAFTimer) =>
  cancelAnimationFrame(timer.id)
