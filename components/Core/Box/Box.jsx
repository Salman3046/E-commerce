import React from 'react'

const Box = ({ children, className = '', ...props }) => {
    return (
        <div className={className} {...props}>
            {children}
        </div>
    )
}

Box.Section = ({ children, className = '', ...props }) => {
    return (
        <section className={className} {...props}>
            {children}
        </section>
    )
}

Box.Article = ({ children, className = '', ...props }) => {
    return (
        <article className={className} {...props}>
            {children}
        </article>
    )
}

Box.Aside = ({ children, className = '', ...props }) => {
    return (
        <aside className={className} {...props}>
            {children}
        </aside>
    )
}

Box.Main = ({ children, className = '', ...props }) => {
    return (
        <main className={className} {...props}>
            {children}
        </main>
    )
}

Box.Header = ({ children, className = '', ...props }) => {
    return (
        <header className={className} {...props}>
            {children}
        </header>
    )
}

Box.Footer = ({ children, className = '', ...props }) => {
    return (
        <footer className={className} {...props}>
            {children}
        </footer>
    )
}

export default Box
