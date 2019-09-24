import Vue from 'vue';

export default class Service {
    constructor(RUTA_BASE) {
        this.RUTA_BASE = RUTA_BASE;
    }

    async get() {
        try {
            let result = await Vue.axios.get(this.RUTA_BASE);
            return result;
        } catch (e) {
            throw e;
        }
    }
    async getOne(id) {
        try {
            let result = await Vue.axios.get(`${this.RUTA_BASE}/${id}`);
            return result;
        } catch (e) {
            throw e;
        }
    }

    async save(entity) {
        try {
            let result = await Vue.axios.post(this.RUTA_BASE, entity);
            return result;
        } catch (e) {
            throw e;
        }
    }
    async update(entity) {
        try {
            let result = await Vue.axios.put(`${this.RUTA_BASE}/${entity.id}`, entity);
            return result;
        } catch (e) {
            throw e;
        }
    }
    async delete(id) {
        try {
            let result = await Vue.axios.delete(`${this.RUTA_BASE}/${id}`);
            return result;
        } catch (e) {
            throw e;
        }
    }

}