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

import { Player } from "@entities/player";
import { Scene } from "@utils/scene";
import { Sketch } from "@game/sketch";

/**
 * Scene for the main game.
 */
export class Game extends Scene {
    private player: Player;

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
        // Initialize player properties.
        this.player = new Player();
        this.player.sprite.size = { x: 200, y: 200 };
        this.player.accelerationModifier = { x: 1, y: 0.4 };
        this.player.decelerationModifier = { x: 0.0075, y: 0.005 };
        this.player.maxSpeed = { x: 0.75, y: 2 };
        this.player.resetPosition(p);
    }

    /**
     * Continuously executes the lines of code contained inside its block until
     * the program is stopped or {@link p5.noLoop} is called when the scene is
     * active.
     *
     * Clears the canvas, sets canvas properties and updates and draws all
     * current game object.
     *
     * See {@link Scene.draw}, {@link Sketch.draw} and {@link p5.draw} for more
     * information.
     *
     * @param p - p5 instance.
     */
    draw(p: p5): void {
        p.clear();
        p.background(0);
        this.player.update(p);
        this.player.draw(p);
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
     * @param _event - KeyboardEvent callback argument.
     */
    keyPressed(p: p5, _event?: object): void {
        switch (p.key) {
            case ' ':
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
     * @param _event - KeyboardEvent callback argument.
     */
    keyReleased(p: p5, _event?: object): void {
        switch (p.key) {
            case ' ':
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