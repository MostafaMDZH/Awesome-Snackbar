const Snackbar = require('./snackbar.js');

test('sample test', () => {
    const sb = new Snackbar('This is a Snackbar!');
    expect(typeof sb).toEqual('object');
});