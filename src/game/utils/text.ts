/**
 * @file Utilities for representing and analyzing graphical text.
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

import { ColorComponents } from "./color";
import { FontMetadata } from "./font";

/**
 * Represents the data and properties of an individual section of graphical
 * text.
 */
export class TextComponent {
    /** Character data. */
    str: string;

    /** Properties of the font used to render the text. */
    font: FontMetadata;

    /** Color to fill the text with. */
    fillColor: ColorComponents;
}

/**
 * Provides utilities for analyzing the properties of graphical text.
 */
export class TextProperties {
    /** Rendering canvas for font measurement. */
    private static canvas?: HTMLCanvasElement;

    /**
     * Computes the displayed width of a given string in a given font.
     *
     * @param text - The character data to be rendered.
     * @param font - Properties of the CSS font to be used.
     * @return Width in pixels.
     *
     * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
     */
    static getWidth(text: string, font: FontMetadata): number {
        // Re-use canvas object for better performance.
        this.canvas = this.canvas || document.createElement("canvas");
        const context = this.canvas.getContext("2d");
        context.font = font.toString();
        const metrics = context.measureText(text);

        return metrics.width;
    }
}
