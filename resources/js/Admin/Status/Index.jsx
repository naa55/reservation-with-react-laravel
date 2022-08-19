import axios from 'axios';
import React, { Component } from 'react'
import Button from '../../Layout/Button'
import { Link } from 'react-router-dom';

export class StatusIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statuses:[]
        }
    }

    fetchStatus() {
        axios.get('/api/status').then((response) => this.setState({statuses: response.data}))
    }

    componentDidMount() {
        this.fetchStatus()
    }

    renderStatus() {
        return this.state.statuses.data.map((status) => (
            <tr key={status.id} className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {status.id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {status.status}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Link to={`/admin/status/edit/${status.id}`}>
                        Edit
                    </Link>{" "}
                    /
                    <button
                        value={status.id}
                        // onClick={this.deleteStatus}
                        type="button"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
    }


  render() {
    if (!("data" in this.state.statuses)) return;
    return (
        <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Button
                title="New Status"
                urlname="/admin/status/create"
            />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit / Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>{this.renderStatus()}</tbody>
                </table>
            </div>
        </div>
    </div>
    )
  }
}

export default StatusIndex
