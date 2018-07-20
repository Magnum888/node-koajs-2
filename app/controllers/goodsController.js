/**
 * @module controllers/goodsController
 */
'use strict';

const memcachedManager = require('../managers/memcachedManager'),
      keyUnique = require('../helpers/keyUnique');

async function getGoods(ctx, next){
    try {
    ctx.body = await memcachedManager.getById(ctx.params.id);
    if(ctx.body) ctx.status = 200;
    else ctx.status = 404;
    } catch (e) {
    ctx.status = 404;
    }
    await next();
}

async function postGoods(ctx, next){
    try {
    let key = keyUnique();
    await memcachedManager.setById(key, ctx.request.body);
    ctx.status = 201;
    ctx.body = key;
    } catch (e) {
    ctx.status = 400;
    }
    await next();
}

async function delGoods(ctx, next){
    try {
    await memcachedManager.delById(ctx.params.id);
    ctx.status = 204;
    await next();
    } catch (e) {
    ctx.status = 400;
    await next();
    }
}

module.exports = {getGoods, postGoods, delGoods};
