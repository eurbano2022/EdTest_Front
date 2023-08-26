import axios from 'axios'

export class BackendRequest {
    constructor(token, baseURL='localhost:8000') {
        this.__baseURL = baseURL
        this.__token = token
        this.__axios = axios
    }

    __get_url(url) {
        return`${this.__baseURL}/${url}`
    }

    __get_header() {
        return {'Authorization': this.__token}
    }

    get_industries() {
        return axios({
            method: 'get',
            url: this.__get_url('industries'),
            headers: this.__get_header()
        })
    }

    get_area_processes() {
        return axios({
            method: 'get',
            url: this.__get_url('area_processes'),
            headers: this.__get_header()
        })
    }

    get_person(email) {
        return axios({
            method: 'get',
            url: this.__get_url(`people/search/email/${email}`),
            headers: this.__get_header()
        })
    }

    get_criteria() {
        return axios({
            method: 'get',
            url: this.__get_url('criteria'),
            headers: this.__get_header()
        })
    }

    get_answers(token) {
        return axios({
            method: 'get',
            url: this.__get_url(`answers/${token}`),
            headers: this.__get_header()
        })
    }

    get_inform(token) {
        return axios({
            method: 'get',
            url: this.__get_url(`inform/${token}`),
            headers: this.__get_header()
        })
    }

    get_roadmap(token) {
        return axios({
            method: 'get',
            url: this.__get_url(`roadmap/${token}`),
            headers: this.__get_header()
        })
    }

    insert_user(email, name, last_name, company, role, industry) {
        return axios({
            method: 'post',
            url: this.__get_url('people/create'),
            headers: this.__get_header(),
            data: {
                'email': email,
                'name': name,
                'last_name': last_name,
                'company': company,
                'role': role,
                'industry': industry,
            }
        })
    }

    insert_answer_user(token, criteria, answer) {
        return axios({
            method: 'post',
            url: this.__get_url('people/add/answer'),
            headers: this.__get_header(),
            data: {
                'token': token,
                'criteria': criteria,
                'answer': answer,
            }
        })
    }
}
