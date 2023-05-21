import React from 'react'
import { useEffect, useState } from "react"
import Instance from "../http/Instance"
import { Link } from "react-router-dom"

const Orders = () => {

    const [products, setProducts] = useState(false)
    const [items, setItems] = useState(false)

    const get = async () => {
        await Instance('products').then(rez => rez.json().then(g => setProducts(g.data)))
        await Instance('order').then(rez => rez.json().then(g => setItems(g.data)))
    }

    useEffect(() => {
        get()
    }, [])


    return (
        <main>
            {
                items && items.length ? items.map(item =>
                        <div className="row row-cols-1 row-cols-md-3 mb-3 text-center bg-light" key={item.id}>
                            <h2 className="w-100">Заказ №{item.id}</h2>
                            {
                                item.products.map((prodId, index) => {
                                    const product = products.find(prod => prod.id === prodId)
                                    return (
                                        <div className="col" key={index}>
                                            <div className="card mb-4 rounded-3 shadow-sm">
                                                <div className="card-header py-3">
                                                    <h4 className="my-0 fw-normal">{product.name}</h4>
                                                </div>
                                                <div className="card-body">
                                                    <h1 className="card-title pricing-card-title">{product.price}р.<small
                                                        className="text-muted fw-light"> &times; 2 шт.</small></h1>
                                                    <p>{product.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }


                            <h2 className="w-100">Итоговая стоимость: {item.order_price}р.</h2>
                        </div>
                    )
                    : items && items.length === 0 ? <h1>Нет заказов</h1> : <h1>Loading...</h1>
            }
            <div className="row justify-content-center gap-1">
                <Link to='/' className="col-6 btn btn-lg btn-outline-secondary mb-3" type="button">Назад</Link>
            </div>
        </main>
    )
}

export default Orders