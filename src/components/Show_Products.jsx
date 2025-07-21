import { useEffect, useState } from "react";
import "./Show_Product.css"

const Show_Product = () => {
    const [product, setProduct] = useState([]);
    const [sortOrder, setSortOrder] = useState();
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const P1 = await fetch("https://fakestoreapi.com/products");
                const P2 = await fetch("https://dummyjson.com/products");
                const data1 = await P1.json();
                const data2 = await P2.json();

                const allProducts = [...data1, ...data2.products];
                console.log(allProducts);
                setProduct(allProducts)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    const filterBySearch = product.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) || (item.brand && item.brand.toLowerCase().includes(search.toLowerCase()))
    )

    const sortByOrder = [...filterBySearch].sort((a, b) => {
        if (sortOrder == "Low to High") {
            return a.price - b.price
        }
        if (sortOrder == "High to Low") {
            return b.price - a.price
        }
        return 0; // It will return default no sort
    })

    return (
        <div className="container">
            <div className="controls">
                <input type="text" name="search" placeholder="Search Products" value={search} onChange={(e) => setSearch(e.target.value)} />
                <select name="order By" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="">Order By</option>
                    <option value="Low to High">Price: Low to High</option>
                    <option value="high to Low">Price: High to Low</option>
                </select>
            </div>

            <div className="product-grid">
                {
                    sortByOrder.map((item, index) => (
                        <div key={index} className="product-card">
                            <h2>{item.title}</h2>
                            <img src={item.image || item.thumbnail} alt={item.title}/>
                            <h3>Rs.{item.price}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Show_Product;