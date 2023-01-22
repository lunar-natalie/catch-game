/**
 * @file Player class.
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
import { XDirection } from "@utils/primitives";

export class Player extends MovingEntity {
    /** x- and y-acceleration in pixels per millisecond squared. */
    acceleration: V2d;

    /**
     * Positive vector used for acceleration in any direction in pixels per
     * millisecond squared when moving.
     */
    accelerationModifier: V2d;

    /**
     * Positive vector used for deceleration in any direction in pixels per
     * millisecond squared when moving. This may intentionally counteract the
     * current acceleration.
     */
    decelerationModifier: V2d;

    /** Maximum x- and y-speed in any direction in pixels per millisecond. */
    maxSpeed: V2d;

    /** Current direction of movement in the x-axis, set by user input. */
    inputDirection: XDirection;

    /** Jump flag set by user input. */
    isJumping: boolean;

    /** 
     * Flag signifying upwards acceleration in the y-axis, set at the start of a
     * jump.
     */
    private isRising: boolean;

    /** 
     * Flag signifying balanced acceleration in the y-axis, set when the maximum
     * jump speed is reached.
     */
    private isFalling: boolean;

    /**
     * Creates an instance of the player, using logical values of zero for each
     * property and state flag.
     */
    constructor() {
        super();
        this.acceleration = { x: 0, y: 0 };
        this.accelerationModifier = { x: 0, y: 0 };
        this.deceleration = { x: 0, y: 0 };
        this.decelerationModifier = { x: 0, y: 0 };
        this.maxSpeed = { x: 0, y: 0 };
        this.inputDirection = { left: false, right: false };
        this.isJumping = false;
        this.isRising = false;
        this.isFalling = false;
    }

    /**
     * Resets the player position to the bottom left of the canvas.
     *
     * @param p - p5 instance.
     */
    resetPosition(p: p5): void {
        this.position.x = this.sprite.centerPoint.x;
        this.position.y = p.height - this.sprite.centerPoint.y;
    }

    /**
     * Updates all calculated properties of the player. Should be called once
     * per frame before calling {@link draw}.
     *
     * @param p - p5 instance.
     */
    update(p: p5): void {
        this.updateTrajectory(p);
        this.updatePosition(p);
    }

    /**
     * Updates the acceleration, velocity and internal movement states of the
     * player.
     *
     * @param p - p5 instance.
     */
    private updateTrajectory(p: p5): void {
        this.acceleration.x = 0;
        this.acceleration.y = 0;
        if (this.inputDirection.left) {
            this.acceleration.x = -this.accelerationModifier.x;
        }
        if (this.inputDirection.right) {
            this.acceleration.x = this.accelerationModifier.x;
        }

        if (this.isJumping && !this.isFalling) {
            this.isRising = true;
        }
        if (this.isRising) {
            if (this.velocity.y > -this.maxSpeed.y) {
                this.acceleration.y = -this.accelerationModifier.y;
            } else {
                this.isRising = false;
                this.isFalling = true;
            }
        } else if (this.isFalling) {
            if (this.position.y < p.height - this.sprite.centerPoint.y) {
                this.acceleration.y = this.decelerationModifier.y;
            } else {
                this.isFalling = false;
            }
        }

        this.velocity.x = this.calcAxisVelocity(p, this.velocity.x,
            this.acceleration.x, this.decelerationModifier.x);
        this.velocity.y = this.calcAxisVelocity(p, this.velocity.y,
            this.acceleration.y, this.decelerationModifier.y);

        if (this.velocity.x < -this.maxSpeed.x) {
            this.velocity.x = -this.maxSpeed.x;
        } else if (this.velocity.x > this.maxSpeed.x) {
            this.velocity.x = this.maxSpeed.x;
        }
        if (this.velocity.y < -this.maxSpeed.y) {
            this.velocity.y = -this.maxSpeed.y;
        } else if (this.velocity.y > this.maxSpeed.y) {
            this.velocity.y = this.maxSpeed.y;
        }
    }

    /**
     * Updates the canvas position of the player sprite using the current
     * trajectory properties and hitbox limits.
     *
     * @param p - p5 instance.
     */
    private updatePosition(p: p5): void {
        this.position.x = this.calcAxisPosition(p, this.position.x,
            this.velocity.x);
        this.position.y = this.calcAxisPosition(p, this.position.y,
            this.velocity.y);

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
     * Calculates the player's velocity in pixels per millisecond along a single
     * axis of the canvas.
     *
     * @param p - p5 instance.
     * @param currentAxisVelocity - The current velocity in pixels per
     * milisecond along the single axis of the canvas.
     * @param axisAcceleration - The current acceleration in pixels per
     * milisecond squared along the single axis of the canvas.
     * @param axisDecelerationModifier - Positive value for deceleration in
     * pixels per millisecond squared along a single axis of the canvas. This
     * may intentionally counteract the current acceleration.
     */
    private calcAxisVelocity(p: p5, currentAxisVelocity: number,
        axisAcceleration: number, axisDecelerationModifier: number): number {
        let axisVelocity = currentAxisVelocity
            + (p.deltaTime * axisAcceleration);
        axisVelocity *= 1 - (p.deltaTime * axisDecelerationModifier);
        if ((axisVelocity > 0 && axisVelocity < axisDecelerationModifier)
            || (axisVelocity < 0 && axisVelocity > -axisDecelerationModifier)) {
            return 0;
        }
        return axisVelocity;
    }

    /**
     * Calculates the player's position in pixels along a single axis of the
     * canvas.
     *
     * @param p - p5 instance.
     * @param currentAxisPosition - The current position in pixels along the
     * single axis of the canvas.
     * @param axisVelocity - The velocity in pixels per milisecond along the
     * single axis of the canvas.
     */
    private calcAxisPosition(p: p5, currentAxisPosition: number,
        axisVelocity: number): number {
        return currentAxisPosition + (p.deltaTime * axisVelocity);
    }

    /**
     * Draws the player sprite onto the canvas. Should be called once per frame
     * after calling {@link update}.
     *
     * @param p - p5 instance.
     */
    draw(p: p5): void {
        p.noStroke();
        p.fill(255);
        p.ellipse(this.position.x, this.position.y, this.sprite.size.x,
            this.sprite.size.y);
    }
}