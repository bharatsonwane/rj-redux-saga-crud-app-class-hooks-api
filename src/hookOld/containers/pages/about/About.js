import React, { useEffect } from 'react'

function About() {

    useEffect(() => {
        let token = "TestingTokenForinterceptor"
        localStorage.setItem('taskToken', JSON.stringify(token))
    }, [])

    return (
        <div className="container">
            <div className="py-4">
                <h1>About page</h1>
                <p> To-Do Web Application. </p>
            </div>
        </div>
    )
}

export default About
