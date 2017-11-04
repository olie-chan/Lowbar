const path = require('path');
const _ = require(path.join(__dirname, './core_lowbar'));

_.once = (func) => {
    let flag = true;
    return () => {
        if (flag) {
            flag = false;
            return func();
        }
    };
};

_.shuffle = (list) => {
 let newList = [];
 if (typeof list === 'string') newList = list.split('');
 if (typeof list === 'object') newList = _.values(list);
 newList = newList.slice();
 let n = newList.length, index, placeholder;
    while (n) {
        index = Math.floor(Math.random() * n--);
        placeholder = newList[n];
        newList[n] = newList[index];
        newList[index] = placeholder;
    }
 return newList;
};

_.invoke = (list, method, ...args) => {
    let result = [];
    _.each(list,  (item) => {
        result.push(item[method](...args));
    });
    return result;
};

_.sortBy = (list, iteratee = _.identity, context = this) => {
    let newList = list;
    if (typeof newList === 'string') newList = newList.split('');
    else newList = _.values(newList);
    iteratee = iteratee.bind(context);
    return newList.sort((a,b) => iteratee(b) < iteratee(a));
};

_.zip = (...args) => {
    const result = [];
    if (!_.every(args, item => typeof item === 'string' || Array.isArray(item)
    )) return result;

    if (args.length === 1 && typeof args[0] === 'string') return _.map(args[0], str => [str]);

    else _.each(args, (list, i) => {

        if (typeof list === 'string') result[i] = list;
        
         else _.each(list, (item, j) => {
             if (result[j] === undefined) result[j] = [];
            result[j][i] = item;
        });
    });
    return result;
};

module.exports = _;