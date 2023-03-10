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
 * represent any graphical data independently from any other scene.
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
     * Continuously executes the lines of code contained inside its block until
     * the program is stopped or {@link p5.noLoop} is called when the scene is
     * active.
     *
     * See {@link Sketch.draw} and {@link p5.draw} for more information.
     *
     * @param p - p5 instance.
     */
    abstract draw(p: p5): void;

    /**
     * Checks if a scene implements the preload handler.
     *
     * See {@link ScenePreloadHandler}.
     *
     * @param scene - Scene to check.
     * @returns `true` if the scene implements the handler, otherwise `false`.
     */
    static hasPreloadHandler(scene: object): scene is ScenePreloadHandler {
        return (
            scene &&
            "preload" in scene &&
            typeof scene["preload"] === "function"
        );
    }

    /**
     * Checks if a scene implements the setup handler.
     *
     * See {@link SceneSetupHandler}.
     *
     * @param scene - Scene to check.
     * @returns `true` if the scene implements the handler, otherwise `false`.
     */
    static hasSetupHandler(scene: object): scene is SceneSetupHandler {
        return (
            scene && "setup" in scene && typeof scene["setup"] === "function"
        );
    }

    /**
     * Checks if a scene implements the key pressed event handler.
     *
     * See {@link SceneKeyPressedHandler}.
     *
     * @param scene - Scene to check.
     * @returns `true` if the scene implements the handler, otherwise `false`.
     */
    static hasKeyPressedHandler(
        scene: object
    ): scene is SceneKeyPressedHandler {
        return (
            scene &&
            "keyPressed" in scene &&
            typeof scene["keyPressed"] === "function"
        );
    }

    /**
     * Checks if a scene implements the key released event handler.
     *
     * See {@link SceneKeyReleasedHandler}.
     *
     * @param scene - Scene to check.
     * @returns `true` if the scene implements the handler, otherwise `false`.
     */
    static hasKeyReleasedHandler(
        scene: object
    ): scene is SceneKeyReleasedHandler {
        return (
            scene &&
            "keyReleased" in scene &&
            typeof scene["keyReleased"] === "function"
        );
    }
}

/**
 * Implemented by scenes to provide a handler for the p5 preload event.
 */
export interface ScenePreloadHandler {
    /**
     * Called (before {@link SceneSetupHandler.setup} if implemented in the
     * scene) to handle asynchronous loading of external files in a blocking
     * way.
     *
     * See {@link Sketch.preload} and {@link p5.preload} for more information.
     *
     * @param p - p5 instance.
     */
    preload(p: p5): void;
}

/**
 * Implemented by scenes to provide a handler for the p5 setup event.
 */
export interface SceneSetupHandler {
    /**
     * Called once when the sketch starts, used to define initial environment
     * properties such as screen size and background color and to load media
     * such as images and fonts.
     *
     * See {@link Sketch.setup} and {@link p5.setup} for more information.
     *
     * @param p - p5 instance.
     */
    setup(p: p5): void;
}

/**
 * Implemented by scenes to provide a handler for the p5 key pressed event.
 */
export interface SceneKeyPressedHandler {
    /**
     * Called once every time a key is pressed when the scene is active. The key
     * code for the key that was pressed is stored in the {@link p5.key}
     * variable. For non-ASCII keys, the {@link p5.keyCode} variable is used.
     *
     * See {@link Sketch.keyPressed} and {@link p5.keyPressed} for more
     * information.
     *
     * @param p - p5 instance.
     * @param event - KeyboardEvent callback argument.
     */
    keyPressed(p: p5, event?: object): void;
}

/**
 * Implemented by scenes to provide a handler for the p5 key released event.
 */
export interface SceneKeyReleasedHandler {
    /**
     * Called once every time a key is released when the scene is active.
     *
     * See {@link Sketch.keyReleased}, {@link p5.key}, {@link p5.keyCode}, and
     * {@link p5.keyReleased} for more information.
     *
     * @param p - p5 instance.
     * @param event - KeyboardEvent callback argument.
     */
    keyReleased(p: p5, event?: object): void;
}
