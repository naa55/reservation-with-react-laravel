import axios from 'axios'
import React, { Component } from 'react'
import Button from '../../Layout/Button'
import { Link } from 'react-router-dom'
export class MenuIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menus: []
        }
        this.deleteMenu = this.deleteMenu.bind(this);
    }

    fetchMenus() {
        axios.get('/api/menu').then((response) => this.setState({menus: response.data}));
    }

    componentDidMount() {
        this.fetchMenus()
    }
    deleteMenu(event) {
        axios
            .delete("/api/menu/" + event.target.value)
            .then((response) => this.fetchMenus());
    }

    renderMenu() {
        return this.state.menus.data.map((menu) => (
            <tr key={menu.id} className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {menu.name}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img
                        src={`http://127.0.0.1:8000/storage/${menu.image.substr(
                            7
                        )}`}
                        alt=""
                        width={200}
                        height={200}
                    />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {menu.description}
                </td>
                {console.log(menu.categories.map((pivote) => pivote.pivot.category_id))}
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Link to={`/admin/menu/edit/${menu.id}`}>
                        Edit
                    </Link>{" "}
                    /
                    <button
                        value={menu.id}
                        onClick={this.deleteMenu}
                        type="button"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
    }
  render() {
    if (!("data" in this.state.menus)) return;
    return (
        <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {/* {this.renderFilterText('global', this.handleGlobalFilter)} */}
            <Button
                title="New Menu"
                urlname="/admin/menu/create"
            />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Description
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Edit / Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody>{this.renderMenu()}</tbody>
                </table>
            </div>
            {console.log(this.state.menus)}
            {/* <div className="mt-4">{this.renderPagination()}</div> */}
        </div>
    </div>
    )
  }
}

export default MenuIndex
