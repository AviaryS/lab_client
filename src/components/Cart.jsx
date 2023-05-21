import React, { useEffect, useState } from 'react'
import Instance from "../http/Instance"
import { Link, useNavigate } from "react-router-dom"

const Cart = () => {

    const navigate = useNavigate()

    const [products, setProducts] = useState(false)
    const [productsNotFiltered, setProductsNotFiltered] = useState(false)

    const Sort = (arr) => {
        const result = []
        arr.forEach(item => {
            item.count = 1
            const IsFind = result.find(elem => elem.product_id === item.product_id)
            IsFind ? IsFind.count++ : result.push(item)
        })
        return result
    }

    const get = () => Instance('cart').then(rez => rez.json().then(g => {
                setProductsNotFiltered(g.data)
                setProducts(Sort(g.data))
            }
        )
    )

    const total_cost = products && products.reduce((a, item) => a + item.price * item.count, 0)

    const increment = (index) => {
        const copy = [...products]
        copy[index].count++
        setProducts(copy)
    }

    const decrement = (index) => {
        const copy = [...products]
        if (copy[index].count > 1) {
            copy[index].count--
            setProducts(copy)
        }
    }

    const Delete = async (product_id, id) => {
        await productsNotFiltered.forEach(async (item) => item.product_id === product_id && await Instance('cart/' + item.id, 'delete'))
        setProducts(products.filter(item => item.id !== id))
    }

    const makeOrder = async () => {
        await Instance('order', 'POST')
        navigate('/orders')
    }

    useEffect(() => {
        get()
    }, [])


    return (
        <main>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                {
                    products && products.length ? products.map((item, index) =>
                            <div className="col" key={item.id}>
                                <div className="card mb-4 rounded-3 shadow-sm">
                                    <div className="card-header py-3">
                                        <h4 className="my-0 fw-normal">{item.name}</h4>
                                    </div>
                                    <div className="card-body">
                                        <h1 className="card-title pricing-card-title">{item.price}р.<small
                                            className="text-muted fw-light"> &times; {item.count}
                                            шт.</small></h1>
                                        <p>{item.description}</p>
                                        <button onClick={() => increment(index)} type="button" className="btn btn-lg btn-info mb-3">+</button>
                                        <button onClick={() => decrement(index)} type="button" className="btn btn-lg btn-warning mb-3">&minus;</button>
                                        <button onClick={() => Delete(item.product_id, item.id)} type="button" className="btn btn-lg btn-outline-danger mb-3">Удалить из
                                            корзины
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                        : products && products.length === 0 ? <h1>Корзина пуста</h1>
                            : <h1>Loading...</h1>
                }

            </div>
            <div className="row justify-content-center gap-1">
                {
                    products && products.length > 0 && <h2 className="mb-5">Итоговая стоимость: {total_cost}р.</h2>
                }
                <Link to={'/'} className="col-6 btn btn-lg btn-outline-secondary mb-3" type="button">Назад</Link>
                {
                    products && products.length > 0 && <button onClick={() => makeOrder()} type="button" className="col-6 btn btn-lg btn-success mb-3">Оформить заказ</button>
                }

            </div>
        </main>
    )
}

export default Cart