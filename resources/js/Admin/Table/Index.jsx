import axios from 'axios'
import React, { Component } from 'react'
import Button from '../../Layout/Button'
import { Link } from 'react-router-dom'
export class TableIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tables:[]
        }
    }
    fetchTables() {
        axios.get('/api/table').then((response)=> this.setState({tables: response.data}));
    }
    componentDidMount() {
        
        this.fetchTables();
    }
    renderTable() {
        return this.state.tables.data.map((table) => (
            <tr key={table.id} className="bg-white dark:bg-gray-800">

                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {table.name}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {table.guest}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {table.name}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Link to={`/admin/table/edit/${table.id}`}>
                        Edit
                    </Link>{" "}
                    /
                    <button
                        value={table.id}
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
    if (!("data" in this.state.tables)) return;

    return (
        <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Button
                title="New Table"
                urlname="/admin/table/create"
            />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Guest
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit / Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>{this.renderTable()}</tbody>
                    {console.log(this.state.tables)}
                </table>
            </div>
        </div>
    </div>
    )
  }
}

export default TableIndex
