// network layer
import {NetworkLayerI} from '../Interfaces'

class NetworkLayer implements NetworkLayerI {
  sending_queue: Array<number>;
  received_queue: Array<number>
  constructor() {
    this.sending_queue = [];
    this.received_queue = []
  }

  from_network_layer(): number | undefined {
    return this.received_queue.pop()
  }

  to_network_layer(f: number): void {
    this.sending_queue.unshift(f);
  }


  // sending and receiving need to be implemented too

} 
