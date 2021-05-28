// physical layer
import {PhysicalLayerI} from '../Interfaces'

class PhysicalLayer implements PhysicalLayerI {
  sending_queue: Array<number>;
  received_queue: Array<number>
  constructor() {
    this.sending_queue = [];
    this.received_queue = []
  }

  from_physical_layer(): number | undefined {
    return this.received_queue.pop()
  }

  to_physical_layer(f: number): void {
    this.sending_queue.unshift(f);
  }


  // sending and receiving need to be implemented too

} 
