import { LocalStorage } from "quasar";
import { useAPIRequest, useDeferredAPIRequest } from "./api";

export const useResource = (resource) => {
  return {
    list(page, filters) {
      page = page || 1;
      filters = filters || {};
      const query = {
        page: page,
        ...filters,
      };

      return new Promise((resolve, reject) => {
        const request = useDeferredAPIRequest();
        request.execute(`/${resource}/all`, {
          // params: query,
          headers: {
            'Authorization': `Bearer ${LocalStorage.getItem('token')}`
          }
        });
        request.then(({ data, error }) => {
          if (error.value) reject(error.value);
          resolve({
            data: data.value,
          });
        }, reject);
      });
    },
    listWithoutAll(page, filters) {
      page = page || 1;
      filters = filters || {};
      const query = {
        page: page,
        ...filters,
      };

      return new Promise((resolve, reject) => {
        const request = useDeferredAPIRequest();
        request.execute(`/${resource}`, {
          // params: query,
          headers: {
            'Authorization': `Bearer ${LocalStorage.getItem('token')}`
          }
        });
        request.then(({ data, error }) => {
          if (error.value) reject(error.value);
          resolve({
            data: data.value,
          });
        }, reject);
      });
    },
    child(id, subresource) {
      return new Promise((resolve, reject) => {
        const request = useDeferredAPIRequest();
        request.execute(`/${resource}/${id}/${subresource}`);
        request.then(({ data, error }) => {
          if (error.value) reject(error.value);
          resolve({
            data: data.value["hydra:member"],
            totalItems: data.value["hydra:totalItems"],
          });
        }, reject);
      });
    },
    create(payload, contentType = null) {
      return new Promise((resolve, reject) => {
        const request = useDeferredAPIRequest();
        request.execute(`/${resource}`, {
          method: "POST",
          data: payload,
          headers: {
            "Content-Type": contentType ? contentType : "application/json",
            'Authorization' : `Bearer ${LocalStorage.getItem('token')}`
          },
        });
        request.then(({ data, error }) => {
          if (error.value) reject(error.value);
          resolve(data.value);
        }, reject);
      });
    },
    get(id) {
      return new Promise((resolve, reject) => {
        const request = useDeferredAPIRequest();
        request.execute(`/${resource}/${id}`, {
          headers: {
            'Authorization' : `Bearer ${LocalStorage.getItem('token')}`
          }
        });
        request.then(({ data, error }) => {
          if (error.value) reject(error.value);
          resolve(data.value);
        }, reject);
      });
    },
    update(id, payload) {
      return new Promise((resolve, reject) => {
        const request = useDeferredAPIRequest();
        request.execute(`/${resource}/${id}`, {
          method: "PUT",
          data: payload,
          headers: {
            'Authorization': `Bearer ${LocalStorage.getItem('token')}`
          }
        });
        request.then(({ data, error }) => {
          if (error.value) reject(error.value);
          resolve(data.value);
        });
      });
    },
    delete(id) {
      return new Promise((resolve, reject) => {
        const request = useDeferredAPIRequest();
        request.execute(`/${resource}/${id}`, {
          method: "DELETE",
        });
        request.then(({ data, error }) => {
          if (error.value) reject(error.value);
          resolve(data.value);
        });
      });
    },
  };
};

