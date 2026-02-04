import '../styles/loading.css'

export function Loading({ message = "Loading..." }) {
    return (
        <div className="loadingContainer">
            <div className="spinner"></div>
            <p>{message}</p>
        </div>
    )
}
