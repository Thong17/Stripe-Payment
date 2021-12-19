const dotenv = require('dotenv')
const fetch = require('node-fetch')

dotenv.config({ path: '../.env' })

const stripe = require('stripe')(process.env.STRIPE_KEY)

exports.checkout = (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body.items),
    }

    fetch('http://localhost:5000/api/product', options)
    .then((data) => data.json())
    .then(async (data) => {
        items = []
        data.forEach(item => {
            items.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.product,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.qty
            })
        })
        try {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                line_items: items,
                success_url: `${process.env.SERVER_URL}/success`,
                cancel_url: `${process.env.SERVER_URL}/cancel`
            })
            res.json({ url: session.url })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }).catch((e) => console.log(e))
}