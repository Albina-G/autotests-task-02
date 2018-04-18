const proxyquire = require('proxyquire');
const assert = require('assert');
const sinon = require('sinon');
const formatDate = require('../lib/formatDate');

function getTime(date) {
    const time = new Date(date);
    const min = time.getUTCMinutes() <= 9 ? '0' + time.getUTCMinutes() : time.getUTCMinutes();
    const hour = time.getUTCHours() <= 9 ? '0' + time.getUTCHours() : time.getUTCHours();
    return hour + ':' + min;
}

const dataPositive = [
    { time: '2018-04-11T15:09:10.609Z', expected: '11 апреля в 15:09' },
    { time: '2016-12-25T12:00:10.123Z', expected: '25 декабря 2016 года в 12:00' },
    { time: Date.now() - 3600 * 24 * 1000, expected: 'вчера в ' + getTime(Date.now()) },
    { time: Date.now() - 3600 * 1000, expected: getTime(Date.now() - 3600 * 1000) },
    { time: '2018-02-11T15:09:10.609Z', expected: '11 февраля в 15:09' },
    { time: '2018-02-11T00:10:10.609Z', expected: '11 февраля в 00:10' }
];

const dataNegative = [
    { time: undefined, expected: /Invalid date/ },
    { time: null, expected: /Invalid date/ },
    { time: [], expected: /Invalid date/ },
    { time: {}, expected: /Invalid date/ },
    { time: Infinity, expected: /Invalid date/ },
    { time: NaN, expected: /Invalid date/ }
];

describe('formatDate', () => {
    describe('positive', () => {
        dataPositive.forEach(({time, expected}) => {
            it(`should print '${expected}' for ${time}`, () => {
                const actual = formatDate(time);
                assert.equal(actual, expected);
            });
        });
    });
    describe('negative', () => {
        dataNegative.forEach(({time, expected}) => {
            it(`should print '${expected}' for ${time}`, () => {
                const actual = () => formatDate(time);
                assert.throws(actual, expected);
            });
        });
    });
});