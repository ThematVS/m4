import Circle from '../mesh/circle'
import Hatch from '../mesh/hatch'
import Line from '../mesh/vline'
import RectMask from '../mesh/rect_mask'
import CircleMask from '../mesh/circle_mask'
import Checkers from '../mesh/checkers'
import Floor from '../mesh/floor'

export default {
  [RectMask.name]: RectMask,
  [CircleMask.name]: CircleMask,
  [Circle.name]: Circle,
  [Hatch.name]: Hatch,
  [Line.name]: Line,
  [Checkers.name]: Checkers,
  [Floor.name]: Floor,
}
