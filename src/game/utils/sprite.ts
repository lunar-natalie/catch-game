/**
 * @file Sprite class.
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

import { V2d } from "./vector";

/**
 * Image property wrapper for 2D graphical objects.
 */
export class Sprite {
    /**
     * Center x- and y-coordinates of the graphical object. When {@link size} is
     * set, this vector will be equal to half of the size vector.
     */
    centerPoint: V2d;

    /** Size of the graphical object in pixels. */
    get size() {
        return this._size;
    }

    set size(newSize) {
        this._size = newSize;
        this.centerPoint = { x: this.size.x / 2, y: this.size.y / 2 };
    }

    /**
     * Internal size of the graphical object in pixels, accessed using the
     * {@link size} property.
     */
    private _size: V2d;

    /**
     * Creates a new sprite object.
     *
     * @param props - Destructured property parameters.
     * @param props.width - Width of the sprite in pixels.
     * @param props.height - Height of the sprite in pixels.
     */
    constructor({
        width = 0,
        height = 0,
    }: { width?: number; height?: number } = {}) {
        this.size = { x: width, y: height };
    }
}
