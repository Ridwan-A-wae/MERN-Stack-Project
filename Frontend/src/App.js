import NavbarComponent from "./components/NavbarComponent";
import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom';
import Swal from "sweetalert2";
import { getUser } from "./services/authorize";


function App() {

  const [blogs, setBlogs] = useState([])
  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_API}/blogs`)
      .then(response => {
        setBlogs(response.data)
      }).catch(err => {
        alert(err)
      })
  }
  
  // ดึงข้อมูล
  useEffect(() => {
    fetchData()
  }, [])
  
  // ลบข้อมูล
  const deleteBlog =(slug) => {
    // ส่ง request ไปที่ api เพื่อลบข้อมูล
    axios.delete(`${process.env.REACT_APP_API}/blog/${slug}`)
    .then(response => {
      Swal.fire("Deleted!",response.data.message,"success")
      fetchData()
    }).catch(err => console.log(err))
    
  }

const confirmDelete =(slug) => {
  Swal.fire({
    title:"คุณต้องการลบบทความนี้หรือไม่",
    icon:"warning",
    showCancelButton:true
}).then((result) => {
  // กดปุ่ม ok
    if(result.isConfirmed) {
     deleteBlog(slug)
    }
})
}
const handleLinkClick = () => {
  setTimeout(() => {
    window.location.reload(true); // รีเฟรชหน้าเว็บหลังจากคลิกลิงก์
  }, 50); // รอเวลา 0.5 วินาที (500 มิลลิวินาที)
};
// เพิ่ม event listener สำหรับ 'popstate'
      window.addEventListener('popstate', handleLinkClick);
     
return (
    <div className="container p-5">
      <NavbarComponent />
      {blogs.map((blog, index) => (
        <div className="row" key={index} style={{ borderBottom: "1px solid silver" }}>
          <div className="col pt-3 pb-2">
            <Link
              to={`/blog/${blog.slug}`}
              onClick={handleLinkClick} // เรียกใช้งาน handleLinkClick เมื่อคลิกที่ลิงก์
            >
              <h2>{blog.title}</h2>
            </Link>
            <p>{blog.content.substring(0, 250)}</p>
            <p className="text-muted">ผู้เขียน: {blog.author} ,เผยแพร่: {new Date(blog.createdAt).toLocaleString()}</p>
            {/* <button className="btn btn-outline-success me-2">แก้ไขบทความ</button> */}
            {getUser() && (
                          <div>
                          <Link className="btn btn-outline-success me-2" to={`/blog/edit/${blog.slug}`} onClick={handleLinkClick}>แก้ไขบทความ</Link>
                        <button className="btn btn-outline-danger" onClick={() => confirmDelete(blog.slug)}>ลบบทความ</button>
                          </div>
            )}
          </div>
        </div>
      )
      )}

    </div>
  )
}

export default App;

