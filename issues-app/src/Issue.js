import React from 'react'

const Issue = ({ title, author, comments }) =>
    <div style={{}}>
        <h2>{title}</h2>
        <b>Author:</b> {author.login}
        <span>
            <img
                style={{maxHeight: "100px"}}
                src={author.avatarUrl}>
            </img>
        </span>
        <div>
            {`Comments: ${comments.edges.map( ({node }) => node.body).join(" ")}`}
        </div>

    </div>

export default Issue
