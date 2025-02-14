const ProductsPage = () => {


    //Promis Chaining Pattern for Fetching Data
    const handleClick = async () => {
        // const res = fetch('http://localhost:8000/api/products', {
        //     method: 'GET',
        // });

        // res
        // .then((body) =>{
        //     console.log(body);
        //     return body.json();
        // })
        // .then((data) => {
        //     console.log(data);
        // })
        // .catch((err) => {
        //     console.log(err);
        // })

        // Async Await Pattern for Fetching Data
        try {
            const res = await fetch('http://localhost:8000/api/products', {
                method: 'GET',
            });
            const data = await res.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }

    }



    return (
        <div>
            <h1>Product Page</h1>
        </div>
    )
}

export default ProductsPage