import {stringInclues} from '../util/common';
import axios from 'axios';

export const FILTER_ALL = 'all';
export const SAVE = 'Save';
export const FILTER_ACTIVE = 'active';
export const FILTER_COMPLETED = 'completed';

function saveTodos(list){
    console.log("send for update",list);
    axios.put('https://e8w0amfspe.execute-api.ap-south-1.amazonaws.com/dev/todo-application', { userId:'user1',tasks:list})
      .then(function (response) {
        console.log("Successfully updated",response);
      })
      .catch(function (error) {
        console.log(error);
      });
}

export function applyFilter(list, filter) {
    switch (filter) {
        case SAVE:
            saveTodos(list);
            return list;
        case FILTER_COMPLETED:
            return list.filter(item => item.completed === true);

        case FILTER_ACTIVE:
            return list.filter(item => item.completed !== true);

        default:
            return list;
    }
}

export function search(list, query) {
    let q = query.trim().toLowerCase();
    return list.filter(({text}) => stringInclues(text.toLowerCase(), q));
}


export function getOptions() {
    return {
        [SAVE]:'Save',
        [FILTER_ALL]: 'All',
        [FILTER_ACTIVE]: 'Active',
        [FILTER_COMPLETED]: 'Completed'
    };
}
