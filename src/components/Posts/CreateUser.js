import React, { useCallback, useState } from "react";

//import "./styles.css";

export default function CreateUserComponent() {
    const [users, setUsers] = useState([]);
    const [formdata, setFormData] = useState({});
    const onChangeHandler = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value.trim()
        });
    };
    const addUserHandler = (event) => {
        event.preventDefault();
        setUsers([...users, formdata]);
    };
    const showListUsers = useCallback(() => {
        return users.map((item, key) => {
            return (
                <tr key={Math.random()}>
                    <td>{item.username}</td>
                    <td>{item.city}</td>
                </tr>
            );
        });
    }, [users]);
    return (
        <div className="App">
            <form id="userform"
                onSubmit={(e) => {
                    addUserHandler(e);
                }}
            >
                <div>
                    <label>Username:</label>
                    <input id="username"
                        onChange={(e) => {
                            onChangeHandler(e);
                        }}
                        type="text"
                        name="username"
                    />
                </div>
                <div>
                    <label>City:</label>
                    <input
                        id="city"
                        onChange={(e) => {
                            onChangeHandler(e);
                        }}
                        type="text"
                        name="city"
                    />
                </div>
                <button>Add user</button>
            </form>
            <div>=====================</div>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>{showListUsers()}</tbody>
            </table>
        </div>
    );
}
