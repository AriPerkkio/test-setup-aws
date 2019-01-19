import React, { useEffect, useRef } from 'react';
import { scaleTime, extent, scaleLinear, max, min, select, axisBottom, axisLeft, line } from 'd3';
import { hot } from 'react-hot-loader';

import { useWindowSize } from '../../hooks';
import { concatClasses, getTransformXY } from '../../utils';

const d3 = { scaleTime, extent, scaleLinear, max, min, select, axisBottom, axisLeft, line };

const BASE_CLASS = 'graph';
const X_AXIS_CLASS = `${BASE_CLASS}-x-axis`;
const Y_AXIS_CLASS = `${BASE_CLASS}-y-axis`;
const LINE_CLASS = `${BASE_CLASS}-line`;

const Graph = ({
    className,
    data,
    // loading, // TODO loading indicator inside svg
    ...props
}) => {
    const graphRef = useRef();
    const windowSize = useWindowSize(20);
    const dataLength = (data && data.length) || 0;
    const classNames = concatClasses(
        BASE_CLASS,
        className,
        !dataLength && 'no-opacity',
    );

    // DOM elements
    const { current: elem } = graphRef;
    const svg = d3.select(elem);
    const axisX = svg.select(`.${X_AXIS_CLASS}`);
    const axisY = svg.select(`.${Y_AXIS_CLASS}`);

    // Element sizes - graph is updated on size changes
    const height = (elem && elem.height.baseVal.value) || 0;
    const width = (elem && elem.width.baseVal.value) || 0;
    const marginLeft = getTransformXY(axisY).x || 0;
    const marginBottom = getTransformXY(axisX).y || 0;

    useEffect(() => {
        if (!dataLength) return;

        const unit = (data[0] || {}).unit || '';
        const formatY = value => `${value} ${unit}`;

        const maxValueY = d3.max(data, ({ value }) => value) * 1;
        const minValueY = d3.min(data, ({ value }) => value) * 1;
        const paddingBottom = minValueY - (maxValueY - minValueY) * .05;
        const paddingTop = maxValueY + (maxValueY - minValueY) * .1;

        const x = d3.scaleTime()
            .domain(d3.extent(data, ({ time }) => time))
            .range([marginLeft, width - marginLeft]);

        const y = d3.scaleLinear()
            .domain([paddingBottom, paddingTop]).nice()
            .range([marginBottom, height - marginBottom]);

        // Direct DOM manipulation without React
        axisX.call(g => g.call(d3.axisBottom(x).ticks(5).tickSizeOuter(0)));
        axisY.call(g => g.call(d3.axisLeft(y).tickFormat(formatY)));

        svg.select(`.${LINE_CLASS}`)
            .datum(data)
            .attr('d', d3.line()
                .x(({ time }) => x(time))
                .y(({ value }) => y(value)));

    }, [dataLength, width, height, marginLeft, marginBottom, windowSize.height, windowSize.width]);

    return (
        <svg {...props}
            ref={graphRef}
            className={classNames}>

            <g className={X_AXIS_CLASS} />
            <g className={Y_AXIS_CLASS} />
            <path className={LINE_CLASS} />
        </svg>
    );
};

export default hot(module)(Graph);