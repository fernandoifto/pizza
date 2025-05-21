import { Orders } from "./components/orders";
import { api } from "@/services/api";
import { getCookieServer } from "@/lib/cookieServer";

interface Order {
    id: string;
    table: number;
    name: string;
    status: boolean;
    draft: boolean;
}

async function getOrders(): Promise<Order[] | []> {
    try {
        const token = await getCookieServer();
        const response = await api.get('/order', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data as Order[] || [];
    } catch (error) {
        console.log(error);
        return [];
    }    
}

export default async function Dashboard(){
    const orders = await getOrders();
    console.log(orders);
    return(
        <>
            <Orders />
        </>
    )
}   