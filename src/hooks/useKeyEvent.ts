import { useRef } from "react"

export const useKeyEvent = () => {
  const keyPressedTime = useRef(0)

  // spaceキーを押し始めたか
  const isKeyDownSpaceStart = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      if (keyPressedTime.current === 0) {
        keyPressedTime.current = performance.now()
        return true
      }
      return false
    }
  }

  // 一定時間のspaceキー入力があったかどうか
  const isKeyUpSpaceHeldAndReleased = (e: KeyboardEvent) => {
    if (e.code === "Space") {
      if (performance.now() - keyPressedTime.current > 500) {
        keyPressedTime.current = 0
        return true
      }
      keyPressedTime.current = 0
      return false
    }
  }

  return {
    isKeyDownSpaceStart,
    isKeyUpSpaceHeldAndReleased,
  } as const
}
