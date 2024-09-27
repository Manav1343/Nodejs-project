import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const Update = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [data, setData] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    async function show() {
        try {
            const res = await axios.get(`http://localhost:2000/api/book/${id}`);
            setData(res.data.user);
            console.log("res.data.user.....................")
            console.log(res.data.user)
            reset(res.data.user);
            console.log(res.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        show();
    }, [id]);

    async function updatedata(changedata) {
        // const newdata = { ...data, ...changedata };
        console.log(changedata);

        try {
            const res = await axios.put(`http://localhost:2000/api/book/${id}`, changedata);
            console.log(res);
            toast.success("Data updated successfully");
            navigate("/view");
        } catch (error) {
            console.error('Error updating data:', error);
            toast.error("Failed to update data");
        }
    }

    return (
        <div>
            <div className='container bg-light p-5 mt-5 shadow'>
                <form method='post' onSubmit={handleSubmit(updatedata)}>
                    <div className="mb-3">
                        <label htmlFor="book_name" className="form-label">Book Name :</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register("book_name", { required: "Book name is required" })}
                            placeholder="Enter book name"
                        />
                        {errors.book_name && <p className="text-danger">{errors.book_name.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="book_codeNumber" className="form-label">Book Code Number :</label>
                        <input
                            type="number"
                            className="form-control"
                            {...register("book_codeNumber", { required: "Book code number is required" })}
                            placeholder="Enter book code number"
                        />
                        {errors.book_codeNumber && <p className="text-danger">{errors.book_codeNumber.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="book_auther" className="form-label">Author :</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register("book_auther", { required: "Author is required" })}
                            placeholder="Enter author"
                        />
                        {errors.book_auther && <p className="text-danger">{errors.book_auther.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="book_reting" className="form-label">Rating :</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register("book_reting", { required: "Rating is required" })}
                            placeholder="Enter rating"
                        />
                        {errors.book_reting && <p className="text-danger">{errors.book_reting.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="book_prise" className="form-label">Price :</label>
                        <input
                            type="text"
                            className="form-control"
                            {...register("book_prise", { required: "Price is required" })}
                            placeholder="Enter price"
                        />
                        {errors.book_prise && <p className="text-danger">{errors.book_prise.message}</p>}
                    </div>
                    <button className="btn btn-warning" type="submit">Update</button>
                    <Toaster />
                </form>
            </div>
        </div>
    );
}

export default Update;
