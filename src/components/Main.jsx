import React, { useEffect, useState } from 'react'
import Instance from "../http/Instance"

const Main = ({ token }) => {

    const [products, setProducts] = useState(false)

    const get = () => Instance('products').then(rez => rez.json().then(g => setProducts(g.data)))

    const addToCart = (e, id) => {
        e.target.disabled = true
        e.currentTarget.textContent = 'В корзине'
        Instance('cart/' + id, 'POST')
    }

    useEffect(() => {
        get()
    }, [])
    return (
        <main>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                {
                    products ? products.map(item =>
                            <div className="col" key={item.id}>
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className="card-header py-3">
                                        <h4 className="my-0 fw-normal">{item.name}</h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">{item.price}р.</h1>
                                        <p>{item.description}</p>
                                        {
                                            token &&
                                            <button onClick={e => addToCart(e, item.id)} type="button" className="w-100 btn btn-lg btn-outline-success">Добавить в корзину
                                            </button>
                                        }

                                    </div>
                                </div>
                            </div>
                        )
                        : <h1>Loading...</h1>
                }

            </div>
        </main>
    )
}

export default Main