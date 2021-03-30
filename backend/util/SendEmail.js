import nodemailer from 'nodemailer';
import config from './config'
class SendEmail {
   
    async sendMessage(receiver, order){
        try {
            const messageConfig  = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: config.NODE_MAILER_USER_ID ,
                    pass: config.NODE_MAILER_PASSWORD
                }
            });
            let info ={
                from: ` Amazona ${process.env.NODE_MAILER_USER_ID}`,
                to: receiver,
                subject: `Order confirmation ${order._id}`,
                html: this.realMessage( order)
            }; 
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            return await messageConfig.sendMail(info);

        } catch (error) {
           return console.log(error.message);
         
            
        }
    }
    realMessage(order){
        return `<h1>Thank you for shopping with Us</h1>
            <p>  Hi ${order.shippingAddress.fullName} </p>
            <p>We have finished processing your order </p>
            <h2>[Order ${order._id}] (${order.createdAt.toString(0, 10)})</h2>
            <table>
            <thead>
                <tr>
                    <th><strong>Product</strong></th>
                    <th><strong>Quantity</strong></th>
                    <th><strong>Price</strong></th>
                </tr>
            </thead>
            <tbody>
                ${order.orderItems.map(item=>`
                    <tr>
                        <td>${item.name}</td>
                        <td align='center'>${item.qty}</td>
                        <td>$${item.price.toFixed(2)}</td>
                    </tr>`
                ).join('\n')}                
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="2">Items Price:</td>
                    <td align="right">${order.itemsPrice.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="2">Tax Price:</td>
                    <td align="right">${order.taxPrice.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="2">Shipping Price:</td>
                    <td align="right">${order.shippingPrice.toFixed(2)}</td>
                </tr>
                <tr>
                    <td colspan="2">Shipping Price:</td>
                    <td align="right">${order.paymentMethod}</td>
                </tr>
            </tfoot>
            </table>
            <h2> Shipping Address </h2>
            <p>
                ${order.shippingAddress.address}
                ${order.shippingAddress.streetAddress ?order.shipping.streetAddress: ''}
                ${order.shippingAddress.city}
                ${order.shippingAddress.country}
                ${order.shippingAddress.postalCode}

            </p>
            Thank you for shopping with us
        `
    }
}
export default new SendEmail();