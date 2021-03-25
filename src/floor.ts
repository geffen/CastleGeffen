import { Noise } from '@dcl/noise-utils'
// --- Set up a system ---

class PerlinNoiseSystem implements ISystem {
    group: Entity[] = []
    active: boolean = false
    timer: number = 0
    update(dt: number) {
        this.timer += dt / 4

        // iterate over the entities of the group
        for (let entity of this.group) {
            // get the Transform component of the entity
            const transform = entity.getComponent(Transform)

            // set the height of the entity based on a simplex3 function, using its position on the grid and the time
            transform.position.y =
                Noise.simplex3(
                    transform.position.x / 16,
                    this.timer,
                    transform.position.z / 16
                ) + 1
        }
    }
}

/// --- Spawner function ---
let noiseSystem = new PerlinNoiseSystem()

function spawnCube(box: Shape, x: number, y: number, z: number) {
    // create the entity
    const cube = new Entity()
    cube.addComponent(new Transform({ position: new Vector3(x, y, z) }))
    cube.addComponent(box)
    engine.addEntity(cube)

    let col = new Material()
    col.albedoColor = new Color3(x / 16, y / 16, z / 4)
    cube.addComponent(col)

    cube.addComponent(
        new OnClick(() => {
            if (!noiseSystem.active) {
                engine.addSystem(noiseSystem)
                noiseSystem.active = true
            } else {
                engine.removeSystem(noiseSystem)
                noiseSystem.active = false
            }
        })
    )

    noiseSystem.group.push(cube)

    return cube
}

/// --- Reusable box shape ---
let box = new BoxShape()

/// --- Spawn the cubes as a grid ---
for (var x = 0.5; x < 16; x++) {
    for (var y = 0.5; y < 16; y++) {
        let height = Noise.simplex3(x / 16, 0, y / 16) + 1
        spawnCube(box, x, height, y)
    }
}

