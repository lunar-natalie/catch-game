/**
 * @file Menu scene class.
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

import {
    Scene,
    SceneSetupHandler,
    SceneKeyPressedHandler,
} from "@game/utils/scene";
import { Sketch } from "@game/sketch";
import { Title } from "@game/drawable/title";
import { FontMetadata } from "@game/utils/font";

/**
 * Scene for the Main Menu. Shows title and information, and waits for input
 * before advancing the scene in the sketch.
 */
export class Menu
    extends Scene
    implements SceneSetupHandler, SceneKeyPressedHandler
{
    private title: Title;

    /**
     * Creates the menu scene.
     *
     * @param sketch - Parent sketch.
     */
    constructor(sketch: Sketch) {
        super(sketch);
    }

    /**
     * Called once when the sketch starts, used to define initial environment
     * properties such as screen size and background color and to load media
     * such as images and fonts.
     *
     * Creates the title and prompt text.
     *
     * See {@link Scene.setup}, {@link Sketch.setup} and {@link p5.setup} for
     * more information.
     */
    setup(): void {
        this.title = new Title([
            {
                str: "Catch Game",
                font: FontMetadata.auto({
                    weight: "bold",
                    size: 64,
                }),
                fillColor: { red: 255, green: 255, blue: 255 },
                yEndPadding: 8,
            },
            {
                str: "Press RETURN to start",
                font: FontMetadata.auto({
                    size: 32,
                }),
                fillColor: { red: 255, green: 255, blue: 255 },
                yEndPadding: 0,
            },
        ]);
    }

    /**
     * Continuously executes the lines of code contained inside its block until
     * the program is stopped or {@link p5.noLoop} is called when the scene is
     * active.
     *
     * Sets the background and draws the menu text.
     *
     * See {@link Scene.draw}, {@link Sketch.draw} and {@link p5.draw} for more
     * information.
     *
     * @param p - p5 instance.
     */
    draw(p: p5): void {
        p.background(0);
        this.title.draw(p);
    }

    /**
     * Called once every time a key is pressed when the scene is active. The key
     * code for the key that was pressed is stored in the {@link p5.key}
     * variable. For non-ASCII keys, the {@link p5.keyCode} variable is used.
     *
     * Advances the scene when RETURN is pressed.
     *
     * See {@link Scene.keyPressed}, {@link Sketch.keyPressed} and
     * {@link p5.keyPressed} for more information.
     *
     * @param p - p5 instance.
     */
    keyPressed(p: p5): void {
        if (p.keyCode === p.RETURN) {
            this.sketch.advanceScene().catch((reason) => {
                console.error(reason);
            });
        }
    }
}
