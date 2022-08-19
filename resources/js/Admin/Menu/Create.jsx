import axios from 'axios';
import React, { Component } from 'react'
import Button from '../../Layout/Button';
import { useNavigate } from "react-router-dom";

export const withNavigation = (Component) => {
    return props => <Component {...props} navigate={useNavigate()} />;
}
export class MenuCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            image:'',
            description:'',
            price:'',
            categories:[],
            selectOptions: []

        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleDesChange = this.handleDesChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }



    fetchCategories() {
        axios.get('/api/categories').then(response => this.setState({categories: response.data.data}))
    }
    componentDidMount() {
            this.fetchCategories();
    }
    handleChange = (e) => {
        this.setState({
            category:[].slice.call(e.target.selectedOptions).map(o => {
                return o.value;
            })
        });
      }


    handleNameChange(e) {
        this.setState({name: e.target.value})
    }
    handleDesChange(e) {
        this.setState({description: e.target.value})
    }
    handleImageChange(e) {
        this.setState({image: e.target.files[0]})
    }

    handlePriceChange(e) {
        this.setState({price: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        let menuPost = new FormData();
        menuPost.append('name', this.state.name)
        menuPost.append('description', this.state.description)
        menuPost.append('image', this.state.image)
        menuPost.append('price', this.state.price)
        menuPost.append('category', this.state.category)
        axios.post('/api/menu', menuPost).then((response) => this.props.navigate('/admin/menu'))
    }
    renderCategories() {
        const categories = this.state.categories.map(category => <option key={category.id} name="category" value={category.id}>{category.name}</option> );
        return (
            <div className="m-2">
                <select name='category' onChange={this.handleChange} value={this.state.category} className="mt-1 sm:mt-0 sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" multiple={true}>
                        {categories}
                </select>
            </div>

        )
    }
  render() {
    return (
        <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Button title="Menu" urlname="/admin/categories" />
            <div className="m-2 p-2 bg-slate-100 rounded">
                <div className="space-y-8 divide-y divide-gray-200 w-1/2 mt-10">
                    <form  encType="multipart/form-data" onSubmit={this.handleSubmit}>
                        <div className="sm:col-span-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700"> Name </label>
                            <div className="mt-1">
                                <input type="text" id="name" value={this.state.name} onChange={this.handleNameChange}
                                    className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5" />

                            </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
                            <div className="mt-1">
                                <input type="file" id="image" name="image" onChange={this.handleImageChange}
                                    className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>
                        <div className="sm:col-span-6 pt-5">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <div className="mt-1">
                                <textarea id="description" rows="3" value={this.state.description} onChange={this.handleDesChange}
                                    className="shadow-sm focus:ring-indigo-500 appearance-none bg-white border py-2 px-3 text-base leading-normal transition duration-150 ease-in-out focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"/>
                            </div>
                            {console.log(this.state.categories)}
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <div className="mt-1">
                                <input type="number" id="price" name="price" value={this.state.price} onChange={this.handlePriceChange}
                                    className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>
                        <div className="sm:col-span-6 pt-5">
                            <div className="mt-1">
                                {this.renderCategories()}
                            </div>
                            {this.state.selectOptions.join(', ')}

                        </div>
                        <div className="mt-6 p-4">
                            <button type="submit"
                                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white">Add</button>
                        </div>
                    </form>
            </div>
            </div>
            {console.log(this.state.category)}
        </div>
    </div>
    )
  }
}

export default withNavigation(MenuCreate);
