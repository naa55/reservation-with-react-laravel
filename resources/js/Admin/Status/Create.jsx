import axios from "axios";
import React, { Component } from "react";
import Button from "../../Layout/Button";
import { useNavigate } from "react-router-dom";

export const withNavigation = (Component) => {
    return props => <Component {...props} navigate={useNavigate()} />;
}
export class StatusCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "",
        };

        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleStatusChange(e) {
        this.setState({ status: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/api/status", { status: this.state.status })
            .then((response) => this.props.navigate('/admin/status'))
            .catch((error) => console.log(error))
    }
    render() {
        return (
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Button title="Status" urlname="/admin/status" />
                    <div className="m-2 p-2 bg-slate-100 rounded">
                        <div className="space-y-8 divide-y divide-gray-200 w-1/2 mt-10">
                            <form
                                encType="multipart/form-data"
                                onSubmit={this.handleSubmit}
                            >
                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="status"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {" "}
                                        Status{" "}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            value={this.state.status}
                                            onChange={this.handleStatusChange}
                                            className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="mt-6 p-4">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white"
                                    >
                                        Add
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withNavigation(StatusCreate);
