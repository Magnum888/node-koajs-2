/**
 * @module managers/memcachedManager
 */

"use strict";

const config = require('config'),
      Memcached = require('memcached'),
      memcached = new Memcached(config.memcached.server,':',config.memcached.port),
      keyUnique = require('../helpers/keyUnique');

module.exports = {
    getById: async (id) => {
        return new Promise((res, rej) => {
        memcached.get(id, function (err, data) {
            if(err) rej(err);
            res(data);
            })
        })
    },
    setById: async(key, data) => {
        return new Promise((res,rej) => {
        memcached.add(key, data, 100, function ( err ) {
            if(err) rej(err);
            res();
            })
        })
    },
    delById: async(key) => {
        return new Promise((res,rej) => {
        memcached.del(key, function ( err ) {
            if(err) rej(err);
            res();
            })
        })
    }
}