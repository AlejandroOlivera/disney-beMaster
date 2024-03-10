import { ContentCategory } from "@/components/ContentCategory"
import { Categories } from "@/interfaces/Categores"
import { client } from "@/supabase/client"
import { useEffect, useState } from "react"

export const CategoriesSection = () => {
  const [categories, setCategories] = useState<readonly Categories[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await client.from("categories").select("*")
        if (error) {
          throw error
        }
        setCategories(data)
      } catch (error) {
        console.error("Error fetching categories:", error.message)
      }
    }

    fetchCategories()
  }, [])

  return (
    <div className="flex gap-3  flex-wrap p-8">
      {categories &&
        categories.map((category) => (
          <ContentCategory
            key={category?.id}
            id={category?.id}
            name={category?.name}
            movieCount={category?.movie_count}
          />
        ))}
    </div>
  )
}
