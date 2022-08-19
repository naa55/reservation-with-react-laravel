import React, { Component } from 'react'

 class CategoryService extends Component {
    getAll() {
       return axios.get('/api/categories')
    }
}

export default new CategoryService
