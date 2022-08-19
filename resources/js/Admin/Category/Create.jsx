import axios from 'axios';
import React, { Component } from 'react'
import Button from '../../Layout/Button';
import { useNavigate } from "react-router-dom";

export const withNavigation = (Component) => {
    return props => <Component {...props} navigate={useNavigate()} />;
}

 class CategoryCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description:'',
            thumbnail:'',
            errors: {}
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameDescription = this.handleNameDescription.bind(this);
        this.handleThumbnail = this.handleThumbnail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleNameChange(event) {
        this.setState({name: event.target.value})
    }
    handleNameDescription(event) {
        this.setState({description: event.target.value})
    }
    handleThumbnail(event) {
        this.setState({thumbnail: event.target.files[0]})
    }
    handleSubmit(event) {
        event.preventDefault();
       
        this.setState({
            errors:{}
        })
        let postData = new FormData();
        postData.append('name', this.state.name)
        postData.append('description', this.state.description)
        postData.append('thumbnail', this.state.thumbnail)
       axios.post('/api/categories', postData).then(response => this.props.navigate('/admin/categories'))
       .catch(error => this.setState({errors:error.response.data.errors}))
    }

    errorMessage(field) {
        return (
            <div className="text-red-600 mt-1">
                {this.state.errors?.[field]?.map((message, index) => {
                return (
                    <div key={index}>{message}</div>
                )
                })}
            </div>
        )
    }

  render() {
    return (
        <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Button title="Category" urlname="/admin/categories" />
            <div className="m-2 p-2 bg-slate-100 rounded">
                <div className="space-y-8 divide-y divide-gray-200 w-1/2 mt-10">
                    <form onSubmit={this.handleSubmit} encType="multipart/form-data">
                        <div className="sm:col-span-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700"> Name </label>
                            <div className="mt-1">
                                <input type="text" id="name" value={this.state.name} onChange={this.handleNameChange}
                                    className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                    {this.errorMessage('name')}

                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700">Thumbnail </label>
                            <div className="mt-1">
                                <input type="file" id="thumbnail" name="thumbnail" onChange={this.handleThumbnail}
                                    className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                                              {this.errorMessage('thumbnail')}
                            </div>
                        </div>
                        <div className="sm:col-span-6 pt-5">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <div className="mt-1">
                                <textarea id="description" rows="3" value={this.state.description}  onChange={this.handleNameDescription}
                                    className="shadow-sm focus:ring-indigo-500 appearance-none bg-white border py-2 px-3 text-base leading-normal transition duration-150 ease-in-out focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"/>
                                        {this.errorMessage('description')}
                            </div>
                        </div>
                        <div className="mt-6 p-4">
                            <button type="submit"
                                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white">Add</button>
                        </div>
                    </form>
            </div>
            </div>
        </div>
    </div>
    )
  }
}

export default withNavigation(CategoryCreate);
