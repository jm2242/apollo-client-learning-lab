import React from 'react'
import "./issue.css"
const Issue = ({ title, author, comments }) =>
    <div className="IssueItem">
        <div className="IssueItem-content">
            <h2>{title}</h2>
            <b>Author:</b> {author.login}
            <div>
                <img
                    style={{maxHeight: "100px"}}
                    src={author.avatarUrl}>
                </img>
            </div>

            <div>
                <b>Comments:</b>
                <ul>
                {
                    comments.edges.map( ({node }) => <li>{node.body}</li>)
                }
                </ul>
            </div>
        </div>

    </div>

export default Issue
