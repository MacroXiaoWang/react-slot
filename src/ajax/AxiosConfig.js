import axios from 'axios'
import 'nprogress/nprogress.css'
import "../assets/css/Progress.css"
import NProgress from 'nprogress'

axios.interceptors.request.use(config => {
    NProgress.start();
    return config;
}, error => {
    NProgress.done();
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    NProgress.done();
    if (200 === response.status) {
        if ("-0401" === response.data.code) {
            window.top.location = "/login";
            return;
        }
    } else {
        console.error("http status is not 200. ", response);
    }
    return response;
}, error => {
    NProgress.done();
    return Promise.reject(error);
});
