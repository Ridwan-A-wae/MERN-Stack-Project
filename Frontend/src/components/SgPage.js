import React, { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";

const SgPage = (props) => {
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((err) => {
        alert(err);
      });

    const handleLinkClick = () => {
      setTimeout(() => {
        window.location.reload(true); // รีเฟรชหน้าเว็บหลังจากคลิกลิงก์
      }, 50); // รอเวลา 0.5 วินาที (500 มิลลิวินาที)
    };

    window.addEventListener('popstate', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handleLinkClick);
    };
  }, [props.match.params.slug]);

  if (blog === null) {
    return <div></div>; // หรือสามารถแสดงข้อความ loading อื่นๆ ที่คุณต้องการได้
  }

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>
      <p className="text-muted">
        ผู้เขียน: {blog.author} ,เผยแพร่:{" "}
        {new Date(blog.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default SgPage;
