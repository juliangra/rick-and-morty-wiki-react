import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const useRedirectIfInvalidId = (id?: string) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!id || !parseInt(id)) {
      navigate('/404')
    }
  }, [id])
}

export default useRedirectIfInvalidId
