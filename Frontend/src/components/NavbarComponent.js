import { withRouter } from "react-router-dom"
import { getUser, logout } from "../services/authorize";



const NavbarComponent = (props) => {

    return (
        <nav>
            <ul className="nav nav-tabs" >
                <li className="nav-item pe-3 pt-3 pb-3">
                    <a href="/" className="nav-link">หน้าแรก</a>
                </li>
                {!getUser() && (
                    <li className="nav-item pe-3 pt-3 pb-3">
                        <a href="/login" className="nav-link">เข้าสู่ระบบ</a>
                    </li>
                )}
                {getUser() && (
                    <li className="nav-item pe-3 pt-3 pb-3">
                    <a href="/create" className="nav-link">เขียนบทความ</a>
                </li>
                )}
                {getUser() && (
                    <li className="nav-item pe-3 pt-3 pb-3">
                        <a href="/" className="nav-link" onClick={() => logout(() => props.history.push("/"))}>ออกจากระบบ</a>
                    </li>
                )}
                </ul>
        </nav>
    )
}

export default withRouter(NavbarComponent);