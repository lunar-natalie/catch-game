/**
 * @file Drawable title text class and multi-line text data interface.
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

import { ColorComponents } from "@utils/primitives";
import { Drawable } from "@utils/drawable"

/**
 * Graphical center-aligned text object.
 */
export class Title implements Drawable {
    /**
     * Data and properties for each line of text.
     */
    lines: TextLine[];

    /**
     * Creates a new title text object.
     *
     * @param lines Data and properties for each line of text.
     */
    constructor(lines: TextLine[] = []) {
        this.lines = lines;
    }

    /**
     * Draws each line of text onto the canvas, horizontally centered and
     * starting aligned to the vertical center.
     *
     * @param p p5 instance.
     */
    draw(p: p5) {
        if (this.lines.length === 0) {
            return;
        }

        let totalHeight = -this.lines[0].fontSize / 2;
        p.textAlign(p.CENTER);
        this.lines.forEach((line, _i, _arr) => {
            p.textSize(line.fontSize);
            p.fill(line.color.red, line.color.blue, line.color.green,
                line.color.alpha);
            p.text(line.str, p.width / 2, (p.height / 2) + totalHeight);
            totalHeight += line.fontSize + line.yEndPadding;
        });
    }
}

/**
 * Represents the data and properties for an individual line of text.
 */
export interface TextLine {
    /** String to display. */
    str: string;

    /** Font size in points. */
    fontSize: number;

    /** RGBA fill color. */
    color: ColorComponents;

    /** Padding to apply to the vertical end of the text, in pixels. */
    yEndPadding: number;
}
