import axios from 'axios';
import React, { Component } from 'react'
import Button from '../../Layout/Button';
import { useNavigate } from "react-router-dom";

export const withNavigation = (Component) => {
    return props => <Component {...props} navigate={useNavigate()} />;
}
export class TableCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            guest:'',
            status_id:'',
            statuses:[]
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleGuestChange = this.handleGuestChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }
    handleSubmit(e) {
            e.preventDefault();
            console.log('hello');
            console.log(this.state.status_id);
            axios.post('/api/table', {
                name: this.state.name,
                guest: this.state.guest,
                status_id: this.state.status_id
            }).then((response) => this.props.navigate('/admin/table'))
    }

    handleGuestChange(e) {
        this.setState({guest: e.target.value})
    }
    handleNameChange(e) {
        this.setState({name: e.target.value})
    }
    handleStatusChange(e) {
        this.setState({status_id: e.target.value})
    }

    fetchStatus() {
        axios.get('/api/status').then((response) => this.setState({statuses:response.data.data}))
    }
    componentDidMount() {
        this.fetchStatus()
    }
    renderStatus() {
        console.log(this.state.statuses);
        const statusOption = this.state.statuses.map(status => <option key={status.id} name="status_id" value={status.id}>{status.status}</option> );
        return (
            <div className="m-2">
                <select name='status_id' onChange={this.handleStatusChange}  className="mt-1 sm:mt-0 sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                        <option value="">--Select Status--</option>
                        {statusOption}
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
                        <div className="sm:col-span-6 pt-5">
                            <label htmlFor="guest" className="block text-sm font-medium text-gray-700">Guest</label>
                            <div className="mt-1">
                            <input type="number" id="guest" value={this.state.guest} onChange={this.handleGuestChange}
                                    className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5" />
                            </div>
                        </div>
                        <div className="sm:col-span-6 pt-5">
                            <div className="mt-1">
                                {this.renderStatus()}
                            </div>

                        </div>
                        <div className="mt-6 p-4">
                            <button type="submit"
                                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white">Add</button>
                        </div>
                    </form>
            </div>
            </div>
            {console.log(this.state.status_id)}
        </div>
    </div>
    )
  }
}

export default withNavigation(TableCreate)
