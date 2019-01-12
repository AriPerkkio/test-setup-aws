import React, { memo, useEffect } from 'react';
import { scaleTime, extent, scaleLinear, max, select, axisBottom, axisLeft, line } from 'd3';

import { concatClasses } from '../../utils';

const d3 = { scaleTime, extent, scaleLinear, max, select, axisBottom, axisLeft, line };

const BASE_CLASS = 'dashboard';
const GRAPH_CLASS = `${BASE_CLASS}-data-graph`;
const X_AXIS_CLASS = `${GRAPH_CLASS}-x-axis`;
const Y_AXIS_CLASS = `${GRAPH_CLASS}-y-axis`;

const DashBoard = memo(({
    className,
    data,
    loading,
    error,
}) => {
    const classNames = concatClasses(BASE_CLASS, className);
    const dataLength = (data && data.length) || 0;

    useEffect(() => {
        if (!dataLength) return;

        // Direct DOM manipulation with React
        const x = d3.scaleTime()
            .domain(d3.extent(data, ({ key }) => key))
            .range([40, 470]); // TODO get rid of hardcoded values

        const y = d3.scaleLinear()
            .domain([0, d3.max(data, ({ value }) => value)]).nice() // TODO unit next to value
            .range([470, 20]); // TODO get rid of hardcoded values

        const svg = d3.select(`.${GRAPH_CLASS}`);

        svg.select(`.${X_AXIS_CLASS}`)
            .call(g => g.call(d3.axisBottom(x).ticks(5).tickSizeOuter(0)));

        svg.select(`.${Y_AXIS_CLASS}`)
            .call(g => g.call(d3.axisLeft(y)));

        svg.select(`.${GRAPH_CLASS}-line`)
            .datum(data)
            .attr("d", d3.line()
                .x(({ key }) => x(key))
                .y(({ value }) => y(value)));

    }, [dataLength]);

    const graphClassNames = concatClasses(
        GRAPH_CLASS,
        !dataLength && 'no-opacity',
    );

    return (
        <div className={classNames}>
            {loading && <p>Loading...</p>}

            <svg className={graphClassNames}>
                <g className={X_AXIS_CLASS} />
                <g className={Y_AXIS_CLASS} />
                <path className={`${GRAPH_CLASS}-line`} />
            </svg>

            {error && <p>{error}</p>}
        </div >
    );
});

export default DashBoard;