import React, { Component } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../Layout/Button";
export const withNavigation = (Component) => {
    return (props) => <Component {...props} navigate={useNavigate()} />;
};
export const withParams = (Component) => {
    return (props) => <Component {...props} params={useParams()} />;
};
export class ReservationEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            first_name: "",
            last_name: "",
            email: "",
            tel_number: "",
            res_date: "",
            table_id: "",
            guest_number: "",
            tables: [],
        };

        this.handleFirstChange = this.handleFirstChange.bind(this);
        this.handleLastChange = this.handleLastChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleTelNumChange = this.handleTelNumChange.bind(this);
        this.handleResDateChange = this.handleResDateChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.handleGuestChange = this.handleGuestChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleFirstChange(e) {
        this.setState({ first_name: e.target.value });
    }
    handleLastChange(e) {
        this.setState({ last_name: e.target.value });
    }
    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }
    handleTelNumChange(e) {
        this.setState({ tel_number: e.target.value });
    }
    handleResDateChange(e) {
        this.setState({ res_date: e.target.value });
    }
    handleGuestChange(e) {
        this.setState({ guest_number: e.target.value });
    }

    handleTableChange(e) {
        this.setState({ table_id: e.target.value });
    }

    fetchTables() {
        axios
            .get("/api/table")
            .then((response) => this.setState({ tables: response.data.data }));
    }

    componentDidMount() {
        axios
            .get("/api/reservation/" + this.props.params.id)
            .then((response) => {
                this.setState({ id: response.data.data.id }),
                    this.setState({ first_name: response.data.data.first_name }),
                    this.setState({ last_name: response.data.data.last_name }),
                    this.setState({ email: response.data.data.email }),
                    this.setState({ tel_number: response.data.data.tel_number }),
                    this.setState({ res_date: response.data.data.res_date }),
                    this.setState({ table_id: response.data.data.table_id }),
                    this.setState({
                        guest_number: response.data.data.guest_number,
                    });
            });
        this.fetchTables();
    }
    handleSubmit(e) {
        e.preventDefault();
        axios
            .put("/api/reservation/" + this.state.id, {
                "first_name": this.state.first_name,
                "last_name": this.state.last_name,
                "email": this.state.email,
                "tel_number": this.state.tel_number,
                "res_date": this.state.res_date,
                "table_id": this.state.table_id,
                "guest_number": this.state.guest_number,
            })
            .then((response) => this.props.navigate("/admin/reservation"));
    }

    renderTables() {
        const tableOption = this.state.tables.map((table) => (
            <option key={table.id} name="table_id" value={table.id}>
                {table.name}
            </option>
        ));
        return (
            <div className="m-2">
                <select
                    name="table_id"
                    onChange={this.handleTableChange}
                    className="mt-1 sm:mt-0 sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                    <option value="">--Select Table--</option>
                    {tableOption}
                </select>
            </div>
        );
    }

    render() {
        return (
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Button title="Status" urlname="/admin/reservation" />
                    <div className="m-2 p-2 bg-slate-100 rounded">
                        <div className="space-y-8 divide-y divide-gray-200 w-1/2 mt-10">
                            <form
                                encType="multipart/form-data"
                                onSubmit={this.handleSubmit}
                            >
                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="first_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {" "}
                                        FirstName{" "}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            name="first_name"
                                            value={this.state.first_name}
                                            onChange={this.handleFirstChange}
                                            className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="last_name"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {" "}
                                        LastName{" "}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            value={this.state.last_name}
                                            onChange={this.handleLastChange}
                                            className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {" "}
                                        Email{" "}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            value={this.state.email}
                                            onChange={this.handleEmailChange}
                                            className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="tel_number"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {" "}
                                        Phone{" "}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            value={this.state.tel_number}
                                            onChange={this.handleTelNumChange}
                                            className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="res_date"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {" "}
                                        Date{" "}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="date"
                                            value={this.state.res_date}
                                            onChange={this.handleResDateChange}
                                            className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="res_date"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {" "}
                                        Guest Number{" "}
                                    </label>
                                    <div className="mt-1">
                                        <input
                                            type="text"
                                            value={this.state.guest_number}
                                            onChange={this.handleGuestChange}
                                            className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                    </div>
                                </div>
                                <div className="sm:col-span-6">
                                    <label
                                        htmlFor="table_id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {" "}
                                        Table{" "}
                                    </label>
                                    <div className="mt-1">
                                        {this.renderTables()}
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
                    {console.log(this.state.res_date)}
                </div>
            </div>
        );
    }
}

export default withParams(withNavigation(ReservationEdit));
