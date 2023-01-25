/**
 * @file Entity classes.
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

import { Drawable } from "@utils/drawable";
import { Sprite } from "@utils/sprite";
import { V2d } from "@utils/primitives";

/**
 * Represents a visible 2D object and all corresponding internal data.
 */
export abstract class Entity implements Drawable {
    /** Properties of the image or graphical data to be displayed. */
    sprite: Sprite;

    /** x- and y-coordinates of the sprite's center point on the canvas. */
    position: V2d;

    /**
     * Creates an entity with sprite and position data.
     */
    constructor() {
        this.sprite = new Sprite();
        this.position = { x: 0, y: 0 };
    }

    /**
     * Updates all calculated properties of the entity. Should be called once
     * per frame before calling {@link draw}.
     *
     * @param _p - p5 instance.
     */
    update(_p: p5): void {
    }

    /**
     * Draws the entity's image representation onto the canvas. Should be called
     * once per frame after calling {@link update}.
     *
     * @param _p - p5 instance.
     */
    draw(_p: p5): void {
    }
}

/**
 * Represents a visible 2D object with movement in addition to position
 * attributes.
 */
export abstract class MovingEntity extends Entity {
    /** x- and y-velocity in pixels per millisecond. */
    velocity: V2d;

    /**
     * Creates a new moving entity with sprite, position and velocity data.
     */
    constructor() {
        super();
        this.velocity = { x: 0, y: 0 };
    }
}
