import { Categories } from "@/components/Categories"
import { ICategories } from "@/interfaces/Categores"
import { client } from "@/supabase/client"
import { useEffect, useState } from "react"

export const CategoriesSection = () => {
  const [categories, setCategories] = useState<readonly ICategories[]>([])

  const fetchCategories = async () => {
    try {
      const { data, error } = await client.from("categories").select("*")
      if (error) {
        throw error
      }
      setCategories(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <div className="flex gap-3  flex-wrap p-8">
      {categories &&
        categories.map((category) => (
          <Categories
            key={category?.id}
            id={category?.id}
            name={category?.name}
            movieCount={category?.movie_count}
          />
        ))}
    </div>
  )
}
