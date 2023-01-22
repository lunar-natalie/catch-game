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

import { ColorAttributes } from "@utils/primitives";
import { Drawable } from "@utils/drawable"

export class Title implements Drawable {
    lines: TextLine[];

    constructor(lines: TextLine[] = []) {
        this.lines = lines;
    }

    draw(p: p5): void {
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

export interface TextLine {
    str: string;
    fontSize: number;
    color: ColorAttributes;
    yEndPadding: number;
}