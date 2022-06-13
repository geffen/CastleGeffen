

//Let's make some ground first. Array handmade from estate shape.
const ground = [
    "0,0",
    "0,16",
    "16,0",
    "16,16",
    "0,32",
    "16,32",
    "0,48",
    "16,48",
    "48,32",
    "48,48",
    "32,48",
    "32,32"]

ground.forEach(function (value) {
    var locArr = value.split(',')
    //log("x:", Number(locArr[0]))
    //log("y:", Number(locArr[1]))

    let floor = new Entity()
    floor.addComponent(new GLTFShape('models/ground.glb'))
    floor.addComponent(
        new Transform({
            position: new Vector3(Number(locArr[0]) + 8, .00, Number(locArr[1]) + 8),
        })
    )
    engine.addEntity(floor)
})
/*
let terrain = new Entity()
    terrain.addComponent(new GLTFShape('models/terrain.glb'))
    terrain.addComponent(
        new Transform({
            position: new Vector3(0,0,0), rotation: Quaternion.Euler(0, 0, 0) 
        })
    )
    engine.addEntity(terrain)
    */
    /*
function spawnGrass(shape: Shape, x: number, y: number, z: number) {
    // create the entity
    const grass = new Entity()

    // add a transform to the entity
    grass.addComponent(
        new Transform({
            position: new Vector3(x, y, z),
            rotation: Quaternion.Euler(0, Math.random() * 30, 0),
            scale: new Vector3(1, 0.5 + Math.random() / 2, 1),
        })
    )

    // add a shape to the entity
    grass.addComponent(shape)

    //grass.addComponent(new WaveGrass())

    let col = new Material()
    col.albedoColor = new Color3(x / 16, y / 16, z / 4)
    grass.addComponent(col)

    engine.addEntity(grass)

    return grass
}


/// --- Spawn grass blades ---

let grassShape = new GLTFShape('models/justflowers.glb')
//let grass2Shape = new GLTFShape('models/grass2.glb')
//let grass3Shape = new GLTFShape('models/grass3.glb')

//Main strip

for (var x = 1.5; x < 30; x++) {
    for (var y = 1.5; y < 64; y++) {
        // select a glb mesh randomly from the 3 variations
        let selector = Math.random()

        if (selector > 0.96) {
            spawnGrass(grassShape, x, -.3, y)
        } else if (selector < 0.1) {
           // spawnGrass(grass2Shape, x, .1, y)
        } else {
            //spawnGrass(grass3Shape, x, .1, y)
        }
    }
}
for (var x = 28; x < 63; x++) {
    for (var y = 34; y < 63; y++) {
        // select a glb mesh randomly from the 3 variations
        let selector = Math.random()

          if (selector > 0.96) {
            spawnGrass(grassShape, x, -.3, y)
        } else if (selector < 0.1) {
            //spawnGrass(grass2Shape, x, .1, y)
        } else {
         //   spawnGrass(grass3Shape, x, .1, y)
        }
    }
}
*/