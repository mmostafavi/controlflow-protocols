import Protocol2 from './Protocol2'
const fs = require('fs')

fs.readFile('./src/input.json', 'utf8' , (err: any, data: any) => {
  if (err) {
    console.error(err)
    return
  }
  const {input: bitStream, delay_in_channel} = JSON.parse(data)
  

  const protocol2 = new Protocol2(process, bitStream, delay_in_channel)
  protocol2.start()

})


