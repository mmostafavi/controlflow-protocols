// physical layer
import {frame, PhysicalLayerI} from '../Interfaces'

export default class PhysicalLayer implements PhysicalLayerI {
  sending_queue: Array<frame | undefined>;
  received_queue: Array<frame | undefined>
  constructor() {
    this.sending_queue = [];
    this.received_queue = []
  }

  from_physical_layer(): frame | undefined {
    return this.sending_queue.pop()
  }

  to_physical_layer(f: frame | undefined): void {
    this.sending_queue.unshift(f);
  }

  receive(): number {
    return this.received_queue.unshift()
  }

  send(): frame | undefined {
    return this.sending_queue.pop()
  }
  // sending and receiving need to be implemented too

} 
