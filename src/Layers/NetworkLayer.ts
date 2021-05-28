// network layer
import {frame, frame_info, NetworkLayerI} from '../Interfaces'

export default class NetworkLayer implements NetworkLayerI {
  sending_queue: Array<frame|undefined>;
  received_queue: Array<frame|undefined>
  constructor() {
    this.sending_queue = [];
    this.received_queue = []
  }

  from_network_layer(): frame | undefined {
    return this.sending_queue.pop()
  }

  to_network_layer(f: frame | undefined): void {
    // passing some tests on f.info
    this.sending_queue.unshift(f);
  }


  // sending and receiving need to be implemented too

} 
