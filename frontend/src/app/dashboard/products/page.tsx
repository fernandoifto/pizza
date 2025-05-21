import { Form } from "@/app/dashboard/products/components/forms"
import {api} from "@/services/api"
import {getCookieServer} from "@/lib/cookieServer"

export default async function Products() {

    const token = await getCookieServer();

    const response = await api.get('/categories', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    console.log(response.data);

    return (
        <main>
            <Form categories={response.data}/>
        </main>
    )
}
