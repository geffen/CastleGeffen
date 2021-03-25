/// --- Set up a system ---

class RotatorSystem {
  // this group will contain every entity that has a Transform component
  group = engine.getComponentGroup(Transform)

  update(dt: number) {
    // iterate over the entities of the group
    for (let entity of this.group.entities) {
      // get the Transform component of the entity
      const transform = entity.getComponent(Transform)

      // mutate the rotation
      transform.rotate(Vector3.Up(), dt * 10)
    }
  }
}

// Add a new instance of the system to the engine
engine.addSystem(new RotatorSystem())

/// --- Spawner function ---

function spawnCube(x: number, y: number, z: number) {
    // create the entity
    const cube = new Entity()

    // add a transform to the entity
    cube.addComponent(new Transform({ position: new Vector3(x, y, z)}))

    // add a shape to the entity
    cube.addComponent(new BoxShape())

    // add the entity to the engine
    engine.addEntity(cube)

    return cube
}

function spawnZcash(x: number, y: number, z: number) {
    // create the entity
    const zcash = new Entity()
    const randomz = Math.random() * 4 + 1
    // add a transform to the entity

    zcash.addComponent(new Transform({ position: new Vector3(x, y, z), scale: new Vector3(randomz, randomz, randomz) }))

    // add a shape to the entity
    //cube.addComponent(new BoxShape())
    zcash.addComponent(new GLTFShape('models/zcash.gltf'))

    // add the entity to the engine
    engine.addEntity(zcash)

    return zcash
}

/// --- Spawn a cube ---

const cube = spawnCube(8, 1, 8)

cube.addComponent(
  new OnClick(() => {
    cube.getComponent(Transform).scale.z *= 1.1
    cube.getComponent(Transform).scale.x *= 0.9

    spawnZcash(Math.random() * 8 + 1, Math.random() * 8, Math.random() * 8 + 1)
  })
)

 //--- add mushroom model and placement

export function addMushroom(x:number,y:number,z:number) {
    let mushroom = new Entity()
    mushroom.addComponent(new GLTFShape('models/mushroom.glb'))
    mushroom.addComponent(
        new Transform({
            //rotation: Quaternion.Euler(0, -180, 0),
            position: new Vector3(x,y,z)
            scale: new Vector3(.5,.5,.5)
        })
    )
    engine.addEntity(mushroom)
}

// put mushrooms in the center of the 3 plots
addMushroom(16, 0, 16)
addMushroom(16, 0, 48)
addMushroom(48, 0, 48)

//make a bunch zcash everywhere

for (let i = 0; i < 180; i++) {
    spawnZcash(Math.random() * 16 + 8, Math.random() * 16, Math.random() * 16 + 8)
}
for (let i = 0; i < 180; i++) {
    spawnZcash(Math.random() * 16 + 8, Math.random() * 16, Math.random() * 16 + 40)
}
for (let i = 0; i < 180; i++) {
    spawnZcash(Math.random() * 16 + 40, Math.random() * 16, Math.random() * 16 + 40)
}

