/**
 * @file Color properties for graphical objects.
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

/**
 * Represents a color by the values of its RGBA components.
 */
export interface ColorComponents {
    /** Red component (0-255). */
    red: number;

    /** Green component (0-255). */
    green: number;

    /** Blue component (0-255). */
    blue: number;

    /** Alpha component (0-255). */
    alpha?: number;
}

/**
 * Sets the color used to fill shapes on the canvas, using a
 * {@link ColorComponents} object.
 *
 * @param p - p5 instance.
 * @param color Color data to use in call to {@link p5.fill}.
 * @returns p5 instance.
 */
export function fill(p: p5, color: ColorComponents): p5 {
    return p.fill(color.red, color.green, color.blue, color.alpha);
}
