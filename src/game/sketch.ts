/**
 * @file Sketch class.
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

import { Game } from "@scenes/game";
import { Menu } from "@scenes/menu";
import { Scene } from "@utils/scene";

/**
 * Contains the set of functions to be called by p5 handlers in order to start
 * the game. Manages different scenes which can have different setup, drawing
 * and event handlers.
 */
export class Sketch {
    /** Available scenes to make active. */
    private scenes: Scene[];

    /** Currently active scene to which p5 handlers are bound. */
    private activeScene: Scene;

    /** Index of the currently active scene in the scenes array. */
    private sceneIndex: number;

    /**
     * Creates the sketch, initializes the different game scenes and binds p5
     * handlers to methods in the sketch object. Some of these methods call the
     * currently active scene, which is set to the first element in the internal
     * scenes array by default.
     *
     * @param p - p5 instance.
     */
    constructor(p: p5) {
        // Initialize and append all available game scenes to the internal array.
        this.scenes = [
            new Menu(this),
            new Game(this)
        ];

        // Activate the first scene.
        this.activateScene(0).catch((reason) => {
            console.error(reason);
        });

        // Bind in-class handlers to the p5 instance.
        p.preload = () => this.preload(p);
        p.setup = () => this.setup(p);
        p.draw = () => this.draw(p);
        p.keyPressed = (event?) => this.keyPressed(p, event);
        p.keyReleased = (event?) => this.keyReleased(p, event);
        p.windowResized = () => this.windowResized(p);
    }

    /**
     * Sets the scene with the given index to active. After activation, the
     * available handlers in the scene will be called by the class-bound p5
     * handlers.
     *
     * @param index - Index of the scene to activate in the internal scenes
     * array, set in the constructor.
     * @returns Empty promise, which is rejected if the target index is out of
     * range, and is otherwise resolved.
     */
    activateScene(index: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            // Check range.
            if (this.scenes.length === 0
                || index < 0
                || index >= this.scenes.length) {
                reject("Scene index out of range");
            }

            // Set index and store active scene.
            this.sceneIndex = index;
            this.activeScene = this.scenes[index];
            resolve();
        });
    }

    /**
     * Activates the next scene in the internal scenes array.
     *
     * @returns Empty promise, which is rejected if the index of the next scene
     * is out of range, and is otherwise resolved.
     */
    advanceScene(): Promise<void> {
        // Activate the scene after the current value of the internal scene
        // index.
        return this.activateScene(this.sceneIndex + 1);
    }

    /**
     * Called directly before {@link setup} to handle asynchronous loading of
     * external files in a blocking way. Calls the {@link preload} method of
     * each scene in the internal array of available scenes.
     *
     * See {@link p5.preload} for more information.
     *
     * @param p - p5 instance.
     */
    private preload(p: p5): void {
        this.scenes.forEach((scene) => {
            if (Scene.hasPreloadHandler(scene)) {
                scene.preload(p);
            }
        });
    }

    /**
     * Called once when the program starts, used to define initial environment
     * properties such as screen size and background color and to load media
     * such as images and fonts.
     *
     * Creates the 2D canvas and calls the {@link Scene.setup} method of each
     * scene in the internal array of available scenes.
     *
     * See {@link p5.setup} for more information.
     *
     * @param p - p5 instance.
     */
    private setup(p: p5): void {
        p.createCanvas(p.windowWidth, p.windowHeight);
        this.scenes.forEach((scene) => {
            if (Scene.hasSetupHandler(scene)) {
                scene.setup(p);
            }
        });
    }

    /**
     * Called directly after {@link setup} and continuously executes the lines
     * of code contained inside its block until the program is stopped or
     * {@link p5.noLoop} is called.
     *
     * Calls the {@link Scene.draw} method of the active scene.
     *
     * See {@link p5.draw} for more information.
     *
     * @param p - p5 instance.
     */
    private draw(p: p5): void {
        this.activeScene.draw(p);
    }

    /**
     * Called once every time a key is pressed. The key code for the key that
     * was pressed is stored in the {@link p5.key} variable. For non-ASCII keys,
     * the {@link p5.keyCode} variable is used.
     *
     * Calls the {@link Scene.keyPressed} method of the active scene.
     *
     * See {@link p5.keyPressed} for more information.
     *
     * @param p - p5 instance.
     * @param event - KeyboardEvent callback argument.
     */
    private keyPressed(p: p5, event?: object): void {
        if (Scene.hasKeyPressedHandler(this.activeScene)) {
            this.activeScene.keyPressed(p, event);
        }
    }

    /**
     * Called once every time a key is released.
     *
     * Calls the {@link Scene.keyReleased} method of the active scene.
     *
     * See {@link p5.key}, {@link p5.keyCode}, and {@link p5.keyReleased} for
     * more information.
     *
     * @param p - p5 instance.
     * @param event - KeyboardEvent callback argument.
     */
    private keyReleased(p: p5, event?: object): void {
        if (Scene.hasKeyReleasedHandler(this.activeScene)) {
            this.activeScene.keyReleased(p, event);
        }
    }

    /**
     * Called once every time the browser window is resized.
     *
     * Resizes the canvas and makes any required adjustments to accommodate the
     * new window size.
     *
     * @param p - p5 instance.
     */
    private windowResized(p: p5): void {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }
}
