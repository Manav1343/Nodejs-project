import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function View(props) {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    async function show() {
        try {
            const res = await axios.get('http://localhost:2000/api/book/');
            setUser(res.data.user);
            // console.table(res.data.user);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    }

    function trash(id) {
        if (confirm("are you sure want to delete this items")) {
            axios.delete(`http://localhost:2000/api/book/${id}`)
                .then(() => {
                    show();

                })

        }
    }


    useEffect(() => {
        show();
    }, []);

    return (
        <div className="container">
            {
                loading ? (
                    <div className="text-center d-flex">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : user.length > 0 ? (
                    <table className='table table-hover table-bordered text-center mt-5'>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>book_name</th>
                                <th>book_codeNumber</th>
                                <th>book_auther</th>
                                <th>book_reting</th>
                                <th>book_prise</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                user.map((items, index) => (
                                    <tr key={items._id}>
                                        <td>{items._id}</td>
                                        <td>{items.book_name}</td>
                                        <td>{items.book_codeNumber}</td>
                                        <td>{items.book_auther}</td>
                                        <td>{items.book_reting}</td>
                                        <td>{items.book_prise}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => trash(items._id)}>delete</button>

                                            <Link to={`/update/${items._id}`} className='btn btn-warning ms-2'>UpdateUser</Link>
                                        </td>


                                    </tr>
                                ))
                            }
                        </tbody >
                    </table >
                ) : (
                    <div className="text-center bg-primary p-3">
                        No data available
                    </div>
                )
            }
        </div >
    );
}

export default View;
