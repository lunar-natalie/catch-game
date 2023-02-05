/**
 * @file Drawable heads-up display text class and supporting structures.
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

import { ColorComponents, fill } from "@game/utils/color";
import { Drawable } from "@game/utils/drawable";
import { FontMetadata } from "@game/utils/font";
import { V2d } from "@game/utils/vector";
import { TextComponent, TextProperties } from "@game/utils/text";

/**
 * Drawable heads-up display (HUD) class for drawing static text on the corners
 * of the canvas.
 */
export class HudText implements Drawable {
    /** Starting x- and y-coordinates on the canvas. */
    position: V2d;

    /** Vertical and horizontal margin from the edge of the canvas in pixels. */
    margin: V2d;

    /**
     * Horizontal text alignment mode; the side of the starting position from
     * which the text should be drawn.
     */
    alignment: HudAlignment;

    /** Data for the label (leftmost) section of the HUD. */
    private labelComponent: HudTextComponent;

    /** Data for the value (rightmost) section of the HUD. */
    private valueComponent: HudTextComponent;

    /**
     * Creates a new {@link HudText} object. The label (leftmost) and value
     * (rightmost) text are split into two separate components with independent
     * attributes.
     *
     * @param props - Destructured property parameters.
     * @param props.x - Starting x-coordinate on the canvas in pixels.
     * @param props.y - Starting y-coordinate on the canvas in pixels.
     * @param props.hMargin - Horizontal margin from the edge of the canvas in
     * pixels.
     * @param props.vMargin - Vertical margin from the edge of the canvas in
     * pixels.
     * @param props.alignment - Horizontal text alignment mode; the side of the
     * starting position from which the text should be drawn.
     * @param props.labelStr - Label component character data.
     * @param props.labelFont - Label component font metadata.
     * @param props.labelFillColor - Label component fill color.
     * @param props.valueFont - Value component font metadata (defaults to
     * {@link props.labelFont}).
     * @param props.valueFillColor - Value component fill color. (defaults to
     * {@link props.labelFillColor}).
     */
    constructor({
        x = 0,
        y = 0,
        hMargin = 0,
        vMargin = 0,
        alignment = HudAlignment.Left,
        labelStr,
        labelFont,
        labelFillColor,
        valueFont = labelFont,
        valueFillColor = labelFillColor,
    }: {
        x?: number;
        y?: number;
        hMargin?: number;
        vMargin?: number;
        alignment?: HudAlignment;
        labelStr: string;
        labelFont: FontMetadata;
        labelFillColor: ColorComponents;
        valueFont?: FontMetadata;
        valueFillColor?: ColorComponents;
    }) {
        this.position = { x: x, y: y };
        this.margin = { x: hMargin, y: vMargin };
        this.alignment = alignment;
        this.labelComponent = new HudTextComponent({
            str: labelStr,
            font: labelFont,
            fillColor: labelFillColor,
        });
        this.valueComponent = new HudTextComponent({
            font: valueFont,
            fillColor: valueFillColor,
        });
    }

    /**
     * Draws the HUD's label and value text components onto the canvas.
     *
     * @param p - p5 instance.
     */
    draw(p: p5): void {
        const labelPosition = {
            x: this.position.x,
            y: this.position.y + this.labelComponent.font.size + this.margin.y,
        };
        const valuePosition = {
            x: this.position.x,
            y: this.position.y + this.valueComponent.font.size + this.margin.y,
        };

        if (this.alignment === HudAlignment.Left) {
            p.textAlign("left");
            labelPosition.x += this.margin.x;
            valuePosition.x +=
                this.margin.x + this.labelComponent.lastCalculatedWidth;
        } else if (this.alignment === HudAlignment.Right) {
            p.textAlign("right");
            labelPosition.x -=
                this.margin.x + this.valueComponent.lastCalculatedWidth;
            valuePosition.x -= this.margin.x;
        }

        p.noStroke();

        if (this.labelComponent.hasText()) {
            p.textSize(this.labelComponent.font.size);
            if (this.labelComponent.fillColor) {
                fill(p, this.labelComponent.fillColor);
            }
            p.text(this.labelComponent.str, labelPosition.x, labelPosition.y);
        }

        if (this.valueComponent.hasText()) {
            p.textSize(this.valueComponent.font.size);
            if (this.valueComponent.fillColor) {
                fill(p, this.valueComponent.fillColor);
            }
            p.text(this.valueComponent.str, valuePosition.x, valuePosition.y);
        }
    }

    /**
     * Sets the string of the value text component. Re-calculates the width of
     * the value component for internal position calculations in the
     * {@link draw} routine.
     *
     * @param str - Character data.
     */
    setValueText(str: string): void {
        this.valueComponent.str = str;
        this.valueComponent.calcWidth();
    }
}

/**
 * Represents the data and properties of each section of text in {@link HudText}
 * objects.
 */
export class HudTextComponent extends TextComponent {
    /**
     * Total width of the component's string in its given font, in pixels, since
     * the last call to {@link calcWidth}
     */
    get lastCalculatedWidth(): number {
        return this._lastCalculatedWidth;
    }

    /**
     * Private mutable to store the readonly property
     * {@link lastCalculatedWidth}.
     */
    private _lastCalculatedWidth = 0;

    /**
     * Creates a new {@link HudTextComponent} object.
     *
     * @param props - Destructured property parameters.
     * @param props.str - Character data.
     * @param props.font - Properties of the font used to render the text.
     * @param props.fillColor - Color to fill the text with.
     */
    constructor({
        str = "",
        font,
        fillColor,
    }: {
        str?: string;
        font?: FontMetadata;
        fillColor: ColorComponents;
    }) {
        super();
        this.str = str;
        this.font = font;
        this.fillColor = fillColor;
        this.calcWidth();
    }

    /**
     * Calculates the total width of the component's string in its given font,
     * in pixels. The result value is retrievable from
     * {@link lastCalculatedWidth}.
     */
    calcWidth(): void {
        if (this.hasText()) {
            this._lastCalculatedWidth = TextProperties.getWidth(
                this.str,
                this.font
            );
        }
    }

    /**
     * Checks if the component's string contains characters.
     *
     * @returns `true` if the component has text data, otherwise `false`.
     */
    hasText(): boolean {
        return this.str.length > 0;
    }
}

/**
 * Horizontal text alignment modes for {@link HudText}.
 */
export enum HudAlignment {
    Left,
    Right,
}
