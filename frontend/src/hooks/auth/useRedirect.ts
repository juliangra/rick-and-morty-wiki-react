/**
 * Redirects to the given hashed url when the authentification state changes.
 *
 * @param url is the url to redirect to.
 **/
const useRedirect = (url: string) => {
  window.location.hash = url
  location.reload()
}

export default useRedirect
