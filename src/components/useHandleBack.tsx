// useHandleBack.js
import { useRouter } from 'next/navigation'

const useHandleBack = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back() // Go back to the previous page
  }

  return handleBack
}

export default useHandleBack
