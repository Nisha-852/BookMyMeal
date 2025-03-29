import React from 'react'

const Heading = ({ title = '', classes = '' }) => {
    return (
        <h3 className={classes}>{title}</h3>
    )
}

export default Heading
