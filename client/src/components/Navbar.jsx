import React from 'react';

function Navbar() {
    return (
        <div>
            <ul className="nav justify-content-center bg-warning">
                <li className="nav-item">
                    <a
                        className="nav-link active"
                        aria-current="page"
                        href="/"
                        style={{
                            fontWeight: 'bold',
                            padding: '5px',
                            margin: '5px',
                        }}>
                        Home
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        href="/login"
                        style={{
                            fontWeight: 'bold',
                            padding: '5px',
                            margin: '5px',
                        }}>
                        Login
                    </a>
                </li>
                <li className="nav-item">
                    <a
                        className="nav-link"
                        href="/register"
                        style={{
                            fontWeight: 'bold',
                            padding: '5px',
                            margin: '5px',
                        }}>
                        Register
                    </a>
                </li>
            </ul>
        </div>
    );
}

export default Navbar;
