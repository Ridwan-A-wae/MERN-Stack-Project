import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2"
import ReactQuill from 'react-quill';






const EditComponent = (props) => {
    const [state, setState] = useState({
        title: "",
        author: "",
        content: "",
        slug: ""
    });
    const { title, author,content, slug } = state;



    const showUpdateform = () => (
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
            <input type="submit" value="อัพเดท" className="btn btn-primary" />
        </form>

    )

    // กำหนดค่าให้กับ state
    const inputValue = name => event => {
        setState({ ...state, [name]: event.target.value });
    };

    // ดึงข้อมูลที่ต้องการแก้ไข
    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
            .then((response) => {
                const { title, content, author, slug } = response.data
                setState({ ...state, title, content, author, slug });
            })
            .catch((err) => {
                alert(err);
            });
        const handleLinkClick = () => {
            setTimeout(() => {
                window.location.reload(true);
            }, 50); // 
        };
        // รีเฟรชหน้าเว็บเมื่อเกิดเหตุการเปลี่ยน url
        window.addEventListener('popstate', handleLinkClick);

        return () => {
            window.removeEventListener('popstate', handleLinkClick);
        };

    }, [props.match.params.slug]); // เพิ่ม props.match.params.slug เข้าไปใน dependency array

    const submitForm = (e) => {
        e.preventDefault();
        console.log("API URL = ", process.env.REACT_APP_API)
        axios.put(`${process.env.REACT_APP_API}/blog/${slug}`, { title, content, author })
            .then(response => {
                Swal.fire('แจ้งเตือน!','อัพเดทบทความเรียบร้อย','success')
                const { title, content, author, slug } = response.data
                setState({ ...state, title,content , author, slug })
            }).catch(err => {
                alert(err)
            })
    }


    return (
        <div className="container p-5">
            <NavbarComponent />
            <h1> แก้ไข้บทความ </h1>
            {showUpdateform()}


        </div>
    );
};

export default EditComponent;
