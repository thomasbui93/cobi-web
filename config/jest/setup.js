import 'raf/polyfill'
import { setupIcon } from '../../src/services/icon'

const Enzyme = require("enzyme")
const Adapter = require("enzyme-adapter-react-16")

Enzyme.configure({ adapter: new Adapter() }) 
setupIcon()