import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'

export const setupIcon = () => {
  library.add(faMinus, faPlus)
}