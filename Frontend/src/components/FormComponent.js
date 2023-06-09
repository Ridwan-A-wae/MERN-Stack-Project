import { useState } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2"
import 'react-quill/dist/quill.snow.css'; // เรียกใช้ไฟล์ CSS สำหรับรูปแบบต่างๆของ ReactQuill


const FormComponent = (props) => {
    const [state, setState] = useState({
        title: "",
        author: ""
    });
    const { title,content, author } = state;


    // กำหนดค่าให้กับ state
    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    };


    const submitForm = (e) => {
        e.preventDefault();
        console.log("API URL = ", process.env.REACT_APP_API)
        axios.post(`${process.env.REACT_APP_API}/create`, { title, content, author })
            .then(response => {
                Swal.fire('แจ้งเตือน!', 'บันทึกบทความเรียบร้อย', 'success')
                setState({ ...state, title: "",content: "", author: "" })
            }).catch(err => {
                Swal.fire('แจ้งเตือน!', err.response.data.error, 'error')
            })
    }
    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1> เขียนบทความ </h1>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="title">ชื่อบทความ</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={inputValue("title")}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">รายละเอียดบทความ</label>
                    <textarea className="form-control"
                value={content}
                onChange={inputValue("content")}>
                </textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="author">ผู้แต่ง</label>
                    <input
                        type="text"
                        id="author"
                        className="form-control"
                        value={author}
                        onChange={inputValue("author")}
                    />
                </div>
                <br />
                <input type="submit" value="บันทึก" className="btn btn-primary" />
            </form>
        </div>
    );
};

export default FormComponent;
