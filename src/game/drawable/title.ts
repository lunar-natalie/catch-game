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

import { fill } from "@game/utils/color";
import { Drawable } from "@game/utils/drawable";
import { TextComponent } from "@game/utils/text";

/**
 * Drawable center-aligned text object.
 */
export class Title implements Drawable {
    /**
     * Data and properties for each line of text.
     */
    lines: TitleTextComponent[];

    /**
     * Creates a new title text object.
     *
     * @param lines - Data and properties for each line of text.
     */
    constructor(lines: TitleTextComponent[] = []) {
        this.lines = lines;
    }

    /**
     * Draws each line of text onto the canvas, horizontally centered and
     * starting aligned to the vertical center of the canvas.
     *
     * @param p - p5 instance.
     */
    draw(p: p5) {
        if (this.lines.length === 0) {
            return;
        }

        let totalHeight = -this.lines[0].font.size / 2;
        p.textAlign(p.CENTER);
        this.lines.forEach((line) => {
            p.textSize(line.font.size);
            if (line.font.weight === "bold") {
                p.textStyle("bold");
            } else {
                p.textStyle("normal");
            }
            fill(p, line.fillColor);
            p.text(line.str, p.width / 2, p.height / 2 + totalHeight);
            totalHeight += line.font.size + line.yEndPadding;
        });
    }
}

/**
 * Represents the data and properties of an individual line of text in a
 * drawable {@link Title} object.
 */
export class TitleTextComponent extends TextComponent {
    /** Padding to apply to the vertical end of the text, in pixels. */
    yEndPadding: number;
}
