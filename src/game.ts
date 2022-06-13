import * as utils from "@dcl/ecs-scene-utils"
import { movePlayerTo } from '@decentraland/RestrictedActions'

import { WearablesScanner } from './scanner'
import { buildScene } from './builderContent'
import Door from './door'
export const sceneMessageBus = new MessageBus()
buildScene()

const door = new Door(
  new GLTFShape('models/Door_Fantasy.glb'),
  {
    position: new Vector3(37, 28.5, 51.15),
    rotation: new Quaternion(0, -1, 0, 1),
    scale: new Vector3(2.2, 1, 1.1)
  },
  'Open',
  'Close'
)

const scanner = new WearablesScanner( //(35.6, 28.5, 48)(14.5, 0, 17.5)
  { position: new Vector3(34, 27.5, 46), rotation: Quaternion.Euler(0, -60, 0) }, //todo:link to shop if you continue underneath (0, -220, 0)
  'urn:decentraland:matic:collections-v2:0xe85f8e6e554da74cf402d36e13a6e93405fa0b91:0',
  sceneMessageBus,
  () => {
    sceneMessageBus.emit('openDoor', {})
    door.addComponentOrReplace(
      new utils.Delay(5000, () => {
        sceneMessageBus.emit('closeDoor', {})
      })
    )
  },
  () => {
    sceneMessageBus.emit('closeDoor', {})
  }
)
sceneMessageBus.on('scanning', () => {
  scanner.scan()
})

sceneMessageBus.on('scanapprove', () => {
  scanner.approve()
})
sceneMessageBus.on('scanreject', () => {
  scanner.reject()
  //door.toggle(true)
})
sceneMessageBus.on('openDoor', () => {
  if (!door.isOpen) {
    door.toggle(true)
  }
})
sceneMessageBus.on('closeDoor', () => {
  if (door.isOpen) {
    door.toggle(false)
  }
})


class RotatorSystem {
  // this group will contain every entity that has a Transform component
  group = engine.getComponentGroup(Transform)

  update(dt: number) {
    // iterate over the entities of the group
    for (let entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform)

      // mutate the rotation
      //transform.rotate(Vector3.Up(), dt * 10)
    }
  }
}


//let FullBillboard = new Billboard() // rotate on all three axis
let YBillboard = new Billboard(true, true ,true) // rotate only in theY axis

const respawner = new Entity()
//respawner.addComponent(new BoxShape())
//const tower = new GLTFShape("models/centerCastle.gtlf")
respawner.addComponent(new GLTFShape('models/honorguard_storyteller.glb'))
// add it to stare at camera
respawner.addComponent(new Billboard())

respawner.addComponent(new Transform({ position: new Vector3(19.1, 0, 21), scale: new Vector3(5, 5, 5) }))
respawner.addComponent(
  new OnPointerDown(
    (e) => {
      movePlayerTo({ x: 15, y: 120, z: 48 }, { x: 64, y: 0, z: 64 })
      //NEED: a console tool to capture current location and angle OR can the second set of cordinates point to the current location of a model (user??)?
    },
    { hoverText: "Do you wish to visit the Castle?" }
  )
)
engine.addEntity(respawner)


// Let's place our castle. '
function spawnCastle(x: number, y: number, z: number) {
    // create the entity
    const castle = new Entity()
    // add a transform to the entity
    castle.addComponent(new Transform({ position: new Vector3(x, y, z), scale: new Vector3(.8, .6, .8), rotation: Quaternion.Euler(0, 270, 0) }))
    // add a shape to the entity
    //cube.addComponent(new BoxShape())
    castle.addComponent(new GLTFShape('models/Final_for_geffenz.glb'))
    // add the entity to the engine
    engine.addEntity(castle)
    return castle
}
spawnCastle(7,10,62)


function spawnStore(x: number, y: number, z: number) {
    // create the entity
    const store = new Entity()
    // add a transform to the entity

    store.addComponent(new Transform({ position: new Vector3(x, y, z), scale: new Vector3(1.3, 1.3, 1.3), rotation: Quaternion.Euler(0, 140, 0) }))

    // add a shape to the entity
    //cube.addComponent(new BoxShape())
    store.addComponent(new GLTFShape('models/ramenshop.glb'))

    // add the entity to the engine
    engine.addEntity(store)

    return store
}

spawnStore(16,.1,16)




const nftFrame = new Entity()
const shapeComponent = new NFTShape(
  "ethereum://0x8a90cab2b38dba80c64b7734e58ee1db38b8992e/373", //doodle
  //"ethereum://0xe75113d4a417c2d33c67fb127b419e5f47c5d62c/6786", //potm
  //"ethereum://0x49cf6f5d44e70224e2e23fdcdd2c053f30ada28b/13856", //clonex
  {
    style: PictureFrameStyle.None,
  }
)
nftFrame.addComponent(shapeComponent)
nftFrame.addComponent(
  new Transform({

    position: new Vector3(15.83, 1.6, 11.94), rotation: Quaternion.Euler(0, -40, 0), scale : new Vector3(2.3,2.75,2.3)
  })
)
engine.addEntity(nftFrame)

buildScene()