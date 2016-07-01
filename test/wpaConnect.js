'use strict';
var assert = require('chai').assert;
require('chai').should();
const WpaCli = require('../');
var wpa = new WpaCli('wlan0');
describe('WpaCli AP connection Tests', function() {
    describe('connect to wpa', function() {
        it('should emit an connect to AP', function(done) {


            var errTimeout = setTimeout(function() {
                assert(false, 'Event never fired');
                done();
            }, 1000);

            wpa.once('ready', function() {
                clearTimeout(errTimeout); //cancel error timeout
                wpa.addNetwork();
                wpa.setSSID(0, 'Leaf-Hard');
                wpa.setPassword(0, 'hardwear');
                wpa.enableNetwork(0);
                wpa.selectNetwork(0);

            });
            wpa.once('ap_connected', function() {
                done();
            });
            wpa.connect();
        }).timeout(5000);

    });
});
describe('WpaCli AP disconnection Tests', function() {
    describe('connect to wpa', function() {
        it('should emit an connect to AP', function(done) {


            var errTimeout = setTimeout(function() {
                assert(false, 'Event never fired');
                done();
            }, 1000);

            wpa.disconnect();
            wpa.once('ap_disconnected', function() {
                done();
            });
            wpa.connect();
        }).timeout(5000);

    });
});
