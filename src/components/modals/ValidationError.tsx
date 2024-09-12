import React from "react"
import styles from './ValidationError.module.css'
const ValidationError = () => {
    return (
        <p className={styles.error}>This field is required</p>
    )
}

export {ValidationError}