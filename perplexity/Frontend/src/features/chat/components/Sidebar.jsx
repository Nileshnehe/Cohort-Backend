import React from 'react'
import "./sidebar.css"
const Sidebar = () => {
    return (
        <section className='sidebar'>
            <button>
                <h1>Nexara</h1>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            <ul className='history'>
                <li>Thread1</li>
                <li>Thread2</li>
                <li>Thread3</li>
            </ul>

            <div className='sign'>
                💁‍♂️NEELCEO
            </div>
        </section>
    )
}

export default Sidebar