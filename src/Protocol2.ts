import EventEmitter from 'events'
import process from "process"

import NetworkLayer from './Layers/NetworkLayer'
import PhysicalLayer from './Layers/PhysicalLayer'
import {frame} from './Interfaces'

const SenderNetworkLayer = new NetworkLayer()
const SenderPhysicalLayer = new PhysicalLayer()
const ReceiverNetworkLayer = new NetworkLayer()
const ReceiverPhysicalLayer = new PhysicalLayer()
const event = new EventEmitter()

// defining receive_frame event
event.on("receive_frame", () => {
  receiver()
})

// defining send_frame event
event.on("send_frame", () => {
  sender()
})

const sender_info = {
  sender_id: "sender_1",
  network: "X-network",
  ip: "1.2.3.4"
}

// loading the data to network layer of the sender
let dataArr: Array<string> = process.env.data!.split("")
  while (dataArr.length > 8) {
    let frameToSend = {data: "",info: {sender_id:"", network: "", ip: ""}};
    if (dataArr.length < 8) {
      frameToSend.data = dataArr.splice(0).join("")
      frameToSend.info = sender_info
    } else {
      frameToSend.data = dataArr.splice(0,8).join("");
      frameToSend.info = sender_info
    }

    SenderNetworkLayer.to_network_layer(frameToSend)
  }


const sender = () => {
  // adding meta info to the frame
  const frameToSend: frame |undefined = SenderNetworkLayer.from_network_layer()
  
  // sending the frame to second node in network
  SenderPhysicalLayer.to_physical_layer(frameToSend)
  ReceiverPhysicalLayer.to_physical_layer(SenderPhysicalLayer.send())
  event.emit("receive_frame")
}

const receiver = () => {
  const frameToProcess = ReceiverPhysicalLayer.from_physical_layer();
  ReceiverNetworkLayer.to_network_layer(frameToProcess)

  setTimeout(() => {
    console.log(`ACK for frame ${frameToProcess?.data}. ready to receive the next frame`);
    event.emit("send_frame")
  }, Number(process.env.ping))
  
}


// initial trigger for sender node
sender()
