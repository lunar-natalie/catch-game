/**
 * @file Game scene class.
 * @author Natalie Wiggins <islifepeachy@outlook.com>
 * @version 1.0.0
 * @copyright (c) 2023 Natalie Wiggins, Ceri Miller and Sulaiman Syed.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

import * as p5 from "p5";

import { Collectible } from "@entities/collectible";
import { Entity } from "@utils/entity";
import { Player } from "@entities/player";
import { Scene, SceneKeyPressedHandler, SceneKeyReleasedHandler }
    from "@utils/scene";
import { Sketch } from "@game/sketch";
import { Sprite } from "@utils/sprite";

/**
 * Scene for the main game.
 */
export class Game extends Scene implements SceneKeyPressedHandler,
    SceneKeyReleasedHandler {
    /** All entities to be updated and drawn to the canvas. */
    private entities: Entity[];

    /** User-controllable player entity. */
    private player: Player;

    /**
     * Time in milliseconds until a new collectible item entity should be
     * spawned.
     */
    private spawnTimer: number;

    /** Default value to reset {@link spawnTimer} to. */
    private spawnInterval = 600;

    /**
     * Creates the game scene.
     *
     * @param sketch - Parent sketch.
     */
    constructor(sketch: Sketch) {
        super(sketch);
    }

    /**
     * Called once when the sketch starts, used to define initial environment
     * properties such as screen size and background color and to load media
     * such as images and fonts as the program starts.
     *
     * Initializes the player.
     *
     * See {@link Scene.setup}, {@link Sketch.setup} and {@link p5.setup} for
     * more information.
     *
     * @param p - p5 instance.
     */
    setup(p: p5): void {
        // Initialize entity array.
        this.entities = [];

        // Initialize player properties.
        this.player = new Player();
        this.player.sprite.size = { x: 200, y: 200 };
        this.player.accelerationModifier = { x: 1, y: 0.4 };
        this.player.decelerationModifier = { x: 0.0075, y: 0.005 };
        this.player.maxSpeed = { x: 0.75, y: 2 };
        this.player.resetPosition(p);

        // Initialize timer.
        this.spawnTimer = 0;
    }

    /**
     * Continuously executes the lines of code contained inside its block until
     * the program is stopped or {@link p5.noLoop} is called when the scene is
     * active.
     *
     * Clears the canvas, sets canvas properties and updates and draws all
     * current game objects.
     *
     * See {@link Scene.draw}, {@link Sketch.draw} and {@link p5.draw} for more
     * information.
     *
     * @param p - p5 instance.
     */
    draw(p: p5): void {
        // Reset canvas base.
        p.clear(0, 0, 0, 0);
        p.background(0);

        // Conditionally spawn collectibles.
        this.updateSpawnTimer(p);

        // Call entity update routines comprising the main game logic.
        this.player.update(p);
        this.entities.forEach((entity) => {
            entity.update(p);
        });

        // Draw all entities.
        this.player.draw(p);
        this.entities.forEach((entity) => {
            entity.draw(p);
        });
    }

    /**
     * Updates the collectible spawn timer and spawns a collectible if the timer
     * has completed.
     *
     * @param p - p5 instance.
     */
    updateSpawnTimer(p: p5): void {
        if (this.spawnTimer <= 0) {
            this.spawnTimer = this.spawnInterval;
            this.spawnCollectible(p);
        } else {
            this.spawnTimer -= p.deltaTime;
        }
    }

    /**
     * Pushes a new collectible entity to the entities array, randomly
     * positioned on the x-axis and moving from the top to the bottom of the
     * screen.
     *
     * @param p - p5 instance.
     */
    spawnCollectible(p: p5): void {
        const collectibleSprite = new Sprite({ width: 100, height: 100 });
        const collectible = new Collectible({
            x: collectibleSprite.centerPoint.x
                + (Math.random()
                    * (p.width - (2 * collectibleSprite.centerPoint.x))),
            y: -collectibleSprite.centerPoint.y,
            dy: 0.2,
            sprite: collectibleSprite
        });
        this.entities.push(collectible);
    }

    /**
     * Called once every time a key is pressed when the scene is active. The key
     * code for the key that was pressed is stored in the {@link p5.key}
     * variable. For non-ASCII keys, the {@link p5.keyCode} variable is used.
     *
     * Sets player state flags based on controls.
     *
     * See {@link Scene.keyPressed}, {@link Sketch.keyPressed} and
     * {@link p5.keyPressed} for more information.
     *
     * @param p - p5 instance.
     */
    keyPressed(p: p5): void {
        switch (p.key) {
            case " ":
                this.player.isJumping = true;
                break;
            default:
                switch (p.keyCode) {
                    case p.LEFT_ARROW:
                        this.player.inputDirection.left = true;
                        break;
                    case p.RIGHT_ARROW:
                        this.player.inputDirection.right = true;
                        break;
                }
        }
    }

    /**
     * Called once every time a key is released.
     *
     * Clears player state flags based on controls.
     *
     * See {@link Scene.keyReleased}, {@link p5.key}, {@link p5.keyCode}, and
     * {@link p5.keyReleased} for more information.
     *
     * @param p - p5 instance.
     */
    keyReleased(p: p5): void {
        switch (p.key) {
            case " ":
                this.player.isJumping = false;
                break;
            default:
                switch (p.keyCode) {
                    case p.LEFT_ARROW:
                        this.player.inputDirection.left = false;
                        break;
                    case p.RIGHT_ARROW:
                        this.player.inputDirection.right = false;
                        break;
                }
        }
    }
}
