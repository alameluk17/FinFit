import { Entity,timer,collision} from "melonjs";

class BuildingEntity extends Entity{

    
        constructor(x, y, settings) {
            // call the parent constructor
            super(x, y , settings);
            this.panel = null;
            this.body.setFriction(0, 0);
            this.lastCollisionTime = timer.getTime();
            this.body.collisionType = collision.types.ACTION_OBJECT;
        }
        onCollision(response, other) {
            return false;
        }
    }

export default BuildingEntity;