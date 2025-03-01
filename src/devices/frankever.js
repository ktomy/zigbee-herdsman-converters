const exposes = require('../lib/exposes');
const fz = {...require('../converters/fromZigbee'), legacy: require('../lib/legacy').fromZigbee};
const tz = {...require('../converters/toZigbee'), legacy: require('../lib/legacy').toZigbee};
const e = exposes.presets;
const ea = exposes.access;

module.exports = [
    {
        fingerprint: [{modelID: 'TS0601', manufacturerName: '_TZE200_wt9agwf3'},
            {modelID: 'TS0601', manufacturerName: '_TZE200_5uodvhgc'},
            {modelID: 'TS0601', manufacturerName: '_TZE200_1n2zev06'}],
        model: 'FK_V02',
        vendor: 'FrankEver',
        description: 'Zigbee smart water valve',
        fromZigbee: [fz.legacy.frankever_valve],
        toZigbee: [tz.legacy.tuya_switch_state, tz.legacy.frankever_threshold, tz.legacy.frankever_timer],
        exposes: [e.switch().setAccess('state', ea.STATE_SET),
            exposes.numeric('threshold', exposes.access.STATE_SET).withValueMin(0).withValueMax(100).withUnit('%')
                .withDescription('Valve open percentage (multiple of 10)'),
            exposes.numeric('timer', exposes.access.STATE_SET).withValueMin(0).withValueMax(600).withUnit('min')
                .withDescription('Countdown timer in minutes')],
    },
];
