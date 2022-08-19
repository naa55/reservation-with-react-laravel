import axios from "axios";
import { bind } from "lodash";
import React, { Component } from "react";
import { withNavigation } from "../../Admin/Menu/Create";
import Button from "../../Layout/Button";
import TakenSeat from "../../Layout/TakenSeat";
export class FontReservationIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            tel_number: "",
            res_date: "",
            table_id: "",
            guest_number: "",
            tables: [],
            reservation: [],
            errors: {},
            bool: false,
        };

        this.handleFirstChange = this.handleFirstChange.bind(this);
        this.handleLastChange = this.handleLastChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleTelNumChange = this.handleTelNumChange.bind(this);
        this.handleResDateChange = this.handleResDateChange.bind(this);
        this.handleTableChange = this.handleTableChange.bind(this);
        this.handleGuestChange = this.handleGuestChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleClick() {
        this.setState((prevState) => ({
            bool: !prevState.bool,
        }));
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

    fetchReservation() {
        axios
            .get("/api/reservation")
            .then((response) =>
                this.setState({ reservation: response.data.data })
            );
    }

    componentDidMount() {
        this.fetchTables();
        this.fetchReservation();
    }
    handleSubmit(e) {
        e.preventDefault();
        axios
            .post("/api/reservation", {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                tel_number: this.state.tel_number,
                res_date: this.state.res_date,
                table_id: this.state.table_id,
                guest_number: this.state.guest_number,
            })
            .then((response) => this.props.navigate("/admin/reservation"))
            .catch((error) =>
                this.setState({ errors: error.response.data.errors })
            );
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

    handleBool() {
        this.setState({ bool: !this.state.bool });
    }

    renderBool() {
        // let table = this.state.reservation.filter((res) => res.res_date.slice(0, 10) === this.state.res_date);
        // // let table = this.state.reservation.map((res) => res.res_date.slice(0, 10) === this.state.res_date);
        // console.log(table);
        // if(table.length > 0) {
        //     console.log('avaliable tables on this day')
        // } else {
        //     console.log('pick a date')
        // }
        // BEFORE ''''''''''
        // if(this.state.res_date) {
        //     console.log('hello');
        //     let tables = this.state.reservation.filter((res) => res.res_date.slice(0, 10) === this.state.res_date);
        //     if(tables.length === 4) {
        //         <p>Seat is on this date is full</p>
        //     }
        //     let table = this.state.reservation.filter((res) => res.res_date.slice(0, 10) === this.state.res_date && res.guest_number == Number(this.state.guest_number));
        //     if(table.length === 1) {
        //       return  <TakenSeat title={this.state.res_date}/>
        //     }
        // }
        //for common values
        //    var matches = [];
        //    for ( var i = 0; i < arr.length; i++ ) {
        //        for ( var e = 0; e < tables_id.length; e++ ) {
        //            if ( arr[i] === tables_id[e] ) matches.push( arr[i] );
        //        }
        //    }
        //    console.log(matches)
        // var array3 = arr.filter(function(obj) { return tables_id.indexOf(obj) == -1; });
        // console.log(array3);
    }

    tryTables() {
        const arr = [1, 2, 3, 4, 5];

        let tables = this.state.reservation.filter(
            (res) => res.res_date.slice(0, 10) === this.state.res_date
        );
        if (tables) {
            let tables_id = tables.map((table) => table.guest_number);
            let arr3 = arr.filter((tb) => tables_id.indexOf(tb) == -1);

            const tableOpt = arr3.map((a) => (
                <option key={a} name="guest_number" value={a}>
                    {a}
                </option>
            ));

            return (
                <div className="m-2">
                    <select
                        onChange={this.handleGuestChange}
                        name="guest_number"
                        className="mt-1 sm:mt-0 sm:w-1/4 rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    >
                        {tableOpt.length <= 0
                            ? "No seat avaliable on this"
                            : tableOpt}
                    </select>
                </div>
            );

            // var array3 = arr.filter(function (obj) {
            //     return tables_id.indexOf(obj) == -1;
            // });
            // console.log(array3);
        }
    }
    errorMessage(field) {
        return (
            <div className="text-red-600 mt-1">
                {this.state.errors?.[field]?.map((message, index) => {
                    return <div key={index}>{message}</div>;
                })}
            </div>
        );
    }

    render() {
        return (
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <Button title="Back Home" urlname="/" />
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

                                        {this.errorMessage("first_name")}
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
                                        {this.errorMessage("last_name")}
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
                                        {this.errorMessage("email")}
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
                                        {this.errorMessage("tel_number")}
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
                                        {this.errorMessage("res_date")}
                                    </div>
                                </div>
                                    <div className="sm:col-span-6">
                                        <label
                                            htmlFor="guest_number"
                                            className="block text-sm font-medium text-green-700"
                                        >
                                            Guest Number{" "}
                                            {this.state.res_date
                                                ? <p className="font-bold text-xl">{"Avialable Guest Number on" +
                                                " " +
                                                this.state.res_date}</p>
                                                : ""}
                                        </label>
                                        <div className="mt-1">
                                            {this.tryTables()}
                                        </div>
                                    </div>
                                    {/* <div className="mt-1">
                                        <input
                                            type="text"
                                            value={this.state.guest_number}
                                            onChange={this.handleGuestChange}
                                            className="block w-full appearance-none bg-white border border-gray-400 rounded-md py-2 px-3 text-base leading-normal transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                                        />
                                        {this.errorMessage("guest_number")}
                                        {this.renderBool()}
                                    </div> */}
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
                                    {this.renderBool() ? (
                                        ""
                                    ) : (
                                        <button
                                            type="submit"
                                            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 rounded-lg text-white"
                                        >
                                            Add
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                    {console.log(Number(this.state.guest_number))}
                </div>
            </div>
        );
    }
}

export default withNavigation(FontReservationIndex);
