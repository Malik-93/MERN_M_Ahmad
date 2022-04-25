import dotenv from 'dotenv';
import dns from "dns";
import os from "os";
const ifaces = os.networkInterfaces();
dotenv.config();
const envSetup = (...args) => {
    const [PORT] = [...args]
    if (process.env.NODE_ENV === 'development') {
        //  .env values in dev mode
        let address;
        Object.keys(ifaces).forEach(dev => {
            ifaces[dev].filter(details => {
                if (details.family === 'IPv4' && details.internal === false) {
                    address = details.address;
                }
            });
        });
        process.env["FRONTEND_BASE_URL"] = `http://${address}:${PORT}`
        // dns.lookup(os.hostname(), function (err, add, fam) {
        //     process.env["FRONTEND_BASE_URL"] = `http://${add}:${PORT}`
        // })

    } else {
        //  .env values in production mode

    }
}
export default envSetup;

