export interface PhysicalLayerI{
  received_queue: Array<frame | undefined>,
  sending_queue: Array<frame | undefined>,
  from_physical_layer(): frame | undefined
  to_physical_layer(f: frame | undefined): void
  send(): frame | undefined
  receive(): void
}

export interface NetworkLayerI{
  received_queue: Array<frame | undefined>,
  sending_queue: Array<frame| undefined>,
  from_network_layer(): frame | undefined
  to_network_layer(f : frame| undefined): void
}

export interface frame_info {
  ip: string,
  network: string,
  sender_id: string
}

export interface frame {
  data: string | undefined,
  info: frame_info
}
