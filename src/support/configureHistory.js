import {createBrowserHistory, createHashHistory} from 'history'

export default () => {
  return window.matchMedia('(display-mode: standalone)').matches
    ? createHashHistory()
    : createBrowserHistory()
}
