/* eslint-disable linebreak-style */
import axios from 'axios'
import paths from './endpoints'
import { useLogout } from '@/views/auth/Logout'
// import { useAutoLogout, useLogout } from '@/views/auth/Logout'

// import { decodeToken, logout } from "../utility/auth";

// const getToken = () => {
//   // const t = decodeToken("t");
//   // const token = t && t.t;
//   // return token;
// }
// const  urls  = 'https://erpapi.edostate.gov.ng/';

// let urls = `${decodeToken('api').api}`;
// let url = `https://localhost:5001${path}`;

const fetchBackend = async (endpoint, method, auth, body, pQuery, param, multipart) => {
  const headers = {
    // "X-API-KEY": process.env.REACT_APP_API_KEY,
    'Content-Type': multipart ? 'multipart/form-data' : 'application/json'
  }
  const path = paths[endpoint] || endpoint
  // let url = `${import.meta.env.VITE_API_BASE_URL}${path}`
  let url = `https://api.fansngage.com/api/v1${path}`
  // console.log(url, 'kolokolo')
  if (param) {
    url += `/${param}`
  }

  if (pQuery) {
    const paramsArray = Object.keys(pQuery).map(
      (key) => pQuery[key] && `${encodeURIComponent(key)}=${encodeURIComponent(pQuery[key])}`
    )

    url += `?${paramsArray.join('&')}`
  }

  if (auth) {
    // const token = getToken();
    const token = localStorage.getItem('token')
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }
  const options = {
    url,
    method,
    headers
  }

  if (body) {
    options.data = body
  }

  return axios(options).then(
    (res) => res,
    async (err) => {
      if (err && err.status && err.response.status === 401) {
        console.log(err.response.status)
        const { logout } = useLogout()
        logout()
        localStorage.clear()
        // log the user out and return
        // await logout(process.env.REACT_APP_JWT_SECRET, true);
      }
      console.log(err.response)
      return err.response
    }
  )
}

/**
 *
 * @param {string} endpoint
 * @param {object} body
 * @param {object} pQuery
 * @param {string} param
 * @param {boolean} auth
 */
export const get = ({ endpoint, pQuery, param = null, auth = true }) =>
  fetchBackend(endpoint, 'GET', auth, null, pQuery, param)

/**
 *
 * @param {string} endpoint
 * @param {object} body
 * @param {string} param
 * @param {boolean} auth
 * @param {boolean} multipart
 */
export const post = ({ endpoint, body, auth = true, multipart, param }) =>
  fetchBackend(endpoint, 'POST', auth, body, null, param, multipart)

/**
 *
 * @param {string} endpoint
 * @param {object} body
 * @param {string} param
 * @param {string} pQuery
 * @param {boolean} auth
 * @param {boolean} multipart
 */
export const patch = ({ endpoint, body, param, pQuery, auth = true, multipart }) =>
  fetchBackend(endpoint, 'PATCH', auth, body, pQuery, param, multipart)

/**
 *
 * @param {string} endpoint
 * @param {string} param
 * @param {boolean} auth
 */
export const del = ({ endpoint, param, auth = true }) =>
  fetchBackend(endpoint, 'DELETE', auth, null, null, param)

/**
 *
 * @param {string} endpoint
 * @param {object} body
 * @param {string} param
 * @param {string} pQuery
 * @param {boolean} auth
 * @param {boolean} multipart
 */
export const put = ({ endpoint, body, param, pQuery, auth = true, multipart }) =>
  fetchBackend(endpoint, 'PUT', auth, body, pQuery, param, multipart)

// export const GetwithQueryStringDoc = async (method, data, callbackfunction) => {
//   const { name, value } = data;

//   const response = axios.get(`${urls}${method}?${name}=${value}`, {
//     headers: {
//       Authorization: `Bearer ${getToken()}`,
//       'Access-Control-Allow-Credentials': true,
//       crossorigin: true,
//       'Access-Control-Allow-Methods': 'GET',
//       'Access-Control-Allow-Origin': '*',
//     },
//   });

//   await response
//     .then((response) => {
//       console.log(response)
//       let result = response.data;
//       callbackfunction(result);
//     })
//     .catch((error) => {
//       callbackfunction(error);
//     });
// }
