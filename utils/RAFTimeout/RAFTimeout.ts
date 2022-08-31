import type { RAFTimerHandler, RAFTimer } from "./types"

export const requestTimeout = (
  fn: RAFTimerHandler,
  delay: number,
): RAFTimer => {
  let start: number
  const timer: RAFTimer = Object.create(null)
  const loop = (timestamp: number) => {
    if (start === undefined) start = timestamp
    const elapsed = timestamp - start
    if (elapsed >= delay) {
      fn()
    } else {
      timer.id = requestAnimationFrame(loop)
    }
  }
  timer.id = requestAnimationFrame(loop)
  return timer
}

export const clearRequestTimeout = (timer: RAFTimer) =>
  cancelAnimationFrame(timer.id)
