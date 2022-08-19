import React, { Component } from "react";
import Button from "../../Layout/Button";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export class CategoryIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            query: {
                page: 1,
                global:'',
                name:'',
                description:'',
                order_column: 'id',
                order_direction: 'desc'
            }
        };

        this.deleteCategory = this.deleteCategory.bind(this);
        this.pageChanged= this.pageChanged.bind(this);
        this.handleNameFilter = this. handleNameFilter.bind(this);
        this.handleContentFilter = this.handleContentFilter.bind(this);
        this.handleGlobalFilter = this.handleGlobalFilter.bind(this);
    }
    fetchCategory() {
        axios
            .get("/api/categories", { params: this.state.query })
            .then((response) => this.setState({ categories: response.data }))
            .catch((error) => console.log(error));
    }
    pageChanged(url) {
        const fullUrl = new URL(url);
        this.state.query.page = fullUrl.searchParams.get('page');
        this.fetchCategory()
        // this.setState((state) =>({
        //     query: {
        //         category_id: this.state.query.category_id,
        //         page: fullUrl.searchParams.get('page')
        //    })
        }
    deleteCategory(event) {
        axios
            .delete("/api/categories/" + event.target.value)
            .then((response) => this.fetchCategory());
    }

    renderCategories() {
        return this.state.categories.data.map((category) => (
            <tr key={category.id} className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {category.name}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <img
                        src={`http://127.0.0.1:8000/storage/${category.thumbnail.substr(
                            7
                        )}`}
                        alt=""
                        width={200}
                        height={200}
                    />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {category.description}
                </td>
                {/* {console.log(category.thumbnail.substr(7))} */}
                {console.log(
                    `http://127.0.0.1:8000/storage/${category.thumbnail.substr(
                        7
                    )}`
                )}
                <td className="px-6 py-4 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <Link to={`/admin/categories/edit/${category.id}`}>
                        Edit
                    </Link>{" "}
                    /
                    <button
                        value={category.id}
                        onClick={this.deleteCategory}
                        type="button"
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
    }
    renderFilterText(column, callback) {
        return (
            <div className="m-2">
                <input type="text" placeholder="search..." onChange={callback} value={this.state.query[column]} className="block w-64 rounded-md shadown-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo" />
            </div>
        )
    }

    handleGlobalFilter(event) {
        this.setState((state) => ({
            query: {
                global: event.target.value,
                page: 1,
                order_column: state.query.order_column,
                order_direction: state.query.order_direction
            }
           }), this.fetchCategory());
    }
    handleNameFilter(event) {
        this.setState((state) => ({
            query: {
                name: event.target.value,
                page: 1,
                order_column: state.query.order_column,
                order_direction: state.query.order_direction
            }
           }), this.fetchCategory());
    }
    handleContentFilter(event) {
        this.setState((state) => ({
            query: {
                description: event.target.value,
                page: 1,
                order_column: state.query.order_column,
                order_direction: state.query.order_direction
            }
           }), this.fetchCategory());
    }


    componentDidMount() {
        this.fetchCategory();
    }

    renderPaginatorLinks() {
        return this.state.categories.meta.links.map((link, index) => (
            <button
                key={index}
                onClick={() => this.pageChanged(link.url)}
                dangerouslySetInnerHTML={{ __html: link.label }}
                className="relative inline-flex items-center px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 leading-5 hover:text-gray-500 focus:z-10 focus:outline-none focus:ring ring-gray-300 focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150 first:rounded-l-md last:rounded-r-md"
            ></button>
        ));
    }

    renderPagination() {
        return (
            <nav
                role="navigation"
                aria-label="Pagination Navigation"
                className="flex items-center justify-between"
            >
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700 leading-5">
                            Showing
                            <span>
                                <span className="font-medium">
                                    {" "}
                                    {this.state.categories.meta.from}{" "}
                                </span>
                                to
                                <span className="font-medium">
                                    {" "}
                                    {this.state.categories.meta.to}{" "}
                                </span>
                            </span>
                            of
                            <span className="font-medium">
                                {" "}
                                {this.state.categories.meta.total}{" "}
                            </span>
                            results
                        </p>
                    </div>

                    <div>
                        <span className="relative z-0 inline-flex shadow-sm rounded-md">
                            {this.renderPaginatorLinks()}
                        </span>
                    </div>
                </div>
            </nav>
        );
    }

    renderFilterRow() {
        return (
            <tr className="bg-gray-50">

                <th>
                    {this.renderFilterText('name', this.handleNameFilter)}
                </th>
                <th>

                </th>
                <th>
                  {this.renderFilterText('description', this.handleContentFilter)}
                </th>
                <th></th>
                <th></th>
            </tr>
        )
    }
    render() {
        if (!("data" in this.state.categories)) return;
        return (
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                {this.renderFilterText('global', this.handleGlobalFilter)}
                    <Button
                        title="New Category"
                        urlname="/admin/categories/create"
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
                            <tbody>{this.renderCategories()}</tbody>
                        </table>
                    </div>
                    <div className="mt-4">{this.renderPagination()}</div>
                </div>
                {console.log(this.state.categories)}
            </div>
        );
    }
}

export default CategoryIndex;
