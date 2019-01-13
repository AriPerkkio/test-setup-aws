import React, { useEffect, useRef } from 'react';
import { scaleTime, extent, scaleLinear, max, select, axisBottom, axisLeft, line } from 'd3';

import { concatClasses } from '../../utils';

const d3 = { scaleTime, extent, scaleLinear, max, select, axisBottom, axisLeft, line };

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
    const dataLength = (data && data.length) || 0;

    const classNames = concatClasses(
        BASE_CLASS,
        className,
        !dataLength && 'no-opacity',
    );

    useEffect(() => {
        if (!dataLength) return;

        // Direct DOM manipulation without React
        const x = d3.scaleTime()
            .domain(d3.extent(data, ({ key }) => key))
            .range([40, 470]); // TODO get rid of hardcoded values

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, ({ value }) => value)]).nice() // TODO unit next to value
            .range([470, 20]); // TODO get rid of hardcoded values

        const svg = d3.select(graphRef.current);

        svg.select(`.${X_AXIS_CLASS}`)
            .call(g => g.call(d3.axisBottom(x).ticks(5).tickSizeOuter(0)));

        svg.select(`.${Y_AXIS_CLASS}`)
            .call(g => g.call(d3.axisLeft(y)));

        svg.select(`.${LINE_CLASS}`)
            .datum(data)
            .attr('d', d3.line()
                .x(({ key }) => x(key))
                .y(({ value }) => y(value)));

    }, [dataLength]);

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

export default Graph;