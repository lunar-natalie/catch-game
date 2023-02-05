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

import { Drawable } from "./drawable";
import { Sprite } from "./sprite";
import { V2d } from "./vector";

/**
 * Represents a visible 2D object and all corresponding internal data.
 */
export abstract class Entity implements Drawable {
    /** Properties of the image or graphical data to be displayed. */
    sprite: Sprite;

    /** x- and y-coordinates of the sprite's center point on the canvas. */
    position: V2d;

    /**
     * Creates a new entity.
     *
     * @param props - Destructured property parameters.
     * @param props.x - x-coordinate in pixels.
     * @param props.y - y-coordinate in pixels.
     * @param props.sprite - Sprite with which to draw the entity.
     */
    constructor({
        x = 0,
        y = 0,
        sprite,
    }: {
        x?: number;
        y?: number;
        sprite: Sprite;
    }) {
        this.position = { x: x, y: y };
        this.sprite = sprite;
    }

    /**
     * Updates all calculated properties of the entity. Should be called once
     * per frame before calling {@link draw}.
     *
     * @param p - p5 instance.
     */
    abstract update(p: p5): void;

    /**
     * Draws the entity's image representation onto the canvas. Should be called
     * once per frame after calling {@link update}.
     *
     * @param p - p5 instance.
     */
    abstract draw(p: p5): void;

    /**
     * Checks if the entity collided with another entity on the canvas.
     *
     * @param target - Other entity to compare position with.
     * @returns `true` if collided, otherwise `false`.
     */
    didCollide(target: Entity): boolean {
        return (
            this.position.x + this.sprite.centerPoint.x >=
                target.position.x - target.sprite.centerPoint.x &&
            this.position.x - this.sprite.centerPoint.x <=
                target.position.x + target.sprite.centerPoint.x &&
            this.position.y + this.sprite.centerPoint.y >=
                target.position.y - target.sprite.centerPoint.y &&
            this.position.y - this.sprite.centerPoint.y <=
                target.position.y + target.sprite.centerPoint.y
        );
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
     * Creates a new moving entity.
     *
     * @param props - Destructured property parameters.
     * @param props.x - x-coordinate in pixels.
     * @param props.y - y-coordinate in pixels.
     * @param props.dx - x-velocity in pixels per millisecond.
     * @param props.dy - y-velocity in pixels per millisecond.
     * @param props.sprite - Sprite with which to draw the entity.
     */
    constructor({
        x = 0,
        y = 0,
        dx = 0,
        dy = 0,
        sprite,
    }: {
        x?: number;
        y?: number;
        dx?: number;
        dy?: number;
        sprite: Sprite;
    }) {
        super({ x: x, y: y, sprite: sprite });
        this.velocity = { x: dx, y: dy };
    }

    /**
     * Calculates the entity's position in pixels along a single axis of the
     * canvas.
     *
     * @param p - p5 instance.
     * @param props - Destructured property parameters.
     * @param props.currentPosition - The current position in pixels along the
     * single axis of the canvas.
     * @param props.velocity - The velocity in pixels per millisecond along the
     * single axis of the canvas.
     * @returns Position in pixels.
     */
    protected static calcAxisPosition(
        p: p5,
        {
            currentPosition,
            velocity,
        }: {
            currentPosition: number;
            velocity: number;
        }
    ): number {
        return currentPosition + p.deltaTime * velocity;
    }
}
