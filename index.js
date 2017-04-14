const Popup = require('./Popup');


// Loading()/State()/Confirm()/Verify().open()
module.exports = {
    Loading: (text = 'Loading...') => new Popup({text, type: 'loading'}),
    State: (dec = '') => new Popup({closeTimeout: '1500', type: 'state', text: dec}),
    // Confirm两个按钮
    Confirm: ({dec = '', container, callback, confirmText}) => new Popup({confirmText, text: dec, callback, container, type: 'confirm'}),
    // Veirfy一个按钮
    Verify: ({dec, container, callback}) => new Popup({text: dec, container, type: 'verify', callback})
};
