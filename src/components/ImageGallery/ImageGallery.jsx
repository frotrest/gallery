import './ImageGallery.css'
import { Component } from 'react'

export default class ImageGallery extends Component {
    render() {
        const { children } = this.props
        return (
            <>
                <ul className="ImageGallery">
                    {children}
                </ul>
            </>
        )
    }
}

