import React from 'react';

const toTwoDigits = day => (day.toString().length === 1 ? `0${day}` : day);

const formatDate = time => {
    const date = new Date(parseInt(time));

    const minutes = date.getUTCMinutes();
    const hours = date.getUTCHours();
    const days = toTwoDigits(date.getUTCDate());
    const months = date.getUTCMonth();
    const years = date.getUTCFullYear();

    return `${days}-${months}-${years} ${hours}:${minutes}`;
};

const ResultRow = ({ time, value }) => {
    const date = formatDate(time);

    return <li>{`${date} : ${value}`}</li>;
};

export default ResultRow;
