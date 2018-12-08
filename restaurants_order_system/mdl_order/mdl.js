"use strict";
var events = require('events');
var eventsConfig = require('../config').events;

const MAX_ORDER = 20; //Limit of order from service
global.log = "";

class orderService extends events.EventEmitter {
    constructor(_data) {
        super();
        this.statusOrder = 0;
        this.order = 0;
        this.data = _data;
    };
    //Get order's data
    getAllData() {
        console.log(`${this.data.order}, status order: ${this.data.statusOrder}`);
        LOG(`${this.data.order}, status order: ${this.data.statusOrder}`);
    };
    
    //increment order
    increment() {
        if (this.data.order < MAX_ORDER) {
            ++this.data.order;
            console.log(`${this.data.order} Incremented Successfully.`);
            LOG(`${this.data.order} Incremented Successfully.`);
            this.emit(eventsConfig.INC, this.data);
        } else {
            console.log(`${this.data.order} UN-Incremented - Reached max orders.`);
            LOG(`${this.data.order} UN-Incremented - Reached max orders.`);
            this.emit(eventsConfig.UNINC, this.data);
        }
    };
//Reset order
reset() {
    if (this.data.statusOrder != 0) {
        this.data.statusOrder = 0;
        console.log(`${this.data.order} Reset Successfully.`);
        LOG(`${this.data} Reset Successfully.`);
        this.emit(eventsConfig.RESET, this.data);
    } else {
        console.log(`${this.data.order} UN-Reseted - Is Reset.`);
        LOG(`${this.data.order} UN-Reseted - Is Reset.`);
        this.emit(eventsConfig.UNRESET, this.data);
    }
};
}
 
var LOG = (string) => {
    log += `${string}<br>`;
};

//Creating instance and Catching FireEvents
module.exports = (_data) => {
    var order = new orderService(_data);

    order.increment();
    order.reset();
    order.getAllData();

    order.on(eventsConfig.INC, (data) => {
        console.log(`#EMIT: INC - ${data.order}, status order: ${data.statusOrder}`);
    });

    order.on(eventsConfig.RESET, (data) => {
        console.log(`#EMIT: RESET - ${data.order}, status order: ${data.statusOrder}`);
    });
};