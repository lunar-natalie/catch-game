/**
 * @file Font face utilities.
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

import { getCssStyle } from "./style";

/**
 * Metadata properties for graphical text font faces.
 */
export class FontMetadata {
    /**
     * CSS font weight (boldness) property.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight
     */
    weight: string;

    /** Font size in pixels. */
    size: number;

    /** Name of font family. */
    family: string;

    /**
     * Creates a new set of metadata for a font face to be used in rendering.
     *
     * @param props - Destructured property parameters.
     * @param props.weight - CSS font weight (boldness) property.
     * @param props.size - Font size in pixels.
     * @param props.family - Name of font family.
     */
    constructor({
        weight,
        size,
        family,
    }: {
        weight: string;
        size: number;
        family: string;
    }) {
        this.weight = weight;
        this.size = size;
        this.family = family;
    }

    /**
     * Creates a new set of metadata for a font face to be used in rendering,
     * using the properties of a given element's font as default which may be
     * overridden by the property parameters.
     *
     * @param props - Destructured property parameters with which the respective
     * font properties of the element should be overridden.
     * @param props.weight - CSS font weight (boldness) property.
     * @param props.size - Font size in pixels.
     * @param props.family - Name of font family.
     * @param element - Element from which default font properties should be
     * used.
     * @returns New metadata object.
     */
    static auto(
        {
            weight,
            size,
            family,
        }: {
            weight?: string;
            size?: number;
            family?: string;
        } = {},
        element: HTMLElement = document.body
    ): FontMetadata {
        return new FontMetadata({
            weight: weight || getCssStyle(element, "font-weight"),
            size: size || parseInt(getCssStyle(element, "font-size")),
            family: family || getCssStyle(element, "font-family"),
        });
    }

    /**
     * Gets the string representation of the font.
     *
     * @returns CSS font descriptor.
     */
    toString(): string {
        return `${this.weight} ${this.size}px ${this.family}`;
    }
}
