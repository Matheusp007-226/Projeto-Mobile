import http from '../http-common';

const getAll = () =>{
    return http.get("/livro");
}

const get = id => {
    return http.get(`/livro/${id}`);
}

const create = data =>{
    return http.post("/livro/", data);
}

const update = (id, data) =>{
    return http.put(`/livro/${id}`, DataTransferItemList);
}

const remove = id =>{
    return http.delete(`/livro/${id}`);
}

export default {
    getAll,
    get,
    create,
    update,
    remove
}