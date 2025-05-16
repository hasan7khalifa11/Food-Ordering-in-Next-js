import { getCategories } from "@/server/db/category"
import Form from "./_components/Form"
import CategoryItems from "./_components/CategoryItems"

const CategoriesPage = async () => {

    const categories = await getCategories()

    console.log(categories)

    return (
        <main className="mt-5 w-5/6 mx-auto">
            <Form />
            {categories.map(category => {
                return (
                    <CategoryItems category={category} key={category.id} />
                )
            })}
        </main>
    )
}

export default CategoriesPage