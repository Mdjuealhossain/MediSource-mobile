import Tabs from "@/components/Tabs";
import Products from "@/widget/Products";
import { tabContentas } from "../data";

const Home = () => {
    return (
        <div className=" mt-4 px-4">
            <Tabs tabs={tabs?.data} contentClass={"md:mt-10 mt-6"}>
                {tabContentas.map((content) => (
                    <div key={content.id} id={content.id}>
                        <Products
                            isshowap={content.catagory == "All"}
                            products={content.products}
                        />
                    </div>
                ))}
            </Tabs>
        </div>
    );
};

export default Home;
const tabs = {
    data: [
        { id: 1, name: "All" },
        { id: 2, name: "Purchase" },
        { id: 3, name: "Short" },
        { id: 4, name: "D-R" },
    ],
};
