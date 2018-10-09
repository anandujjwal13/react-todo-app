import update from 'immutability-helper';
import axios from 'axios';

/**
 * Get the list of todo items.
 * @return {Array}
 */
export function getAll() {
    return axios.get('https://a5uqo3j80l.execute-api.ap-south-1.amazonaws.com/dev/practice-todos?userId=user1', {})
        .then(function (response) {
            return response.data.body;
        })
        .catch(function (error) {
            return error;
        });
}

export function getItemById(itemId) {
    return getAll().find(item => item.id === itemId);
}

export function updateStatus(items, itemId, completed) {
    let index = items.findIndex(item => item.id === itemId);

    // Returns a new list of data with updated item.
    return update(items, {
        [index]: {
            completed: { $set: completed }
        }
    });
}

/**
 * A counter to generate a unique id for a todo item.
 * Can remove this logic when the todo is created using backend/database logic.
 * @type {Number}
 */

function getNextId(list) {
    let max = Number.MIN_SAFE_INTEGER;
    const reducer = (accumulator, curr) => Math.max(accumulator, curr.id) + 1
    const newId = list.reduce(reducer, max);
    console.log(newId);
    return newId;
}

/**
 * Adds a new item on the list and returns the new updated list (immutable).
 *
 * @param {Array} list
 * @param {Object} data
 * @return {Array}
 */
export function addToList(list, data) {
    let item = Object.assign({
        id: getNextId(list)
    }, data);

    return list.concat([item]);
}
