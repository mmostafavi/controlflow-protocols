export interface PhysicalLayerI{
  received_queue: Array<number>,
  sending_queue: Array<number>,
  from_physical_layer(): number | undefined
  to_physical_layer(f: number): void
}

export interface NetworkLayerI{
  received_queue: Array<number>,
  sending_queue: Array<number>,
  from_network_layer(): number | undefined
  to_network_layer(f : number): void
}
