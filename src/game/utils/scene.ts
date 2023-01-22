/**
 * @file Scene class.
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

import { Sketch } from "@game/sketch";

/**
 * Represents the drawing functionality, game logic and event handlers to be
 * used in a distinct stage of the game's sketch. A scene should be able to
 * represent any graphical data independantly from any other scene.
 */
export abstract class Scene {
    /** Parent sketch from which the scene should have been initialized. */
    protected sketch: Sketch;

    /**
     * Creates a new scene.
     *
     * @param sketch - Parent sketch.
     */
    constructor(sketch: Sketch) {
        this.sketch = sketch;
    }

    /**
     * Called before {@link setup} to handle asynchronous loading of external
     * files in a blocking way.
     *
     * See {@link Sketch.preload} and {@link p5.preload} for more information.
     *
     * @param _p - p5 instance.
     */
    preload(_p: p5): void {
    }

    /**
     * Called once when the sketch starts, used to define initial environment
     * properties such as screen size and background color and to load media
     * such as images and fonts.
     *
     * See {@link Sketch.setup} and {@link p5.setup} for more information.
     *
     * @param _p - p5 instance.
     */
    setup(_p: p5): void {
    }

    /**
     * Continuously executes the lines of code contained inside its block until
     * the program is stopped or {@link p5.noLoop} is called when the scene is
     * active.
     *
     * See {@link Sketch.draw} and {@link p5.draw} for more information.
     *
     * @param _p - p5 instance.
     */
    draw(_p: p5): void {
    }

    /**
     * Called once every time a key is pressed when the scene is active. The key
     * code for the key that was pressed is stored in the {@link p5.key}
     * variable. For non-ASCII keys, the {@link p5.keyCode} variable is used.
     *
     * See {@link Sketch.keyPressed} and {@link p5.keyPressed} for more
     * information.
     *
     * @param _p - p5 instance.
     * @param _event - KeyboardEvent callback argument.
     */
    keyPressed(_p: p5, _event?: object): void {
    }

    /**
     * Called once every time a key is released when the scene is active.
     *
     * See {@link Sketch.keyReleased}, {@link p5.key}, {@link p5.keyCode}, and
     * {@link p5.keyReleased} for more information.
     *
     * @param _p - p5 instance.
     * @param _event - KeyboardEvent callback argument.
     */
    keyReleased(_p: p5, _event?: object): void {
    }
}