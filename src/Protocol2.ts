import EventEmitter from 'events'
import process from "process"

import NetworkLayer from './Layers/NetworkLayer'
import PhysicalLayer from './Layers/PhysicalLayer'
import {frame} from './Interfaces'


const event = new EventEmitter()

export default class Protocol2 {
  private process
  SenderNetworkLayer: any 
  SenderPhysicalLayer: any 
  ReceiverNetworkLayer: any 
  ReceiverPhysicalLayer: any
  delay_in_channel: number 
  frameCounter: number
  constructor(process: any, data: string, delay_in_channel: number){
    this.SenderNetworkLayer = new NetworkLayer()
    this.SenderPhysicalLayer = new PhysicalLayer()
    this.ReceiverNetworkLayer = new NetworkLayer()
    this.ReceiverPhysicalLayer = new PhysicalLayer()

    this.delay_in_channel = delay_in_channel
    this.frameCounter = 1
    this.process = process
    // defining receive_frame event
    event.on("receive_frame", () => {
      this.receiver()
    })

    // defining send_frame event
    event.on("send_frame", () => {
      this.sender()
    })

    const sender_info = {
      sender_id: "sender_1",
      network: "X-network",
      ip: "1.2.3.4"
    }
    
    // loading the data to network layer of the sender
    let dataArr: Array<string> | [] = data.split("")
      while (dataArr.length > 0) {
        let frameToSend = {data: "",info: {sender_id:"", network: "", ip: ""}};
        if (dataArr.length < 8) {
          frameToSend.data = dataArr.splice(0).join("")
          frameToSend.info = sender_info
        } else {
          frameToSend.data = dataArr.splice(0,8).join("");
          frameToSend.info = sender_info
        }
    
        this.SenderNetworkLayer.to_network_layer(frameToSend)
      }
  }

  private sender = () => {
    // adding meta info to the frame
    const frameToSend: frame |undefined = this.SenderNetworkLayer.from_network_layer()
    
    // sending the frame to second node in network
    this.SenderPhysicalLayer.to_physical_layer(frameToSend)
    this.ReceiverPhysicalLayer.to_physical_layer(this.SenderPhysicalLayer.send())
    setTimeout(() => {
      console.log(`Sender ==> The frame ${frameToSend?.data} with id of ${this.frameCounter} is sent. waiting for ACK`);
      event.emit("receive_frame")
    }, Number(this.delay_in_channel)/2)
  }
  
  private receiver = () => {
    const frameToProcess = this.ReceiverPhysicalLayer.from_physical_layer();
    this.ReceiverNetworkLayer.to_network_layer(frameToProcess)
  
    if (frameToProcess?.data === undefined){
      console.log("receiver ==> There isn't any incoming frame. Connection ends");
      this.process.exit()
    }
    setTimeout(() => {
      console.log(`receiver ==> ACK for frame ${frameToProcess?.data} with id of ${this.frameCounter}. waiting for the frame with id of ${this.frameCounter + 1}`);
      this.frameCounter++
      event.emit("send_frame")
    }, Number(this.delay_in_channel) / 2)
    
  }

  start() {
    this.sender()
  }
}
