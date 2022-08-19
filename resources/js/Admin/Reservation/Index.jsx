import axios from 'axios'
import React, { Component } from 'react'
import Button from '../../Layout/Button'
import { Link } from 'react-router-dom'
export class ReservationIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reservations: []
        }
    }

    fetchRes() {
        axios.get('/api/reservation').then((response) => this.setState({reservations: response.data}))
    }

    componentDidMount() {
        this.fetchRes();
    }

    renderTable() {
        return this.state.reservations.data.map((reservation) => (
            <tr key={reservation.id} className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {reservation.first_name}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {reservation.last_name}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {reservation.email}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {reservation.tel_number}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {reservation.res_date}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {reservation.table_id}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {reservation.guest_number}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Link to={`/admin/reservation/edit/${reservation.id}`}>
                        Edit
                    </Link>{" "}
                    /
                    <button
                        value={reservation.id}
                        type="button"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
    }

  render() {
    if (!("data" in this.state.reservations)) return;
    return (
        <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <Button
                title="New Reservation"
                urlname="/admin/reservation/create"
            />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                FirstName
                            </th>
                            <th scope="col" className="px-6 py-3">
                                LastName
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Phone
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Table
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Guest
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit / Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>{this.renderTable()}</tbody>
                </table>
            </div>
        </div>
        {console.log(this.state.reservations)}
    </div>
    )
  }
}

export default ReservationIndex
