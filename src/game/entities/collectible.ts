/**
 * @file Collectible item class.
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

import { MovingEntity } from "@utils/entity";
import { Sprite } from "@utils/sprite";

/**
 * Entity representing an item on the canvas which can be collected by the
 * player.
 */
export class Collectible extends MovingEntity {
    /**
     * Creates a new collectible item.
     *
     * @param x - x-coordinate in pixels.
     * @param y - y-coordinate in pixels.
     * @param dx - x-velocity in pixels per millisecond.
     * @param dy - y-velocity in pixels per millisecond.
     * @param sprite - Sprite with which to draw the entity.
     */
    constructor({ x = 0, y = 0, dx = 0, dy = 0, sprite }:
        { x?: number; y?: number; dx?: number; dy?: number; sprite: Sprite; }) {
        super({ x: x, y: y, dx: dx, dy: dy, sprite: sprite});
    }

    update(p: p5): void {
        this.updatePosition(p);
    }

    /**
     * Updates the canvas position of the entity using the current trajectory
     * properties and hitbox limits.
     *
     * @param p - p5 instance.
     */
    private updatePosition(p: p5): void {
        this.position.y = this.calcAxisPosition(p, {
            currentPosition: this.position.y,
            velocity: this.velocity.y
        });

        if (this.position.x < this.sprite.centerPoint.x) {
            this.position.x = this.sprite.centerPoint.x;
        } else if (this.position.x > p.width - this.sprite.centerPoint.x) {
            this.position.x = p.width - this.sprite.centerPoint.x;
        }
        if (this.position.y < this.sprite.centerPoint.y) {
            this.position.y = this.sprite.centerPoint.y;
        } else if (this.position.y > p.height - this.sprite.centerPoint.y) {
            this.position.y = p.height - this.sprite.centerPoint.y;
        }
    }

    /**
     * Draws the collectible's sprite onto the canvas. Should be called once per
     * frame after calling {@link update}.
     *
     * @param p - p5 instance.
     */
    draw(p: p5): void {
        p.noStroke();
        p.fill(200);
        p.ellipse(this.position.x, this.position.y, this.sprite.size.x,
            this.sprite.size.y);
    }
}
