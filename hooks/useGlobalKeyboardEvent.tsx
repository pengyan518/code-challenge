import {useEffect} from 'react'
import {useMainContext} from '../contexts/MainContext'

export function useGlobalKeyboardEvent() {
  const {showSuggestion, setShowSuggestion, setShowSearchPopup} = useMainContext()

  useEffect(() => {
    const handler = (event: {metaKey: Boolean | any; key: string; ctrlKey: any; preventDefault: () => void}) => {
      if (event.key === 'ArrowUp' || (event.ctrlKey && event.key === 'p')) {
        event.preventDefault()
      } else if (event.key === 'ArrowDown' || (event.ctrlKey && event.key === 'n')) {
        event.preventDefault()
      } else if (event.key === 'Enter') {
        event.preventDefault()
      } else if ((event.ctrlKey && event.key === 'k') || (event.metaKey && event.key === 'k')) {
        event.preventDefault()
        setShowSearchPopup(true)
      } else if (event.key === 'Escape') {
        event.preventDefault()
        setShowSearchPopup(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setShowSearchPopup])
}
